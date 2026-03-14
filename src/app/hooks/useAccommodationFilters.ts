/**
 * Custom hook for managing accommodation archive filters.
 *
 * Composes useArchiveFilters for shared search/URL/pagination plumbing
 * and adds accommodation-specific type, destination, and facility filters.
 *
 * @module useAccommodationFilters
 * @category hooks
 */

import { useState, useMemo, useEffect, useCallback } from "react";
import type { Accommodation } from "../data/types";
import { FACILITIES } from "../data/taxonomies/facilities";
import { useArchiveFilters } from "./useArchiveFilters";
import { useResultsAnnouncement } from "./useResultsAnnouncement";

/**
 * Reads facility IDs from the `?facilities=` query parameter.
 * Expects a comma-separated list of facility slugs.
 */
function parseFacilitiesFromURL(searchParams: URLSearchParams): string[] {
  const raw = searchParams.get("facilities");
  if (!raw) return [];
  const slugs = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return slugs
    .map((slug) => FACILITIES.find((f) => f.slug === slug)?.id)
    .filter(Boolean) as string[];
}

/**
 * useAccommodationFilters hook.
 *
 * @param {Accommodation[]} properties - The full list of accommodations to filter.
 * @param {number} itemsPerPage - Number of items to display per page.
 */
export function useAccommodationFilters(
  properties: Accommodation[],
  itemsPerPage: number = 12
) {
  const base = useArchiveFilters({ itemsPerPage });

  const [activeType, setActiveType] = useState<string | undefined>(
    () => base.searchParams.get("type") || undefined
  );
  const [selectedDestination, setSelectedDestination] = useState<string>(
    () => base.searchParams.get("destination") || ""
  );
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    () => parseFacilitiesFromURL(base.searchParams)
  );

  // ── Sync all filters → URL query params (single effect) ───────────
  useEffect(() => {
    const slugs = selectedFacilities
      .map((id) => FACILITIES.find((f) => f.id === id)?.slug)
      .filter(Boolean) as string[];

    base.setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      base.applyBaseParams(next);

      if (slugs.length > 0) {
        next.set("facilities", slugs.join(","));
      } else {
        next.delete("facilities");
      }

      if (activeType) {
        next.set("type", activeType);
      } else {
        next.delete("type");
      }

      if (selectedDestination) {
        next.set("destination", selectedDestination);
      } else {
        next.delete("destination");
      }

      return next;
    }, { replace: true });
  }, [
    selectedFacilities,
    activeType,
    base.debouncedSearchQuery,
    selectedDestination,
    base.currentPage,
    base.setSearchParams,
    base.applyBaseParams,
  ]);

  // ── Filtering ─────────────────────────────────────────────────────
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesType =
        !activeType || property.accommodationType === activeType;
      const matchesSearch =
        !base.searchQuery ||
        property.title
          .toLowerCase()
          .includes(base.searchQuery.toLowerCase()) ||
        property.excerpt
          .toLowerCase()
          .includes(base.searchQuery.toLowerCase());
      const matchesDestination =
        !selectedDestination ||
        property.destinations.includes(selectedDestination);

      // Facility filter: property must appear in ALL selected facility accommodationIds
      const matchesFacilities =
        selectedFacilities.length === 0 ||
        selectedFacilities.every((facilityId) => {
          const facility = FACILITIES.find((f) => f.id === facilityId);
          return facility
            ? facility.accommodationIds.includes(property.id)
            : true;
        });

      return (
        matchesType && matchesSearch && matchesDestination && matchesFacilities
      );
    });
  }, [
    properties,
    activeType,
    base.searchQuery,
    selectedDestination,
    selectedFacilities,
  ]);

  const { paginatedItems: paginatedProperties, totalPages } =
    base.paginate(filteredProperties);

  // ── Screen-reader announcement after filtering settles ────────────
  useResultsAnnouncement(filteredProperties.length, properties.length, "properties");

  const toggleFacility = useCallback(
    (facilityId: string) => {
      setSelectedFacilities((prev) =>
        prev.includes(facilityId)
          ? prev.filter((id) => id !== facilityId)
          : [...prev, facilityId]
      );
      base.resetPage();
    },
    [base.resetPage]
  );

  const resetFilters = useCallback(() => {
    setActiveType(undefined);
    base.setSearchQuery("");
    setSelectedDestination("");
    setSelectedFacilities([]);
    base.resetPage();
  }, [base.setSearchQuery, base.resetPage]);

  const activeFilterCount =
    (base.searchQuery ? 1 : 0) +
    (activeType ? 1 : 0) +
    (selectedDestination ? 1 : 0) +
    selectedFacilities.length;

  return {
    activeType,
    setActiveType,
    currentPage: base.currentPage,
    setCurrentPage: base.setCurrentPage,
    resetPage: base.resetPage,
    searchQuery: base.searchQuery,
    setSearchQuery: base.setSearchQuery,
    flushSearch: base.flushSearch,
    selectedDestination,
    setSelectedDestination,
    selectedFacilities,
    toggleFacility,
    filteredProperties,
    paginatedProperties,
    totalPages,
    resetFilters,
    activeFilterCount,
  };
}