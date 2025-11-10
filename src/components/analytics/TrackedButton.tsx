'use client';

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { trackButtonClick } from '@/lib/analytics';

interface BaseTrackedProps {
  trackingName: string;
  trackingPage: string;
  trackingSection?: string;
  trackingType?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon';
  trackingAction?: string;
  trackingDestination?: string;
  trackingMetadata?: Record<string, any>;
  children: React.ReactNode;
}

type TrackedButtonProps = BaseTrackedProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
};

type TrackedLinkProps = BaseTrackedProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
};

type TrackedProps = TrackedButtonProps | TrackedLinkProps;

/**
 * TrackedButton - A button component that automatically tracks clicks in PostHog
 *
 * @example Basic usage:
 * ```tsx
 * <TrackedButton
 *   trackingName="Apply Now"
 *   trackingPage="admissions"
 *   trackingSection="hero"
 *   onClick={() => console.log('clicked')}
 * >
 *   Apply Now
 * </TrackedButton>
 * ```
 *
 * @example As a link:
 * ```tsx
 * <TrackedButton
 *   as="a"
 *   href="/admissions"
 *   trackingName="Learn More"
 *   trackingPage="home"
 *   trackingDestination="/admissions"
 * >
 *   Learn More
 * </TrackedButton>
 * ```
 */
export default function TrackedButton(props: TrackedProps) {
  const {
    trackingName,
    trackingPage,
    trackingSection,
    trackingType = 'primary',
    trackingAction,
    trackingDestination,
    trackingMetadata,
    children,
    as = 'button',
    ...restProps
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    // Track the button click
    trackButtonClick({
      buttonName: trackingName,
      buttonId: restProps.id,
      page: trackingPage,
      section: trackingSection,
      buttonType: trackingType,
      action: trackingAction,
      destination: trackingDestination || (as === 'a' && 'href' in restProps ? restProps.href : undefined),
      metadata: trackingMetadata,
    });

    // Call the original onClick handler if provided
    if ('onClick' in restProps && restProps.onClick) {
      restProps.onClick(event as any);
    }
  };

  if (as === 'a') {
    const { onClick, ...linkProps } = restProps as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...linkProps} onClick={handleClick}>
        {children}
      </a>
    );
  }

  const { onClick, ...buttonProps } = restProps as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} onClick={handleClick}>
      {children}
    </button>
  );
}

/**
 * withButtonTracking - Higher-order component to add tracking to any button component
 *
 * @example
 * ```tsx
 * const TrackedMotionButton = withButtonTracking(motion.button);
 *
 * <TrackedMotionButton
 *   trackingName="Submit Form"
 *   trackingPage="contact"
 *   whileHover={{ scale: 1.05 }}
 * >
 *   Submit
 * </TrackedMotionButton>
 * ```
 */
export function withButtonTracking<P extends React.HTMLAttributes<any>>(
  Component: React.ComponentType<P>
) {
  return function TrackedComponent(
    props: P & BaseTrackedProps
  ) {
    const {
      trackingName,
      trackingPage,
      trackingSection,
      trackingType = 'primary',
      trackingAction,
      trackingDestination,
      trackingMetadata,
      onClick,
      ...restProps
    } = props;

    const handleClick = (event: React.MouseEvent<any>) => {
      trackButtonClick({
        buttonName: trackingName,
        buttonId: restProps.id,
        page: trackingPage,
        section: trackingSection,
        buttonType: trackingType,
        action: trackingAction,
        destination: trackingDestination,
        metadata: trackingMetadata,
      });

      if (onClick) {
        onClick(event);
      }
    };

    return <Component {...(restProps as P)} onClick={handleClick} />;
  };
}
