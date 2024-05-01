import mongoose, { Schema } from "mongoose";

const planSchema: Schema = new mongoose.Schema({
  paypal_id: String,
  tier: String,
  price: String,
  useLimit: Number,
});

const ConfigSchema: Schema = new mongoose.Schema(
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
