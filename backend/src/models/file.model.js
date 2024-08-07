import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const File = mongoose.model("File", fileSchema);

export { File };
