/**
 * Destination Related Tours Block
 * WordPress equivalent: Custom block for displaying tours related to a destination
 * 
 * Shows tours that visit this destination
 */

import { TourCard } from '../patterns/TourCard';
import { CardGrid } from '../patterns/CardGrid';
import { SectionHeaderPattern } from '../patterns/SectionHeaderPattern';
import { Container } from '../common/Container';
import { Compass } from '@phosphor-icons/react';
import type { Tour } from '../../data/types';

interface DestinationRelatedToursBlockProps {
  tours: Tour[];
  onSelect?: (tour: Tour) => void;
  onViewAll?: () => void;
}

export function DestinationRelatedToursBlock({ 
  tours, 
  onSelect,
  onViewAll
}: DestinationRelatedToursBlockProps) {
  if (!tours || tours.length === 0) {
    return null;
  }

  return (
    <section className="wp-block-destination-related-tours py-section-md bg-muted/20 border-y border-border/50">
      <Container>
        <SectionHeaderPattern
          title="Recommended Safari Tours"
          description="Explore our curated itineraries that showcase the absolute best of this destination."
          centered
        />

        {/* Tours Grid */}
        <CardGrid columns={3}>
          {tours.map(tour => (
            <TourCard 
              key={tour.id} 
              tour={tour}
              onClick={() => onSelect?.(tour)}
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
              <Compass className="w-4 h-4" aria-hidden="true" />
              View all safaris to this region
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default DestinationRelatedToursBlock;
