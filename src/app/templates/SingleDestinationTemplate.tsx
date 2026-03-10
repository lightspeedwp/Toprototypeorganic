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
import { DESTINATIONS, TOURS, ACCOMMODATION } from "../data/mockExpanded";
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

  // FAQ data
  const destinationFAQs = [
    {
      question: `What is the best time to visit ${destination.name}?`,
      answer: `The best time to visit ${destination.name} is ${destination.bestTime}. The climate is ${destination.climate}, which makes this period ideal for outdoor activities, wildlife viewing, and comfortable exploration. However, ${destination.name} offers unique experiences year-round depending on your interests.`,
    },
    {
      question: "Do I need a visa to visit?",
      answer:
        "Visa requirements vary by nationality. Most visitors from the US, UK, EU, and Commonwealth countries can enter visa-free for tourism purposes (up to 90 days). We recommend checking with your local embassy or consulate at least 3 months before travel. We can provide detailed visa guidance specific to your nationality upon request.",
    },
    {
      question: "What vaccinations do I need?",
      answer:
        "Routine vaccinations (MMR, DPT, Flu) should be up to date. Depending on your itinerary, Hepatitis A and Typhoid may be recommended. Yellow fever vaccination is required if traveling from an endemic country. Malaria prophylaxis may be advised for certain regions. Consult your doctor or a travel health clinic 4-6 weeks before departure.",
    },
    {
      question: "What currency is used and can I use credit cards?",
      answer:
        "The local currency is widely accepted, and credit cards (Visa, Mastercard) are accepted at most hotels, restaurants, and tourist attractions. However, it's advisable to carry some cash for small purchases, tips, and rural areas. ATMs are readily available in major cities and towns.",
    },
    {
      question: "Is it safe to travel to this destination?",
      answer:
        "Yes, this destination is generally safe for tourists. Like any travel destination, it's important to take standard precautions: avoid isolated areas at night, keep valuables secure, use registered taxis or ride-sharing services, and stay aware of your surroundings. Our local guides know the areas well and will ensure your safety throughout your tour.",
    },
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
              <div className="lg:col-span-2 space-y-12">
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
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Award size={24} className="text-primary" />
                  <h2>Top Highlights & Attractions</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {destination.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-6 rounded-lg border border-border",
                        "bg-card wp-bg-accent-hover",
                        "transition-colors duration-200"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin size={16} className="text-primary" />
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 text-lg">{highlight}</h4>
                          <p className="text-sm text-muted-foreground">
                            A must-see attraction that showcases the best of what {destination.name} has to offer.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Climate & Best Time to Visit */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sun size={24} className="text-primary" />
                  <h2>Climate & Best Time to Visit</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Sun size={20} className="text-accent" />
                      <h4>Summer</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {climateInfo.summer.months}
                    </p>
                    <p className="text-sm font-medium mb-2">
                      {climateInfo.summer.temp}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {climateInfo.summer.description}
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={20} className="text-secondary" />
                      <h4>Autumn</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {climateInfo.autumn.months}
                    </p>
                    <p className="text-sm font-medium mb-2">
                      {climateInfo.autumn.temp}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {climateInfo.autumn.description}
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <CloudRain size={20} className="text-info" />
                      <h4>Winter</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {climateInfo.winter.months}
                    </p>
                    <p className="text-sm font-medium mb-2">
                      {climateInfo.winter.temp}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {climateInfo.winter.description}
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={20} className="text-success" />
                      <h4>Spring</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {climateInfo.spring.months}
                    </p>
                    <p className="text-sm font-medium mb-2">
                      {climateInfo.spring.temp}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {climateInfo.spring.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Camera size={24} className="text-primary" />
                  <h2>Photo Gallery</h2>
                </div>
                <GallerySectionPattern images={galleryImages} columns={3} />
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              <div className="sticky top-4 space-y-6">
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
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h4 className="mb-4">Quick Travel Info</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Multiple regions to explore</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Suitable for all traveler types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Award-winning destination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart size={16} className="text-primary mt-0.5 flex-shrink-0" />
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
          faqs={destinationFAQs}
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