import product from "../models/product";
import Product from "../models/product";

export const list = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category").exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: error.message,
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
      message: error.message,
    })
  }
};
export const fetchProductByCategory = async (req, res) => {
  try {
    const { range, order } = req.query;
    let filters = {};
    if (range === "under-5") {
      filters.price = { $lte: 5 };
    }
    else if (range === "under-10") {
      filters.price = { $gt: 5, $lte: 10 };
    }
    else if (range === "under-15") {
      filters.price = { $gt: 10, $lte: 15 };
    }
    else if (range === "under-20") {
      filters.price = { $gt: 15, $lte: 20 };
    }
    const condition = req.params.id ? { category: req.params.categoryId } : {}
    console.log(condition)
    const products = await Product.find({ condition, ...filters }).sort({ createdAt: order }).exec();

    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
};
export const remove = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id }).exec();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
};
export const update = async (req, res) => {
  const condition = { _id: req.params.id };
  const update = req.body;
  try {
    const product = await Product.findOneAndUpdate(condition, update, { new: true }).populate("category").exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
};
export const ProductSearchByName = async (req, res) => {
  try {
    var q = req.query.q;
    const data = await Product.find({
      name: {
        $regex: new RegExp(q)
      }

    }, {
      __v: 0
    }).limit(10);
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }


}