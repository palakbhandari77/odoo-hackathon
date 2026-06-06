// src/shared/logger/index.js
const winston = require('winston');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: process.env.NODE_ENV === 'production' ? winston.format.json() : logFormat,
  transports: [
    new winston.transports.Console()
  ],
});

module.exports = logger;