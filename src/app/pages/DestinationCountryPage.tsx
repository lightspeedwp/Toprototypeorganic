/**
 * Destination Country Page Template
 * 
 * Template for country-type destinations (e.g., South Africa).
 */

import { useParams } from "react-router";
import { MapPin, Calendar, Globe, CurrencyDollar as DollarSign, Clock, ForkKnife as Utensils, Lightning as Zap, TShirt as Shirt, Heart, Shield, Bus, FileText, CreditCard } from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { Hero } from "../components/patterns/Hero";
import { FastFacts } from "../components/patterns/FastFacts";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { HighlightsGridPattern } from "../components/patterns/HighlightsGridPattern";
import { CardGrid } from "../components/patterns/CardGrid";
import { TourCard } from "../components/patterns/TourCard";
import { BlogCard } from "../components/patterns/BlogCard";
import { ReviewCard } from "../components/patterns/ReviewCard";
import { TeamCard } from "../components/patterns/TeamCard";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { CTA } from "../components/patterns/CTA";
import { DESTINATIONS, TOURS, BLOG_POSTS, REVIEWS, TEAM_MEMBERS } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";

const COUNTRY_INFO_ICONS: Record<string, any> = {
  banking: CreditCard,
  climate: Calendar,
  cuisine: Utensils,
  electricity: Zap,
  dress: Shirt,
  health: Heart,
  safety: Shield,
  transport: Bus,
  visa: FileText,
  currency: DollarSign,
};

export function DestinationCountryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateTo, navigateToTour, navigateToDestination, navigateToTeamMember } = useNavigation();
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) return null;

  const relatedTours = TOURS.filter((t) => destination.tourIds?.includes(t.id)).slice(0, 3);
  const relatedBlogPosts = BLOG_POSTS.slice(0, 3);
  const relatedReviews = REVIEWS.filter((r) => destination.relatedReviewIds?.includes(r.id)).slice(0, 3);
  const consultant = TEAM_MEMBERS.find((tm) => tm.id === destination.dedicatedConsultantId);

  const fastFacts = [
    { icon: Calendar, label: "Best Time", value: destination.bestTime },
    { icon: Globe, label: "Climate", value: destination.climate },
    { icon: DollarSign, label: "Currency", value: destination.currency },
    { icon: Clock, label: "Timezone", value: destination.timezone },
  ];

  return (
    <article className="wp-template-single">
      {/* Breadcrumbs */}
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Destinations", href: "/destinations", onClick: () => navigateTo("/destinations") },
          { label: destination.title },
        ]}
      />

      {/* Hero */}
      <Hero
        title={destination.title}
        intro={destination.excerpt}
        image={destination.featuredImage}
        context="Explore Country"
        height="large"
        overlay="medium"
      />

      {/* Fast Facts */}
      <FastFacts facts={fastFacts} />

      {/* About Section */}
      <EditorialContent
        title={`Discover ${destination.title}`}
        subtitle="A journey of absolute wonder"
        content={destination.content}
        animated
      />

      {/* Highlights Grid */}
      {destination.highlights && destination.highlights.length > 0 && (
        <HighlightsGridPattern
          title="Country Highlights"
          description={`The iconic experiences that define ${destination.title}.`}
          highlights={destination.highlights.map((h, i) => ({
            id: `h-${i}`,
            title: h,
            description: `Experience the best of ${destination.title} with this iconic highlight.`,
            icon: MapPin
          }))}
          columns={3}
        />
      )}

      {/* Tours Section */}
      {relatedTours.length > 0 && (
        <section className="py-section-md bg-muted/20 border-y border-border/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-semibold mb-4">Popular Tours in {destination.title}</h2>
              <p className="text-muted-foreground">Expertly crafted journeys through this magnificent country.</p>
            </div>
            <CardGrid columns={3}>
              {relatedTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} onClick={() => navigateToTour(tour.slug)} />
              ))}
            </CardGrid>
            <div className="mt-12 text-center">
              <button 
                onClick={() => navigateTo("/tours")}
                className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                View All {destination.title} Tours
              </button>
            </div>
          </Container>
        </section>
      )}

      {/* Essential Country Info */}
      {destination.countryInfo && (
        <section className="py-section-md">
          <Container>
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-semibold mb-4">Traveler Essentials</h2>
              <p className="text-muted-foreground">Everything you need to know for a seamless journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(destination.countryInfo).map(([key, value]) => (
                <div key={key} className="p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/5 text-primary">
                      {(() => {
                        const Icon = COUNTRY_INFO_ICONS[key] || FileText;
                        return <Icon size={24} />;
                      })()}
                    </div>
                    <h3 className="font-serif font-bold capitalize">{key}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Expert Consultant */}
      {consultant && (
        <section className="py-section-md bg-muted/30 border-y border-border/50">
          <Container maxWidth="narrow">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-serif font-semibold mb-2">Speak to our {destination.title} Specialist</h2>
              <p className="text-muted-foreground">Get personalized advice from someone who has explored every corner of this country.</p>
            </div>
            <TeamCard member={consultant} onClick={() => navigateToTeamMember(consultant.slug)} />
          </Container>
        </section>
      )}

      {/* Reviews */}
      {relatedReviews.length > 0 && (
        <section className="py-section-md">
          <Container>
            <h2 className="text-3xl font-serif font-semibold mb-8 text-center">Traveler Stories from {destination.title}</h2>
            <CardGrid columns={3}>
              {relatedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </CardGrid>
          </Container>
        </section>
      )}

      {/* CTA */}
      <CTA
        title={`Plan Your ${destination.title} Adventure`}
        description="Let our country specialists help you design a tailored itinerary that captures the very best of this incredible destination."
        variant="gradient"
        primaryAction={{
          label: "Talk to a Specialist",
          onClick: () => navigateTo("/contact")
        }}
        secondaryAction={{
          label: "Browse All Destinations",
          onClick: () => navigateTo("/destinations")
        }}
      />
    </article>
  );
}

export default DestinationCountryPage;
