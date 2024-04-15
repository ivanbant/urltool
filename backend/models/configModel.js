import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  paypal_id: String,
  tier: String,
  price: String,
  useLimit: Number,
});

const ConfigSchema = new mongoose.Schema(
  {
    current: {
      type: Boolean,
      required: false,
      default: false,
    },
    plan: [planSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Config", ConfigSchema);
