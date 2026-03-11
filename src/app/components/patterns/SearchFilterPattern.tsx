/**
 * Search Filter Pattern Component
 * 
 * Advanced search and filtering interface for archive pages.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState } from "react";
import { Container } from "../common/Container";
import { MagnifyingGlass as Search, SlidersHorizontal, X } from "@phosphor-icons/react";
import { Input } from "../blocks/ui/input";
import { Label } from "../blocks/ui/label";
import { Button } from "../blocks/design/Button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../blocks/ui/select";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export interface FilterOption {
  id: string;
  label: string;
  type: 'search' | 'select' | 'multiselect';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface SearchFilterPatternProps {
  filters?: FilterOption[];
  variant?: 'default' | 'compact';
  collapsible?: boolean;
  onFilterChange?: (filters: Record<string, any>) => void;
  onSearch?: (filters: Record<string, any>) => void;
  sticky?: boolean;
  className?: string;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  activeFiltersCount?: number;
  onClearFilters?: () => void;
  onClearAll?: () => void;
}

export function SearchFilterPattern({
  filters = [],
  variant = 'default',
  collapsible = false,
  onFilterChange,
  sticky = true,
  className,
  searchPlaceholder,
  onSearchChange,
  activeFiltersCount,
  onClearFilters,
  onClearAll,
}: SearchFilterPatternProps) {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [isExpanded, setIsExpanded] = useState(!collapsible);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');

  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = { ...filterValues, [filterId]: value };
    setFilterValues(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClear = () => {
    setFilterValues({});
    setInternalSearchQuery('');
    onFilterChange?.({});
    onClearFilters?.();
    onClearAll?.();
  };

  const hasActiveFilters = activeFiltersCount != null
    ? activeFiltersCount > 0
    : Object.values(filterValues).some(v => v) || !!internalSearchQuery;

  return (
    <section 
      className={cn(
        "wp-pattern-lts-filter",
        sticky && "sticky top-0 z-[30] backdrop-blur-xl bg-background/80 border-b-2 border-border/50",
        className
      )}
    >
      <Container>
        <div className="py-[var(--spacing-element-xl)]">
          {/* Main Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-[var(--spacing-gap-lg)]">
            <div className="flex items-center gap-[var(--spacing-gap-md)]">
              {collapsible && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={cn(
                    "rounded-[var(--radius-xl)] gap-[var(--spacing-gap-sm)] px-[var(--spacing-element-lg)] transition-all duration-300 font-[var(--font-weight-bold)]",
                    isExpanded ? "bg-primary text-primary-foreground border-primary" : "bg-card"
                  )}
                >
                  <SlidersHorizontal className="size-4" />
                  <span>{isExpanded ? 'Apply Filters' : 'Refine Selection'}</span>
                </Button>
              )}
              
              {hasActiveFilters && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-[var(--spacing-gap-sm)] px-[var(--spacing-element-md)] py-[var(--spacing-element-sm)] text-[length:var(--text-xs)] uppercase tracking-widest text-destructive hover:bg-destructive/10 rounded-[var(--radius-lg)] transition-all font-[var(--font-weight-bold)]"
                >
                  <X className="size-3" /> Clear Active
                </button>
              )}
            </div>

            {/* Global Search Bar (if provided) */}
            {onSearchChange && (
              <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-[var(--spacing-element-lg)] top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={internalSearchQuery}
                  onChange={(e) => {
                    setInternalSearchQuery(e.target.value);
                    onSearchChange(e.target.value);
                  }}
                  placeholder={searchPlaceholder || 'Search the collection...'}
                  className="w-full pl-[var(--spacing-element-3xl)] pr-[var(--spacing-element-md)] py-[var(--spacing-element-md)] rounded-[var(--radius-2xl)] bg-muted/50 border-2 border-transparent focus:border-primary/20 focus:bg-background transition-all outline-none text-[length:var(--text-sm)] font-[var(--font-weight-bold)]"
                />
              </div>
            )}
          </div>

          {/* Expandable Filter Grid */}
          <AnimatePresence>
            {isExpanded && filters.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-gap-xl)] pt-[var(--spacing-element-xl)] mt-[var(--spacing-gap-lg)] border-t border-border/50">
                  {filters.map((filter) => {
                    const isControlled = filter.value !== undefined && filter.onChange !== undefined;
                    const filterValue = isControlled ? filter.value : (filterValues[filter.id] || '');

                    const handleChange = (value: string) => {
                      if (isControlled && filter.onChange) {
                        filter.onChange(value);
                      } else {
                        handleFilterChange(filter.id, value);
                      }
                    };

                    return (
                      <div key={filter.id} className="space-y-[var(--spacing-gap-sm)]">
                        <Label htmlFor={filter.id} className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-muted-foreground ml-[var(--spacing-element-xs)]">
                          {filter.label}
                        </Label>

                        {filter.type === 'search' && (
                          <div className="relative group">
                            <Search className="absolute left-[var(--spacing-element-md)] top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                            <input
                              id={filter.id}
                              type="search"
                              value={filterValue}
                              onChange={(e) => handleChange(e.target.value)}
                              placeholder={filter.placeholder || 'Keywords...'}
                              className="w-full pl-[var(--spacing-element-2xl)] pr-[var(--spacing-element-md)] py-[var(--spacing-element-sm)] rounded-[var(--radius-xl)] bg-card border-2 border-border focus:border-primary/30 outline-none text-[length:var(--text-sm)] transition-all"
                            />
                          </div>
                        )}

                        {filter.type === 'select' && (
                          <Select value={filterValue} onValueChange={handleChange}>
                            <SelectTrigger id={filter.id} className="w-full bg-card border-2 border-border rounded-[var(--radius-xl)] h-10 font-[var(--font-weight-bold)] text-[length:var(--text-sm)]">
                              <SelectValue placeholder={filter.placeholder || 'Select...'} />
                            </SelectTrigger>
                            <SelectContent className="rounded-[var(--radius-xl)] border-2 border-border shadow-[var(--elevation-xl)]">
                              <SelectItem value="" className="font-[var(--font-weight-bold)] text-[length:var(--text-sm)]">All {filter.label}s</SelectItem>
                              {filter.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="font-[var(--font-weight-medium)] text-[length:var(--text-sm)]">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

export default SearchFilterPattern;
