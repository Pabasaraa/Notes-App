import Note from '../schemas/note.schema.js';

export const createNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.json({ message: error });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const removedNote = await Note.deleteOne({ _id: req.params.id });
    res.json(removedNote);
  } catch (error) {
    res.json({ message: error });
  }
};

export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title, content: req.body.content } }
    );
    res.json(updatedNote);
  } catch (error) {
    res.json({ message: error });
  }
};
