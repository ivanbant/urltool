import asyncHandler from "../middleware/asyncHandler";
import generatePaypalToken from "../utils/generatePaypalToken";
import Subscription from "../models/subscriptionModel";
import axios from "axios";
import User from "../models/userModel";
import Invoice from "../models/invoiceModel";
import Config from "../models/configModel";
import loadConfig from "../config/config";
import { Response } from "express";
import { PrivateRequest } from "../types/Auth";
import { SubscriptionMongoType } from "../types/Subscription";
import { UserMongoType } from "../types/Auth";
import { PlanType } from "../types/Config";

// @desc    Get user subscription
// @route   GET /api/subscription/userId
// @access  Private
const getUserSubscription = asyncHandler(
  async (req: PrivateRequest, res: Response) => {
    if (!req.user) throw new Error("Not authorized");
    const userId = req.user._id;
    let subscription;
    try {
      subscription = await Subscription.findOne({ user: userId });
    } catch {
      res.status(500);
      throw new Error("DB Error");
    }
    res.status(200);
    if (subscription) {
      res.json({
        tier: subscription.tier,
        status: subscription.status,
        cancelLink: subscription.cancelLink,
        paymentMethod: subscription.paymentMethod,
        nextBillingDate: subscription.nextBillingDate,
        startTime: subscription.startTime,
      });
      return;
    }
    res.json({});
  }
);

// @desc    Handeler for paypal subscription request
// @route   POST /api/subscription/
// @access  Private
const createSubscription = asyncHandler(
  async (req: PrivateRequest, res: Response) => {
    if (!req.user) throw new Error("Not authorized");
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
        if (!user) throw new Error("Not authorized");
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
  }
);

// @desc    Get invoices
// @route   GET /api/subscription/invoices
// @access  Private
const getInvoices = asyncHandler(async (req: PrivateRequest, res: Response) => {
  if (!req.user) throw new Error("Not authorized");
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
const getInvoiceById = asyncHandler(
  async (req: PrivateRequest, res: Response) => {
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
  }
);

async function createInvoiceInDB(subscription: SubscriptionMongoType) {
  const subscriptionConfig = await Config.findById(subscription.config);
  if (!subscriptionConfig) {
    throw new Error("Subscription config not found");
  }
  const plan = subscriptionConfig.plan.find(
    (plan: PlanType) => plan.paypal_id === subscription.planId
  );
  if (!plan) {
    throw new Error("Subscription config not found");
  }
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

async function updateSubscriptionInDB(user: UserMongoType, data: any) {
  const subscription = await Subscription.findOne({ user: user._id });
  if (!subscription) return undefined;
  const config = await loadConfig();
  if (!config) return undefined;
  const plan = config.plan.find((plan) => plan.paypal_id === data.plan_id);
  if (!plan) return undefined;
  subscription.config = config._id;
  subscription.email = data.subscriber.email_address;
  subscription.payerId = data.subscriber.payer_id;
  subscription.payerName = data.subscriber.name.given_name;
  subscription.payerSurname = data.subscriber.name.surname;
  subscription.tier = plan.tier;
  subscription.status = data.status;
  subscription.subscriptionId = data.id;
  subscription.planId = plan.paypal_id;
  subscription.startTime = new Date(data.start_time);
  subscription.nextBillingDate = new Date(data.billing_info.next_billing_time);
  subscription.cancelLink = data.links[0].href;
  subscription.save();
  return subscription;
}

async function createSubscriptionInDB(user: UserMongoType, data: any) {
  const config = await loadConfig();
  if (!config) {
    throw new Error("Subscription config not found");
  }
  const plan = config.plan.find((plan) => plan.paypal_id === data.plan_id);
  if (!plan) {
    throw new Error("Subscription config not found");
  }
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

async function updateUserSubscriptionStatus(
  user: UserMongoType,
  subscription: SubscriptionMongoType
) {
  const config = await loadConfig();
  if (!config) {
    throw new Error("Subscription config not found");
  }
  const plan = config.plan.find(
    (plan) => plan.paypal_id === subscription.planId
  );
  if (!plan) {
    throw new Error("Subscription config not found");
  }
  user.subscription = subscription._id;
  user.tier = subscription.tier;
  user.urlsUsesLeft =
    (user.urlsUsesLeft ? user.urlsUsesLeft : 0) + plan.useLimit;
  user.nextResetDate = subscription.nextBillingDate;
  user.save();
  return user;
}

export { createSubscription, getInvoices, getInvoiceById, getUserSubscription };
