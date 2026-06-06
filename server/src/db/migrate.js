// src/db/migrate.js
require('dotenv').config();
const { pool } = require('../config/database');
const logger = require('../shared/logger');

const runMigrations = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    // 1. Create Roles Table & Seed Data
    await client.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) UNIQUE NOT NULL
      );
    `);
    
    await client.query(`
      INSERT INTO roles (name) VALUES 
      ('Admin'), ('Procurement Officer'), ('Vendor'), ('Manager')
      ON CONFLICT (name) DO NOTHING;
    `);

    // 2. Create Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role_id UUID REFERENCES roles(id),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );
    `);

    // 3. Create Vendors Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS vendors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        company_name VARCHAR(255) NOT NULL,
        gst_number VARCHAR(50) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create RFQs Table
await client.query(`
  CREATE TABLE IF NOT EXISTS rfqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rfq_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Draft',
    deadline TIMESTAMP,
    created_by_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// 5. Create Purchase Orders Table
await client.query(`
  CREATE TABLE IF NOT EXISTS purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_number VARCHAR(50) UNIQUE NOT NULL,
    rfq_id UUID REFERENCES rfqs(id),
    total_amount DECIMAL(12, 2),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// 6. Create Invoices Table
await client.query(`
  CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_id UUID REFERENCES purchase_orders(id),
    amount_due DECIMAL(12, 2),
    status VARCHAR(50) DEFAULT 'Unpaid',
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

    await client.query('COMMIT');
    logger.info('Database migration completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Migration failed. Rolling back...', error);
  } finally {
    client.release();
    process.exit();
  }
};

runMigrations();