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
        "wp-card wp-card--team group",
        layout === "horizontal" && "wp-card--team--horizontal",
        onClick && "cursor-pointer"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View profile of ${member.name}`}
    >
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
      <div className="wp-card__content">
        <div className="wp-card__header">
          <h3 className="wp-card__title">
            {member.name}
          </h3>
          <p className="wp-card__role">
            {member.role}
          </p>
        </div>
        
        <p className="wp-card__description">
          {member.excerpt}
        </p>
        
        {/* Specialties/Tags */}
        {member.specialties && member.specialties.length > 0 && (
          <div className="wp-card__tags">
            {member.specialties.slice(0, 3).map((tag, i) => (
              <span key={i} className="wp-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Contact Strip */}
        <div className="wp-card__footer">
          <div className="wp-card__contact-item">
            <div className="wp-card__contact-icon-wrapper">
              <Envelope className="wp-card__contact-icon" />
            </div>
            <span className="wp-card__contact-label">{member.email}</span>
          </div>
          
          <div className="wp-card__contact-item">
            <div className="wp-card__contact-icon-wrapper">
              <Phone className="wp-card__contact-icon" />
            </div>
            <span className="wp-card__contact-label">{member.phone}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TeamCard;