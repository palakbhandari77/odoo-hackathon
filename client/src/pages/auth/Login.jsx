// src/pages/auth/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import api from '../../services/api';

const Login = () => {
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
      
      localStorage.setItem('vendorbridge_token', token);
      localStorage.setItem('vendorbridge_user', JSON.stringify(user));

      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-100 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-surface-200 overflow-hidden">
        
        {/* Header with Home Link */}
        <div className="bg-brand-600 p-6 sm:p-8 text-center relative">
          <Link to="/" className="absolute left-4 top-4 text-white/80 hover:text-white text-sm font-medium transition-colors">
            &larr; Home
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 sm:mt-2">VendorBridge</h2>
          <p className="text-white/80 mt-1 sm:mt-2 text-sm font-medium">Enterprise Procurement System</p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-surface-900 mb-6 text-center">Sign in to your account</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-status-danger/10 border border-status-danger/20 text-status-danger text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base sm:text-sm"
                  placeholder="admin@vendorbridge.com"
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 sm:py-2.5 rounded-lg transition-colors disabled:opacity-70 flex justify-center items-center mt-2"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-surface-muted">
            Don't have a vendor account? <Link to="/register" className="text-brand-600 hover:text-brand-700 hover:underline font-medium transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;