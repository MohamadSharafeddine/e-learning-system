import express from "express";
import { Withdrawal } from "../models/withdrawal.model.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const withdrawal = new Withdrawal({
      userId,
      courseId,
    });

    await withdrawal.save();
    res
      .status(201)
      .send({ message: "Withdrawal request submitted", withdrawal });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to submit withdrawal request", error });
  }
});

router.get("/", adminMiddleware, async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate("userId courseId");
    res.status(200).send(withdrawals);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to fetch withdrawal requests", error });
  }
});

router.put("/:id", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).send({ message: "Invalid status" });
    }

    const withdrawal = await Withdrawal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!withdrawal) {
      return res.status(404).send({ message: "Withdrawal request not found" });
    }

    res
      .status(200)
      .send({
        message: `Withdrawal request ${status.toLowerCase()}`,
        withdrawal,
      });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to update withdrawal request", error });
  }
});

export default router;
