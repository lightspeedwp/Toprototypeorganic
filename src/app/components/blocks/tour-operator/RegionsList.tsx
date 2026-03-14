/**
 * Regions List Block Component
 * 
 * Displays a list of child regions related to a country-level destination.
 * Shows subordinate regions (provinces, states) associated with the current destination.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/facts-regions-wrapper
 * - Category: Tour Operator
 * - Used on country destination pages to show all subordinate regions
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module RegionsList
 * @category blocks/tour-operator
 */

import React from 'react';

/**
 * Regions list props.
 */
export interface RegionsListProps {
  /** Array of child region names to display */
  regions: string[];
  
  /** Optional title for the section */
  title?: string;
  
  /** Display format: list or inline */
  format?: 'list' | 'inline';
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Regions List Block component.
 * 
 * Displays subordinate regions for a country destination.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <RegionsList
 *   regions={['Western Cape', 'Eastern Cape', 'KwaZulu-Natal']}
 *   title="Regions"
 *   format="inline"
 * />
 * ```
 * 
 * @param {RegionsListProps} props - Component props
 * @returns {JSX.Element} Rendered regions list block
 */
export function RegionsList({
  regions,
  title = 'Regions',
  format = 'inline',
  className = '',
}: RegionsListProps) {
  if (!regions || regions.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`} aria-label="Regions list">
      {/* Title */}
      {title && (
        <h3 className="pb-element-md">
          {title}
        </h3>
      )}

      {/* Inline Format */}
      {format === 'inline' && (
        <p className="font-[family-name:var(--font-family-noto-sans)]">
          {regions.join(', ')}
        </p>
      )}

      {/* List Format */}
      {format === 'list' && (
        <ul className="flex flex-col gap-1" role="list">
          {regions.map((region, index) => (
            <li
              key={index}
              className="font-[family-name:var(--font-family-noto-sans)]"
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

RegionsList.displayName = 'RegionsList';