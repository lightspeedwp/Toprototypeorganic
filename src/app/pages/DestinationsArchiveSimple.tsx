/**
 * Destinations Archive - Simplified Version
 * 
 * A simplified destinations archive without Hero component to isolate loading issues.
 * All styling uses CSS custom properties from design system.
 */

import { useState, useMemo } from "react";
import { MagnifyingGlass as Search, GridNine as Grid3x3, GridFour as Grid2x2, List, MapPin, CaretLeft as ChevronLeft, CaretRight as ChevronRight } from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { ArchiveHeader } from "../components/patterns/ArchiveHeader";
import { DestinationCard } from "../components/patterns/DestinationCard";
import { DESTINATIONS, CONTINENTS } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";

const ITEMS_PER_PAGE = 12;

/**
 * DestinationsArchiveSimple - simplified destinations archive.
 */
function DestinationsArchiveSimple() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [continentFilter, setContinentFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"3col" | "2col" | "list">("3col");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { navigateToDestination } = useNavigation();

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      // Search filter
      if (searchTerm && !dest.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Type filter
      if (typeFilter === "countries" && dest.type !== "country") {
        return false;
      }
      if (typeFilter === "regions" && dest.type === "country") {
        return false;
      }

      // Continent filter
      if (continentFilter !== "all" && dest.continentId !== continentFilter) {
        return false;
      }

      return true;
    });
  }, [searchTerm, typeFilter, continentFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

  return (
    <>
      {/* Simple Header */}
      <ArchiveHeader
        title="Explore Our Destinations"
        description="Discover incredible places across the globe, from vibrant cities to remote wilderness"
      />

      {/* All Destinations with Filtering */}
      <section className="py-section-md bg-background">
        <Container className="flex flex-col gap-section-sm">
          <div className="flex flex-col gap-fluid-lg">
            <h2 className="m-0">All Destinations</h2>

            {/* Filters */}
            <div className="flex flex-col gap-fluid-md">
              {/* Search + View Mode */}
              <div className="flex flex-col sm:flex-row gap-fluid-md justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
                    className="w-full pl-10 pr-element-md py-element-sm bg-card border border-border rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-fluid-sm">
                  <button
                    onClick={() => setViewMode("3col")}
                    className={`p-element-sm rounded-[var(--radius-lg)] border transition-colors ${
                      viewMode === "3col"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                    aria-label="3 column view"
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("2col")}
                    className={`p-element-sm rounded-[var(--radius-lg)] border transition-colors ${
                      viewMode === "2col"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                    aria-label="2 column view"
                  >
                    <Grid2x2 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-element-sm rounded-[var(--radius-lg)] border transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                    aria-label="List view"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {/* Type + Continent Filters */}
              <div className="flex flex-col sm:flex-row gap-fluid-md">
                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => handleFilterChange(() => setTypeFilter(e.target.value))}
                  className="px-element-md py-element-sm bg-card border border-border rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Types</option>
                  <option value="countries">Countries</option>
                  <option value="regions">Regions & Cities</option>
                </select>

                {/* Continent Filter */}
                <select
                  value={continentFilter}
                  onChange={(e) => handleFilterChange(() => setContinentFilter(e.target.value))}
                  className="px-element-md py-element-sm bg-card border border-border rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Continents</option>
                  {CONTINENTS.map((continent) => (
                    <option key={continent.id} value={continent.id}>
                      {continent.name}
                    </option>
                  ))}
                </select>

                {/* Clear Filters */}
                {(searchTerm || typeFilter !== "all" || continentFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setTypeFilter("all");
                      setContinentFilter("all");
                      setCurrentPage(1);
                    }}
                    className="px-element-md py-element-sm text-fluid-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          {paginatedDestinations.length > 0 ? (
            <div className="flex flex-col gap-section-sm">
              <div
                className={`grid gap-fluid-lg ${
                  viewMode === "3col"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : viewMode === "2col"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {paginatedDestinations.map((destination) => (
                  <DestinationCard 
                    key={destination.id} 
                    destination={destination} 
                    layout={viewMode === "list" ? "horizontal" : "card"} 
                    onClick={() => navigateToDestination(destination.slug)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-fluid-sm">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-element-sm rounded-[var(--radius-lg)] border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-fluid-sm">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] px-element-md py-element-sm rounded-[var(--radius-lg)] border transition-colors ${
                          page === currentPage
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-element-sm rounded-[var(--radius-lg)] border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-section-md flex flex-col items-center gap-fluid-md">
              <MapPin size={48} className="text-muted-foreground" />
              <div className="flex flex-col gap-fluid-xs">
                <h3 className="m-0">No destinations found</h3>
                <p className="text-muted-foreground m-0">
                  Try adjusting your filters or search term
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setContinentFilter("all");
                  setCurrentPage(1);
                }}
                className="inline-flex items-center px-element-lg py-element-md bg-primary text-primary-foreground rounded-[var(--radius-lg)] font-medium hover:bg-primary/90 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default DestinationsArchiveSimple;