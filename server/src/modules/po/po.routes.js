// src/modules/po/po.routes.js
const express = require('express');
const poController = require('./po.controller');
const { protect, restrictTo } = require('../../middlewares/auth');

const router = express.Router();

router.use(protect);

// Only Managers and Admins can approve quotes and generate POs
router.post('/generate/:quotationId', restrictTo('Manager', 'Admin'), poController.approveQuotation);

// Internal staff can view POs
router.get('/', restrictTo('Admin', 'Manager', 'Procurement Officer'), poController.getAll);

module.exports = router;