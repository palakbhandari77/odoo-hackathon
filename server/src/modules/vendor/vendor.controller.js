// src/modules/vendor/vendor.controller.js
const vendorService = require('./vendor.service');
const { successResponse } = require('../../shared/utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const { email, password, companyName, gstNumber } = req.body;
    
    if (!email || !password || !companyName || !gstNumber) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const vendor = await vendorService.registerVendor(email, password, companyName, gstNumber);
    return successResponse(res, 201, 'Vendor registered successfully and is pending approval', vendor);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const vendors = await vendorService.getVendorsList();
    return successResponse(res, 200, 'Vendors retrieved successfully', vendors);
  } catch (error) {
    next(error);
  }
};

const approve = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vendor = await vendorService.approveVendor(id);
    return successResponse(res, 200, 'Vendor approved successfully', vendor);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getAll,
  approve,
};