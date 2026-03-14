/**
 * Review Single Page - WordPress Template
 * 
 * Single review detail page with full review content, aspect ratings,
 * reviewer info, and related content.
 */

import { useParams } from "react-router";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { ALL_REVIEWS } from "../data/mockExpanded";
import { getPageSectionFAQs, TOURS } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { Star, MapPin, Calendar, Clock, Users, ThumbsUp, ShieldCheck, Quotes as Quote } from "@phosphor-icons/react";

/**
 * Review Single Page Component
 */
export function ReviewSingle() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateTo } = useNavigation();

  // Find review by slug, fallback to first review
  const review = ALL_REVIEWS.find(r => r.slug === slug) || ALL_REVIEWS[0];

  // Centralized FAQ data
  const faqData = getPageSectionFAQs("review-single");

  return (
    <article className="wp-template-single">
      {/* Breadcrumbs */}
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Traveler Reviews", href: "/reviews", onClick: () => navigateTo("/reviews") },
          { label: review.title, isCurrent: true },
        ]}
        fullWidth={true}
      />

      {/* Hero */}
      <Hero
        title={review.title}
        intro={`A ${review.rating}-star experience shared by ${review.author}`}
        context="Verified Review"
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
        height="small"
        overlay="medium"
        primaryCTA={{
          label: "View This Tour",
          onClick: () => navigateTo("/tours")
        }}
        secondaryCTA={{
          label: "All Reviews",
          onClick: () => navigateTo("/reviews"),
          variant: "outline"
        }}
      />

      {/* Review Content */}
      <section className="py-section-md">
        <Container maxWidth="narrow">
          {/* Reviewer Meta */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                {review.author.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl pb-1">{review.author}</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {review.authorLocation}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-muted-foreground/30" : ""} />
                ))}
              </div>
              {review.verified && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-success/10 text-success text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={12} />
                  Verified Trip
                </span>
              )}
            </div>
          </div>

          {/* Editorial Review */}
          <EditorialContent
            variant="minimal"
            content={`
              <div class="relative pt-8">
                <span class="absolute top-0 left-0 text-primary/10"><Quote size={64} /></span>
                <p class="text-xl leading-relaxed italic text-foreground/90">
                  "${review.content}"
                </p>
              </div>
            `}
          />

          {/* Aspect Ratings */}
          {review.aspectRatings && (
            <div className="pt-12 p-8 rounded-2xl bg-muted/30 border border-border/50 flex flex-col gap-6">
              <h3 className="text-lg font-semibold">Detailed Ratings</h3>
              <div className="grid gap-6">
                {Object.entries(review.aspectRatings).map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium">{label}</span>
                      <span className="text-primary font-bold">{value}/5</span>
                    </div>
                    <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000" 
                        style={{ '--dynamic-width': `${(value as number / 5) * 100}%`, width: 'var(--dynamic-width)' } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation Badge */}
          {review.wouldRecommend && (
            <div className="flex items-center gap-4 p-6 rounded-xl bg-success/5 border border-success/20">
              <div className="p-3 rounded-full bg-success/10 text-success">
                <ThumbsUp size={24} />
              </div>
              <div>
                <h4 className="font-bold text-success">I'd Recommend This Trip!</h4>
                <p className="text-sm text-muted-foreground">This traveler would book with us again and recommends our services.</p>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* FAQ */}
      <FAQ
        items={faqData?.items || []}
        title="Review FAQ"
        intro="Common questions about our traveler feedback and verification process."
      />

      {/* CTA */}
      <CTA
        title="Inspired by this Story?"
        description="Every journey we design is unique. Let us help you create your own unforgettable African adventure."
        variant="gradient"
        primaryAction={{
          label: "Start Planning Your Trip",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: "Browse All Reviews",
          onClick: () => navigateTo("/reviews"),
        }}
      />
    </article>
  );
}

export default ReviewSingle;