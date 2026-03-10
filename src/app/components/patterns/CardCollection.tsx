/**
 * CardCollection Pattern Component
 * 
 * Responsive grid layout for displaying collections of cards using the Grid block.
 * Supports multiple layout variations and responsive column configurations.
 * 
 * **Design System:**
 * - Uses Grid block with responsive columns
 * - Consistent gap spacing via design system
 * - Mobile-first responsive approach
 * - Empty state handling
 * 
 * **Usage:**
 * ```tsx
 * <CardCollection
 *   items={tours}
 *   columns={{ mobile: 1, tablet: 2, desktop: 3 }}
 *   renderCard={(tour) => <TourCard tour={tour} />}
 * />
 * ```
 * 
 * @module CardCollection
 * @category patterns
 */

import React from 'react';
import { Grid } from '../blocks/design';

/**
 * Card collection props.
 */
export interface CardCollectionProps<T> {
  /** Items to display */
  items: T[];
  
  /** Responsive column configuration */
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3 | 4;
    desktop?: 3 | 4 | 5 | 6;
  };
  
  /** Fixed number of columns (overrides responsive config) */
  fixedColumns?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /** Gap between cards */
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  
  /** Render function for each card */
  renderCard: (item: T, index: number) => React.ReactNode;
  
  /** Empty state message */
  emptyMessage?: string;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * CardCollection pattern component.
 * 
 * Displays a collection of items in a responsive grid layout.
 * Handles empty states and provides flexible column configurations.
 * 
 * @component
 * @category patterns
 * 
 * @example
 * // Tour cards with responsive columns
 * <CardCollection
 *   items={tours}
 *   columns={{ mobile: 1, tablet: 2, desktop: 3 }}
 *   gap="6"
 *   renderCard={(tour) => (
 *     <TourCard
 *       key={tour.id}
 *       title={tour.title}
 *       image={tour.image}
 *       price={tour.price}
 *     />
 *   )}
 *   emptyMessage="No tours found"
 * />
 * 
 * @example
 * // Fixed 4-column grid
 * <CardCollection
 *   items={products}
 *   fixedColumns={4}
 *   gap="4"
 *   renderCard={(product) => <ProductCard product={product} />}
 * />
 * 
 * @param {CardCollectionProps<T>} props - Component props
 * @returns {JSX.Element} Rendered card collection
 */
export function CardCollection<T>({
  items,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  fixedColumns,
  gap = '6',
  renderCard,
  emptyMessage = 'No items found',
  className,
}: CardCollectionProps<T>) {
  // Handle empty state
  if (items.length === 0) {
    return (
      <div className="py-section-sm text-center">
        <p
          className="text-muted-foreground text-fluid-lg"
        >
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <Grid
      columns={fixedColumns}
      responsive={fixedColumns ? undefined : columns}
      gap={gap}
      className={className}
    >
      {items.map((item, index) => (
        <div key={index}>
          {renderCard(item, index)}
        </div>
      ))}
    </Grid>
  );
}

CardCollection.displayName = 'CardCollection';