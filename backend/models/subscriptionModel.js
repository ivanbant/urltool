import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  config: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Config",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  payerId: {
    type: String,
    required: true,
  },
  payerName: {
    type: String,
    required: false,
  },
  payerSurname: {
    type: String,
    required: false,
  },
  tier: {
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
  planId: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  nextBillingDate: {
    type: Date,
    required: true,
  },
  cancelLink: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Subscription", SubscriptionSchema);
