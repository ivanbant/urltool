import asyncHandler from "../middleware/asyncHandler.js";
import generatePaypalToken from "../utils/generatePaypalToken.js";
import Subscription from "../models/subscriptionModel.js";
import axios from "axios";

// @desc    Handeler for paypal subscription request
// @route   POST /api/paypal/subscription/create
// @access  Public
const createSubscription = asyncHandler(async (req, res) => {
  const { PAYPAL_BASE_URL } = process.env;
  const { subscriptionId } = req.body;
  const accessToken = await generatePaypalToken();
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
      let subscription = await Subscription.findOne({
        subscriptionId: data.id,
      });
      if (subscription)
        res.status(201).send({ subscriptionId: subscription.subscriptionId });
      else {
        subscription = await Subscription.create({
          user: req.user._id,
          email: data.subscriber.email_address,
          payerId: data.subscriber.payer_id,
          payerName: data.subscriber.name.given_name,
          payerSurname: data.subscriber.name.surname,
          tier: "Pro",
          status: data.status,
          subscriptionId: data.id,
          startTime: new Date(data.start_time),
          nextBillingDate: new Date(data.billing_info.next_billing_time),
          cancelLink: data.links[0].href,
        });
        res.status(201).send({ subscriptionId: subscription.subscriptionId });
      }
    }
  } catch (err) {
    res.status(500);
    throw new Error("Paypal error");
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
    case "BILLING.SUBSCRIPTION.CANCELLED":
      console.log("Subscription cancelled");
      break;
    case "BILLING.SUBSCRIPTION.EXPIRED":
      console.log("Subscription expired");
      break;
    case "BILLING.SUBSCRIPTION.SUSPENDED":
      console.log("Subscription suspended");
      break;
    case "BILLING.SUBSCRIPTION.UPDATED":
      console.log("Subscription updated");
      break;
    default:
      console.log("Event type not handled");
      break;
  }

  const createSubscription = () => {};
  const updateSubscription = () => {};
  const cancelSubscription = () => {};
  const suspendSubscription = () => {};
  const activateSubscription = () => {};
  const expireSubscription = () => {};

  res.status(200).send("Webhook Processed");
});

export { subscriptionHook, createSubscription };
