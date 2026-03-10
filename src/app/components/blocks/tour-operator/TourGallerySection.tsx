/**
 * Tour Gallery Section Block Component
 * 
 * Full gallery section with heading, responsive image grid,
 * and hover-reveal captions. Wraps the core gallery display
 * with tour-specific section semantics.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/gallery-section
 * - Category: Tour Operator
 * - Used on single tour pages
 * 
 * @module TourGallerySection
 * @category blocks/tour-operator
 */

import './TourGallerySection.css';
import { Camera } from '@phosphor-icons/react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface TourGallerySectionProps {
  /** Section title */
  title?: string;
  /** Array of gallery images */
  images: GalleryImage[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Gallery Section Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourGallerySection({
  title = 'Tour Gallery',
  images,
  className = '',
}: TourGallerySectionProps) {
  if (!images || images.length === 0) {
    return (
      <div className={`lsx-tour-gallery-section__empty ${className}`}>
        <p>Gallery images coming soon</p>
      </div>
    );
  }

  return (
    <section className={`lsx-tour-gallery-section ${className}`} aria-label={title}>
      <div className="lsx-tour-gallery-section__header">
        <Camera size={24} className="lsx-tour-gallery-section__header-icon" aria-hidden="true" />
        <h2>{title}</h2>
      </div>

      <div className="lsx-tour-gallery-section__grid" role="list" aria-label="Image gallery">
        {images.map((image) => (
          <figure key={image.id} className="lsx-tour-gallery-section__item" role="listitem">
            <img
              src={image.src}
              alt={image.alt}
              className="lsx-tour-gallery-section__image"
              loading="lazy"
            />
            {image.caption && (
              <figcaption className="lsx-tour-gallery-section__caption">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

TourGallerySection.displayName = 'TourGallerySection';
