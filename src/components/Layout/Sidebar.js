import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  Utensils, 
  Table, 
  ShoppingCart,
  Building2,
  UserCheck,
  FileText,
  Bell
} from 'lucide-react';

const Sidebar = ({ role, user }) => {
  const location = useLocation();

  const getMenuItems = () => {
    switch (role) {
      case 'super_admin':
        return [
          { name: 'Dashboard', icon: Home, path: '/superadmin' },
          { name: 'Restaurants', icon: Building2, path: '/superadmin/restaurants' },
          { name: 'Admin Users', icon: UserCheck, path: '/superadmin/admins' },
          { name: 'Platform Settings', icon: Settings, path: '/superadmin/settings' },
          { name: 'Reports', icon: BarChart3, path: '/superadmin/reports' },
        ];
      case 'admin':
      case 'manager':
        return [
          { name: 'Dashboard', icon: Home, path: '/admin' },
          { name: 'Menu Management', icon: Utensils, path: '/admin/menu' },
          { name: 'Table Management', icon: Table, path: '/admin/tables' },
          { name: 'Order Management', icon: ShoppingCart, path: '/admin/orders' },
          { name: 'Staff Management', icon: Users, path: '/admin/staff' },
          { name: 'Reports', icon: BarChart3, path: '/admin/reports' },
          { name: 'Customer Feedback', icon: Bell, path: '/admin/feedback' },
          { name: 'Settings', icon: Settings, path: '/admin/settings' },
        ];
      case 'chef':
        return [
          { name: 'Live Orders', icon: ShoppingCart, path: '/chef' },
          { name: 'Order History', icon: FileText, path: '/chef/history' },
          { name: 'Profile', icon: Users, path: '/chef/profile' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-white text-xl font-bold">
          {role === 'super_admin' ? 'Platform Admin' : 
           role === 'admin' ? 'Restaurant Manager' : 'Kitchen Display'}
        </h1>
        <p className="text-gray-400 text-sm">{user?.name || 'User'}</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="mt-auto pt-8">
        <button className="w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 