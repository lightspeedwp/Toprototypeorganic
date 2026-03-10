/**
 * Accommodation Card Pattern Component
 * 
 * Displays an accommodation summary with featured image, location, rating, and price.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { MapPin, Star, ArrowRight, ShieldCheck } from "@phosphor-icons/react";
import type { Accommodation } from "../../data/types";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface AccommodationCardProps {
  accommodation: Accommodation;
  onClick?: () => void;
  layout?: "card" | "horizontal";
  animated?: boolean;
}

export function AccommodationCard({ accommodation, onClick, layout = "card", animated = false }: AccommodationCardProps) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const price = (accommodation as any).pricePerNight || "Contact for Price";

  const cardContent = (
    <article 
      className={cn(
        "wp-card wp-card--accommodation group",
        layout === "horizontal" && "wp-card--horizontal",
        onClick && "cursor-pointer"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${accommodation.title}`}
    >
      {/* Featured Image */}
      <div className="wp-card__image-wrapper">
        <ImageWithFallback
          src={accommodation.featuredImage}
          alt={accommodation.title}
          className="wp-card__image"
        />
        
        {/* Floating Badges */}
        <div className="wp-card__image-overlay">
          <div className="wp-card__badge-container">
            <div className="wp-card__badge wp-card__badge--new">
              <ShieldCheck className="size-3" /> Certified Sanctuary
            </div>
          </div>
          <div className="wp-card__badge wp-card__badge--category">
            <Star className="size-3 fill-current" /> {accommodation.rating}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="wp-card__content">
        <div className="wp-card__header">
          <div className="wp-card__meta-item">
            <MapPin className="wp-card__meta-icon" />
            <span className="wp-card__meta-label">{accommodation.location}</span>
          </div>
          <h3 className="wp-card__title">
            {accommodation.title}
          </h3>
        </div>

        <p className="wp-card__description">
          {accommodation.excerpt}
        </p>
        
        {/* Footer */}
        <div className="wp-card__footer">
          <div className="wp-card__price">
            <span className="wp-card__price-amount">{price}</span>
            {price !== "Contact for Price" && <span className="wp-card__price-period">/ night</span>}
          </div>
          
          <div className="wp-card__action">
            View Estate <ArrowRight className="wp-card__action-icon" />
          </div>
        </div>
      </div>
    </article>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

export default AccommodationCard;