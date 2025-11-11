'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { ALUMNI_ROUTES } from '../../config/routes';

interface RequireAdminProps {
  children: React.ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const { user, userRole, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`${ALUMNI_ROUTES.LOGIN}?redirect=${encodeURIComponent(pathname || '/admin')}`);
        return;
      }
      if (userRole !== 'admin') {
        if (userRole === 'alumni') {
          router.push(ALUMNI_ROUTES.PROFILE);
        } else {
          router.push(`${ALUMNI_ROUTES.LOGIN}?redirect=${encodeURIComponent(pathname || '/admin')}`);
        }
      }
    }
  }, [user, userRole, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || userRole !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
