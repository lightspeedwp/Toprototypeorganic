/**
 * Special Offer Card component for displaying promotional deals.
 * 
 * Displays a special offer/promotion with featured image, discount badge,
 * title, excerpt, and validity dates in a card format. Used in specials
 * archives, promotional sections, and deal listings.
 * 
 * **Features:**
 * - Featured image with aspect ratio 4:3
 * - Image zoom effect on hover
 * - Prominent discount badge with percent icon
 * - Title and excerpt display
 * - Validity date range display
 * - Click handler for navigation to full offer
 * - Responsive card design
 * 
 * **WordPress Mapping:**
 * 
 * Used within `core/post-template` for special offers archives.
 * Maps to a custom block or pattern for promotional cards.
 * Composed of:
 * - core/image (featured image)
 * - core/post-title (special offer title)
 * - core/post-excerpt (special offer excerpt)
 * - Custom meta blocks (discount, validity dates)
 * 
 * **Design System:**
 * - Title: H3 with Lora serif font
 * - Excerpt: Noto Sans, muted foreground, 2-line clamp
 * - Discount badge: Accent background, accent text, medium weight
 * - Validity: Base size, Noto Sans, muted, with calendar icon
 * - Card: White background, border, shadow on hover
 * 
 * **Content Strategy:**
 * - Excerpt should be 1-2 sentences (auto-truncated to 2 lines)
 * - Featured image should highlight destination/experience
 * - Discount format: "20% Off" or "Save $500"
 * - Validity dates formatted as MM/DD/YYYY
 * - Keep titles action-oriented (e.g., "Early Bird Safari Special")
 * 
 * **Difference from Other Cards:**
 * - Discount badge at top (visual prominence)
 * - Validity dates (time-sensitive information)
 * - Promotional/marketing focused
 * - Urgency and scarcity emphasis
 * 
 * @module SpecialCard
 * @category patterns
 * @wordpressBlock lightspeed/special-card
 * @see /guidelines/patterns/card-grid-patterns.md
 */

import { Calendar, Percent } from "@phosphor-icons/react";
import type { Special } from "../../data/types";
import { cn } from "../../lib/utils";

/**
 * Props for the SpecialCard component.
 * 
 * @interface SpecialCardProps
 */
interface SpecialCardProps {
  /** Special offer data to display */
  special: Special;
  /** Optional click handler for navigation to full offer */
  onClick?: () => void;
  /** Layout variant: "grid" (vertical) or "list" (horizontal) */
  layout?: "grid" | "list";
}

/**
 * Special Offer Card Component.
 * 
 * Displays a promotional offer in card format with image, discount badge,
 * title, excerpt, and validity dates.
 * 
 * @component
 * @category patterns
 * @wordpressBlock lightspeed/special-card
 * 
 * @param {SpecialCardProps} props - Component properties
 * @returns {JSX.Element} Rendered special offer card
 */
export function SpecialCard({ special, onClick, layout = "grid" }: SpecialCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article 
      className={cn(
        "wp-card wp-card--special",
        layout === "list" && "wp-card--horizontal"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${special.title}`}
    >
      <div className="wp-card__image-wrapper">
        <img
          src={special.featuredImage}
          alt={special.title}
          className="wp-card__image"
          loading="lazy"
        />
        
        {/* Discount Badge Overlay */}
        <div className="wp-card__image-overlay">
          <div className="wp-card__badge wp-card__badge--special">
            <Percent className="wp-card__meta-icon" aria-hidden="true" />
            <span>{special.discount}</span>
          </div>
        </div>
      </div>
      
      <div className="wp-card__content">
        <div className="wp-card__header">
          <h3 className="wp-card__title">
            {special.title}
          </h3>
        </div>
        
        <p className="wp-card__description">
          {special.excerpt}
        </p>
        
        <div className="wp-card__meta">
          <div className="wp-card__meta-item">
            <Calendar className="wp-card__meta-icon" aria-hidden="true" />
            <span>
              Valid: {new Date(special.validFrom).toLocaleDateString()} - {new Date(special.validTo).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}