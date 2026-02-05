import Note from "../models/Note.js";

// Create note
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user,
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
