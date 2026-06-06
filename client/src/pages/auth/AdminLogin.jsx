// src/pages/auth/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert } from 'lucide-react';
import api from '../../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data.data;
      
      // ENTERPRISE SECURITY CHECK: Block Vendors from the Staff Portal
      if (user.role === 'Vendor') {
        throw new Error('Access Denied: This portal is restricted to internal staff only. Please use the Vendor Login.');
      }

      localStorage.setItem('vendorbridge_token', token);
      localStorage.setItem('vendorbridge_user', JSON.stringify(user));

      navigate('/dashboard'); 
    } catch (err) {
      // Catch our custom error or server errors
      setError(err.message || err.response?.data?.error?.message || 'Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-900 p-4 sm:p-6 selection:bg-brand-500">
      <div className="w-full max-w-md bg-surface-800 rounded-2xl shadow-2xl border border-surface-700 overflow-hidden relative overflow-y-hidden">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-brand-500 to-brand-teal"></div>

        {/* Header */}
        <div className="p-8 pb-6 text-center relative mt-4">
          <Link to="/" className="absolute left-6 top-0 text-surface-400 hover:text-white text-sm font-medium transition-colors">
            &larr; Exit
          </Link>
          <div className="w-12 h-12 bg-surface-900 border border-surface-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShieldAlert className="w-6 h-6 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Staff Workspace</h2>
          <p className="text-surface-400 mt-1 text-sm font-medium">Internal Procurement Portal</p>
        </div>

        {/* Form */}
        <div className="p-8 pt-2">
          {error && (
            <div className="mb-6 p-3 bg-status-danger/10 border border-status-danger/20 text-status-danger text-sm rounded-lg font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Corporate Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-surface-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-900 border border-surface-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-white placeholder-surface-600 sm:text-sm"
                  placeholder="admin@vendorbridge.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-surface-300">Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-surface-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-900 border border-surface-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-white placeholder-surface-600 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70 flex justify-center items-center mt-6 shadow-lg shadow-brand-900/50"
            >
              {isLoading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </div>
        
        {/* Footer Warning */}
        <div className="bg-surface-900 py-4 text-center border-t border-surface-700">
          <p className="text-xs text-surface-500 font-medium">
            Restricted System. Authorized Personnel Only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;