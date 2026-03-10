/**
 * Archive Blog Template - Content Hub Archetype
 * 
 * Displays archive of all blog posts with category filtering and search.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState, useMemo } from "react";
import { PageShell } from "../components/parts/PageShell";
import { TaxonomyNav } from "../components/patterns/TaxonomyNav";
import { BlogCard } from "../components/patterns/BlogCard";
import { CardGrid } from "../components/patterns/CardGrid";
import { CTA } from "../components/patterns/CTA";
import { Pagination } from "../components/patterns/Pagination";
import { ViewSwitcher, type ViewMode } from "../components/patterns/ViewSwitcher";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";
import { EmptyStatePattern } from "../components/patterns/EmptyStatePattern";
import { FAQ } from "../components/patterns/FAQ";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { NewsletterSignupPattern } from "../components/patterns/NewsletterSignupPattern";
import { 
  ALL_BLOG_POSTS, 
  ALL_BLOG_CATEGORIES 
} from "../data/mockExpanded";
import { getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { useBlogFilters } from "../hooks/useBlogFilters";
import { Newspaper } from "@phosphor-icons/react";

export function ArchiveBlogTemplate() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const ITEMS_PER_PAGE = 12;

  const {
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredPosts,
    paginatedPosts,
    totalPages,
    resetFilters
  } = useBlogFilters(ALL_BLOG_POSTS, ITEMS_PER_PAGE);

  const faqData = getPageSectionFAQs("blog-archive");

  const { navigateToBlogPost, navigateTo } = useNavigation();

  return (
    <PageShell context="blog-archive" as="main" className="wp-template-archive-blog">
      <TaxonomyNav
        label="Subject"
        terms={ALL_BLOG_CATEGORIES}
        activeId={selectedCategory === "all" ? undefined : selectedCategory}
        onTermClick={(id) => { setSelectedCategory(id || "all"); setCurrentPage(1); }}
      />

      <SearchFilterPattern
        searchPlaceholder="Explore stories..."
        onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
        onClearAll={resetFilters}
        collapsible={true}
      />

      <section className="wp-template-archive__content">
        <Container>
          <div className="wp-template-archive__results-header">
            <SectionHeader
              section={{
                eyebrow: "Latest Updates",
                title: "Editorial Collection",
                description: `Discover ${filteredPosts.length} expert insights and traveler stories.`
              }}
              centered={false}
              className="m-0"
            />
            <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
          </div>

          {paginatedPosts.length > 0 ? (
            <div className={viewMode === "list" ? "wp-template-archive__list" : "wp-template-archive__grid wp-template-archive__grid--cols-3"}>
              {paginatedPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  layout={viewMode === "list" ? "horizontal" : "card"}
                  onClick={() => navigateToBlogPost(post.slug)}
                />
              ))}
            </div>
          ) : (
            <EmptyStatePattern
              icon="search"
              title="No Stories Found"
              message="We couldn't find any articles matching your search. Try different keywords or browse a different category."
              primaryAction={{
                label: "Browse All Stories",
                onClick: resetFilters,
              }}
            />
          )}

          {filteredPosts.length > ITEMS_PER_PAGE && (
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

      <section className="py-section-lg bg-muted/30 border-y border-border/50">
        <Container maxWidth="narrow">
          <div className="p-10 md:p-16 rounded-3xl bg-background border-2 border-border shadow-2xl relative overflow-hidden">
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

      <FAQ
        items={faqData?.items}
        title="Travel Wisdom"
        intro="Common questions about planning your journey and what to expect on the ground."
      />

      <CTA
        title="Ready to Start Your Journey?"
        description="Our specialists are available to help you design a bespoke itinerary that matches your curiosity and pace."
        variant="gradient"
        primaryAction={{ 
          label: "Request a Proposal", 
          onClick: () => navigateTo("/contact") 
        }}
        secondaryAction={{
          label: "Try Trip Planner",
          onClick: () => navigateTo("/trip-planner"),
        }}
      />
    </PageShell>
  );
}

export default ArchiveBlogTemplate;