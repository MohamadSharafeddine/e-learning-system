import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already in use" });
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ message: "User registered", user });
  } catch (error) {
    res.status(400).send({ message: "Failed to register user", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "500000h",
    });
    res.send({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).send({ message: "Failed to login", error: error.message });
  }
};
