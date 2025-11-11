'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { ALUMNI_ROUTES } from '../../config/routes';

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
  const pathname = usePathname();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  useEffect(() => {
    // For auth pages (login/register), redirect to profile if already logged in
    if (!requireAuth && user) {
      const isLoginPage = pathname?.includes('/login');
      if (isLoginPage && userRole === 'admin') {
        console.log('Admin on login page - not auto-redirecting');
        return;
      }
      
      // Otherwise redirect based on role
      if (userRole === 'admin') {
        router.push('/admin/dashboard');
        return;
      }
      router.push(ALUMNI_ROUTES.PROFILE);
      return;
    }

    // For protected pages, redirect to login if not logged in
    if (requireAuth && !user && !loading) {
      router.push(`${ALUMNI_ROUTES.LOGIN}?redirect=${encodeURIComponent(pathname || '/')}`);
      return;
    }

    // If specific role is required, check if user has that role
    if (requireAuth && requiredRole && userRole !== requiredRole && !loading) {
      // If user is logged in but doesn't have the required role
      if (userRole === 'admin') {
        router.push('/admin/dashboard');
      } else if (userRole === 'alumni') {
        router.push(ALUMNI_ROUTES.PROFILE);
      } else {
        // If no valid role, send to login
        router.push(`${ALUMNI_ROUTES.LOGIN}?redirect=${encodeURIComponent(pathname || '/')}`);
      }
    }
  }, [user, userRole, loading, requireAuth, requiredRole, pathname, router]);

  return <>{children}</>;
}
