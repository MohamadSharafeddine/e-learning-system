import express from "express";
import { Course } from "../models/course.model.js";
import { File } from "../models/file.model.js";
import { Withdrawal } from "../models/withdrawal.model.js";
import { auth, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/courses", [auth, admin], async (req, res) => {
  const { title, description } = req.body;
  const course = new Course({ title, description });

  try {
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send({ message: "Failed to add course", error });
  }
});

router.get("/courses/:courseId/students", [auth, admin], async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).populate("students");
  if (!course) return res.status(404).send("Course not found");
  res.send(course.students);
});

router.post("/files", [auth, admin], async (req, res) => {
});

router.get("/withdrawals", [auth, admin], async (req, res) => {
  const withdrawals = await Withdrawal.find()
    .populate("user")
    .populate("course");
  res.send(withdrawals);
});

router.put("/withdrawals/:id", [auth, admin], async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const withdrawal = await Withdrawal.findById(id);
  if (!withdrawal) return res.status(404).send("Withdrawal request not found");
  withdrawal.status = status;
  await withdrawal.save();
  res.send(withdrawal);
});

export default router;
