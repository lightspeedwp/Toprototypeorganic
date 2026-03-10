/**
 * Tour Related Section Block Component
 * 
 * Generic section wrapper for displaying related content cards
 * (destinations, accommodations, tours, reviews). Provides
 * consistent heading and grid layout.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/related-section
 * - Category: Tour Operator
 * - Used on single tour/destination/accommodation pages
 * 
 * @module TourRelatedSection
 * @category blocks/tour-operator
 */

import './TourRelatedSection.css';
import { Container } from '../../common/Container';

export interface TourRelatedSectionProps {
  /** Section title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Whether to use the alternate (muted) background */
  alt?: boolean;
  /** Card components to render in the grid */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Related Section Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourRelatedSection({
  title,
  subtitle,
  alt = false,
  children,
  className = '',
}: TourRelatedSectionProps) {
  return (
    <section
      className={`lsx-tour-related-section ${alt ? 'lsx-tour-related-section--alt' : ''} ${className}`}
      aria-label={title}
    >
      <Container>
        <div className="lsx-tour-related-section__header">
          <h2>{title}</h2>
          {subtitle && (
            <p className="lsx-tour-related-section__subtitle">{subtitle}</p>
          )}
        </div>
        <div className="lsx-tour-related-section__grid">
          {children}
        </div>
      </Container>
    </section>
  );
}

TourRelatedSection.displayName = 'TourRelatedSection';
