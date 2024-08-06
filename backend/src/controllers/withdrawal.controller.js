import { Withdrawal } from "../models/withdrawal.model.js";

export const createWithdrawal = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const withdrawal = new Withdrawal({ userId, courseId });
    await withdrawal.save();
    res.status(201).send({ message: "Withdrawal request created", withdrawal });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to create withdrawal request", error });
  }
};

export const getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate("userId")
      .populate("courseId");
    res.send(withdrawals);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch withdrawal requests", error });
  }
};

export const updateWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal)
      return res.status(404).send({ message: "Withdrawal request not found" });

    withdrawal.status = status;
    await withdrawal.save();
    res.send({ message: "Withdrawal request updated", withdrawal });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to update withdrawal request", error });
  }
};
