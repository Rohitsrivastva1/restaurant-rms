import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import DashboardLayout from './components/Layout/DashboardLayout';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LandingPage from './components/Landing/LandingPage';

const HomePage = lazy(() => import('./components/Pages/HomePage'));
const AboutPage = lazy(() => import('./components/Pages/AboutPage'));
const ContactPage = lazy(() => import('./components/Pages/ContactPage'));
const PricingPage = lazy(() => import('./components/Pages/PricingPage'));
const BlogIndex = lazy(() => import('./components/Blog/BlogIndex'));
const BlogPost = lazy(() => import('./components/Blog/BlogPost'));
const PrivacyPolicy = lazy(() => import('./components/Pages/Legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/Pages/Legal/TermsOfService'));
const CookiePolicy = lazy(() => import('./components/Pages/Legal/CookiePolicy'));
const SuperAdminSignup = lazy(() => import('./components/Auth/SuperAdminSignup'));
const CartOwnerSignup = lazy(() => import('./components/Auth/CartOwnerSignup'));
const LoginTest = lazy(() => import('./components/Auth/LoginTest'));

const SuperAdminDashboard = lazy(() => import('./components/SuperAdmin/Dashboard'));
const RestaurantManagement = lazy(() => import('./components/SuperAdmin/RestaurantManagement'));
const AdminUserManagement = lazy(() => import('./components/SuperAdmin/AdminUserManagement'));
const PlatformSettings = lazy(() => import('./components/SuperAdmin/PlatformSettings'));
const Reports = lazy(() => import('./components/SuperAdmin/Reports'));
const CartManagement = lazy(() => import('./components/SuperAdmin/CartManagement'));

const AdminDashboard = lazy(() => import('./components/Admin/Dashboard'));
const MenuManagement = lazy(() => import('./components/Admin/MenuManagement'));
const TableManagement = lazy(() => import('./components/Admin/TableManagement'));
const OrderManagement = lazy(() => import('./components/Admin/OrderManagement'));
const StaffManagement = lazy(() => import('./components/Admin/StaffManagement'));
const AdminReports = lazy(() => import('./components/Admin/Reports'));
const CustomerFeedback = lazy(() => import('./components/Admin/CustomerFeedback'));
const AdminSettings = lazy(() => import('./components/Admin/Settings'));

const LiveOrders = lazy(() => import('./components/Chef/LiveOrders'));
const OrderHistory = lazy(() => import('./components/Chef/OrderHistory'));
const ChefProfile = lazy(() => import('./components/Chef/ChefProfile'));

const CartOwnerDashboard = lazy(() => import('./components/CartOwner/Dashboard'));
const CartMenuManagement = lazy(() => import('./components/CartOwner/MenuManagement'));
const ExcelUpload = lazy(() => import('./components/CartOwner/ExcelUpload'));
const CartOrders = lazy(() => import('./components/CartOwner/Orders'));
const CartStaff = lazy(() => import('./components/CartOwner/Staff'));
const VenueQr = lazy(() => import('./components/CartOwner/VenueQr'));
const VenueTables = lazy(() => import('./components/CartOwner/Tables'));
const GuestOrder = lazy(() => import('./components/CartOwner/GuestOrder'));
const CartWorkerDashboard = lazy(() => import('./components/CartWorker/Dashboard'));
const WorkerOrders = lazy(() => import('./components/CartWorker/WorkerOrders'));

const CafeSampleIndex = lazy(() =>
  import('./components/CafeSample/CafeSample').then((m) => ({ default: m.CafeSampleIndex }))
);
const CafeSamplePage = lazy(() =>
  import('./components/CafeSample/CafeSample').then((m) => ({ default: m.CafeSample }))
);

function RouteFallback() {
  return <div className="flex items-center justify-center min-h-screen" style={{ background: '#0b0806', color: '#c9bba3' }}>Loading…</div>;
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteFallback />;
  }

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Public routes - accessible without authentication */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/superadmin-signup" element={<SuperAdminSignup />} />
          <Route path="/cart-owner-signup" element={<CartOwnerSignup />} />
          <Route path="/login-test" element={<LoginTest />} />
          <Route path="/customer" element={<LegacyRoleHome />} />
          <Route path="/order" element={<LegacyRoleHome />} />
          <Route path="/menu" element={<LegacyRoleHome />} />
          <Route path="/guest/seat/:seatKey" element={<GuestOrder />} />
          <Route path="/guest/:cartId" element={<GuestOrder />} />
          <Route path="/samples" element={<CafeSampleIndex />} />
          <Route path="/samples/:variant" element={<CafeSamplePage />} />
          <Route path="/samples/:variant/book" element={<CafeSamplePage />} />
          
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
          
          {/* Admin/Manager Routes — blocked for Servya cart roles */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'super_admin']}>
                <DashboardLayout role={user?.role} user={user}>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/menu" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'super_admin']}>
                <DashboardLayout role={user?.role} user={user}>
                  <MenuManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tables" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'super_admin']}>
                <DashboardLayout role={user?.role} user={user}>
                  <TableManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'super_admin']}>
                <DashboardLayout role={user?.role} user={user}>
                  <OrderManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/staff" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'super_admin']}>
                <DashboardLayout role={user?.role} user={user}>
                  <StaffManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'super_admin']}>
                <DashboardLayout role={user?.role} user={user}>
                  <AdminReports />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/feedback" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'super_admin']}>
                <DashboardLayout role={user?.role} user={user}>
                  <CustomerFeedback />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'super_admin']}>
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
          <Route path="/restra-owner" element={<ProtectedRoute allowedRoles={['cart_owner']}><CartOwnerDashboard /></ProtectedRoute>} />
          <Route path="/restra-owner/menu/:cartId" element={<ProtectedRoute allowedRoles={['cart_owner']}><CartMenuManagement /></ProtectedRoute>} />
          <Route path="/restra-owner/orders/:cartId" element={<ProtectedRoute allowedRoles={['cart_owner']}><CartOrders /></ProtectedRoute>} />
          <Route path="/restra-owner/staff/:cartId" element={<ProtectedRoute allowedRoles={['cart_owner']}><CartStaff /></ProtectedRoute>} />
          <Route path="/restra-owner/tables/:cartId" element={<ProtectedRoute allowedRoles={['cart_owner']}><VenueTables /></ProtectedRoute>} />
          <Route path="/restra-owner/qr/:cartId" element={<ProtectedRoute allowedRoles={['cart_owner']}><VenueQr /></ProtectedRoute>} />
          <Route path="/restra-owner/excel-upload/:cartId" element={<ProtectedRoute allowedRoles={['cart_owner']}><ExcelUpload /></ProtectedRoute>} />
          <Route path="/cart-owner" element={<Navigate to="/restra-owner" replace />} />
          <Route path="/cart-owner/*" element={<LegacyOwnerRedirect />} />
          
          <Route path="/restra-worker" element={<ProtectedRoute allowedRoles={['cart_worker']}><CartWorkerDashboard /></ProtectedRoute>} />
          <Route path="/restra-worker/orders/:cartId" element={<ProtectedRoute allowedRoles={['cart_worker']}><WorkerOrders /></ProtectedRoute>} />
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
        </Suspense>
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

function LegacyRoleHome() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (user?.role === 'cart_owner') return <Navigate to="/restra-owner" replace />;
  if (user?.role === 'cart_worker') return <Navigate to="/restra-worker" replace />;
  if (user?.role === 'admin' || user?.role === 'manager') return <Navigate to="/admin" replace />;
  if (user?.role === 'super_admin') return <Navigate to="/superadmin" replace />;
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
