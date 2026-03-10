/**
 * Archive Accommodation Template - Content Hub Archetype
 * 
 * Displays archive of all accommodation offerings with advanced filtering and search.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState, useMemo } from "react";
import { PageShell } from "../components/parts/PageShell";
import { TaxonomyNav } from "../components/patterns/TaxonomyNav";
import { AccommodationCard } from "../components/patterns/AccommodationCard";
import { CardGrid } from "../components/patterns/CardGrid";
import { CTA } from "../components/patterns/CTA";
import { Pagination } from "../components/patterns/Pagination";
import { ViewSwitcher, ViewMode } from "../components/patterns/ViewSwitcher";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";
import { EmptyStatePattern } from "../components/patterns/EmptyStatePattern";
import { FAQ } from "../components/patterns/FAQ";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { 
  ALL_ACCOMMODATION, 
  ALL_ACCOMMODATION_TYPES, 
  ALL_DESTINATIONS 
} from "../data/mockExpanded";
import { getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { useAccommodationFilters } from "../hooks/useAccommodationFilters";

export function ArchiveAccommodationTemplate() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const ITEMS_PER_PAGE = 12;

  const {
    activeType,
    setActiveType,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedDestination,
    setSelectedDestination,
    filteredProperties,
    paginatedProperties,
    totalPages,
    resetFilters
  } = useAccommodationFilters(ALL_ACCOMMODATION, ITEMS_PER_PAGE);

  const faqData = getPageSectionFAQs("accommodation-archive");

  const { navigateToAccommodation, navigateTo } = useNavigation();

  return (
    <PageShell context="accommodation-archive" as="main" className="wp-template-archive-accommodation theme-organic">
      <div className="organic-section-top">
        <TaxonomyNav
          label="Property Type"
          terms={ALL_ACCOMMODATION_TYPES}
          activeId={activeType}
          onTermClick={(id) => { setActiveType(id); setCurrentPage(1); }}
        />

        <SearchFilterPattern
          filters={[
            {
              id: "destination",
              type: "select",
              label: "Destination",
              placeholder: "All Locations",
              value: selectedDestination,
              options: ALL_DESTINATIONS.filter(d => !d.parentId).map(d => ({ value: d.id, label: d.title }))
            },
            {
              id: "rating",
              type: "select",
              label: "Star Rating",
              placeholder: "Any Rating",
              options: [
                { value: "5", label: "5 Star Luxury" },
                { value: "4", label: "4 Star Premium" },
                { value: "3", label: "3 Star Comfort" }
              ]
            }
          ]}
          onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
          onFilterChange={(f) => { setSelectedDestination(f.destination || ""); setCurrentPage(1); }}
          onClearAll={resetFilters}
          collapsible={true}
        />
      </div>

      <div className="organic-section-middle">
        <section className="wp-template-archive__content">
          <Container>
            <div className="wp-template-archive__results-header">
              <SectionHeader
                section={{
                  eyebrow: "Our Collection",
                  title: "Hand-Picked Retreats",
                  description: `Displaying ${paginatedProperties.length} of ${filteredProperties.length} elite properties matching your criteria.`
                }}
                centered={false}
                className="m-0"
              />
              <ViewSwitcher
                currentView={viewMode}
                onViewChange={setViewMode}
              />
            </div>

            {paginatedProperties.length > 0 ? (
              <div className={viewMode === "list" ? "wp-template-archive__list" : "wp-template-archive__grid wp-template-archive__grid--cols-3"}>
                {paginatedProperties.map((property) => (
                  <AccommodationCard 
                    key={property.id} 
                    accommodation={property}
                    layout={viewMode === "list" ? "horizontal" : "card"}
                    onClick={() => navigateToAccommodation(property.slug)}
                  />
                ))}
              </div>
            ) : (
              <EmptyStatePattern
                icon="empty"
                title="No Sanctuaries Found"
                message="We couldn't find any properties matching your current filters. Try expanding your search area or selecting a different type."
                primaryAction={{
                  label: "Reset All Filters",
                  onClick: resetFilters
                }}
              />
            )}

            {filteredProperties.length > ITEMS_PER_PAGE && (
              <div className="wp-template-archive__pagination">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </Container>
        </section>
      </div>

      <div className="organic-section-bottom">
        <FAQ
          items={faqData?.items}
          title="Stay Insights"
          intro="Answers to common questions about safari accommodation standards and booking."
        />

        <CTA
          title="Need a Recommendation?"
          description="Our travel specialists have personally stayed at every property in our collection. Let us find the one that fits you perfectly."
          variant="default"
          primaryAction={{ 
            label: "Talk to a Specialist", 
            onClick: () => navigateTo("/contact") 
          }}
          secondaryAction={{
            label: "Start Trip Planner",
            onClick: () => navigateTo("/trip-planner"),
          }}
        />
      </div>
    </PageShell>
  );
}

export default ArchiveAccommodationTemplate;