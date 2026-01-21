

import "dotenv/config";
import express from "express";


connectDB();

import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"



const app = express();

console.log("API KEY:", process.env.OPENAI_API_KEY);


app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/files", fileRoutes);
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)

);
