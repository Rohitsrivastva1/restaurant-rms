import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout Components
import DashboardLayout from './components/Layout/DashboardLayout';

// Auth Components
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SuperAdminSignup from './components/Auth/SuperAdminSignup';

// SuperAdmin Components
import SuperAdminDashboard from './components/SuperAdmin/Dashboard';
import RestaurantManagement from './components/SuperAdmin/RestaurantManagement';
import AdminUserManagement from './components/SuperAdmin/AdminUserManagement';
import PlatformSettings from './components/SuperAdmin/PlatformSettings';
import Reports from './components/SuperAdmin/Reports';

// Admin Components
import AdminDashboard from './components/Admin/Dashboard';
import MenuManagement from './components/Admin/MenuManagement';
import TableManagement from './components/Admin/TableManagement';
import OrderManagement from './components/Admin/OrderManagement';
import StaffManagement from './components/Admin/StaffManagement';
import AdminReports from './components/Admin/Reports';
import CustomerFeedback from './components/Admin/CustomerFeedback';
import AdminSettings from './components/Admin/Settings';

// Chef Components
import LiveOrders from './components/Chef/LiveOrders';
import OrderHistory from './components/Chef/OrderHistory';
import ChefProfile from './components/Chef/ChefProfile';

// Customer Components
import MenuScreen from './components/Customer/MenuScreen';

function AppContent() {
  const { user, loading } = useAuth();

  const renderDashboardRoutes = () => {
    if (loading) {
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
    
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    switch (user.role) {
      case 'super_admin':
        return (
          <Routes>
            <Route path="/superadmin" element={<SuperAdminDashboard />} />
            <Route path="/superadmin/restaurants" element={<RestaurantManagement />} />
            <Route path="/superadmin/admins" element={<AdminUserManagement />} />
            <Route path="/superadmin/settings" element={<PlatformSettings />} />
            <Route path="/superadmin/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/superadmin" replace />} />
          </Routes>
        );
      
      case 'admin':
      case 'manager':
        return (
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/menu" element={<MenuManagement />} />
            <Route path="/admin/tables" element={<TableManagement />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/staff" element={<StaffManagement />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/feedback" element={<CustomerFeedback />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        );
      
      case 'chef':
        return (
          <Routes>
            <Route path="/chef" element={<LiveOrders />} />
            <Route path="/chef/history" element={<OrderHistory />} />
            <Route path="/chef/profile" element={<ChefProfile />} />
            <Route path="*" element={<Navigate to="/chef" replace />} />
          </Routes>
        );
      
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/superadmin-signup" element={<SuperAdminSignup />} />
          <Route path="/customer" element={<MenuScreen />} />
          <Route path="/order" element={<MenuScreen />} />
          
          {/* Protected dashboard routes */}
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  {renderDashboardRoutes()}
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
