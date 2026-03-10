/**
 * Group Block Component
 * 
 * Versatile container block for grouping other blocks together with shared
 * styling, spacing, and width constraints. Maps to WordPress core/group block.
 * 
 * **WordPress Mapping:**
 * - Block: core/group
 * - Category: Design
 * - Supports: Background, spacing, borders, shadows, semantic HTML tags
 * 
 * **Design System:**
 * - Uses semantic HTML tags (div, section, article, header, footer, nav)
 * - Supports background colors via semantic tokens
 * - Flexible padding and margin via Tailwind utilities
 * - Can be aligned (wide, full)
 * - Does not impose typography on children
 * 
 * **Usage:**
 * ```tsx
 * <Group as="section" className="bg-muted py-12">
 *   <h2>Section Title</h2>
 *   <p>Section content...</p>
 * </Group>
 * ```
 * 
 * @module Group
 * @category blocks/design
 * @see {@link /guidelines/blocks/design/group.md} for full documentation
 */

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * Group component props.
 */
export interface GroupProps {
  /** HTML element type to render */
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'nav' | 'aside';
  
  /** Content alignment (wide, full) */
  align?: 'wide' | 'full';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Inline styles (use sparingly, prefer Tailwind classes) */
  style?: React.CSSProperties;
  
  /** Child blocks */
  children: React.ReactNode;
  
  /** ARIA label for semantic sections */
  ariaLabel?: string;
  
  /** ID for section anchors */
  id?: string;
}

/**
 * Group container component.
 * 
 * Groups multiple blocks together with shared styling. Does not impose
 * typography or layout constraints on children - those are handled by
 * nested layout blocks (Row, Stack, Grid, Columns).
 * 
 * @component
 * @category blocks/design
 * 
 * @example
 * // Simple section wrapper
 * <Group as="section" className="py-16">
 *   <Container>
 *     <h2>Features</h2>
 *     <Grid columns={3}>
 *       <Card />
 *       <Card />
 *       <Card />
 *     </Grid>
 *   </Container>
 * </Group>
 * 
 * @example
 * // With background color
 * <Group as="section" className="bg-muted py-12 px-4">
 *   <h2>Highlighted Section</h2>
 *   <p>Important content...</p>
 * </Group>
 * 
 * @example
 * // Hero section wrapper
 * <Group as="section" className="bg-primary text-primary-foreground py-24">
 *   <Container>
 *     <h1>Welcome</h1>
 *     <p>Hero intro text</p>
 *   </Container>
 * </Group>
 * 
 * @param {GroupProps} props - Component props
 * @returns {JSX.Element} Rendered group container
 */
export function Group({
  as: Tag = 'div',
  align,
  className,
  style,
  children,
  ariaLabel,
  id,
}: GroupProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'wp-block-group',
        // Alignment classes
        align === 'wide' && 'alignwide',
        align === 'full' && 'alignfull',
        // Custom classes
        className
      )}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}

Group.displayName = 'Group';
