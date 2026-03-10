import React from "react";
import { cn } from "../../../lib/utils";
import './GroupBlock.css';

/**
 * GroupBlock - Versatile container for grouping blocks
 * 
 * WordPress Equivalent: core/group
 * 
 * CRITICAL: This block is used to wrap patterns with section styles.
 * Every pattern must be wrapped in a GroupBlock with appropriate section style class.
 * 
 * Features:
 * - Section style application (e.g., section-hero-primary)
 * - Background color/image support
 * - Flexible spacing controls
 * - Semantic HTML tag options
 */

export interface GroupBlockProps {
  /** Child content */
  children: React.ReactNode;
  
  /** Optional custom classes */
  className?: string;
  
  /** Section style class (e.g., "section-hero-primary") */
  sectionStyle?: string;
  
  /** Background options */
  backgroundColor?: string;  // Semantic token (e.g., "muted", "accent")
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
  
  /** Spacing overrides */
  paddingTop?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  paddingBottom?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Layout */
  fullWidth?: boolean;
  
  /** Semantic HTML tag */
  tagName?: 'section' | 'article' | 'aside' | 'div';
  
  /** Accessibility */
  ariaLabel?: string;
  id?: string;
}

const paddingMap = {
  none: '0',
  xs: '4',
  sm: '8',
  md: '12',
  lg: '16',
  xl: '24',
};

export function GroupBlock({
  children,
  className,
  sectionStyle,
  backgroundColor,
  backgroundImage,
  backgroundOverlay = false,
  overlayOpacity = 0.5,
  paddingTop,
  paddingBottom,
  fullWidth = false,
  tagName: Tag = 'section',
  ariaLabel,
  id,
}: GroupBlockProps) {
  const paddingClasses = {
    top: paddingTop ? `has-padding-top-${paddingMap[paddingTop]}` : '',
    bottom: paddingBottom ? `has-padding-bottom-${paddingMap[paddingBottom]}` : '',
  };
  
  return (
    <Tag
      id={id}
      className={cn(
        // Section style (primary styling source)
        sectionStyle,
        // Background color (semantic token)
        backgroundColor && `has-${backgroundColor}-background-color`,
        // Padding overrides
        paddingClasses.top,
        paddingClasses.bottom,
        // Full width
        fullWidth && 'has-width-full',
        // Background image positioning
        backgroundImage && 'wp-block-lts-layout--relative',
        // Custom classes
        className
      )}
      aria-label={ariaLabel}
      style={{
        '--group-bg-image': backgroundImage ? `url(${backgroundImage})` : undefined,
        '--overlay-opacity': overlayOpacity,
      } as React.CSSProperties}
    >
      {/* Background overlay */}
      {backgroundOverlay && backgroundImage && (
        <div 
          className="wp-group-block__overlay" 
          aria-hidden="true"
        />
      )}
      
      {/* Content */}
      <div className={cn(
        backgroundImage && "wp-block-lts-layout--relative wp-block-lts-layout--z-10"
      )}>
        {children}
      </div>
    </Tag>
  );
}