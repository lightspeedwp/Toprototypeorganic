/**
 * Custom hook for managing tour archive filters.
 *
 * Composes useArchiveFilters for shared search/URL plumbing
 * and adds tour-specific style, duration, and sort filters.
 *
 * @module useTourFilters
 * @category hooks
 */

import { useState, useMemo, useEffect, useCallback } from "react";
import type { Tour } from "../data/types";
import { useArchiveFilters } from "./useArchiveFilters";
import { useResultsAnnouncement } from "./useResultsAnnouncement";

export type SortOption =
  | "popularity"
  | "price-low"
  | "price-high"
  | "duration"
  | "rating";

export interface DurationOption {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const DURATION_OPTIONS: DurationOption[] = [
  { id: "short", label: "1-3 Days", min: 1, max: 3 },
  { id: "medium", label: "4-7 Days", min: 4, max: 7 },
  { id: "long", label: "8-14 Days", min: 8, max: 14 },
  { id: "extended", label: "15+ Days", min: 15, max: 999 },
];

function parseDurationDays(duration: string | { days: number }): number {
  if (typeof duration === "object" && "days" in duration) return duration.days;
  const match = String(duration).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function parsePriceValue(price: string | number): number {
  if (typeof price === "number") return price;
  const match = String(price).replace(/,/g, "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function parseStylesFromURL(searchParams: URLSearchParams): string[] {
  const raw = searchParams.get("styles");
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim().replace(/-/g, " "))
    .filter(Boolean);
}

function parseDurationsFromURL(searchParams: URLSearchParams): string[] {
  const raw = searchParams.get("durations");
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => DURATION_OPTIONS.some((o) => o.id === s));
}

function parseSortFromURL(searchParams: URLSearchParams): SortOption {
  const raw = searchParams.get("sort");
  const valid: SortOption[] = [
    "popularity",
    "price-low",
    "price-high",
    "duration",
    "rating",
  ];
  return valid.includes(raw as SortOption)
    ? (raw as SortOption)
    : "popularity";
}

/**
 * useTourFilters hook.
 *
 * @param {Tour[]} tours - The full list of tours to filter.
 */
export function useTourFilters(tours: Tour[]) {
  const base = useArchiveFilters();

  const [selectedStyles, setSelectedStyles] = useState<string[]>(() =>
    parseStylesFromURL(base.searchParams)
  );
  const [selectedDurations, setSelectedDurations] = useState<string[]>(() =>
    parseDurationsFromURL(base.searchParams)
  );
  const [sortBy, setSortBy] = useState<SortOption>(() =>
    parseSortFromURL(base.searchParams)
  );
  const [showFilters, setShowFilters] = useState(false);

  // ── Sync all filters → URL query params (single effect) ───────────
  useEffect(() => {
    base.setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      base.applyBaseParams(next);

      if (selectedStyles.length > 0) {
        next.set(
          "styles",
          selectedStyles
            .map((s) => s.replace(/\s+/g, "-").toLowerCase())
            .join(",")
        );
      } else {
        next.delete("styles");
      }

      if (selectedDurations.length > 0) {
        next.set("durations", selectedDurations.join(","));
      } else {
        next.delete("durations");
      }

      if (sortBy !== "popularity") {
        next.set("sort", sortBy);
      } else {
        next.delete("sort");
      }

      return next;
    }, { replace: true });
  }, [
    selectedStyles,
    selectedDurations,
    sortBy,
    base.debouncedSearchQuery,
    base.setSearchParams,
    base.applyBaseParams,
  ]);

  // ── Filtering & sorting ───────────────────────────────────────────
  const filteredAndSortedTours = useMemo(() => {
    let result = [...tours];

    if (base.searchQuery) {
      const q = base.searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedStyles.length > 0) {
      result = result.filter((t) =>
        t.travelStyles.some((s) => selectedStyles.includes(s))
      );
    }

    if (selectedDurations.length > 0) {
      result = result.filter((t) =>
        selectedDurations.some((id) => {
          const opt = DURATION_OPTIONS.find((o) => o.id === id);
          if (!opt) return false;
          const days = parseDurationDays(t.duration);
          return days >= opt.min && days <= opt.max;
        })
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) => parsePriceValue(a.price) - parsePriceValue(b.price)
        );
        break;
      case "price-high":
        result.sort(
          (a, b) => parsePriceValue(b.price) - parsePriceValue(a.price)
        );
        break;
      case "duration":
        result.sort(
          (a, b) =>
            parseDurationDays(a.duration) - parseDurationDays(b.duration)
        );
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [tours, base.searchQuery, selectedStyles, selectedDurations, sortBy]);

  // ── Screen-reader announcement after filtering settles ────────────
  useResultsAnnouncement(filteredAndSortedTours.length, tours.length, "tours");

  const toggleFilter = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      value: string
    ) => {
      setter((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    },
    []
  );

  const resetFilters = useCallback(() => {
    setSelectedStyles([]);
    setSelectedDurations([]);
    base.setSearchQuery("");
  }, [base.setSearchQuery]);

  const activeFilterCount =
    selectedStyles.length +
    selectedDurations.length +
    (base.searchQuery ? 1 : 0);

  return {
    searchQuery: base.searchQuery,
    setSearchQuery: base.setSearchQuery,
    flushSearch: base.flushSearch,
    resetPage: base.resetPage,
    selectedStyles,
    setSelectedStyles,
    selectedDurations,
    setSelectedDurations,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    filteredAndSortedTours,
    toggleFilter,
    resetFilters,
    activeFilterCount,
    durationOptions: DURATION_OPTIONS,
  };
}