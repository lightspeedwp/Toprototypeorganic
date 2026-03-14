/**
 * Buttons Block Component
 * 
 * Container component for grouping multiple Button blocks together with
 * consistent spacing and alignment. Maps to WordPress core/buttons block.
 * 
 * **WordPress Mapping:**
 * - Block: core/buttons
 * - Category: Design
 * - Supports: Orientation (horizontal/vertical), alignment, spacing
 * 
 * **Design System:**
 * - Uses Tailwind gap utilities for spacing
 * - Supports horizontal and vertical orientations
 * - Provides alignment options (start, center, end)
 * - Fully responsive with mobile considerations
 * 
 * **Usage:**
 * ```tsx
 * <Buttons orientation="horizontal" gap="4" align="center">
 *   <Button variant="primary">Get Started</Button>
 *   <Button variant="secondary">Learn More</Button>
 * </Buttons>
 * ```
 * 
 * @module Buttons
 * @category blocks/design
 * @see {@link /guidelines/blocks/design/buttons.md} for full documentation
 */

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * Buttons component props.
 */
export interface ButtonsProps {
  /** Layout orientation: horizontal or vertical */
  orientation?: 'horizontal' | 'vertical';
  
  /** Gap between buttons (semantic gap sizes) */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Alignment of button group */
  align?: 'start' | 'center' | 'end';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Button components to render */
  children: React.ReactNode;
  
  /** Responsive behavior - stack on mobile */
  stackOnMobile?: boolean;
}

/**
 * Buttons container component.
 * 
 * Groups multiple Button components with consistent spacing and alignment.
 * Supports both horizontal and vertical orientations, and provides
 * responsive stacking on mobile devices.
 * 
 * @component
 * @category blocks/design
 * 
 * @example
 * // Horizontal buttons with center alignment
 * <Buttons orientation="horizontal" gap="4" align="center">
 *   <Button variant="primary">Primary Action</Button>
 *   <Button variant="secondary">Secondary Action</Button>
 * </Buttons>
 * 
 * @example
 * // Vertical stack with start alignment
 * <Buttons orientation="vertical" gap="3" align="start">
 *   <Button variant="primary" className="w-full">Book Now</Button>
 *   <Button variant="outline" className="w-full">Request Quote</Button>
 * </Buttons>
 * 
 * @param {ButtonsProps} props - Component props
 * @returns {JSX.Element} Rendered buttons container
 */
export function Buttons({
  orientation = 'horizontal',
  gap = 'sm',
  align = 'start',
  className,
  children,
  stackOnMobile = false,
}: ButtonsProps) {
  return (
    <div
      className={cn(
        'flex',
        // Orientation
        orientation === 'horizontal' && !stackOnMobile && 'flex-row',
        orientation === 'vertical' && 'flex-col',
        stackOnMobile && 'flex-col md:flex-row',
        // Gap
        gap === 'xs' && 'gap-fluid-xs',
        gap === 'sm' && 'gap-fluid-sm',
        gap === 'md' && 'gap-fluid-md',
        gap === 'lg' && 'gap-fluid-lg',
        gap === 'xl' && 'gap-fluid-xl',
        // Alignment
        align === 'start' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'end' && 'justify-end',
        // Custom classes
        className
      )}
      role="group"
      aria-label="Button group"
    >
      {children}
    </div>
  );
}

Buttons.displayName = 'Buttons';