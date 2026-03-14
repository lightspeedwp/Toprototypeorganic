/**
 * Archive Blog Template - Content Hub Archetype
 * 
 * Displays archive of all blog posts with category filtering and search.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState } from "react";
import { PageShell } from "../components/parts/PageShell";
import { TaxonomyNav } from "../components/patterns/TaxonomyNav";
import { BlogCard } from "../components/patterns/BlogCard";
import { CTA } from "../components/patterns/CTA";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";
import { FAQ } from "../components/patterns/FAQ";
import { ActiveFilterSummary, searchFilterTag, singleFilterTag, buildFilterTags } from "../components/patterns/ActiveFilterSummary";
import { Container } from "../components/common/Container";
import { NewsletterSignupPattern } from "../components/patterns/NewsletterSignupPattern";
import { ArchiveResultsSection } from "../components/patterns/ArchiveResultsSection";
import { 
  ALL_BLOG_POSTS, 
  ALL_BLOG_CATEGORIES 
} from "../data/mockExpanded";
import { getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { useBlogFilters } from "../hooks/useBlogFilters";
import { Newspaper } from "@phosphor-icons/react";
import type { ViewMode } from "../components/patterns/ViewSwitcher";

export function ArchiveBlogTemplate() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const ITEMS_PER_PAGE = 12;

  const {
    currentPage,
    setCurrentPage,
    resetPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    flushSearch,
    filteredPosts,
    paginatedPosts,
    totalPages,
    resetFilters
  } = useBlogFilters(ALL_BLOG_POSTS, ITEMS_PER_PAGE);

  const faqData = getPageSectionFAQs("blog-archive");

  const { navigateToBlogPost, navigateTo } = useNavigation();

  return (
    <PageShell context="blog-archive" as="main" className="wp-template-archive-blog theme-organic">
      <div className="organic-section-top">
        <TaxonomyNav
          label="Subject"
          terms={ALL_BLOG_CATEGORIES}
          activeId={selectedCategory === "all" ? undefined : selectedCategory}
          onTermClick={(id) => { setSelectedCategory(id || "all"); resetPage(); }}
        />

        <SearchFilterPattern
          searchPlaceholder="Explore stories..."
          onSearchChange={(q) => { setSearchQuery(q); resetPage(); }}
          onSearchSubmit={flushSearch}
          onClearAll={resetFilters}
          collapsible={true}
        />

        {/* Active Filter Summary */}
        <Container>
          <ActiveFilterSummary
            tags={buildFilterTags(
              searchFilterTag(searchQuery, () => { setSearchQuery(""); resetPage(); }),
              singleFilterTag(
                "cat",
                selectedCategory,
                ALL_BLOG_CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory,
                () => { setSelectedCategory("all"); resetPage(); },
                "all"
              ),
            )}
            onClearAll={resetFilters}
          />
        </Container>
      </div>

      <div className="organic-section-middle">
        <ArchiveResultsSection
          header={{
            eyebrow: "Latest Updates",
            title: "Editorial Collection",
            description: `Discover ${filteredPosts.length} expert insights and traveler stories.`,
          }}
          items={paginatedPosts}
          totalFiltered={filteredPosts.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          renderItem={(post, vm) => (
            <BlogCard
              key={post.id}
              post={post}
              layout={vm === "list" ? "horizontal" : "card"}
              onClick={() => navigateToBlogPost(post.slug)}
            />
          )}
          emptyState={{
            icon: "search",
            title: "No Stories Found",
            message: "We couldn't find any articles matching your search. Try different keywords or browse a different category.",
            actionLabel: "Browse All Stories",
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

      <div className="organic-section-middle-alt">
        <section className="py-section-md bg-muted/30 border-y border-border/50">
          <Container maxWidth="narrow">
            <div className="p-element-xl rounded-[var(--radius-lg)] bg-background border-2 border-border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Newspaper className="size-48" />
              </div>
              <NewsletterSignupPattern
                title="The Safari Insider"
                description="Join 15,000+ explorers. Get monthly destination guides, conservation news, and exclusive early-access to seasonal offers."
                variant="minimal"
              />
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-bottom">
        <FAQ
          items={faqData?.items}
          title="Travel Wisdom"
          intro="Common questions about planning your journey and what to expect on the ground."
        />

        <CTA
          title="Ready to Start Your Journey?"
          description="Our specialists are available to help you design a bespoke itinerary that matches your curiosity and pace."
          variant="default"
          primaryAction={{ 
            label: "Request a Proposal", 
            onClick: () => navigateTo("/contact") 
          }}
          secondaryAction={{
            label: "Try Trip Planner",
            onClick: () => navigateTo("/trip-planner"),
          }}
        />
      </div>
    </PageShell>
  );
}

export default ArchiveBlogTemplate;