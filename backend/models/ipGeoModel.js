import mongoose from "mongoose";

const IpGeoSchema = new mongoose.Schema({
  startIP: {
    type: Number,
    required: true,
  },
  endIP: {
    type: Number,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
});
IpGeoSchema.index({ startIP: 1, endIP: 1 });

export default mongoose.model("IpGeo", IpGeoSchema);
