import Category from "../models/categories";
import Product from "../models/product";

export const create = async (req, res) => {
  try {
    const category = await new Category(req.body).save();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      error: "Cant create category"
    })
  }
};
export const list = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      error: "Cant read category"
    })
  }
};
export const remove = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id }).exec();
    if (category) {
      return res.json(category);
    }
    res.status(404).json({ error: "Id not found" })
  } catch (error) {
    res.status(400).json({
      error: "Cant delete category"
    })
  }
};
export const update = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
    if (category) {
      return res.json(category);
    }
    res.status(404).json({ error: "Id not found" })
  } catch (error) {
    res.status(400).json({
      error: "Cant update category"
    })
  }
};
export const getOne = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    const products = await Product.findOne({ category }).exec();
    if (category) {
      return res.json({ category, products });
    }
    res.status(404).json({ error: "Id not found" })
  } catch (error) {
    res.status(400).json({
      error: "Cant find category"
    })
  }
};