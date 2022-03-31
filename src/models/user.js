import mongoose, { Schema } from "mongoose";
import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid"

const userSchema = new Schema({
  email: {
    type: string,
    required: true,
    trim: true,
    unique: true,
  },
  username: {
    type: string,
    required: true,
  },
  password: {
    type: string,
    required: true,
    minlength: 5,
  }, salt: {
    type: string,
  }, role: {
    type: number,
    default: 0
  }
}, { timestamps: true });
userSchema.methods = {
  authenticate(password) {
    return this.password === this.encryptPassword(password);
  },
  encryptPassword(password) {
    if (!password) return
    try {
      return createHmac("sha256", this.salt).update(password).digest("hex");
    } catch (error) {
      console.log(error);
    }
  }
}
userSchema.pre("save", function (next) {
  this.salt = uuidv4();
  this.password = this.encryptPassword(this.password);
  next();
})
export default mongoose.model("Users", userSchema);