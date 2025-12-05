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
import { useEffect, Suspense, useMemo } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change - use requestAnimationFrame for smoother experience
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  // Memoize the query client to prevent recreating on each render
  const client = useMemo(() => queryClient, []);

  return (
    <ErrorBoundary>
      <PHProvider>
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
        <QueryClientProvider client={client}>
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