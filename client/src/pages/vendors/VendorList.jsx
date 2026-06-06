import { useState, useEffect } from 'react';
import { UserCheck, UserX, User } from 'lucide-react';
import api from '../../services/api';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await api.get('/vendors');
      setVendors(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
    }
  };

  // Updated to match the '/:id/approve' route
  const approveVendor = async (id) => {
    try {
      await api.patch(`/vendors/${id}/approve`);
      fetchVendors(); // Refresh the list after successful approval
    } catch (error) {
      console.error('Failed to approve vendor:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vendor Management</h1>
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y">
          <thead className="bg-surface-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">GST Number</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td className="px-6 py-4">{vendor.company_name}</td>
                <td className="px-6 py-4">{vendor.gst_number}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${vendor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {vendor.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {vendor.status === 'Pending' && (
                    <button 
                      // Updated to call the new approveVendor function
                      onClick={() => approveVendor(vendor.id)}
                      className="text-brand-600 hover:text-brand-800 font-medium"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorList;