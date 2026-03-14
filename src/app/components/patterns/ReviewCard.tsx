/**
 * Review Card Pattern Component
 * 
 * Displays an individual review with rating, quote, and author information.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Star, Quote } from "@phosphor-icons/react";
import type { Review } from "../../data/types";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { BotanicalCorner } from "../common/organic/OrganicAssets";

export interface ReviewCardProps {
  review: Review;
  className?: string;
  layout?: "grid" | "horizontal";
}

export function ReviewCard({ review, className = "", layout = "grid" }: ReviewCardProps) {
  return (
    <article 
      className={cn(
        "wp-card wp-card--review group has-organic-assets",
        layout === "horizontal" && "wp-card--horizontal",
        className
      )}
    >
      {/* Botanical Flourish */}
      <BotanicalCorner className="wp-part-botanical-ornament--top-right" />

      <div className="wp-card__content relative z-10 p-element-2xl flex flex-col gap-element-md">
        {/* Rating Section */}
        <div className="wp-card__rating flex items-center gap-fluid-xs" aria-label={`Rating: ${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              weight="fill"
              className={cn(
                "wp-card__meta-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]",
                i < review.rating ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-muted)]"
              )}
            />
          ))}
        </div>

        {/* Review Body */}
        <p className="wp-card__description wp-card__description--clamp-3 italic font-[family:var(--font-family-lora)] text-[length:var(--text-lg)] text-foreground m-0">
          "{review.content}"
        </p>

        {/* Reviewer Meta */}
        <div className="wp-card__reviewer flex items-center gap-element-sm">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.author}
              className="wp-card__reviewer-avatar w-[48px] h-[48px] rounded-[var(--radius-full)] object-cover"
              loading="lazy"
            />
          ) : (
            <div className="wp-card__reviewer-avatar w-[48px] h-[48px] rounded-[var(--radius-full)] bg-[color:var(--color-primary)]/10 flex items-center justify-center text-[color:var(--color-primary)] font-[weight:var(--font-weight-bold)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-lg)]">
              {review.author.charAt(0)}
            </div>
          )}
          
          <div className="wp-card__reviewer-info flex flex-col gap-fluid-xs">
            <h4 className="wp-card__reviewer-name font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-semibold)] text-[length:var(--text-base)] m-0">
              {review.author}
            </h4>
            <div className="wp-card__reviewer-date flex items-center gap-fluid-sm font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)]">
              {review.location && <span className="truncate">{review.location}</span>}
              {review.location && review.date && <span className="opacity-30">|</span>}
              {review.date && <span>{review.date}</span>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ReviewCard;