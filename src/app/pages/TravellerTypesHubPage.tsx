/**
 * Traveller Types Hub Page
 * 
 * Content Hub Archetype listing all traveller type taxonomy terms.
 * Each card links to the corresponding taxonomy archive.
 * 
 * @module TravellerTypesHubPage
 * @category pages
 */

import { ArrowRight, Compass, MapPin, Users } from "@phosphor-icons/react";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import { TRAVELLER_TYPES } from "../data/taxonomies/traveller-types";
import { ALL_TOURS } from "../data/mockExpanded";
import { FAQ_GENERAL } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const TYPE_IMAGES: Record<string, string> = {
  solo: "https://images.unsplash.com/photo-1661177408851-470eb76317aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  couple: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
  "multi-generational": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop",
  family: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop",
  group: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&h=400&fit=crop",
};

function TravellerTypesHubPage() {
  const { navigateTo } = useNavigation();

  const typesWithCounts = TRAVELLER_TYPES.map((tt) => ({
    ...tt,
    tourCount: ALL_TOURS.filter(
      (t) => (t as any).travellerTypes?.includes(tt.id) || tt.tourIds.includes(t.id)
    ).length,
    destinationCount: tt.destinationIds.length,
  }));

  return (
    <article className="wp-page-taxonomy-hub">
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Traveller Types" },
        ]}
        fullWidth
      />

      <Hero
        title="Traveller Types"
        intro="Every traveller is unique. Whether you're a solo explorer, a honeymooning couple, or a multi-generational family, we craft the perfect African safari for you."
        image="https://images.unsplash.com/photo-1661177408851-470eb76317aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xvJTIwdHJhdmVsbGVyJTIwYmFja3BhY2tlciUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzMzMjIwOTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        context="Who's Travelling?"
        height="medium"
        overlay="medium"
      />

      {/* Stats */}
      <section className="wp-page-taxonomy-hub__stats">
        <Container>
          <div className="wp-page-taxonomy-hub__stats-grid">
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">{TRAVELLER_TYPES.length}</span>
              <span className="wp-page-taxonomy-hub__stat-label">Traveller Types</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">{ALL_TOURS.length}+</span>
              <span className="wp-page-taxonomy-hub__stat-label">Curated Safaris</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">24/7</span>
              <span className="wp-page-taxonomy-hub__stat-label">Expert Support</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">100%</span>
              <span className="wp-page-taxonomy-hub__stat-label">Personalised</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="wp-page-taxonomy-hub__intro">
        <Container>
          <div className="wp-page-taxonomy-hub__intro-inner">
            <span className="wp-page-taxonomy-hub__intro-eyebrow">Safaris For Every Traveller</span>
            <p className="wp-page-taxonomy-hub__intro-text">
              We understand that the perfect safari depends on who you're travelling with. Solo adventurers need
              different experiences from families with young children, and honeymooning couples want something
              entirely unique. Explore our curated collections for each traveller type.
            </p>
          </div>
        </Container>
      </section>

      {/* Card Grid */}
      <section className="wp-page-taxonomy-hub__grid-section">
        <Container>
          <div className="wp-page-taxonomy-hub__grid">
            {typesWithCounts.map((tt) => (
              <button
                key={tt.id}
                className="wp-page-taxonomy-hub__card"
                onClick={() => navigateTo(`/traveller-types/${tt.slug}`)}
                aria-label={`View ${tt.name} safaris`}
                type="button"
              >
                <div className="wp-page-taxonomy-hub__card-image">
                  <ImageWithFallback
                    src={TYPE_IMAGES[tt.slug] || TYPE_IMAGES.solo}
                    alt={tt.name}
                    loading="lazy"
                  />
                  <div className="wp-page-taxonomy-hub__card-image-overlay" />
                  <span className="wp-page-taxonomy-hub__card-badge">
                    {tt.tourCount} tours
                  </span>
                </div>
                <div className="wp-page-taxonomy-hub__card-body">
                  <h3 className="wp-page-taxonomy-hub__card-title">{tt.name}</h3>
                  <p className="wp-page-taxonomy-hub__card-description">{tt.description}</p>
                  <div className="wp-page-taxonomy-hub__card-meta">
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Compass size={14} /> {tt.tourCount} tours
                    </span>
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <MapPin size={14} /> {tt.destinationCount} destinations
                    </span>
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Users size={14} /> {tt.name}
                    </span>
                  </div>
                  <span className="wp-page-taxonomy-hub__card-link">
                    Explore {tt.name} Safaris <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <FAQ
        items={FAQ_GENERAL.slice(0, 4)}
        title="Traveller Type FAQ"
        intro="Answers to common questions about choosing safaris based on your travel party."
      />

      <CTA
        title="Tell Us About Your Group"
        description="Our specialists will design a bespoke safari experience perfectly suited to your travel companions, interests, and pace."
        variant="gradient"
        primaryAction={{
          label: "Get a Custom Quote",
          onClick: () => navigateTo("/quote-request"),
        }}
        secondaryAction={{
          label: "View All Tours",
          onClick: () => navigateTo("/tours"),
        }}
      />
    </article>
  );
}

export default TravellerTypesHubPage;
