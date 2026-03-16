/**
 * Archive Tour Template Component.
 *
 * Complete tours archive with filtering, sorting, and search.
 * Strictly adheres to design system tokens and BEM naming.
 *
 * WordPress Mapping:
 * - Template: archive-tour.html
 * - Post Type: tour
 */

import { ALL_TOURS, ALL_TRAVEL_STYLES } from "../data/mockExpanded";
import { getPageSectionFAQs } from "../data/mock";
import { MagnifyingGlass as Search, SlidersHorizontal, TrendUp as TrendingUp, Clock, GridFour as LayoutGrid } from "@phosphor-icons/react";
import { TourCollectionBlock } from "../components/blocks/TourCollectionBlock";
import { PageShell } from "../components/parts/PageShell";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { CollapsibleFilterPanel } from "../components/patterns/CollapsibleFilterPanel";
import { ActiveFilterSummary, searchFilterTag, multiFilterTags, buildFilterTags } from "../components/patterns/ActiveFilterSummary";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { useNavigation } from "../contexts/NavigationContext";
import { useTourFilters, type SortOption } from "../hooks/useTourFilters";
import "../../styles/templates/archive-tours.css";

export function ArchiveTourTemplate() {
  const faqData = getPageSectionFAQs("tours-archive");
  const { navigateToTour, navigateTo } = useNavigation();

  const {
    searchQuery,
    setSearchQuery,
    flushSearch,
    selectedStyles,
    setSelectedStyles,
    selectedDurations,
    setSelectedDurations,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    filteredAndSortedTours,
    toggleFilter,
    resetFilters,
    activeFilterCount,
    durationOptions
  } = useTourFilters(ALL_TOURS);

  const filterCount = activeFilterCount;

  return (
    <PageShell context="tours-archive" as="main" className="wp-template-archive-tours theme-organic">
      <section className="organic-section-top texture-medium">
        {/* Advanced Control Bar */}
        <div className="wp-template-archive-tours__filters py-section-sm">
          <Container>
            <div className="wp-template-archive-tours__filter-bar">
            <div className="wp-template-archive-tours__filter-group">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`wp-template-archive-tours__filter-trigger ${showFilters ? 'wp-template-archive-tours__filter-trigger--active' : ''}`}
              >
                <SlidersHorizontal className="size-4" />
                {showFilters ? "Apply Refinements" : "Refine Search"}
                {filterCount > 0 && (
                  <span className="wp-template-archive-tours__filter-count">
                    {filterCount}
                  </span>
                )}
              </button>

              <div className="wp-template-archive-tours__search-wrapper">
                <Search className="wp-template-archive-tours__search-icon" />
                <input
                  type="text"
                  placeholder="Find your adventure..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') flushSearch(); }}
                  className="wp-template-archive-tours__search-input"
                />
              </div>
            </div>

            <div className="wp-template-archive-tours__sort-group">
              <div className="wp-template-archive-tours__sort-label">
                <LayoutGrid className="size-3" /> Sort
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="wp-template-archive-tours__sort-select"
              >
                <option value="popularity">Most Coveted</option>
                <option value="price-low">Value: Low to High</option>
                <option value="price-high">Value: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters Panel */}
          <CollapsibleFilterPanel
            isOpen={showFilters}
            groups={[
              {
                id: "travel-style",
                title: "Travel Architecture",
                icon: <TrendingUp className="size-3" />,
                items: ALL_TRAVEL_STYLES.map((s) => ({ id: s.name, label: s.name })),
                selectedIds: selectedStyles,
                onToggle: (name) => toggleFilter(setSelectedStyles, name),
              },
              {
                id: "duration",
                title: "Duration",
                icon: <Clock className="size-3" />,
                items: durationOptions.map((o) => ({ id: o.id, label: o.label })),
                selectedIds: selectedDurations,
                onToggle: (id) => toggleFilter(setSelectedDurations, id),
              },
            ]}
            onReset={resetFilters}
          />
        </Container>
      </div>

      {/* Active Filter Summary */}
      <Container>
        <ActiveFilterSummary
          tags={buildFilterTags(
            searchFilterTag(searchQuery, () => setSearchQuery("")),
            multiFilterTags(
              "style",
              selectedStyles.map((s) => ({ id: s, label: s })),
              (s) => toggleFilter(setSelectedStyles, s)
            ),
            multiFilterTags(
              "dur",
              selectedDurations
                .map((id) => ({ id, label: durationOptions.find((o) => o.id === id)?.label || id })),
              (id) => toggleFilter(setSelectedDurations, id)
            ),
          )}
          onClearAll={resetFilters}
        />
      </Container>

      </section>

      <section className="organic-section-middle texture-subtle">
        {/* Main Results */}
        <div className="wp-template-archive-tours__content py-section-lg">
          <Container className="flex flex-col gap-gap-lg">
            <SectionHeader
              section={{
                title: "Curated Collection",
                description: `Discover ${filteredAndSortedTours.length} exclusive expeditions tailored for the modern explorer.`
              }}
              centered={false}
            />

            <TourCollectionBlock 
              tours={filteredAndSortedTours}
              showSearch={false}
              onSelect={(tour) => navigateToTour(tour.slug)}
            />
          </Container>
        </div>
      </section>

      <section className="organic-section-bottom texture-subtle">
        <FAQ
          title="Expedition Guidance"
          subtitle="Insights and answers to prepare you for your legendary journey."
          items={faqData?.items}
        />

        <CTA
          variant="default"
          title="Seeking Something Truly Unique?"
          description="Our master architects can design a completely bespoke itinerary that mirrors your distinct vision. Private jets, exclusive access, and unparalleled service."
          primaryAction={{ label: "Request Bespoke Design", onClick: () => navigateTo("/contact") }}
          secondaryAction={{ label: "Speak to an Expert", onClick: () => navigateTo("/contact") }}
        />
      </section>
    </PageShell>
  );
}

export default ArchiveTourTemplate;