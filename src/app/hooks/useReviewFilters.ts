/**
 * Custom hook for managing review archive filters.
 *
 * Composes useArchiveFilters for shared search/URL/pagination plumbing
 * and adds review-specific rating and type filters.
 *
 * @module useReviewFilters
 * @category hooks
 */

import { useState, useMemo, useEffect, useCallback } from "react";
import type { Review } from "../data/types";
import { useArchiveFilters } from "./useArchiveFilters";
import { useResultsAnnouncement } from "./useResultsAnnouncement";

/**
 * useReviewFilters hook.
 *
 * @param {Review[]} reviews - The full list of reviews to filter.
 * @param {number} itemsPerPage - Number of items to display per page.
 */
export function useReviewFilters(reviews: Review[], itemsPerPage: number = 12) {
  const base = useArchiveFilters({ itemsPerPage });

  const [selectedRating, setSelectedRating] = useState(
    () => base.searchParams.get("rating") || ""
  );
  const [selectedType, setSelectedType] = useState(() => {
    const raw = base.searchParams.get("type");
    return raw && ["tour", "accommodation", "destination"].includes(raw)
      ? raw
      : "";
  });

  // ── Sync all filters → URL query params (single effect) ───────────
  useEffect(() => {
    base.setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      base.applyBaseParams(next);

      if (selectedRating) {
        next.set("rating", selectedRating);
      } else {
        next.delete("rating");
      }

      if (selectedType) {
        next.set("type", selectedType);
      } else {
        next.delete("type");
      }

      return next;
    }, { replace: true });
  }, [base.debouncedSearchQuery, selectedRating, selectedType, base.currentPage, base.setSearchParams, base.applyBaseParams]);

  // ── Filtering ─────────────────────────────────────────────────────
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        !base.searchQuery ||
        review.content.toLowerCase().includes(base.searchQuery.toLowerCase()) ||
        review.author.toLowerCase().includes(base.searchQuery.toLowerCase());

      const matchesRating =
        !selectedRating || review.rating === parseInt(selectedRating);

      const matchesType =
        !selectedType ||
        (selectedType === "tour" && review.tourId) ||
        (selectedType === "accommodation" && review.accommodationId) ||
        (selectedType === "destination" && review.destinationId);

      return matchesSearch && matchesRating && matchesType;
    });
  }, [reviews, base.searchQuery, selectedRating, selectedType]);

  const { paginatedItems: paginatedReviews, totalPages } =
    base.paginate(filteredReviews);

  // ── Screen-reader announcement after filtering settles ────────────
  useResultsAnnouncement(filteredReviews.length, reviews.length, "reviews");

  const resetFilters = useCallback(() => {
    base.setSearchQuery("");
    setSelectedRating("");
    setSelectedType("");
    base.resetPage();
  }, [base.setSearchQuery, base.resetPage]);

  const activeFilterCount =
    (base.searchQuery ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    (selectedType ? 1 : 0);

  return {
    currentPage: base.currentPage,
    setCurrentPage: base.setCurrentPage,
    resetPage: base.resetPage,
    searchQuery: base.searchQuery,
    setSearchQuery: base.setSearchQuery,
    flushSearch: base.flushSearch,
    selectedRating,
    setSelectedRating,
    selectedType,
    setSelectedType,
    filteredReviews,
    paginatedReviews,
    totalPages,
    resetFilters,
    activeFilterCount,
  };
}