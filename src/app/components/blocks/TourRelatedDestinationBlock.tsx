/**
 * Tour Related Destination Block
 * WordPress plugin custom block for showing destinations related to a tour
 */

import { Container } from '../common/Container';
import { SectionHeaderPattern } from '../patterns/SectionHeaderPattern';
import { DestinationCard } from '../patterns/DestinationCard';
import { CardGrid } from '../patterns/CardGrid';
import type { Destination } from '../../data/types';

interface TourRelatedDestinationBlockProps {
  destinations: Destination[];
  onSelect?: (destination: Destination) => void;
}

export function TourRelatedDestinationBlock({ 
  destinations,
  onSelect
}: TourRelatedDestinationBlockProps) {
  if (!destinations || destinations.length === 0) {
    return null; // Hide if no destinations
  }

  return (
    <section className="wp-block-tour-related-destination py-section-md">
      <Container>
        <SectionHeaderPattern 
          title="Featured Stops" 
          description="Explore the breathtaking landscapes and vibrant cultures included in this itinerary."
          centered
        />
        
        <CardGrid columns={3}>
          {destinations.map(dest => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onClick={() => onSelect?.(dest)}
            />
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}

export default TourRelatedDestinationBlock;
