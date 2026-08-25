import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Handle both old and new role formats (e.g. ROLE_ADMIN vs ADMIN)
  const userRole = user.role.replace('ROLE_', '');
  
  if (!allowedRoles.includes(userRole)) {
    // If not allowed, redirect to their proper dashboard
    if (userRole === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'THU_KHO') return <Navigate to="/manager/dashboard" replace />;
    if (userRole === 'NHAN_VIEN_KHO') return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

