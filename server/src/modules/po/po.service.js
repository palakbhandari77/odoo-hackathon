// src/modules/po/po.service.js
const db = require('../../config/database');
const poRepository = require('./po.repository');
const AppError = require('../../shared/errors/AppError');

const approveQuotationAndGeneratePO = async (quotationId, managerId) => {
  // 1. Validate current state
  const quotation = await poRepository.getQuotationById(quotationId);
  if (!quotation) {
    throw new AppError('Quotation not found', 404);
  }
  if (quotation.status === 'Approved') {
    throw new AppError('This quotation has already been approved', 400);
  }
  if (quotation.status === 'Rejected') {
    throw new AppError('Cannot approve a rejected quotation', 400);
  }

  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    // 2. Update Quotation Status to 'Approved'
    await poRepository.updateQuotationStatus(client, quotationId, 'Approved');

    // 3. Generate a sequential or timestamp-based PO Number
    const poNumber = `PO-${Date.now().toString().slice(-6)}`;

    // 4. Create the Purchase Order
    const purchaseOrder = await poRepository.createPurchaseOrder(
      client, 
      poNumber, 
      quotation.id, 
      quotation.vendor_id, 
      managerId
    );

    // Note for Hackathon: In a real ERP, we would also update the RFQ status to 'Closed' here.
    const updateRfqQuery = `UPDATE rfqs SET status = 'Closed' WHERE id = $1`;
    await client.query(updateRfqQuery, [quotation.rfq_id]);

    await client.query('COMMIT');
    return purchaseOrder;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getPurchaseOrders = async () => {
  return await poRepository.getAllPurchaseOrders();
};

module.exports = {
  approveQuotationAndGeneratePO,
  getPurchaseOrders,
};