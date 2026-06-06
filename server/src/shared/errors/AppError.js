// src/shared/errors/AppError.js
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational; // True for expected errors (e.g. invalid login)

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;