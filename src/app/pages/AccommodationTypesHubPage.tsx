/**
 * Accommodation Types Hub Page
 * 
 * Content Hub Archetype listing all accommodation type taxonomy terms.
 * Each card links to the corresponding taxonomy archive.
 * 
 * @module AccommodationTypesHubPage
 * @category pages
 */

import { ArrowRight, Bed, MapPin } from "@phosphor-icons/react";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import { ACCOMMODATION_TYPES } from "../data/taxonomies/accommodation-types";
import { ALL_ACCOMMODATION } from "../data/mockExpanded";
import { FAQ_GENERAL } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const TYPE_IMAGES: Record<string, string> = {
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  lodge: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&h=400&fit=crop",
  resort: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop",
  "tented-camp": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop",
  boutique: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
  villa: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  "mobile-camp": "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&h=400&fit=crop",
  treehouse: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
  guesthouse: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
  "private-island": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
};

function AccommodationTypesHubPage() {
  const { navigateTo } = useNavigation();

  const typesWithCounts = ACCOMMODATION_TYPES.map((accType) => ({
    ...accType,
    propertyCount: ALL_ACCOMMODATION.filter((a) =>
      accType.accommodationIds?.includes(a.id)
    ).length,
  }));

  return (
    <article className="wp-page-taxonomy-hub">
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Accommodation", href: "/accommodation", onClick: () => navigateTo("/accommodation") },
          { label: "Accommodation Types" },
        ]}
        fullWidth
      />

      <Hero
        title="Accommodation Types"
        intro="From treehouse lodges suspended in the canopy to exclusive private island resorts, discover the extraordinary places where you'll rest between adventures."
        image="https://images.unsplash.com/photo-1764977224678-65ab06ea020a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWZhcmklMjBsb2RnZSUyMGFjY29tbW9kYXRpb258ZW58MXx8fHwxNzczMzIyMDk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
        context="Where to Stay"
        height="medium"
        overlay="medium"
      />

      {/* Stats */}
      <section className="wp-page-taxonomy-hub__stats">
        <Container>
          <div className="wp-page-taxonomy-hub__stats-grid">
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">{ACCOMMODATION_TYPES.length}</span>
              <span className="wp-page-taxonomy-hub__stat-label">Property Types</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">{ALL_ACCOMMODATION.length}+</span>
              <span className="wp-page-taxonomy-hub__stat-label">Properties</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">7</span>
              <span className="wp-page-taxonomy-hub__stat-label">Premium Brands</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">5★</span>
              <span className="wp-page-taxonomy-hub__stat-label">Average Rating</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="wp-page-taxonomy-hub__intro">
        <Container>
          <div className="wp-page-taxonomy-hub__intro-inner">
            <span className="wp-page-taxonomy-hub__intro-eyebrow">Hand-Picked Properties</span>
            <p className="wp-page-taxonomy-hub__intro-text">
              Every property in our collection has been personally inspected by our team. We select only
              the finest lodges, camps, resorts, and hotels that offer exceptional service, authentic
              experiences, and a deep commitment to conservation and community.
            </p>
          </div>
        </Container>
      </section>

      {/* Card Grid */}
      <section className="wp-page-taxonomy-hub__grid-section">
        <Container>
          <div className="wp-page-taxonomy-hub__grid">
            {typesWithCounts.map((accType) => (
              <button
                key={accType.id}
                className="wp-page-taxonomy-hub__card"
                onClick={() => navigateTo(`/accommodation-types/${accType.slug}`)}
                aria-label={`View ${accType.name} properties`}
                type="button"
              >
                <div className="wp-page-taxonomy-hub__card-image">
                  <ImageWithFallback
                    src={TYPE_IMAGES[accType.slug] || TYPE_IMAGES.lodge}
                    alt={accType.name}
                    loading="lazy"
                  />
                  <div className="wp-page-taxonomy-hub__card-image-overlay" />
                  <span className="wp-page-taxonomy-hub__card-badge">
                    {accType.propertyCount} properties
                  </span>
                </div>
                <div className="wp-page-taxonomy-hub__card-body">
                  <h3 className="wp-page-taxonomy-hub__card-title">{accType.name}</h3>
                  <p className="wp-page-taxonomy-hub__card-description">{accType.description}</p>
                  <div className="wp-page-taxonomy-hub__card-meta">
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Bed size={14} /> {accType.propertyCount} properties
                    </span>
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <MapPin size={14} /> Across Africa
                    </span>
                  </div>
                  <span className="wp-page-taxonomy-hub__card-link">
                    Browse {accType.name} <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <FAQ
        items={FAQ_GENERAL.slice(0, 4)}
        title="Accommodation FAQ"
        intro="Frequently asked questions about African safari accommodation."
      />

      <CTA
        title="Need Help Choosing?"
        description="Our accommodation specialists have stayed at every property in our portfolio and can recommend the perfect match for your safari style."
        variant="gradient"
        primaryAction={{
          label: "Ask Our Experts",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: "All Accommodation",
          onClick: () => navigateTo("/accommodation"),
        }}
      />
    </article>
  );
}

export default AccommodationTypesHubPage;
