/**
 * Accommodation Card Pattern Component
 * 
 * Displays an accommodation summary with featured image, location, rating, and price.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { MapPin, Star, ArrowRight, ShieldCheck } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Waves,
  Sparkle,
  ForkKnife,
  WifiHigh,
  Wine,
  Binoculars,
  Sailboat,
  Baby,
  Barbell,
  TShirt,
  Car,
  Footprints,
  Compass,
} from "@phosphor-icons/react";
import type { Accommodation } from "../../data/types";
import { ALL_FACILITIES } from "../../data/mockExpanded";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BotanicalCorner } from "../common/organic/OrganicAssets";

interface AccommodationCardProps {
  accommodation: Accommodation;
  onClick?: () => void;
  layout?: "card" | "horizontal";
  animated?: boolean;
}

const FACILITY_ICON_MAP: Record<string, PhosphorIcon> = {
  Waves,
  Sparkles: Sparkle,
  Utensils: ForkKnife,
  Wifi: WifiHigh,
  Wine,
  Binoculars,
  Ship: Sailboat,
  Baby,
  Dumbbell: Barbell,
  Shirt: TShirt,
  Car,
  Footprints,
};

const MAX_VISIBLE_FACILITY_ICONS = 5;

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

  // Resolve facility data for compact icon preview
  const resolvedFacilities = (accommodation.facilities || [])
    .map((id) => ALL_FACILITIES.find((f) => f.id === id))
    .filter(Boolean) as typeof ALL_FACILITIES;
  const visibleFacilities = resolvedFacilities.slice(0, MAX_VISIBLE_FACILITY_ICONS);
  const remainingCount = Math.max(0, resolvedFacilities.length - MAX_VISIBLE_FACILITY_ICONS);

  const cardContent = (
    <article 
      className={cn(
        "wp-card wp-card--accommodation group has-organic-assets",
        layout === "horizontal" && "wp-card--horizontal",
        onClick && "cursor-pointer"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${accommodation.title}`}
    >
      {/* Botanical Flourish */}
      <BotanicalCorner className="wp-part-botanical-ornament--top-right" />

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
      <div className="wp-card__content flex flex-col flex-grow p-element-lg">
        <div className="flex-1 flex flex-col gap-element-md">
          <div className="wp-card__header flex flex-col gap-fluid-xs">
            <div className="wp-card__meta-item flex items-center gap-fluid-sm font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)]">
              <MapPin className="wp-card__meta-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
              <span className="wp-card__meta-label">{accommodation.location}</span>
            </div>
            <h3 className="wp-card__title m-0 font-[family:var(--font-family-lora)] text-[length:var(--text-xl)] text-[color:var(--color-foreground)]">
              {accommodation.title}
            </h3>
          </div>

          <p className="wp-card__description m-0 pb-element-md font-[family:var(--font-family-noto-sans)] text-[length:var(--text-base)] text-[color:var(--color-muted-foreground)]">
            {accommodation.excerpt}
          </p>
        </div>

        {/* Compact Facility Icons */}
        {visibleFacilities.length > 0 && (
          <div className="wp-card__facilities" aria-label="Key amenities">
            {visibleFacilities.map((facility) => {
              const IconComp = facility.icon ? FACILITY_ICON_MAP[facility.icon] || Compass : Compass;
              return (
                <span
                  key={facility.id}
                  className="wp-card__facility-icon"
                  title={facility.name}
                  aria-label={facility.name}
                >
                  <IconComp size={14} />
                </span>
              );
            })}
            {remainingCount > 0 && (
              <span className="wp-card__facility-more">+{remainingCount}</span>
            )}
          </div>
        )}
        
        {/* Footer */}
        <div className="wp-card__footer flex items-center justify-between pt-element-md border-t border-[color:var(--color-border)]">
          <div className="wp-card__price flex items-baseline gap-fluid-xs">
            <span className="wp-card__price-amount font-[family:var(--font-family-lora)] text-[length:var(--text-lg)] font-[weight:var(--font-weight-bold)] text-[color:var(--color-primary)]">{price}</span>
            {price !== "Contact for Price" && <span className="wp-card__price-period font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)]">/ night</span>}
          </div>
          
          <div className="wp-card__action flex items-center gap-fluid-sm font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[weight:var(--font-weight-bold)] text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-foreground)] transition-colors">
            View Estate <ArrowRight className="wp-card__action-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
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