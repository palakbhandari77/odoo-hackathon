// src/modules/analytics/analytics.repository.js
const db = require('../../config/database');

const getDashboardKPIs = async () => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM vendors WHERE status = 'Pending') AS pending_vendors,
      (SELECT COUNT(*) FROM rfqs WHERE status = 'Published') AS active_rfqs,
      (SELECT COUNT(*) FROM purchase_orders) AS pending_pos,
      (SELECT COALESCE(SUM(grand_total), 0) FROM invoices WHERE status = 'Unpaid') AS total_unpaid_invoices
  `;
  const { rows } = await db.query(query);
  return rows[0];
};

const getMonthlySpend = async () => {
  // Using created_at since issued_at does not exist
  const query = `
    SELECT 
      TO_CHAR(created_at, 'Mon YYYY') as month,
      COALESCE(SUM(grand_total), 0) as total_spend
    FROM purchase_orders
    WHERE created_at >= NOW() - INTERVAL '6 months'
    GROUP BY TO_CHAR(created_at, 'Mon YYYY'), DATE_TRUNC('month', created_at)
    ORDER BY DATE_TRUNC('month', created_at) ASC;
  `;
  const { rows } = await db.query(query);
  return rows;
};

const getRecentActivities = async () => {
  // Using created_at since issued_at does not exist
  const query = `
    SELECT 'RFQ Created' as type, rfqs.rfq_number as reference, created_at as date FROM rfqs
    UNION ALL
    SELECT 'PO Created', po_number, created_at FROM purchase_orders
    UNION ALL
    SELECT 'Invoice Generated', id::text, created_at FROM invoices
    ORDER BY date DESC
    LIMIT 5;
  `;
  const { rows } = await db.query(query);
  return rows;
};

module.exports = {
  getDashboardKPIs,
  getMonthlySpend,
  getRecentActivities,
};