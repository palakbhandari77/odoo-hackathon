// src/server.js
require('dotenv').config();
const app = require('./app');
const db = require('./config/database');
const logger = require('./shared/logger');

// Handle synchronous exceptions that escape the Express pipeline
process.on('uncaughtException', err => {
  logger.error(`UNCAUGHT EXCEPTION! 💥 Shutting down...`);
  logger.error(err.stack);
  process.exit(1);
});

const port = process.env.PORT || 5000;

// Test DB Connection and Start Server
db.query('SELECT NOW()')
  .then(() => {
    logger.info('Database connection established successfully.');
    
    const server = app.listen(port, () => {
      logger.info(`VendorBridge server running on port ${port} in ${process.env.NODE_ENV} mode.`);
    });

    // Handle asynchronous rejections (e.g., failed DB connections later on)
    process.on('unhandledRejection', err => {
      logger.error(`UNHANDLED REJECTION! 💥 Shutting down gracefully...`);
      logger.error(err.stack);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    logger.error('Failed to connect to the database', err);
    process.exit(1);
  });