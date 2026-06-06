// src/modules/invoice/invoice.routes.js
const express = require('express');
const invoiceController = require('./invoice.controller');
const { protect, restrictTo } = require('../../middlewares/auth');

const router = express.Router();

router.use(protect);

// Only Procurement Officers and Admins can generate invoices from a PO
router.post('/generate/:poId', restrictTo('Procurement Officer', 'Admin'), invoiceController.generate);

// Internal staff can view all invoices
router.get('/', restrictTo('Admin', 'Manager', 'Procurement Officer'), invoiceController.getAll);

module.exports = router;