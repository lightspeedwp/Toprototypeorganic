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
        <div className="py-6">
          {/* Main Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {collapsible && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={cn(
                    "rounded-xl font-bold gap-2 px-5 transition-all duration-300",
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
                  className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                  <X className="size-3" /> Clear Active
                </button>
              )}
            </div>

            {/* Global Search Bar (if provided) */}
            {onSearchChange && (
              <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={internalSearchQuery}
                  onChange={(e) => {
                    setInternalSearchQuery(e.target.value);
                    onSearchChange(e.target.value);
                  }}
                  placeholder={searchPlaceholder || 'Search the collection...'}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-muted/50 border-2 border-transparent focus:border-primary/20 focus:bg-background transition-all outline-none font-bold text-sm"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 mt-6 border-t border-border/50">
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
                      <div key={filter.id} className="space-y-3">
                        <Label htmlFor={filter.id} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                          {filter.label}
                        </Label>

                        {filter.type === 'search' && (
                          <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                            <input
                              id={filter.id}
                              type="search"
                              value={filterValue}
                              onChange={(e) => handleChange(e.target.value)}
                              placeholder={filter.placeholder || 'Keywords...'}
                              className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border-2 border-border focus:border-primary/30 outline-none text-sm transition-all"
                            />
                          </div>
                        )}

                        {filter.type === 'select' && (
                          <Select value={filterValue} onValueChange={handleChange}>
                            <SelectTrigger id={filter.id} className="w-full bg-card border-2 border-border rounded-xl h-10 font-bold text-sm">
                              <SelectValue placeholder={filter.placeholder || 'Select...'} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-2 border-border shadow-xl">
                              <SelectItem value="" className="font-bold text-sm">All {filter.label}s</SelectItem>
                              {filter.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="font-medium text-sm">
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
