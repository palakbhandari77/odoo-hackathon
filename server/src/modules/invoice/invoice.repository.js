// src/modules/invoice/invoice.repository.js
const db = require('../../config/database');

const getPurchaseOrderById = async (poId) => {
  const query = `
    SELECT p.id, p.vendor_id, p.status, q.total_amount 
    FROM purchase_orders p
    JOIN quotations q ON p.quotation_id = q.id
    WHERE p.id = $1
  `;
  const { rows } = await db.query(query, [poId]);
  return rows[0];
};

const createInvoice = async (client, invoiceNumber, poId, vendorId, subtotal, taxTotal, grandTotal, dueDate) => {
  const query = `
    INSERT INTO invoices (invoice_number, po_id, vendor_id, subtotal, tax_total, grand_total, status, due_date)
    VALUES ($1, $2, $3, $4, $5, $6, 'Generated', $7)
    RETURNING id, invoice_number, grand_total, status, due_date;
  `;
  const { rows } = await client.query(query, [invoiceNumber, poId, vendorId, subtotal, taxTotal, grandTotal, dueDate]);
  return rows[0];
};

const getAllInvoices = async () => {
  const query = `
    SELECT i.id, i.invoice_number, i.grand_total, i.status, i.due_date, p.po_number, v.company_name
    FROM invoices i
    JOIN purchase_orders p ON i.po_id = p.id
    JOIN vendors v ON i.vendor_id = v.id
    ORDER BY i.created_at DESC;
  `;
  const { rows } = await db.query(query);
  return rows;
};

module.exports = {
  getPurchaseOrderById,
  createInvoice,
  getAllInvoices,
};