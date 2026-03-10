/**
 * Custom hook for managing tour archive filters.
 * 
 * Extracts filtering and sorting logic from the ArchiveTourTemplate
 * to make it reusable and improve maintainability.
 * 
 * @module useTourFilters
 * @category hooks
 */

import { useState, useMemo } from "react";
import type { Tour } from "../data/types";

export type SortOption = "popularity" | "price-low" | "price-high" | "duration" | "rating";

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

/**
 * useTourFilters hook.
 * 
 * @param {Tour[]} tours - The full list of tours to filter.
 */
export function useTourFilters(tours: Tour[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedTours = useMemo(() => {
    let result = [...tours];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedStyles.length > 0) {
      result = result.filter(t => 
        t.travelStyles.some(s => selectedStyles.includes(s))
      );
    }

    if (selectedDurations.length > 0) {
      result = result.filter(t => {
        return selectedDurations.some(id => {
          const opt = DURATION_OPTIONS.find(o => o.id === id);
          if (!opt) return false;
          const days = parseDurationDays(t.duration);
          return days >= opt.min && days <= opt.max;
        });
      });
    }

    switch (sortBy) {
      case "price-low": 
        result.sort((a, b) => parsePriceValue(a.price) - parsePriceValue(b.price)); 
        break;
      case "price-high": 
        result.sort((a, b) => parsePriceValue(b.price) - parsePriceValue(a.price)); 
        break;
      case "duration": 
        result.sort((a, b) => parseDurationDays(a.duration) - parseDurationDays(b.duration)); 
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [tours, searchQuery, selectedStyles, selectedDurations, sortBy]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const resetFilters = () => {
    setSelectedStyles([]);
    setSelectedDurations([]);
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
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
    durationOptions: DURATION_OPTIONS,
  };
}
