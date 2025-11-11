'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'alumni')[];
}

export default function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { user, userRole, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?redirect=${encodeURIComponent(pathname || '/')}`);
        return;
      }
      if (!userRole || !allowedRoles.includes(userRole)) {
        router.push('/');
      }
    }
  }, [user, userRole, loading, allowedRoles, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !userRole || !allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
}