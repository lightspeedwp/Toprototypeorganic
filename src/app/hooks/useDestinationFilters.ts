/**
 * Custom hook for managing destination archive filters.
 * 
 * Extracts filtering logic from the ArchiveDestinationTemplate.
 * 
 * @module useDestinationFilters
 * @category hooks
 */

import { useState, useMemo } from "react";
import type { Destination } from "../data/types";

/**
 * useDestinationFilters hook.
 * 
 * @param {Destination[]} destinations - The full list of destinations to filter.
 */
export function useDestinationFilters(destinations: Destination[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<string>("all");

  const filteredDestinations = useMemo(() => {
    let result = [...destinations];
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.title.toLowerCase().includes(q) || 
        d.excerpt.toLowerCase().includes(q)
      );
    }
    
    if (selectedContinent !== "all") {
      result = result.filter(d => d.continentId === selectedContinent);
    }
    
    return result;
  }, [destinations, searchQuery, selectedContinent]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedContinent("all");
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedContinent,
    setSelectedContinent,
    filteredDestinations,
    resetFilters,
  };
}
