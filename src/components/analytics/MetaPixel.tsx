'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

interface MetaPixelProps {
  pixelId: string;
}

/**
 * Meta (Facebook) Pixel integration component
 * Place this in the root layout to track Meta ad conversions
 */
export default function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    if (!pixelId || typeof window === 'undefined') return;

    // Initialize fbq function
    if (!window.fbq) {
      window.fbq = function() {
        window.fbq.callMethod
          ? window.fbq.callMethod.apply(window.fbq, arguments)
          : window.fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = window.fbq;
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];
    }

    // Initialize the pixel
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    // Track page views on route changes
    const handleRouteChange = () => {
      window.fbq('track', 'PageView');
    };

    // Listen for Next.js route changes
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="lazyOnload"
        src={`https://connect.facebook.net/en_US/fbevents.js`}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/**
 * Helper functions to track Meta Pixel events
 */

export function trackMetaEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
}

export function trackMetaCustomEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, parameters);
  }
}

// Pre-defined conversion events
export function trackMetaLead(parameters?: Record<string, any>) {
  trackMetaEvent('Lead', parameters);
}

export function trackMetaCompleteRegistration(parameters?: Record<string, any>) {
  trackMetaEvent('CompleteRegistration', parameters);
}

export function trackMetaContact(parameters?: Record<string, any>) {
  trackMetaEvent('Contact', parameters);
}

export function trackMetaSubmitApplication(parameters?: Record<string, any>) {
  trackMetaEvent('SubmitApplication', parameters);
}
