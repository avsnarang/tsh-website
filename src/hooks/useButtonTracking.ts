'use client';

import { useCallback } from 'react';
import { trackButtonClick } from '@/lib/analytics';

interface ButtonTrackingParams {
  buttonName: string;
  page: string;
  section?: string;
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon';
  action?: string;
  destination?: string;
  metadata?: Record<string, any>;
}

/**
 * Hook to easily add tracking to existing buttons
 *
 * @example Basic usage:
 * ```tsx
 * const trackClick = useButtonTracking({
 *   buttonName: 'Apply Now',
 *   page: 'admissions',
 *   section: 'campus-cards'
 * });
 *
 * <button onClick={trackClick}>Apply Now</button>
 * ```
 *
 * @example With existing onClick handler:
 * ```tsx
 * const trackClick = useButtonTracking({
 *   buttonName: 'Submit Form',
 *   page: 'contact',
 *   action: 'form_submit'
 * });
 *
 * const handleSubmit = () => {
 *   // Your logic here
 *   console.log('Form submitted');
 * };
 *
 * <button onClick={() => {
 *   trackClick();
 *   handleSubmit();
 * }}>
 *   Submit
 * </button>
 * ```
 *
 * @example With dynamic metadata:
 * ```tsx
 * const trackClick = useButtonTracking({
 *   buttonName: 'Select Campus',
 *   page: 'admissions',
 * });
 *
 * <button onClick={() => trackClick({ campus: 'Paonta Sahib' })}>
 *   TSH Paonta Sahib
 * </button>
 * ```
 */
export function useButtonTracking(params: ButtonTrackingParams) {
  return useCallback(
    (additionalMetadata?: Record<string, any>) => {
      trackButtonClick({
        ...params,
        metadata: {
          ...params.metadata,
          ...additionalMetadata,
        },
      });
    },
    [params.buttonName, params.page, params.section, params.buttonType, params.action]
  );
}

/**
 * Hook that returns a tracked onClick handler
 * Combines tracking with your existing onClick logic
 *
 * @example
 * ```tsx
 * const handleTrackedClick = useTrackedClick(
 *   {
 *     buttonName: 'Download Brochure',
 *     page: 'admissions',
 *     action: 'download'
 *   },
 *   () => {
 *     // Your existing onClick logic
 *     downloadFile('brochure.pdf');
 *   }
 * );
 *
 * <button onClick={handleTrackedClick}>Download</button>
 * ```
 */
export function useTrackedClick(
  params: ButtonTrackingParams,
  onClick?: (event?: React.MouseEvent) => void
) {
  return useCallback(
    (event?: React.MouseEvent) => {
      trackButtonClick(params);
      onClick?.(event);
    },
    [params.buttonName, params.page, onClick]
  );
}

/**
 * Hook for tracking navigation clicks
 *
 * @example
 * ```tsx
 * const trackNavClick = useNavigationTracking('home');
 *
 * <nav>
 *   <button onClick={() => trackNavClick('About', '/about')}>About</button>
 *   <button onClick={() => trackNavClick('Contact', '/contact')}>Contact</button>
 * </nav>
 * ```
 */
export function useNavigationTracking(page: string) {
  return useCallback(
    (linkName: string, destination: string) => {
      trackButtonClick({
        buttonName: linkName,
        page,
        section: 'navigation',
        buttonType: 'link',
        action: 'navigate',
        destination,
      });
    },
    [page]
  );
}
