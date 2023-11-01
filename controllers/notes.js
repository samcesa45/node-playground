import express from 'express';
import Note from '../models/note.js';
import * as logger from '../utils/logger.js';

const notesRouter = express.Router();

notesRouter.get('/', async (request, response, next) => {
  try {
    const notes = await Note.find({});
    return response.json(notes);
  } catch (error) {
    logger.logError(error);
    next(error);
  }
});

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      return response.json(note);
    } else {
      return response.status(404).end();
    }
  } catch (error) {
    logger.logError(error);
    next(error);
  }
});

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (error) {
    logger.logError(error);
    next(error);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } catch (error) {
    logger.logError(error);
    next(error);
  }
});

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };
  try {
    const updatedNote = Note.findByIdAndUpdate(request.params.id, note, {new: true});
    response.json(updatedNote);
  } catch (error) {
    logger.logError(error);
    next(error);
  }
});

export default notesRouter;
