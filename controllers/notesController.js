import Note from "../models/Note.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields required" });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note" });
  }
};

// GET USER NOTES
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};
