/**
 * Destination to Accommodation Block Component
 * 
 * Lists the destinations associated with a given accommodation.
 * Helps travellers understand where the accommodation is located.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/destination-to-accommodation
 * - Category: Tour Operator
 * - Used on single accommodation pages
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module DestinationToAccommodation
 * @category blocks/tour-operator
 */

import React from 'react';
import { MapPin } from '@phosphor-icons/react';

/**
 * Destination to accommodation props.
 */
export interface DestinationToAccommodationProps {
  /** List of destination names associated with the accommodation */
  destinations: string[];
  
  /** Custom label preceding the list */
  label?: string;
  
  /** Whether to show location icon */
  showIcon?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Destination to Accommodation Block component.
 * 
 * Displays associated destinations for an accommodation.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <DestinationToAccommodation
 *   destinations={['Paris', 'Lyon', 'Marseille']}
 *   label="Location"
 *   showIcon={true}
 * />
 * ```
 * 
 * @param {DestinationToAccommodationProps} props - Component props
 * @returns {JSX.Element} Rendered destination to accommodation block
 */
export function DestinationToAccommodation({
  destinations,
  label = 'Location',
  showIcon = true,
  className = '',
}: DestinationToAccommodationProps) {
  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex items-start gap-2 ${className}`}
      aria-label="Destinations"
    >
      {showIcon && (
        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" aria-hidden="true" />
      )}
      <p className="font-sans">
        <strong className="font-sans font-semibold">
          {label}:
        </strong>{' '}
        {destinations.join(', ')}
      </p>
    </div>
  );
}

DestinationToAccommodation.displayName = 'DestinationToAccommodation';