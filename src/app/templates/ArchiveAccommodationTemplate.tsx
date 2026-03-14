/**
 * Archive Accommodation Template - Content Hub Archetype
 * 
 * Displays archive of all accommodation offerings with advanced filtering and search.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState } from "react";
import { PageShell } from "../components/parts/PageShell";
import { TaxonomyNav } from "../components/patterns/TaxonomyNav";
import { AccommodationCard } from "../components/patterns/AccommodationCard";
import { CTA } from "../components/patterns/CTA";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";
import { FAQ } from "../components/patterns/FAQ";
import { FacilityChips } from "../components/patterns/FacilityChips";
import { ActiveFilterSummary, searchFilterTag, singleFilterTag, multiFilterTags, buildFilterTags } from "../components/patterns/ActiveFilterSummary";
import { Container } from "../components/common/Container";
import { ArchiveResultsSection } from "../components/patterns/ArchiveResultsSection";
import { 
  ALL_ACCOMMODATION, 
  ALL_ACCOMMODATION_TYPES, 
  ALL_DESTINATIONS 
} from "../data/mockExpanded";
import { getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { useAccommodationFilters } from "../hooks/useAccommodationFilters";
import { FACILITIES } from "../data/taxonomies/facilities";
import type { ViewMode } from "../components/patterns/ViewSwitcher";

export function ArchiveAccommodationTemplate() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const ITEMS_PER_PAGE = 12;

  const {
    activeType,
    setActiveType,
    currentPage,
    setCurrentPage,
    resetPage,
    searchQuery,
    setSearchQuery,
    flushSearch,
    selectedDestination,
    setSelectedDestination,
    selectedFacilities,
    toggleFacility,
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
          onTermClick={(id) => { setActiveType(id); resetPage(); }}
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
          onSearchChange={(q) => { setSearchQuery(q); resetPage(); }}
          onSearchSubmit={flushSearch}
          onFilterChange={(f) => { setSelectedDestination(f.destination || ""); resetPage(); }}
          onClearAll={resetFilters}
          collapsible={true}
        />

        <Container>
          <FacilityChips
            selected={selectedFacilities}
            onToggle={toggleFacility}
          />

          {/* Active facility filter summary */}
          <ActiveFilterSummary
            tags={buildFilterTags(
              searchFilterTag(searchQuery, () => { setSearchQuery(""); resetPage(); }),
              singleFilterTag(
                "type",
                activeType,
                ALL_ACCOMMODATION_TYPES.find((t) => t.id === activeType)?.name || activeType || "",
                () => { setActiveType(undefined); resetPage(); }
              ),
              singleFilterTag(
                "dest",
                selectedDestination,
                ALL_DESTINATIONS.find((d) => d.id === selectedDestination)?.title || selectedDestination,
                () => { setSelectedDestination(""); resetPage(); }
              ),
              multiFilterTags(
                "facility",
                selectedFacilities
                  .map((id) => {
                    const facility = FACILITIES.find((f) => f.id === id);
                    return facility ? { id, label: facility.name } : null;
                  })
                  .filter((tag): tag is { id: string; label: string } => tag !== null),
                (id) => toggleFacility(id)
              ),
            )}
            onClearAll={resetFilters}
          />
        </Container>
      </div>

      <div className="organic-section-middle">
        <ArchiveResultsSection
          header={{
            eyebrow: "Our Collection",
            title: "Hand-Picked Retreats",
            description: `Displaying ${paginatedProperties.length} of ${filteredProperties.length} elite properties matching your criteria.`,
          }}
          items={paginatedProperties}
          totalFiltered={filteredProperties.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          renderItem={(property, vm) => (
            <AccommodationCard
              key={property.id}
              accommodation={property}
              layout={vm === "list" ? "horizontal" : "card"}
              onClick={() => navigateToAccommodation(property.slug)}
            />
          )}
          emptyState={{
            icon: "empty",
            title: "No Sanctuaries Found",
            message: "We couldn't find any properties matching your current filters. Try expanding your search area or selecting a different type.",
            actionLabel: "Reset All Filters",
            onAction: resetFilters,
          }}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            itemsPerPage: ITEMS_PER_PAGE,
          }}
        />
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