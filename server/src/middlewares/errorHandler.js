// src/middlewares/errorHandler.js
const logger = require('../shared/logger');
const { errorResponse } = require('../shared/utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message, isOperational } = err;

  // Default to 500 if no status code is set
  statusCode = statusCode || 500;
  message = message || 'Internal Server Error';

  // Log the error
  if (!isOperational) {
    logger.error(`[UNEXPECTED ERROR] ${err.stack}`);
  } else {
    logger.warn(`[OPERATIONAL ERROR] ${statusCode} - ${message}`);
  }

  // Hide detailed error messages in production for 500s
  if (process.env.NODE_ENV === 'production' && !isOperational) {
    message = 'Something went wrong on our end.';
  }

  return errorResponse(res, statusCode, message);
};

module.exports = errorHandler;