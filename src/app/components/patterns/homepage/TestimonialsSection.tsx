/**
 * Testimonials section for the homepage.
 *
 * This section showcases customer reviews and testimonials.
 * Refactored to use FeaturedSection wrapper.
 *
 * **WordPress CSS:**
 * Uses BEM classes for consistent styling:
 * - .wp-template-home__testimonials
 * - .wp-template-home__testimonials-grid
 *
 * @module TestimonialsSection
 * @category components/patterns/homepage
 */

import { FeaturedSection } from "../FeaturedSection";
import { ReviewCard } from "../ReviewCard";
import type { Review } from "../../../data/types";

/**
 * Props for the TestimonialsSection component.
 */
interface TestimonialsSectionProps {
  /** Array of review objects to display. */
  reviews: Review[];
  /** Section header data (title, description). */
  section: {
    title: string;
    description: string;
    viewAllLabel?: string;
    viewAllHref?: string;
  };
  /** Callback for navigation. */
  onNavigate: (path: string) => void;
}

/**
 * TestimonialsSection Component.
 */
export function TestimonialsSection({ reviews, section, onNavigate }: TestimonialsSectionProps) {
  return (
    <FeaturedSection
      className="wp-template-home__testimonials"
      header={{
        title: section.title,
        description: section.description,
        prefix: "wp-template-home__section",
      }}
      items={reviews}
      gridClassName="wp-featured-section__grid--cols-3"
      renderCard={(review) => (
        <ReviewCard
          review={review}
          onClick={() => onNavigate("/reviews/" + review.slug)}
        />
      )}
      viewAll={
        section.viewAllLabel && section.viewAllHref
          ? {
              label: section.viewAllLabel,
              onClick: () => onNavigate(section.viewAllHref!),
              variant: "outline",
            }
          : undefined
      }
    />
  );
}

export default TestimonialsSection;