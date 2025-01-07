import express from 'express';

import {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
} from '../services/note.service.js';
import { validateNote } from '../utils/validator.js';

const router = express.Router();

router.post('/', validateNote, createNote);
router.get('/', getNotes);
router.get('/:id', getNote);
router.delete('/:id', deleteNote);
router.put('/:id', updateNote);

export default router;
