import mongoose, { Schema, ObjectId } from "mongoose";
const productSchema = new Schema({
  name: {
    type: string,
    minLength: 5,
    required: true,
    unique: true
  },
  image: {
    type: string,
    default: "https://m.media-amazon.com/images/I/712yjQksyHL._AC_SY450_.jpg"
  },
  price: {
    type: number,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: "Category"
  },
  description: {
    type: string,
    default: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus adipisci facilis cumque expedita fugit voluptatum nam deleniti est consequatur et."
  },
  discount: {
    type: number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);