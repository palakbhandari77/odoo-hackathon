import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import RfqList from './pages/rfq/RfqList';
import AdminLogin from './pages/auth/AdminLogin';
import VendorList from './pages/vendors/VendorList';
// Guard for protected ERP routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('vendorbridge_token');
  return token ? children : <Navigate to="/login" replace />;
};

// Guard to prevent logged-in users from seeing the public landing/login pages
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('vendorbridge_token');
  return !token ? children : <Navigate to="/dashboard" replace />;
};



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Accessible only if NOT logged in) */}
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/admin" element={<PublicRoute><AdminLogin /></PublicRoute>} />
        
        {/* Protected ERP Application Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="vendors" element={<VendorList />} />
          <Route path="rfqs" element={<RfqList />} />
          <Route path="pos" element={<div className="p-4 bg-white shadow-sm border border-surface-200 rounded-lg">Purchase Orders Module</div>} />
          <Route path="invoices" element={<div className="p-4 bg-white shadow-sm border border-surface-200 rounded-lg">Invoices Module</div>} />
        </Route>
        
        {/* Catch-all 404 handler */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;