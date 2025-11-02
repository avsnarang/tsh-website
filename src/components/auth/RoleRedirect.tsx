'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { ALUMNI_ROUTES, ADMIN_ROUTES } from '../../config/routes';

export default function RoleRedirect() {
  const { user, userRole, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      console.log("No valid user found, redirecting to login");
      router.push(`${ALUMNI_ROUTES.LOGIN}?redirect=${encodeURIComponent(pathname || '/')}`);
      return;
    }

    if (userRole === 'admin') {
      console.log("Admin user detected, redirecting to admin dashboard");
      router.push(ADMIN_ROUTES.DASHBOARD);
      return;
    }
  }, [user, loading, userRole, pathname, router]);

  // Return null as this is just a redirect component
  return null;
}