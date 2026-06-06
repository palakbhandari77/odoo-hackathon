// src/modules/rfq/rfq.routes.js
const express = require('express');
const rfqController = require('./rfq.controller');
const { protect, restrictTo } = require('../../middlewares/auth');

const router = express.Router();

// All RFQ routes require authentication
router.use(protect);

// Only Procurement Officers can create RFQs
router.post('/', restrictTo('Procurement Officer'), rfqController.create);

// Admins, Managers, and Procurement Officers can view RFQs
router.get('/', restrictTo('Admin', 'Manager', 'Procurement Officer'), rfqController.getAll);

module.exports = router;