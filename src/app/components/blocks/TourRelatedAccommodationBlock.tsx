/**
 * Tour Related Accommodation Block
 * WordPress plugin custom block for showing accommodations related to a tour
 */

import { Container } from '../common/Container';
import { SectionHeaderPattern } from '../patterns/SectionHeaderPattern';
import { AccommodationCard } from '../patterns/AccommodationCard';
import { CardGrid } from '../patterns/CardGrid';
import { EmptyStatePattern } from '../patterns/EmptyStatePattern';
import type { Accommodation } from '../../data/types';

interface TourRelatedAccommodationBlockProps {
  accommodations: Accommodation[];
  onSelect?: (accommodation: Accommodation) => void;
}

export function TourRelatedAccommodationBlock({ 
  accommodations,
  onSelect
}: TourRelatedAccommodationBlockProps) {
  if (!accommodations || accommodations.length === 0) {
    return (
      <section className="wp-block-tour-related-accommodation py-section-md bg-muted/20 border-y border-border/50">
        <Container>
          <SectionHeaderPattern 
            title="Accommodation" 
            description="Your home away from home."
            centered
          />
          <EmptyStatePattern
            icon="empty"
            title="Accommodation details coming soon"
            message="We are currently finalizing the hand-picked lodges for this specific itinerary."
          />
        </Container>
      </section>
    );
  }

  return (
    <section className="wp-block-tour-related-accommodation py-section-md bg-muted/20 border-y border-border/50">
      <Container>
        <SectionHeaderPattern 
          title="Where You'll Stay" 
          description="Hand-picked boutique lodges and luxury camps selected for their unique character and prime locations."
          centered
        />
        
        <CardGrid columns={2}>
          {accommodations.map(acc => (
            <AccommodationCard 
              key={acc.id} 
              accommodation={acc}
              layout="horizontal"
              onClick={() => onSelect?.(acc)}
            />
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}

export default TourRelatedAccommodationBlock;
