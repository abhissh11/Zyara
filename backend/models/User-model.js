import mongoose from "mongoose";
import Order from "./Order-model.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Please fill a valid phone number"],
    },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true, maxLength: 6 },
        country: { type: String, required: true, default: "India" },
        isDefault: { type: Boolean, default: false },
      },
    ],
    // Roles and permissions
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Order history
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Order,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
