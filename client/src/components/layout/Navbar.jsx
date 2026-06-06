import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('vendorbridge_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('vendorbridge_token');
    localStorage.removeItem('vendorbridge_user');
    navigate('/login');
  };

  return (
    <nav className="h-14 bg-brand-600 border-b border-brand-700 flex items-center justify-between px-3 sm:px-4 fixed top-0 w-full z-30 text-white shadow-sm">
      
      {/* Left side: Hamburger (Mobile) + Brand */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-1.5 hover:bg-white/10 rounded-md transition-colors mr-1"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center font-bold text-lg">
          V
        </div>
        <span className="font-semibold text-lg tracking-wide hidden sm:block">VendorBridge</span>
      </div>

      {/* Right side: User & Actions */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-3 border-l border-white/20 pl-3 sm:pl-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium leading-none">{user.email || 'User'}</span>
            <span className="text-xs text-brand-100 capitalize mt-1">{user.role || 'Role'}</span>
          </div>
          <button 
            onClick={handleLogout}
            title="Log Out" 
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;