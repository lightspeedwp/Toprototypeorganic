/**
 * Tours for Destination Block
 * 
 * Displays tours that visit the current destination.
 * Helps users discover available tours for their chosen location.
 * 
 * **WordPress Mapping:**
 * Block slug: lsx-tour-operator/tour-related-destination
 * Category: Tour Operator
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Lora for headings, Noto Sans for body text
 * - section-related-default style class
 * 
 * @module ToursForDestinationBlock
 * @category blocks/tour-operator
 * @see /guidelines/blocks/tour-related-destination.md
 */

import { Container } from "../../common/Container";
import { TourCard } from "../../patterns/TourCard";
import { ALL_TOURS as TOURS } from "../../../data/mockExpanded";
import type { Tour } from "../../../data/types";

/**
 * Props for the ToursForDestinationBlock component
 */
interface ToursForDestinationBlockProps {
  /** Heading text */
  title?: string;
  /** ID of the destination used for querying tours */
  destinationId: string;
  /** Number of tours to display */
  postsPerPage?: number;
  /** Additional CSS classes */
  className?: string;
  /** Navigation callback for card clicks */
  onNavigate?: (slug: string) => void;
}

/**
 * Get tours for a specific destination
 */
function getToursForDestination(
  destinationId: string,
  limit: number = 6
): Tour[] {
  // Filter tours that include this destination
  const tours = TOURS.filter(tour =>
    tour.destinations.includes(destinationId)
  );

  return tours.slice(0, limit);
}

/**
 * Tours for Destination Block Component
 * 
 * Displays a grid of tours that visit the specified destination.
 * 
 * @param {ToursForDestinationBlockProps} props - Component properties
 * @returns {JSX.Element} Rendered tours for destination block
 * 
 * @example
 * <ToursForDestinationBlock
 *   destinationId="dest-1"
 *   postsPerPage={6}
 *   onNavigate={(slug) => console.log(slug)}
 * />
 */
export function ToursForDestinationBlock({
  title = "Tours to This Destination",
  destinationId,
  postsPerPage = 6,
  className = "",
  onNavigate,
}: ToursForDestinationBlockProps) {
  const tours = getToursForDestination(destinationId, postsPerPage);

  // Don't render if no tours available
  if (tours.length === 0) {
    return null;
  }

  return (
    <section className={`section-related-default ${className}`}>
      <Container>
        {/* Section Header */}
        <div className="text-center pb-element-xl flex flex-col items-center">
          <h2>{title}</h2>
          <div className="pt-element-lg flex justify-center w-full">
            <div className="w-20 h-0.5 bg-[color:var(--color-border)]" />
          </div>
          <p className="pt-element-lg text-[color:var(--color-muted-foreground)]">
            {tours.length} {tours.length === 1 ? "tour" : "tours"} available
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-lg">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onClick={() => onNavigate?.(tour.slug)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}