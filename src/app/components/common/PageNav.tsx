/**
 * Page Navigation component for prototype page switching.
 * 
 * Displays a grid of clickable cards representing different page archetypes.
 * Used for navigating between different page templates in the prototype
 * environment to demonstrate the content-first block theme approach.
 * 
 * **Features:**
 * - Grid layout of page archetype cards
 * - Active page highlighting with ring
 * - Responsive 1/2/3 column layout
 * - Descriptive labels and descriptions
 * - Click handler for page switching
 * - Accent background for visual prominence
 * 
 * **WordPress Mapping:**
 * 
 * This is a prototype-only component that does not map to WordPress.
 * In production, page navigation would be handled by:
 * - core/navigation (for menu-based navigation)
 * - core/query-pagination (for archive pagination)
 * - Custom admin UI (for template selection)
 * 
 * **Design System:**
 * - Title: H2 with default Lora styling
 * - Labels: Lora serif, 20px, semibold
 * - Descriptions: Noto Sans, 16px, muted foreground
 * - Background: Accent with 10% opacity
 * - Cards: Card background with border
 * - Active: Primary border + ring + tinted background
 * 
 * **Usage Context:**
 * - Prototype environment only
 * - Development and demonstration purposes
 * - Shows structural implementation of archetypes
 * - Not included in production builds
 * 
 * @module PageNav
 * @category common
 * @prototypeOnly
 * @see /guidelines/overview-templates.md
 */

import { Container } from "./Container";

/**
 * Individual page archetype information.
 * 
 * @interface PageInfo
 */
interface PageInfo {
  /** Unique page identifier (matches App.tsx PAGES array) */
  id: string;
  /** Display label for the page */
  label: string;
  /** Brief description of the page archetype */
  description: string;
}

/**
 * Props for the PageNav component.
 * 
 * @interface PageNavProps
 */
interface PageNavProps {
  /** Array of available pages/archetypes to display */
  pages: PageInfo[];
  /** ID of the currently active page */
  activePage: string;
  /** Callback when a page card is clicked */
  onPageChange: (id: string) => void;
}

/**
 * Page Navigation Component.
 * 
 * Displays a grid of page archetype cards for prototype navigation.
 * 
 * **Usage:**
 * 
 * Basic navigation:
 * ```tsx
 * <PageNav
 *   pages={PAGES}
 *   activePage={currentPage}
 *   onPageChange={setCurrentPage}
 * />
 * ```
 * 
 * **Behavior:**
 * - Cards arranged in responsive grid (1/2/3 columns)
 * - Active page highlighted with primary ring
 * - Hover states for interactive feedback
 * - Click triggers onPageChange callback
 * 
 * **Accessibility:**
 * - Semantic HTML (section, button)
 * - Keyboard navigable
 * - Active state visually distinct
 * - Sufficient color contrast
 * - Focus states visible
 * 
 * **Responsive Breakpoints:**
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1023px): 2 columns
 * - Desktop (>= 1024px): 3 columns
 * 
 * @component
 * @category common
 * @prototypeOnly
 * 
 * @param {PageNavProps} props - Component properties
 * @returns {JSX.Element} Rendered page navigation section
 * 
 * @example
 * // Basic usage in App.tsx
 * <PageNav
 *   pages={PAGES}
 *   activePage={currentPage}
 *   onPageChange={setCurrentPage}
 * />
 * 
 * @example
 * // With filtered pages
 * <PageNav
 *   pages={PAGES.filter(p => p.category === 'archive')}
 *   activePage={currentPage}
 *   onPageChange={handlePageChange}
 * />
 */
export function PageNav({ pages, activePage, onPageChange }: PageNavProps) {
  return (
    <section className="wp-common-page-nav">
      <Container>
        <div className="space-y-4">
          <div>
            <h2 className="mb-2">Content-First Prototype Navigator</h2>
            <p className="text-muted-foreground">
              Select a page archetype to view its structural implementation
            </p>
          </div>
          
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`wp-common-page-nav__card ${
                  activePage === page.id
                    ? "wp-common-page-nav__card--active"
                    : "wp-common-page-nav__card--inactive"
                }`}
              >
                <div className="wp-common-page-nav__label">
                  {page.label}
                </div>
                <p className="text-muted-foreground">
                  {page.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}