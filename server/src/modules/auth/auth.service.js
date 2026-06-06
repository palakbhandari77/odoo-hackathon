// src/modules/auth/auth.service.js
const bcrypt = require('bcryptjs');
const authRepository = require('./auth.repository');
const { generateToken } = require('../../shared/utils/jwt');
const AppError = require('../../shared/errors/AppError');

const loginUser = async (email, password) => {
  // 1. Check if user exists
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // 2. Check if account is active
  if (!user.is_active) {
    throw new AppError('This account has been deactivated. Contact Admin.', 403);
  }

  // 3. Verify password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  // 4. Generate JWT
  const payload = {
    id: user.id,
    role: user.role,
  };
  const token = generateToken(payload);

  return {
    user: { id: user.id, email: user.email, role: user.role },
    token,
  };
};

module.exports = {
  loginUser,
};