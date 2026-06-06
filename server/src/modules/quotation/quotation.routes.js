// src/modules/quotation/quotation.routes.js
const express = require('express');
const quotationController = require('./quotation.controller');
const { protect, restrictTo } = require('../../middlewares/auth');

const router = express.Router();

router.use(protect);

// Vendors submit their bids
router.post('/submit', restrictTo('Vendor'), quotationController.submit);

// Procurement and Management compare the bids for a specific RFQ
router.get('/compare/:rfqId', restrictTo('Procurement Officer', 'Manager', 'Admin'), quotationController.compare);

module.exports = router;