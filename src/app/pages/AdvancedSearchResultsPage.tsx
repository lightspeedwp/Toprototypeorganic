/**
 * Enhanced Search Results Page with Advanced Filtering
 * 
 * Complete search and filter experience for tours, destinations, and accommodations.
 * Includes advanced filtering, sorting, active filter chips, and result count.
 * 
 * **WordPress Mapping:**
 * - Template: search.php with advanced filtering
 * - Template hierarchy: search.php → index.php
 * 
 * **Features:**
 * - Advanced filter panel
 * - Sort dropdown
 * - Active filter chips
 * - Filter persistence (localStorage)
 * - Real-time result count
 * - Responsive layout
 * - Empty states
 * 
 * @module AdvancedSearchResultsPage
 * @category pages
 */

import { useState, useEffect, useMemo } from "react";
import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { GroupBlock } from "../components/blocks/design/GroupBlock";
import { SearchBar } from "../components/patterns/SearchBar";
import { AdvancedFilterPanel, FilterCriteria } from "../components/patterns/AdvancedFilterPanel";
import { ActiveFilterChips } from "../components/patterns/ActiveFilterChips";
import { SortDropdown, TOUR_SORT_OPTIONS, sortItems } from "../components/patterns/SortDropdown";
import { CardGrid } from "../components/patterns/CardGrid";
import { TourCard } from "../components/patterns/TourCard";
import { Pagination } from "../components/patterns/Pagination";
import { EmptyStatePattern } from "../components/patterns/EmptyStatePattern";
import { useFilterPersistence, useSortPersistence } from "../hooks/useFilterPersistence";
import { ALL_TOURS as TOURS } from "../data/mockExpanded";
import { SlidersHorizontal, X, MagnifyingGlass as Search } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

/**
 * Advanced Search Results Page Component
 */
