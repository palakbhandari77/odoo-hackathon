// src/modules/vendor/vendor.service.js
const bcrypt = require('bcryptjs');
const db = require('../../config/database');
const vendorRepository = require('./vendor.repository');
const authRepository = require('../auth/auth.repository');
const AppError = require('../../shared/errors/AppError');

const registerVendor = async (email, password, companyName, gstNumber) => {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN'); // Start Transaction

    // 1. Check if user already exists
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) throw new AppError('Email is already registered', 400);

    // 2. Get the 'Vendor' Role ID
    const role = await authRepository.findRoleByName('Vendor');
    
    // 3. Hash password and create User
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await authRepository.createUser(client, email, passwordHash, role.id);

    // 4. Create Vendor Profile linked to User
    const newVendor = await vendorRepository.createVendor(client, newUser.id, companyName, gstNumber);

    await client.query('COMMIT'); // Commit Transaction
    return newVendor;
    
  } catch (error) {
    await client.query('ROLLBACK'); // Abort on failure
    throw error;
  } finally {
    client.release();
  }
};

const getVendorsList = async () => {
  return await vendorRepository.getAllVendors();
};

const approveVendor = async (vendorId) => {
  const updatedVendor = await vendorRepository.updateVendorStatus(vendorId, 'Active');
  if (!updatedVendor) throw new AppError('Vendor not found', 404);
  return updatedVendor;
};

module.exports = {
  registerVendor,
  getVendorsList,
  approveVendor,
};