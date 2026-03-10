/**
 * Stack Block Component
 * 
 * Vertical layout container that stacks child blocks with consistent spacing.
 * Maps to WordPress core/stack block.
 * 
 * **WordPress Mapping:**
 * - Block: core/stack
 * - Category: Design
 * - Supports: Vertical alignment, consistent gaps, flex layout
 * 
 * **Design System:**
 * - Uses Flexbox with flex-direction: column
 * - Consistent vertical spacing via Tailwind gap utilities
 * - Supports alignment and justification
 * - Does not impose typography on children
 * 
 * **Usage:**
 * ```tsx
 * <Stack gap="6" align="start">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Stack>
 * ```
 * 
 * @module Stack
 * @category blocks/design
 * @see {@link /guidelines/blocks/design/stack.md} for full documentation
 */

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * Stack component props.
 */
export interface StackProps {
  /** Gap between stacked items (Tailwind gap value) */
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  
  /** Vertical justification of items */
  justify?: 'start' | 'center' | 'between' | 'around' | 'evenly' | 'end';
  
  /** Horizontal alignment of items */
  align?: 'start' | 'center' | 'end' | 'stretch';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Stacked items */
  children: React.ReactNode;
}

/**
 * Stack container component.
 * 
 * Vertically stacks child blocks with consistent spacing. Ideal for
 * forms, feature lists, and vertical card layouts.
 * 
 * @component
 * @category blocks/design
 * 
 * @example
 * // Simple vertical stack
 * <Stack gap="4">
 *   <Card title="Feature 1" />
 *   <Card title="Feature 2" />
 *   <Card title="Feature 3" />
 * </Stack>
 * 
 * @example
 * // Centered stack with large gap
 * <Stack gap="8" align="center" justify="center">
 *   <h2>Benefits</h2>
 *   <p>Benefit description...</p>
 *   <Button>Learn More</Button>
 * </Stack>
 * 
 * @example
 * // Form fields stack
 * <Stack gap="4" align="stretch">
 *   <Input label="Name" />
 *   <Input label="Email" />
 *   <Button>Submit</Button>
 * </Stack>
 * 
 * @param {StackProps} props - Component props
 * @returns {JSX.Element} Rendered stack container
 */
export function Stack({
  gap = '4',
  justify = 'start',
  align = 'stretch',
  className,
  children,
}: StackProps) {
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
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        gapClasses[gap],
        justifyClasses[justify],
        alignClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
}

Stack.displayName = 'Stack';
