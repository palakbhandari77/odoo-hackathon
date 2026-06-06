import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, FileSignature, Receipt, Settings, X } from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Vendors', path: '/dashboard/vendors', icon: Users },
  { name: 'Requests for Quotation', path: '/dashboard/rfqs', icon: FileText },
  { name: 'Purchase Orders', path: '/dashboard/pos', icon: FileSignature },
  { name: 'Invoices', path: '/dashboard/invoices', icon: Receipt },
];

  return (
    <div 
      className={`w-64 bg-surface-100 border-r border-surface-200 h-screen flex flex-col fixed left-0 top-0 pt-14 z-30 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      {/* Mobile Close Button */}
      <div className="md:hidden flex items-center justify-end p-2 border-b border-surface-200">
        <button 
          onClick={closeSidebar} 
          className="p-2 text-surface-muted hover:text-surface-900 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-xs font-semibold text-surface-muted uppercase tracking-wider mb-4 px-3 mt-2 md:mt-0">
          Procurement App
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeSidebar} // Auto-close sidebar on mobile after clicking
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-surface-900 hover:bg-surface-50'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3 opacity-70" />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Settings Link */}
      <div className="p-4 border-t border-surface-200">
        <NavLink
          to="/settings"
          onClick={closeSidebar}
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-surface-900 hover:bg-surface-50 transition-colors"
        >
          <Settings className="w-5 h-5 mr-3 opacity-70" />
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;