'use client'

import { useEffect } from 'react'

// PostHog initialization component for Next.js 16 with Turbopack
// Using dynamic import to avoid Turbopack compilation issues
export function PostHogInit() {
  useEffect(() => {
    // Only initialize if we have the key
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!posthogKey) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set. Analytics will not be initialized.');
      }
      return;
    }

    // Dynamically import posthog-js to avoid Turbopack issues
    import('posthog-js').then(({ default: posthog }) => {
      // Check if already initialized
      if (posthog.__loaded) {
        return;
      }

      // Initialize PostHog
      posthog.init(posthogKey, {
        api_host: '/ingest', // Use proxy configured in next.config.ts
        defaults: '2025-05-24', // Automatically handles $pageview and $pageleave events
        ui_host: 'https://us.posthog.com',
        person_profiles: 'identified_only',
        autocapture: true,
        disable_session_recording: true,
        disable_surveys: true,
        debug: process.env.NODE_ENV === 'development',
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('[PostHog] Initialized successfully');
          }
        },
      });
    }).catch((error) => {
      console.error('[PostHog] Failed to load posthog-js:', error);
    });
  }, [])

  return null
}

