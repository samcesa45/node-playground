import express from 'express';
const app = express();
import cors from 'cors';
import notesRouter from './controllers/notes.js';
import * as middleware from './utils/middleware.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

export default app;
