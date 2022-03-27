import Product from "../models/product";

export const list = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category").exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      error: "No product found"
    })
  }
};
export const create = async (req, res) => {
  try {
    const saveProduct = await new Product(req.body).save();
    const product = await saveProduct.populate("category");
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
};
export const getOne = async (req, res) => {
  try {
    const products = await Product.findOne({ _id: req.params.id }).exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      error: "Không có sản phẩm"
    })
  }
};
export const remove = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id }).exec();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      error: "Delete product failed"
    })
  }
};
export const update = async (req, res) => {
  const condition = { _id: req.params.id };
  const update = req.body;
  try {
    const product = await Product.findOneAndUpdate(condition, update).populate("category").exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      error: "Update product failed",
    })
  }
};