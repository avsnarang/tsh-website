'use client';

import { Suspense } from 'react';
import { useUTMTracking } from '@/hooks/useUTMTracking';

/**
 * Component to track UTM parameters from URL
 * Must be wrapped in Suspense due to useSearchParams
 */
function UTMTrackerInner() {
  useUTMTracking();
  return null;
}

export default function UTMTracker() {
  return (
    <Suspense fallback={null}>
      <UTMTrackerInner />
    </Suspense>
  );
}
