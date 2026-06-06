// src/modules/rfq/rfq.repository.js
const db = require('../../config/database');

const createRfq = async (client, rfqNumber, title, createdBy, deadline) => {
  const query = `
    INSERT INTO rfqs (rfq_number, title, created_by, status, deadline)
    VALUES ($1, $2, $3, 'Draft', $4)
    RETURNING id, rfq_number, title, status;
  `;
  const { rows } = await client.query(query, [rfqNumber, title, createdBy, deadline]);
  return rows[0];
};

const createRfqItems = async (client, rfqId, items) => {
  // Using a parameterized bulk insert for performance and security
  const values = [];
  const flatItems = [];
  
  items.forEach((item, index) => {
    const offset = index * 4;
    values.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`);
    flatItems.push(rfqId, item.productName, item.quantity, item.uom);
  });

  const query = `
    INSERT INTO rfq_items (rfq_id, product_name, quantity, uom)
    VALUES ${values.join(', ')}
    RETURNING id, product_name, quantity;
  `;
  
  const { rows } = await client.query(query, flatItems);
  return rows;
};

const getAllRfqs = async () => {
  const query = `
    SELECT r.id, r.rfq_number, r.title, r.status, r.deadline, u.email as created_by_email
    FROM rfqs r
    JOIN users u ON r.created_by = u.id
    ORDER BY r.created_at DESC;
  `;
  const { rows } = await db.query(query);
  return rows;
};

module.exports = {
  createRfq,
  createRfqItems,
  getAllRfqs,
};