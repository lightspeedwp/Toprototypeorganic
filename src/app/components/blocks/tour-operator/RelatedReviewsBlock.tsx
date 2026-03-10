/**
 * Related Reviews Block
 * 
 * Displays reviews related to the current accommodation.
 * Shows customer testimonials and ratings for the property.
 * 
 * **WordPress Mapping:**
 * Block slug: lsx-tour-operator/review-related-accommodation
 * Category: Tour Operator
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Lora for headings, Noto Sans for body text
 * - section-content-default style class
 * 
 * @module RelatedReviewsBlock
 * @category blocks/tour-operator
 * @see /guidelines/blocks/review-related-accommodation.md
 */

import { Star } from "@phosphor-icons/react";
import { Container } from "../../common/Container";
import { REVIEWS } from "../../../data/mock";
import type { Review } from "../../../data/types";

/**
 * Props for the RelatedReviewsBlock component
 */
interface RelatedReviewsBlockProps {
  /** Heading text */
  title?: string;
  /** Number of reviews to display */
  postsPerPage?: number;
  /** ID of accommodation to filter reviews */
  accommodationId?: string;
  /** Order of reviews (asc or desc by date) */
  order?: "asc" | "desc";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Get reviews for accommodation
 */
function getAccommodationReviews(
  accommodationId?: string,
  order: "asc" | "desc" = "desc",
  limit: number = 6
): Review[] {
  let reviews = [...REVIEWS];

  // Filter by accommodation if specified
  if (accommodationId) {
    reviews = reviews.filter(review => review.accommodationId === accommodationId);
  }

  // Sort by date
  reviews.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });

  return reviews.slice(0, limit);
}

/**
 * Review Card Component
 */
function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < review.rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <h3 className="mb-3">{review.title}</h3>

      {/* Review Content */}
      <p className="text-muted-foreground mb-4 line-clamp-4">
        {review.content}
      </p>

      {/* Author */}
      <div className="flex items-center justify-between text-sm border-t border-border pt-4">
        <div>
          <p className="font-medium text-foreground">{review.author}</p>
          <p className="text-muted-foreground text-xs">{review.authorLocation}</p>
        </div>
        <div className="text-muted-foreground text-xs">
          {new Date(review.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Verified Badge */}
      {review.verified && (
        <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
          <svg
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Verified Stay
        </div>
      )}
    </article>
  );
}

/**
 * Related Reviews Block Component
 * 
 * Displays a grid of customer reviews for an accommodation.
 * 
 * @param {RelatedReviewsBlockProps} props - Component properties
 * @returns {JSX.Element} Rendered related reviews block
 * 
 * @example
 * <RelatedReviewsBlock
 *   accommodationId="acc-1"
 *   postsPerPage={6}
 * />
 */
export function RelatedReviewsBlock({
  title = "Customer Reviews",
  postsPerPage = 6,
  accommodationId,
  order = "desc",
  className = "",
}: RelatedReviewsBlockProps) {
  const reviews = getAccommodationReviews(accommodationId, order, postsPerPage);

  // Don't render if no reviews
  if (reviews.length === 0) {
    return (
      <section className={`section-content-default ${className}`}>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">{title}</h2>
            <p className="text-muted-foreground">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={`section-content-default ${className}`}>
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2>{title}</h2>
          <div className="mt-4 w-20 h-0.5 bg-border mx-auto" />
          <p className="mt-4 text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </section>
  );
}
