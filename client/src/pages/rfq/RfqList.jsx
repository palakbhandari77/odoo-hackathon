import { useState, useEffect } from 'react';
import { Plus, Search, FileText, ChevronRight, Clock } from 'lucide-react';
import api from '../../services/api';
import RfqModal from './RfqModal';// Import the new modal

const RfqList = () => {
  const [rfqs, setRfqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    fetchRfqs();
  }, []);

  const fetchRfqs = async () => {
    try {
      const response = await api.get('/rfqs');
      setRfqs(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch RFQs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-brand-50 text-brand-700 border-brand-200';
      case 'Draft': return 'bg-surface-100 text-surface-600 border-surface-200';
      case 'Closed': return 'bg-status-success/10 text-status-success border-status-success/20';
      default: return 'bg-surface-100 text-surface-600 border-surface-200';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Requests for Quotation</h1>
          <p className="text-sm text-surface-muted mt-1">Manage and track all vendor pricing requests.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} // Open modal on click
          className="inline-flex items-center justify-center px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create RFQ
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-surface-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
            placeholder="Search by RFQ Number or Title..."
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-surface-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-200">
            <thead className="bg-surface-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-surface-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-surface-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-surface-muted">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-600"></div>
                    </div>
                  </td>
                </tr>
              ) : rfqs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-surface-200 mx-auto mb-3" />
                    <p className="text-surface-900 font-medium">No RFQs found</p>
                  </td>
                </tr>
              ) : (
                rfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-surface-50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-bold text-brand-600">{rfq.rfq_number}</span></td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-surface-900">{rfq.title}</div>
                      <div className="text-xs text-surface-muted mt-0.5">By {rfq.created_by_email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(rfq.status)}`}>
                        {rfq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-muted">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 opacity-70" />
                        {new Date(rfq.deadline).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-surface-400 group-hover:text-brand-600 transition-colors p-1 rounded-md hover:bg-brand-50">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RFQ Creation Modal */}
      <RfqModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchRfqs} 
      />
    </div>
  );
};

export default RfqList;