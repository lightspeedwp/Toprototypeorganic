/**
 * useArchiveFilters — Shared base hook for all archive filter hooks.
 *
 * Encapsulates the common plumbing that every archive page needs:
 *   • URL search-param access (react-router)
 *   • Search-query state initialised from `?q=`, with debounced URL sync
 *   • Flush function for instant sync on Enter-key
 *   • Optional pagination state initialised from `?page=`
 *   • `applyBaseParams()` helper for the domain hook's URL-sync effect
 *   • `paginate()` helper to slice filtered results
 *
 * Domain hooks (useTourFilters, useBlogFilters, etc.) compose this hook
 * and add their own filter states, filtering logic, and URL param entries.
 *
 * @module useArchiveFilters
 * @category hooks
 */

import { useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedValue } from "./useDebouncedValue";

export interface UseArchiveFiltersOptions {
  /** Enable pagination — pass the items-per-page count. */
  itemsPerPage?: number;
  /** Debounce delay in ms for search-query URL sync (default: 300). */
  debounceMs?: number;
}

/**
 * Base archive filter hook.
 *
 * @example
 * ```ts
 * const base = useArchiveFilters({ itemsPerPage: 12 });
 * // Use base.searchQuery for input binding
 * // Use base.debouncedSearchQuery in your URL sync effect
 * // Use base.applyBaseParams(params) inside your useEffect
 * // Use base.paginate(filteredItems) for pagination
 * ```
 */
export function useArchiveFilters(options?: UseArchiveFiltersOptions) {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Search query (debounced for URL, instant for filtering) ────────
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || ""
  );
  const [debouncedSearchQuery, flushSearch] = useDebouncedValue(
    searchQuery,
    options?.debounceMs ?? 300
  );

  // ── Pagination ─────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(() => {
    if (!options?.itemsPerPage) return 1;
    const p = searchParams.get("page");
    return p ? Math.max(1, parseInt(p, 10) || 1) : 1;
  });

  /**
   * Convenience: resets pagination to page 1.
   * Use in filter-change callbacks to avoid repeating setCurrentPage(1).
   */
  const resetPage = useCallback(() => setCurrentPage(1), []);

  /**
   * Applies the base `q` and `page` params to a URLSearchParams instance.
   * Call this inside the domain hook's URL-sync useEffect so the base
   * params are merged with domain-specific params in a single update.
   */
  const applyBaseParams = useCallback(
    (params: URLSearchParams) => {
      if (debouncedSearchQuery) {
        params.set("q", debouncedSearchQuery);
      } else {
        params.delete("q");
      }

      if (options?.itemsPerPage && currentPage > 1) {
        params.set("page", String(currentPage));
      } else {
        params.delete("page");
      }
    },
    [debouncedSearchQuery, currentPage, options?.itemsPerPage]
  );

  /**
   * Paginates a pre-filtered array using the current page and itemsPerPage.
   * Returns the visible slice and the total page count.
   */
  const paginate = useCallback(
    <T,>(items: T[]): { paginatedItems: T[]; totalPages: number } => {
      if (!options?.itemsPerPage) {
        return { paginatedItems: items, totalPages: 1 };
      }
      const totalPages = Math.ceil(items.length / options.itemsPerPage);
      const start = (currentPage - 1) * options.itemsPerPage;
      return {
        paginatedItems: items.slice(start, start + options.itemsPerPage),
        totalPages,
      };
    },
    [currentPage, options?.itemsPerPage]
  );

  return {
    /** Raw URLSearchParams for reading initial values in domain hooks. */
    searchParams,
    /** Setter for URLSearchParams — use in domain hook's sync effect. */
    setSearchParams,

    /** Live search query (binds to input, used for filtering). */
    searchQuery,
    /** Update the live search query. */
    setSearchQuery,
    /** Debounced search query (use in URL sync effect deps). */
    debouncedSearchQuery,
    /** Immediately sync debounced value — call on Enter key. */
    flushSearch,

    /** Current page number (1-based). */
    currentPage,
    /** Update current page. */
    setCurrentPage,
    /** Reset to page 1 — call when any filter changes. */
    resetPage,

    /** Merge base params (q, page) into a URLSearchParams. */
    applyBaseParams,
    /** Paginate a filtered array. */
    paginate,
  };
}