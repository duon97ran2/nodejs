import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
      totalPrice: Number
    }
  ],
  grandTotal: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }

}, { timestamp: true });

export default mongoose.model("Cart", cartSchema);