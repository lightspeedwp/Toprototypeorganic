/**
 * Tour Card Pattern Component
 * 
 * Displays a tour summary with featured image, duration, group size, and price.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Clock, Users, ArrowRight, Star } from "@phosphor-icons/react";
import type { Tour } from "../../data/types";
import { cn } from "../../lib/utils";
import { motion as Motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate } from "react-router";
import { SafariMedallion, BotanicalCorner } from "../common/organic/OrganicAssets";

interface TourCardProps {
  tour: Tour;
  onClick?: () => void;
  layout?: "card" | "horizontal";
  animated?: boolean;
}

export function TourCard({ tour, onClick, layout = "card", animated = false }: TourCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/tours/${tour.id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const isSpecial = tour.isSpecialOffer;

  const cardContent = (
    <article 
      className={cn(
        "wp-card wp-card--tour group has-organic-assets",
        layout === "horizontal" && "wp-card--horizontal",
        isSpecial && "wp-card--special",
        onClick && "cursor-pointer"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${tour.title}`}
    >
      {/* Organic Decorations */}
      {isSpecial && <SafariMedallion className="wp-block-safari-badge--top-right" />}
      <BotanicalCorner className="wp-part-botanical-ornament--bottom-right-large" />

      {/* Featured Image Section */}
      <div className="wp-card__image-wrapper">
        <ImageWithFallback
          src={tour.featuredImage}
          alt={tour.title}
          className="wp-card__image"
        />
        
        {/* Overlays & Badges */}
        <div className="wp-card__image-overlay">
          <div className="wp-card__badge-container">
            {isSpecial && (
              <div className="wp-card__badge wp-card__badge--special">
                <Star className="size-3 fill-current" /> Special Offer
              </div>
            )}
            {tour.difficulty && (
              <div className="wp-card__badge wp-card__badge--category">
                {tour.difficulty}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="wp-card__content">
        <div className="wp-card__header">
          <div className="wp-card__category">
            {tour.destination || 'Global Experience'}
          </div>
          <h3 className="wp-card__title">
            <a href={`/tours/${tour.id}`} onClick={(e) => { e.preventDefault(); handleClick(); }}>
              {tour.title}
            </a>
          </h3>
        </div>
        
        <p className="wp-card__description">
          {tour.excerpt}
        </p>
        
        {/* Meta Grid */}
        <div className="wp-card__meta">
          <div className="wp-card__meta-item">
            <Clock className="wp-card__meta-icon" />
            <span className="wp-card__meta-label">Duration:</span>
            <span>{tour.duration}</span>
          </div>
          
          <div className="wp-card__meta-item">
            <Users className="wp-card__meta-icon" />
            <span className="wp-card__meta-label">Group:</span>
            <span>{tour.groupSize}</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="wp-card__footer">
          <div className="wp-card__price">
            <span className="wp-card__price-amount">{tour.price}</span>
          </div>
          
          <div className="wp-card__action">
            View Details <ArrowRight className="wp-card__action-icon" />
          </div>
        </div>
      </div>
    </article>
  );

  if (animated) {
    return (
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {cardContent}
      </Motion.div>
    );
  }

  return cardContent;
}

export default TourCard;