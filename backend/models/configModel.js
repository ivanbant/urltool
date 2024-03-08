import mongoose from "mongoose";

const planSchema = new Schema({
  paypal_id: String,
  tier: String,
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
