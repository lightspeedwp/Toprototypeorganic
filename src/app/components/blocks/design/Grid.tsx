/**
 * Grid Block Component
 * 
 * Flexible container for organizing blocks into a CSS Grid layout with
 * automatic or manual column counts. Maps to WordPress core/grid block.
 * 
 * **WordPress Mapping:**
 * - Block: core/grid
 * - Category: Design
 * - Supports: Auto-fill columns, manual column count, responsive gaps
 * 
 * **Design System:**
 * - Uses CSS Grid with auto-fill or fixed columns
 * - Responsive column counts via Tailwind
 * - Consistent gaps via Tailwind gap utilities
 * - Does not impose typography on grid items
 * 
 * **Usage:**
 * ```tsx
 * <Grid columns={3} gap="6">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 * ```
 * 
 * @module Grid
 * @category blocks/design
 * @see {@link /guidelines/blocks/design/grid.md} for full documentation
 */

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * Grid component props.
 */
export interface GridProps {
  /** Fixed number of columns (1-12), if undefined uses responsive auto-fill */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  /** Responsive column configuration (mobile, tablet, desktop) */
  responsive?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3 | 4;
    desktop?: 3 | 4 | 5 | 6;
  };
  
  /** Gap between grid items (Tailwind gap value) */
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  
  /** Minimum width for auto-fill mode (CSS value) */
  minWidth?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Grid items */
  children: React.ReactNode;
}

/**
 * Grid container component.
 * 
 * Arranges child items in a responsive grid layout. Supports both
 * fixed column counts and auto-fill based on minimum width.
 * 
 * @component
 * @category blocks/design
 * 
 * @example
 * // Fixed 3-column grid
 * <Grid columns={3} gap="6">
 *   <TourCard />
 *   <TourCard />
 *   <TourCard />
 * </Grid>
 * 
 * @example
 * // Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
 * <Grid responsive={{ mobile: 1, tablet: 2, desktop: 3 }} gap="6">
 *   <ProductCard />
 *   <ProductCard />
 *   <ProductCard />
 * </Grid>
 * 
 * @example
 * // Auto-fill grid with minimum width
 * <Grid minWidth="300px" gap="4">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 * 
 * @param {GridProps} props - Component props
 * @returns {JSX.Element} Rendered grid container
 */
export function Grid({
  columns,
  responsive,
  gap = '6',
  minWidth,
  className,
  children,
}: GridProps) {
  // Column classes for fixed column layouts
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  };

  // Gap classes
  const gapClasses = {
    '1': 'gap-1',
    '2': 'gap-2',
    '3': 'gap-3',
    '4': 'gap-4',
    '5': 'gap-5',
    '6': 'gap-6',
    '8': 'gap-8',
    '10': 'gap-10',
    '12': 'gap-12',
  };

  return (
    <div
      className={cn(
        'grid',
        // Fixed columns
        columns && columnClasses[columns],
        // Responsive columns
        responsive && [
          responsive.mobile === 1 && 'grid-cols-1',
          responsive.mobile === 2 && 'grid-cols-2',
          responsive.tablet === 2 && 'md:grid-cols-2',
          responsive.tablet === 3 && 'md:grid-cols-3',
          responsive.tablet === 4 && 'md:grid-cols-4',
          responsive.desktop === 3 && 'lg:grid-cols-3',
          responsive.desktop === 4 && 'lg:grid-cols-4',
          responsive.desktop === 5 && 'lg:grid-cols-5',
          responsive.desktop === 6 && 'lg:grid-cols-6',
        ],
        // Gap
        gapClasses[gap],
        // Custom classes
        className
      )}
      style={
        minWidth
          ? {
              gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

Grid.displayName = 'Grid';
