import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: false },
    tier: {
      type: String,
      required: true,
      enum: ["unregistered", "free", "pro", "enterprise"],
      default: "free",
    },
    urlsCreated: { type: Number, required: false, default: 0 },
    userCookies: { type: String, required: false },
    fingerprint: { type: String, required: false },
    uregUserEntryDate: { type: Date, required: false, expires: "30d" },
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
