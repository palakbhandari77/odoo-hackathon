// src/modules/po/po.controller.js
const poService = require('./po.service');
const { successResponse } = require('../../shared/utils/apiResponse');

const approveQuotation = async (req, res, next) => {
  try {
    const { quotationId } = req.params;
    const managerId = req.user.id; // Extracted from JWT

    const purchaseOrder = await poService.approveQuotationAndGeneratePO(quotationId, managerId);
    
    return successResponse(res, 201, 'Quotation approved and Purchase Order generated successfully', purchaseOrder);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const pos = await poService.getPurchaseOrders();
    return successResponse(res, 200, 'Purchase Orders retrieved successfully', pos);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  approveQuotation,
  getAll,
};