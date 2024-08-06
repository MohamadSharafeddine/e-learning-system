import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ message: "User registered", user });
  } catch (error) {
    res.status(400).send({ message: "Failed to register user", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch users", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch user", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User updated", user });
  } catch (error) {
    res.status(400).send({ message: "Failed to update user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User deleted" });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete user", error });
  }
};
