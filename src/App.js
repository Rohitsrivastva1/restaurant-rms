import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout Components
import DashboardLayout from './components/Layout/DashboardLayout';

// Navigation
import Navbar from './components/Navigation/Navbar';

// Auth Components
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SuperAdminSignup from './components/Auth/SuperAdminSignup';
import CartOwnerSignup from './components/Auth/CartOwnerSignup';
import LoginTest from './components/Auth/LoginTest';

// Landing & Public Pages
import LandingPage from './components/Landing/LandingPage';
import HomePage from './components/Pages/HomePage';
import AboutPage from './components/Pages/AboutPage';
import ContactPage from './components/Pages/ContactPage';
import PricingPage from './components/Pages/PricingPage';

// Legal Pages
import PrivacyPolicy from './components/Pages/Legal/PrivacyPolicy';
import TermsOfService from './components/Pages/Legal/TermsOfService';
import CookiePolicy from './components/Pages/Legal/CookiePolicy';

// SuperAdmin Components
import SuperAdminDashboard from './components/SuperAdmin/Dashboard';
import RestaurantManagement from './components/SuperAdmin/RestaurantManagement';
import AdminUserManagement from './components/SuperAdmin/AdminUserManagement';
import PlatformSettings from './components/SuperAdmin/PlatformSettings';
import Reports from './components/SuperAdmin/Reports';
import CartManagement from './components/SuperAdmin/CartManagement';

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
import { CafeSample, CafeSampleIndex } from './components/CafeSample/CafeSample';

// Cart Owner Components
import CartOwnerDashboard from './components/CartOwner/Dashboard';
import CartMenuManagement from './components/CartOwner/MenuManagement';
import ExcelUpload from './components/CartOwner/ExcelUpload';
import CartOrders from './components/CartOwner/Orders';
import CartStaff from './components/CartOwner/Staff';
import VenueQr from './components/CartOwner/VenueQr';
import VenueTables from './components/CartOwner/Tables';
import GuestOrder from './components/CartOwner/GuestOrder';

// Cart Worker Components
import CartWorkerDashboard from './components/CartWorker/Dashboard';
import WorkerOrders from './components/CartWorker/WorkerOrders';

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/superadmin-signup" element={<SuperAdminSignup />} />
          <Route path="/cart-owner-signup" element={<CartOwnerSignup />} />
          <Route path="/login-test" element={<LoginTest />} />
          <Route path="/customer" element={<MenuScreen />} />
          <Route path="/order" element={<MenuScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/guest/seat/:seatKey" element={<GuestOrder />} />
          <Route path="/guest/:cartId" element={<GuestOrder />} />
          <Route path="/samples" element={<CafeSampleIndex />} />
          <Route path="/samples/:variant" element={<CafeSample />} />
          <Route path="/samples/:variant/book" element={<CafeSample />} />
          
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
          <Route 
            path="/superadmin/carts" 
            element={
              <ProtectedRoute>
                <DashboardLayout role={user?.role} user={user}>
                  <CartManagement />
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
          
          {/* Restaurant owner routes */}
          <Route path="/restra-owner" element={<CartOwnerDashboard />} />
          <Route path="/restra-owner/menu/:cartId" element={<CartMenuManagement />} />
          <Route path="/restra-owner/orders/:cartId" element={<CartOrders />} />
          <Route path="/restra-owner/staff/:cartId" element={<CartStaff />} />
          <Route path="/restra-owner/tables/:cartId" element={<VenueTables />} />
          <Route path="/restra-owner/qr/:cartId" element={<VenueQr />} />
          <Route path="/restra-owner/excel-upload/:cartId" element={<ExcelUpload />} />
          <Route path="/cart-owner" element={<Navigate to="/restra-owner" replace />} />
          <Route path="/cart-owner/*" element={<LegacyOwnerRedirect />} />
          
          <Route path="/restra-worker" element={<ProtectedRoute><CartWorkerDashboard /></ProtectedRoute>} />
          <Route path="/restra-worker/orders/:cartId" element={<ProtectedRoute><WorkerOrders /></ProtectedRoute>} />
          <Route path="/cart-worker" element={<Navigate to="/restra-worker" replace />} />
          <Route path="/cart-worker/*" element={<LegacyWorkerRedirect />} />
          
          {/* Default redirect for authenticated users */}
          <Route 
            path="/*" 
            element={
              user ? (
                <Navigate to={`/${
                  user.role === 'super_admin' ? 'superadmin' : 
                  user.role === 'admin' || user.role === 'manager' ? 'admin' : 
                  user.role === 'cart_owner' ? 'restra-owner' :
                  user.role === 'cart_worker' ? 'restra-worker' :
                  'chef'
                }`} replace />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function LegacyOwnerRedirect() {
  const { pathname, search } = window.location;
  const next = pathname.replace(/^\/cart-owner/, '/restra-owner');
  return <Navigate to={`${next}${search}`} replace />;
}

function LegacyWorkerRedirect() {
  const { pathname, search } = window.location;
  const next = pathname.replace(/^\/cart-worker/, '/restra-worker');
  return <Navigate to={`${next}${search}`} replace />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
