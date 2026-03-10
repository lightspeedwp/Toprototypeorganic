/**
 * Reviews Section Pattern Component
 * 
 * Displays a collection of customer reviews with a rating summary.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Star, ChatCircle as MessageSquare, Quotes as Quote } from "@phosphor-icons/react";
import { ReviewCard } from "./ReviewCard";
import { CardGrid } from "./CardGrid";
import { cn } from "../../lib/utils";
import type { Review } from "../../data/types";
import { motion } from "motion/react";

export interface ReviewsSectionPatternProps {
  title?: string;
  description?: string;
  reviews: Review[];
  showSummary?: boolean;
  averageRating?: number;
  totalReviews?: number;
  columns?: 1 | 2 | 3;
  className?: string;
}

export function ReviewsSectionPattern({
  title = "The Traveler's Voice",
  description,
  reviews = [],
  showSummary = true,
  averageRating,
  totalReviews,
  columns = 3,
  className,
}: ReviewsSectionPatternProps) {
  const calculatedAverage = averageRating || (
    reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 4.9
  );

  const displayTotal = totalReviews || (reviews.length || 124);

  return (
    <section className={cn("wp-pattern-lts-reviews has-section-padding-md bg-muted/5 border-y-2 border-border/50", className)}>
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Quote className="size-5" />
              </div>
              <HeadingBlock level={2} className="mb-0 text-3xl md:text-4xl">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="text-muted-foreground text-lg m-0 leading-relaxed">
                {description}
              </ParagraphBlock>
            )}
          </div>

          {/* Rating Summary Card */}
          {showSummary && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-4xl bg-card border-2 border-border shadow-xl flex items-center gap-8 relative overflow-hidden group hover:border-primary transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Star className="size-20 text-accent fill-current" />
              </div>
              
              <div className="text-center relative z-10">
                <p className="text-[length:var(--text-5xl)] text-primary leading-none mb-2">
                  {calculatedAverage.toFixed(1)}
                </p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-3",
                        i < Math.round(calculatedAverage) ? "fill-accent text-accent" : "text-muted-foreground/20"
                      )}
                    />
                  ))}
                </div>
                <p className="text-[length:var(--text-xs)] uppercase tracking-widest text-muted-foreground">Rating Score</p>
              </div>
              
              <div className="h-16 w-px bg-border/50 relative z-10" />
              
              <div className="relative z-10">
                <p className="text-[length:var(--text-sm)] text-foreground mb-1">
                  Verified Experiences
                </p>
                <p className="text-xs text-muted-foreground m-0">
                  Based on {displayTotal} detailed reviews from our global community.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          {/* Decorative background element */}
          <div className="absolute -top-10 -left-10 size-40 bg-primary/5 rounded-full blur-3xl" />
          
          <CardGrid columns={columns as any} animated>
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </CardGrid>
        </div>

        {/* Bottom Action */}
        <div className="mt-16 text-center">
          <button 
            className="inline-flex items-center gap-[var(--spacing-gap-sm)] px-[var(--spacing-element-xl)] py-[var(--spacing-element-md)] rounded-[var(--radius-xl)] border-2 border-border text-[length:var(--text-sm)] hover:bg-muted transition-all group"
          >
            Read All Testimonials <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </Container>
    </section>
  );
}

export default ReviewsSectionPattern;
