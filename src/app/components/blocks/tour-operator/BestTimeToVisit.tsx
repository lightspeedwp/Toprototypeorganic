/**
 * Best Time to Visit Block Component
 * 
 * Displays optimal months or seasons to visit a destination.
 * Presents information visually using a calendar-style layout.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/best-time-to-visit
 * - Category: Tour Operator
 * - Used on destination pages where seasonality matters
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module BestTimeToVisit
 * @category blocks/tour-operator
 */

import './BestTimeToVisit.css';
import { cn } from '../../../lib/utils';

/**
 * Best time to visit props.
 */
export interface BestTimeToVisitProps {
  /** List of months (1-12 or names) that are ideal for visiting */
  months?: number[] | string[];
  
  /** Display type: bar or list */
  layout?: 'bar' | 'list';
  
  /** Optional title for the section */
  title?: string;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Month names for display.
 */
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Best Time to Visit Block component.
 * 
 * Displays recommended months for visiting a destination.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function BestTimeToVisit({
  months = [],
  layout = 'bar',
  title = 'Best Time to Visit',
  className = '',
}: BestTimeToVisitProps) {
  // Normalize months to numbers (1-12)
  const monthNumbers = months.map(m => {
    if (typeof m === 'number') return m;
    return MONTH_NAMES.indexOf(m) + 1;
  }).filter(m => m >= 1 && m <= 12);

  if (monthNumbers.length === 0) {
    return null;
  }

  return (
    <div className={cn('lsx-best-time-to-visit', className)} aria-label={title}>
      {/* Title */}
      <h3>{title}</h3>

      {/* Bar Layout */}
      {layout === 'bar' && (
        <div className="lsx-best-time-to-visit__bar" role="list" aria-label="Months calendar">
          {MONTH_NAMES.map((month, index) => {
            const monthNum = index + 1;
            const isRecommended = monthNumbers.includes(monthNum);
            
            return (
              <div
                key={monthNum}
                className={cn(
                  'lsx-best-time-to-visit__month',
                  isRecommended && 'lsx-best-time-to-visit__month--recommended'
                )}
                role="listitem"
              >
                <div
                  className="lsx-best-time-to-visit__indicator"
                  aria-label={`${month}${isRecommended ? ' (recommended)' : ''}`}
                />
                <span className="lsx-best-time-to-visit__label">
                  {month}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* List Layout */}
      {layout === 'list' && (
        <p className="lsx-best-time-to-visit__list">
          {monthNumbers.map(m => MONTH_NAMES[m - 1]).join(', ')}
        </p>
      )}
    </div>
  );
}

BestTimeToVisit.displayName = 'BestTimeToVisit';
