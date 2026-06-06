// src/modules/analytics/analytics.service.js
const analyticsRepository = require('./analytics.repository');

const getDashboardData = async () => {
  // Use Promise.all to run these independent queries concurrently for maximum speed
  const [kpis, monthlySpend, recentActivities] = await Promise.all([
    analyticsRepository.getDashboardKPIs(),
    analyticsRepository.getMonthlySpend(),
    analyticsRepository.getRecentActivities()
  ]);

  return {
    kpis: {
      pendingVendors: parseInt(kpis.pending_vendors, 10),
      activeRfqs: parseInt(kpis.active_rfqs, 10),
      pendingPos: parseInt(kpis.pending_pos, 10),
      totalUnpaidInvoices: parseFloat(kpis.total_unpaid_invoices)
    },
    charts: {
      monthlySpend
    },
    recentActivities
  };
};

module.exports = {
  getDashboardData,
};