/**
 * Related Accommodations Block
 * 
 * Displays accommodation options related to the current accommodation.
 * Shows properties in the same destination or of the same type.
 * 
 * **WordPress Mapping:**
 * Block slug: lsx-tour-operator/accommodation-related-accommodation
 * Category: Tour Operator
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Lora for headings, Noto Sans for body text
 * - section-related-default style class
 * 
 * @module RelatedAccommodationsBlock
 * @category blocks/tour-operator
 * @see /guidelines/blocks/accommodation-related-accommodation.md
 */

import { Container } from "../../common/Container";
import { AccommodationCard } from "../../patterns/AccommodationCard";
import { ALL_ACCOMMODATION as ACCOMMODATION } from "../../../data/mockExpanded";
import type { Accommodation } from "../../../data/types";

/**
 * Props for the RelatedAccommodationsBlock component
 */
interface RelatedAccommodationsBlockProps {
  /** Heading text */
  title?: string;
  /** Number of accommodations to display */
  postsPerPage?: number;
  /** ID of current accommodation to exclude from results */
  currentAccommodationId: string;
  /** Optional destination ID for filtering */
  destinationId?: string;
  /** Additional CSS classes */
  className?: string;
  /** Navigation callback for card clicks */
  onNavigate?: (slug: string) => void;
}

/**
 * Get related accommodations based on shared destination or type
 */
function getRelatedAccommodations(
  currentId: string,
  destinationId?: string,
  limit: number = 3
): Accommodation[] {
  const current = ACCOMMODATION.find(acc => acc.id === currentId);
  if (!current) return [];

  // Filter accommodations
  let related = ACCOMMODATION.filter(acc => {
    // Exclude current accommodation
    if (acc.id === currentId) return false;

    // If destination specified, filter by destination
    if (destinationId && acc.destinationId === destinationId) return true;

    // Otherwise, filter by same type or same destination as current
    return (
      acc.accommodationType === current.accommodationType ||
      acc.destinationId === current.destinationId
    );
  });

  // Limit results
  return related.slice(0, limit);
}

/**
 * Related Accommodations Block Component
 * 
 * Displays a grid of related accommodation properties.
 * 
 * @param {RelatedAccommodationsBlockProps} props - Component properties
 * @returns {JSX.Element} Rendered related accommodations block
 * 
 * @example
 * <RelatedAccommodationsBlock
 *   currentAccommodationId="acc-1"
 *   postsPerPage={3}
 *   onNavigate={(slug) => console.log(slug)}
 * />
 */
export function RelatedAccommodationsBlock({
  title = "Related Accommodations",
  postsPerPage = 3,
  currentAccommodationId,
  destinationId,
  className = "",
  onNavigate,
}: RelatedAccommodationsBlockProps) {
  const relatedAccommodations = getRelatedAccommodations(
    currentAccommodationId,
    destinationId,
    postsPerPage
  );

  // Don't render if no related accommodations
  if (relatedAccommodations.length === 0) {
    return null;
  }

  return (
    <section className={`section-related-default ${className}`}>
      <Container>
        {/* Section Header */}
        <div className="text-center pb-element-xl flex flex-col items-center">
          <h2>{title}</h2>
          <div className="pt-element-lg w-full flex justify-center">
            <div className="w-20 h-0.5 bg-[color:var(--color-border)]" />
          </div>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-lg">
          {relatedAccommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
              onClick={() => onNavigate?.(accommodation.slug)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}