/**
 * Single Destination Template - Modern Enhanced Version
 * 
 * Comprehensive destination detail page with modern design, smooth animations,
 * and all necessary sections for a complete destination presentation.
 * 
 * **Template Structure:**
 * 1. Breadcrumbs navigation (with hierarchy)
 * 2. Hero section with destination image
 * 3. Quick facts sidebar
 * 4. Destination overview (editorial content)
 * 5. Climate & best time to visit
 * 6. Top highlights/attractions
 * 7. Gallery section
 * 8. Related regions (child destinations)
 * 9. Related tours
 * 10. Related accommodation
 * 11. FAQ section
 * 12. CTA section
 * 
 * **WordPress Mapping:**
 * - Template: templates/single-destination.html
 * - Post Type: destination (hierarchical)
 * - Archetype: Single Detail
 * 
 * @module SingleDestinationTemplate
 * @category templates
 * @wordpressTemplate single-destination
 */

import { useParams } from "react-router";
import {
  MapPin,
  Calendar,
  Sun,
  CloudRain,
  Compass,
  Users,
  Medal as Award,
  Camera,
  MapTrifold as Map,
  TrendUp as TrendingUp,
  Heart,
  EnvelopeSimple as Mail,
} from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { Hero } from "../components/patterns/Hero";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { FastFacts } from "../components/patterns/FastFacts";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { CardGrid } from "../components/patterns/CardGrid";
import { TourCard } from "../components/patterns/TourCard";
import { AccommodationCard } from "../components/patterns/AccommodationCard";
import { DestinationCard } from "../components/patterns/DestinationCard";
import { GallerySectionPattern } from "../components/patterns/GallerySectionPattern";
import { DestinationRelatedToursBlock } from "../components/blocks/DestinationRelatedToursBlock";
import { DestinationRelatedAccommodationBlock } from "../components/blocks/DestinationRelatedAccommodationBlock";
import { DestinationCollectionBlock } from "../components/blocks/DestinationCollectionBlock";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";

// Contexts & Hooks
import { useNavigation } from "../contexts/NavigationContext";

// Data
import { ALL_DESTINATIONS as DESTINATIONS, ALL_TOURS as TOURS, ALL_ACCOMMODATION as ACCOMMODATION } from "../data/mockExpanded";
import { getAllFAQsByCategory, FAQ_DESTINATIONS } from "../data/faqs";
import { cn } from "../lib/utils";

/**
 * Single Destination Template Component.
 * 
 * Complete destination detail page with all sections needed for
 * presenting destination information and inspiring bookings.
 * 
 * @component
 * @category templates
 */
function SingleDestinationTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateTo, navigateToDestination, navigateToTour, navigateToAccommodation } = useNavigation();

  // Find destination by slug, fallback to first
  const destination = DESTINATIONS.find(d => d.slug === slug) || DESTINATIONS[0];

  // Get parent destination if exists
  const parentDestination = destination.parentId
    ? DESTINATIONS.find((d) => d.id === destination.parentId)
    : null;

  // Get child destinations (if this is a parent)
  const childDestinations = DESTINATIONS.filter(
    (d) => d.parentId === destination.id
  ).slice(0, 6);

  // Get related tours
  const relatedTours = TOURS.filter((tour) =>
    tour.destinations.includes(destination.id)
  ).slice(0, 6);

  // Get related accommodations
  const relatedAccommodations = ACCOMMODATION.filter((acc) =>
    acc.destinations.includes(destination.id)
  ).slice(0, 6);

  // Mock gallery images
  const galleryImages = [
    {
      id: "1",
      src: destination.featuredImage,
      alt: destination.name,
      caption: `Experience the beauty of ${destination.name}`,
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200",
      alt: `${destination.name} landscape`,
      caption: "Stunning vistas await",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200",
      alt: `${destination.name} wildlife`,
      caption: "Encounter incredible wildlife",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1474861644511-0f2775ae97cc?w=1200",
      alt: `${destination.name} culture`,
      caption: "Immerse in local culture",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200",
      alt: `${destination.name} adventures`,
      caption: "Thrilling adventures",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
      alt: `${destination.name} sunsets`,
      caption: "Unforgettable sunsets",
    },
  ];

  // FAQ data — merge destination-specific dynamic FAQ with continent-relevant FAQs from data layer
  const CONTINENT_FAQ_MAP: Record<string, string> = {
    "continent-2": "asia",
    "continent-3": "europe",
  };
  const continentFaqCategory = CONTINENT_FAQ_MAP[destination.continentId];
  const continentFaqs = continentFaqCategory
    ? getAllFAQsByCategory(continentFaqCategory).slice(0, 4)
    : [];
  const generalDestFaqs = FAQ_DESTINATIONS.slice(0, 3);
  const destinationFAQs = [
    {
      id: `faq-dest-${destination.slug}-best-time`,
      slug: `best-time-${destination.slug}`,
      question: `What is the best time to visit ${destination.name}?`,
      answer: `The best time to visit ${destination.name} is ${destination.bestTime}. The climate is ${destination.climate}, which makes this period ideal for outdoor activities, wildlife viewing, and comfortable exploration. However, ${destination.name} offers unique experiences year-round depending on your interests.`,
      excerpt: `Best travel season for ${destination.name}.`,
      categories: ["destinations"],
      featured: false,
      order: 0,
      helpfulCount: 0,
      viewCount: 0,
    },
    ...continentFaqs,
    ...generalDestFaqs,
  ];

  // Climate data
  const climateInfo = {
    summer: {
      months: "November - March",
      temp: "25-35°C (77-95°F)",
      description:
        "Warm and sunny with occasional afternoon showers. Peak tourist season with the best beach weather.",
    },
    autumn: {
      months: "April - May",
      temp: "18-25°C (64-77°F)",
      description:
        "Pleasant temperatures with fewer crowds. Excellent for outdoor activities and city exploration.",
    },
    winter: {
      months: "June - August",
      temp: "8-18°C (46-64°F)",
      description:
        "Cooler and wetter, but great for whale watching. Off-peak season with lower prices and fewer tourists.",
    },
    spring: {
      months: "September - October",
      temp: "15-23°C (59-73°F)",
      description:
        "Wildflowers bloom and temperatures rise. Shoulder season with good weather and moderate crowds.",
    },
  };

  return (
    <main className="theme-organic">
      <div className="organic-section-top">
        {/* Breadcrumbs */}
        <BreadcrumbsPattern
          items={[
            { label: "Home", href: "/", onClick: () => navigateTo("/") },
            { label: "Destinations", href: "/destinations", onClick: () => navigateTo("/destinations") },
            ...(parentDestination ? [{ label: parentDestination.title, href: `/destinations/${parentDestination.slug}`, onClick: () => navigateToDestination(parentDestination.slug) }] : []),
            { label: destination.title, isCurrent: true },
          ]}
          fullWidth={true}
        />

        {/* Hero Section */}
        <Hero
          title={destination.title}
          intro={destination.excerpt}
          image={destination.featuredImage}
          overlay="medium"
          height="large"
          primaryCTA={{
            label: "Explore Tours",
            onClick: () => {
              const el = document.getElementById('related-tours');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            },
          }}
          secondaryCTA={{
            label: "Plan My Trip",
            onClick: () => navigateTo("/trip-planner"),
          }}
          animated
        />
      </div>

      <div className="organic-section-middle">
        {/* Main Content Grid */}
        <section className="py-section-sm md:py-section-md">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 flex flex-col gap-12">
              {/* Destination Overview */}
              <EditorialContent
                title={`About ${destination.name}`}
                content={`
                  <p>${destination.content}</p>
                  
                  <p>${destination.name} captivates visitors with its unique blend of natural beauty, rich culture, and unforgettable experiences. Whether you're seeking adventure, relaxation, or cultural immersion, this destination offers something for every type of traveler.</p>
                  
                  <h3>Why Visit ${destination.name}</h3>
                  <p>From world-renowned landmarks to hidden gems known only to locals, ${destination.name} promises an extraordinary journey. Our expert guides will take you beyond the typical tourist experience to discover the authentic heart of this remarkable destination.</p>
                `}
                variant="default"
                animated
              />

              {/* Top Highlights */}
              <div className="flex flex-col gap-fluid-md">
                <div className="flex items-center gap-2">
                  <Award size={24} className="text-primary" />
                  <h2>Top Highlights & Attractions</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {destination.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-6 rounded-[var(--radius-lg)] border border-border",
                        "bg-card wp-bg-accent-hover",
                        "transition-colors duration-200"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="size-8 rounded-[var(--radius-full)] bg-primary/10 flex items-center justify-center">
                            <MapPin size={16} className="text-primary" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <h4 className="text-fluid-lg">{highlight}</h4>
                          <p className="text-fluid-sm text-muted-foreground">
                            A must-see attraction that showcases the best of what {destination.name} has to offer.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Climate & Best Time to Visit */}
              <div className="flex flex-col gap-fluid-md">
                <div className="flex items-center gap-2">
                  <Sun size={24} className="text-primary" />
                  <h2>Climate & Best Time to Visit</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {([
                    { key: "summer", icon: <Sun size={20} className="text-accent" />, label: "Summer" },
                    { key: "autumn", icon: <Calendar size={20} className="text-secondary" />, label: "Autumn" },
                    { key: "winter", icon: <CloudRain size={20} className="text-info" />, label: "Winter" },
                    { key: "spring", icon: <TrendingUp size={20} className="text-success" />, label: "Spring" },
                  ] as const).map(({ key, icon, label }) => {
                    const info = climateInfo[key];
                    return (
                      <div key={key} className="p-6 rounded-[var(--radius-lg)] border border-border bg-card flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          {icon}
                          <h4>{label}</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-fluid-sm text-muted-foreground">
                            {info.months}
                          </p>
                          <p className="text-fluid-sm wp-template-single__climate-temp">
                            {info.temp}
                          </p>
                          <p className="text-fluid-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gallery */}
              <div className="flex flex-col gap-fluid-md">
                <div className="flex items-center gap-2">
                  <Camera size={24} className="text-primary" />
                  <h2>Photo Gallery</h2>
                </div>
                <GallerySectionPattern images={galleryImages} columns={3} />
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="flex flex-col gap-6">
              <div className="sticky top-4 flex flex-col gap-6">
                {/* Quick Facts */}
                <FastFacts
                  facts={[
                    {
                      icon: MapPin,
                      label: "Location",
                      value: destination.location,
                    },
                    {
                      icon: Calendar,
                      label: "Best Time",
                      value: destination.bestTime,
                    },
                    {
                      icon: Sun,
                      label: "Climate",
                      value: destination.climate,
                    },
                    {
                      icon: Users,
                      label: "Travel Style",
                      value: destination.travelStyles?.join(", ") || "All Types",
                    },
                    {
                      icon: Compass,
                      label: "Highlights",
                      value: `${destination.highlights.length} attractions`,
                    },
                  ]}
                />

                {/* Quick Info Card */}
                <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card flex flex-col gap-4">
                  <h4>Quick Travel Info</h4>
                  <ul className="flex flex-col gap-3 text-fluid-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary translate-y-px flex-shrink-0" />
                      <span>Multiple regions to explore</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users size={16} className="text-primary translate-y-px flex-shrink-0" />
                      <span>Suitable for all traveler types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award size={16} className="text-primary translate-y-px flex-shrink-0" />
                      <span>Award-winning destination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart size={16} className="text-primary translate-y-px flex-shrink-0" />
                      <span>Loved by our travelers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Regions (Child Destinations) */}
      {childDestinations.length > 0 && (
        <DestinationCollectionBlock 
          destinations={childDestinations}
          parentId={destination.id}
          emptyMessage={`No sub-regions found in ${destination.name}`}
        />
      )}

      {/* Related Tours */}
      <DestinationRelatedToursBlock 
        tours={relatedTours} 
        onSelect={(tour) => console.log('Selected tour:', tour.slug)}
      />

      {/* Related Accommodation */}
      <DestinationRelatedAccommodationBlock 
        accommodations={relatedAccommodations}
        onSelect={(acc) => console.log('Selected accommodation:', acc.slug)}
      />
      </div>

      <div className="organic-section-bottom">
        {/* FAQ Section */}
        <FAQ
          title="Planning Your Trip"
          subtitle="Everything you need to know before you go"
          items={destinationFAQs}
        />

        {/* CTA Section */}
        <CTA
          variant="default"
          title={`Ready to Explore ${destination.name}?`}
          description="Start planning your unforgettable journey today. Our travel experts are here to create the perfect itinerary for you."
          primaryAction={{
            label: "View Tours",
            icon: Compass,
          }}
          secondaryAction={{
            label: "Custom Itinerary",
            icon: Mail,
            onClick: () => console.log("Open custom itinerary form"),
          }}
        />
      </div>
    </main>
  );
}

// Default export
export default SingleDestinationTemplate;

// Named export for compatibility
export { SingleDestinationTemplate };