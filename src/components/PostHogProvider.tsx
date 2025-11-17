"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize PostHog in the browser
    if (typeof window === 'undefined') return;

    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    
    if (!posthogKey) {
      console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set. Analytics will not be initialized.');
      return;
    }

    // Check if already initialized
    if (posthog.__loaded) {
      console.log('[PostHog] Already initialized');
      return;
    }

    console.log('[PostHog] Initializing...');

    try {
      posthog.init(posthogKey, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        person_profiles: 'identified_only',
        capture_pageview: false, // Disable automatic pageview capture - we'll handle it manually
        capture_pageleave: true,
        autocapture: true,
        debug: process.env.NODE_ENV === "development",
        // Disable advanced features that require additional scripts to avoid proxy SSL issues
        disable_session_recording: true,
        disable_surveys: true,
        advanced_disable_decide: true, // Disable decide endpoint to avoid proxy issues
        loaded: (ph) => {
          console.log('[PostHog] Loaded successfully');
          if (process.env.NODE_ENV === "development") {
            console.log('[PostHog] Token:', ph.config.token);
            console.log('[PostHog] API Host:', ph.config.api_host);
            console.log('[PostHog] UI Host:', ph.config.ui_host);
          }
        },
      });
    } catch (error) {
      console.error('[PostHog] Initialization error:', error);
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
