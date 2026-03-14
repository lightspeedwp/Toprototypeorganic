/**
 * Archive Results Section Pattern Component
 *
 * Renders the standard results section used by archive templates:
 *   1. Results header (SectionHeader + ViewSwitcher)
 *   2. Grid/list layout driven by ViewMode
 *   3. Empty state fallback
 *   4. Conditional pagination
 *
 * Eliminates ~30 lines of duplicated JSX per archive template.
 *
 * WordPress Mapping:
 * - Pattern: lightspeed/archive-results
 * - Blocks: core/query, core/post-template
 *
 * @module ArchiveResultsSection
 * @category patterns
 */

import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { ViewSwitcher, type ViewMode } from "./ViewSwitcher";
import { EmptyStatePattern } from "./EmptyStatePattern";
import { Pagination } from "./Pagination";
import type { ReactNode } from "react";

export interface ArchiveResultsSectionProps<T extends { id: string }> {
  /** Section header copy */
  header: {
    eyebrow?: string;
    title: string;
    description: string;
  };

  /** Items to display (already paginated) */
  items: T[];

  /** Total filtered count (pre-pagination) — used for pagination visibility */
  totalFiltered: number;

  /** Render function for each item */
  renderItem: (item: T, viewMode: ViewMode) => ReactNode;

  /** Current view mode */
  viewMode: ViewMode;

  /** View mode change handler */
  onViewModeChange: (mode: ViewMode) => void;

  /** Grid column modifier (default: "cols-3") */
  gridColumns?: "cols-3" | "cols-4";

  /** Empty state configuration — omit for static collections with no filtering */
  emptyState?: {
    icon?: "search" | "empty";
    title: string;
    message: string;
    actionLabel: string;
    onAction: () => void;
  };

  /** Pagination — omit to disable */
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
  };

  /** Optional className for the outer section */
  className?: string;
}

/**
 * ArchiveResultsSection renders a complete archive results block.
 *
 * Uses `.wp-template-archive__*` BEM classes from archive.css.
 */
export function ArchiveResultsSection<T extends { id: string }>({
  header,
  items,
  totalFiltered,
  renderItem,
  viewMode,
  onViewModeChange,
  gridColumns = "cols-3",
  emptyState,
  pagination,
  className,
}: ArchiveResultsSectionProps<T>) {
  /**
   * Derive CSS grid modifier from ViewMode:
   * - "list"   → single-column list layout
   * - "grid-2" → base 2-column grid (from archive.css responsive rules)
   * - "grid-3" → 3-column grid modifier
   */
  const gridClass =
    viewMode === "list"
      ? "wp-template-archive__list"
      : viewMode === "grid-2"
        ? "wp-template-archive__grid"
        : `wp-template-archive__grid wp-template-archive__grid--${gridColumns}`;

  return (
    <section className={`wp-template-archive__content${className ? ` ${className}` : ""}`}>
      <Container>
        <div className="wp-template-archive__results-header">
          <SectionHeader
            section={header}
            centered={false}
            className="m-0"
          />
          <ViewSwitcher currentView={viewMode} onViewChange={onViewModeChange} />
        </div>

        {items.length > 0 ? (
          <div className={gridClass}>
            {items.map((item) => renderItem(item, viewMode))}
          </div>
        ) : emptyState ? (
          <EmptyStatePattern
            icon={emptyState.icon ?? "search"}
            title={emptyState.title}
            message={emptyState.message}
            primaryAction={{
              label: emptyState.actionLabel,
              onClick: emptyState.onAction,
            }}
          />
        ) : null}

        {pagination && totalFiltered > pagination.itemsPerPage && items.length > 0 && (
          <div className="wp-template-archive__pagination">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.onPageChange}
            />
          </div>
        )}
      </Container>
    </section>
  );
}

export default ArchiveResultsSection;