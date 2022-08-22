import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatarUrl: String,
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String },
  location: String,
});

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;