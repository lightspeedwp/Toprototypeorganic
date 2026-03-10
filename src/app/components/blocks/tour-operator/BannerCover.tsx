/**
 * Banner Cover Block Component
 * 
 * Full-width cover section using banner images from custom fields.
 * Provides overlay controls and minimum height settings for hero sections.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/banner-cover
 * - Category: Tour Operator
 * - Used at the start of tour, destination or accommodation pages
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module BannerCover
 * @category blocks/tour-operator
 */

import React from 'react';
import './BannerCover.css';

/**
 * Banner cover props.
 */
export interface BannerCoverProps {
  /** URL of the banner image */
  imageUrl?: string;
  
  /** Whether to use the post's featured image if no banner is set */
  useFeaturedImage?: boolean;
  
  /** Overlay opacity (0-100) */
  dimRatio?: number;
  
  /** Minimum height of the cover section */
  minHeight?: string;
  
  /** Alignment option (full, wide) */
  align?: 'full' | 'wide';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Child elements (headings, buttons, etc.) */
  children?: React.ReactNode;
}

/**
 * Banner Cover Block component.
 * 
 * Renders a full-width cover section with optional overlay and inner content.
 * Dynamic values (image URL, min-height, dim ratio) are passed as CSS
 * custom properties to keep all visual rules in the companion CSS file.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <BannerCover
 *   imageUrl="https://example.com/banner.jpg"
 *   dimRatio={50}
 *   minHeight="500px"
 *   align="full"
 * >
 *   <h1>Welcome to Iceland</h1>
 *   <p>Discover the land of fire and ice</p>
 * </BannerCover>
 * ```
 * 
 * @param {BannerCoverProps} props - Component props
 * @returns {JSX.Element} Rendered banner cover
 */
export function BannerCover({
  imageUrl,
  useFeaturedImage = false,
  dimRatio = 50,
  minHeight = '400px',
  align = 'full',
  className = '',
  children,
}: BannerCoverProps) {
  const hasImage = imageUrl || useFeaturedImage;

  // Dynamic values passed as CSS custom properties (documented exception)
  const cssVars = {
    '--banner-min-height': minHeight,
    ...(imageUrl ? { '--banner-image': `url(${imageUrl})` } : {}),
    '--banner-dim': String(dimRatio / 100),
  } as React.CSSProperties;

  return (
    <div
      className={`lsx-banner-cover ${align === 'wide' ? 'lsx-banner-cover--wide' : ''} ${className}`}
      style={cssVars}
      role="banner"
      aria-label="Hero banner"
    >
      {/* Background Image */}
      {hasImage && imageUrl && (
        <div
          className="lsx-banner-cover__background"
          aria-hidden="true"
        />
      )}
      
      {/* Overlay */}
      {hasImage && dimRatio > 0 && (
        <div
          className="lsx-banner-cover__overlay"
          aria-hidden="true"
        />
      )}
      
      {/* Content */}
      <div className="lsx-banner-cover__content">
        <div className="lsx-banner-cover__inner">
          {children}
        </div>
      </div>
    </div>
  );
}

BannerCover.displayName = 'BannerCover';