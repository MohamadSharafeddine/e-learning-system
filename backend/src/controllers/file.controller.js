import { File } from "../models/file.model.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const uploadFile = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!req.file) {
      throw new Error("File not provided");
    }
    const file = new File({
      courseId,
      filePath: req.file.path,
      fileName: req.file.originalname,
    });
    await file.save();
    res.status(201).send(file);
  } catch (error) {
    console.error("Error during file upload:", error);
    res
      .status(400)
      .send({ message: "Failed to upload file", error: error.message });
  }
};

export const getFilesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const files = await File.find({ courseId });
    res.send(files);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch files", error });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);
    if (!file) return res.status(404).send({ message: "File not found" });
    res.download(file.filePath, file.fileName);
  } catch (error) {
    res.status(500).send({ message: "Failed to download file", error });
  }
};

export const uploadMiddleware = upload.single("file");
