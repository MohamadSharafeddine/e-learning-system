import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already registered.");
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.send({ message: "User registered", user });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

export default router;
