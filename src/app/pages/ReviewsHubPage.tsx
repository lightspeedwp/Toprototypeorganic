/**
 * Customer Reviews Hub Page - Conversion Optimization Page
 * 
 * Showcases customer testimonials and trust signals with advanced filtering.
 * Adheres strictly to the design system and BEM naming.
 * 
 * @module ReviewsHubPage
 * @category pages
 */

import React, { useState } from "react";
import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { Button } from "../components/blocks/design/Button";
import { HeadingBlock } from "../components/blocks/core/HeadingBlock";
import { ParagraphBlock } from "../components/blocks/core/ParagraphBlock";
import { Star, Medal as Award, ThumbsUp, CheckCircle as CircleCheck, ArrowRight } from "@phosphor-icons/react";
import { useNavigation } from "../contexts/NavigationContext";
import { cn } from "../lib/utils";
import "../../styles/pages/reviews-hub.css";

interface Review {
  id: string;
  author: string;
  location: string;
  tour: string;
  rating: 5 | 4 | 3 | 2 | 1;
  date: string;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  helpful: number;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah & James Mitchell",
    location: "London, UK",
    tour: "Kenya Signature Safari",
    rating: 5,
    date: "Nov 2024",
    title: "Absolutely Life-Changing",
    content: "Our Kenya safari exceeded all expectations. The guides were incredibly knowledgeable, the accommodations were luxurious, and we saw the Big 5 on day two! Every detail was perfectly planned.",
    images: ["https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400"],
    verified: true,
    helpful: 24
  },
  {
    id: "2",
    author: "Michael Chen",
    location: "Singapore",
    tour: "Tanzania Great Migration",
    rating: 5,
    date: "Oct 2024",
    title: "Best Guides in Africa",
    content: "The Serengeti migration was breathtaking. Our guide made the experience even better with his passion and expertise. The lodges were stunning and the food was exceptional.",
    verified: true,
    helpful: 18
  },
  {
    id: "3",
    author: "Emma & David Wilson",
    location: "Sydney, AU",
    tour: "South Africa Explorer",
    rating: 5,
    date: "Sep 2024",
    title: "Perfect Honeymoon",
    content: "We chose this for our honeymoon and it was magical. From Cape Town to Kruger, every moment was special. The attention to detail and romantic touches made it unforgettable.",
    images: ["https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400"],
    verified: true,
    helpful: 31
  }
];

const TRUST_SIGNALS = {
  averageRating: 4.9,
  totalReviews: 1247,
  responseRate: 100,
  repeatCustomers: 68,
  awards: [
    "TripAdvisor Travelers' Choice 2024",
    "Best Safari Operator - Africa 2024",
    "Luxury Travel Awards Winner"
  ]
};

