/**
 * Destination Region Page Template
 * 
 * Template for region/city/park destinations (e.g., Cape Town).
 */

import { useParams } from "react-router";
import { MapPin, Calendar, Globe, CurrencyDollar as DollarSign, Clock } from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { Hero } from "../components/patterns/Hero";
import { FastFacts } from "../components/patterns/FastFacts";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { HighlightsGridPattern } from "../components/patterns/HighlightsGridPattern";
import { CardGrid } from "../components/patterns/CardGrid";
import { TourCard } from "../components/patterns/TourCard";
import { AccommodationCard } from "../components/patterns/AccommodationCard";
import { ReviewCard } from "../components/patterns/ReviewCard";
import { TeamCard } from "../components/patterns/TeamCard";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { CTA } from "../components/patterns/CTA";
import { ALL_DESTINATIONS as DESTINATIONS, ALL_TOURS as TOURS, ALL_ACCOMMODATION as ACCOMMODATION, ALL_BLOG_POSTS as BLOG_POSTS, ALL_REVIEWS as REVIEWS, ALL_TEAM as TEAM_MEMBERS } from "../data/mockExpanded";
import { useNavigation } from "../contexts/NavigationContext";

export function DestinationRegionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateTo, navigateToTour, navigateToDestination, navigateToAccommodation, navigateToTeamMember } = useNavigation();
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) return null;

  const parentCountry = destination.parentId ? DESTINATIONS.find((d) => d.id === destination.parentId) : null;
  const relatedTours = TOURS.filter((t) => destination.tourIds?.includes(t.id)).slice(0, 3);
  const relatedAccommodation = ACCOMMODATION.filter((a) => destination.accommodationIds?.includes(a.id)).slice(0, 3);
  const relatedReviews = REVIEWS.filter((r) => destination.relatedReviewIds?.includes(r.id)).slice(0, 3);
  const consultant = TEAM_MEMBERS.find((tm) => tm.id === destination.dedicatedConsultantId);

  const fastFacts = [
    { icon: MapPin, label: "Country", value: parentCountry?.title || "Regional" },
    { icon: Calendar, label: "Best Time", value: destination.bestTime },
    { icon: Globe, label: "Climate", value: destination.climate },
    { icon: Clock, label: "Timezone", value: destination.timezone },
  ];

  return (
    <article className="wp-template-single">
      {/* Breadcrumbs */}
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Destinations", href: "/destinations", onClick: () => navigateTo("/destinations") },
          ...(parentCountry ? [{ label: parentCountry.title, href: `/destinations/${parentCountry.slug}`, onClick: () => navigateToDestination(parentCountry.slug) }] : []),
          { label: destination.title },
        ]}
      />

      {/* Hero */}
      <Hero
        title={destination.title}
        intro={destination.excerpt}
        image={destination.featuredImage}
        context={destination.type === "park" ? "National Park" : "Region Guide"}
        height="large"
        overlay="medium"
      />

      {/* Fast Facts */}
      <FastFacts facts={fastFacts} />

      {/* About Section */}
      <EditorialContent
        title={`Explore ${destination.title}`}
        subtitle="Where nature meets culture"
        content={destination.content}
        animated
      />

      {/* Highlights Grid */}
      {destination.highlights && destination.highlights.length > 0 && (
        <HighlightsGridPattern
          title="Region Highlights"
          description={`Must-see attractions and experiences in ${destination.title}.`}
          highlights={destination.highlights.map((h, i) => ({
            id: `h-${i}`,
            title: h,
            description: `A defining experience in the ${destination.title} region.`,
            icon: MapPin
          }))}
          columns={3}
        />
      )}

      {/* Tours Section */}
      {relatedTours.length > 0 && (
        <section className="py-section-md bg-muted/20 border-y border-border/50">
          <Container>
            <div className="text-center pb-12 flex flex-col gap-4 items-center">
              <h2 className="text-3xl font-serif font-semibold">Safaris Including {destination.title}</h2>
              <p className="text-muted-foreground">Discover tours that visit this spectacular area.</p>
            </div>
            <CardGrid columns={3}>
              {relatedTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} onClick={() => navigateToTour(tour.slug)} />
              ))}
            </CardGrid>
          </Container>
        </section>
      )}

      {/* Accommodation Section */}
      {relatedAccommodation.length > 0 && (
        <section className="py-section-md">
          <Container>
            <div className="text-center pb-12 flex flex-col gap-4 items-center">
              <h2 className="text-3xl font-serif font-semibold">Where to Stay</h2>
              <p className="text-muted-foreground">Our hand-picked lodges and boutique hotels in {destination.title}.</p>
            </div>
            <CardGrid columns={3}>
              {relatedAccommodation.map((acc) => (
                <AccommodationCard key={acc.id} accommodation={acc} onClick={() => navigateToAccommodation(acc.slug)} />
              ))}
            </CardGrid>
          </Container>
        </section>
      )}

      {/* Expert Consultant */}
      {consultant && (
        <section className="py-section-md bg-muted/30 border-y border-border/50">
          <Container maxWidth="narrow">
            <div className="text-center pb-12 flex flex-col gap-2 items-center">
              <h2 className="text-2xl font-serif font-semibold">Region Specialist</h2>
              <p className="text-muted-foreground">Get expert advice from our consultant who knows {destination.title} intimately.</p>
            </div>
            <TeamCard member={consultant} onClick={() => navigateToTeamMember(consultant.slug)} />
          </Container>
        </section>
      )}

      {/* Reviews */}
      {relatedReviews.length > 0 && (
        <section className="py-section-md">
          <Container>
            <h2 className="text-3xl font-serif font-semibold pb-8 text-center">Traveler Experiences</h2>
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
        title={`Discover the Best of ${destination.title}`}
        description="Our specialists are ready to help you plan an unforgettable journey tailored to your interests."
        variant="gradient"
        primaryAction={{
          label: "Request a Tailored Quote",
          onClick: () => navigateTo("/contact")
        }}
        secondaryAction={{
          label: "All Destinations",
          onClick: () => navigateTo("/destinations")
        }}
      />
    </article>
  );
}

export default DestinationRegionPage;