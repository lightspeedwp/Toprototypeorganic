/**
 * Tour Quick Facts Block Component
 * 
 * Sidebar widget displaying key tour metadata: price, duration,
 * group size, difficulty, departures, and destinations.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/quick-facts
 * - Category: Tour Operator
 * - Used in single tour sidebar
 * 
 * @module TourQuickFacts
 * @category blocks/tour-operator
 */

import './TourQuickFacts.css';
import { isValidElement, type ReactNode, type ComponentType } from 'react';

/** A single fact entry. */
export interface QuickFact {
  icon: ReactNode | ComponentType<any>;
  label: string;
  value: string;
}

export interface TourQuickFactsProps {
  /** Tour price string */
  price?: string;
  /** Array of quick fact items */
  facts: QuickFact[];
  /** CTA button label */
  ctaLabel?: string;
  /** CTA button click handler */
  onCtaClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Quick Facts Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourQuickFacts({
  price,
  facts,
  ctaLabel = 'Book This Tour',
  onCtaClick,
  className = '',
}: TourQuickFactsProps) {
  return (
    <aside className={`lsx-tour-quick-facts ${className}`} aria-label="Tour quick facts">
      {/* Price Header */}
      {price && (
        <div className="lsx-tour-quick-facts__header">
          <div className="lsx-tour-quick-facts__price">{price}</div>
          <div className="lsx-tour-quick-facts__price-label">per person</div>
        </div>
      )}

      {/* Facts List */}
      <div className="lsx-tour-quick-facts__list">
        {facts.map((fact, index) => {
          // Handle both JSX elements and component references
          const renderIcon = () => {
            if (isValidElement(fact.icon)) return fact.icon;
            if (typeof fact.icon === 'function') {
              const IconComponent = fact.icon as ComponentType<any>;
              return <IconComponent size={18} aria-hidden="true" />;
            }
            return null;
          };

          return (
            <div key={index} className="lsx-tour-quick-facts__item">
              <div className="lsx-tour-quick-facts__item-icon">
                {renderIcon()}
              </div>
              <div className="lsx-tour-quick-facts__item-content">
                <div className="lsx-tour-quick-facts__item-label">{fact.label}</div>
                <div className="lsx-tour-quick-facts__item-value">{fact.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      {onCtaClick && (
        <div className="lsx-tour-quick-facts__cta">
          <button
            className="lsx-tour-quick-facts__cta-button"
            onClick={onCtaClick}
            type="button"
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </aside>
  );
}

TourQuickFacts.displayName = 'TourQuickFacts';