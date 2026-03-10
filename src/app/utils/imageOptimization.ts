/**
 * Image Optimization Utilities
 * 
 * Advanced image optimization, lazy loading, and responsive image handling.
 * Improves page load performance and reduces bandwidth usage.
 * 
 * @module imageOptimization
 * @category utils
 */

/**
 * Image format type.
 */
export type ImageFormat = 'webp' | 'avif' | 'jpg' | 'png' | 'svg';

/**
 * Image size breakpoint.
 */
export interface ImageBreakpoint {
  width: number;
  descriptor?: string;
}

/**
 * Responsive image configuration.
 */
export interface ResponsiveImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  breakpoints?: ImageBreakpoint[];
  formats?: ImageFormat[];
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
}

/**
 * Image optimization options.
 */
export interface ImageOptimizationOptions {
  quality?: number;
  format?: ImageFormat;
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Lazy load configuration.
 */
export interface LazyLoadConfig {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

/**
 * Generate srcset string for responsive images.
 * 
 * @param src - Base image source
 * @param breakpoints - Array of image breakpoints
 * @returns srcset string
 * 
 * @example
 * ```tsx
 * const srcset = generateSrcSet('/images/hero.jpg', [
 *   { width: 640, descriptor: '640w' },
 *   { width: 1024, descriptor: '1024w' },
 *   { width: 1920, descriptor: '1920w' },
 * ]);
 * 
 * <img src="/images/hero.jpg" srcSet={srcset} />
 * ```
 */
export function generateSrcSet(
  src: string,
  breakpoints: ImageBreakpoint[]
): string {
  return breakpoints
    .map(({ width, descriptor }) => {
      const imageSrc = getOptimizedImageUrl(src, { width });
      return `${imageSrc} ${descriptor || `${width}w`}`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images.
 * 
 * @param breakpoints - Array of image breakpoints
 * @returns sizes string
 * 
 * @example
 * ```tsx
 * const sizes = generateSizes([
 *   { width: 640, descriptor: '(max-width: 640px) 100vw' },
 *   { width: 1024, descriptor: '(max-width: 1024px) 50vw' },
 *   { width: 1920, descriptor: '33vw' },
 * ]);
 * ```
 */
export function generateSizes(breakpoints: ImageBreakpoint[]): string {
  return breakpoints
    .map(({ descriptor }) => descriptor)
    .filter(Boolean)
    .join(', ');
}

/**
 * Get optimized image URL with query parameters.
 * 
 * @param src - Original image source
 * @param options - Optimization options
 * @returns Optimized image URL
 * 
 * @example
 * ```tsx
 * const optimizedUrl = getOptimizedImageUrl('/images/tour.jpg', {
 *   width: 800,
 *   quality: 80,
 *   format: 'webp',
 * });
 * ```
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const {
    quality = 80,
    format,
    width,
    height,
    fit = 'cover',
    position = 'center',
  } = options;

  // If it's an external URL or data URI, return as-is
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }

  // Build query parameters
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality) params.append('q', quality.toString());
  if (format) params.append('fm', format);
  if (fit) params.append('fit', fit);
  if (position) params.append('pos', position);

  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

/**
 * Calculate aspect ratio from dimensions.
 * 
 * @param width - Image width
 * @param height - Image height
 * @returns Aspect ratio (width/height)
 * 
 * @example
 * ```tsx
 * const ratio = calculateAspectRatio(1920, 1080); // 1.777...
 * ```
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Get responsive image breakpoints.
 * 
 * @returns Array of standard breakpoints
 * 
 * @example
 * ```tsx
 * const breakpoints = getResponsiveBreakpoints();
 * // [{ width: 640 }, { width: 768 }, { width: 1024 }, { width: 1280 }, { width: 1920 }]
 * ```
 */
export function getResponsiveBreakpoints(): ImageBreakpoint[] {
  return [
    { width: 640, descriptor: '640w' },
    { width: 768, descriptor: '768w' },
    { width: 1024, descriptor: '1024w' },
    { width: 1280, descriptor: '1280w' },
    { width: 1920, descriptor: '1920w' },
  ];
}

/**
 * Preload critical images.
 * 
 * @param images - Array of image URLs to preload
 * @param options - Preload options
 * 
 * @example
 * ```tsx
 * preloadImages([
 *   '/images/hero.jpg',
 *   '/images/logo.png',
 * ], { as: 'image', fetchPriority: 'high' });
 * ```
 */
export function preloadImages(
  images: string[],
  options: { as?: string; fetchPriority?: 'high' | 'low' | 'auto' } = {}
): void {
  const { as = 'image', fetchPriority = 'high' } = options;

  images.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    if (fetchPriority) {
      link.setAttribute('fetchpriority', fetchPriority);
    }
    document.head.appendChild(link);
  });
}

/**
 * Lazy load image with Intersection Observer.
 * 
 * @param element - Image element to lazy load
 * @param config - Lazy load configuration
 * @returns Cleanup function
 * 
 * @example
 * ```tsx
 * const cleanup = lazyLoadImage(imgElement, {
 *   rootMargin: '50px',
 *   threshold: 0.1,
 *   once: true,
 * });
 * ```
 */
export function lazyLoadImage(
  element: HTMLImageElement,
  config: LazyLoadConfig = {}
): () => void {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    once = true,
    onIntersect,
  } = config;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Load the image
          const dataSrc = img.getAttribute('data-src');
          const dataSrcSet = img.getAttribute('data-srcset');
          
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
          }
          
