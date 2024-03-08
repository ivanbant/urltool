import asyncHandler from "../middleware/asyncHandler.js";
import generatePaypalToken from "../utils/generatePaypalToken.js";
import Subscription from "../models/subscriptionModel.js";
import axios from "axios";
import User from "../models/userModel.js";
import config from "../config/config.json" assert { type: "json" };

// @desc    Handeler for paypal subscription request
// @route   POST /api/paypal/subscription/create
// @access  Public
const createSubscription = asyncHandler(async (req, res) => {
  const { PAYPAL_BASE_URL } = process.env;
  const { subscriptionId } = req.body;

  // Generate token
  let accessToken;
  try {
    accessToken = await generatePaypalToken();
  } catch {
    res.status(500);
    throw new Error("Could not generate paypal token");
  }

  // Check if subscription is active and create in database
  try {
    const { data } = await axios({
      url: `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (data || data.status === "ACTIVE") {
      const user = await User.findById(req.user._id);
      const plan = config.plan.find((plan) => plan.id === data.plan_id);
      const subscription = await Subscription.create({
        user: user._id,
        email: data.subscriber.email_address,
        payerId: data.subscriber.payer_id,
        payerName: data.subscriber.name.given_name,
        payerSurname: data.subscriber.name.surname,
        tier: plan.tier,
        status: data.status,
        subscriptionId: data.id,
        planId: data.plan_id,
        startTime: new Date(data.start_time),
        nextBillingDate: new Date(data.billing_info.next_billing_time),
        cancelLink: data.links[0].href,
      });
      user.subscription = subscription._id;
      user.tier = plan.tier;
      user.urlsUsesLeft = user.urlsUsesLeft + plan.useLimit;
      user.nextResetDate = new Date(data.billing_info.next_billing_time);
      subscription.save();
      user.save();
      res.status(201).send({ subscriptionId: subscription.subscriptionId });
    }
  } catch (err) {
    res.status(500);
    throw new Error(`Paypal error: ${err}`);
  }
  res.status(200);
});

// @desc    Webhook for subscription via paypal
// @route   POST /api/paypal/subscription/hook
// @access  Public
const subscriptionHook = asyncHandler(async (req, res) => {
  console.log("Webhook received: " + req.body);

  const eventType = req.body.event_type;

  switch (eventType) {
    case "BILLING.SUBSCRIPTION.CREATED":
      console.log("Subscription created");
      break;
    case "BILLING.SUBSCRIPTION.ACTIVATED":
      console.log("Subscription activated");
      break;
    case "BILLING.SUBSCRIPTION.RE-ACTIVATED":
      try {
        const subscription = await Subscription.findOne({
          subscriptionId: req.body.resource.id,
        });
        if (subscription) {
          const user = await User.findById(subscription.user);
          if (user) {
            subscription.status = "ACTIVE";
            subscription.nextBillingDate = new Date(
              subscription.resource.agreement_details.next_billing_date
            );
            const plan = config.plan.find(
              (plan) => plan.id === subscription.planId
            );
            user.tier = plan.tier;
            user.urlsUsesLeft = plan.useLimit;
            user.nextResetDate = new Date(
              subscription.resource.agreement_details.next_billing_date
            );
            subscription.save();
            user.save();
          }
        }
      } catch {
        res.status(500);
        return;
      }
      break;
    case "BILLING.SUBSCRIPTION.CANCELLED":
      try {
        await cancelSubscriptionWithStatus("CANCELLED", req.body.resource.id);
      } catch {
        res.status(500);
        return;
      }
      res.status(200);
      break;
    case "BILLING.SUBSCRIPTION.EXPIRED":
      try {
        await cancelSubscriptionWithStatus("EXPIRED", req.body.resource.id);
      } catch {
        res.status(500);
        return;
      }
      res.status(200);
      break;
    case "BILLING.SUBSCRIPTION.SUSPENDED":
      try {
        await cancelSubscriptionWithStatus("SUSPENDED", req.body.resource.id);
      } catch {
        res.status(500);
        return;
      }
      res.status(200);
      break;
    case "BILLING.SUBSCRIPTION.UPDATED":
      console.log("Subscription updated");
      break;
    default:
      console.log("Event type not handled");
      break;
  }

  res.status(200).send("Webhook Processed");
});

async function cancelSubscriptionWithStatus(status, subscriptionId) {
  try {
    const subscription = await Subscription.findOne({ subscriptionId });
    if (subscription) {
      const user = await User.findById(subscription.user);
      if (user) {
        subscription.status = status;

        const plan = config.plan[1];

        user.tier = plan.tier;
        user.urlsUsesLeft = plan.useLimit;
        user.nextResetDate = new Date().setMonth(new Date().getMonth() + 1);
        subscription.save();
        user.save();
      }
    }
  } catch {
    res.status(500);
    return;
  }
}

export { subscriptionHook, createSubscription };
