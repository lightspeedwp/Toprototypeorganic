/**
 * Custom hook for managing blog archive filters.
 *
 * Composes useArchiveFilters for shared search/URL/pagination plumbing
 * and adds blog-specific category filter.
 *
 * @module useBlogFilters
 * @category hooks
 */

import { useState, useMemo, useEffect, useCallback } from "react";
import type { BlogPost } from "../data/types";
import { useArchiveFilters } from "./useArchiveFilters";
import { useResultsAnnouncement } from "./useResultsAnnouncement";

/**
 * useBlogFilters hook.
 *
 * @param {BlogPost[]} posts - The full list of blog posts to filter.
 * @param {number} itemsPerPage - Number of items to display per page.
 */
export function useBlogFilters(posts: BlogPost[], itemsPerPage: number = 12) {
  const base = useArchiveFilters({ itemsPerPage });

  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => base.searchParams.get("category") || "all"
  );

  // ── Sync all filters → URL query params (single effect) ───────────
  useEffect(() => {
    base.setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      base.applyBaseParams(next);

      if (selectedCategory !== "all") {
        next.set("category", selectedCategory);
      } else {
        next.delete("category");
      }

      return next;
    }, { replace: true });
  }, [base.debouncedSearchQuery, selectedCategory, base.currentPage, base.setSearchParams, base.applyBaseParams]);

  // ── Filtering ─────────────────────────────────────────────────────
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.categories.includes(selectedCategory);
      const matchesSearch =
        !base.searchQuery ||
        post.title.toLowerCase().includes(base.searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(base.searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, base.searchQuery]);

  const { paginatedItems: paginatedPosts, totalPages } = base.paginate(filteredPosts);

  // ── Screen-reader announcement after filtering settles ────────────
  useResultsAnnouncement(filteredPosts.length, posts.length, "blog posts");

  const resetFilters = useCallback(() => {
    base.setSearchQuery("");
    setSelectedCategory("all");
    base.resetPage();
  }, [base.setSearchQuery, base.resetPage]);

  const activeFilterCount =
    (base.searchQuery ? 1 : 0) + (selectedCategory !== "all" ? 1 : 0);

  return {
    currentPage: base.currentPage,
    setCurrentPage: base.setCurrentPage,
    resetPage: base.resetPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery: base.searchQuery,
    setSearchQuery: base.setSearchQuery,
    flushSearch: base.flushSearch,
    filteredPosts,
    paginatedPosts,
    totalPages,
    resetFilters,
    activeFilterCount,
  };
}