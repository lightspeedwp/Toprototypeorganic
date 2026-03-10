/**
 * Destinations section for the homepage.
 *
 * This section showcases featured destinations on the front page,
 * with links to view all destinations. Refactored to use FeaturedSection wrapper.
 *
 * **WordPress CSS:**
 * Uses BEM classes for consistent styling:
 * - .wp-template-home__destinations
 * - .wp-template-home__destinations-grid
 *
 * @module DestinationsSection
 * @category components/patterns/homepage
 */

import { FeaturedSection } from "../FeaturedSection";
import { DestinationCard } from "../DestinationCard";
import { MapPin } from "@phosphor-icons/react";
import type { Destination } from "../../../data/types";

/**
 * Props for the DestinationsSection component.
 */
interface DestinationsSectionProps {
  /** Array of destination objects to display. */
  destinations: Destination[];
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
 * DestinationsSection Component.
 */
export function DestinationsSection({ destinations, section, onNavigate }: DestinationsSectionProps) {
  return (
    <FeaturedSection
      className="wp-template-home__destinations"
      header={{
        eyebrow: section.eyebrow,
        title: section.title,
        description: section.description,
        icon: MapPin,
        prefix: "wp-template-home__section",
      }}
      items={destinations}
      gridClassName="wp-featured-section__grid--cols-4"
      renderCard={(destination) => (
        <DestinationCard
          destination={destination}
          onClick={() => onNavigate("/destinations/" + destination.slug)}
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

export default DestinationsSection;
