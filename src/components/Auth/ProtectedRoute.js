import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If specific roles are required and user's role is not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on user role
    switch (user.role) {
      case 'admin':
      case 'manager':
        return <Navigate to="/admin" replace />;
      case 'chef':
        return <Navigate to="/chef" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute; 