/**
 * Destination Related Accommodation Block
 * WordPress equivalent: Custom block for displaying accommodation related to a destination
 * 
 * Shows accommodations available in this destination
 */

import { Container } from '../common/Container';
import { SectionHeaderPattern } from '../patterns/SectionHeaderPattern';
import { AccommodationCard } from '../patterns/AccommodationCard';
import { CardGrid } from '../patterns/CardGrid';
import { Bed } from '@phosphor-icons/react';
import type { Accommodation } from '../../data/types';

interface DestinationRelatedAccommodationBlockProps {
  accommodations: Accommodation[];
  onSelect?: (accommodation: Accommodation) => void;
  onViewAll?: () => void;
}

export function DestinationRelatedAccommodationBlock({ 
  accommodations,
  onSelect,
  onViewAll
}: DestinationRelatedAccommodationBlockProps) {
  if (!accommodations || accommodations.length === 0) {
    return null;
  }

  return (
    <section className="wp-block-destination-related-accommodation py-section-md border-t border-border/50">
      <Container>
        <SectionHeaderPattern
          title="Boutique Stays & Lodges"
          description="Handpicked accommodations perfectly positioned for exploring this destination."
          centered
        />

        {/* Accommodations Grid */}
        <CardGrid columns={3}>
          {accommodations.map(accommodation => (
            <AccommodationCard 
              key={accommodation.id} 
              accommodation={accommodation}
              onClick={() => onSelect?.(accommodation)}
            />
          ))}
        </CardGrid>

        {/* View All Link */}
        {onViewAll && (
          <div className="mt-12 text-center">
            <button 
              onClick={onViewAll}
              className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
            >
              <Bed className="w-4 h-4" aria-hidden="true" />
              View all accommodation in this region
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default DestinationRelatedAccommodationBlock;
