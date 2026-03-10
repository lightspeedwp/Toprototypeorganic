/**
 * Accommodation section for the homepage.
 *
 * This section showcases featured properties on the front page,
 * with links to view all accommodation. Refactored to use FeaturedSection wrapper.
 *
 * **WordPress CSS:**
 * Uses BEM classes for consistent styling:
 * - .wp-template-home__accommodation
 * - .wp-template-home__accommodation-grid
 *
 * @module AccommodationSection
 * @category components/patterns/homepage
 */

import { FeaturedSection } from "../FeaturedSection";
import { AccommodationCard } from "../AccommodationCard";
import { Buildings as Hotel } from "@phosphor-icons/react";
import type { Accommodation } from "../../../data/types";

/**
 * Props for the AccommodationSection component.
 */
interface AccommodationSectionProps {
  /** Array of accommodation objects to display. */
  accommodation: Accommodation[];
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
 * AccommodationSection Component.
 */
export function AccommodationSection({ accommodation, section, onNavigate }: AccommodationSectionProps) {
  return (
    <FeaturedSection
      className="wp-template-home__accommodation"
      header={{
        eyebrow: section.eyebrow,
        title: section.title,
        description: section.description,
        icon: Hotel,
        prefix: "wp-template-home__section",
      }}
      items={accommodation}
      gridClassName="wp-featured-section__grid--cols-3"
      renderCard={(property) => (
        <AccommodationCard
          accommodation={property}
          onClick={() => onNavigate("/accommodation/" + property.slug)}
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

export default AccommodationSection;
