import mongoose from "mongoose";
const Product = mongoose.model("Products",{name:String});


const data = [
  {id:1,name:"Product A"},
  {id:2,name:"Product B"},
];

export const list = async (req,res)=>{
  try {
    const products = await Product.find({}).exec();
    res.json(products);
} catch (error) {
    res.status(400).json({
        error: "Không có sản phẩm"
    })
}
};
export const create = async (req,res)=>{
  try {
    const product = await new Product(req.body).save();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      error: "failed to add product",
    })
  }
};
export const getOne = async (req,res)=>{
  try {
    const products = await Product.find({}).exec();
    res.json(products);
} catch (error) {
    res.status(400).json({
        error: "Không có sản phẩm"
    })
}
};
export const remove = async (req,res)=>{
  try {
    const product = await Product.findOneAndDelete({_id:req.params.id}).exec();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      error:"Delete product failed"
    })
  }
};
export const update = async (req,res)=>{
  const condition = {_id:req.params.id};
  const update =req.body;
  try {
    const product = await Product.findOneAndUpdate(condition,update).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      error:"Update product failed",
    })
  }
};