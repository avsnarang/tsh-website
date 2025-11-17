'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] Checking initialization...')
      console.log('[PostHog] Key present:', !!posthogKey)
      console.log('[PostHog] Already loaded:', !!posthog.__loaded)
    }
    
    if (!posthogKey) {
      console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set. PostHog will not initialize.')
      return
    }
    
    if (posthog.__loaded) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] Already initialized, skipping')
      }
      return
    }
    
    try {
      posthog.init(posthogKey, {
        api_host: '/tsh-2024-data',
        ui_host: posthogHost,
        person_profiles: 'identified_only',
        capture_pageview: false, // We'll handle pageviews manually for Next.js
        capture_pageleave: true,
        debug: process.env.NODE_ENV === 'development',
        loaded: (ph) => {
          console.log('[PostHog] ✅ Initialized successfully')
          console.log('[PostHog] API Host:', ph.config.api_host)
          console.log('[PostHog] UI Host:', ph.config.ui_host)
        },
      })
    } catch (error) {
      console.error('[PostHog] ❌ Initialization error:', error)
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

