import { useState, useEffect } from 'react';
import { 
  Users, FileText, FileSignature, Receipt, 
  TrendingUp, Clock, AlertCircle, Building2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import api from '../../services/api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Get the logged-in user to check their role
  const user = JSON.parse(localStorage.getItem('vendorbridge_user') || '{}');
  const isVendor = user.role === 'Vendor';

  useEffect(() => {
    const fetchDashboardData = async () => {
      // If it's a vendor, DO NOT fetch the internal company analytics
      if (isVendor) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get('/analytics/dashboard');
        setData(response.data.data);
      } catch (err) {
        setError('Failed to load dashboard analytics.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isVendor]);

  // Formatting currency for the dashboard
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  // ==========================================
  // VENDOR VIEW
  // ==========================================
  if (isVendor) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Vendor Portal</h1>
          <p className="text-sm text-surface-muted mt-1">Welcome back, {user.email}. View your active bids and RFQs.</p>
        </div>
        
        <div className="bg-white p-10 rounded-xl border border-surface-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-surface-900 mb-2">Your Workspace is Ready</h2>
          <p className="text-surface-muted max-w-md">
            As new Requests for Quotation (RFQs) are published by procurement officers, they will appear in your RFQ tab for bidding.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // INTERNAL STAFF VIEW (Admin/Manager/Procurement)
  // ==========================================
 // Inside Dashboard.jsx
if (error) {
  return (
    <div className="p-8 bg-white border border-surface-200 rounded-xl shadow-sm text-center">
      <AlertCircle className="w-12 h-12 text-status-danger mx-auto mb-4" />
      <h2 className="text-xl font-bold text-surface-900">Unable to load analytics</h2>
      <p className="text-surface-muted mt-2">The analytics service is currently unreachable. Please check your database connection.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-6 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
      >
        Retry Connection
      </button>
    </div>
  );
}

  const { kpis, charts, recentActivities } = data;

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Overview</h1>
        <p className="text-sm text-surface-muted mt-1">Real-time procurement and financial metrics.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-status-warning/10 text-status-warning flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium bg-surface-100 text-surface-muted px-2 py-1 rounded-full">Requires Review</span>
          </div>
          <p className="text-sm font-medium text-surface-muted">Pending Vendors</p>
          <h3 className="text-2xl font-bold text-surface-900 mt-1">{kpis.pendingVendors}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium bg-surface-100 text-surface-muted px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-sm font-medium text-surface-muted">Open RFQs</p>
          <h3 className="text-2xl font-bold text-surface-900 mt-1">{kpis.activeRfqs}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-status-info/10 text-status-info flex items-center justify-center">
              <FileSignature className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium bg-surface-100 text-surface-muted px-2 py-1 rounded-full">Processing</span>
          </div>
          <p className="text-sm font-medium text-surface-muted">Issued POs</p>
          <h3 className="text-2xl font-bold text-surface-900 mt-1">{kpis.pendingPos}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-status-danger/10 text-status-danger flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <TrendingUp className="w-4 h-4 text-status-danger" />
          </div>
          <p className="text-sm font-medium text-surface-muted">Unpaid Invoices</p>
          <h3 className="text-2xl font-bold text-surface-900 mt-1">{formatCurrency(kpis.totalUnpaidInvoices)}</h3>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Monthly Spend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-surface-200 shadow-sm">
          <h3 className="text-lg font-bold text-surface-900 mb-6">Monthly Procurement Spend</h3>
          <div className="h-72 w-full">
            {charts.monthlySpend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts.monthlySpend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#714B67" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#714B67" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#71717A', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#71717A', fontSize: 12 }}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                    formatter={(value) => [formatCurrency(value), "Total Spend"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total_spend" 
                    stroke="#714B67" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSpend)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-surface-muted">
                <TrendingUp className="w-12 h-12 mb-3 opacity-20" />
                <p>No financial data available for this period.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-surface-900 mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-surface-muted" />
            Recent Activity
          </h3>
          
          <div className="flex-1 overflow-y-auto pr-2">
            {recentActivities.length > 0 ? (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-200 before:to-transparent">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-brand-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-surface-200 bg-surface-50 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-surface-900 text-sm">{activity.type}</span>
                        <span className="text-xs text-surface-muted">{new Date(activity.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-surface-muted font-medium">{activity.reference}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-surface-muted">
                No recent activity to display.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;