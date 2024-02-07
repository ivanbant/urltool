import asyncHandler from "../middleware/asyncHandler.js";
import generatePaypalToken from "../utils/generatePaypalToken.js";

const { PAYPAL_BASE_URL } = process.env;

// @desc    Handeler for paypal subscription request
// @route   POST /api/paypal/subscription/create
// @access  Public
const createSubscription = asyncHandler(async (req, res) => {
  const { subscriptionId } = req.body;
  console.log(subscriptionId);
  // const accessToken = await generatePaypalToken();

  // const data = await createPaypalSubscription.data;
  // res.status(201).send(data);
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
