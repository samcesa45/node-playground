import * as logger from './logger.js';

export const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path: ', request.path);
  logger.info('Body: ', request.body);
  logger.info('---');
  next();
};

export const unknownEndPoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

export const errorHandler = (error, request, response, next) => {
  logger.logError(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }

  next(error);
};
