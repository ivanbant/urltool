import asyncHandler from "../middleware/asyncHandler.js";
import generatePaypalToken from "../utils/generatePaypalToken.js";
import Subscription from "../models/subscriptionModel.js";
import axios from "axios";
import User from "../models/userModel.js";
import Invoice from "../models/invoiceModel.js";
import Config from "../models/configModel.js";
import loadConfig from "../config/config.js";

// @desc    Handeler for paypal subscription request
// @route   POST /api/subscription/
// @access  Private
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
      const subscription = await createSubscriptionInDB(user, data);
      await updateUserSubscriptionStatus(user, subscription);
      await createInvoiceInDB(subscription);
      res.status(201).send({ subscriptionId: subscription.subscriptionId });
    }
  } catch (err) {
    res.status(500);
    throw new Error(`Paypal error: ${err}`);
  }
  res.status(200);
});

// @desc    Get invoices
// @route   GET /api/subscription/invoices
// @access  Private
const getInvoices = asyncHandler(async (req, res) => {
  let invoices;
  try {
    invoices = await Invoice.find({ user: req.user._id });
  } catch (err) {
    res.status(500);
    throw new Error(`DB error`);
  }
  const response = invoices.map((invoice) => ({
    id: invoice._id,
    amount: invoice.amount,
    created_at: invoice.createdAt,
  }));
  res.status(200).json(response);
});

// @desc    Get invoice by id
// @route   GET /api/subscription/invoices/:id
// @access  Private
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoiceId = req.params.id;
  let invoice;
  try {
    invoice = await Invoice.findById(invoiceId);
  } catch (err) {
    res.status(500);
    throw new Error(`DB error`);
  }
  if (!invoice) {
    res.status(404).json({ message: "Invoice not found" });
    return;
  }
  res.status(200).json({
    id: invoice._id,
    amount: invoice.amount,
    created_at: invoice.createdAt,
  });
});

async function createInvoiceInDB(subscription) {
  const subscriptionConfig = await Config.findById(subscription.config);
  const plan = subscriptionConfig.plan.find(
    (plan) => plan.paypal_id === subscription.planId
  );
  const invoice = await Invoice.create({
    user: subscription.user,
    subscription: subscription._id,
    plan: subscription.tier,
    amount: plan.price,
    currency: "USD",
    paidDate: new Date(),
    paymentMethod: "Paypal",
    billingAddress: "",
  });
  invoice.save();
  return invoice;
}

async function createSubscriptionInDB(user, data) {
  const config = await loadConfig();
  const plan = config.plan.find((plan) => plan.paypal_id === data.plan_id);
  const subscription = await Subscription.create({
    user: user._id,
    config: config._id,
    email: data.subscriber.email_address,
    payerId: data.subscriber.payer_id,
    payerName: data.subscriber.name.given_name,
    payerSurname: data.subscriber.name.surname,
    tier: plan.tier,
    status: data.status,
    subscriptionId: data.id,
    planId: plan.paypal_id,
    startTime: new Date(data.start_time),
    nextBillingDate: new Date(data.billing_info.next_billing_time),
    cancelLink: data.links[0].href,
  });
  subscription.save();
  return subscription;
}

async function updateUserSubscriptionStatus(user, subscription) {
  const config = await loadConfig();
  const plan = config.plan.find(
    (plan) => plan.paypal_id === subscription.planId
  );
  user.subscription = subscription._id;
  user.tier = subscription.tier;
  user.urlsUsesLeft = user.urlsUsesLeft + plan.useLimit;
  user.nextResetDate = subscription.nextBillingDate;
  user.save();
  return user;
}

export { createSubscription, getInvoices, getInvoiceById };
