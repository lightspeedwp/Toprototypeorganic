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
import { MagnifyingGlass as Search, SlidersHorizontal, X, TrendUp as TrendingUp, Clock, GridFour as LayoutGrid } from "@phosphor-icons/react";
import { TourCollectionBlock } from "../components/blocks/TourCollectionBlock";
import { PageShell } from "../components/parts/PageShell";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { useNavigation } from "../contexts/NavigationContext";
import { useTourFilters, type SortOption } from "../hooks/useTourFilters";
import { motion as Motion, AnimatePresence } from "motion/react";
import "../../styles/templates/archive-tours.css";

export function ArchiveTourTemplate() {
  const faqData = getPageSectionFAQs("tours-archive");
  const { navigateToTour, navigateTo } = useNavigation();

  const {
    searchQuery,
    setSearchQuery,
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
    durationOptions
  } = useTourFilters(ALL_TOURS);

  const filterCount = selectedStyles.length + selectedDurations.length;

  return (
    <PageShell context="tours-archive" as="main" className="wp-template-archive-tours">
      {/* Advanced Control Bar */}
      <section className="wp-template-archive-tours__filters px-[24px] py-[0px]">
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
          <AnimatePresence>
            {showFilters && (
              <Motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="wp-template-archive-tours__panel"
              >
                <div className="wp-template-archive-tours__panel-grid">
                  {/* Style Filter */}
                  <div className="wp-template-archive-tours__panel-column">
                    <h4 className="wp-template-archive-tours__panel-title">
                      <TrendingUp className="size-3" /> Travel Architecture
                    </h4>
                    <div className="wp-template-archive-tours__chip-group">
                      {ALL_TRAVEL_STYLES.map(style => (
                        <button
                          key={style.id}
                          onClick={() => toggleFilter(setSelectedStyles, style.name)}
                          className={`wp-template-archive-tours__chip ${selectedStyles.includes(style.name) ? 'wp-template-archive-tours__chip--active' : ''}`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div className="wp-template-archive-tours__panel-column">
                    <h4 className="wp-template-archive-tours__panel-title">
                      <Clock className="size-3" /> Duration
                    </h4>
                    <div className="wp-template-archive-tours__chip-group">
                      {durationOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => toggleFilter(setSelectedDurations, opt.id)}
                          className={`wp-template-archive-tours__chip ${selectedDurations.includes(opt.id) ? 'wp-template-archive-tours__chip--active' : ''}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="wp-template-archive-tours__panel-column flex flex-col justify-end">
                    <button
                      onClick={resetFilters}
                      className="wp-template-archive-tours__reset-button"
                    >
                      <X className="size-3" /> Reset Selections
                    </button>
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* Main Results */}
      <section className="wp-template-archive-tours__content px-[24px] py-[64px]">
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
      </section>

      <FAQ
        title="Expedition Guidance"
        subtitle="Insights and answers to prepare you for your legendary journey."
        items={faqData?.items}
      />

      <CTA
        variant="gradient"
        title="Seeking Something Truly Unique?"
        description="Our master architects can design a completely bespoke itinerary that mirrors your distinct vision. Private jets, exclusive access, and unparalleled service."
        primaryAction={{ label: "Request Bespoke Design", onClick: () => navigateTo("/contact") }}
        secondaryAction={{ label: "Speak to an Expert", onClick: () => navigateTo("/contact") }}
      />
    </PageShell>
  );
}

export default ArchiveTourTemplate;