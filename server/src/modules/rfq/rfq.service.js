// src/modules/rfq/rfq.service.js
const db = require('../../config/database');
const rfqRepository = require('./rfq.repository');
const AppError = require('../../shared/errors/AppError');

const createRfqWithItems = async (title, userId, deadline, items) => {
  if (!items || items.length === 0) {
    throw new AppError('An RFQ must contain at least one item', 400);
  }

  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');

    // Generate a simple unique RFQ number (e.g., RFQ-16849302)
    const rfqNumber = `RFQ-${Date.now().toString().slice(-8)}`;

    // 1. Create the main RFQ header
    const rfq = await rfqRepository.createRfq(client, rfqNumber, title, userId, deadline);

    // 2. Create the line items attached to this RFQ
    const rfqItems = await rfqRepository.createRfqItems(client, rfq.id, items);

    await client.query('COMMIT');
    
    return { ...rfq, items: rfqItems };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getRfqsList = async () => {
  return await rfqRepository.getAllRfqs();
};

module.exports = {
  createRfqWithItems,
  getRfqsList,
};