// src/modules/po/po.repository.js
const db = require('../../config/database');

const getQuotationById = async (quotationId) => {
  const query = `
    SELECT id, rfq_id, vendor_id, status, total_amount 
    FROM quotations 
    WHERE id = $1
  `;
  const { rows } = await db.query(query, [quotationId]);
  return rows[0];
};

const updateQuotationStatus = async (client, quotationId, status) => {
  const query = `
    UPDATE quotations 
    SET status = $1 
    WHERE id = $2 
    RETURNING id, status;
  `;
  await client.query(query, [status, quotationId]);
};

const createPurchaseOrder = async (client, poNumber, quotationId, vendorId, approvedById) => {
  const query = `
    INSERT INTO purchase_orders (po_number, quotation_id, vendor_id, approved_by, status, issued_at)
    VALUES ($1, $2, $3, $4, 'Issued', CURRENT_TIMESTAMP)
    RETURNING id, po_number, status, issued_at;
  `;
  const { rows } = await client.query(query, [poNumber, quotationId, vendorId, approvedById]);
  return rows[0];
};

const getAllPurchaseOrders = async () => {
  const query = `
    SELECT p.id, p.po_number, p.status, p.issued_at, v.company_name, q.total_amount
    FROM purchase_orders p
    JOIN vendors v ON p.vendor_id = v.id
    JOIN quotations q ON p.quotation_id = q.id
    ORDER BY p.issued_at DESC;
  `;
  const { rows } = await db.query(query);
  return rows;
};

module.exports = {
  getQuotationById,
  updateQuotationStatus,
  createPurchaseOrder,
  getAllPurchaseOrders,
};