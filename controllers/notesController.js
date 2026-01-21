import Note from "../models/Note.js";

/**
 * GET /api/notes
 */
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

/**
 * POST /api/notes
 */
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title & content required" });
    }

    const note = await Note.create({
      user: req.user,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Create note failed" });
  }
};

/**
 * PUT /api/notes/:id
 */
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Update note failed" });
  }
};

/**
 * DELETE /api/notes/:id
 */
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete note failed" });
  }
};
