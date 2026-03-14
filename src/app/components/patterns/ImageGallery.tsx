/**
 * Image Gallery Pattern Component
 * 
 * Displays a grid of images with lightbox integration.
 * Supports multiple layout styles (grid, masonry, carousel).
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Noto Sans for captions
 * - Colors: Semantic tokens (background, foreground, border)
 * - Spacing: Fluid spacing with gap utilities
 * 
 * **Features:**
 * - Multiple layout modes (grid, masonry, carousel)
 * - Lightbox integration
 * - Lazy loading
 * - Responsive columns
 * - Hover effects
 * - Image captions
 * - Accessible
 * 
 * @module ImageGallery
 * @category patterns
 */

import { useState } from "react";
import { Lightbox, LightboxImage, useLightbox } from "../common/Lightbox";
import { cn } from "../../lib/utils";

/**
 * Gallery layout variants.
 */
export type GalleryLayout = "grid" | "masonry" | "carousel";

/**
 * ImageGallery component props.
 */
interface ImageGalleryProps {
  /** Array of images to display */
  images: LightboxImage[];
  /** Layout style */
  layout?: GalleryLayout;
  /** Number of columns (grid layout) */
  columns?: 2 | 3 | 4 | 5;
  /** Show image captions */
  showCaptions?: boolean;
  /** Enable lightbox on click */
  enableLightbox?: boolean;
  /** Image aspect ratio (grid layout) */
  aspectRatio?: "square" | "video" | "auto";
  /** Gap between images */
  gap?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Image Gallery Pattern Component
 * 
 * @param {ImageGalleryProps} props - Component properties
 * @returns {JSX.Element} Rendered image gallery
 * 
 * @example
 * ```tsx
 * const images = [
 *   { src: "/image1.jpg", alt: "Safari", caption: "Maasai Mara" },
 *   { src: "/image2.jpg", alt: "Beach", caption: "Zanzibar Coast" },
 * ];
 * 
 * <ImageGallery
 *   images={images}
 *   layout="grid"
 *   columns={3}
 *   enableLightbox
 *   showCaptions
 * />
 * ```
 */
export function ImageGallery({
  images,
  layout = "grid",
  columns = 3,
  showCaptions = true,
  enableLightbox = true,
  aspectRatio = "auto",
  gap = "md",
  className,
}: ImageGalleryProps) {
  const { isOpen, currentIndex, openLightbox, closeLightbox } = useLightbox();

  /**
   * Handle image click.
   */
  const handleImageClick = (index: number) => {
    if (enableLightbox) {
      openLightbox(index);
    }
  };

  /**
   * Get column class based on columns prop.
   */
  const getColumnClass = () => {
    switch (columns) {
      case 2:
        return "sm:grid-cols-2";
      case 3:
        return "sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 5:
        return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      default:
        return "sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  /**
   * Get gap class based on gap prop.
   */
  const getGapClass = () => {
    switch (gap) {
      case "sm":
        return "gap-fluid-sm";
      case "md":
        return "gap-fluid-md";
      case "lg":
        return "gap-fluid-lg";
      default:
        return "gap-fluid-md";
    }
  };

  /**
   * Get aspect ratio class.
   */
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "auto":
      default:
        return "";
    }
  };

  // Grid Layout
  if (layout === "grid") {
    return (
      <>
        <div
          className={cn(
            "grid",
            getColumnClass(),
            getGapClass(),
            className
          )}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted transition-all hover:shadow-[var(--elevation-lg)]"
              onClick={() => handleImageClick(index)}
              role={enableLightbox ? "button" : undefined}
              tabIndex={enableLightbox ? 0 : undefined}
              onKeyDown={(e) => {
                if (enableLightbox && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handleImageClick(index);
                }
              }}
            >
              <div className={cn("relative", getAspectRatioClass())}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-300",
                    enableLightbox && "cursor-pointer group-hover:scale-105"
                  )}
                />
                {enableLightbox && (
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                )}
              </div>
              {showCaptions && (image.caption || image.title) && (
                <div className="p-element-sm flex flex-col gap-element-xs">
                  {image.title && (
                    <p className="font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)] m-0">
                      {image.title}
                    </p>
                  )}
                  {image.caption && (
                    <p className="text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)] text-[color:var(--color-muted-foreground)] m-0">
                      {image.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {enableLightbox && (
          <Lightbox
            images={images}
            isOpen={isOpen}
            initialIndex={currentIndex}
            onClose={closeLightbox}
            showNavigation
            showCounter
            showCaption
          />
        )}
      </>
    );
  }

  // Masonry Layout
  if (layout === "masonry") {
    return (
      <>
        <div
          className={cn(
            "columns-1 sm:columns-2 lg:columns-3",
            getGapClass(),
            className
          )}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative pb-element-md break-inside-avoid overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-muted)] transition-all hover:shadow-[var(--elevation-lg)]"
              onClick={() => handleImageClick(index)}
              role={enableLightbox ? "button" : undefined}
              tabIndex={enableLightbox ? 0 : undefined}
              onKeyDown={(e) => {
                if (enableLightbox && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handleImageClick(index);
                }
              }}
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={cn(
                    "w-full transition-transform duration-300",
                    enableLightbox && "cursor-pointer group-hover:scale-105"
                  )}
                />
                {enableLightbox && (
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                )}
              </div>
              {showCaptions && (image.caption || image.title) && (
                <div className="p-element-sm flex flex-col gap-element-xs">
                  {image.title && (
                    <p className="font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)] m-0">
                      {image.title}
                    </p>
                  )}
                  {image.caption && (
                    <p className="text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)] text-[color:var(--color-muted-foreground)] m-0">
                      {image.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {enableLightbox && (
          <Lightbox
            images={images}
            isOpen={isOpen}
            initialIndex={currentIndex}
            onClose={closeLightbox}
            showNavigation
            showCounter
            showCaption
          />
        )}
      </>
    );
  }

  // Carousel Layout (Future Enhancement)
  if (layout === "carousel") {
    return (
      <div className={cn("relative", className)}>
        <p className="text-muted-foreground m-0">
          Carousel layout coming soon. Use grid or masonry for now.
        </p>
      </div>
    );
  }

  return null;
}

/**
 * GallerySection Component
 * 
 * Pre-composed gallery pattern with heading and description.
 * Ready to use in page templates.
 * 
 * @example
 * ```tsx
 * <GallerySection
 *   title="Tour Gallery"
 *   description="Explore the beauty of our destinations"
 *   images={images}
 *   layout="grid"
 *   columns={3}
 * />
 * ```
 */
export function GallerySection({
  title,
  description,
  images,
  layout = "grid",
  columns = 3,
  showCaptions = true,
  enableLightbox = true,
  className,
}: {
  title?: string;
  description?: string;
  images: LightboxImage[];
  layout?: GalleryLayout;
  columns?: 2 | 3 | 4 | 5;
  showCaptions?: boolean;
  enableLightbox?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-fluid-lg", className)}>
      {(title || description) && (
        <div className="flex flex-col gap-fluid-sm text-center items-center">
          {title && <h2 className="text-[color:var(--color-foreground)] font-[family:var(--font-family-lora)] !m-0">{title}</h2>}
          {description && (
            <p className="max-w-2xl text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">
              {description}
            </p>
          )}
        </div>
      )}

      <ImageGallery
        images={images}
        layout={layout}
        columns={columns}
        showCaptions={showCaptions}
        enableLightbox={enableLightbox}
      />
    </div>
  );
}

export default ImageGallery;