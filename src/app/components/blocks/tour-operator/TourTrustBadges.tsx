/**
 * Tour Trust Badges Block Component
 * 
 * Sidebar credibility widget displaying trust indicators
 * such as awards, ratings, and service guarantees.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/trust-badges
 * - Category: Tour Operator
 * - Used in single tour/accommodation sidebar
 * 
 * @module TourTrustBadges
 * @category blocks/tour-operator
 */

import './TourTrustBadges.css';
import { Shield } from '@phosphor-icons/react';
import { isValidElement, type ReactNode, type ComponentType } from 'react';

/** A single trust badge entry. */
export interface TrustBadge {
  icon: ReactNode | ComponentType<any>;
  text: string;
}

export interface TourTrustBadgesProps {
  /** Section title */
  title?: string;
  /** Array of trust badge items */
  badges: TrustBadge[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Trust Badges Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourTrustBadges({
  title = 'Why Book With Us',
  badges,
  className = '',
}: TourTrustBadgesProps) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className={`lsx-tour-trust-badges ${className}`} role="complementary" aria-label={title}>
      <div className="lsx-tour-trust-badges__header">
        <Shield size={20} className="lsx-tour-trust-badges__header-icon" aria-hidden="true" />
        <h4 className="mb-0">{title}</h4>
      </div>
      <ul className="lsx-tour-trust-badges__list">
        {badges.map((badge, index) => {
          // Handle both JSX elements and component references
          const renderIcon = () => {
            if (isValidElement(badge.icon)) return badge.icon;
            if (typeof badge.icon === 'function') {
              const IconComponent = badge.icon as ComponentType<any>;
              return <IconComponent size={16} className="lsx-tour-trust-badges__item-icon" aria-hidden="true" />;
            }
            return null;
          };

          return (
            <li key={index} className="lsx-tour-trust-badges__item">
              {renderIcon()}
              <span>{badge.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

TourTrustBadges.displayName = 'TourTrustBadges';