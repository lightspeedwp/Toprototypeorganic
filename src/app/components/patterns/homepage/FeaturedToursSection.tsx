/**
 * Featured Tours section for the homepage.
 *
 * This section showcases a curated list of tours on the front page,
 * with links to view all tours. Refactored to use FeaturedSection wrapper.
 *
 * **WordPress CSS:**
 * Uses BEM classes for consistent styling:
 * - .wp-template-home__tours
 * - .wp-template-home__tours-grid
 *
 * @module FeaturedToursSection
 * @category components/patterns/homepage
 */

import { FeaturedSection } from "../FeaturedSection";
import { TourCard } from "../TourCard";
import { Compass } from "@phosphor-icons/react";
import type { Tour } from "../../../data/types";

/**
 * Props for the FeaturedToursSection component.
 */
interface FeaturedToursSectionProps {
  /** Array of tour objects to display. */
  tours: Tour[];
  /** Section header data (eyebrow, title, description). */
  section: {
    eyebrow?: string;
    title: string;
    description: string;
    viewAllLabel?: string;
    viewAllHref?: string;
  };
  /** Callback for navigation. */
  onNavigate: (path: string) => void;
}

/**
 * FeaturedToursSection Component.
 */
export function FeaturedToursSection({ tours, section, onNavigate }: FeaturedToursSectionProps) {
  return (
    <FeaturedSection
      className="wp-template-home__tours"
      header={{
        eyebrow: section.eyebrow,
        title: section.title,
        description: section.description,
        icon: Compass,
        prefix: "wp-template-home__section",
      }}
      items={tours}
      gridClassName="wp-featured-section__grid--cols-3"
      renderCard={(tour) => (
        <TourCard
          tour={tour}
          onClick={() => onNavigate("/tours/" + tour.slug)}
        />
      )}
      viewAll={
        section.viewAllLabel && section.viewAllHref
          ? {
              label: section.viewAllLabel,
              onClick: () => onNavigate(section.viewAllHref!),
              variant: "primary",
            }
          : undefined
      }
    />
  );
}

export default FeaturedToursSection;
