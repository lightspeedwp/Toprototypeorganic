/**
 * Custom hook for managing accommodation archive filters.
 * 
 * Extracts filtering logic from the ArchiveAccommodationTemplate.
 * 
 * @module useAccommodationFilters
 * @category hooks
 */

import { useState, useMemo } from "react";
import type { Accommodation } from "../data/types";

/**
 * useAccommodationFilters hook.
 * 
 * @param {Accommodation[]} properties - The full list of accommodations to filter.
 * @param {number} itemsPerPage - Number of items to display per page.
 */
export function useAccommodationFilters(properties: Accommodation[], itemsPerPage: number = 12) {
  const [activeType, setActiveType] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesType = !activeType || property.accommodationType === activeType;
      const matchesSearch = !searchQuery || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDestination = !selectedDestination || property.destinations.includes(selectedDestination);
      
      return matchesType && matchesSearch && matchesDestination;
    });
  }, [properties, activeType, searchQuery, selectedDestination]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setActiveType(undefined);
    setSearchQuery("");
    setSelectedDestination("");
    setCurrentPage(1);
  };

  return {
    activeType,
    setActiveType,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedDestination,
    setSelectedDestination,
    filteredProperties,
    paginatedProperties,
    totalPages,
    resetFilters,
  };
}
