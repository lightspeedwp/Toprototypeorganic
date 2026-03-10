/**
 * Specials Archive Page - WordPress Template
 * 
 * Archive page for special offers and deals.
 * Maps to WordPress archive-special.php template.
 * Now uses PageShell for centralized breadcrumbs + hero.
 */

import { useState, useMemo } from "react";
import { Clock, Percent } from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { SpecialCard } from "../components/patterns/SpecialCard";
import { EmptyStatePattern } from "../components/patterns/EmptyStatePattern";
import { PageShell } from "../components/parts/PageShell";
import { ViewSwitcher, type ViewMode } from "../components/patterns/ViewSwitcher";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";
import { useNavigation } from "../contexts/NavigationContext";
import { ALL_SPECIALS } from "../data/mockExpanded";
import { CTA_SPECIALS_ARCHIVE, getPageSectionFAQs } from "../data/mock";

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Specials' },
  { value: 'expiring-soon', label: 'Expiring Soon' },
  { value: 'best-value', label: 'Best Value' },
  { value: 'last-minute', label: 'Last Minute' },
];

const SORT_OPTIONS = [
  { value: 'savings', label: 'Highest Savings' },
  { value: 'newest', label: 'Newest Deals' },
  { value: 'expiring', label: 'Expiring Soon' },
];

export function SpecialsArchive() {
  const { navigateToSpecial, navigateTo } = useNavigation();
  
  // Centralized hero and FAQ data
  const faqData = getPageSectionFAQs("specials-archive");
  
  // Filter and sort state
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('savings');
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");

  /**
   * Filter and sort specials.
   */
  const filteredSpecials = useMemo(() => {
    let filtered = [...ALL_SPECIALS];

    // Apply filters
    if (activeFilter === 'expiring-soon') {
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      filtered = filtered.filter(special => 
        new Date(special.validTo) <= sevenDaysFromNow
      );
    } else if (activeFilter === 'best-value') {
      filtered = filtered.filter(special => 
        parseInt(special.discount) >= 30
      );
    } else if (activeFilter === 'last-minute') {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      filtered = filtered.filter(special => 
        new Date(special.validTo) <= thirtyDaysFromNow
      );
    }

    // Sort specials
    if (sortBy === 'savings') {
      filtered.sort((a, b) => parseInt(b.discount) - parseInt(a.discount));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.validTo).getTime() - new Date(a.validTo).getTime());
    } else if (sortBy === 'expiring') {
      filtered.sort((a, b) => new Date(a.validTo).getTime() - new Date(b.validTo).getTime());
    }

    return filtered;
  }, [activeFilter, sortBy]);

  const getDaysUntilExpiry = (validTo: string) => {
    const now = new Date();
    const expiry = new Date(validTo);
    const diff = expiry.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <PageShell context="specials-archive">
      {/* Advanced Filters */}
      <SearchFilterPattern
        filters={[
          {
            id: "category",
            label: "Offer Category",
            type: "select",
            placeholder: "Filter by type",
            value: activeFilter,
            options: FILTER_OPTIONS
          },
          {
            id: "sort",
            label: "Sort By",
            type: "select",
            placeholder: "Sort deals",
            value: sortBy,
            options: SORT_OPTIONS
          }
        ]}
        onFilterChange={(values) => {
          if (values.category) setActiveFilter(values.category);
          if (values.sort) setSortBy(values.sort);
        }}
        onClearAll={() => {
          setActiveFilter('all');
          setSortBy('savings');
        }}
        activeFiltersCount={activeFilter !== 'all' ? 1 : 0}
        collapsible={true}
      />

      {/* Main Content */}
      <section className="wp-template-archive__content">
        <Container>
          {/* Results Header */}
          <div className="wp-template-archive__results-header">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <Percent size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="m-0">Active Offers</h2>
                <p className="wp-template-archive__results-count">
                  {filteredSpecials.length} verified deals currently available
                </p>
              </div>
            </div>
            <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
          </div>

          {/* Grid or Empty State */}
          {filteredSpecials.length > 0 ? (
            <div className={viewMode === "list" ? "wp-template-archive__list" : "wp-template-archive__grid wp-template-archive__grid--cols-3"}>
              {filteredSpecials.map((special) => {
                const daysLeft = getDaysUntilExpiry(special.validTo);
                return (
                  <div key={special.id} className="relative">
                    <SpecialCard 
                      special={special} 
                      layout={viewMode === "list" ? "horizontal" : "card"}
                      onClick={() => navigateToSpecial(special.slug)} 
                    />
                    {daysLeft > 0 && daysLeft <= 7 && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-accent text-white text-xs uppercase tracking-widest rounded shadow-lg flex items-center gap-2 animate-pulse">
                        <Clock size={12} />
                        Expires in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyStatePattern
              icon="tag"
              title="No active deals match"
              message="Try adjusting your filters or check back later. We're constantly negotiating new exclusive offers."
              primaryAction={{
                label: "Show All Specials",
                onClick: () => setActiveFilter('all'),
              }}
            />
          )}
        </Container>
      </section>

      {/* FAQ */}
      <FAQ
        items={faqData?.items || []}
        title={faqData?.sectionTitle || "Booking Specials FAQ"}
        intro={faqData?.sectionDescription || "Everything you need to know about our special offers and booking conditions"}
      />

      {/* CTA */}
      <CTA
        title={CTA_SPECIALS_ARCHIVE.title}
        description={CTA_SPECIALS_ARCHIVE.description}
        variant="gradient"
        primaryAction={{ 
          label: "Request a Special Quote",
          onClick: () => navigateTo("/contact")
        }}
        secondaryAction={{
          label: "View All Tours",
          onClick: () => navigateTo("/tours"),
        }}
      />
    </PageShell>
  );
}

export default SpecialsArchive;
