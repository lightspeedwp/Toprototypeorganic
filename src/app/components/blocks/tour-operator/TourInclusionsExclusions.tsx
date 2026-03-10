/**
 * Tour Inclusions & Exclusions Block Component
 * 
 * Displays what is included and excluded from a tour package price
 * in a two-column layout with icon indicators.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/inclusions-exclusions
 * - Category: Tour Operator
 * - Used on single tour pages
 * 
 * @module TourInclusionsExclusions
 * @category blocks/tour-operator
 */

import './TourInclusionsExclusions.css';
import { CheckCircle, XCircle } from '@phosphor-icons/react';

export interface TourInclusionsExclusionsProps {
  /** Items included in the tour price */
  included: string[];
  /** Items excluded from the tour price */
  excluded: string[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Inclusions & Exclusions Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourInclusionsExclusions({
  included,
  excluded,
  className = '',
}: TourInclusionsExclusionsProps) {
  if ((!included || included.length === 0) && (!excluded || excluded.length === 0)) {
    return null;
  }

  return (
    <section className={`lsx-tour-inclusions ${className}`} aria-label="What's included and excluded">
      {/* Included Column */}
      <div className="lsx-tour-inclusions__column">
        <div className="lsx-tour-inclusions__header">
          <CheckCircle size={22} weight="fill" className="lsx-tour-inclusions__header-icon--included" aria-hidden="true" />
          <h3 className="mb-0">What's Included</h3>
        </div>
        {included && included.length > 0 ? (
          <ul className="lsx-tour-inclusions__list">
            {included.map((item, index) => (
              <li key={index} className="lsx-tour-inclusions__item">
                <CheckCircle size={16} weight="fill" className="lsx-tour-inclusions__item-icon--included" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="lsx-tour-inclusions__empty">No inclusions specified</p>
        )}
      </div>

      {/* Excluded Column */}
      <div className="lsx-tour-inclusions__column">
        <div className="lsx-tour-inclusions__header">
          <XCircle size={22} weight="fill" className="lsx-tour-inclusions__header-icon--excluded" aria-hidden="true" />
          <h3 className="mb-0">What's Not Included</h3>
        </div>
        {excluded && excluded.length > 0 ? (
          <ul className="lsx-tour-inclusions__list">
            {excluded.map((item, index) => (
              <li key={index} className="lsx-tour-inclusions__item">
                <XCircle size={16} weight="fill" className="lsx-tour-inclusions__item-icon--excluded" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="lsx-tour-inclusions__empty">No exclusions specified</p>
        )}
      </div>
    </section>
  );
}

TourInclusionsExclusions.displayName = 'TourInclusionsExclusions';