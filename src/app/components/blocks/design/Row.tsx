/**
 * Row Block Component
 * 
 * Horizontal layout container that arranges child blocks in a single row.
 * Maps to WordPress core/row block.
 * 
 * **WordPress Mapping:**
 * - Block: core/row
 * - Category: Design
 * - Supports: Horizontal alignment, vertical alignment, wrapping
 * 
 * **Design System:**
 * - Uses Flexbox with flex-direction: row
 * - Consistent horizontal spacing via Tailwind gap utilities
 * - Supports wrapping and responsive behavior
 * - Does not impose typography on children
 * 
 * **Usage:**
 * ```tsx
 * <Row gap="4" justify="center" align="center">
 *   <Button variant="primary">Sign Up</Button>
 *   <Button variant="secondary">Learn More</Button>
 * </Row>
 * ```
 * 
 * @module Row
 * @category blocks/design
 * @see {@link /guidelines/blocks/design/row.md} for full documentation
 */

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * Row component props.
 */
export interface RowProps {
  /** Gap between row items (Tailwind gap value) */
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  
  /** Horizontal justification of items */
  justify?: 'start' | 'center' | 'between' | 'around' | 'evenly' | 'end';
  
  /** Vertical alignment of items */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  
  /** Allow items to wrap to next line */
  wrap?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Row items */
  children: React.ReactNode;
}

/**
 * Row container component.
 * 
 * Horizontally arranges child blocks with consistent spacing. Ideal for
 * navigation, button groups, and icon lists.
 * 
 * @component
 * @category blocks/design
 * 
 * @example
 * // Simple horizontal row
 * <Row gap="4" justify="start">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </Row>
 * 
 * @example
 * // Centered button group
 * <Row gap="3" justify="center" align="center">
 *   <Button variant="primary">Get Started</Button>
 *   <Button variant="secondary">Learn More</Button>
 * </Row>
 * 
 * @example
 * // Navigation with space-between
 * <Row gap="0" justify="between" align="center">
 *   <Logo />
 *   <nav>
 *     <Row gap="6">
 *       <a href="/about">About</a>
 *       <a href="/tours">Tours</a>
 *       <a href="/contact">Contact</a>
 *     </Row>
 *   </nav>
 * </Row>
 * 
 * @param {RowProps} props - Component props
 * @returns {JSX.Element} Rendered row container
 */
export function Row({
  gap = '4',
  justify = 'start',
  align = 'center',
  wrap = false,
  className,
  children,
}: RowProps) {
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

  // Justify classes
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
    end: 'justify-end',
  };

  // Align classes
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  return (
    <div
      className={cn(
        'flex flex-row',
        gapClasses[gap],
        justifyClasses[justify],
        alignClasses[align],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </div>
  );
}

Row.displayName = 'Row';
