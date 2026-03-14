/**
 * Related Content Pattern - WordPress BEM CSS Version
 * 
 * Displays a grid of related content items (tours, destinations, posts, etc.)
 * with a heading and empty state handling. Used to keep users engaged and
 * help them discover more content.
 * 
 * **Features:**
 * - Section heading
 * - Responsive 3-column grid
 * - Empty state with custom message
 * - Content validation (hides if no children)
 * - Light muted background for separation
 * - Accepts any card components as children
 * 
 * **WordPress Mapping:**
 * 
 * Maps to a registered WordPress block pattern.
 * Equivalent to `patterns/related-content.php` pattern.
 * Composed of:
 * - core/group (section wrapper)
 * - core/heading (section title)
 * - core/query (related posts query)
 * - core/post-template (card grid)
 * 
 * **Design System:**
 * - Title: H2 with default theme.css styling via CSS
 * - Grid: 1 col mobile, 2 col tablet, 3 col desktop
 * - Background: Muted with 20% opacity
 * - Empty message: Base size, centered, muted foreground
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/related-content.css
 * Uses WordPress BEM methodology: .wp-pattern-related__*
 * 
 * **Common Use Cases:**
 * - Tour pages: Related tours from same destination
 * - Destination pages: Tours in this destination
 * - Blog posts: Related articles
 * - Accommodation pages: Nearby properties
 * 
 * @module RelatedContent
 * @category patterns
 * @wordpressPattern related-content
 * @see /guidelines/patterns/related-content-patterns.md
 */

import { Container } from "../common/Container";
import { cn } from "../../lib/utils";
import React from "react";

/**
 * Props for the RelatedContent component.
 * 
 * @interface RelatedContentProps
 */
interface RelatedContentProps {
  /** Section heading (e.g., "Related Tours", "You Might Also Like") */
  title: string;
  /** Card components to display (TourCard, DestinationCard, etc.) */
  children: React.ReactNode;
  /** Optional message to show when no content available */
  emptyMessage?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Related Content Pattern Component.
 * 
 * Displays a section of related content items in a grid layout.
 * 
 * @component
 * @category patterns
 * @wordpressPattern related-content
 * 
 * @example
 * // Related tours
 * <RelatedContent title="Related Tours">
 *   {relatedTours.map(tour => (
 *     <TourCard 
 *       key={tour.id}
 *       tour={tour}
 *       onClick={() => navigateToTour(tour.id)}
 *     />
 *   ))}
 * </RelatedContent>
 * 
 * @example
 * // Related destinations with custom empty message
 * <RelatedContent 
 *   title="Explore More Destinations"
 *   emptyMessage="No nearby destinations found"
 * >
 *   {relatedDestinations.map(destination => (
 *     <DestinationCard 
 *       key={destination.id}
 *       destination={destination}
 *       onClick={() => navigateToDestination(destination.id)}
 *     />
 *   ))}
 * </RelatedContent>
 */
export function RelatedContent({ title, children, emptyMessage = "No related content available", className }: RelatedContentProps) {
  const hasContent = React.Children.count(children) > 0;

  return (
    <section className={cn("wp-pattern-related", className)}>
      <Container className="flex flex-col gap-element-xl">
        <h2 className="wp-pattern-related__title m-0 font-[family:var(--font-family-lora)] text-[length:var(--text-3xl)] text-[color:var(--color-foreground)]">
          {title}
        </h2>
        
        {hasContent ? (
          <div className="wp-pattern-related__grid flex flex-wrap gap-fluid-lg md:grid md:grid-cols-2 lg:grid-cols-3">
            {children}
          </div>
        ) : (
          <p className="wp-pattern-related__empty m-0 text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)]">
            {emptyMessage}
          </p>
        )}
      </Container>
    </section>
  );
}