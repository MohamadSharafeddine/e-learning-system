import express from "express";
import multer from "multer";
import { File } from "../models/file.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const { originalname, mimetype, path, size } = req.file;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).send({ message: "Course ID is required" });
    }

    const file = new File({
      originalName: originalname,
      mimeType: mimetype,
      path,
      size,
      courseId,
    });

    await file.save();
    res.status(201).send({ message: "File uploaded successfully", file });
  } catch (error) {
    console.error("Failed to upload file:", error);
    res
      .status(500)
      .send({ message: "Failed to upload file", error: error.message });
  }
});

export default router;
