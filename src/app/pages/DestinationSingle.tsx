/**
 * Destination Single Page - WordPress Template
 * 
 * Single destination detail page with climate info, highlights, and expeditions.
 * Maps to WordPress single-destination.php template.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Hero } from "../components/patterns/Hero";
import { FastFacts } from "../components/patterns/FastFacts";
import { RelatedContent } from "../components/patterns/RelatedContent";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { HighlightsGridPattern } from "../components/patterns/HighlightsGridPattern";
import { ClimateInfoPattern } from "../components/patterns/ClimateInfoPattern";
import { MapSectionPattern } from "../components/patterns/MapSectionPattern";
import { ReviewsSectionPattern } from "../components/patterns/ReviewsSectionPattern";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { GallerySectionPattern } from "../components/patterns/GallerySectionPattern";
import { Container } from "../components/common/Container";
import { ToursForDestinationBlock } from "../components/blocks/tour-operator/ToursForDestinationBlock";
import { RelatedRegionsBlock } from "../components/blocks/tour-operator/RelatedRegionsBlock";
import { DESTINATIONS, TOURS, FAQ_DESTINATION, REVIEWS } from "../data/mock";
import { MapPin, Sun, Translate as Languages, Money as Banknote, Clock, Camera, Mountains as Mountain, Compass, Globe } from "@phosphor-icons/react";
import { useNavigation } from "../contexts/NavigationContext";
import { motion } from "motion/react";

export function DestinationSingle() {
  const destination = DESTINATIONS[0]; // Example destination
  const { navigateToDestination, navigateToTour, navigateTo } = useNavigation();

  const relatedTours = TOURS.filter(tour => tour.destinations.includes(destination.id));
  const childDestinations = DESTINATIONS.filter(dest => dest.parentId === destination.id);

  const fastFacts = [
    { icon: Sun, label: "Best Season", value: destination.bestTime || "May - October" },
    { icon: Languages, label: "Language", value: destination.language || "English / Swahili" },
    { icon: Banknote, label: "Currency", value: destination.currency || "USD / Local" },
    { icon: Clock, label: "Timezone", value: destination.timezone || "GMT +3" },
  ];

  const galleryImages = [
    { id: '1', src: destination.featuredImage, alt: "Primary view", caption: "The heart of the territory" },
    { id: '2', src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e", alt: "Wildlife", caption: "Soul-stirring wildlife" },
    { id: '3', src: "https://images.unsplash.com/photo-1511497584788-876760111969", alt: "Landscape", caption: "Vast horizons" },
    { id: '4', src: "https://images.unsplash.com/photo-1523805081446-ed9a96a2b5ef", alt: "Detail", caption: "The smaller stories" },
  ];

  const parentDestination = destination.parentId ? DESTINATIONS.find(d => d.id === destination.parentId) : undefined;

  return (
    <article className="wp-template-single-destination theme-organic">
      <div className="organic-section-top">
        <BreadcrumbsPattern
          items={[
            { label: "Home", href: "/", onClick: () => navigateTo("/") },
            { label: "Territories", href: "/destinations", onClick: () => navigateTo("/destinations") },
            ...(parentDestination ? [{ label: parentDestination.title, href: `/destinations/${parentDestination.slug}` }] : []),
            { label: destination.title },
          ]}
          fullWidth={true}
        />

        <Hero
          title={destination.title}
          intro={destination.excerpt}
          context={destination.parentId ? "Territory Region" : "Primary Territory"}
          image={destination.featuredImage}
          height="large"
          primaryCTA={{ label: "View Expeditions", onClick: () => document.getElementById('tours-section')?.scrollIntoView({ behavior: 'smooth' }) }}
          secondaryCTA={{ label: "Plan My Trip", onClick: () => navigateTo("/trip-planner"), variant: "outline" }}
          animated
        />

        <FastFacts facts={fastFacts} />
      </div>

      <div className="organic-section-middle">
        <section className="py-section-md border-b border-border/50">
          <Container>
            <div className="grid lg:grid-cols-12 gap-fluid-xl">
              <div className="lg:col-span-8">
                <EditorialContent
                  title={`Portrait of ${destination.title}`}
                  subtitle="A definitive guide to the region"
                  content={destination.content}
                  className="p-0 border-0 bg-transparent"
                />
                
                <div className="pt-[calc(var(--spacing-section-sm)*2)] border-t border-[color:var(--color-border)]/50">
                  <GallerySectionPattern 
                    images={galleryImages}
                    title="Territory Visuals"
                    description="Immerse yourself in the distinct atmosphere and profound scale of this legendary landscape."
                  />
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div className="sticky top-32 flex flex-col gap-element-lg">
                  {childDestinations.length > 0 && (
                    <div className="p-element-xl rounded-[var(--radius-lg)] bg-card border-2 border-border shadow-xl flex flex-col gap-element-md">
                      <div className="flex items-center gap-element-sm">
                        <Globe className="size-5 text-primary" />
                        <span className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-primary">Regional Subdivisions</span>
                      </div>
                      <h3 className="text-fluid-2xl font-[var(--font-weight-bold)] font-[family-name:var(--font-family-lora)] wp-text--hand">Explore Areas</h3>
                      <div className="flex flex-col gap-element-sm">
                        {childDestinations.map(child => (
                          <button
                            key={child.id}
                            onClick={() => navigateToDestination(child.slug)}
                            className="w-full group text-left p-element-md rounded-[var(--radius-md)] hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all flex items-center justify-between"
                          >
                            <span className="font-[var(--font-weight-bold)] text-foreground group-hover:text-primary transition-colors">{child.title}</span>
                            <Compass className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-element-xl rounded-[var(--radius-lg)] bg-muted/30 border-2 border-border/50 flex flex-col gap-element-sm">
                    <h4 className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-foreground">Must-Experience</h4>
                    <ul className="flex flex-col gap-element-sm m-0 p-0 list-none">
                      {destination.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-element-sm text-fluid-sm text-muted-foreground">
                          <MapPin className="size-4 text-primary translate-y-0.5 shrink-0" /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        <HighlightsGridPattern
          title="Territory Highlights"
          description={`The defining features that make ${destination.title} one of the world's most sought-after wilderness experiences.`}
          highlights={destination.highlights.map((h, i) => ({
            id: `h-${i}`,
            title: h,
            description: "A foundational element of the regional identity.",
            icon: [Camera, MapPin, Mountain, Compass][i % 4]
          }))}
        />
      </div>

      <div className="organic-section-middle-alt">
        <ClimateInfoPattern
          seasonalInfo={[
            {
              name: "The Dry Season",
              months: "May - September",
              description: "Exceptional wildlife viewing as animals congregate at water sources. Cool mornings and clear, bright days.",
              bestFor: ["Safaris", "Walking Expeditions", "Photography"]
            },
            {
              name: "The Green Season",
              months: "November - March",
              description: "Thriving landscapes, newborn wildlife, and migratory birds. Dramatic afternoon skies and intimate experiences.",
              bestFor: ["Birding", "Landscape Art", "Conservation Tours"]
            }
          ]}
          variant="seasons"
        />

        {destination.coordinates && (
          <MapSectionPattern
            title="Regional Cartography"
            description={`Navigating the diverse ecosystems and landmarks within ${destination.title}.`}
            location={{
              name: destination.title,
              lat: destination.coordinates.lat,
              lng: destination.coordinates.lng,
              address: "Primary Region Coordinates"
            }}
          />
        )}

        <ReviewsSectionPattern
          title="Territory Voices"
          description="Perspectives from those who have immersed themselves in this landscape."
          reviews={REVIEWS.filter(r => r.destinationId === destination.id).map(r => ({
            id: r.id, author: r.author, content: r.content, rating: r.rating, date: r.date, location: r.authorLocation, avatar: r.featuredImage
          }))}
        />
      </div>

      <div className="organic-section-bottom">
        <section id="tours-section" className="py-section-md border-t border-border/50">
          <Container className="flex flex-col gap-fluid-xl">
            <div className="flex flex-col md:flex-row justify-between items-end gap-fluid-lg">
              <div className="max-w-2xl flex flex-col gap-element-xs">
                <span className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-primary block">Curation</span>
                <h2 className="text-fluid-4xl font-[var(--font-weight-bold)] font-[family-name:var(--font-family-lora)] wp-text--hand">Expeditions in {destination.title}</h2>
              </div>
              <button 
                onClick={() => navigateTo("/tours")}
                className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-primary hover:underline underline-offset-8 transition-all"
              >
                View All Tours →
              </button>
            </div>
            <ToursForDestinationBlock
              destinationId={destination.id}
              postsPerPage={6}
              onNavigate={(slug) => navigateToTour(slug)}
            />
          </Container>
        </section>

        <FAQ
          items={FAQ_DESTINATION}
          title="Territory Intelligence"
          intro="Technical details and essential protocols for visiting this region."
        />

        <CTA
          title={`Plan Your ${destination.title} Expedition`}
          description="Our master architects are waiting to craft your legendary journey. Discover the true heart of the wild with expert guidance."
          variant="default"
          primaryAction={{ label: "Begin Custom Design", onClick: () => navigateTo("/contact") }}
          secondaryAction={{ label: "Explore All Territories", onClick: () => navigateTo("/destinations") }}
        />
      </div>
    </article>
  );
}

export default DestinationSingle;