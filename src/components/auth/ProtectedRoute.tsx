import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ALUMNI_ROUTES } from '../../constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'admin' | 'alumni' | null;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requiredRole = null 
}: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // For auth pages (login/register), redirect to profile if already logged in
  if (!requireAuth && user) {
    // If we're on the login page and the user is an admin, don't auto-redirect
    const isLoginPage = location.pathname.includes('/login');
    if (isLoginPage && userRole === 'admin') {
      console.log('Admin on login page - not auto-redirecting');
      return <>{children}</>;
    }
    
    // Otherwise redirect based on role
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to={ALUMNI_ROUTES.PROFILE} replace />;
  }

  // For protected pages, redirect to login if not logged in
  if (requireAuth && !user) {
    return <Navigate to={ALUMNI_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // If specific role is required, check if user has that role
  if (requireAuth && requiredRole && userRole !== requiredRole) {
    // If user is logged in but doesn't have the required role
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'alumni') {
      return <Navigate to={ALUMNI_ROUTES.PROFILE} replace />;
    } else {
      // If no valid role, log them out and send to login
      return <Navigate to={ALUMNI_ROUTES.LOGIN} state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
}
