'use client';

import posthog from 'posthog-js';

// Simple, standard PostHog initialization following official docs
export function initPostHogSimple() {
  if (typeof window === 'undefined') return;

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!posthogKey || !posthogHost) {
    console.error('[PostHog] Missing credentials');
    return;
  }

  // Check if already initialized
  if (posthog.__loaded) {
    console.log('[PostHog] Already initialized');
    return;
  }

  console.log('[PostHog] Initializing with standard config...');

  // Standard initialization from PostHog docs
  posthog.init(posthogKey, {
    api_host: posthogHost,

    // Enable features
    autocapture: false, // Disable auto-capture, we'll track manually
    capture_pageview: true,
    capture_pageleave: true,

    // Storage
    persistence: 'localStorage+cookie',

    // Session recording (optional)
    disable_session_recording: true,

    // Development settings
    loaded: (ph) => {
      console.log('[PostHog] Loaded successfully');
      console.log('[PostHog] Token:', ph.get_config('token'));
      console.log('[PostHog] Host:', ph.get_config('api_host'));
      console.log('[PostHog] Opted out?:', ph.has_opted_out_capturing());

      // Make globally available
      if (typeof window !== 'undefined') {
        window.posthog = ph;
      }
    }
  });
}

// Export PostHog for direct use
export { posthog };
