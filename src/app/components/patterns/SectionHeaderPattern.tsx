/**
 * Section Header Pattern component for consistent section headings.
 * 
 * Reusable section heading wrapper with optional description text.
 * Provides consistent spacing, typography, and optional centered layout
 * for section introductions throughout the site.
 * 
 * **Features:**
 * - Configurable heading level (H2 or H3)
 * - Optional description text
 * - Optional centered alignment
 * - Consistent spacing (32px mobile, 48px desktop)
 * - Responsive max-width for centered text
 * - Semantic HTML structure
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to `patterns/section-header.php` block pattern.
 * In WordPress, this would be composed of:
 * - core/group (header wrapper)
 * - core/heading (title)
 * - core/paragraph (optional description)
 * - Alignment and spacing settings
 * 
 * **Design System:**
 * - Title: Default heading styling (Lora, sized by level)
 * - Description: Noto Sans, 16px, muted foreground
 * - Spacing: 12px between title and description
 * - Bottom margin: 32px mobile, 48px desktop
 * - Centered: Max-width 768px, auto margins
 * 
 * **Behavioral Notes:**
 * - Defaults to H2 heading level
 * - Description only rendered if provided
 * - Centered layout constrains width for readability
 * - Responsive bottom margin
 * - No top margin (controlled by parent)
 * 
 * **Accessibility:**
 * - Semantic heading hierarchy
 * - Proper heading levels (H2 or H3)
 * - Clear text contrast
 * - Readable line lengths when centered
 * - No presentational divs
 * 
 * @module SectionHeaderPattern
 * @category patterns
 * @wordpressPattern lightspeed/section-header
 * @see /guidelines/patterns/section-styles.md
 */

/**
 * Props for the SectionHeaderPattern component.
 * 
 * @interface SectionHeaderPatternProps
 */
interface SectionHeaderPatternProps {
  /** 
   * Section title text.
   * Displayed as the main heading.
   */
  title: string;
  
  /** 
   * Optional description text below the title.
   * Provides additional context for the section.
   * 
   * @example "Explore our collection of carefully curated tours"
   */
  description?: string;
  
  /** 
   * HTML heading level to use.
   * Defaults to 'h2'.
   * Use 'h3' for subsections.
   * 
   * @default 'h2'
   */
  level?: 'h2' | 'h3';
  
  /** 
   * Whether to center-align the header.
   * When true, applies center text alignment and max-width constraint.
   * 
   * @default false
   */
  centered?: boolean;
}

/**
 * Section Header Pattern component.
 * 
 * Renders a consistent section header with optional description.
 * 
 * **Usage:**
 * 
 * Basic header:
 * ```tsx
 * <SectionHeaderPattern title="Featured Tours" />
 * ```
 * 
 * With description:
 * ```tsx
 * <SectionHeaderPattern
 *   title="Our Destinations"
 *   description="Discover incredible places around the world"
 * />
 * ```
 * 
 * Centered with H3:
 * ```tsx
 * <SectionHeaderPattern
 *   title="What Our Clients Say"
 *   description="Real experiences from real travelers"
 *   level="h3"
 *   centered
 * />
 * ```
 * 
 * **Visual Hierarchy:**
 * 1. Section title (H2 or H3, default typography)
 * 2. Optional description (muted foreground)
 * 3. Bottom margin spacing
 * 
 * **Layout Variants:**
 * - Left-aligned (default): Full width
 * - Centered: Max 768px width, center-aligned text
 * 
 * **Responsive Behavior:**
 * - Mobile: 32px bottom margin
 * - Desktop: 48px bottom margin
 * - Centered: Max-width 768px on all screens
 * 
 * @component
 * @category patterns
 * @wordpressPattern lightspeed/section-header
 * 
 * @param {SectionHeaderPatternProps} props - Component properties
 * @returns {JSX.Element} Rendered section header element
 * 
 * @example
 * // Basic section header
 * <SectionHeaderPattern title="Featured Tours" />
 * 
 * @example
 * // With description
 * <SectionHeaderPattern
 *   title="Popular Destinations"
 *   description="Explore our most sought-after locations"
 * />
 * 
 * @example
 * // Centered subsection
 * <SectionHeaderPattern
 *   title="Why Choose Us"
 *   description="We're different from other tour operators"
 *   level="h3"
 *   centered
 * />
 * 
 * @example
 * // In a section layout
 * function FeaturedToursSection() {
 *   return (
 *     <section className="py-12">
 *       <Container>
 *         <SectionHeaderPattern
 *           title="Featured Tours"
 *           description="Hand-picked adventures for 2024"
 *           centered
 *         />
 *         <CardGrid items={featuredTours} />
 *       </Container>
 *     </section>
 *   );
 * }
 */
export function SectionHeaderPattern({ 
  title, 
  description, 
  level = 'h2',
  centered = false 
}: SectionHeaderPatternProps) {
  const HeadingTag = level;
  
  return (
    <div className={`wp-section-header ${centered ? 'wp-section-header--centered' : ''}`}>
      <HeadingTag className="wp-section-title">
        {title}
      </HeadingTag>
      {description && (
        <p className="wp-section-description">
          {description}
        </p>
      )}
    </div>
  );
}
