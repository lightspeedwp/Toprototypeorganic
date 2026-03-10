/**
 * Pagination Pattern - WordPress BEM CSS Version
 * 
 * Provides navigation controls for paginated content lists. Used on all
 * archive pages to display content in manageable chunks (typically 12 items).
 * 
 * **Features:**
 * - Previous/Next navigation buttons
 * - Numbered page links
 * - Ellipsis for large page ranges
 * - Disabled states at boundaries
 * - Keyboard accessible
 * - Screen reader friendly
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to `core/post-pagination` block (WordPress 6.2+).
 * In WordPress, this maps to:
 * - core/post-pagination
 * - core/query-pagination
 * - Uses WP_Query pagination parameters
 * 
 * **Design System:**
 * - Buttons: Primary style with hover states via CSS
 * - Active page: Primary color with background
 * - Disabled: Reduced opacity, no pointer events
 * - Spacing: Consistent gaps between items
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/pagination.css
 * Uses WordPress BEM methodology: .wp-pattern-pagination__*
 * 
 * **Accessibility:**
 * - Semantic nav element with role="navigation"
 * - Clear ARIA labels for screen readers
 * - Keyboard navigable (Tab, Enter)
 * - Focus indicators visible
 * - Current page clearly identified
 * 
 * @module Pagination
 * @category patterns
 * @wordpressPattern lightspeed/pagination
 */

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";

/**
 * Props for the Pagination component.
 */
interface PaginationProps {
  /**
   * Current active page number (1-based index).
   * @example 1, 2, 3
   */
  currentPage: number;

  /**
   * Total number of pages available.
   * @example 10
   */
  totalPages: number;

  /**
   * Callback when page changes.
   * @param page - The new page number (1-based)
   */
  onPageChange: (page: number) => void;

  /**
   * Optional CSS classes for the wrapper.
   */
  className?: string;

  /**
   * Optional label for screen readers.
   * @default "Pagination navigation"
   */
  ariaLabel?: string;
}

/**
 * Pagination pattern component.
 * 
 * Renders page navigation with previous/next buttons and numbered page links.
 * Shows ellipsis for large page ranges, keeping UI compact.
 * 
 * **Behavior:**
 * - Shows up to 7 page numbers at once
 * - Displays ellipsis when there are many pages
 * - Previous/Next buttons disabled at boundaries
 * - Keyboard accessible (Tab + Enter)
 * - Screen reader friendly with ARIA labels
 * 
 * @component
 * @category patterns
 * @wordpressPattern lightspeed/pagination
 * 
 * @example
 * // Basic pagination
 * <Pagination
 *   currentPage={2}
 *   totalPages={10}
 *   onPageChange={(page) => console.log('Go to page', page)}
 * />
 * 
 * @example
 * // Usage in archive page
 * function ToursArchive() {
 *   const [page, setPage] = useState(1);
 *   const itemsPerPage = 12;
 *   const totalPages = Math.ceil(tours.length / itemsPerPage);
 *   
 *   return (
 *     <>
 *       <CardGrid>
 *         {tours.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(...)}
 *       </CardGrid>
 *       <Pagination
 *         currentPage={page}
 *         totalPages={totalPages}
 *         onPageChange={setPage}
 *       />
 *     </>
 *   );
 * }
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  ariaLabel = "Pagination navigation",
}: PaginationProps) {
  /**
   * Generate array of page numbers to display.
   * Shows: [1] ... [n-1] [n] [n+1] ... [total]
   * Where n is currentPage.
   */
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Show ellipsis if there's a gap after page 1
    if (currentPage > 3) {
      pages.push("ellipsis");
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    // Show ellipsis if there's a gap before last page
    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }
    
    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Don't render if only 1 page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <section className={cn("wp-pattern-pagination", className)}>
      <Container>
        <nav className="wp-pattern-pagination__nav" aria-label={ariaLabel}>
          <ul className="wp-pattern-pagination__list">
            {/* Previous Button */}
            <li className="wp-pattern-pagination__item">
              <button
                type="button"
                onClick={() => {
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
                aria-disabled={currentPage === 1}
                className={cn(
                  "wp-pattern-pagination__link",
                  "wp-pattern-pagination__link--prev",
                  currentPage === 1 && "wp-pattern-pagination__link--disabled"
                )}
              >
                <CaretLeft className="wp-pattern-pagination__icon" />
                <span>Previous</span>
              </button>
            </li>

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => (
              <li key={`${page}-${index}`} className="wp-pattern-pagination__item">
                {page === "ellipsis" ? (
                  <span className="wp-pattern-pagination__ellipsis">…</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={cn(
                      "wp-pattern-pagination__link",
                      page === currentPage && "wp-pattern-pagination__link--active"
                    )}
                  >
                    {page}
                  </button>
                )}
              </li>
            ))}

            {/* Next Button */}
            <li className="wp-pattern-pagination__item">
              <button
                type="button"
                onClick={() => {
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages}
                aria-disabled={currentPage === totalPages}
                className={cn(
                  "wp-pattern-pagination__link",
                  "wp-pattern-pagination__link--next",
                  currentPage === totalPages && "wp-pattern-pagination__link--disabled"
                )}
              >
                <span>Next</span>
                <CaretRight className="wp-pattern-pagination__icon" />
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </section>
  );
}