"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize PostHog in the browser
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
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
        advanced_disable_decide: false,
      })
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
