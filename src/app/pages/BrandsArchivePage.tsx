/**
 * Brands Archive Page
 * 
 * Content Hub Archetype listing all accommodation brand taxonomy terms.
 * Each card links to the corresponding brand taxonomy archive.
 * 
 * @module BrandsArchivePage
 * @category pages
 */

import { ArrowRight, Bed, Star, Globe } from "@phosphor-icons/react";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import { BRANDS } from "../data/taxonomies/brands";
import { ALL_ACCOMMODATION } from "../data/mockExpanded";
import { FAQ_GENERAL } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const BRAND_IMAGES: Record<string, string> = {
  "relais-chateaux": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  "leading-hotels": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
  independent: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&h=400&fit=crop",
  andbeyond: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&h=400&fit=crop",
  singita: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&h=400&fit=crop",
  "wilderness-safaris": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
  londolozi: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop",
};

function BrandsArchivePage() {
  const { navigateTo } = useNavigation();

  const brandsWithCounts = BRANDS.map((brand) => ({
    ...brand,
    propertyCount: ALL_ACCOMMODATION.filter((a) =>
      brand.accommodationIds?.includes(a.id)
    ).length,
  }));

  return (
    <article className="wp-page-taxonomy-hub">
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Accommodation", href: "/accommodation", onClick: () => navigateTo("/accommodation") },
          { label: "Brands" },
        ]}
        fullWidth
      />

      <Hero
        title="Our Partner Brands"
        intro="We work exclusively with Africa's most distinguished safari and hospitality brands, each selected for their commitment to excellence, conservation, and authentic experiences."
        image="https://images.unsplash.com/photo-1678136271245-9dbcf404a530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBib3V0aXF1ZSUyMGxvZGdlJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzczMzIyMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
        context="Trusted Partners"
        height="medium"
        overlay="medium"
      />

      {/* Stats */}
      <section className="wp-page-taxonomy-hub__stats">
        <Container>
          <div className="wp-page-taxonomy-hub__stats-grid">
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">{BRANDS.length}</span>
              <span className="wp-page-taxonomy-hub__stat-label">Partner Brands</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">{ALL_ACCOMMODATION.length}+</span>
              <span className="wp-page-taxonomy-hub__stat-label">Properties</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">30+</span>
              <span className="wp-page-taxonomy-hub__stat-label">Years Combined</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">3</span>
              <span className="wp-page-taxonomy-hub__stat-label">African Regions</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="wp-page-taxonomy-hub__intro">
        <Container>
          <div className="wp-page-taxonomy-hub__intro-inner">
            <span className="wp-page-taxonomy-hub__intro-eyebrow">Curated Excellence</span>
            <p className="wp-page-taxonomy-hub__intro-text">
              Each of our partner brands has been carefully vetted for quality, sustainability, and authenticity.
              From pioneering conservation operators to luxury hospitality groups, these are the names that define
              the gold standard of African travel.
            </p>
          </div>
        </Container>
      </section>

      {/* Card Grid */}
      <section className="wp-page-taxonomy-hub__grid-section">
        <Container>
          <div className="wp-page-taxonomy-hub__grid">
            {brandsWithCounts.map((brand) => (
              <button
                key={brand.id}
                className="wp-page-taxonomy-hub__card"
                onClick={() => navigateTo(`/brands/${brand.slug}`)}
                aria-label={`View ${brand.name} properties`}
                type="button"
              >
                <div className="wp-page-taxonomy-hub__card-image">
                  <ImageWithFallback
                    src={BRAND_IMAGES[brand.slug] || BRAND_IMAGES.independent}
                    alt={brand.name}
                    loading="lazy"
                  />
                  <div className="wp-page-taxonomy-hub__card-image-overlay" />
                  <span className="wp-page-taxonomy-hub__card-badge">
                    {brand.propertyCount} properties
                  </span>
                </div>
                <div className="wp-page-taxonomy-hub__card-body">
                  <h3 className="wp-page-taxonomy-hub__card-title">{brand.name}</h3>
                  <p className="wp-page-taxonomy-hub__card-description">{brand.description}</p>
                  <div className="wp-page-taxonomy-hub__card-meta">
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Bed size={14} /> {brand.propertyCount} properties
                    </span>
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Star size={14} /> Premium
                    </span>
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Globe size={14} /> Africa-wide
                    </span>
                  </div>
                  <span className="wp-page-taxonomy-hub__card-link">
                    Explore {brand.name} <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <FAQ
        items={FAQ_GENERAL.slice(0, 4)}
        title="Brand Partners FAQ"
        intro="Common questions about our accommodation brand partnerships."
      />

      <CTA
        title="Prefer a Specific Brand?"
        description="Tell us your preferred brand and we'll build a bespoke itinerary around their finest properties across Africa."
        variant="gradient"
        primaryAction={{
          label: "Request a Branded Itinerary",
          onClick: () => navigateTo("/quote-request"),
        }}
        secondaryAction={{
          label: "All Accommodation",
          onClick: () => navigateTo("/accommodation"),
        }}
      />
    </article>
  );
}

export default BrandsArchivePage;
