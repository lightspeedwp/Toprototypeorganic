/**
 * Facilities Hub Page
 * 
 * Content Hub Archetype listing all facility/amenity taxonomy terms.
 * Each card links to the corresponding taxonomy archive showing
 * accommodation properties that offer that facility.
 * 
 * @module FacilitiesHubPage
 * @category pages
 */

import { ArrowRight, Bed } from "@phosphor-icons/react";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import { FACILITIES } from "../data/taxonomies/facilities";
import { ALL_ACCOMMODATION } from "../data/mockExpanded";
import { FAQ_GENERAL } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/** Map facility icon string names to Phosphor icon components. */
import {
  Waves,
  Sparkle,
  ForkKnife,
  WifiHigh,
  Wine,
  Binoculars,
  Sailboat,
  Baby,
  Barbell,
  TShirt,
  Car,
  Footprints,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

const FACILITY_ICON_MAP: Record<string, PhosphorIcon> = {
  Waves,
  Sparkles: Sparkle,
  Utensils: ForkKnife,
  Wifi: WifiHigh,
  Wine,
  Binoculars,
  Ship: Sailboat,
  Baby,
  Dumbbell: Barbell,
  Shirt: TShirt,
  Car,
  Footprints,
};

/** Popular facility combinations that guests commonly search for. */
const POPULAR_COMBOS = [
  { label: "Luxury Wellness", facilities: ["swimming-pool", "spa", "gym"], description: "Pool, Spa & Fitness" },
  { label: "Family Friendly", facilities: ["swimming-pool", "kids-club", "restaurant"], description: "Pool, Kids Club & Dining" },
  { label: "Safari Essentials", facilities: ["game-drives", "guided-walks", "bar"], description: "Game Drives, Walks & Bar" },
  { label: "Full Service", facilities: ["restaurant", "bar", "wifi"], description: "Dining, Bar & WiFi" },
  { label: "Active Adventure", facilities: ["game-drives", "water-sports", "guided-walks"], description: "Drives, Water Sports & Walks" },
  { label: "Premium Comfort", facilities: ["spa", "airport-transfer", "laundry"], description: "Spa, Transfers & Laundry" },
];

function FacilitiesHubPage() {
  const { navigateTo } = useNavigation();

  const facilitiesWithCounts = FACILITIES.map((facility) => ({
    ...facility,
    propertyCount: facility.accommodationIds.length,
  }));

  /** For each combo, compute how many properties have ALL the listed facilities. */
  const combosWithCounts = POPULAR_COMBOS.map((combo) => {
    const facilityObjects = combo.facilities
      .map((slug) => FACILITIES.find((f) => f.slug === slug))
      .filter(Boolean);

    const matchingPropertyIds = facilityObjects.reduce<string[]>(
      (acc, fac) => {
        if (!fac) return acc;
        if (acc.length === 0) return [...fac.accommodationIds];
        return acc.filter((id) => fac.accommodationIds.includes(id));
      },
      []
    );

    return {
      ...combo,
      propertyCount: matchingPropertyIds.length,
      facilityObjects,
    };
  });

  const totalProperties = ALL_ACCOMMODATION.length;
  const totalFacilities = FACILITIES.length;

  return (
    <article className="wp-page-taxonomy-hub">
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          {
            label: "Accommodation",
            href: "/accommodation",
            onClick: () => navigateTo("/accommodation"),
          },
          { label: "Facilities" },
        ]}
        fullWidth
      />

      <Hero
        title="Facilities & Amenities"
        intro="From infinity pools overlooking the savannah to rejuvenating bush spas, discover the world-class amenities that make every African safari lodge feel like home."
        image="https://images.unsplash.com/photo-1734362815901-24bdeb199da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWZhcmklMjBsb2RnZSUyMGFtZW5pdGllcyUyMEFmcmljYXxlbnwxfHx8fDE3NzMzMjYxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        context="Browse by Facility"
        height="medium"
        overlay="medium"
      />

      {/* Stats */}
      <section className="wp-page-taxonomy-hub__stats">
        <Container>
          <div className="wp-page-taxonomy-hub__stats-grid">
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">
                {totalFacilities}
              </span>
              <span className="wp-page-taxonomy-hub__stat-label">
                Facility Types
              </span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">
                {totalProperties}+
              </span>
              <span className="wp-page-taxonomy-hub__stat-label">
                Properties
              </span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">3</span>
              <span className="wp-page-taxonomy-hub__stat-label">
                African Regions
              </span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">5★</span>
              <span className="wp-page-taxonomy-hub__stat-label">
                Quality Standard
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="wp-page-taxonomy-hub__intro">
        <Container>
          <div className="wp-page-taxonomy-hub__intro-inner">
            <span className="wp-page-taxonomy-hub__intro-eyebrow">
              Find Your Perfect Stay
            </span>
            <p className="wp-page-taxonomy-hub__intro-text">
              Every property in our portfolio offers a unique combination of
              facilities and amenities. Whether you need a pool for the little
              ones, a spa to unwind after a long game drive, or reliable WiFi
              to stay connected, filter our properties by the amenities that
              matter most to you.
            </p>
          </div>
        </Container>
      </section>

      {/* Card Grid */}
      <section className="wp-page-taxonomy-hub__grid-section">
        <Container>
          <div className="wp-page-taxonomy-hub__grid">
            {facilitiesWithCounts.map((facility) => (
              <button
                key={facility.id}
                className="wp-page-taxonomy-hub__card"
                onClick={() => navigateTo(`/facilities/${facility.slug}`)}
                aria-label={`View properties with ${facility.name}`}
                type="button"
              >
                <div className="wp-page-taxonomy-hub__card-image">
                  <ImageWithFallback
                    src={
                      FACILITY_IMAGES[facility.slug] ||
                      FACILITY_IMAGES["swimming-pool"]
                    }
                    alt={facility.name}
                    loading="lazy"
                  />
                  <div className="wp-page-taxonomy-hub__card-image-overlay" />
                  <span className="wp-page-taxonomy-hub__card-badge">
                    {facility.propertyCount}{" "}
                    {facility.propertyCount === 1 ? "property" : "properties"}
                  </span>
                </div>
                <div className="wp-page-taxonomy-hub__card-body">
                  <div className="wp-page-taxonomy-hub__card-title-row">
                    {facility.icon && FACILITY_ICON_MAP[facility.icon] && (
                      <span className="wp-page-taxonomy-hub__card-icon">
                        {(() => {
                          const IconComp = FACILITY_ICON_MAP[facility.icon];
                          return <IconComp size={18} weight="bold" />;
                        })()}
                      </span>
                    )}
                    <h3 className="wp-page-taxonomy-hub__card-title">
                      {facility.name}
                    </h3>
                  </div>
                  <p className="wp-page-taxonomy-hub__card-description">
                    {facility.description}
                  </p>
                  <div className="wp-page-taxonomy-hub__card-meta">
                    <span className="wp-page-taxonomy-hub__card-meta-item">
                      <Bed size={14} /> {facility.propertyCount} properties
                    </span>
                  </div>
                  <span className="wp-page-taxonomy-hub__card-link">
                    Browse Properties <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Popular Combinations */}
      <section className="wp-page-taxonomy-hub__quick-links">
        <Container>
          <div className="wp-page-taxonomy-hub__quick-links-inner">
            <div className="wp-page-taxonomy-hub__quick-links-header">
              <h2 className="wp-page-taxonomy-hub__quick-links-title">
                Popular Facility Combinations
              </h2>
              <p className="wp-page-taxonomy-hub__quick-links-subtitle">
                Guests frequently search for these amenity combinations — find properties that offer them all.
              </p>
            </div>
            <div className="wp-page-taxonomy-hub__quick-links-grid">
              {combosWithCounts.map((combo) => (
                <button
                  key={combo.label}
                  className="wp-page-taxonomy-hub__quick-link-card"
                  onClick={() => navigateTo(`/facilities/${combo.facilities[0]}`)}
                  aria-label={`Browse properties with ${combo.description}`}
                  type="button"
                >
                  <span className="wp-page-taxonomy-hub__quick-link-icons">
                    {combo.facilityObjects.map((fac) => {
                      if (!fac?.icon) return null;
                      const IconComp = FACILITY_ICON_MAP[fac.icon];
                      if (!IconComp) return null;
                      return <IconComp key={fac.id} size={18} weight="bold" />;
                    })}
                  </span>
                  <span className="wp-page-taxonomy-hub__quick-link-content">
                    <span className="wp-page-taxonomy-hub__quick-link-label">
                      {combo.label}
                    </span>
                    <span className="wp-page-taxonomy-hub__quick-link-count">
                      {combo.description} — {combo.propertyCount} properties
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="wp-page-taxonomy-hub__quick-link-arrow"
                  />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FAQ
        items={FAQ_GENERAL.slice(0, 4)}
        title="Facilities FAQ"
        intro="Frequently asked questions about facilities and amenities at our African safari properties."
      />

      <CTA
        title="Looking for Specific Amenities?"
        description="Our accommodation specialists know every property inside out. Tell us which facilities matter most and we'll match you to the perfect lodge or camp."
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

export default FacilitiesHubPage;