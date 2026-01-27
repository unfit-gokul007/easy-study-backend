
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";


import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";



// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Easy Study Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
