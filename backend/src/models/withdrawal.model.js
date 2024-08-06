import mongoose, { Schema } from "mongoose";

const withdrawalSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

export { Withdrawal };
