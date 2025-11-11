'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthInitializer() {
  const pathname = usePathname();
  const { clearAdminSession } = useAuth();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isLoginPage = pathname?.includes('/login');
    const loginInProgress = sessionStorage.getItem('login_in_progress');
    
    if (isLoginPage && !loginInProgress) {
      clearAdminSession();
    }
  }, [pathname, clearAdminSession]);
  
  return null;
} 
