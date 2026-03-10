/**
 * Destination Card Pattern Component
 * 
 * Displays a destination with featured image, title, and tour count.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useRef } from "react";
import { Globe, Compass, ArrowRight, MapPin } from "@phosphor-icons/react";
import type { Destination } from "../../data/types";
import { cn } from "../../lib/utils";
import { motion as Motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate } from "react-router";

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
  layout?: "card" | "horizontal";
  animated?: boolean;
}

export function DestinationCard({ destination, onClick, layout = "card", animated = false }: DestinationCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigateToDestination(destination.slug);
    }
  };

  const navigateToDestination = (slug: string) => {
    navigate(`/destinations/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const tourCount = destination.tourIds?.length || 0;
  const region = (destination as any).region || (destination as any).continent || "Territory";

  const cardContent = (
    <article 
      ref={cardRef}
      className={cn(
        "wp-card wp-card--destination group",
        layout === "horizontal" && "wp-card--horizontal",
        onClick && "cursor-pointer"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${destination.title}`}
    >
      {/* Media Section */}
      <div className="wp-card__image-wrapper">
        <Motion.div 
          className="wp-card__parallax-layer"
          style={{ y, scale: 1.3 }}
        >
          <ImageWithFallback
            src={destination.featuredImage}
            alt={destination.title}
            className="wp-card__image"
          />
        </Motion.div>
        
        {/* Floating Metadata */}
        <div className="wp-card__image-overlay">
          <div className="wp-card__badge-container">
            <div className="wp-card__badge wp-card__badge--category">
              <Globe className="wp-card__badge-icon" /> {region}
            </div>
          </div>
        </div>

        {/* Content Overlay (Mobile/Grid) - Uses CSS variables via BEM classes */}
        {layout === "card" && (
          <div className="wp-card__content-overlay">
            <h3 className="wp-card__title">
              {destination.title}
            </h3>
            <div className="wp-card__meta-item">
              <Compass className="wp-card__meta-icon--small" /> {tourCount} {tourCount === 1 ? 'Adventure' : 'Adventures'} Waiting
            </div>
          </div>
        )}
      </div>
      
      {/* Content Section (Visible in Horizontal) */}
      <div className={cn(
        "wp-card__content",
        layout === "card" && "hidden"
      )}>
        {layout === "horizontal" && (
          <>
            <div className="wp-card__header">
              <h3 className="wp-card__title">
                {destination.title}
              </h3>
            </div>
            
            <p className="wp-card__description">
              {destination.excerpt}
            </p>

            <div className="wp-card__footer">
              <div className="wp-card__meta">
                <div className="wp-card__meta-item">
                  <span className="wp-card__meta-label">Tours:</span>
                  <span>{tourCount}</span>
                </div>
                <div className="wp-card__meta-item">
                  <span className="wp-card__meta-label">Best Time:</span>
                  <span>May - Oct</span>
                </div>
              </div>
              
              <div className="wp-card__action">
                Discover Region <ArrowRight className="wp-card__action-icon" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hover Reveal Overlay (Brutalist Style) */}
      {layout === "card" && (
        <div className="wp-card__hover-overlay">
          <MapPin className="wp-card__hover-icon" />
          <h3 className="wp-card__hover-title">
            Journey to {destination.title}
          </h3>
          <p className="wp-card__hover-description">
            {destination.excerpt}
          </p>
          <div className="wp-card__hover-action">
            <span>Begin Expedition</span>
            <ArrowRight className="wp-card__action-icon wp-block-lts-layout--flex-shrink-0" />
          </div>
        </div>
      )}
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

export default DestinationCard;