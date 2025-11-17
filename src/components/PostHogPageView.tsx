'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'

function PostHogPageViewInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (!pathname || !posthog) return

    // Wait for PostHog to be fully loaded
    if (!posthog.__loaded) {
      const checkLoaded = setInterval(() => {
        if (posthog.__loaded) {
          clearInterval(checkLoaded)
          trackPageView()
        }
      }, 100)
      
      // Clear interval after 5 seconds to avoid infinite loop
      setTimeout(() => clearInterval(checkLoaded), 5000)
      return
    }

    trackPageView()

    function trackPageView() {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      
      try {
        posthog.capture('$pageview', {
          $current_url: url,
        })
        
        // Force immediate send in development
        if (process.env.NODE_ENV === 'development') {
          posthog.flush()
          console.log('[PostHog] Pageview tracked:', url)
          console.log('[PostHog] Flushed events. Check Network tab for /tsh-2024-data/ requests.')
        }
      } catch (error) {
        console.error('[PostHog] Error tracking pageview:', error)
      }
    }
  }, [pathname, searchParams, posthog])

  return null
}

export function PostHogPageView() {
  return <PostHogPageViewInner />
}

