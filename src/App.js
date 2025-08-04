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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes - accessible without authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/superadmin-signup" element={<SuperAdminSignup />} />
          <Route path="/customer" element={<MenuScreen />} />
          <Route path="/order" element={<MenuScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          
          {/* SuperAdmin Routes */}
          <Route 
            path="/superadmin" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <SuperAdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superadmin/restaurants" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <RestaurantManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superadmin/admins" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <AdminUserManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superadmin/settings" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <PlatformSettings />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superadmin/reports" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <Reports />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Admin/Manager Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/menu" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <MenuManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tables" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <TableManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <OrderManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/staff" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <StaffManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <AdminReports />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/feedback" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <CustomerFeedback />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <AdminSettings />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Chef Routes */}
          <Route 
            path="/chef" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <LiveOrders />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chef/history" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <OrderHistory />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chef/profile" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <ChefProfile />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect for authenticated users */}
          <Route 
            path="/*" 
            element={
              user ? (
                <Navigate to={`/${user.role === 'super_admin' ? 'superadmin' : user.role === 'admin' || user.role === 'manager' ? 'admin' : 'chef'}`} replace />
              ) : (
                <Navigate to="/login" replace />
              )
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
