// src/modules/quotation/quotation.repository.js
const db = require('../../config/database');

const getRfqById = async (rfqId) => {
  const query = `SELECT id, status, deadline FROM rfqs WHERE id = $1`;
  const { rows } = await db.query(query, [rfqId]);
  return rows[0];
};

const createQuotation = async (client, rfqId, vendorId, totalAmount, deliveryDays, notes) => {
  const query = `
    INSERT INTO quotations (rfq_id, vendor_id, total_amount, delivery_timeline_days, notes, status)
    VALUES ($1, $2, $3, $4, $5, 'Submitted')
    RETURNING id, total_amount, status;
  `;
  const { rows } = await client.query(query, [rfqId, vendorId, totalAmount, deliveryDays, notes]);
  return rows[0];
};

const createQuotationItems = async (client, quotationId, items) => {
  const values = [];
  const flatItems = [];
  
  items.forEach((item, index) => {
    const offset = index * 3;
    values.push(`($${offset + 1}, $${offset + 2}, $${offset + 3})`);
    // item needs: rfqItemId, unitPrice, totalPrice
    flatItems.push(quotationId, item.rfqItemId, item.unitPrice);
  });

  const query = `
    INSERT INTO quotation_items (quotation_id, rfq_item_id, unit_price)
    VALUES ${values.join(', ')}
    RETURNING id;
  `;
  
  const { rows } = await client.query(query, flatItems);
  return rows;
};

const getQuotationsForRfq = async (rfqId) => {
  // This is the "Comparison Matrix" query for Procurement Officers
  const query = `
    SELECT q.id, q.total_amount, q.delivery_timeline_days, q.status, q.notes, v.company_name
    FROM quotations q
    JOIN vendors v ON q.vendor_id = v.id
    WHERE q.rfq_id = $1
    ORDER BY q.total_amount ASC; -- Automatically sorts lowest price first
  `;
  const { rows } = await db.query(query, [rfqId]);
  return rows;
};

module.exports = {
  getRfqById,
  createQuotation,
  createQuotationItems,
  getQuotationsForRfq,
};