// src/middlewares/security.js
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const setupSecurity = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Enable CORS (Configure origin for production)
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://yourfrontend.com' : '*',
    credentials: true
  }));

  // Limit requests from same API
  const limiter = rateLimit({
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);
};

module.exports = setupSecurity;