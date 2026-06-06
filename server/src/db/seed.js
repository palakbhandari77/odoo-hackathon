// server/src/db/seed.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Explicit path

const { pool } = require('../config/database');

const seedData = async () => {
  const client = await pool.connect();
  try {
    // 1. Insert an RFQ
    const rfqRes = await client.query(
      `INSERT INTO rfqs (rfq_number, title, status, deadline) 
       VALUES ('RFQ-2026-001', 'Office Equipment Upgrade', 'Published', NOW() + INTERVAL '7 days') 
       RETURNING id`
    );

    // 2. Insert a Purchase Order linked to that RFQ
    await client.query(
      `INSERT INTO purchase_orders (po_number, rfq_id, grand_total, status) 
       VALUES ('PO-2026-001', $1, 45000.00, 'Issued')`,
      [rfqRes.rows[0].id]
    );

    console.log('Successfully seeded database with demo data!');
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    process.exit();
  }
};

seedData();