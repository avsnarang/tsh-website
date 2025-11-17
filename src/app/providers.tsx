'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { AuthProvider } from '@/contexts/AuthContext';
import { AlumniAuthProvider } from '@/contexts/AlumniAuthContext';
import { MessagesProvider } from '@/contexts/MessagesContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { PHProvider } from '@/components/PostHogProvider';
import { PostHogPageView } from '@/components/PostHogPageView';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <PHProvider>
        <PostHogPageView />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AlumniAuthProvider>
              <MessagesProvider>
                {children}
              </MessagesProvider>
            </AlumniAuthProvider>
          </AuthProvider>
        </QueryClientProvider>
      </PHProvider>
    </ErrorBoundary>
  );
}