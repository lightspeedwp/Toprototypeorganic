/**
 * Travel Styles Hub Page
 * 
 * Content Hub Archetype listing all travel style taxonomy terms.
 * Each card links to the corresponding taxonomy archive.
 * 
 * @module TravelStylesHubPage
 * @category pages
 */

import { ArrowRight, Compass, MapPin, Bed } from "@phosphor-icons/react";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import { TRAVEL_STYLES } from "../data/taxonomies/travel-styles";
import { ALL_TOURS, ALL_DESTINATIONS, ALL_ACCOMMODATION } from "../data/mockExpanded";
import { FAQ_GENERAL } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/** Map travel style slugs to representative images. */
const STYLE_IMAGES: Record<string, string> = {
  honeymoon: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop",
  adventure: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
  wildlife: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&h=400&fit=crop",
  luxury: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&h=400&fit=crop",
  family: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  cultural: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&h=400&fit=crop",
  photography: "https://images.unsplash.com/photo-1516298773066-dec23e52a7a6?w=600&h=400&fit=crop",
  "walking-safari": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop",
  "beach-island": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
  "fly-in-safari": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
};

function TravelStylesHubPage() {
  const { navigateTo } = useNavigation();

  const stylesWithCounts = TRAVEL_STYLES.map((style) => ({
    ...style,
    tourCount: ALL_TOURS.filter((t) => t.travelStyles?.includes(style.id)).length,
    destinationCount: style.destinationIds.length,
    accommodationCount: style.accommodationIds.length,
  }));

  const totalTours = ALL_TOURS.length;
  const totalStyles = TRAVEL_STYLES.length;

  return (
    <article className="wp-page-taxonomy-hub">
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Travel Styles" },
        ]}
        fullWidth
      />

      <Hero
        title="Travel Styles"
        intro="From adrenaline-fuelled adventures to serene luxury retreats, discover the perfect way to experience Africa. Every style, one extraordinary continent."
        image="https://images.unsplash.com/photo-1760199078626-d295728e9b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2FmYXJpJTIwYWR2ZW50dXJlJTIwdHJhdmVsfGVufDF8fHx8MTc3MzMyMjA5NHww&ixlib=rb-4.1.0&q=80&w=1080"
        context="Explore by Style"
        height="medium"
        overlay="medium"
      />

      {/* Stats */}
      <section className="wp-page-taxonomy-hub__stats">
        <Container>
          <div className="wp-page-taxonomy-hub__stats-grid">
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">{totalStyles}</span>
              <span className="wp-page-taxonomy-hub__stat-label">Travel Styles</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">{totalTours}+</span>
              <span className="wp-page-taxonomy-hub__stat-label">Safari Tours</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">3</span>
              <span className="wp-page-taxonomy-hub__stat-label">African Regions</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">100%</span>
              <span className="wp-page-taxonomy-hub__stat-label">Tailor-Made</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="wp-page-taxonomy-hub__intro">
        <Container>
          <div className="wp-page-taxonomy-hub__intro-inner">
            <span className="wp-page-taxonomy-hub__intro-eyebrow">Find Your Perfect Safari</span>
            <p className="wp-page-taxonomy-hub__intro-text">
              Whether you dream of tracking the Big Five on foot, soaring over the Okavango Delta in a light aircraft,
              or unwinding on a pristine Indian Ocean island, we have a travel style to match. Explore each category
              to find tours, destinations, and accommodation curated for your ideal experience.
            </p>
          </div>
        </Container>
      </section>

      {/* Card Grid */}
      <section className="wp-page-taxonomy-hub__grid-section">
        <Container>
          <div className="wp-page-taxonomy-hub__grid">
            {stylesWithCounts.map((style) => (
              <button
                key={style.id}
                className="wp-page-taxonomy-hub__card"
                onClick={() => navigateTo(`/travel-styles/${style.slug}`)}
                aria-label={`View ${style.name} tours`}
                type="button"
              >
                <div className="wp-page-taxonomy-hub__card-image">
                  <ImageWithFallback
                    src={STYLE_IMAGES[style.slug] || STYLE_IMAGES.adventure}
                    alt={style.name}
                    loading="lazy"
                  />
                  <div className="wp-page-taxonomy-hub__card-image-overlay" />
                  <span className="wp-page-taxonomy-hub__card-badge">
                    {style.tourCount} tours
                  </span>
                </div>
                <div className="wp-page-taxonomy-hub__card-body">
                  <h3 className="wp-page-taxonomy-hub__card-title">{style.name}</h3>
                  <p className="wp-page-taxonomy-hub__card-description">{style.description}</p>
                  <div className="wp-page-taxonomy-hub__card-meta">
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Compass size={14} /> {style.tourCount} tours
                    </span>
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <MapPin size={14} /> {style.destinationCount} destinations
                    </span>
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Bed size={14} /> {style.accommodationCount} lodges
                    </span>
                  </div>
                  <span className="wp-page-taxonomy-hub__card-link">
                    Explore {style.name} <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <FAQ
        items={FAQ_GENERAL.slice(0, 4)}
        title="Travel Style FAQ"
        intro="Common questions about choosing the right safari style for your trip."
      />

      <CTA
        title="Not Sure Which Style Suits You?"
        description="Our safari specialists will help you find the perfect travel experience based on your interests, budget, and travel companions."
        variant="gradient"
        primaryAction={{
          label: "Talk to a Specialist",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: "View All Tours",
          onClick: () => navigateTo("/tours"),
        }}
      />
    </article>
  );
}

export default TravelStylesHubPage;
