/**
 * Single Accommodation Template
 * 
 * Comprehensive accommodation detail page composed from dedicated blocks.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useParams } from "react-router";
import {
  MapPin, Buildings as Hotel, Star, Shield, Heart, ShieldCheck, Medal as Award
} from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { FastFacts } from "../components/patterns/FastFacts";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { RoomTypesPattern } from "../components/patterns/RoomTypesPattern";
import { PricingSectionPattern } from "../components/patterns/PricingSectionPattern";
import { ReviewsSectionPattern } from "../components/patterns/ReviewsSectionPattern";
import { GallerySectionPattern } from "../components/patterns/GallerySectionPattern";
import { RelatedAccommodationsBlock } from "../components/blocks/tour-operator/RelatedAccommodationsBlock";
import { FacilityBadges } from "../components/patterns/FacilityBadges";
import { useNavigation } from "../contexts/NavigationContext";
import { 
  ALL_ACCOMMODATION, ALL_DESTINATIONS, ALL_ACCOMMODATION_TYPES, ALL_REVIEWS 
} from "../data/mockExpanded";
import { FAQ_ACCOMMODATION } from "../data/mock";
import { motion } from "motion/react";

export function SingleAccommodationTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateToAccommodation, navigateToDestination, navigateTo } = useNavigation();
  
  const accommodation = ALL_ACCOMMODATION.find(a => a.slug === slug) || ALL_ACCOMMODATION[0];
  const destination = accommodation.destinations?.[0] 
    ? ALL_DESTINATIONS.find(dest => dest.id === accommodation.destinations[0])
    : undefined;
  const accType = accommodation.types?.[0]
    ? ALL_ACCOMMODATION_TYPES.find(type => type.id === accommodation.types[0])
    : undefined;

  const fastFacts = [
    { icon: Hotel, label: "Estate Category", value: accType?.name || "Sanctuary" },
    { icon: MapPin, label: "Precise Location", value: accommodation.location || destination?.title || "Secluded" },
    { icon: Star, label: "Estate Rating", value: `${accommodation.rating || 0} Star Experience` },
  ];

  const galleryImages = [
    { id: '1', src: accommodation.featuredImage, alt: "Primary facade", caption: "The architecture of stillness" },
    { id: '2', src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", alt: "Interior detail", caption: "Refined sanctuary living" },
    { id: '3', src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e", alt: "Vista", caption: "Horizon-bound perspectives" },
    { id: '4', src: "https://images.unsplash.com/photo-1511497584788-876760111969", alt: "Wildlife near property", caption: "Where wilderness meets welcome" },
  ];

  return (
    <main className="wp-template-single-accommodation theme-organic">
      <div className="organic-section-top">
        <BreadcrumbsPattern
          items={[
            { label: "Home", href: "/", onClick: () => navigateTo("/") },
            { label: "Our Sanctuaries", href: "/accommodation", onClick: () => navigateTo("/accommodation") },
            ...(destination ? [{ label: destination.title, href: `/destinations/${destination.slug}`, onClick: () => navigateToDestination(destination.slug) }] : []),
            { label: accommodation.title, isCurrent: true },
          ]}
          fullWidth={true}
        />

        <Hero
          title={accommodation.title}
          intro={accommodation.excerpt}
          context={accType?.name}
          image={accommodation.featuredImage}
          height="large"
          primaryCTA={{
            label: "Inquire About Availability",
            onClick: () => document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
          secondaryCTA={{
            label: "Personalized Concierge",
            onClick: () => navigateTo("/contact"),
            variant: "outline"
          }}
          animated
        />

        <FastFacts facts={fastFacts} />
      </div>

      <div className="organic-section-middle">
        <section className="py-section-md border-b border-border/50">
          <Container>
            <div className="grid lg:grid-cols-12 gap-fluid-xl">
              <div className="lg:col-span-8 flex flex-col gap-section-sm">
                <EditorialContent
                  title={`Portrait of ${accommodation.title}`}
                  subtitle="The definitive wilderness estate experience"
                  content={accommodation.content}
                  className="p-0 border-0 bg-transparent"
                />
                
                <div className="pt-section-sm border-t border-border/50">
                  <GallerySectionPattern 
                    images={galleryImages}
                    title="Estate Visuals"
                    description="A glimpse into the refined atmosphere and raw natural beauty of this legendary property."
                  />
                </div>

                <div id="rooms-section" className="pt-section-sm border-t border-border/50">
                  <RoomTypesPattern
                    title="Your Personal Sanctuary"
                    description="Select from our meticulously designed suites and canvas villas."
                    rooms={[
                      {
                        id: "1",
                        name: "Signature Wilderness Suite",
                        description: "Panoramic vistas, private plunge pool, and bespoke artisanal furnishings.",
                        price: "850",
                        capacity: 2,
                        amenities: ["Private Pool", "Canvas Views", "Concierge"],
                        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
                        availability: "available"
                      },
                      {
                        id: "2",
                        name: "Heritage Lodge Estate",
                        description: "Expansive living spaces featuring local stone architecture and profound intimacy.",
                        price: "1,200",
                        capacity: 4,
                        amenities: ["Gourmet Kitchen", "Private Guide", "Sun Deck"],
                        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                        availability: "limited"
                      }
                    ]}
                    cta={{ label: "Reserve Suite", onClick: () => navigateTo("/booking") }}
                  />
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div className="sticky top-32 flex flex-col gap-element-lg">
                  <div className="p-element-xl rounded-[var(--radius-lg)] bg-card border-2 border-border shadow-xl flex flex-col gap-element-lg">
                    <div className="flex items-center gap-element-sm">
                      <ShieldCheck className="size-5 text-primary" />
                      <span className="text-fluid-xs font-bold uppercase tracking-widest text-primary">Certified Sanctuary</span>
                    </div>
                    <h3 className="text-fluid-2xl font-bold font-serif wp-text--hand">Estate Intelligence</h3>
                    <ul className="flex flex-col gap-element-lg m-0 p-0 list-none">
                      <li className="flex items-start gap-element-md">
                        <div className="p-element-sm rounded-[var(--radius-sm)] bg-primary/5 text-primary shrink-0"><Shield className="size-4" /></div>
                        <div className="flex flex-col gap-element-xs">
                          <p className="text-fluid-sm font-bold">Discrete Protection</p>
                          <p className="text-fluid-xs text-muted-foreground m-0">24/7 specialist-led security protocols.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-element-md">
                        <div className="p-element-sm rounded-[var(--radius-sm)] bg-primary/5 text-primary shrink-0"><Heart className="size-4" /></div>
                        <div className="flex flex-col gap-element-xs">
                          <p className="text-fluid-sm font-bold">Regenerative Luxury</p>
                          <p className="text-fluid-xs text-muted-foreground m-0">Zero-footprint operations and community equity.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-element-md">
                        <div className="p-element-sm rounded-[var(--radius-sm)] bg-primary/5 text-primary shrink-0"><Award className="size-4" /></div>
                        <div className="flex flex-col gap-element-xs">
                          <p className="text-fluid-sm font-bold">Global Distinction</p>
                          <p className="text-fluid-xs text-muted-foreground m-0">Voted Top Wilderness Lodge 2025.</p>
                        </div>
                      </li>
                    </ul>
                    
                    <button 
                      onClick={() => navigateTo("/contact")}
                      className="w-full py-element-sm rounded-[var(--radius-md)] bg-primary text-primary-foreground font-bold hover:shadow-2xl transition-all"
                    >
                      Contact Estate Concierge
                    </button>
                  </div>

                  {accommodation.facilities && (
                    <FacilityBadges
                      facilityIds={accommodation.facilities}
                      limit={8}
                    />
                  )}
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-middle-alt">
        <PricingSectionPattern
          title="Investment Portfolio"
          description="Rates are curated by travel period to reflect the peak rhythms of the wilderness."
          prices={[
            { period: "Prime Crossing (Dec-Feb)", price: "1,200", availability: "limited" },
            { period: "Wildflower Rhythm (Jun-Aug)", price: "850", availability: "available", note: "Value Season" },
          ]}
          variant="table"
        />

        <ReviewsSectionPattern
          title="Guest Testimonials"
          description="Profound reflections from those who have immersed themselves in our sanctuary."
          reviews={ALL_REVIEWS.filter(r => r.accommodationId === accommodation.id).map(r => ({
            id: r.id, author: r.author, content: r.content, rating: r.rating, date: r.date, location: r.authorLocation, avatar: r.featuredImage
          }))}
        />
      </div>

      <div className="organic-section-bottom">
        <Container className="py-section-md border-t border-border/50">
          <RelatedAccommodationsBlock
            currentAccommodationId={accommodation.id}
            destinationId={accommodation.destinations?.[0]}
            postsPerPage={3}
            onNavigate={(slug) => navigateToAccommodation(slug)}
          />
        </Container>

        <FAQ
          items={FAQ_ACCOMMODATION}
          title="Estate Protocols"
          intro="Technical details regarding your stay, from private aviation arrivals to dietary mastery."
        />

        <CTA
          title="Answer the Echo of the Wilderness"
          description={`Secure your immersive stay at ${accommodation.title}. The heart of Africa is waiting to welcome you.`}
          variant="default"
          primaryAction={{ label: "Begin Reservation", onClick: () => navigateTo("/booking") }}
          secondaryAction={{ label: "View All Sanctuaries", onClick: () => navigateTo("/accommodation") }}
        />
      </div>
    </main>
  );
}

export default SingleAccommodationTemplate;