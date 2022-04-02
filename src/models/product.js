import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: Object,
    default: "https://m.media-amazon.com/images/I/712yjQksyHL._AC_SY450_.jpg"
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus adipisci facilis cumque expedita fugit voluptatum nam deleniti est consequatur et."
  },
  discount: {
    type: Number,
    default: 0
  },
  view: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  switch: {
    type: Array,
  },
  color: {
    type: Array,
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);