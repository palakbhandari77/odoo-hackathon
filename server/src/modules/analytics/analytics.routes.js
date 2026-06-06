// src/modules/analytics/analytics.routes.js
const express = require('express');
const analyticsController = require('./analytics.controller');
const { protect, restrictTo } = require('../../middlewares/auth');

const router = express.Router();

router.use(protect);

// Only Admins, Managers, and Procurement Officers can view the dashboard analytics
router.get('/dashboard', restrictTo('Admin', 'Manager', 'Procurement Officer'), analyticsController.getDashboard);

module.exports = router;