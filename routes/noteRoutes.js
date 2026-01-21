import express from "express";
import protect from "../middleware/authMiddleware.js";
import Note from "../models/Note.js";

const router = express.Router();

/* CREATE NOTE */
router.post("/", protect, async (req, res) => {
  const note = await Note.create({
    user: req.user,
    title: req.body.title,
    content: req.body.content
  });
  res.status(201).json(note);
});

/* GET NOTES (WITH SEARCH) */
router.get("/", protect, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { content: { $regex: req.query.search, $options: "i" } }
        ]
      }
    : {};

  const notes = await Note.find({ user: req.user, ...keyword }).sort({
    createdAt: -1
  });

  res.json(notes);
});

/* UPDATE NOTE */
router.put("/:id", protect, async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) return res.status(404).json({ message: "Note not found" });

  note.title = req.body.title;
  note.content = req.body.content;

  const updated = await note.save();
  res.json(updated);
});

/* DELETE NOTE */
router.delete("/:id", protect, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

export default router;
