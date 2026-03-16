/**
 * Partners Page
 *
 * Showcases conservation, lodge, and industry partners
 * with filterable categories and detailed cards.
 *
 * WordPress Mapping: templates/page-partners.html
 * CSS: /src/styles/pages/partners.css
 * BEM: .wp-page-partners__*
 *
 * @module PartnersPage
 * @category pages
 */

import { useState, useMemo } from "react";
import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { ExternalLink, MapPin, Calendar, Award } from "lucide-react";
import { PARTNERS, PARTNER_CATEGORIES, type Partner } from "../data/partners";

function PartnerCard({ partner }: { partner: Partner }) {
  const categoryLabel = PARTNER_CATEGORIES.find((c) => c.id === partner.category)?.label ?? partner.category;

  return (
    <article
      className={`wp-page-partners__card${partner.featured ? " wp-page-partners__card--featured" : ""}`}
    >
      <img
        className="wp-page-partners__card-image"
        src={partner.logo}
        alt={`${partner.name}`}
        loading="lazy"
      />
      <div className="wp-page-partners__card-body">
        <div className="wp-page-partners__card-header">
          <h3 className="wp-page-partners__card-title">{partner.name}</h3>
          <span className="wp-page-partners__card-badge">{categoryLabel}</span>
        </div>

        <p className="wp-page-partners__card-desc">{partner.description}</p>

        <div className="wp-page-partners__card-highlight">
          <Award width={16} height={16} aria-hidden="true" />
          <span>{partner.highlight}</span>
        </div>

        <div className="wp-page-partners__card-meta">
          <span className="wp-page-partners__card-meta-item">
            <MapPin width={12} height={12} aria-hidden="true" />
            {partner.region}
          </span>
          <span className="wp-page-partners__card-meta-item">
            <Calendar width={12} height={12} aria-hidden="true" />
            Est. {partner.established}
          </span>
        </div>

        {partner.website !== "#" && (
          <a
            href={partner.website}
            className="wp-page-partners__card-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${partner.name} website (opens in new tab)`}
          >
            Visit website
            <ExternalLink width={14} height={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredPartners = useMemo(() => {
    if (activeCategory === "all") return PARTNERS;
    return PARTNERS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featuredPartners = filteredPartners.filter((p) => p.featured);
  const otherPartners = filteredPartners.filter((p) => !p.featured);

  return (
    <PageShell context="partners" className="theme-organic">
      {/* Filter Bar */}
      <section className="wp-page-partners__featured">
        <Container>
          <nav aria-label="Partner category filter" className="wp-page-partners__filters">
            {PARTNER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`wp-page-partners__filter-chip${activeCategory === cat.id ? " wp-page-partners__filter-chip--active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Featured Partners */}
          {featuredPartners.length > 0 && (
            <>
              <div className="wp-page-partners__section-header">
                <h2 className="wp-page-partners__section-title">Featured Partners</h2>
                <p className="wp-page-partners__section-subtitle">
                  Our closest allies in conservation, hospitality, and community development
                </p>
              </div>
              <div className="wp-page-partners__featured-grid">
                {featuredPartners.map((p) => (
                  <PartnerCard key={p.id} partner={p} />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* All Partners */}
      {otherPartners.length > 0 && (
        <section className="wp-page-partners__all">
          <Container>
            <div className="wp-page-partners__section-header">
              <h2 className="wp-page-partners__section-title">All Partners</h2>
              <p className="wp-page-partners__section-subtitle">
                The network that makes extraordinary journeys possible
              </p>
            </div>

            <div className="wp-page-partners__all-grid">
              {otherPartners.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {filteredPartners.length === 0 && (
        <section className="wp-page-partners__all">
          <Container>
            <div className="wp-page-careers__empty" role="status">
              <p className="wp-page-careers__empty-title">No partners in this category</p>
              <p className="wp-page-careers__empty-desc">Try selecting a different category filter above.</p>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <CTA
        title="Interested in partnering with us?"
        description="We're always looking for like-minded organisations who share our commitment to conservation and exceptional travel."
        primaryLabel="Get in touch"
        primaryHref="/contact"
        variant="primary"
      />
    </PageShell>
  );
}

export default PartnersPage;
