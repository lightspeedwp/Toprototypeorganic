/**
 * Archive Review Template - Content Hub Archetype
 * 
 * Displays archive of all customer reviews with filtering and search.
 * Strictly adheres to design system tokens and BEM naming.
 * 
 * @module ArchiveReviewTemplate
 * @category templates
 */

import { useState } from "react";
import { PageShell } from "../components/parts/PageShell";
import { CTA } from "../components/patterns/CTA";
import { Pagination } from "../components/patterns/Pagination";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";
import { EmptyStatePattern } from "../components/patterns/EmptyStatePattern";
import { ReviewCard } from "../components/patterns/ReviewCard";
import { ViewSwitcher, type ViewMode } from "../components/patterns/ViewSwitcher";
import { StatisticsMetricsPattern } from "../components/patterns/StatisticsMetricsPattern";
import { FAQ } from "../components/patterns/FAQ";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { ALL_REVIEWS } from "../data/mockExpanded";
import { getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { useReviewFilters } from "../hooks/useReviewFilters";
import { ChatCircle as MessageSquare, Star, ThumbsUp, Medal as Award } from "@phosphor-icons/react";

/**
 * ArchiveReviewTemplate Component.
 */
export function ArchiveReviewTemplate() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const ITEMS_PER_PAGE = 12;

  const {
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedRating,
    setSelectedRating,
    selectedType,
    setSelectedType,
    filteredReviews,
    paginatedReviews,
    totalPages,
    resetFilters,
    activeFilterCount
  } = useReviewFilters(ALL_REVIEWS, ITEMS_PER_PAGE);

  const { navigateTo, navigateToReview } = useNavigation();

  // Centralized hero and FAQ data
  const faqData = getPageSectionFAQs("reviews-archive");

  // Calculate review statistics
  const totalReviewsCount = ALL_REVIEWS.length;
  const averageRatingValue = (
    ALL_REVIEWS.reduce((sum, review) => sum + review.rating, 0) / totalReviewsCount
  ).toFixed(1);
  const fiveStarCount = ALL_REVIEWS.filter((r) => r.rating === 5).length;
  const fiveStarPercentage = ((fiveStarCount / totalReviewsCount) * 100).toFixed(0);

  const handleFilterChange = (filters: Record<string, any>) => {
    setSearchQuery(filters.search || "");
    setSelectedRating(filters.rating || "");
    setSelectedType(filters.type || "");
    setCurrentPage(1);
  };

  return (
    <PageShell context="reviews-archive" as="article" className="wp-template-archive-review theme-organic">
      <div className="organic-section-top">
        {/* Statistics */}
        <StatisticsMetricsPattern
          title="Trusted by Travelers"
          description="Our commitment to excellence is reflected in the stories of those who journey with us."
          statistics={[
            { value: totalReviewsCount.toString(), label: "Verified Reviews", icon: MessageSquare },
            { value: averageRatingValue, label: "Average Rating", icon: Star, suffix: "/5" },
            { value: `${fiveStarPercentage}%`, label: "5-Star Experiences", icon: ThumbsUp },
            { value: "15+", label: "Years of Service", icon: Award },
          ]}
        />

        {/* Filters */}
        <SearchFilterPattern
          filters={[
            {
              id: "search",
              type: "search",
              label: "Search",
              placeholder: "Content or author...",
              value: searchQuery
            },
            {
              id: "rating",
              label: "Rating",
              type: "select",
              placeholder: "All Ratings",
              value: selectedRating,
              options: [
                { value: "5", label: "5 Stars" },
                { value: "4", label: "4 Stars" },
                { value: "3", label: "3 Stars" },
                { value: "2", label: "2 Stars" },
                { value: "1", label: "1 Star" },
              ]
            },
            {
              id: "type",
            label: "Category",
            type: "select",
            placeholder: "All Reviews",
            value: selectedType,
            options: [
              { value: "tour", label: "Tours" },
              { value: "accommodation", label: "Accommodations" },
              { value: "destination", label: "Destinations" },
            ]
          }
        ]}
        activeFiltersCount={activeFilterCount}
        onFilterChange={handleFilterChange}
        onClearAll={resetFilters}
        collapsible={true}
      />
      </div>

      <div className="organic-section-middle">
        {/* Main Content */}
        <section className="wp-template-archive__content py-section-lg">
        <Container>
          {/* Results Header */}
          <div className="wp-template-archive__results-header">
            <SectionHeader
              section={{
                eyebrow: "Voices from the Field",
                title: "Community Feedback",
                description: `Showing ${paginatedReviews.length} of ${filteredReviews.length} authentic traveler stories.`
              }}
              centered={false}
              className="m-0"
            />
            <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
          </div>

          {/* Grid or Empty State */}
          {paginatedReviews.length > 0 ? (
            <div className={viewMode === "list" ? "wp-template-archive__list" : "wp-template-archive__grid wp-template-archive__grid--cols-3"}>
              {paginatedReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  layout={viewMode === "list" ? "horizontal" : "card"}
                  onClick={() => navigateToReview(review.slug)}
                />
              ))}
            </div>
          ) : (
            <EmptyStatePattern
              icon="search"
              title="No reviews found"
              message="We couldn't find any reviews matching your current filters."
              primaryAction={{
                label: "Clear All Filters",
                onClick: resetFilters
              }}
            />
          )}

          {/* Pagination */}
          {filteredReviews.length > ITEMS_PER_PAGE && paginatedReviews.length > 0 && (
            <div className="wp-template-archive__pagination mt-12">
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
        {/* FAQ */}
        <FAQ
          items={faqData?.items || []}
          title={faqData?.sectionTitle || "Review Guidelines & FAQ"}
          intro={faqData?.sectionDescription || "Everything you need to know about our customer feedback process."}
        />

        {/* CTA */}
        <CTA
          title="Share Your Safari Adventure"
          description="Just returned from the wild? We'd love to hear about your experience and share your story with our community."
          variant="default"
          primaryAction={{
            label: "Submit a Review",
            onClick: () => navigateTo("/contact"),
          }}
          secondaryAction={{
            label: "Browse Tours",
            onClick: () => navigateTo("/tours"),
          }}
        />
      </div>
    </PageShell>
  );
}

export default ArchiveReviewTemplate;