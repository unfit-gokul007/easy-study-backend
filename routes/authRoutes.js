import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// protected test route
router.get("/me", protect, (req, res) => {
  res.json({ userId: req.user });
});

export default router;
