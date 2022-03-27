import User from "../models/user";

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
export const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    req.profile = user;
    req.profile.password = undefined;
    next();
  } catch (error) {
    console.log(error);
  }
}
