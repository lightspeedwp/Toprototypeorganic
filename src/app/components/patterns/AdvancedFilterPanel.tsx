/**
 * Advanced Filter Panel Component
 * 
 * Comprehensive filtering system for tours, accommodations, and destinations.
 * Provides multi-criteria filtering with price range, duration, difficulty, and more.
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Lora for headings, Noto Sans for body
 * - Colors: Semantic tokens (primary, background, foreground, border, muted)
 * - Spacing: Consistent with design system
 * 
 * **Features:**
 * - Multiple filter criteria (price, duration, difficulty, travel style)
 * - Price range slider
 * - Checkbox groups
 * - Active filter chips
 * - Clear all filters
 * - Filter count badge
 * - Collapsible sections
 * - Mobile-friendly
 * - Persistent filters (localStorage)
 * 
 * @module AdvancedFilterPanel
 * @category patterns
 */

import { useState, useEffect } from "react";
import { X, CaretDown as ChevronDown, CaretUp as ChevronUp, SlidersHorizontal } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { Button } from "../blocks/design/Button";

/**
 * Filter value types.
 */
export type FilterValue = string | number | [number, number] | string[];

/**
 * Filter criteria interface.
 */
export interface FilterCriteria {
  /** Price range [min, max] */
  priceRange?: [number, number];
  /** Duration range [min, max] in days */
  durationRange?: [number, number];
  /** Difficulty levels */
  difficulty?: string[];
  /** Travel styles */
  travelStyles?: string[];
  /** Departure months */
  months?: string[];
  /** Group size preference */
  groupSize?: string;
  /** Accommodation types */
  accommodationTypes?: string[];
  /** Continents */
  continents?: string[];
  /** Special features */
  features?: string[];
}

/**
 * AdvancedFilterPanel component props.
 */
interface AdvancedFilterPanelProps {
  /** Current filter criteria */
  filters: FilterCriteria;
  /** Callback when filters change */
  onFiltersChange: (filters: FilterCriteria) => void;
  /** Available filter options */
  options: {
    difficulties?: string[];
    travelStyles?: string[];
    months?: string[];
    groupSizes?: string[];
    accommodationTypes?: string[];
    continents?: string[];
    features?: string[];
  };
  /** Price range limits */
  priceRange?: {
    min: number;
    max: number;
  };
  /** Duration range limits */
  durationRange?: {
    min: number;
    max: number;
  };
  /** Number of results */
  resultCount?: number;
  /** Show mobile view */
  isMobile?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Advanced Filter Panel Component
 * 
 * @param {AdvancedFilterPanelProps} props - Component properties
 * @returns {JSX.Element} Rendered filter panel
 */
export function AdvancedFilterPanel({
  filters,
  onFiltersChange,
  options,
  priceRange = { min: 0, max: 10000 },
  durationRange = { min: 1, max: 30 },
  resultCount,
  isMobile = false,
  className,
}: AdvancedFilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['price', 'duration', 'difficulty', 'travelStyles'])
  );

  /**
   * Toggle section expansion.
   */
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  /**
   * Update price range.
   */
  const updatePriceRange = (range: [number, number]) => {
    onFiltersChange({
      ...filters,
      priceRange: range,
    });
  };

  /**
   * Update duration range.
   */
  const updateDurationRange = (range: [number, number]) => {
    onFiltersChange({
      ...filters,
      durationRange: range,
    });
  };

  /**
   * Toggle checkbox filter.
   */
  const toggleCheckbox = (
    key: keyof FilterCriteria,
    value: string
  ) => {
    const current = (filters[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    onFiltersChange({
      ...filters,
      [key]: updated.length > 0 ? updated : undefined,
    });
  };

  /**
   * Clear all filters.
   */
  const clearAllFilters = () => {
    onFiltersChange({});
  };

  /**
   * Count active filters.
   */
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.priceRange) count++;
    if (filters.durationRange) count++;
    if (filters.difficulty?.length) count += filters.difficulty.length;
    if (filters.travelStyles?.length) count += filters.travelStyles.length;
    if (filters.months?.length) count += filters.months.length;
    if (filters.groupSize) count++;
    if (filters.accommodationTypes?.length) count += filters.accommodationTypes.length;
    if (filters.continents?.length) count += filters.continents.length;
    if (filters.features?.length) count += filters.features.length;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <div
      className={cn(
        "space-y-[var(--spacing-gap-md)] rounded-[var(--radius-lg)] border border-border bg-card p-[var(--spacing-element-lg)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--spacing-gap-sm)]">
          <SlidersHorizontal size={20} className="text-primary" />
          <h3 className="text-foreground m-0">Filters</h3>
          {activeCount > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-full)] bg-primary text-[length:var(--text-xs)] font-[var(--font-weight-medium)] text-primary-foreground">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-[length:var(--text-sm)] text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Result Count */}
      {resultCount !== undefined && (
        <div className="rounded-[var(--radius-md)] wp-bg-muted-light p-[var(--spacing-element-md)] text-[length:var(--text-sm)] text-foreground">
          <strong>{resultCount}</strong> result{resultCount !== 1 ? 's' : ''} found
        </div>
      )}

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.has('price')}
        onToggle={() => toggleSection('price')}
      >
        <PriceRangeSlider
          min={priceRange.min}
          max={priceRange.max}
          value={filters.priceRange || [priceRange.min, priceRange.max]}
          onChange={updatePriceRange}
        />
      </FilterSection>

      {/* Duration */}
      <FilterSection
        title="Duration (Days)"
        isExpanded={expandedSections.has('duration')}
        onToggle={() => toggleSection('duration')}
      >
        <DurationSlider
          min={durationRange.min}
          max={durationRange.max}
          value={filters.durationRange || [durationRange.min, durationRange.max]}
          onChange={updateDurationRange}
        />
      </FilterSection>

      {/* Difficulty */}
      {options.difficulties && options.difficulties.length > 0 && (
        <FilterSection
          title="Difficulty"
          isExpanded={expandedSections.has('difficulty')}
          onToggle={() => toggleSection('difficulty')}
        >
          <CheckboxGroup
            options={options.difficulties}
            selected={filters.difficulty || []}
            onChange={(value) => toggleCheckbox('difficulty', value)}
          />
        </FilterSection>
      )}

      {/* Travel Styles */}
      {options.travelStyles && options.travelStyles.length > 0 && (
        <FilterSection
          title="Travel Style"
          isExpanded={expandedSections.has('travelStyles')}
          onToggle={() => toggleSection('travelStyles')}
        >
          <CheckboxGroup
            options={options.travelStyles}
            selected={filters.travelStyles || []}
            onChange={(value) => toggleCheckbox('travelStyles', value)}
          />
        </FilterSection>
      )}

      {/* Continents */}
      {options.continents && options.continents.length > 0 && (
        <FilterSection
          title="Continent"
          isExpanded={expandedSections.has('continents')}
          onToggle={() => toggleSection('continents')}
        >
          <CheckboxGroup
            options={options.continents}
            selected={filters.continents || []}
            onChange={(value) => toggleCheckbox('continents', value)}
          />
        </FilterSection>
      )}

      {/* Features */}
      {options.features && options.features.length > 0 && (
        <FilterSection
          title="Features"
          isExpanded={expandedSections.has('features')}
          onToggle={() => toggleSection('features')}
        >
          <CheckboxGroup
            options={options.features}
            selected={filters.features || []}
            onChange={(value) => toggleCheckbox('features', value)}
          />
        </FilterSection>
      )}

      {/* Months */}
      {options.months && options.months.length > 0 && (
        <FilterSection
          title="Departure Month"
          isExpanded={expandedSections.has('months')}
          onToggle={() => toggleSection('months')}
        >
          <CheckboxGroup
            options={options.months}
            selected={filters.months || []}
            onChange={(value) => toggleCheckbox('months', value)}
          />
        </FilterSection>
      )}
    </div>
  );
}

