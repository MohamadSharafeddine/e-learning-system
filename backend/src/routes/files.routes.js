import express from "express";
import {
  uploadFile,
  getFilesByCourse,
  downloadFile,
  uploadMiddleware,
} from "../controllers/file.controller.js";

const router = express.Router();

router.post("/:courseId", uploadMiddleware, uploadFile);
router.get("/:courseId", getFilesByCourse);
router.get("/download/:fileId", downloadFile);

export default router;
