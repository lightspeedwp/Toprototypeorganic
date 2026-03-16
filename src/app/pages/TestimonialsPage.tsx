/**
 * Testimonials Page
 *
 * Social proof page showcasing curated traveller testimonials
 * with stats, featured quotes, and full listing.
 *
 * WordPress Mapping: templates/page-testimonials.html
 * CSS: /src/styles/pages/testimonials.css
 * BEM: .wp-page-testimonials__*
 *
 * @module TestimonialsPage
 * @category pages
 */

import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { Star, Sparkles } from "lucide-react";
import { TESTIMONIALS, TESTIMONIAL_STATS } from "../data/testimonials";
import { useNavigation } from "../contexts/NavigationContext";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="wp-page-testimonials__stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          width={16}
          height={16}
          fill={i < rating ? "currentColor" : "none"}
          strokeWidth={i < rating ? 0 : 1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  featured?: boolean;
}) {
  const { navigateTo } = useNavigation();

  return (
    <article
      className={`wp-page-testimonials__card${featured ? " wp-page-testimonials__card--featured" : ""}`}
    >
      <div className="wp-page-testimonials__card-header">
        <img
          className="wp-page-testimonials__avatar"
          src={testimonial.avatar}
          alt={`Portrait of ${testimonial.name}`}
          loading="lazy"
        />
        <div className="wp-page-testimonials__card-identity">
          <h3 className="wp-page-testimonials__card-name">{testimonial.name}</h3>
          <span className="wp-page-testimonials__card-location">{testimonial.location}</span>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      <blockquote className="wp-page-testimonials__quote">
        {testimonial.quote}
      </blockquote>

      <div className="wp-page-testimonials__highlight">
        <Sparkles width={16} height={16} aria-hidden="true" />
        <span>{testimonial.highlight}</span>
      </div>

      <div className="wp-page-testimonials__card-footer">
        <a
          href={`/tours/${testimonial.tourSlug}`}
          className="wp-page-testimonials__tour-name"
          onClick={(e) => {
            e.preventDefault();
            navigateTo(`/tours/${testimonial.tourSlug}`);
          }}
        >
          {testimonial.tour}
        </a>
        <span className="wp-page-testimonials__date">{testimonial.date}</span>
      </div>
    </article>
  );
}

export function TestimonialsPage() {
  const featured = TESTIMONIALS.filter((t) => t.featured);
  const rest = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <PageShell context="testimonials" className="theme-organic">
      {/* Stats Section */}
      <section className="wp-page-testimonials__stats">
        <Container>
          <div className="wp-page-testimonials__stats" role="list" aria-label="Traveller statistics">
            {TESTIMONIAL_STATS.map((stat) => (
              <div key={stat.label} className="wp-page-testimonials__stat" role="listitem">
                <span className="wp-page-testimonials__stat-value">{stat.value}</span>
                <span className="wp-page-testimonials__stat-label">{stat.label}</span>
                <span className="wp-page-testimonials__stat-desc">{stat.description}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Testimonials */}
      <section className="wp-page-testimonials__featured">
        <Container>
          <div className="wp-page-testimonials__section-header">
            <h2 className="wp-page-testimonials__section-title">Featured Stories</h2>
            <p className="wp-page-testimonials__section-subtitle">
              Hear directly from travellers whose lives were changed by their journeys
            </p>
          </div>

          <div className="wp-page-testimonials__featured-grid">
            {featured.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} featured />
            ))}
          </div>
        </Container>
      </section>

      {/* All Testimonials */}
      <section className="wp-page-testimonials__all">
        <Container>
          <div className="wp-page-testimonials__section-header">
            <h2 className="wp-page-testimonials__section-title">More Traveller Stories</h2>
            <p className="wp-page-testimonials__section-subtitle">
              Every journey tells a story worth sharing
            </p>
          </div>

          <div className="wp-page-testimonials__all-grid">
            {rest.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to write your own story?"
        description="Join thousands of travellers who have experienced the journey of a lifetime."
        primaryLabel="Start planning"
        primaryHref="/contact"
        secondaryLabel="Browse tours"
        secondaryHref="/tours"
        variant="primary"
      />
    </PageShell>
  );
}

export default TestimonialsPage;
