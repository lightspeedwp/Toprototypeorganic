import { cn } from "../../../lib/utils";

/**
 * ImageBlock - Responsive image component
 * 
 * WordPress Equivalent: core/image
 * 
 * Features:
 * - Responsive images with aspect ratio control
 * - Optional captions with design system styling
 * - Border radius from CSS variables
 */

export interface ImageBlockProps {
  /** Image source URL */
  src: string;
  
  /** Alt text (required for accessibility) */
  alt: string;
  
  /** Optional caption */
  caption?: string;
  
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'full';
  
  /** Aspect ratio */
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  
  /** Optional custom classes */
  className?: string;
}

export function ImageBlock({ 
  src, 
  alt, 
  caption, 
  size = 'full',
  aspectRatio = 'auto',
  className 
}: ImageBlockProps) {
  const aspectRatioClass = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    'auto': ''
  }[aspectRatio];

  return (
    <figure className={cn("pb-element-md", className)}>
      <img 
        src={src} 
        alt={alt}
        className={cn(
          "w-full h-auto object-cover",
          "rounded-lg",  // Uses var(--radius-lg) from theme.css
          aspectRatioClass
        )}
      />
      {caption && (
        <figcaption className="text-[length:var(--text-sm)] text-muted-foreground pt-element-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}