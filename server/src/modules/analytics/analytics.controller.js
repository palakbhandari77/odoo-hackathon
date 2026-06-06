// src/modules/analytics/analytics.controller.js
const analyticsService = require('./analytics.service');
const { successResponse } = require('../../shared/utils/apiResponse');

const getDashboard = async (req, res, next) => {
  try {
    const dashboardData = await analyticsService.getDashboardData();
    return successResponse(res, 200, 'Dashboard analytics retrieved successfully', dashboardData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};