'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Capture error in PostHog (dynamically import to avoid SSR issues)
    import('posthog-js').then(({ default: posthog }) => {
      if (posthog?.__loaded) {
        posthog.captureException(error);
        posthog.capture('error_boundary_triggered', {
          error_message: error.message,
          error_stack: error.stack,
          component_stack: errorInfo.componentStack,
        });
      }
    }).catch(() => {
      // PostHog not available, ignore
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-neutral-dark mb-4">Oops!</h1>
            <p className="text-neutral-dark/80 mb-6">
              Something went wrong
            </p>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-neutral-light rounded-lg hover:bg-primary-dark transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
