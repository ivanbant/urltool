import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: false },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: false,
    },
    tier: { type: String, required: true },
    urlsUsesLeft: { type: Number, required: true, default: 0 },
    fingerprint: { type: String, required: false },
    nextResetDate: {
      type: Date,
      required: true,
      default: new Date().setMonth(new Date().getMonth() + 1),
    },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

export default User;
