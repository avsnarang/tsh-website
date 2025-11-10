'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
  timestamp?: string;
}

const UTM_STORAGE_KEY = 'tsh_utm_params';
const UTM_EXPIRY_DAYS = 30;

/**
 * Hook to capture and persist UTM parameters for tracking admission sources
 * Stores UTM params in localStorage with expiry
 */
export function useUTMTracking() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get current UTM parameters from URL
    const utmParams: UTMParameters = {
      utm_source: searchParams?.get('utm_source') || undefined,
      utm_medium: searchParams?.get('utm_medium') || undefined,
      utm_campaign: searchParams?.get('utm_campaign') || undefined,
      utm_content: searchParams?.get('utm_content') || undefined,
      utm_term: searchParams?.get('utm_term') || undefined,
    };

    // Check if any UTM parameters exist
    const hasUTMParams = Object.values(utmParams).some(value => value !== undefined);

    if (hasUTMParams) {
      // Add metadata
      utmParams.referrer = document.referrer || 'direct';
      utmParams.landing_page = window.location.pathname;
      utmParams.timestamp = new Date().toISOString();

      // Store in localStorage
      const storageData = {
        params: utmParams,
        expiry: Date.now() + (UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
      };

      try {
        localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(storageData));

        // Track the landing event with PostHog
        trackEvent('utm_landing', {
          ...utmParams,
          page_path: window.location.pathname,
          page_url: window.location.href,
        });

        // Track specific admission sources
        if (utmParams.utm_source) {
          trackEvent('admission_source_tracked', {
            source: utmParams.utm_source,
            medium: utmParams.utm_medium,
            campaign: utmParams.utm_campaign,
          });
        }
      } catch (error) {
        console.error('Failed to store UTM parameters:', error);
      }
    }
  }, [searchParams]);

  return null;
}

/**
 * Retrieve stored UTM parameters
 * Returns null if expired or not found
 */
export function getStoredUTMParams(): UTMParameters | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return null;

    const { params, expiry } = JSON.parse(stored);

    // Check if expired
    if (Date.now() > expiry) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return null;
    }

    return params;
  } catch (error) {
    console.error('Failed to retrieve UTM parameters:', error);
    return null;
  }
}

/**
 * Clear stored UTM parameters
 */
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(UTM_STORAGE_KEY);
}
