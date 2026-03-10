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

export interface ReviewCardProps {
  review: Review;
  className?: string;
  layout?: "grid" | "horizontal";
}

export function ReviewCard({ review, className = "", layout = "grid" }: ReviewCardProps) {
  return (
    <article 
      className={cn(
        "wp-card wp-card--review group",
        layout === "horizontal" && "wp-card--horizontal",
        className
      )}
    >
      <div className="wp-card__content">
        {/* Rating Section */}
        <div className="wp-card__rating" aria-label={`Rating: ${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                "wp-card__meta-icon",
                i < review.rating && "wp-card__meta-icon--star"
              )}
            />
          ))}
        </div>

        {/* Review Body */}
        <p className="wp-card__description wp-card__description--clamp-3 italic">
          "{review.content}"
        </p>

        {/* Reviewer Meta */}
        <div className="wp-card__reviewer">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.author}
              className="wp-card__reviewer-avatar"
              loading="lazy"
            />
          ) : (
            <div className="wp-card__reviewer-avatar bg-primary/10 flex items-center justify-center text-primary font-bold">
              {review.author.charAt(0)}
            </div>
          )}
          
          <div className="wp-card__reviewer-info">
            <h4 className="wp-card__reviewer-name">
              {review.author}
            </h4>
            <div className="wp-card__reviewer-date">
              {review.location && <span className="truncate">{review.location}</span>}
              {review.location && review.date && <span className="opacity-30"> | </span>}
              {review.date && <span>{review.date}</span>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ReviewCard;