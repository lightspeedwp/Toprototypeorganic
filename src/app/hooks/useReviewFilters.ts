/**
 * Custom hook for managing review archive filters.
 * 
 * Extracts filtering logic from the ReviewsArchive.
 * 
 * @module useReviewFilters
 * @category hooks
 */

import { useState, useMemo } from "react";
import type { Review } from "../data/types";

/**
 * useReviewFilters hook.
 * 
 * @param {Review[]} reviews - The full list of reviews to filter.
 * @param {number} itemsPerPage - Number of items to display per page.
 */
export function useReviewFilters(reviews: Review[], itemsPerPage: number = 12) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        !searchQuery ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRating = !selectedRating || review.rating === parseInt(selectedRating);

      const matchesType =
        !selectedType ||
        (selectedType === "tour" && review.tourId) ||
        (selectedType === "accommodation" && review.accommodationId) ||
        (selectedType === "destination" && review.destinationId);

      return matchesSearch && matchesRating && matchesType;
    });
  }, [reviews, searchQuery, selectedRating, selectedType]);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRating("");
    setSelectedType("");
    setCurrentPage(1);
  };

  const activeFilterCount = 
    (searchQuery ? 1 : 0) + (selectedRating ? 1 : 0) + (selectedType ? 1 : 0);

  return {
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
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
