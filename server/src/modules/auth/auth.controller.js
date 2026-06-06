// src/modules/auth/auth.controller.js
const authService = require('./auth.service');
const { successResponse } = require('../../shared/utils/apiResponse');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic input check before hitting service
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const result = await authService.loginUser(email, password);

    return successResponse(res, 200, 'Login successful', result);
  } catch (error) {
    next(error); // Passes error to our global errorHandler
  }
};

module.exports = {
  login,
};