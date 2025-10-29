'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'alumni')[];
}

export default function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <redirect to="/login" state={{ from: location }} replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <redirect to="/" replace />;
  }

  return <>{children}</>;
}