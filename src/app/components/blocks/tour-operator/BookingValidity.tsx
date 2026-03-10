/**
 * Booking Validity Block Component
 * 
 * Displays the date range during which a tour or offer is valid.
 * Shows "Valid from" and "Valid until" dates with optional icons.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/booking-validity
 * - Category: Tour Operator
 * - Used on tour pages or promotional pages with limited booking periods
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module BookingValidity
 * @category blocks/tour-operator
 */

import React from 'react';
import { Calendar } from '@phosphor-icons/react';

/**
 * Booking validity props.
 */
export interface BookingValidityProps {
  /** Start of the booking validity period (YYYY-MM-DD) */
  startDate: string;
  
  /** End of the validity period (YYYY-MM-DD) */
  endDate: string;
  
  /** Whether to show calendar icons */
  showIcon?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Format date for display.
 * 
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Booking Validity Block component.
 * 
 * Displays tour or offer validity dates.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <BookingValidity
 *   startDate="2024-01-01"
 *   endDate="2024-12-31"
 *   showIcon={true}
 * />
 * ```
 * 
 * @param {BookingValidityProps} props - Component props
 * @returns {JSX.Element} Rendered booking validity block
 */
export function BookingValidity({
  startDate,
  endDate,
  showIcon = true,
  className = '',
}: BookingValidityProps) {
  if (!startDate || !endDate) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:gap-6 ${className}`}
      role="group"
      aria-label="Booking validity period"
    >
      {/* Valid From */}
      <div className="flex items-center gap-2">
        {showIcon && (
          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        )}
        <div>
          <span
            className="text-muted-foreground font-sans"
          >
            Valid from:{' '}
          </span>
          <span
            className="font-sans font-semibold"
          >
            {formatDate(startDate)}
          </span>
        </div>
      </div>

      {/* Valid Until */}
      <div className="flex items-center gap-2">
        {showIcon && (
          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        )}
        <div>
          <span
            className="text-muted-foreground font-sans"
          >
            Valid until:{' '}
          </span>
          <span
            className="font-sans font-semibold"
          >
            {formatDate(endDate)}
          </span>
        </div>
      </div>
    </div>
  );
}

BookingValidity.displayName = 'BookingValidity';