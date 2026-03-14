/**
 * Check Out Time Block Component
 * 
 * Displays the time at which guests must vacate an accommodation.
 * Communicates logistics clearly to travellers.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/checkout-time
 * - Category: Tour Operator
 * - Used on accommodation pages or within accommodation cards
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module CheckoutTime
 * @category blocks/tour-operator
 */

import React from 'react';
import { Clock } from '@phosphor-icons/react';

/**
 * Check out time props.
 */
export interface CheckoutTimeProps {
  /** Time to display for check-out */
  time?: string;
  
  /** Whether to show clock icon */
  showIcon?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Check Out Time Block component.
 * 
 * Displays accommodation checkout time.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <CheckoutTime
 *   time="11:00 AM"
 *   showIcon={true}
 * />
 * ```
 * 
 * @param {CheckoutTimeProps} props - Component props
 * @returns {JSX.Element} Rendered checkout time block
 */
export function CheckoutTime({
  time = '11:00 AM',
  showIcon = true,
  className = '',
}: CheckoutTimeProps) {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-label="Check out time"
    >
      {showIcon && (
        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
      )}
      <p className="font-[family-name:var(--font-family-noto-sans)]">
        <strong className="font-[family-name:var(--font-family-noto-sans)] font-[var(--font-weight-semibold)]">
          Check Out Time:
        </strong>{' '}
        {time}
      </p>
    </div>
  );
}

CheckoutTime.displayName = 'CheckoutTime';