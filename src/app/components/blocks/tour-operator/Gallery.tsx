/**
 * Gallery Block (Tour Operator) Component
 * 
 * Displays a collection of images associated with tours, accommodations or destinations.
 * Custom wrapper around core gallery functionality with design system consistency.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/gallery
 * - Category: Tour Operator
 * - Used for visual storytelling on accommodation and destination pages
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module Gallery
 * @category blocks/tour-operator
 */

import React from 'react';
import './Gallery.css';

/**
 * Gallery image interface.
 */
export interface GalleryImage {
  /** Image ID */
  id: string | number;
  
  /** Image URL */
  url: string;
  
  /** Alt text for accessibility */
  alt: string;
  
  /** Optional caption */
  caption?: string;
}

/**
 * Gallery props.
 */
export interface GalleryProps {
  /** Array of images to display */
  images: GalleryImage[];
  
  /** Number of columns in the gallery (2, 3, or 4) */
  columns?: 2 | 3 | 4;
  
  /** Whether to crop images to uniform sizes */
  crop?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Gallery Block component.
 * 
 * Displays a grid of images with consistent styling.
 * Column count is mapped to predefined CSS classes (no inline styles).
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <Gallery
 *   images={[
 *     { id: 1, url: '/image1.jpg', alt: 'Room view' },
 *     { id: 2, url: '/image2.jpg', alt: 'Pool area' }
 *   ]}
 *   columns={3}
 *   crop={true}
 * />
 * ```
 * 
 * @param {GalleryProps} props - Component props
 * @returns {JSX.Element} Rendered gallery block
 */
export function Gallery({
  images,
  columns = 3,
  crop = true,
  className = '',
}: GalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const colsClass = `lsx-gallery--cols-${columns}`;

  return (
    <div
      className={`lsx-gallery ${colsClass} ${className}`}
      role="list"
      aria-label="Image gallery"
    >
      {images.map((image) => (
        <figure
          key={image.id}
          className="lsx-gallery__item"
          role="listitem"
        >
          <img
            src={image.url}
            alt={image.alt}
            className={`lsx-gallery__image ${crop ? 'lsx-gallery__image--cover' : 'lsx-gallery__image--contain'}`}
            loading="lazy"
          />
          {image.caption && (
            <figcaption className="lsx-gallery__caption">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

Gallery.displayName = 'Gallery';