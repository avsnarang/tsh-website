import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ALUMNI_ROUTES } from '../../config/routes';

interface RequireAdminProps {
  children: React.ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // If user is not logged in
  if (!user) {
    return <Navigate to={ALUMNI_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // If user is not an admin
  if (userRole !== 'admin') {
    // If user is an alumni, redirect to alumni profile
    if (userRole === 'alumni') {
      return <Navigate to={ALUMNI_ROUTES.PROFILE} replace />;
    }
    
    // Otherwise, redirect to login
    return <Navigate to={ALUMNI_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
