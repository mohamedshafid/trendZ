import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    phone: { type: String },
    street: { type: String },
    city: { type: String },
    pincode: { type: String },
    country: { type: String, default: "India" },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      type: addressSchema,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model.User || mongoose.model("User", userSchema);
