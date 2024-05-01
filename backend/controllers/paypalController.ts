import asyncHandler from "../middleware/asyncHandler.js";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import config from "../config/config.js";
import { Request, Response } from "express";

// @desc    Webhook for subscription via paypal
// @route   POST /api/paypal/hook
// @access  Public
const paypalWebhook = asyncHandler(async (req: Request, res: Response) => {
  console.log("Webhook received: " + req.body);

  const eventType = req.body.event_type;

  switch (eventType) {
    // case "BILLING.SUBSCRIPTION.CREATED":
    //   console.log("Subscription created");
    //   break;
    // case "BILLING.SUBSCRIPTION.ACTIVATED":
    //   console.log("Subscription activated");
    //   break;
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
              req.body.resource.agreement_details.next_billing_date
            );
            const configs = await config();
            if (!configs) throw new Error("Event type not handled");
            const plan = configs.plan.find(
              (plan) => plan.paypal_id === subscription.planId
            );
            if (!plan) throw new Error("Event type not handled");
            user.tier = plan.tier;
            user.urlsUsesLeft = plan.useLimit;
            user.nextResetDate = new Date(
              req.body.resource.agreement_details.next_billing_date
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
    case "PAYMENT.SALE.COMPLETED":
      console.log(req.body);
      break;
    // case "BILLING.SUBSCRIPTION.UPDATED":
    //   console.log("Subscription updated");
    //   break;
    default:
      res.status(404).send("Event type not handled");
      return;
  }

  res.status(200).send("Webhook Processed");
});

async function cancelSubscriptionWithStatus(
  status: string,
  subscriptionId: string
) {
  try {
    const subscription = await Subscription.findOne({ subscriptionId });
    if (subscription) {
      const user = await User.findById(subscription.user);
      if (user) {
        subscription.status = status;
        const configs = await config();
        if (!configs) throw new Error(" Not Handled");
        const plan = configs.plan[1];
        user.tier = plan.tier;
        user.urlsUsesLeft = plan.useLimit;
        user.nextResetDate = new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        );
        subscription.save();
        user.save();
      }
    }
  } catch {
    throw new Error("DB Error");
  }
}

// async function createInvoiceInDB(user, plan, subscription) {
//   return await Invoice.create({
//     user: user._id,
//     subscription: subscription._id,
//     plan: plan.tier,
//   });
// }

export { paypalWebhook };
