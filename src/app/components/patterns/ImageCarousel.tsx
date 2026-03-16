/**
 * Image Carousel Pattern Component
 * 
 * Slideshow/carousel for cycling through images with navigation controls.
 * Auto-play support and keyboard navigation.
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Noto Sans for captions
 * - Colors: Semantic tokens (background, foreground, primary, border)
 * - Spacing: Consistent with design system
 * 
 * **Features:**
 * - Previous/next navigation
 * - Dot indicators
 * - Keyboard controls (arrows)
 * - Auto-play with configurable interval
 * - Pause on hover
 * - Swipe gestures (future)
 * - Captions
 * - Lightbox integration
 * - Responsive
 * 
 * @module ImageCarousel
 * @category patterns
 */

import { useState, useEffect, useCallback } from "react";
import { CaretLeft as ChevronLeft, CaretRight as ChevronRight, Pause, Play } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { Lightbox, LightboxImage, useLightbox } from "../common/Lightbox";

/**
 * ImageCarousel component props.
 */
interface ImageCarouselProps {
  /** Array of images to display */
  images: LightboxImage[];
  /** Auto-play interval in milliseconds (0 to disable) */
  autoPlayInterval?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showIndicators?: boolean;
  /** Show captions */
  showCaptions?: boolean;
  /** Enable lightbox on click */
  enableLightbox?: boolean;
  /** Aspect ratio */
  aspectRatio?: "auto" | "video" | "square" | "wide";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Image Carousel Pattern Component
 * 
 * @param {ImageCarouselProps} props - Component properties
 * @returns {JSX.Element} Rendered image carousel
 * 
 * @example
 * ```tsx
 * const images = [
 *   { src: "/image1.jpg", alt: "Safari", caption: "Maasai Mara Safari" },
 *   { src: "/image2.jpg", alt: "Beach", caption: "Zanzibar Beach" },
 *   { src: "/image3.jpg", alt: "Mountain", caption: "Kilimanjaro Trek" },
 * ];
 * 
 * <ImageCarousel
 *   images={images}
 *   autoPlayInterval={5000}
 *   showArrows
 *   showIndicators
 *   showCaptions
 * />
 * ```
 */
export function ImageCarousel({
  images,
  autoPlayInterval = 5000,
  showArrows = true,
  showIndicators = true,
  showCaptions = true,
  enableLightbox = false,
  aspectRatio = "video",
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlayInterval > 0);
  const [isPaused, setIsPaused] = useState(false);
  const { isOpen, currentIndex: lightboxIndex, openLightbox, closeLightbox } = useLightbox();

  /**
   * Go to previous slide.
   */
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  /**
   * Go to next slide.
   */
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  /**
   * Go to specific slide.
   */
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  /**
   * Toggle auto-play.
   */
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * Auto-play effect.
   */
  useEffect(() => {
    if (!isPlaying || isPaused || autoPlayInterval === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, autoPlayInterval, handleNext]);

  /**
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
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
  }, [handlePrevious, handleNext]);

  /**
   * Get aspect ratio class.
   */
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "video":
        return "aspect-video";
      case "square":
        return "aspect-square";
      case "wide":
        return "aspect-[21/9]";
      case "auto":
      default:
        return "";
    }
  };

  /**
   * Handle image click.
   */
  const handleImageClick = () => {
    if (enableLightbox) {
      openLightbox(currentIndex);
    }
  };

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <>
      <div
        className={cn(
          "group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted",
          getAspectRatioClass(),
          className
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Image */}
        <div className="relative h-full w-full">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-500",
              enableLightbox && "cursor-pointer"
            )}
            onClick={handleImageClick}
            loading="lazy"
          />

          {/* Overlay Gradient (for caption visibility) */}
          {showCaptions && currentImage.caption && (
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          )}
        </div>

        {/* Previous Button */}
        {showArrows && images.length > 1 && (
          <button
            onClick={handlePrevious}
            className="absolute left-[var(--spacing-element-lg)] top-1/2 -translate-y-1/2 rounded-[var(--radius-full)] bg-background/80 p-element-sm text-foreground opacity-0 transition-opacity hover:bg-background focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Button */}
        {showArrows && images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-[var(--spacing-element-lg)] top-1/2 -translate-y-1/2 rounded-[var(--radius-full)] bg-background/80 p-element-sm text-foreground opacity-0 transition-opacity hover:bg-background focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Play/Pause Button */}
        {autoPlayInterval > 0 && images.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="absolute right-[var(--spacing-element-lg)] top-[var(--spacing-element-lg)] rounded-[var(--radius-full)] bg-background/80 p-element-sm text-foreground opacity-0 transition-opacity hover:bg-background focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        )}

        {/* Caption */}
        {showCaptions && (currentImage.caption || currentImage.title) && (
          <div className="absolute inset-x-0 bottom-0 p-element-xl text-[color:var(--overlay-text)] flex flex-col gap-element-sm">
            {currentImage.title && (
              <h3 className="m-0 drop-shadow-[var(--elevation-lg)] font-[family:var(--font-family-lora)]">{currentImage.title}</h3>
            )}
            {currentImage.caption && (
              <p className="text-[length:var(--text-sm)] text-[color:var(--overlay-text)] drop-shadow-[var(--elevation-lg)] opacity-90 m-0 font-[family:var(--font-family-noto-sans)]">
                {currentImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Dot Indicators */}
        {showIndicators && images.length > 1 && (
          <div className="absolute inset-x-0 bottom-[var(--spacing-element-lg)] flex justify-center gap-fluid-sm">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-[var(--radius-full)] transition-all",
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-background/60 hover:bg-background/80"
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {enableLightbox && (
        <Lightbox
          images={images}
          isOpen={isOpen}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
          showNavigation
          showCounter
          showCaption
        />
      )}
    </>
  );
}

/**
 * ThumbnailCarousel Component
 * 
 * Carousel with thumbnail navigation below main image.
 * 
 * @example
 * ```tsx
 * <ThumbnailCarousel images={images} />
 * ```
 */
export function ThumbnailCarousel({
  images,
  showCaptions = false,
  enableLightbox = true,
  className,
}: {
  images: LightboxImage[];
  showCaptions?: boolean;
  enableLightbox?: boolean;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, currentIndex: lightboxIndex, openLightbox, closeLightbox } = useLightbox();

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <>
      <div className={cn("flex flex-col gap-fluid-md", className)}>
        {/* Main Image */}
        <div
          className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted"
          onClick={() => enableLightbox && openLightbox(currentIndex)}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={cn(
              "h-full w-full object-cover",
              enableLightbox && "cursor-pointer"
            )}
            loading="lazy"
          />
          {showCaptions && currentImage.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-element-lg">
              <p className="text-[length:var(--text-sm)] text-[color:var(--overlay-text)] drop-shadow-[var(--elevation-lg)] m-0 font-[family:var(--font-family-noto-sans)]">
                {currentImage.caption}
              </p>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-fluid-sm md:grid-cols-6 lg:grid-cols-8">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "aspect-square overflow-hidden rounded-[var(--radius-md)] border-2 transition-all hover:opacity-100",
                index === currentIndex
                  ? "border-primary opacity-100"
                  : "border-border opacity-60"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {enableLightbox && (
        <Lightbox
          images={images}
          isOpen={isOpen}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
          showNavigation
          showCounter
          showCaption
        />
      )}
    </>
  );
}

export default ImageCarousel;