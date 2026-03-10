/**
 * Departs From Block Component
 * 
 * Shows the starting location of a tour.
 * Helps travellers identify where their journey begins.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/departs-from
 * - Category: Tour Operator
 * - Used on tour pages or summary cards
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module DepartsFrom
 * @category blocks/tour-operator
 */

import React from 'react';
import { MapPin } from '@phosphor-icons/react';

/**
 * Departs from props.
 */
export interface DepartsFromProps {
  /** Name of the departure city or region */
  location: string;
  
  /** Whether to show location icon */
  showIcon?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Departs From Block component.
 * 
 * Displays tour departure location.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <DepartsFrom
 *   location="Cape Town, South Africa"
 *   showIcon={true}
 * />
 * ```
 * 
 * @param {DepartsFromProps} props - Component props
 * @returns {JSX.Element} Rendered departs from block
 */
export function DepartsFrom({
  location,
  showIcon = true,
  className = '',
}: DepartsFromProps) {
  if (!location) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="group"
      aria-label="Departs from"
    >
      {showIcon && (
        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
      )}
      <p className="font-sans">
        <strong className="font-sans font-semibold">
          Departs From:
        </strong>{' '}
        {location}
      </p>
    </div>
  );
}

DepartsFrom.displayName = 'DepartsFrom';