          if (dataSrcSet) {
            img.srcset = dataSrcSet;
            img.removeAttribute('data-srcset');
          }

          // Call custom callback
          onIntersect?.(entry);

          // Unobserve if once
          if (once) {
            observer.unobserve(img);
          }
        }
      });
    },
    { rootMargin, threshold }
  );

  observer.observe(element);

  // Return cleanup function
  return () => observer.disconnect();
}

/**
 * Batch lazy load multiple images.
 * 
 * @param selector - CSS selector for images
 * @param config - Lazy load configuration
 * @returns Cleanup function
 * 
 * @example
 * ```tsx
 * const cleanup = lazyLoadImages('img[data-src]', {
 *   rootMargin: '100px',
 * });
 * ```
 */
export function lazyLoadImages(
  selector: string,
  config: LazyLoadConfig = {}
): () => void {
  const images = document.querySelectorAll<HTMLImageElement>(selector);
  const cleanupFunctions: Array<() => void> = [];

  images.forEach((img) => {
    const cleanup = lazyLoadImage(img, config);
    cleanupFunctions.push(cleanup);
  });

  return () => cleanupFunctions.forEach((fn) => fn());
}

/**
 * Get image dimensions from URL.
 * 
 * @param src - Image source URL
 * @returns Promise with width and height
 * 
 * @example
 * ```tsx
 * const { width, height } = await getImageDimensions('/images/hero.jpg');
 * console.log(`Image is ${width}x${height}`);
 * ```
 */
export function getImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });
}

/**
 * Create blur placeholder data URL.
 * 
 * @param width - Placeholder width
 * @param height - Placeholder height
 * @param color - Placeholder color (hex)
 * @returns Data URL
 * 
 * @example
 * ```tsx
 * const placeholder = createBlurPlaceholder(1920, 1080, '#e5e7eb');
 * <img src={image} style={{ backgroundImage: `url(${placeholder})` }} />
 * ```
 */
export function createBlurPlaceholder(
  width: number,
  height: number,
  color: string = '#e5e7eb'
): string {
  // Create tiny canvas for blur effect
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Fill with color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

/**
 * Estimate image file size.
 * 
 * @param width - Image width
 * @param height - Image height
 * @param format - Image format
 * @param quality - Compression quality (0-100)
 * @returns Estimated size in bytes
 * 
 * @example
 * ```tsx
 * const size = estimateImageSize(1920, 1080, 'webp', 80);
 * console.log(`Estimated size: ${(size / 1024).toFixed(2)}KB`);
 * ```
 */
export function estimateImageSize(
  width: number,
  height: number,
  format: ImageFormat,
  quality: number = 80
): number {
  const pixels = width * height;
  
  // Rough estimates based on format and quality
  const bytesPerPixel: Record<ImageFormat, number> = {
    webp: 0.1 * (quality / 100),
    avif: 0.08 * (quality / 100),
    jpg: 0.15 * (quality / 100),
    png: 1.5, // PNG is lossless
    svg: 0.05, // SVG is vector (estimate)
  };
  
  return Math.round(pixels * (bytesPerPixel[format] || 0.15));
}

/**
 * Get optimal image format based on browser support.
 * 
 * @returns Optimal format
 * 
 * @example
 * ```tsx
 * const format = getOptimalImageFormat();
 * const url = getOptimizedImageUrl(src, { format });
 * ```
 */
export function getOptimalImageFormat(): ImageFormat {
  // Check for AVIF support
  if (supportsImageFormat('avif')) {
    return 'avif';
  }
  
  // Check for WebP support
  if (supportsImageFormat('webp')) {
    return 'webp';
  }
  
  // Fallback to JPG
  return 'jpg';
}

/**
 * Check if browser supports image format.
 * 
 * @param format - Image format to check
 * @returns True if supported
 * 
 * @example
 * ```tsx
 * if (supportsImageFormat('avif')) {
 *   // Use AVIF
 * } else if (supportsImageFormat('webp')) {
 *   // Use WebP
 * }
 * ```
 */
export function supportsImageFormat(format: ImageFormat): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  const mimeTypes: Record<string, string> = {
    webp: 'image/webp',
    avif: 'image/avif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
  };
  
  return canvas.toDataURL(mimeTypes[format]).indexOf(`data:${mimeTypes[format]}`) === 0;
}

/**
 * Convert image to WebP format.
 * 
 * @param file - Image file
 * @param quality - Compression quality (0-1)
 * @returns Promise with WebP blob
 * 
 * @example
 * ```tsx
 * const webpBlob = await convertToWebP(file, 0.8);
 * const url = URL.createObjectURL(webpBlob);
 * ```
 */
export async function convertToWebP(
  file: File,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        },
        'image/webp',
        quality
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Performance metrics for image loading.
 */
export interface ImageLoadMetrics {
  src: string;
  loadTime: number;
  fileSize?: number;
  width: number;
  height: number;
  format: string;
}

/**
 * Measure image load performance.
 * 
 * @param src - Image source
 * @returns Promise with load metrics
 * 
 * @example
 * ```tsx
 * const metrics = await measureImageLoad('/images/hero.jpg');
 * console.log(`Load time: ${metrics.loadTime}ms`);
 * ```
 */
export async function measureImageLoad(src: string): Promise<ImageLoadMetrics> {
  const startTime = performance.now();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      
      resolve({
        src,
        loadTime,
        width: img.naturalWidth,
        height: img.naturalHeight,
        format: src.split('.').pop() || 'unknown',
      });
    };
    
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}
