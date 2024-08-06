import express from "express";
import {
  createWithdrawal,
  getWithdrawals,
  updateWithdrawal,
} from "../controllers/withdrawal.controller.js";

const router = express.Router();

router.post("/", createWithdrawal);
router.get("/", getWithdrawals);
router.put("/:id", updateWithdrawal);

export default router;
