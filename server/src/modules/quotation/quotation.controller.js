// src/modules/quotation/quotation.controller.js
const quotationService = require('./quotation.service');
const { successResponse } = require('../../shared/utils/apiResponse');

const submit = async (req, res, next) => {
  try {
    const { rfqId, items, deliveryDays, notes } = req.body;
    const vendorUserId = req.user.id; // From JWT

    if (!rfqId || !items || !deliveryDays) {
      return res.status(400).json({ success: false, message: 'Missing required quotation fields' });
    }

    const quotation = await quotationService.submitQuotation(rfqId, vendorUserId, items, deliveryDays, notes);
    return successResponse(res, 201, 'Quotation submitted successfully', quotation);
  } catch (error) {
    next(error);
  }
};

const compare = async (req, res, next) => {
  try {
    const { rfqId } = req.params;
    const quotes = await quotationService.compareQuotations(rfqId);
    
    return successResponse(res, 200, 'Quotations retrieved for comparison', quotes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submit,
  compare,
};