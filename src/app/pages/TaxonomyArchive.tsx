/**
 * Universal Taxonomy Archive Page - WordPress Template
 * 
 * Dynamic taxonomy archive that renders content filtered by any taxonomy term.
 * Determines the content type and taxonomy from the URL path.
 */

import { useState, useMemo } from "react";
import { useParams, useLocation } from "react-router";
import { ArchiveHeader } from "../components/patterns/ArchiveHeader";
import { TourCard } from "../components/patterns/TourCard";
import { DestinationCard } from "../components/patterns/DestinationCard";
import { AccommodationCard } from "../components/patterns/AccommodationCard";
import { BlogCard } from "../components/patterns/BlogCard";
import { TeamCard } from "../components/patterns/TeamCard";
import { CardGrid } from "../components/patterns/CardGrid";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { Pagination } from "../components/patterns/Pagination";
import { ViewSwitcher, type ViewMode } from "../components/patterns/ViewSwitcher";
import { EmptyStatePattern } from "../components/patterns/EmptyStatePattern";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import {
  ALL_TOURS,
  ALL_DESTINATIONS,
  ALL_ACCOMMODATION,
  ALL_BLOG_POSTS,
  ALL_BLOG_CATEGORIES,
  ALL_BLOG_TAGS,
  ALL_TEAM,
  ALL_TRAVEL_STYLES,
  ALL_CONTINENTS,
  ALL_BRANDS,
  ALL_ACCOMMODATION_TYPES,
} from "../data/mockExpanded";
import { TRAVELLER_TYPES } from "../data/taxonomies/traveller-types";
import { FACILITIES } from "../data/taxonomies/facilities";
import { FAQ_GENERAL, getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";

const ITEMS_PER_PAGE = 12;

/**
 * Determines taxonomy context from the current URL path.
 */
function useTaxonomyContext() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith("/tours/travel-style/")) return { module: "tours", taxonomy: "travel-style", slug: slug || "" };
  if (path.startsWith("/travel-styles/")) return { module: "travel-styles", taxonomy: "travel-style", slug: slug || "" };
  if (path.startsWith("/traveller-types/")) return { module: "traveller-types", taxonomy: "traveller-type", slug: slug || "" };
  if (path.startsWith("/continents/")) return { module: "destinations", taxonomy: "continent", slug: slug || "" };
  if (path.startsWith("/accommodation-types/")) return { module: "accommodation", taxonomy: "type", slug: slug || "" };
  if (path.startsWith("/brands/")) return { module: "accommodation", taxonomy: "brand", slug: slug || "" };
  if (path.startsWith("/facilities/")) return { module: "accommodation", taxonomy: "facility", slug: slug || "" };
  if (path.startsWith("/categories/")) return { module: "blog", taxonomy: "category", slug: slug || "" };
  if (path.startsWith("/tags/")) return { module: "blog", taxonomy: "tag", slug: slug || "" };

  return { module: "unknown", taxonomy: "unknown", slug: slug || "" };
}

/**
 * Gets taxonomy term info and filtered items based on context.
 */
function useTaxonomyData(module: string, taxonomy: string, slug: string) {
  return useMemo(() => {
    switch (module) {
      case "tours":
      case "travel-styles": {
        const term = ALL_TRAVEL_STYLES.find(s => s.slug === slug);
        const items = term ? ALL_TOURS.filter(t => t.travelStyles?.includes(term.id)) : ALL_TOURS;
        return {
          termName: term?.name || slug,
          termDescription: term?.description || "",
          parentLabel: "Safari Tours",
          parentPath: "/tours",
          taxonomyLabel: "Travel Style",
          items,
          contentType: "tours" as const,
        };
      }
      case "traveller-types": {
        const term = TRAVELLER_TYPES.find(tt => tt.slug === slug);
        const items = term ? ALL_TOURS.filter(t => (t as any).travellerTypes?.includes(term.id) || term.tourIds.includes(t.id)) : ALL_TOURS;
        return {
          termName: term?.name || slug,
          termDescription: term?.description || "",
          parentLabel: "Safari Tours",
          parentPath: "/tours",
          taxonomyLabel: "Traveller Type",
          items,
          contentType: "tours" as const,
        };
      }
      case "destinations": {
        const term = ALL_CONTINENTS.find(c => c.slug === slug);
        const items = term ? ALL_DESTINATIONS.filter(d => term.destinationIds?.includes(d.id)) : ALL_DESTINATIONS;
        return {
          termName: term?.name || slug,
          termDescription: term?.description || "",
          parentLabel: "Destinations",
          parentPath: "/destinations",
          taxonomyLabel: "Continent",
          items,
          contentType: "destinations" as const,
        };
      }
      case "accommodation": {
        const term = taxonomy === "brand" ? ALL_BRANDS.find(b => b.slug === slug) : 
                     taxonomy === "type" ? ALL_ACCOMMODATION_TYPES.find(t => t.slug === slug) : 
                     taxonomy === "facility" ? FACILITIES.find(f => f.slug === slug) : 
                     ALL_TRAVEL_STYLES.find(s => s.slug === slug);
        const items = term ? ALL_ACCOMMODATION.filter(a => term.accommodationIds?.includes(a.id)) : ALL_ACCOMMODATION;
        return {
          termName: term?.name || slug,
          termDescription: term?.description || "",
          parentLabel: "Accommodation",
          parentPath: "/accommodation",
          taxonomyLabel: taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1),
          items,
          contentType: "accommodation" as const,
        };
      }
      case "blog": {
        const term = taxonomy === "category" ? ALL_BLOG_CATEGORIES.find(c => c.slug === slug) : ALL_BLOG_TAGS.find(t => t.slug === slug);
        const items = term ? (taxonomy === "category" ? ALL_BLOG_POSTS.filter(p => p.categories?.includes(term.id)) : ALL_BLOG_POSTS.filter(p => p.tags?.includes(term.id))) : ALL_BLOG_POSTS;
        return {
          termName: term?.name || slug,
          termDescription: term?.description || "",
          parentLabel: "Travel Blog",
          parentPath: "/blog",
          taxonomyLabel: taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1),
          items,
          contentType: "blog" as const,
        };
      }
      case "team": {
        const items = ALL_TEAM; // Simplified for team roles in this prototype
        return {
          termName: slug,
          termDescription: "",
          parentLabel: "Our Team",
          parentPath: "/team",
          taxonomyLabel: "Role",
          items,
          contentType: "team" as const,
        };
      }
      default:
        return {
          termName: slug,
          termDescription: "",
          parentLabel: "Archive",
          parentPath: "/",
          taxonomyLabel: "Category",
          items: [] as any[],
          contentType: "unknown" as const,
        };
    }
  }, [module, taxonomy, slug]);
}

