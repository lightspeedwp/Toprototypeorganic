/**
 * Active Filter Chips Component
 * 
 * Displays currently active filters as removable chips/tags.
 * Provides quick visual feedback and one-click filter removal.
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Noto Sans for chip text
 * - Colors: Semantic tokens (primary, background, foreground, border)
 * - Spacing: Consistent with design system
 * 
 * **Features:**
 * - Display active filters as chips
 * - Remove individual filters
 * - Clear all filters
 * - Filter count badge
 * - Responsive wrapping
 * - Icon support
 * 
 * @module ActiveFilterChips
 * @category patterns
 */

import { X } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { FilterCriteria } from "./AdvancedFilterPanel";
import { Button } from "../blocks/design/Button";

/**
 * ActiveFilterChips component props.
 */
interface ActiveFilterChipsProps {
  /** Current filter criteria */
  filters: FilterCriteria;
  /** Callback to remove a specific filter */
  onRemoveFilter: (key: keyof FilterCriteria, value?: string) => void;
  /** Callback to clear all filters */
  onClearAll: () => void;
  /** Show "Clear All" button */
  showClearAll?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Active Filter Chips Component
 * 
 * @param {ActiveFilterChipsProps} props - Component properties
 * @returns {JSX.Element | null} Rendered filter chips or null if no filters
 */
export function ActiveFilterChips({
  filters,
  onRemoveFilter,
  onClearAll,
  showClearAll = true,
  className,
}: ActiveFilterChipsProps) {
  /**
   * Convert filters to chip array.
   */
  const getFilterChips = () => {
    const chips: Array<{
      key: keyof FilterCriteria;
      label: string;
      value?: string;
    }> = [];

    // Price Range
    if (filters.priceRange) {
      chips.push({
        key: 'priceRange',
        label: `$${filters.priceRange[0].toLocaleString()} - $${filters.priceRange[1].toLocaleString()}`,
      });
    }

    // Duration Range
    if (filters.durationRange) {
      chips.push({
        key: 'durationRange',
        label: `${filters.durationRange[0]}-${filters.durationRange[1]} days`,
      });
    }

    // Difficulty
    if (filters.difficulty && filters.difficulty.length > 0) {
      filters.difficulty.forEach((value) => {
        chips.push({
          key: 'difficulty',
          label: value,
          value,
        });
      });
    }

    // Travel Styles
    if (filters.travelStyles && filters.travelStyles.length > 0) {
      filters.travelStyles.forEach((value) => {
        chips.push({
          key: 'travelStyles',
          label: value,
          value,
        });
      });
    }

    // Months
    if (filters.months && filters.months.length > 0) {
      filters.months.forEach((value) => {
        chips.push({
          key: 'months',
          label: value,
          value,
        });
      });
    }

    // Group Size
    if (filters.groupSize) {
      chips.push({
        key: 'groupSize',
        label: filters.groupSize,
      });
    }

    // Accommodation Types
    if (filters.accommodationTypes && filters.accommodationTypes.length > 0) {
      filters.accommodationTypes.forEach((value) => {
        chips.push({
          key: 'accommodationTypes',
          label: value,
          value,
        });
      });
    }

    // Continents
    if (filters.continents && filters.continents.length > 0) {
      filters.continents.forEach((value) => {
        chips.push({
          key: 'continents',
          label: value,
          value,
        });
      });
    }

    // Features
    if (filters.features && filters.features.length > 0) {
      filters.features.forEach((value) => {
        chips.push({
          key: 'features',
          label: value,
          value,
        });
      });
    }

    return chips;
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[length:var(--text-sm)] text-foreground font-bold">
          Active Filters ({chips.length})
        </p>
        {showClearAll && chips.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-[length:var(--text-sm)] text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <FilterChip
            key={`${chip.key}-${chip.value || index}`}
            label={chip.label}
            onRemove={() => onRemoveFilter(chip.key, chip.value)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * FilterChip Component - Individual filter chip.
 */
function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-full)] border border-primary wp-bg-primary-light wp-bg-primary-hover px-3 py-1.5 text-[length:var(--text-sm)] text-foreground transition-colors"
      )}
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="flex h-4 w-4 items-center justify-center rounded-[var(--radius-full)] transition-colors hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
        aria-label={`Remove ${label} filter`}
      >
        <X size={12} />
      </button>
    </div>
  );
}

/**
 * useFilterChips Hook
 * 
 * Custom hook for managing filter chip state.
 * 
 * @param initialFilters - Initial filter criteria
 * @returns Filter state and control methods
 */
export function useFilterChips(initialFilters: FilterCriteria = {}) {
  const [filters, setFilters] = React.useState<FilterCriteria>(initialFilters);

  /**
   * Remove a specific filter.
   */
  const removeFilter = (key: keyof FilterCriteria, value?: string) => {
    setFilters((prev) => {
      const next = { ...prev };

      if (value && Array.isArray(next[key])) {
        // Remove specific value from array
        const updated = (next[key] as string[]).filter((v) => v !== value);
        if (updated.length > 0) {
          next[key] = updated as any;
        } else {
          delete next[key];
        }
      } else {
        // Remove entire filter
        delete next[key];
      }

      return next;
    });
  };

  /**
   * Clear all filters.
   */
  const clearAllFilters = () => {
    setFilters({});
  };

  /**
   * Update filters.
   */
  const updateFilters = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  return {
    filters,
    removeFilter,
    clearAllFilters,
    updateFilters,
  };
}

export default ActiveFilterChips;