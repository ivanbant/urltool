import asyncHandler from "../middleware/asyncHandler.js";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import config from "../config/config.js";

// @desc    Webhook for subscription via paypal
// @route   POST /api/paypal/hook
// @access  Public
const paypalWebhook = asyncHandler(async (req, res) => {
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
              subscription.resource.agreement_details.next_billing_date
            );
            const plan = config().plan.find(
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

async function cancelSubscriptionWithStatus(status, subscriptionId) {
  try {
    const subscription = await Subscription.findOne({ subscriptionId });
    if (subscription) {
      const user = await User.findById(subscription.user);
      if (user) {
        subscription.status = status;

        const plan = config().plan[1];

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

// async function createInvoiceInDB(user, plan, subscription) {
//   return await Invoice.create({
//     user: user._id,
//     subscription: subscription._id,
//     plan: plan.tier,
//   });
// }

export { paypalWebhook };
