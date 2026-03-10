/**
 * Destinations Archive Enhanced Page
 * 
 * Modern destinations archive with:
 * 1. Hero section (via PageShell)
 * 2. Featured Countries section (4-column grid)
 * 3. Featured Regions & Cities section (3-column grid)
 * 4. All Destinations with advanced filtering
 * 
 * All styling uses CSS custom properties from design system.
 * Typography: Lora (serif) for headings, Noto Sans (sans-serif) for body.
 * Now uses PageShell for centralized breadcrumbs + hero.
 * 
 * @module DestinationsArchiveEnhanced
 * @category pages
 */

import { useState, useMemo } from "react";
import { AppLink as Link } from "../components/common/AppLink";
import { MagnifyingGlass as Search, GridNine as Grid3x3, GridFour as Grid2x2, List, MapPin, CaretLeft as ChevronLeft, CaretRight as ChevronRight } from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { PageShell } from "../components/parts/PageShell";
import { DESTINATIONS, CONTINENTS } from "../data/mock";

const ITEMS_PER_PAGE = 12;

/**
 * Featured country card with overlay
 */
function FeaturedCountryCard({ destination }: { destination: any }) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="block relative aspect-[3/4] rounded-[var(--radius-lg)] overflow-hidden group"
    >
      <img
        src={destination.featuredImage}
        alt={destination.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-[var(--spacing-element-lg)] gap-[var(--spacing-gap-sm)]">
        <h3 className="text-primary-foreground m-0 text-fluid-2xl font-serif font-bold">{destination.title}</h3>
        <p className="text-primary-foreground/90 text-fluid-sm line-clamp-2 m-0">{destination.excerpt}</p>
        <div className="flex items-center gap-[var(--spacing-gap-sm)] text-primary-foreground/80 text-fluid-sm">
          <MapPin size={16} />
          <span>{destination.tourIds.length} tours available</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Featured region/city card
 */
function FeaturedRegionCard({ destination }: { destination: any }) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="block bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden hover:border-primary transition-colors group"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={destination.featuredImage}
          alt={destination.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-[var(--spacing-element-md)] flex flex-col gap-[var(--spacing-gap-sm)]">
        <h4 className="m-0 text-fluid-xl font-bold font-serif group-hover:text-primary transition-colors">
          {destination.title}
        </h4>
        <p className="text-fluid-sm text-muted-foreground line-clamp-2 m-0">{destination.excerpt}</p>
        <div className="flex items-center gap-[var(--spacing-gap-sm)] text-muted-foreground text-fluid-sm">
          <MapPin size={16} />
          <span>{destination.tourIds.length} tours</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Destination card - flexible view modes
 */
function DestinationCard({ destination, viewMode }: { destination: any; viewMode: string }) {
  if (viewMode === "list") {
    return (
      <Link
        to={`/destinations/${destination.slug}`}
        className="flex gap-[var(--spacing-gap-md)] bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden hover:border-primary transition-colors group"
      >
        <div className="w-48 flex-shrink-0 aspect-[4/3] overflow-hidden">
          <img
            src={destination.featuredImage}
            alt={destination.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 p-[var(--spacing-element-md)] flex flex-col gap-[var(--spacing-gap-sm)]">
          <h4 className="m-0 text-fluid-xl font-bold font-serif group-hover:text-primary transition-colors">
            {destination.title}
          </h4>
          <p className="text-muted-foreground text-fluid-sm m-0 line-clamp-2">{destination.excerpt}</p>
          <div className="flex items-center gap-[var(--spacing-gap-md)] text-fluid-sm text-muted-foreground pt-1">
            <span className="flex items-center gap-[var(--spacing-gap-xs)]">
              <MapPin size={16} />
              {destination.tourIds.length} tours
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="block bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden hover:border-primary transition-colors group"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={destination.featuredImage}
          alt={destination.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-[var(--spacing-element-md)] flex flex-col gap-[var(--spacing-gap-sm)]">
        <h4 className="m-0 text-fluid-xl font-bold font-serif group-hover:text-primary transition-colors">
          {destination.title}
        </h4>
        <p className="text-fluid-sm text-muted-foreground line-clamp-2 m-0">{destination.excerpt}</p>
        <div className="text-fluid-sm text-muted-foreground flex items-center gap-[var(--spacing-gap-xs)]">
          <MapPin size={16} />
          {destination.tourIds.length} tours
        </div>
      </div>
    </Link>
  );
}

/**
 * DestinationsArchiveEnhanced - modern destinations archive.
 */
function DestinationsArchiveEnhanced() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [continentFilter, setContinentFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"3col" | "2col" | "list">("3col");
  const [currentPage, setCurrentPage] = useState(1);

  // Get featured destinations
  const featuredCountries = DESTINATIONS.filter((d) => d.type === "country").slice(0, 4);
  const featuredRegions = DESTINATIONS.filter(
    (d) => d.type === "region" || d.type === "city" || d.type === "park"
  ).slice(0, 6);

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      if (searchTerm && !dest.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (typeFilter === "countries" && dest.type !== "country") {
        return false;
      }
      if (typeFilter === "regions" && dest.type === "country") {
        return false;
      }
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

  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

  return (
    <PageShell context="destinations-archive">
      {/* Featured Countries Section */}
      {featuredCountries.length > 0 && (
        <section className="py-[var(--spacing-section-md)] bg-background">
          <Container>
            <div className="flex flex-col gap-[var(--spacing-gap-sm)] mb-[var(--spacing-section-sm)]">
              <h2 className="m-0 text-fluid-3xl font-serif">Featured Countries</h2>
              <p className="text-muted-foreground text-fluid-base m-0">Explore our most popular country destinations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-gap-lg)]">
              {featuredCountries.map((destination) => (
                <FeaturedCountryCard key={destination.id} destination={destination} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Featured Regions & Cities Section */}
      {featuredRegions.length > 0 && (
        <section className="py-[var(--spacing-section-md)] bg-muted">
          <Container>
            <div className="flex flex-col gap-[var(--spacing-gap-sm)] mb-[var(--spacing-section-sm)]">
              <h2 className="m-0 text-fluid-3xl font-serif">Featured Regions & Cities</h2>
              <p className="text-muted-foreground text-fluid-base m-0">Discover unique regions and vibrant cities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-gap-lg)]">
              {featuredRegions.map((destination) => (
                <FeaturedRegionCard key={destination.id} destination={destination} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All Destinations with Filtering */}
      <section className="py-[var(--spacing-section-md)] bg-background">
        <Container>
          <div className="flex flex-col gap-[var(--spacing-gap-lg)] mb-[var(--spacing-section-sm)]">
            <h2 className="m-0 text-fluid-3xl font-serif">All Destinations</h2>

            {/* Filters */}
            <div className="flex flex-col gap-[var(--spacing-gap-md)]">
              {/* Search + View Mode */}
              <div className="flex flex-col sm:flex-row gap-[var(--spacing-gap-md)] justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
                    className="w-full pl-10 pr-[var(--spacing-element-md)] py-[var(--spacing-element-sm)] bg-card border border-border rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="flex items-center gap-[var(--spacing-gap-sm)]">
                  <button
                    onClick={() => setViewMode("3col")}
                    className={`p-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] border transition-colors ${
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
                    className={`p-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] border transition-colors ${
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
                    className={`p-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] border transition-colors ${
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
              <div className="flex flex-col sm:flex-row gap-[var(--spacing-gap-md)]">
                <select
                  value={typeFilter}
                  onChange={(e) => handleFilterChange(() => setTypeFilter(e.target.value))}
                  className="px-[var(--spacing-element-md)] py-[var(--spacing-element-sm)] bg-card border border-border rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Types</option>
                  <option value="countries">Countries</option>
                  <option value="regions">Regions & Cities</option>
                </select>

                <select
                  value={continentFilter}
                  onChange={(e) => handleFilterChange(() => setContinentFilter(e.target.value))}
                  className="px-[var(--spacing-element-md)] py-[var(--spacing-element-sm)] bg-card border border-border rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Continents</option>
                  {CONTINENTS.map((continent) => (
                    <option key={continent.id} value={continent.id}>
                      {continent.name}
                    </option>
                  ))}
                </select>

                {(searchTerm || typeFilter !== "all" || continentFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setTypeFilter("all");
                      setContinentFilter("all");
                      setCurrentPage(1);
                    }}
                    className="px-[var(--spacing-element-md)] py-[var(--spacing-element-sm)] text-fluid-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          {paginatedDestinations.length > 0 ? (
            <div className="flex flex-col gap-[var(--spacing-section-sm)]">
              <div
                className={`grid gap-[var(--spacing-gap-lg)] ${
                  viewMode === "3col"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : viewMode === "2col"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {paginatedDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} viewMode={viewMode} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-[var(--spacing-gap-sm)]">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-[var(--spacing-gap-sm)]">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] px-[var(--spacing-element-md)] py-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] border transition-colors ${
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
                    className="p-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-[var(--spacing-section-md)] flex flex-col items-center gap-[var(--spacing-gap-md)]">
              <MapPin size={48} className="text-muted-foreground" />
              <div className="flex flex-col gap-[var(--spacing-gap-sm)]">
                <h3 className="m-0 text-fluid-2xl font-serif">No destinations found</h3>
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
                className="inline-flex items-center px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] bg-primary text-primary-foreground rounded-[var(--radius-lg)] hover:bg-primary/90 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </PageShell>
  );
}

export default DestinationsArchiveEnhanced;
export { DestinationsArchiveEnhanced };
