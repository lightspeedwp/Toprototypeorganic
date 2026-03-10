/**
 * Group Size Block Component
 * 
 * Displays the maximum number of travellers allowed on a tour.
 * Provides quick context for comparing tours.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/group-size
 * - Category: Tour Operator
 * - Used on tour pages or summary cards
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module GroupSize
 * @category blocks/tour-operator
 */

import React from 'react';
import { Users } from '@phosphor-icons/react';

/**
 * Group size props.
 */
export interface GroupSizeProps {
  /** Maximum number of travellers */
  value: number | string;
  
  /** Whether to show users icon */
  showIcon?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Group Size Block component.
 * 
 * Displays tour maximum group size.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <GroupSize
 *   value={12}
 *   showIcon={true}
 * />
 * ```
 * 
 * @param {GroupSizeProps} props - Component props
 * @returns {JSX.Element} Rendered group size block
 */
export function GroupSize({
  value,
  showIcon = true,
  className = '',
}: GroupSizeProps) {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="group"
      aria-label="Group size"
    >
      {showIcon && (
        <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
      )}
      <p className="font-sans">
        <strong className="font-sans font-semibold">
          Group Size:
        </strong>{' '}
        {value} {typeof value === 'number' && value === 1 ? 'person' : 'people'} max
      </p>
    </div>
  );
}

GroupSize.displayName = 'GroupSize';