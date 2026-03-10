/**
 * ContentLayout Pattern - WordPress BEM CSS Version
 * 
 * Common content layouts using the Columns block (main content + sidebar).
 * Supports multiple layout variations and responsive stacking.
 * 
 * **Features:**
 * - Multiple layout variations (sidebar-left, sidebar-right, two-column, three-column)
 * - Responsive stacking on mobile
 * - Semantic HTML (main, aside)
 * - Flexible gap sizes
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to core/columns block with semantic elements.
 * Maps to:
 * - core/columns (with main/aside semantic HTML)
 * - Common blog/page layouts
 * 
 * **Design System:**
 * - Uses Columns block with flexible widths
 * - Responsive stacking on mobile via CSS
 * - Typography inherited from content
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/content-layout.css
 * Uses WordPress BEM methodology: .wp-pattern-content-layout__*
 * 
 * @module ContentLayout
 * @category patterns
 */

import React from 'react';
import { Columns, Column } from '../blocks/design';
import { cn } from '../../lib/utils';

/**
 * Content layout props.
 */
export interface ContentLayoutProps {
  /** Layout variation */
  layout?: 'sidebar-left' | 'sidebar-right' | 'two-column' | 'three-column';
  
  /** Main content */
  main: React.ReactNode;
  
  /** Sidebar content (for sidebar layouts) */
  sidebar?: React.ReactNode;
  
  /** Secondary column (for two/three-column layouts) */
  secondary?: React.ReactNode;
  
  /** Tertiary column (for three-column layouts) */
  tertiary?: React.ReactNode;
  
  /** Gap between columns */
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  
  /** Stack on mobile */
  stackOnMobile?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContentLayout pattern component.
 * 
 * Creates common page layouts with main content and sidebar areas.
 * Automatically stacks on mobile for better readability.
 * 
 * @component
 * @category patterns
 * 
 * @example
 * // Blog post with right sidebar
 * <ContentLayout
 *   layout="sidebar-right"
 *   main={
 *     <article>
 *       <h1>Post Title</h1>
 *       <p>Post content...</p>
 *     </article>
 *   }
 *   sidebar={
 *     <aside>
 *       <h3>Related Posts</h3>
 *       <ul>...</ul>
 *     </aside>
 *   }
 *   gap="8"
 * />
 * 
 * @example
 * // Two equal columns
 * <ContentLayout
 *   layout="two-column"
 *   main={<div>Left column...</div>}
 *   secondary={<div>Right column...</div>}
 *   gap="6"
 * />
 */
export function ContentLayout({
  layout = 'sidebar-right',
  main,
  sidebar,
  secondary,
  tertiary,
  gap = '8',
  stackOnMobile = true,
  className,
}: ContentLayoutProps) {
  // Render based on layout type
  switch (layout) {
    case 'sidebar-left':
      return (
        <Columns 
          gap={gap} 
          stackOnMobile={stackOnMobile} 
          className={cn('wp-pattern-content-layout', 'wp-pattern-content-layout--sidebar-left', className)}
        >
          <Column width="33.333%">
            <aside className="wp-pattern-content-layout__sidebar">{sidebar}</aside>
          </Column>
          <Column width="66.667%">
            <main className="wp-pattern-content-layout__main">{main}</main>
          </Column>
        </Columns>
      );

    case 'sidebar-right':
      return (
        <Columns 
          gap={gap} 
          stackOnMobile={stackOnMobile} 
          className={cn('wp-pattern-content-layout', 'wp-pattern-content-layout--sidebar-right', className)}
        >
          <Column width="66.667%">
            <main className="wp-pattern-content-layout__main">{main}</main>
          </Column>
          <Column width="33.333%">
            <aside className="wp-pattern-content-layout__sidebar">{sidebar}</aside>
          </Column>
        </Columns>
      );

    case 'two-column':
      return (
        <Columns
          columns={2}
          gap={gap}
          stackOnMobile={stackOnMobile}
          className={cn('wp-pattern-content-layout', 'wp-pattern-content-layout--two-column', className)}
        >
          <Column>
            <div className="wp-pattern-content-layout__column">{main}</div>
          </Column>
          <Column>
            <div className="wp-pattern-content-layout__column">{secondary}</div>
          </Column>
        </Columns>
      );

    case 'three-column':
      return (
        <Columns
          columns={3}
          gap={gap}
          stackOnMobile={stackOnMobile}
          className={cn('wp-pattern-content-layout', 'wp-pattern-content-layout--three-column', className)}
        >
          <Column>
            <div className="wp-pattern-content-layout__column">{main}</div>
          </Column>
          <Column>
            <div className="wp-pattern-content-layout__column">{secondary}</div>
          </Column>
          <Column>
            <div className="wp-pattern-content-layout__column">{tertiary}</div>
          </Column>
        </Columns>
      );

    default:
      return <div className="wp-pattern-content-layout__main">{main}</div>;
  }
}

ContentLayout.displayName = 'ContentLayout';
