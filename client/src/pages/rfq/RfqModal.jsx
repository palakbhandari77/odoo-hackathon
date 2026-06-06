import { useState } from 'react';
import { X } from 'lucide-react';
import api from '../../services/api';
import ReactDOM from 'react-dom'; // Import Portal

const RfqModal = ({ isOpen, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({ rfq_number: '', title: '', deadline: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rfqs', formData);
      onRefresh();
      onClose();
    } catch (err) {
      console.error('Failed to create RFQ', err);
    }
  };

  // Using createPortal to ensure it renders on top of everything
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-surface-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-surface-900">Create New RFQ</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-100 rounded-full">
            <X className="w-5 h-5 text-surface-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="RFQ Number" 
            className="w-full p-2.5 border rounded-lg text-sm"
            onChange={(e) => setFormData({...formData, rfq_number: e.target.value})}
          />
          <input 
            placeholder="Project Title" 
            className="w-full p-2.5 border rounded-lg text-sm"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input 
            type="date" 
            className="w-full p-2.5 border rounded-lg text-sm"
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          />
          <button type="submit" className="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700">
            Publish RFQ
          </button>
        </form>
      </div>
    </div>,
    document.body // Renders at the end of <body>
  );
};

export default RfqModal;