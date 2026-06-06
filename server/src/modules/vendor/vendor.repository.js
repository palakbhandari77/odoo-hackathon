// src/modules/vendor/vendor.repository.js
const db = require('../../config/database');

const createVendor = async (client, userId, companyName, gstNumber) => {
  const query = `
    INSERT INTO vendors (user_id, company_name, gst_number, status)
    VALUES ($1, $2, $3, 'Pending')
    RETURNING id, company_name, status;
  `;
  const { rows } = await client.query(query, [userId, companyName, gstNumber]);
  return rows[0];
};

const getAllVendors = async () => {
  const query = `
    SELECT v.id, v.company_name, v.gst_number, v.status, u.email 
    FROM vendors v
    JOIN users u ON v.user_id = u.id
    ORDER BY v.created_at DESC;
  `;
  const { rows } = await db.query(query);
  return rows;
};

const updateVendorStatus = async (vendorId, status) => {
  const query = `
    UPDATE vendors SET status = $1 WHERE id = $2 RETURNING id, status;
  `;
  const { rows } = await db.query(query, [status, vendorId]);
  return rows[0];
};

module.exports = {
  createVendor,
  getAllVendors,
  updateVendorStatus,
};