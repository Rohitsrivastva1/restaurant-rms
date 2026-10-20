import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { canAccess } from '../../utils/roleMatrix';

const homeForRole = (role) => {
  if (role === 'cart_owner') return '/restra-owner';
  if (role === 'cart_worker') return '/restra-worker';
  if (role === 'super_admin') return '/superadmin';
  if (role === 'admin' || role === 'manager') return '/admin';
  if (role === 'chef' || role === 'waiter') return '/restra-worker';
  return '/login';
};

const ProtectedRoute = ({
  children,
  requiredModule = null,
  requiredPermission = 'view',
  allowedRoles = null,
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to={homeForRole(user?.role)} replace state={{ notice: 'No access' }} />;
  }

  if (!requiredModule) {
    return children;
  }

  if (!canAccess(user.role, requiredModule)) {
    return <Navigate to={homeForRole(user?.role)} replace state={{ notice: 'No access' }} />;
  }

  return children;
};

export default ProtectedRoute;
