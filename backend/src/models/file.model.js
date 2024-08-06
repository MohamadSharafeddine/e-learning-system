import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  filePath: { type: String, required: true },
  fileName: { type: String, required: true },
});

const File = mongoose.model("File", fileSchema);

export { File };
