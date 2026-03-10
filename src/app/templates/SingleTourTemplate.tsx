/**
 * Single Tour Template - WordPress-Aligned Block Composition
 * 
 * Comprehensive tour detail page composed from dedicated tour operator
 * blocks, each with its own CSS file using design system tokens.
 * 
 * **Template Structure:**
 * 1. Breadcrumbs navigation
 * 2. Hero section (BannerCover / Hero pattern)
 * 3. Content grid (Main + Sidebar):
 *    - Main: Overview, Itinerary, Inclusions/Exclusions, Gallery
 *    - Sidebar: Quick Facts, Trust Badges, Contact CTA
 * 4. Related Destinations section
 * 5. Related Accommodation section
 * 6. FAQ section
 * 7. CTA booking section
 * 
 * **WordPress Mapping:**
 * - Template: templates/single-tour.html
 * - Post Type: tour
 * - Archetype: Single Detail
 * 
 * @module SingleTourTemplate
 * @category templates
 * @wordpressTemplate single-tour
 */

import './SingleTourTemplate.css';
import { useParams } from "react-router";
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  TrendUp as TrendingUp,
  Star,
  Medal as Award,
  Shield,
  Heart,
  EnvelopeSimple as Mail,
} from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { TourRelatedDestinationBlock } from "../components/blocks/TourRelatedDestinationBlock";
import { TourRelatedAccommodationBlock } from "../components/blocks/TourRelatedAccommodationBlock";

// Tour Operator Blocks (each with companion CSS)
import { TourOverview } from "../components/blocks/tour-operator/TourOverview";
import { TourItinerary } from "../components/blocks/tour-operator/TourItinerary";
import { TourInclusionsExclusions } from "../components/blocks/tour-operator/TourInclusionsExclusions";
import { TourSustainability } from "../components/blocks/tour-operator/TourSustainability";
import { TourQuickFacts } from "../components/blocks/tour-operator/TourQuickFacts";
import { TourTrustBadges } from "../components/blocks/tour-operator/TourTrustBadges";
import { TourContactCTA } from "../components/blocks/tour-operator/TourContactCTA";
import { TourGallerySection } from "../components/blocks/tour-operator/TourGallerySection";
import { TourRelatedSection } from "../components/blocks/tour-operator/TourRelatedSection";

// Contexts & Hooks
import { useNavigation } from "../contexts/NavigationContext";

// Data
import { ALL_TOURS, ALL_DESTINATIONS, ALL_ACCOMMODATION } from "../data/mockExpanded";
import { CONSERVATION_PROJECTS, SUSTAINABILITY_COMMITMENTS } from "../data/sustainability";
import { getPageSectionFAQs } from "../data/mock";
import { SITE_CONFIG } from "../data/site-config";

/**
 * Single Tour Template Component.
 * 
 * Complete tour detail page composed from WordPress-aligned
 * tour operator blocks.
 * 
 * @component
 * @category templates
 */
function SingleTourTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateTo, navigateToTour, navigateToDestination, navigateToAccommodation } = useNavigation();
  
  const tour = ALL_TOURS.find(t => t.slug === slug) || ALL_TOURS[0];

  // Centralized FAQ data
  const faqData = getPageSectionFAQs("tour-single");

  // Related content
  const relatedDestinations = ALL_DESTINATIONS.filter((dest) =>
    tour.destinations?.includes(dest.id)
  ).slice(0, 3);

  const relatedAccommodations = ALL_ACCOMMODATION.filter((acc) =>
    tour.accommodation?.includes(acc.id)
  ).slice(0, 3);

  // Quick facts for sidebar
  const quickFacts = [
    { icon: Clock, label: "Duration", value: tour.duration },
    { icon: Users, label: "Group Size", value: tour.groupSize },
    { icon: TrendingUp, label: "Difficulty", value: tour.difficulty },
    { icon: Calendar, label: "Best Time", value: tour.bestTime },
    {
      icon: MapPin,
      label: "Destinations",
      value: relatedDestinations.map((d) => d.title).join(", ") || "Various",
    },
  ];

  // Trust badges
  const trustBadges = [
    { icon: Award, text: "Award-winning tour operator since 2005" },
    { icon: Star, text: "5-star rated on TripAdvisor" },
    { icon: Heart, text: "Personalized service & small groups" },
    { icon: Shield, text: "24/7 support during your trip" },
  ];

  // Mock itinerary data
  const itineraryDays = [
    {
      day: 1,
      title: "Arrival in Cape Town",
      description:
        "Welcome to the Mother City! Upon arrival at Cape Town International Airport, you'll be transferred to your luxury hotel. Take the afternoon to relax and acclimate, or explore the vibrant V&A Waterfront at your leisure.",
      activities: [
        "Airport transfer to hotel",
        "Welcome briefing with your tour guide",
        "Optional sunset walk at V&A Waterfront",
      ],
      meals: "Dinner",
      accommodation: "Luxury Hotel, Cape Town",
    },
    {
      day: 2,
      title: "Table Mountain & City Tour",
      description:
        "Experience the iconic Table Mountain via cable car, weather permitting. Enjoy panoramic views of the city, ocean, and surrounding peaks. In the afternoon, explore Cape Town's historic neighborhoods including Bo-Kaap.",
      activities: [
        "Table Mountain cable car experience",
        "Guided tour of Bo-Kaap",
        "Visit to Company's Garden",
        "Optional visit to District Six Museum",
      ],
      meals: "Breakfast, Dinner",
      accommodation: "Luxury Hotel, Cape Town",
    },
    {
      day: 3,
      title: "Cape Peninsula Scenic Drive",
      description:
        "Journey along the spectacular Cape Peninsula to Cape Point. Visit the penguin colony at Boulders Beach and enjoy the dramatic coastal scenery of Chapman's Peak Drive.",
      activities: [
        "Visit to Boulders Beach penguin colony",
        "Cape Point and Cape of Good Hope",
        "Chapman's Peak scenic drive",
        "Lunch at a seaside restaurant",
      ],
      meals: "Breakfast, Lunch",
      accommodation: "Luxury Hotel, Cape Town",
    },
    {
      day: 4,
      title: "Winelands Discovery",
      description:
        "Explore the renowned Cape Winelands. Visit historic wine estates in Stellenbosch and Franschhoek, enjoying tastings of world-class wines paired with gourmet cuisine.",
      activities: [
        "Private wine tastings at 3 estates",
        "Cellar tour and wine education",
        "Gourmet lunch in the Winelands",
        "Optional visit to Babylonstoren garden",
      ],
      meals: "Breakfast, Lunch",
      accommodation: "Luxury Hotel, Cape Town",
    },
    {
      day: 5,
      title: "Leisure Day & Spa",
      description:
        "Enjoy a relaxing day at your leisure. Indulge in a couples spa treatment, explore local markets, or take an optional helicopter flight over the peninsula.",
      activities: [
        "Couples spa treatment included",
        "Optional helicopter tour",
        "Shopping at local boutiques",
        "Private beach time",
      ],
      meals: "Breakfast, Romantic Dinner",
      accommodation: "Luxury Hotel, Cape Town",
    },
    {
      day: 6,
      title: "Garden Route Transfer",
      description:
        "Scenic drive along the famous Garden Route, stopping at charming coastal towns. Arrive at your luxury lodge in the evening.",
      activities: [
        "Scenic drive along Garden Route",
        "Stop at Hermanus for whale watching (seasonal)",
        "Visit Mossel Bay",
        "Arrival at Garden Route lodge",
      ],
      meals: "Breakfast, Dinner",
      accommodation: "Luxury Lodge, Garden Route",
    },
    {
      day: 7,
      title: "Departure",
      description:
        "After a leisurely breakfast, transfer to the airport for your onward journey, taking with you unforgettable memories of your Cape Town adventure.",
      activities: [
        "Final breakfast with ocean views",
        "Airport transfer",
        "Optional: Extend your stay",
      ],
      meals: "Breakfast",
      accommodation: "N/A",
    },
  ];

  // Mock gallery images
  const galleryImages = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200",
      alt: "Table Mountain at sunset",
      caption: "Iconic Table Mountain dominates the Cape Town skyline",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200",
      alt: "Cape Point",
      caption: "The dramatic cliffs of Cape Point",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200",
      alt: "Boulders Beach penguins",
      caption: "African penguins at Boulders Beach",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1474861644511-0f2775ae97cc?w=1200",
      alt: "Cape Winelands",
      caption: "Picturesque vineyards of the Cape Winelands",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
      alt: "Bo-Kaap colorful houses",
      caption: "Vibrant Bo-Kaap neighborhood",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=1200",
      alt: "Chapman's Peak Drive",
      caption: "Stunning coastal scenery along Chapman's Peak",
    },
  ];

  // FAQ data
  const tourFAQs = [
    {
      question: "What is the best time of year for this tour?",
      answer:
        "Cape Town is a year-round destination, but the best time is during the summer months (November to March) for warm weather and beach activities. However, each season offers unique experiences - spring (September-October) is perfect for wildflowers, while winter (June-August) is ideal for whale watching.",
    },
    {
      question: "What is the accommodation like?",
      answer:
        "We carefully select 4-5 star accommodations that combine comfort with authentic local character. All hotels and lodges feature modern amenities, excellent service, and are ideally located for your tours. Room upgrades are available upon request.",
    },
    {
      question: "Is this tour suitable for families with children?",
      answer:
        "Yes! This tour can be adapted for families. The activities are suitable for children aged 8 and above. We can adjust the itinerary to include more family-friendly activities and can arrange interconnecting rooms. Children under 12 receive a discount.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations made 60+ days before departure receive a full refund minus a 10% administration fee. 30-59 days: 50% refund. 0-29 days: no refund. We strongly recommend travel insurance to protect your investment.",
    },
    {
      question: "Are meals included in the tour price?",
      answer:
        "Most meals are included as specified in the itinerary. Typically, all breakfasts and most dinners are included, along with some lunches during activities. This allows flexibility for you to explore local restaurants on free evenings.",
    },
  ];

  // Overview content (HTML)
  const overviewContent = `
    <p>Experience the ultimate Cape Town adventure on this carefully crafted 7-day journey through one of the world's most beautiful cities. From the iconic Table Mountain to the pristine beaches and world-renowned winelands, every day brings new wonders.</p>
    <p>This tour is perfect for couples, solo travelers, and small groups looking to experience the best of Cape Town without the hassle of planning. Our expert local guides will share insider knowledge and ensure you discover hidden gems alongside the must-see attractions.</p>
  `;

  return (
    <main className="theme-organic">
      {/* Breadcrumbs */}
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Tours", href: "/tours", onClick: () => navigateTo("/tours") },
          { label: tour.title, isCurrent: true },
        ]}
        fullWidth={true}
      />

      {/* Top Section - Savanna Sunset */}
      <div className="organic-section-top">
        {/* Hero Section */}
        <Hero
          title={tour.title}
          subtitle={tour.excerpt || tour.content?.substring(0, 120)}
          image={tour.featuredImage}
          overlay="medium"
          height="large"
          primaryCTA={{
            label: "Book This Tour",
            href: "#book",
            onClick: () => navigateTo("/booking"),
          }}
          secondaryCTA={{
            label: "Request Info",
            href: "#inquiry",
            onClick: () => navigateTo("/contact"),
          }}
          animated
        />
      </div>

      {/* Main Content Grid - Acacia & Clay */}
      <div className="organic-section-middle">
        <section className="single-tour__content-section">
          <Container>
            <div className="single-tour__grid">
              {/* Main Content Column */}
              <div className="single-tour__main">
                {/* Tour Overview Block */}
                <TourOverview
                  title="Tour Overview"
                  content={overviewContent}
                  highlights={tour.highlights}
                  callout="Unlike typical group tours, we keep our groups small to ensure a personalized experience. Your accommodation is hand-selected for quality and location, and our guides are passionate locals who love sharing their city with visitors."
                />

                {/* Itinerary Block */}
                <TourItinerary days={itineraryDays} />

                {/* Inclusions / Exclusions Block */}
                <TourInclusionsExclusions
                  included={tour.included}
                  excluded={tour.excluded}
                />

                {/* Sustainability Block */}
                <TourSustainability
                  projects={CONSERVATION_PROJECTS.slice(0, 2)}
                  commitments={SUSTAINABILITY_COMMITMENTS}
                />

                {/* Gallery Block */}
                <TourGallerySection images={galleryImages} />
              </div>

              {/* Sidebar Column */}
              <div className="single-tour__sidebar">
                <div className="single-tour__sidebar-sticky">
                  {/* Quick Facts Block */}
                  <TourQuickFacts
                    price={tour.price}
                    facts={quickFacts}
                    ctaLabel="Book This Tour"
                    onCtaClick={() => navigateTo("/booking")}
                  />

                  {/* Trust Badges Block */}
                  <TourTrustBadges badges={trustBadges} />

                  {/* Contact CTA Block */}
                  <TourContactCTA
                    phone={SITE_CONFIG.contact.phone}
                    email={SITE_CONFIG.contact.email}
                    onEnquiry={() => navigateTo("/contact")}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>

      {/* Middle Alt - Acacia & Clay Alt */}
      <div className="organic-section-middle-alt">
        {/* Related Destinations */}
        <TourRelatedDestinationBlock 
          destinations={relatedDestinations} 
          onSelect={(dest) => navigateToDestination(dest.slug)}
        />

        {/* Related Accommodation */}
        <TourRelatedAccommodationBlock 
          accommodations={relatedAccommodations}
          onSelect={(acc) => navigateToAccommodation(acc.slug)}
        />
      </div>

      {/* Bottom Section - Minimal Earth */}
      <div className="organic-section-bottom">
        {/* FAQ Section */}
        <FAQ
          title={faqData?.sectionTitle || "Frequently Asked Questions"}
          subtitle={faqData?.sectionDescription || "Everything you need to know about this tour"}
          questions={tourFAQs}
          items={faqData?.items}
        />

        {/* CTA Booking Section */}
        <CTA
          variant="default"
          title={`Ready to Experience ${tour.destination || "Africa"}?`}
          description="Book this tour today and create memories that will last a lifetime. Our team is here to help you every step of the way."
          primaryAction={{
            label: "Book This Tour",
            icon: Heart,
            onClick: () => navigateTo("/booking"),
          }}
          secondaryAction={{
            label: "Request Custom Itinerary",
            icon: Mail,
            onClick: () => navigateTo("/contact"),
          }}
        />
      </div>
    </main>
  );
}

// Default export for lazy loading
export default SingleTourTemplate;

// Named export for compatibility
export { SingleTourTemplate };