// src/modules/rfq/rfq.controller.js
const rfqService = require('./rfq.service');
const { successResponse } = require('../../shared/utils/apiResponse');

const create = async (req, res, next) => {
  try {
    const { title, deadline, items } = req.body;
    const userId = req.user.id; // Extracted from our JWT protect middleware

    if (!title || !deadline) {
      return res.status(400).json({ success: false, message: 'Title and deadline are required' });
    }

    const rfq = await rfqService.createRfqWithItems(title, userId, deadline, items);
    
    return successResponse(res, 201, 'RFQ created successfully', rfq);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const rfqs = await rfqService.getRfqsList();
    return successResponse(res, 200, 'RFQs retrieved successfully', rfqs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};