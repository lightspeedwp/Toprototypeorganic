/**
 * Sort Dropdown Component
 * 
 * Dropdown menu for sorting tour/accommodation results.
 * Provides multiple sort options with visual indicators.
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Noto Sans for options
 * - Colors: Semantic tokens (primary, background, foreground, border)
 * - Spacing: Consistent with design system
 * 
 * **Features:**
 * - Multiple sort options
 * - Visual active indicator
 * - Keyboard navigation
 * - Accessible dropdown
 * - Mobile-friendly
 * 
 * @module SortDropdown
 * @category patterns
 */

import { useState, useRef, useEffect } from "react";
import { ArrowsDownUp as ArrowUpDown, Check } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Sort option interface.
 */
export interface SortOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
}

/**
 * SortDropdown component props.
 */
interface SortDropdownProps {
  /** Available sort options */
  options: SortOption[];
  /** Currently selected option */
  value: string;
  /** Callback when sort changes */
  onChange: (value: string) => void;
  /** Button label */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Sort Dropdown Component
 * 
 * @param {SortDropdownProps} props - Component properties
 * @returns {JSX.Element} Rendered sort dropdown
 * 
 * @example
 * ```tsx
 * const sortOptions = [
 *   { value: 'popular', label: 'Most Popular' },
 *   { value: 'price-low', label: 'Price: Low to High' },
 *   { value: 'price-high', label: 'Price: High to Low' },
 *   { value: 'duration-short', label: 'Duration: Shortest First' },
 *   { value: 'duration-long', label: 'Duration: Longest First' },
 * ];
 * 
 * <SortDropdown
 *   options={sortOptions}
 *   value={sortBy}
 *   onChange={setSortBy}
 * />
 * ```
 */
export function SortDropdown({
  options,
  value,
  onChange,
  label = "Sort by",
  className,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Close dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  /**
   * Handle keyboard navigation.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  /**
   * Handle option select.
   */
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  /**
   * Get current option label.
   */
  const currentOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("wp-pattern-lts-sort-dropdown", className)} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "wp-pattern-lts-sort-dropdown__button",
          isOpen && "wp-pattern-lts-sort-dropdown__button--open"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <ArrowUpDown className="wp-pattern-lts-sort-dropdown__icon" />
        <span>
          {label}: {currentOption?.label || 'Select'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="wp-pattern-lts-sort-dropdown__menu"
          role="listbox"
        >
          <div className="p-element-xs">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "wp-pattern-lts-sort-dropdown__option",
                    isSelected && "wp-pattern-lts-sort-dropdown__option--selected"
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="wp-pattern-lts-sort-dropdown__option-content">
                    <div className="wp-pattern-lts-sort-dropdown__option-label">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="wp-pattern-lts-sort-dropdown__option-description">
                        {option.description}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="wp-pattern-lts-sort-dropdown__check-icon" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Common sort options for tours.
 */
export const TOUR_SORT_OPTIONS: SortOption[] = [
  {
    value: 'popular',
    label: 'Most Popular',
    description: 'Based on bookings and reviews',
  },
  {
    value: 'price-low',
    label: 'Price: Low to High',
    description: 'Cheapest tours first',
  },
  {
    value: 'price-high',
    label: 'Price: High to Low',
    description: 'Most expensive tours first',
  },
  {
    value: 'duration-short',
    label: 'Duration: Shortest First',
    description: 'Quick getaways first',
  },
  {
    value: 'duration-long',
    label: 'Duration: Longest First',
    description: 'Extended adventures first',
  },
  {
    value: 'rating',
    label: 'Highest Rated',
    description: 'Best reviews first',
  },
  {
    value: 'newest',
    label: 'Newest First',
    description: 'Latest tours first',
  },
];

/**
 * Common sort options for accommodations.
 */
export const ACCOMMODATION_SORT_OPTIONS: SortOption[] = [
  {
    value: 'popular',
    label: 'Most Popular',
    description: 'Based on bookings',
  },
  {
    value: 'price-low',
    label: 'Price: Low to High',
    description: 'Budget options first',
  },
  {
    value: 'price-high',
    label: 'Price: High to Low',
    description: 'Luxury options first',
  },
  {
    value: 'rating',
    label: 'Highest Rated',
    description: 'Best reviews first',
  },
  {
    value: 'name',
    label: 'Alphabetical',
    description: 'A to Z',
  },
];

/**
 * useSortState Hook
 * 
 * Custom hook for managing sort state.
 * 
 * @param defaultSort - Default sort value
 * @returns Sort state and setter
 */
export function useSortState(defaultSort: string = 'popular') {
  const [sortBy, setSortBy] = useState(defaultSort);

  return {
    sortBy,
    setSortBy,
  };
}

/**
 * sortItems utility function
 * 
 * Sort an array of items based on sort criteria.
 * 
 * @param items - Array of items to sort
 * @param sortBy - Sort criteria
 * @returns Sorted array
 */
export function sortItems<T extends Record<string, any>>(
  items: T[],
  sortBy: string
): T[] {
  const sorted = [...items];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));

    case 'price-high':
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));

    case 'duration-short':
      return sorted.sort((a, b) => {
        const aDuration = typeof a.duration === 'string'
          ? parseInt(a.duration)
          : a.duration || 0;
        const bDuration = typeof b.duration === 'string'
          ? parseInt(b.duration)
          : b.duration || 0;
        return aDuration - bDuration;
      });

    case 'duration-long':
      return sorted.sort((a, b) => {
        const aDuration = typeof a.duration === 'string'
          ? parseInt(a.duration)
          : a.duration || 0;
        const bDuration = typeof b.duration === 'string'
          ? parseInt(b.duration)
          : b.duration || 0;
        return bDuration - aDuration;
      });

    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    case 'newest':
      return sorted.sort((a, b) => {
        const aDate = new Date(a.createdAt || 0).getTime();
        const bDate = new Date(b.createdAt || 0).getTime();
        return bDate - aDate;
      });

    case 'name':
      return sorted.sort((a, b) =>
        (a.title || a.name || '').localeCompare(b.title || b.name || '')
      );

    case 'popular':
    default:
      return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
}

export default SortDropdown;