import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: true,
  },
  billingToken: {
    type: String,
    required: true,
  },
  billingPlanId: {
    type: String,
    required: true,
  },
  nextBillingDate: {
    type: Date,
    required: true,
  },
});
