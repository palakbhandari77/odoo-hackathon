// src/modules/invoice/invoice.service.js
const db = require('../../config/database');
const invoiceRepository = require('./invoice.repository');
const AppError = require('../../shared/errors/AppError');

const generateInvoice = async (poId) => {
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Verify PO exists and is valid for invoicing
    const po = await invoiceRepository.getPurchaseOrderById(poId);
    if (!po) throw new AppError('Purchase Order not found', 404);
    if (po.status !== 'Issued') throw new AppError('Can only generate invoices for Issued Purchase Orders', 400);

    // 2. Financial Calculations (Assuming 18% Tax Rate for ERP standards)
    const subtotal = parseFloat(po.total_amount);
    const taxRate = 0.18;
    const taxTotal = subtotal * taxRate;
    const grandTotal = subtotal + taxTotal;

    // 3. Generate Invoice details
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    
    // Set Due Date to 30 days from now (Net 30 terms)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    // 4. Create the Invoice
    const invoice = await invoiceRepository.createInvoice(
      client,
      invoiceNumber,
      po.id,
      po.vendor_id,
      subtotal,
      taxTotal,
      grandTotal,
      dueDate
    );

    // 5. Update PO status to 'Fulfilled' (Optional but good practice)
    await client.query(`UPDATE purchase_orders SET status = 'Fulfilled' WHERE id = $1`, [poId]);

    await client.query('COMMIT');
    return invoice;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getInvoicesList = async () => {
  return await invoiceRepository.getAllInvoices();
};

module.exports = {
  generateInvoice,
  getInvoicesList,
};