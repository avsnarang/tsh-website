import posthog from 'posthog-js'

// Initialize PostHog using the instrumentation-client approach
// This is the recommended approach per PostHog documentation for Next.js 15.3+
// Reference: https://posthog.com/docs/libraries/next-js?tab=Instrumentation+client
//
// Note: instrumentation-client.ts requires Next.js 15.3+
// If you're on an older version, this file may not be automatically loaded.
// In that case, you can either:
// 1. Upgrade Next.js to 15.3+ (recommended)
// 2. Use the PostHogProvider approach in app/layout.tsx instead

// Only initialize if we have the key and we're in the browser
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  // Use proxy for better reliability and to bypass ad blockers
  // The proxy is configured in next.config.ts to route /ingest/* to PostHog
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: '/ingest', // Use proxy configured in next.config.ts
    defaults: '2025-05-24', // Automatically handles $pageview and $pageleave events
  });
}

