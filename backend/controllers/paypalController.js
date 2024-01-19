import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Webhook for subscription via paypal
// @route   POST /api/paypal/active
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

export { subscriptionHook };
