/**
 * Dev Tool Filter Controls Component
 * 
 * Standardized filtering interface for developer tool pages.
 * Provides consistent filtering UI with mobile-friendly popover.
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * 
 * **Features:**
 * - Mobile: Popover with filter button
 * - Desktop: Inline filter controls
 * - Category/status/search filtering
 * - Results count display
 * - Clear filters action
 * 
 * @module DevToolFilterControls
 * @category common
 */

import React, { useState } from 'react';
import { Funnel as Filter, X } from '@phosphor-icons/react';

/**
 * Filter option interface for dropdowns.
 */
export interface FilterOption {
  /** Option value */
  value: string;
  
  /** Display label */
  label: string;
}

/**
 * DevToolFilterControls props.
 */
export interface DevToolFilterControlsProps {
  /** Search query value */
  searchQuery?: string;
  
  /** Search query change handler */
  onSearchChange?: (query: string) => void;
  
  /** Category filter value */
  categoryFilter?: string;
  
  /** Category filter options */
  categoryOptions?: FilterOption[];
  
  /** Category filter change handler */
  onCategoryChange?: (category: string) => void;
  
  /** Status filter value */
  statusFilter?: string;
  
  /** Status filter options */
  statusOptions?: FilterOption[];
  
  /** Status filter change handler */
  onStatusChange?: (status: string) => void;
  
  /** Total items count */
  totalCount: number;
  
  /** Filtered items count */
  filteredCount: number;
  
  /** Item type label (singular, e.g., "component", "template") */
  itemType?: string;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Dev Tool Filter Controls component.
 * 
 * Provides standardized filtering interface for developer tools
 * with mobile-responsive design and popover functionality.
 * 
 * @component
 * @category common
 * 
 * @example
 * ```tsx
 * <DevToolFilterControls
 *   searchQuery={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   categoryFilter={category}
 *   categoryOptions={[
 *     { value: 'all', label: 'All Categories' },
 *     { value: 'patterns', label: 'Patterns' }
 *   ]}
 *   onCategoryChange={setCategory}
 *   totalCount={27}
 *   filteredCount={15}
 *   itemType="component"
 * />
 * ```
 * 
 * @param {DevToolFilterControlsProps} props - Component props
 * @returns {JSX.Element} Rendered filter controls
 */
export function DevToolFilterControls({
  searchQuery = '',
  onSearchChange,
  categoryFilter = 'all',
  categoryOptions = [],
  onCategoryChange,
  statusFilter = 'all',
  statusOptions = [],
  onStatusChange,
  totalCount,
  filteredCount,
  itemType = 'item',
  className = ''
}: DevToolFilterControlsProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const hasActiveFilters = 
    searchQuery !== '' || 
    categoryFilter !== 'all' || 
    statusFilter !== 'all';

  const clearFilters = () => {
    if (onSearchChange) onSearchChange('');
    if (onCategoryChange) onCategoryChange('all');
    if (onStatusChange) onStatusChange('all');
    setIsMobileFilterOpen(false);
  };

  const renderFilters = () => (
    <>
      {/* Search Input */}
      {onSearchChange && (
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="search-input"
            className="sr-only"
          >
            Search {itemType}s
          </label>
          <input
            id="search-input"
            type="text"
            placeholder={`Search ${itemType}s...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-sans text-fluid-sm font-normal"
          />
        </div>
      )}

      {/* Category Filter */}
      {onCategoryChange && categoryOptions.length > 0 && (
        <div className="min-w-[180px]">
          <label
            htmlFor="category-filter"
            className="sr-only"
          >
            Filter by category
          </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer font-sans text-fluid-sm font-normal"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Status Filter */}
      {onStatusChange && statusOptions.length > 0 && (
        <div className="min-w-[180px]">
          <label
            htmlFor="status-filter"
            className="sr-only"
          >
            Filter by status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer font-sans text-fluid-sm font-normal"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors font-sans text-fluid-sm font-medium"
        >
          Clear Filters
        </button>
      )}
    </>
  );

  return (
    <div className={`pb-8 ${className}`}>
      {/* Mobile Filter Button */}
      <div className="md:hidden pb-4">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted border border-border rounded-lg hover:bg-muted/80 transition-colors font-sans text-fluid-sm font-medium"
          aria-expanded={isMobileFilterOpen}
          aria-controls="mobile-filters"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="pl-1 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
              Active
            </span>
          )}
        </button>

        {/* Mobile Filter Popover */}
        {isMobileFilterOpen && (
          <div
            id="mobile-filters"
            className="pt-4 bg-card border border-border rounded-lg shadow-lg flex flex-col gap-4 p-4"
          >
            <div className="flex items-center justify-between pb-4">
              <h3
                className="font-serif text-fluid-lg font-semibold"
              >
                Filter Options
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-md hover:bg-muted transition-colors"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {renderFilters()}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Filters (Inline) */}
      <div className="hidden md:flex md:flex-wrap md:items-center md:gap-4">
        {renderFilters()}
      </div>

      {/* Results Count */}
      <div
        className="pt-4 text-center md:text-right text-muted-foreground font-sans text-fluid-sm font-normal"
        role="status"
        aria-live="polite"
      >
        Showing {filteredCount} of {totalCount} {itemType}
        {filteredCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

DevToolFilterControls.displayName = 'DevToolFilterControls';