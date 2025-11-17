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
        capture_pageview: true, // Enable automatic pageview for web analytics
        capture_pageleave: true, // Enable pageleave for web analytics
        // Important: For web analytics to work, the website URL in PostHog must match
        // Go to PostHog Settings → Website URL and add your domain
        // For localhost testing, add: http://localhost:3001
        // For production, add: https://tsh.edu.in
        debug: process.env.NODE_ENV === 'development',
        loaded: (ph) => {
          console.log('[PostHog] ✅ Initialized successfully')
          console.log('[PostHog] API Host:', ph.config.api_host)
          console.log('[PostHog] UI Host:', ph.config.ui_host)
          
          // Check if running on localhost
          if (typeof window !== 'undefined') {
            const hostname = window.location.hostname
            if (hostname === 'localhost' || hostname === '127.0.0.1') {
              console.warn('[PostHog] ⚠️ Running on localhost. Make sure your PostHog project website URL is set to accept localhost or all domains.')
              console.warn('[PostHog] Go to: Project Settings → Website URL and add http://localhost:3001 or set to accept all domains')
            }
          }
          
          // Verify API key
          if (process.env.NODE_ENV === 'development') {
            console.log('[PostHog] API Key (first 20 chars):', posthogKey?.substring(0, 20) + '...')
            console.log('[PostHog] Make sure this matches your PostHog project API key')
            
            // Test that requests are being made
            console.log('[PostHog] Sending test event...')
            ph.capture('test_event', { test: true })
            
            // Also send a pageview manually to test
            setTimeout(() => {
              ph.capture('$pageview', {
                $current_url: window.location.href,
              })
              console.log('[PostHog] Sent $pageview event manually')
              
              // Force send immediately
              if (typeof (ph as any).flush === 'function') {
                (ph as any).flush()
                console.log('[PostHog] Flushed events')
              }
            }, 500)
            
            console.log('[PostHog] Test events sent. Check Network tab for /tsh-2024-data/ requests.')
            console.log('[PostHog] Then check PostHog Activity → Events (not Live) to see if events appear')
          }
        },
      })
    } catch (error) {
      console.error('[PostHog] ❌ Initialization error:', error)
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

