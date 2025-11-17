'use client'

import { useEffect } from 'react'

// PostHog initialization component for Next.js 16 with Turbopack
// Using dynamic import to avoid Turbopack compilation issues
export function PostHogInit() {
  useEffect(() => {
    // Only initialize if we have the key
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!posthogKey) {
      console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set. Analytics will not be initialized.');
      return;
    }

    // Dynamically import posthog-js to avoid Turbopack issues
    import('posthog-js').then(({ default: posthog }) => {
      // Check if already initialized
      if (posthog.__loaded) {
        console.log('[PostHog] Already initialized');
        return;
      }

      console.log('[PostHog] Initializing...');

      // Initialize PostHog
      posthog.init(posthogKey, {
        api_host: '/ingest', // Use proxy configured in next.config.ts
        defaults: '2025-05-24', // Automatically handles $pageview and $pageleave events
        ui_host: 'https://us.posthog.com',
        person_profiles: 'identified_only',
        autocapture: true,
        disable_session_recording: true,
        disable_surveys: true,
        debug: true, // Enable debug in production to troubleshoot
        loaded: (ph) => {
          console.log('[PostHog] ✅ Initialized successfully');
          console.log('[PostHog] API Host:', ph.config.api_host);
          console.log('[PostHog] Token:', ph.config.token?.substring(0, 10) + '...');
          
          // Make PostHog globally available for debugging
          if (typeof window !== 'undefined') {
            (window as any).posthog = ph;
            console.log('[PostHog] Available globally as window.posthog');
          }

          // Test capture to verify it's working
          ph.capture('$pageview', {
            $current_url: window.location.href,
          });
          console.log('[PostHog] Test pageview event sent');
        },
      });
    }).catch((error) => {
      console.error('[PostHog] ❌ Failed to load posthog-js:', error);
    });
  }, [])

  return null
}

