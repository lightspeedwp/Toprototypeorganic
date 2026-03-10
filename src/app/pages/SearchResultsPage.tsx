/**
 * Search Results Page - WordPress Template
 * 
 * Global search results page showing tours, destinations, accommodations, and blog posts.
 * Uses PageShell for centralized breadcrumbs + hero with dynamic title/intro overrides.
 */

import { useState, useEffect } from "react";
import { CTA } from "../components/patterns/CTA";
import { CardGrid } from "../components/patterns/CardGrid";
import { TourCard } from "../components/patterns/TourCard";
import { DestinationCard } from "../components/patterns/DestinationCard";
import { AccommodationCard } from "../components/patterns/AccommodationCard";
import { BlogCard } from "../components/patterns/BlogCard";
import { Pagination } from "../components/patterns/Pagination";
import { EmptyStatePattern } from "../components/patterns/EmptyStatePattern";
import { PageShell } from "../components/parts/PageShell";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";
import { Container } from "../components/common/Container";
import { useSearch } from "../hooks/useSearch";
import { useNavigation } from "../contexts/NavigationContext";

/**
 * Search Results Page Component
 */
export function SearchResultsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "tours" | "destinations" | "accommodation" | "blog">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  const {
    navigateToTour,
    navigateToDestination,
    navigateToAccommodation,
    navigateToBlogPost,
    navigateTo,
  } = useNavigation();

  // Use search hook
  const {
    query,
    totalResults,
    isLoading,
    hasSearched,
    resultsByCategory,
    search,
    setQuery,
    clearSearch,
  } = useSearch({
    initialQuery: "",
    autoSearch: false,
  });

  // Run initial search or update when query changes
  useEffect(() => {
    if (query) {
      search();
    }
  }, []);

  const activeResults = resultsByCategory[activeTab] || [];
  const totalPages = Math.ceil(activeResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = activeResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
    search(newQuery);
  };

  const handleClear = () => {
    clearSearch();
    setActiveTab("all");
    setCurrentPage(1);
  };

  return (
    <PageShell
      context="search"
      heroProps={{
        title: hasSearched && query ? `Results for "${query}"` : undefined,
        intro: hasSearched ? `We found ${totalResults} matches for your search across our collection.` : undefined,
      }}
    >
      {/* Search Bar & Filter */}
      <SearchFilterPattern
        searchPlaceholder="Try 'Kruger Safari', 'Luxury Lodges', or 'Cape Town'..."
        onSearchChange={handleSearchChange}
        activeFiltersCount={query ? 1 : 0}
        onClearAll={handleClear}
        sticky={true}
      />

      {/* Result Tabs */}
      <section className="bg-muted/30 border-b border-border/50">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {[
              { id: "all", label: "All Results", count: totalResults },
              { id: "tours", label: "Tours", count: resultsByCategory.tours.length },
              { id: "destinations", label: "Destinations", count: resultsByCategory.destinations.length },
              { id: "accommodation", label: "Stays", count: resultsByCategory.accommodation.length },
              { id: "blog", label: "Articles", count: resultsByCategory.blog.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
                }`}
              >
                {tab.label} <span className="opacity-60">({tab.count})</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Results Content */}
      <section className="py-section-md min-h-[400px]">
        <Container>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground animate-pulse">Searching our archives...</p>
            </div>
          ) : paginatedResults.length > 0 ? (
            <>
              <div className="mb-12 border-b border-border/50 pb-6">
                <h2>
                  {activeTab === 'all' ? 'All Matches' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <p className="text-muted-foreground">Showing {paginatedResults.length} of {activeResults.length} relevant results</p>
              </div>

              <CardGrid columns={3}>
                {paginatedResults.map((item: any) => {
                  if ("duration" in item) return <TourCard key={item.id} tour={item} onClick={() => navigateToTour(item.slug)} />;
                  if ("parentId" in item) return <DestinationCard key={item.id} destination={item} onClick={() => navigateToDestination(item.slug)} />;
                  if ("starRating" in item || "accommodationType" in item) return <AccommodationCard key={item.id} accommodation={item} onClick={() => navigateToAccommodation(item.slug)} />;
                  if ("author" in item) return <BlogCard key={item.id} post={item} onClick={() => navigateToBlogPost(item.slug)} />;
                  return null;
                })}
              </CardGrid>

              {totalPages > 1 && (
                <div className="mt-16">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyStatePattern
              icon="search"
              title="No results found"
              message={query ? `We couldn't find anything matching "${query}". Try different keywords or browse our popular categories.` : "Enter a search term above to begin exploring our safari collection."}
              primaryAction={{
                label: "Browse All Tours",
                onClick: () => navigateTo("/tours")
              }}
              secondaryAction={{
                label: "Clear Search",
                onClick: handleClear
              }}
            />
          )}
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title="Can't Find Your Dream Trip?"
        description="Our safari specialists know the continent inside out. Let us help you design a tailored itinerary that fits your vision perfectly."
        variant="gradient"
        primaryAction={{
          label: "Request a Custom Itinerary",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: "Talk to an Expert",
          onClick: () => navigateTo("/contact"),
        }}
      />
    </PageShell>
  );
}

export default SearchResultsPage;
