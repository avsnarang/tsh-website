import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

// Create a flag to track initialization status
let isInitialized = false;

// Initialize PostHog
// Initialize PostHog
export const initPostHog = () => {
  const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
  const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

  if (posthogKey && posthogHost) {
    if (isInitialized) return;

    posthog.init(posthogKey, {
      api_host: posthogHost,
      capture_pageview: true,
      persistence: 'localStorage',
      bootstrap: {
        distinctID: 'anonymous',
      },
      loaded: (posthog) => {
        if (import.meta.env.DEV) {
          // Disable capturing in development
          posthog.opt_out_capturing();
        }
        isInitialized = true;
        // Attach to window for debugging
        if (typeof window !== 'undefined') {
          window.posthog = posthog;
        }
      }
    });

    // Add page leave event listener
    window.addEventListener('beforeunload', () => {
      if (isInitialized) {
        posthog.capture('$pageleave', {
          $session_duration: Date.now() - window.performance.timing.navigationStart
        });
      }
    });
  }
};

// Custom hook for page views
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) return;

    // Track page view duration
    const startTime = Date.now();

    // Capture pageview with PostHog
    posthog.capture('$pageview', {
      current_url: window.location.href,
      page_path: location.pathname + location.search,
      referrer: document.referrer
    });

    // Cleanup function to track page leave
    return () => {
      if (!isInitialized) return;

      const duration = Date.now() - startTime;
      posthog.capture('$pageleave', {
        $session_duration: duration,
        page_path: location.pathname + location.search
      });
    };
  }, [location]);
};

// Event tracking helper with enhanced type safety
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>,
  options?: {
    callback?: () => void;
    props?: Record<string, any>;
    revenue?: number;
  }
) => {
  if (!isInitialized) return;

  posthog.capture(eventName, {
    ...properties,
    ...options?.props,
    value: options?.revenue,
  });
  
  if (options?.callback) {
    options.callback();
  }
};

// CTA tracking helpers
export const trackCTAClick = (
  buttonName: string, 
  location: string,
  type: 'primary' | 'secondary' | 'admission' = 'primary'
) => {
  if (!isInitialized) return;

  trackEvent('cta_click', {
    button_name: buttonName,
    page_location: location,
    button_type: type,
    non_interaction: false
  });
};

// Admission-specific tracking
export const trackAdmissionCTA = (
  campus: string,
  buttonLocation: 'hero' | 'card' | 'footer',
  registrationUrl: string
) => {
  if (!isInitialized) return;

  posthog.capture('admission_cta_click', {
    campus: campus,
    button_location: buttonLocation,
    registration_url: registrationUrl,
    non_interaction: false
  });
};

// Helper functions for common events
export const trackDownload = (fileName: string, category?: string) => {
  trackEvent('download', {
    file_name: fileName,
    file_extension: fileName.split('.').pop()?.toLowerCase(),
    category: category || 'Document',
    non_interaction: false
  });
};

export const trackOutboundLink = (url: string, target: string = '_blank') => {
  trackEvent('outbound_link', {
    destination_url: url,
    target: target,
    non_interaction: false
  });
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submission', {
    form_name: formName,
    submission_status: success ? 'success' : 'failure',
    non_interaction: false
  });
};

export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    non_interaction: false
  });
};