export function AdvancedSearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);

  const ITEMS_PER_PAGE = 12;

  // Filter persistence
  const {
    filters,
    updateFilters,
    removeFilter,
    clearFilters,
  } = useFilterPersistence({}, {
    storageKey: 'tour-search-filters',
    enabled: true,
  });

  // Sort persistence
  const { sortBy, setSortBy } = useSortPersistence('popular', 'tour-search-sort');

  /**
   * Filter tours based on criteria.
   */
  const filteredTours = useMemo(() => {
    let results = [...TOURS];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (tour) =>
          tour.title.toLowerCase().includes(query) ||
          tour.destination.toLowerCase().includes(query) ||
          tour.description.toLowerCase().includes(query)
      );
    }

    // Price range filter
    if (filters.priceRange) {
      results = results.filter(
        (tour) =>
          tour.price >= filters.priceRange![0] &&
          tour.price <= filters.priceRange![1]
      );
    }

    // Duration filter
    if (filters.durationRange) {
      results = results.filter((tour) => {
        const duration = parseInt(tour.duration);
        return (
          duration >= filters.durationRange![0] &&
          duration <= filters.durationRange![1]
        );
      });
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      results = results.filter((tour) =>
        filters.difficulty!.includes(tour.difficulty)
      );
    }

    // Travel styles filter
    if (filters.travelStyles && filters.travelStyles.length > 0) {
      results = results.filter((tour) =>
        filters.travelStyles!.some((style) => tour.travelStyle.includes(style))
      );
    }

    // Continents filter
    if (filters.continents && filters.continents.length > 0) {
      results = results.filter((tour) =>
        filters.continents!.includes(tour.continent || '')
      );
    }

    return results;
  }, [searchQuery, filters]);

  /**
   * Sort filtered tours.
   */
  const sortedTours = useMemo(() => {
    return sortItems(filteredTours, sortBy);
  }, [filteredTours, sortBy]);

  /**
   * Paginate results.
   */
  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedTours.slice(startIndex, endIndex);
  }, [sortedTours, currentPage]);

  const totalPages = Math.ceil(sortedTours.length / ITEMS_PER_PAGE);

  /**
   * Reset to page 1 when filters or sort change.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);

  /**
   * Filter options derived from data.
   */
  const filterOptions = {
    difficulties: Array.from(new Set(TOURS.map((t) => t.difficulty))),
    travelStyles: Array.from(
      new Set(TOURS.flatMap((t) => t.travelStyle.split(', ')))
    ),
    continents: Array.from(
      new Set(TOURS.map((t) => t.continent).filter(Boolean))
    ),
  };

  return (
    <PageShell context="search" className="theme-organic">
      <div className="organic-section-top">
        {/* Hero Section */}
        <GroupBlock sectionStyle="section-hero-default">
          <Container className="flex flex-col items-center">
            <div className="max-w-3xl w-full text-center flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Search size={16} />
                Advanced Search
              </div>

              <h1 className="text-foreground">Find Your Perfect Tour</h1>
              <p className="text-lg text-muted-foreground">
                Use our advanced filters to discover tours tailored to your preferences
              </p>

              {/* Search Bar */}
              <div className="w-full">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search tours, destinations, activities..."
                  showSuggestions={false}
                />
              </div>
            </div>
          </Container>
        </GroupBlock>
      </div>

      <div className="organic-section-middle">
        {/* Filter & Results Section */}
        <GroupBlock sectionStyle="section-default">
          <Container className="flex flex-col items-center">
            {/* Filter Toggle (Mobile) */}
            <div className="flex items-center justify-between pb-6 lg:hidden">
              <h2 className="text-foreground">Search Results</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                <SlidersHorizontal size={16} />
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
            {/* Filter Panel */}
            <aside
              className={cn(
                "lg:block",
                showFilters ? "block" : "hidden"
              )}
            >
              <div className="sticky top-4">
                <AdvancedFilterPanel
                  filters={filters}
                  onFiltersChange={updateFilters}
                  options={filterOptions}
                  priceRange={{ min: 0, max: 10000 }}
                  durationRange={{ min: 1, max: 30 }}
                  resultCount={sortedTours.length}
                />
              </div>
            </aside>

            {/* Results */}
            <div className="flex flex-col gap-6">
              {/* Active Filters & Sort */}
              <div className="flex flex-col gap-4">
                {/* Active Filter Chips */}
                <ActiveFilterChips
                  filters={filters}
                  onRemoveFilter={removeFilter}
                  onClearAll={clearFilters}
                />

                {/* Result Count & Sort */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing{' '}
                    <strong className="text-foreground">
                      {paginatedTours.length}
                    </strong>{' '}
                    of{' '}
                    <strong className="text-foreground">
                      {sortedTours.length}
                    </strong>{' '}
                    results
                    {searchQuery && (
                      <span>
                        {' '}
                        for "<strong className="text-foreground">{searchQuery}</strong>"
                      </span>
                    )}
                  </p>

                  <SortDropdown
                    options={TOUR_SORT_OPTIONS}
                    value={sortBy}
                    onChange={setSortBy}
                  />
                </div>
              </div>

              {/* Results Grid */}
              {paginatedTours.length > 0 ? (
                <>
                  <CardGrid columns={3}>
                    {paginatedTours.map((tour) => (
                      <TourCard
                        key={tour.id}
                        tour={tour}
                        variant="standard"
                      />
                    ))}
                  </CardGrid>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              ) : (
                <EmptyStatePattern
                  icon={Search}
                  title="No tours found"
                  message={
                    searchQuery
                      ? `No tours match your search for "${searchQuery}"`
                      : "No tours match your filter criteria"
                  }
                  actionLabel="Clear filters"
                  onAction={() => {
                    clearFilters();
                    setSearchQuery("");
                  }}
                />
              )}
            </div>
          </div>
        </Container>
      </GroupBlock>

      {/* Search Tips Section */}
      <GroupBlock sectionStyle="section-muted-subtle">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full">
            <h2 className="text-center text-foreground pb-6">Search Tips</h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground">Filter by Price</h3>
                <p className="text-sm text-muted-foreground">
                  Use the price range slider to find tours within your budget.
                  Adjust both handles for precise control.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground">Select Duration</h3>
                <p className="text-sm text-muted-foreground">
                  Filter by trip length to match your available vacation time.
                  From quick getaways to extended adventures.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground">Choose Difficulty</h3>
                <p className="text-sm text-muted-foreground">
                  Select your comfort level. Easy tours are family-friendly,
                  while challenging tours are for experienced travelers.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground">Travel Style</h3>
                <p className="text-sm text-muted-foreground">
                  Pick your preferred travel style: adventure, cultural, wildlife,
                  luxury, or budget-friendly options.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </GroupBlock>
      </div>
    </PageShell>
  );
}

export default AdvancedSearchResultsPage;