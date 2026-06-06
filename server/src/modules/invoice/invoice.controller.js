// src/modules/invoice/invoice.controller.js
const invoiceService = require('./invoice.service');
const { successResponse } = require('../../shared/utils/apiResponse');

const generate = async (req, res, next) => {
  try {
    const { poId } = req.params;

    const invoice = await invoiceService.generateInvoice(poId);
    
    return successResponse(res, 201, 'Invoice generated successfully', invoice);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const invoices = await invoiceService.getInvoicesList();
    return successResponse(res, 200, 'Invoices retrieved successfully', invoices);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generate,
  getAll,
};