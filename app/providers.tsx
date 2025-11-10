'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { AuthProvider } from '@/contexts/AuthContext';
import { AlumniAuthProvider } from '@/contexts/AlumniAuthContext';
import { MessagesProvider } from '@/contexts/MessagesContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PostHogProvider } from '@/components/PostHogProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <PostHogProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AlumniAuthProvider>
              <MessagesProvider>
                {children}
              </MessagesProvider>
            </AlumniAuthProvider>
          </AuthProvider>
        </QueryClientProvider>
      </PostHogProvider>
    </ErrorBoundary>
  );
}