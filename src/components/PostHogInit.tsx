'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

// PostHog initialization component for Next.js 16
// This approach is more compatible with Turbopack than instrumentation-client.ts
export function PostHogInit() {
  useEffect(() => {
    // Only initialize if we have the key
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set. Analytics will not be initialized.');
      }
      return;
    }

    // Check if already initialized
    if (posthog.__loaded) {
      return;
    }

    // Initialize PostHog
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
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
  }, [])

  return null
}

