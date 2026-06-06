// src/app.js
const express = require('express');
const cors = require('cors'); // <-- Imported
const setupSecurity = require('./middlewares/security');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./shared/errors/AppError');

const app = express();

// 1. GLOBAL MIDDLEWARES
app.use(cors()); // <-- ACTIVATED! (Must be before routes)
setupSecurity(app);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); 

// 2. ROUTES
app.use('/api/v1/auth', require('./modules/auth/auth.routes'));
app.use('/api/v1/vendors', require('./modules/vendor/vendor.routes'));
app.use('/api/v1/rfqs', require('./modules/rfq/rfq.routes'));
app.use('/api/v1/quotations', require('./modules/quotation/quotation.routes'));
app.use('/api/v1/pos', require('./modules/po/po.routes'));
app.use('/api/v1/invoices', require('./modules/invoice/invoice.routes'));
app.use('/api/v1/analytics', require('./modules/analytics/analytics.routes'));

// Handle unhandled routes (404) - FIXED for Express 5!
// Changed app.all('*') to app.use()
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 3. GLOBAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;