/**
 * Taxonomy Archive Page Component
 */
export function TaxonomyArchive() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const { module, taxonomy, slug } = useTaxonomyContext();
  const data = useTaxonomyData(module, taxonomy, slug);
  const { navigateTo, navigateToTour, navigateToDestination, navigateToAccommodation } = useNavigation();

  const totalItemsCount = data.items.length;
  const totalPagesCount = Math.ceil(totalItemsCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = data.items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const displayName = data.termName.charAt(0).toUpperCase() + data.termName.slice(1);

  return (
    <article className="wp-template-archive">
      {/* Breadcrumbs */}
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: data.parentLabel, href: data.parentPath, onClick: () => navigateTo(data.parentPath) },
          ...(taxonomy === "facility" ? [{ label: "Facilities", href: "/facilities", onClick: () => navigateTo("/facilities") }] : []),
          { label: displayName },
        ]}
        fullWidth={true}
      />

      {/* Archive Header */}
      <ArchiveHeader
        title={displayName}
        description={data.termDescription || `Explore our curated selection of ${data.parentLabel.toLowerCase()} within the ${displayName} ${data.taxonomyLabel.toLowerCase()}.`}
        context={data.taxonomyLabel}
        itemCount={totalItemsCount}
      />

      {/* Content Section */}
      <section className="wp-template-archive__content">
        <Container>
          {/* Results Header */}
          <div className="wp-template-archive__results-header">
            <div>
              <h2 className="m-0">{data.parentLabel}</h2>
              <p className="wp-template-archive__results-count">
                Showing {paginatedItems.length} of {totalItemsCount} results for {displayName}
              </p>
            </div>
            <ViewSwitcher
              currentView={viewMode}
              onViewChange={setViewMode}
            />
          </div>

          {/* Grid or Empty State */}
          {paginatedItems.length > 0 ? (
            <div className={viewMode === "list" ? "wp-template-archive__list" : "wp-template-archive__grid wp-template-archive__grid--cols-3"}>
              {paginatedItems.map((item: any) => {
                switch (data.contentType) {
                  case "tours":
                    return <TourCard key={item.id} tour={item} layout={viewMode === "list" ? "horizontal" : "card"} onClick={() => navigateToTour(item.slug)} />;
                  case "destinations":
                    return <DestinationCard key={item.id} destination={item} layout={viewMode === "list" ? "horizontal" : "card"} onClick={() => navigateToDestination(item.slug)} />;
                  case "accommodation":
                    return <AccommodationCard key={item.id} accommodation={item} layout={viewMode === "list" ? "horizontal" : "card"} onClick={() => navigateToAccommodation(item.slug)} />;
                  case "blog":
                    return <BlogCard key={item.id} post={item} layout={viewMode === "list" ? "horizontal" : "card"} onClick={() => navigateTo(`/blog/${item.slug}`)} />;
                  case "team":
                    return <TeamCard key={item.id} member={item} layout={viewMode === "list" ? "horizontal" : "card"} onClick={() => navigateTo(`/team/${item.slug}`)} />;
                  default:
                    return null;
                }
              })}
            </div>
          ) : (
            <EmptyStatePattern
              icon="search"
              title="No results found"
              message={`We couldn't find any ${data.parentLabel.toLowerCase()} matching this category.`}
              primaryAction={{
                label: `Back to ${data.parentLabel}`,
                onClick: () => navigateTo(data.parentPath)
              }}
            />
          )}

          {/* Pagination */}
          {totalPagesCount > 1 && (
            <div className="wp-template-archive__pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPagesCount}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </Container>
      </section>

      {/* FAQ */}
      <FAQ
        items={FAQ_GENERAL.slice(0, 4)}
        title={`${displayName} Travel FAQ`}
        intro={`Expert answers to common questions about ${displayName.toLowerCase()} travel.`}
      />

      {/* CTA */}
      <CTA
        title={`Custom ${displayName} Experience`}
        description={`Our specialists can design a personalized journey tailored specifically to your interests in ${displayName}.`}
        variant="gradient"
        primaryAction={{
          label: "Talk to a Specialist",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: `All ${data.parentLabel}`,
          onClick: () => navigateTo(data.parentPath),
        }}
      />
    </article>
  );
}

export default TaxonomyArchive;