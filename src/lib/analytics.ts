import posthog from 'posthog-js';

// Create a flag to track initialization status
let isInitialized = false;

// Initialize PostHog
export const initPostHog = () => {
  if (typeof window === 'undefined') return;
  
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

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
        if (process.env.NODE_ENV === 'development') {
          // Disable capturing in development
          posthog.opt_out_capturing();
        }
        isInitialized = true;
        // Attach to window for debugging
        window.posthog = posthog;
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

// Generic button click tracking - supports both object and individual parameters
export const trackButtonClick = (
  buttonNameOrProps: string | Record<string, any>,
  location?: string,
  additionalProps?: Record<string, any>
) => {
  if (!isInitialized) return;

  // Support both calling styles: object parameter or individual parameters
  if (typeof buttonNameOrProps === 'object') {
    trackEvent('button_click', {
      button_name: buttonNameOrProps.buttonName,
      button_id: buttonNameOrProps.buttonId,
      page: buttonNameOrProps.page,
      section: buttonNameOrProps.section,
      button_type: buttonNameOrProps.buttonType,
      action: buttonNameOrProps.action,
      destination: buttonNameOrProps.destination,
      ...buttonNameOrProps.metadata,
      non_interaction: false
    });
  } else {
    trackEvent('button_click', {
      button_name: buttonNameOrProps,
      page_location: location,
      ...additionalProps,
      non_interaction: false
    });
  }
};