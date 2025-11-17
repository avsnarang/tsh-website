'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
      
      if (posthogKey && !posthog.__loaded) {
        posthog.init(posthogKey, {
          api_host: '/ingest',
          ui_host: posthogHost,
          person_profiles: 'identified_only',
          capture_pageview: false, // We'll handle pageviews manually for Next.js
          capture_pageleave: true,
          loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('[PostHog] Initialized successfully')
            }
          },
        })
      }
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

