/**
 * Custom hook for managing destination archive filters.
 *
 * Composes useArchiveFilters for shared search/URL plumbing
 * and adds destination-specific continent filter.
 *
 * @module useDestinationFilters
 * @category hooks
 */

import { useState, useMemo, useEffect, useCallback } from "react";
import type { Destination } from "../data/types";
import { useArchiveFilters } from "./useArchiveFilters";
import { useResultsAnnouncement } from "./useResultsAnnouncement";

/**
 * useDestinationFilters hook.
 *
 * @param {Destination[]} destinations - The full list of destinations to filter.
 */
export function useDestinationFilters(destinations: Destination[]) {
  const base = useArchiveFilters();

  const [selectedContinent, setSelectedContinent] = useState<string>(
    () => base.searchParams.get("continent") || "all"
  );

  // ── Sync all filters → URL query params (single effect) ───────────
  useEffect(() => {
    base.setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      base.applyBaseParams(next);

      if (selectedContinent !== "all") {
        next.set("continent", selectedContinent);
      } else {
        next.delete("continent");
      }

      return next;
    }, { replace: true });
  }, [base.debouncedSearchQuery, selectedContinent, base.setSearchParams, base.applyBaseParams]);

  // ── Filtering ─────────────────────────────────────────────────────
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    if (base.searchQuery) {
      const q = base.searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedContinent !== "all") {
      result = result.filter((d) => d.continentId === selectedContinent);
    }

    return result;
  }, [destinations, base.searchQuery, selectedContinent]);

  // ── Screen-reader announcement after filtering settles ────────────
  useResultsAnnouncement(filteredDestinations.length, destinations.length, "destinations");

  const resetFilters = useCallback(() => {
    base.setSearchQuery("");
    setSelectedContinent("all");
  }, [base.setSearchQuery]);

  const activeFilterCount =
    (base.searchQuery ? 1 : 0) + (selectedContinent !== "all" ? 1 : 0);

  return {
    searchQuery: base.searchQuery,
    setSearchQuery: base.setSearchQuery,
    flushSearch: base.flushSearch,
    resetPage: base.resetPage,
    selectedContinent,
    setSelectedContinent,
    filteredDestinations,
    resetFilters,
    activeFilterCount,
  };
}