/**
 * Card Grid Pattern - WordPress BEM CSS Version
 * 
 * A flexible, responsive grid layout for displaying cards with smooth animations
 * and modern visual enhancements.
 * 
 * **Features:**
 * - Responsive grid (1→2→3/4 columns)
 * - Stagger animations on cards
 * - List layout option
 * - Multiple column configurations
 * - Optimized performance with memoization
 * 
 * **Design System:**
 * - Spacing: gap-6 (24px) between cards via CSS
 * - Padding: py-12 (48px) vertical via CSS
 * - Responsive breakpoints: md (768px), lg (1024px)
 * - Animations: Smooth fade-in-up stagger
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/card-grid.css
 * Uses WordPress BEM methodology: .wp-pattern-card-grid__*
 * 
 * @module CardGrid
 * @category patterns
 * @wordpressPattern lightspeed/card-grid
 */

import { memo, useMemo } from "react";
import { motion } from "motion/react";
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";

/**
 * Props for the CardGrid pattern component.
 */
interface CardGridProps {
  /** Card components to display in the grid */
  children: React.ReactNode;

  /**
   * Number of columns in desktop layout.
   * 
   * **Responsive Behavior:**
   * - Mobile: Always 1 column
   * - Tablet (md): Always 2 columns
   * - Desktop (lg): 2, 3, or 4 columns
   * 
   * **Guidelines:**
   * - `2`: Large cards (team, featured posts)
   * - `3`: Default (tours, destinations)
   * - `4`: Compact cards (tags, categories)
   * - `5-6`: Ultra-wide layouts (destinations, tags)
   */
  columns?: 2 | 3 | 4 | 5 | 6;

  /**
   * Layout mode for card display.
   * 
   * - `grid`: Responsive grid (2-6 columns)
   * - `list`: Single column, full width
   * - `grid-2`: 2-column grid
   * - `grid-3`: 3-column grid
   * - `grid-5`: 5-column grid
   * - `grid-6`: 6-column grid
   */
  layout?: "grid" | "list" | "grid-2" | "grid-3" | "grid-5" | "grid-6";

  /** Optional additional CSS classes */
  className?: string;
  
  /** Enable stagger animations on cards */
  animated?: boolean;
  
  /** Gap size between cards */
  gap?: "sm" | "md" | "lg";
}

/**
 * Card Grid Pattern Component.
 * 
 * Renders a responsive grid of cards with automatic column layout,
 * smooth animations, and consistent spacing.
 * 
 * **Responsive Breakpoints:**
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1023px): 2 columns
 * - Desktop (>= 1024px): 2, 3, or 4 columns
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to `lightspeed/card-grid` block pattern.
 * Composed of:
 * - core/group (outer section)
 * - core/query (for post queries)
 * - core/post-template (for card loop)
 * 
 * **Accessibility:**
 * - Semantic HTML (section)
 * - Logical reading order
 * - Keyboard navigable cards
 * 
 * @component
 * @category patterns
 * 
 * @example
 * // Default 3-column grid
 * <CardGrid>
 *   <TourCard tour={tour1} />
 *   <TourCard tour={tour2} />
 *   <TourCard tour={tour3} />
 * </CardGrid>
 * 
 * @example
 * // Animated 4-column grid
 * <CardGrid columns={4} animated>
 *   {categories.map(cat => (
 *     <CategoryCard key={cat.id} category={cat} />
 *   ))}
 * </CardGrid>
 * 
 * @example
 * // List layout with large gap
 * <CardGrid layout="list" gap="lg">
 *   {posts.map(post => (
 *     <BlogCard key={post.id} post={post} />
 *   ))}
 * </CardGrid>
 */
export const CardGrid = memo(function CardGrid({
  children,
  columns = 3,
  layout = "grid",
  className,
  animated = true,
  gap = "md",
}: CardGridProps) {
  // Map column prop to CSS modifier class (memoized)
  const columnsModifier = useMemo(() => {
    // If layout specifies explicit column count, use that
    if (layout === "grid-2") return "wp-pattern-card-grid__container--cols-2";
    if (layout === "grid-3") return "wp-pattern-card-grid__container--cols-3";
    if (layout === "grid-5") return "wp-pattern-card-grid__container--cols-5";
    if (layout === "grid-6") return "wp-pattern-card-grid__container--cols-6";

    const colsModifiers = {
      2: "wp-pattern-card-grid__container--cols-2",
      3: "wp-pattern-card-grid__container--cols-3",
      4: "wp-pattern-card-grid__container--cols-4",
      5: "wp-pattern-card-grid__container--cols-5",
      6: "wp-pattern-card-grid__container--cols-6",
    };
    return colsModifiers[columns as keyof typeof colsModifiers];
  }, [columns, layout]);

  // Map gap size to CSS modifier class
  const gapModifier = useMemo(() => {
    const gapModifiers = {
      sm: "wp-pattern-card-grid__container--gap-sm",
      md: "wp-pattern-card-grid__container--gap-md",
      lg: "wp-pattern-card-grid__container--gap-lg",
    };
    return gapModifiers[gap];
  }, [gap]);

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Convert children to array for mapping
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <section className={cn("wp-pattern-card-grid", className)}>
      <Container>
        {animated ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "wp-pattern-card-grid__container",
              layout === "list"
                ? "wp-pattern-card-grid__container--list"
                : cn(columnsModifier, gapModifier)
            )}
          >
            {childArray.map((child, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="wp-pattern-card-grid__item"
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            className={cn(
              "wp-pattern-card-grid__container",
              layout === "list"
                ? "wp-pattern-card-grid__container--list"
                : cn(columnsModifier, gapModifier)
            )}
          >
            {children}
          </div>
        )}
      </Container>
    </section>
  );
});