export function ReviewsHubPage() {
  const [selectedRating, setSelectedRating] = useState<number | "all">("all");
  const { navigateTo } = useNavigation();

  const filteredReviews = selectedRating === "all" 
    ? REVIEWS 
    : REVIEWS.filter(review => review.rating === selectedRating);

  const renderStars = (rating: number) => (
    <div className="wp-review-entry__rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-accent text-accent" : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );

  return (
    <PageShell context="reviews-hub" as="main" className="wp-template-reviews-hub">
      {/* Trust Stats Bar */}
      <section className="wp-reviews-trust-bar">
        <Container>
          <div className="wp-reviews-trust-bar__grid">
            <div className="wp-reviews-trust-bar__item">
              <div className="wp-reviews-trust-bar__value-wrapper">
                <Star className="wp-reviews-trust-bar__icon size-6 fill-accent" />
                <span className="wp-reviews-trust-bar__value">{TRUST_SIGNALS.averageRating}</span>
              </div>
              <p className="wp-reviews-trust-bar__label">Avg Rating</p>
            </div>
            <div className="wp-reviews-trust-bar__item">
              <span className="wp-reviews-trust-bar__value">{TRUST_SIGNALS.responseRate}%</span>
              <p className="wp-reviews-trust-bar__label">Response Rate</p>
            </div>
            <div className="wp-reviews-trust-bar__item">
              <span className="wp-reviews-trust-bar__value">{TRUST_SIGNALS.repeatCustomers}%</span>
              <p className="wp-reviews-trust-bar__label">Return Guests</p>
            </div>
            <div className="wp-reviews-trust-bar__item">
              <span className="wp-reviews-trust-bar__value">100%</span>
              <p className="wp-reviews-trust-bar__label">Verified</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Filter Bar */}
      <section className="wp-reviews-filter-bar">
        <Container>
          <div className="wp-reviews-filter-bar__container">
            <div className="wp-reviews-filter-bar__group">
              <span className="wp-reviews-filter-bar__label">Filter by:</span>
              <div className="wp-reviews-filter-bar__options">
                <button 
                  onClick={() => setSelectedRating("all")}
                  className={cn(
                    "button button--sm rounded-full",
                    selectedRating === "all" ? "button--primary" : "button--outline"
                  )}
                >All Stories</button>
                <button 
                  onClick={() => setSelectedRating(5)}
                  className={cn(
                    "button button--sm rounded-full",
                    selectedRating === 5 ? "button--primary" : "button--outline"
                  )}
                >5 Stars Only</button>
              </div>
            </div>
            <div className="wp-reviews-filter-bar__awards">
              <span className="wp-reviews-filter-bar__label">Global Awards:</span>
              {TRUST_SIGNALS.awards.slice(0, 2).map((award, i) => (
                <span key={i} className="wp-reviews-filter-bar__award-item">
                  <Award className="size-3 text-primary" /> {award}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews List */}
      <section className="wp-reviews-list">
        <Container>
          <div className="wp-reviews-list__items">
            {filteredReviews.map((review) => (
              <article key={review.id} className="wp-review-entry">
                {/* Author Sidebar */}
                <aside className="wp-review-entry__sidebar">
                  <div className="wp-review-entry__author-meta">
                    <div className="wp-review-entry__avatar">
                      <img 
                        src={`https://i.pravatar.cc/150?u=${review.id}`} 
                        alt={`Photo of ${review.author}`} 
                        className="wp-review-entry__avatar-img" 
                      />
                    </div>
                    <div className="wp-review-entry__author-info">
                      <p className="wp-review-entry__author-name">{review.author}</p>
                      <p className="wp-review-entry__author-location">{review.location}</p>
                    </div>
                  </div>
                  
                  <div className="wp-review-entry__verification-badge">
                    <div className="wp-review-entry__verified-tag">
                      <CircleCheck className="size-3" />
                      <span>Verified Guest</span>
                    </div>
                    <p className="wp-review-entry__tour-label">Experience:</p>
                    <p className="wp-review-entry__tour-name">{review.tour}</p>
                  </div>
                </aside>

                {/* Main Content */}
                <div className="wp-review-entry__main">
                  <header className="wp-review-entry__header">
                    {renderStars(review.rating)}
                    <span className="wp-review-entry__date">{review.date}</span>
                  </header>
                  
                  <HeadingBlock level={3} className="wp-review-entry__title">
                    {review.title}
                  </HeadingBlock>
                  
                  <blockquote className="wp-review-entry__content">
                    "{review.content}"
                  </blockquote>
                  
                  {review.images && (
                    <div className="wp-review-entry__gallery">
                      {review.images.map((img, i) => (
                        <div key={i} className="wp-review-entry__gallery-item">
                          <img src={img} alt="Travel moment" className="wp-review-entry__gallery-img" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="wp-review-entry__actions">
                    <button className="button button--ghost button--sm text-muted-foreground">
                      <ThumbsUp className="size-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="button button--ghost button--sm text-muted-foreground">Report</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center pt-section-sm">
            <Button variant="outline" size="lg">
              Load More Reviews <ArrowRight className="size-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to Create Your Own Story?"
        description="Join thousands of happy travelers who have discovered the magic of Africa with our expert guides."
        variant="gradient"
        primaryAction={{
          label: "Start Planning Your Journey",
          onClick: () => navigateTo("/contact")
        }}
        secondaryAction={{
          label: "Browse All Expeditions",
          onClick: () => navigateTo("/tours")
        }}
      />

      <FAQ
        title="Reviews & Trust FAQ"
        intro="How we ensure the authenticity of our customer stories."
        items={[
          { 
            id: "trust-1", 
            question: "How are these reviews verified?", 
            answer: "Every review marked with a 'Verified Guest' badge is linked to a confirmed booking in our system. We only publish stories from travelers who have actually experienced our tours." 
          },
          { 
            id: "trust-2", 
            question: "Can I speak with a past traveler?", 
            answer: "We have a network of 'Safari Ambassadors' who are happy to share their experiences one-on-one. Contact our team to be connected with a past guest from your region." 
          }
        ]}
      />
    </PageShell>
  );
}

export default ReviewsHubPage;