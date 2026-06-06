// src/modules/quotation/quotation.service.js
const db = require('../../config/database');
const quotationRepository = require('./quotation.repository');
const AppError = require('../../shared/errors/AppError');

const submitQuotation = async (rfqId, vendorUserId, items, deliveryDays, notes) => {
  // 1. Verify RFQ exists and is open
  const rfq = await quotationRepository.getRfqById(rfqId);
  if (!rfq) throw new AppError('RFQ not found', 404);
  if (rfq.status === 'Closed') throw new AppError('This RFQ is already closed', 400);
  if (new Date(rfq.deadline) < new Date()) throw new AppError('The deadline for this RFQ has passed', 400);

  // 2. Find the actual Vendor ID based on the logged-in User ID
  const vendorQuery = await db.query('SELECT id FROM vendors WHERE user_id = $1', [vendorUserId]);
  if (vendorQuery.rows.length === 0) throw new AppError('Vendor profile not found', 404);
  const vendorId = vendorQuery.rows[0].id;

  // 3. Calculate Total Amount securely on the server
  // Assuming 'items' looks like: [{ rfqItemId: 'uuid', unitPrice: 150.00, quantity: 10 }]
  const totalAmount = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    // 4. Save the main quotation record
    const quotation = await quotationRepository.createQuotation(client, rfqId, vendorId, totalAmount, deliveryDays, notes);

    // 5. Save the individual priced line items
    await quotationRepository.createQuotationItems(client, quotation.id, items);

    await client.query('COMMIT');
    return quotation;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const compareQuotations = async (rfqId) => {
  return await quotationRepository.getQuotationsForRfq(rfqId);
};

module.exports = {
  submitQuotation,
  compareQuotations,
};