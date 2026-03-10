/**
 * Columns Block Component
 * 
 * Layout container for arranging content side-by-side in columns.
 * Maps to WordPress core/columns block.
 * 
 * **WordPress Mapping:**
 * - Block: core/columns (container) + core/column (individual columns)
 * - Category: Design
 * - Supports: 1-6 columns, equal or variable widths, responsive stacking
 * 
 * **Design System:**
 * - Uses Flexbox for column layout
 * - Responsive stacking on mobile (flex-col md:flex-row)
 * - Consistent gaps via Tailwind gap utilities
 * - Does not impose typography on column content
 * 
 * **Usage:**
 * ```tsx
 * <Columns columns={2} gap="6">
 *   <Column>
 *     <h2>Left Column</h2>
 *     <p>Content...</p>
 *   </Column>
 *   <Column>
 *     <h2>Right Column</h2>
 *     <p>Content...</p>
 *   </Column>
 * </Columns>
 * ```
 * 
 * @module Columns
 * @category blocks/design
 * @see {@link /guidelines/blocks/design/columns.md} for full documentation
 */

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * Columns container props.
 */
export interface ColumnsProps {
  /** Number of columns (1-6) */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /** Gap between columns (Tailwind gap value) */
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  
  /** Stack columns on mobile */
  stackOnMobile?: boolean;
  
  /** Vertical alignment of columns */
  align?: 'start' | 'center' | 'end' | 'stretch';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Column components */
  children: React.ReactNode;
}

/**
 * Column props (individual column).
 */
export interface ColumnProps {
  /** Column width as percentage or flex value */
  width?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Column content */
  children: React.ReactNode;
}

/**
 * Columns container component.
 * 
 * Arranges child Column components side-by-side with equal or variable widths.
 * Automatically stacks on mobile for better readability.
 * 
 * @component
 * @category blocks/design
 * 
 * @example
 * // Two equal columns
 * <Columns columns={2} gap="6">
 *   <Column>
 *     <h3>Feature 1</h3>
 *     <p>Description...</p>
 *   </Column>
 *   <Column>
 *     <h3>Feature 2</h3>
 *     <p>Description...</p>
 *   </Column>
 * </Columns>
 * 
 * @example
 * // Three columns with large gap
 * <Columns columns={3} gap="8">
 *   <Column><Card /></Column>
 *   <Column><Card /></Column>
 *   <Column><Card /></Column>
 * </Columns>
 * 
 * @example
 * // Variable width columns (60/40)
 * <Columns gap="6">
 *   <Column width="60%">
 *     <article>Main content...</article>
 *   </Column>
 *   <Column width="40%">
 *     <aside>Sidebar...</aside>
 *   </Column>
 * </Columns>
 * 
 * @param {ColumnsProps} props - Component props
 * @returns {JSX.Element} Rendered columns container
 */
export function Columns({
  columns,
  gap = '6',
  stackOnMobile = true,
  align = 'stretch',
  className,
  children,
}: ColumnsProps) {
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

  // Align classes
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <div
      className={cn(
        'flex',
        // Responsive stacking
        stackOnMobile ? 'flex-col md:flex-row' : 'flex-row',
        // Gap
        gapClasses[gap],
        // Alignment
        alignClasses[align],
        // Custom classes
        className
      )}
    >
      {children}
    </div>
  );
}

Columns.displayName = 'Columns';

/**
 * Column component (individual column).
 * 
 * Child component of Columns. Represents a single column with optional
 * custom width.
 * 
 * @component
 * @category blocks/design
 * 
 * @example
 * // Equal width column (default)
 * <Column>
 *   <h3>Column Content</h3>
 * </Column>
 * 
 * @example
 * // Custom width column
 * <Column width="33.333%">
 *   <p>Narrower column</p>
 * </Column>
 * 
 * @param {ColumnProps} props - Component props
 * @returns {JSX.Element} Rendered column
 */
export function Column({ width, className, children }: ColumnProps) {
  return (
    <div
      className={cn('flex-1', className)}
      style={width ? { flexBasis: width, flexGrow: 0, flexShrink: 0 } : undefined}
    >
      {children}
    </div>
  );
}

Column.displayName = 'Column';
