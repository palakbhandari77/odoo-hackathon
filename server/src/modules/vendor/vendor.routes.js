// src/modules/vendor/vendor.routes.js
const express = require('express');
const vendorController = require('./vendor.controller');
const { protect, restrictTo } = require('../../middlewares/auth');

const router = express.Router();

// Public Route: Vendors self-register
router.post('/register', vendorController.register);

// Protected Routes: Require valid JWT
router.use(protect); 

// Only Admin and Procurement Officer can view the vendor list
router.get('/', restrictTo('Admin', 'Procurement Officer'), vendorController.getAll);

// Only Admin and Manager can approve vendors
router.patch('/:id/approve', restrictTo('Admin', 'Manager'), vendorController.approve);

module.exports = router;