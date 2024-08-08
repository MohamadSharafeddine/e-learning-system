import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Authenticated user:", req.user); 
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export const admin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log("Checking admin role for user:", user); 
  if (user.role !== "admin") return res.status(403).send("Access denied.");
  next();
};