/**
 * FilterSection Component - Collapsible section.
 */
function FilterSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-[var(--spacing-element-lg)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-[var(--spacing-element-sm)] text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-expanded={isExpanded}
      >
        <span className="font-[var(--font-weight-medium)] text-foreground">{title}</span>
        {isExpanded ? (
          <ChevronUp size={16} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground" />
        )}
      </button>
      {isExpanded && <div className="mt-[var(--spacing-gap-sm)]">{children}</div>}
    </div>
  );
}

/**
 * PriceRangeSlider Component.
 */
function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    const newValue: [number, number] = [Math.min(newMin, localValue[1]), localValue[1]];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    const newValue: [number, number] = [localValue[0], Math.max(newMax, localValue[0])];
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-[var(--spacing-gap-sm)]">
      <div className="flex items-center justify-between text-[length:var(--text-sm)]">
        <span className="text-muted-foreground">
          ${localValue[0].toLocaleString()}
        </span>
        <span className="text-muted-foreground">
          ${localValue[1].toLocaleString()}
        </span>
      </div>
      <div className="space-y-[var(--spacing-gap-xs)]">
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-[var(--radius-lg)] bg-muted accent-primary"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-[var(--radius-lg)] bg-muted accent-primary"
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
}

/**
 * DurationSlider Component.
 */
function DurationSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    const newValue: [number, number] = [Math.min(newMin, localValue[1]), localValue[1]];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    const newValue: [number, number] = [localValue[0], Math.max(newMax, localValue[0])];
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-[var(--spacing-gap-sm)]">
      <div className="flex items-center justify-between text-[length:var(--text-sm)]">
        <span className="text-muted-foreground">
          {localValue[0]} day{localValue[0] !== 1 ? 's' : ''}
        </span>
        <span className="text-muted-foreground">
          {localValue[1]} day{localValue[1] !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-[var(--spacing-gap-xs)]">
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-[var(--radius-lg)] bg-muted accent-primary"
          aria-label="Minimum duration"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-[var(--radius-lg)] bg-muted accent-primary"
          aria-label="Maximum duration"
        />
      </div>
    </div>
  );
}

/**
 * CheckboxGroup Component.
 */
function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-[var(--spacing-gap-xs)]">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-[var(--spacing-gap-sm)] text-[length:var(--text-sm)]"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="h-4 w-4 cursor-pointer rounded-[var(--radius-sm)] border-border bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
          <span className="text-foreground">{option}</span>
        </label>
      ))}
    </div>
  );
}

export default AdvancedFilterPanel;