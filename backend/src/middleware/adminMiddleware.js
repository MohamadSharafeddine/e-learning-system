import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const adminMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user || !user.isAdmin) {
      return res.status(403).send("Access denied. You are not an admin.");
    }
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default adminMiddleware;
