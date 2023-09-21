import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  urlId: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  qrClicks: {
    type: Number,
    required: true,
    default: 0,
  },
  qrImage: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model("Url", UrlSchema);
