/**
 * Team Card Pattern Component
 * 
 * Displays a team member profile with portrait, name, role, and bio.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Envelope, Phone, ArrowUpRight } from "@phosphor-icons/react";
import type { TeamMember } from "../../data/types";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { BotanicalCorner } from "../common/organic/OrganicAssets";

export interface TeamCardProps {
  member: TeamMember;
  onClick?: () => void;
  layout?: "card" | "horizontal";
}

export function TeamCard({ member, onClick, layout = "card" }: TeamCardProps) {
  const handleClick = () => {
    if (onClick) onClick();
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
        "wp-card wp-card--team group has-organic-assets",
        layout === "horizontal" && "wp-card--team--horizontal",
        onClick && "cursor-pointer"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View profile of ${member.name}`}
    >
      {/* Botanical Flourish */}
      <BotanicalCorner className="wp-part-botanical-ornament--top-right" />

      {/* Portrait Section */}
      <div className="wp-card__image-wrapper">
        <img
          src={member.featuredImage}
          alt={member.name}
          className="wp-card__image"
          loading="lazy"
        />
        <div className="wp-card__image-overlay" />
        
        {/* Floating Action Button */}
        <div className="wp-card__action-badge">
          <ArrowUpRight className="wp-card__action-icon" />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="wp-card__content flex flex-col items-center text-center gap-element-md flex-grow p-element-lg">
        <div className="wp-card__header flex flex-col gap-fluid-xs">
          <h3 className="wp-card__title m-0 font-[family:var(--font-family-lora)] text-[length:var(--text-xl)] text-[color:var(--color-foreground)]">
            {member.name}
          </h3>
          <p className="wp-card__role m-0 font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-primary)]">
            {member.role}
          </p>
        </div>
        
        <p className="wp-card__description m-0 font-[family:var(--font-family-noto-sans)] text-[length:var(--text-base)] text-[color:var(--color-muted-foreground)]">
          {member.excerpt}
        </p>
        
        {/* Specialties/Tags */}
        {member.specialties && member.specialties.length > 0 && (
          <div className="wp-card__tags flex flex-wrap justify-center gap-fluid-sm pt-element-sm">
            {member.specialties.slice(0, 3).map((tag, i) => (
              <span key={i} className="wp-card__tag inline-flex px-element-sm py-fluid-xs rounded-[var(--radius-full)] bg-[color:var(--color-muted)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-xs)]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
        
      {/* Contact Strip */}
      <div className="wp-card__footer flex flex-col gap-fluid-sm w-full pt-element-md border-t border-[color:var(--color-border)]">
        <div className="wp-card__contact-item flex items-center gap-fluid-sm font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] text-[color:var(--color-foreground)]">
          <div className="wp-card__contact-icon-wrapper flex-shrink-0 text-[color:var(--color-primary)]">
            <Envelope className="wp-card__contact-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
          </div>
          <span className="wp-card__contact-label truncate">{member.email}</span>
        </div>
        
        <div className="wp-card__contact-item flex items-center gap-fluid-sm font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] text-[color:var(--color-foreground)]">
          <div className="wp-card__contact-icon-wrapper flex-shrink-0 text-[color:var(--color-primary)]">
            <Phone className="wp-card__contact-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
          </div>
          <span className="wp-card__contact-label truncate">{member.phone}</span>
        </div>
      </div>
    </article>
  );
}

export default TeamCard;