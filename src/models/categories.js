import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema({
  name: {
    type: string,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);