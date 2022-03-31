import { json } from "express";
import User from "../models/user";
import crypto from "crypto"

export const list = async (req, res) => {
  try {
    const user = await User.find({}).exec();
    res.json(user);
  } catch (error) {
    res.json({ error: "Cant load user list" })
  }
}
export const remove = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(user);
  } catch (error) {
    res.json({ error: "Cant find user" })
  }
}
export const getUserById = async (req, res,) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.password = null;
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    }
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
};
export const createUser = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    user.password = null;
    res.status(200).json({
      message: "New user created",
      user
    });
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

