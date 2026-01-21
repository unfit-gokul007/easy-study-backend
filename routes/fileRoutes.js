import express from "express";
import multer from "multer";
import File from "../models/File.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

const router = express.Router();

// multer config
const upload = multer({ dest: "uploads/" });

// POST → upload file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.path);

    const savedFile = await File.create({
      originalName: req.file.originalname,
      fileType: req.file.mimetype,
      cloudinaryUrl: result.secure_url,
    });

    res.status(200).json({
      message: "File uploaded successfully",
      file: savedFile,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

// GET → list all files
router.get("/", async (req, res) => {
  const files = await File.find().sort({ createdAt: -1 });
  res.json(files);
});

export default router;
