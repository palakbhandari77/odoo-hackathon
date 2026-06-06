// src/pages/auth/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, FileText, Mail, Lock } from 'lucide-react';
import api from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    gstNumber: '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsLoading(true);

    try {
      await api.post('/vendors/register', formData);
      setStatus({ type: 'success', message: 'Registration successful! You can now log in.' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.error?.message || 'Registration failed' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-100 p-4 sm:p-6 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-surface-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-brand-600 p-6 sm:p-8 text-center relative">
          <Link to="/" className="absolute left-4 top-4 text-white/80 hover:text-white text-sm font-medium transition-colors">
            &larr; Home
          </Link>
          <h2 className="text-2xl font-bold text-white mt-4 sm:mt-2">Vendor Program</h2>
          <p className="text-white/80 mt-1 sm:mt-2 text-sm font-medium">Join the VendorBridge network</p>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8">
          {status.message && (
            <div className={`mb-6 p-3 text-sm rounded-lg border ${
              status.type === 'success' 
                ? 'bg-status-success/10 border-status-success/20 text-status-success' 
                : 'bg-status-danger/10 border-status-danger/20 text-status-danger'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-1">Company Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base sm:text-sm"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-900 mb-1">GST Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  type="text"
                  name="gstNumber"
                  required
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all uppercase text-base sm:text-sm"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-900 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base sm:text-sm"
                  placeholder="contact@acme.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-900 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 sm:py-2.5 rounded-lg transition-colors mt-4 disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? 'Creating Account...' : 'Register as Vendor'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-muted">
            Already registered? <Link to="/login" className="text-brand-600 hover:text-brand-700 hover:underline font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;