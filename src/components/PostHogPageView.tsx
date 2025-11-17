"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { usePostHog } from "posthog-js/react"

export function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    // Track pageviews when route changes
    if (!pathname) return;
    
    if (!posthog) {
      if (process.env.NODE_ENV === "development") {
        console.warn('[PostHog] PostHog not initialized, skipping pageview');
      }
      return;
    }

    try {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      posthog.capture('$pageview', {
        $current_url: url
      });

      if (process.env.NODE_ENV === "development") {
        console.log('[PostHog] Pageview tracked:', url);
      }
    } catch (error) {
      console.error('[PostHog] Error tracking pageview:', error);
    }
  }, [pathname, searchParams, posthog])

  return null
}
