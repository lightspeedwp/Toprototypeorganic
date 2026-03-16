/**
 * Related Tours Block
 * 
 * Displays tours similar to the current tour.
 * Helps users discover alternative or complementary tours.
 * 
 * **WordPress Mapping:**
 * Block slug: lsx-tour-operator/tour-related-tour
 * Category: Tour Operator
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Lora for headings, Noto Sans for body text
 * - section-related-default style class
 * 
 * @module RelatedToursBlock
 * @category blocks/tour-operator
 * @see /guidelines/blocks/tour-related-tour.md
 */

import { Container } from "../../common/Container";
import { TourCard } from "../../patterns/TourCard";
import { ALL_TOURS as TOURS } from "../../../data/mockExpanded";
import type { Tour } from "../../../data/types";

/**
 * Props for the RelatedToursBlock component
 */
interface RelatedToursBlockProps {
  /** Heading text */
  title?: string;
  /** Number of tours to display */
  postsPerPage?: number;
  /** ID of current tour to exclude from results */
  currentTourId: string;
  /** Travel style IDs for filtering similar tours */
  travelStyles?: string[];
  /** Destination IDs for filtering similar tours */
  destinations?: string[];
  /** Additional CSS classes */
  className?: string;
  /** Navigation callback for card clicks */
  onNavigate?: (slug: string) => void;
}

/**
 * Calculate similarity score between two tours
 */
function calculateSimilarity(
  tour: Tour,
  travelStyles: string[],
  destinations: string[]
): number {
  let score = 0;

  // Count matching travel styles
  const matchingStyles = tour.travelStyles.filter(style =>
    travelStyles.includes(style)
  ).length;
  score += matchingStyles * 2; // Weight travel styles higher

  // Count matching destinations
  const matchingDestinations = tour.destinations.filter(dest =>
    destinations.includes(dest)
  ).length;
  score += matchingDestinations;

  return score;
}

/**
 * Get related tours based on shared attributes
 */
function getRelatedTours(
  currentId: string,
  travelStyles: string[] = [],
  destinations: string[] = [],
  limit: number = 3
): Tour[] {
  // Filter and score tours
  const scoredTours = TOURS
    .filter(tour => tour.id !== currentId) // Exclude current tour
    .map(tour => ({
      tour,
      score: calculateSimilarity(tour, travelStyles, destinations),
    }))
    .filter(({ score }) => score > 0) // Only include tours with some similarity
    .sort((a, b) => b.score - a.score); // Sort by similarity score

  return scoredTours.slice(0, limit).map(({ tour }) => tour);
}

/**
 * Related Tours Block Component
 * 
 * Displays a grid of tours similar to the current tour.
 * 
 * @param {RelatedToursBlockProps} props - Component properties
 * @returns {JSX.Element} Rendered related tours block
 * 
 * @example
 * <RelatedToursBlock
 *   currentTourId="tour-1"
 *   travelStyles={["adventure", "wildlife"]}
 *   destinations={["dest-1", "dest-2"]}
 *   postsPerPage={3}
 *   onNavigate={(slug) => console.log(slug)}
 * />
 */
export function RelatedToursBlock({
  title = "You May Also Like",
  postsPerPage = 3,
  currentTourId,
  travelStyles = [],
  destinations = [],
  className = "",
  onNavigate,
}: RelatedToursBlockProps) {
  const relatedTours = getRelatedTours(
    currentTourId,
    travelStyles,
    destinations,
    postsPerPage
  );

  // Don't render if no related tours
  if (relatedTours.length === 0) {
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
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-lg">
          {relatedTours.map((tour) => (
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