/**
 * Facilities Block Component
 * 
 * Lists key facilities and amenities offered by an accommodation.
 * Consolidates amenity information for guests.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/facilities
 * - Category: Tour Operator
 * - Used on accommodation pages to highlight available facilities
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module Facilities
 * @category blocks/tour-operator
 */

import React from 'react';
import { Check } from '@phosphor-icons/react';

/**
 * Facilities props.
 */
export interface FacilitiesProps {
  /** List of facility names */
  facilities: string[];
  
  /** Display layout: list or grid */
  layout?: 'list' | 'grid';
  
  /** Optional title for the section */
  title?: string;
  
  /** Whether to show checkmark icons */
  showIcon?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Facilities Block component.
 * 
 * Displays accommodation facilities and amenities.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <Facilities
 *   facilities={['Wi-Fi', 'Swimming Pool', 'Restaurant', 'Spa']}
 *   layout="grid"
 *   title="Amenities"
 * />
 * ```
 * 
 * @param {FacilitiesProps} props - Component props
 * @returns {JSX.Element} Rendered facilities block
 */
export function Facilities({
  facilities,
  layout = 'list',
  title = 'Facilities',
  showIcon = true,
  className = '',
}: FacilitiesProps) {
  if (!facilities || facilities.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`} aria-label="Facilities">
      {/* Title */}
      {title && (
        <h3 className="pb-element-lg">
          {title}
        </h3>
      )}

      {/* Facilities List */}
      <ul
        className={`
          ${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-fluid-sm' : 'flex flex-col gap-fluid-sm'}
        `}
        role="list"
      >
        {facilities.map((facility, index) => (
          <li key={index} className="flex items-start gap-fluid-xs">
            {showIcon && (
              <Check className="w-4 h-4 text-primary flex-shrink-0 translate-y-px" aria-hidden="true" />
            )}
            <span className="font-[family-name:var(--font-family-noto-sans)]">
              {facility}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

Facilities.displayName = 'Facilities';