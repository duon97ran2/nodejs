import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderCode: {
    type: String,
    required: true,
  },
  shippingInfo: {
    name: {
      type: String
    },
    address: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    note: {
      type: String
    },
  },
  products: {
    type: Array
  },
  total: {
    type: Number
  },
  status: {
    type: String,
    enum: ["pending", "confirm", "shipping", "complete", "canceled"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  }
}, { timestamp: true });

export default mongoose.model("Orders", orderSchema);