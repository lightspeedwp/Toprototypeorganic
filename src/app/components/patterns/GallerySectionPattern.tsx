/**
 * Gallery Section Pattern Component
 * 
 * Displays a responsive grid of images with a premium lightbox experience.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState, useEffect } from 'react';
import { X, CaretLeft as ChevronLeft, CaretRight as ChevronRight, CornersOut as Maximize2 } from '@phosphor-icons/react';
import { Container } from '../common/Container';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from "motion/react";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface GallerySectionPatternProps {
  images: GalleryImage[];
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function GallerySectionPattern({ 
  images,
  title,
  description,
  columns = 4,
  className
}: GallerySectionPatternProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const gridClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <section className={cn("wp-pattern-lts-gallery has-section-padding-md", className)}>
      <Container>
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {title && (
              <h2 className="text-3xl font-bold font-serif mb-4">{title}</h2>
            )}
            {description && (
              <p className="text-muted-foreground text-lg">{description}</p>
            )}
          </div>
        )}

        {/* Thumbnail Grid */}
        <div className={cn("grid gap-4 md:gap-6", gridClasses)}>
          {images.map((image, idx) => (
            <motion.button
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => openLightbox(idx)}
              className="wp-pattern-lts-gallery__item relative aspect-square overflow-hidden rounded-2xl bg-muted group cursor-pointer border-2 border-transparent hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl"
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="p-3 rounded-full bg-background/90 backdrop-blur shadow-lg transform scale-50 group-hover:scale-100 transition-all duration-300">
                  <Maximize2 className="size-5 text-primary" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all z-50 shadow-lg"
              aria-label="Close gallery"
            >
              <X className="size-6" />
            </button>

            {/* Main Content Area */}
            <div
              className="relative max-w-7xl size-full flex flex-col items-center justify-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image with Slide Animation */}
              <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
                <motion.img
                  key={currentImage}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  src={images[currentImage].src}
                  alt={images[currentImage].alt}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />
              </div>
              
              {/* Info & Metadata */}
              <div className="text-center max-w-2xl">
                {images[currentImage].caption && (
                  <h3 className="text-2xl font-serif font-bold mb-3 italic">
                    {images[currentImage].caption}
                  </h3>
                )}
                <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-muted/50 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="text-primary">{currentImage + 1}</span>
                  <span className="opacity-30">/</span>
                  <span>{images.length} Captured Moments</span>
                </div>
              </div>

              {/* Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 size-14 flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground border-2 border-border rounded-full transition-all shadow-xl group"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 size-14 flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground border-2 border-border rounded-full transition-all shadow-xl group"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GallerySectionPattern;
