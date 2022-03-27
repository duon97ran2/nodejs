import User from "../models/user";
import { generateToken } from "../utils/accesstoken";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user.authenticate(req.body.password)) {
      return res.json({
        message: "Login success",
        data: {
          token: generateToken({ id: user._id }),
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
          }
        }
      });
    }
    res.status(400).json({ message: "Invalid email,password" });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};
export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const exist = await User.findOne({ email: email }).exec();
    if (exist) {
      return res.status(401).send({ message: "Email already exist" });
    }
    const user = await new User({ email, password, username }).save();
    res.json({ message: "Regiter success", user });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
