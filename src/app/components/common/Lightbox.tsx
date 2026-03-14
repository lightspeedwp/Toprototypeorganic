/**
 * Lightbox Component
 * 
 * Full-screen image viewer with navigation, zoom, and keyboard controls.
 * Displays images in an overlay modal with previous/next navigation.
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Noto Sans for captions
 * - Colors: Semantic tokens (background, foreground, border)
 * - Spacing: Consistent with design system
 * 
 * **Features:**
 * - Full-screen overlay
 * - Previous/next navigation
 * - Keyboard controls (arrows, escape)
 * - Image captions
 * - Close button
 * - Click outside to close
 * - Loading states
 * - Responsive design
 * - Touch gestures (future)
 * 
 * @module Lightbox
 * @category common
 */

import { useState, useEffect, useCallback } from "react";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Image data structure.
 */
export interface LightboxImage {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption */
  caption?: string;
  /** Optional title */
  title?: string;
}

/**
 * Lightbox component props.
 */
interface LightboxProps {
  /** Array of images to display */
  images: LightboxImage[];
  /** Index of initially selected image */
  initialIndex?: number;
  /** Whether lightbox is open */
  isOpen: boolean;
  /** Callback when lightbox closes */
  onClose: () => void;
  /** Show navigation arrows */
  showNavigation?: boolean;
  /** Show image counter (1 of 10) */
  showCounter?: boolean;
  /** Show captions */
  showCaption?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Lightbox Component
 * 
 * @param {LightboxProps} props - Component properties
 * @returns {JSX.Element | null} Rendered lightbox or null if closed
 * 
 * @example
 * ```tsx
 * const images = [
 *   { src: "/image1.jpg", alt: "Image 1", caption: "Beautiful sunset" },
 *   { src: "/image2.jpg", alt: "Image 2", caption: "Mountain view" },
 * ];
 * 
 * <Lightbox
 *   images={images}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   showNavigation
 *   showCaption
 * />
 * ```
 */
export function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  showNavigation = true,
  showCounter = true,
  showCaption = true,
  className,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  // Update current index when initial index changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Reset loading state when image changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [currentIndex, isOpen]);

  /**
   * Go to previous image.
   */
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  /**
   * Go to next image.
   */
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  /**
   * Handle keyboard navigation.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);

  /**
   * Prevent body scroll when lightbox is open.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /**
   * Handle backdrop click to close.
   */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * Handle image load.
   */
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm",
        className
      )}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-[var(--radius-full)] bg-background/80 p-element-xs text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      {showCounter && images.length > 1 && (
        <div className="absolute left-4 top-4 z-10 rounded-[var(--radius-full)] bg-background/80 px-element-md py-element-sm text-[length:var(--text-sm)] text-foreground">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Previous Button */}
      {showNavigation && images.length > 1 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-[var(--radius-full)] bg-background/80 p-element-sm text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Previous image"
        >
          <CaretLeft size={32} />
        </button>
      )}

      {/* Next Button */}
      {showNavigation && images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-[var(--radius-full)] bg-background/80 p-element-sm text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Next image"
        >
          <CaretRight size={32} />
        </button>
      )}

      {/* Image Container */}
      <div className="relative flex h-full w-full flex-col items-center justify-center p-element-md md:p-element-xl">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-[var(--radius-full)] border-4 border-primary border-t-transparent" />
          </div>
        )}

        {/* Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          onLoad={handleImageLoad}
          className={cn(
            "max-h-[calc(100vh-200px)] max-w-full object-contain transition-opacity",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Caption */}
        {showCaption && (currentImage.caption || currentImage.title) && (
          <div className="pt-element-md max-w-3xl rounded-[var(--radius-lg)] bg-[color:var(--color-background)]/80 p-element-md text-center">
            {currentImage.title && (
              <h3 className="pb-element-sm text-[color:var(--color-foreground)]">{currentImage.title}</h3>
            )}
            {currentImage.caption && (
              <p className="text-muted-foreground">{currentImage.caption}</p>
            )}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation (Optional - Future Enhancement) */}
      {/* Could add thumbnail strip at bottom for quick navigation */}
    </div>
  );
}

/**
 * useLightbox Hook
 * 
 * Custom hook for managing lightbox state.
 * Provides convenient open/close methods.
 * 
 * @returns Lightbox state and control methods
 * 
 * @example
 * ```tsx
 * const { isOpen, currentIndex, openLightbox, closeLightbox } = useLightbox();
 * 
 * <button onClick={() => openLightbox(0)}>View Image</button>
 * 
 * <Lightbox
 *   images={images}
 *   isOpen={isOpen}
 *   initialIndex={currentIndex}
 *   onClose={closeLightbox}
 * />
 * ```
 */
export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
  };
}

export default Lightbox;