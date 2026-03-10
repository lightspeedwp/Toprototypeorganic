/**
 * Tour Overview Block Component
 * 
 * Editorial content block for tour descriptions, highlights,
 * and narrative content on single tour pages.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/overview
 * - Category: Tour Operator
 * - Used on single tour pages (editorial content section)
 * 
 * @module TourOverview
 * @category blocks/tour-operator
 */

import './TourOverview.css';
import { CheckCircle } from '@phosphor-icons/react';

export interface TourOverviewProps {
  /** Section title */
  title?: string;
  /** Tour content (HTML string or plain text) */
  content: string;
  /** Tour highlights list */
  highlights?: string[];
  /** Optional callout text */
  callout?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Overview Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourOverview({
  title = 'Tour Overview',
  content,
  highlights,
  callout,
  className = '',
}: TourOverviewProps) {
  return (
    <section className={`lsx-tour-overview ${className}`} aria-label={title}>
      <h2>{title}</h2>

      {/* Editorial Content */}
      <div
        className="lsx-tour-overview__content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div className="lsx-tour-overview__highlights">
          <h3>Tour Highlights</h3>
          <ul className="lsx-tour-overview__highlights-list">
            {highlights.map((highlight, index) => (
              <li key={index} className="lsx-tour-overview__highlight-item">
                <CheckCircle size={18} weight="fill" className="lsx-tour-overview__highlight-icon" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Callout */}
      {callout && (
        <div className="lsx-tour-overview__callout">
          <p>{callout}</p>
        </div>
      )}
    </section>
  );
}

TourOverview.displayName = 'TourOverview';