/**
 * useLazyLoad Hook
 * 
 * React hook for lazy loading components, images, and data
 * with Intersection Observer support.
 * 
 * @module useLazyLoad
 * @category hooks
 */

import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * Lazy load options.
 */
export interface UseLazyLoadOptions {
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Intersection threshold */
  threshold?: number;
  /** Load only once */
  once?: boolean;
  /** Enable lazy loading */
  enabled?: boolean;
  /** Callback when intersecting */
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

/**
 * Lazy load return value.
 */
export interface UseLazyLoadReturn {
  /** Reference to attach to element */
  ref: RefObject<HTMLElement>;
  /** Whether element is in view */
  inView: boolean;
  /** Whether element has been seen */
  hasBeenSeen: boolean;
}

/**
 * useLazyLoad Hook
 * 
 * Lazy load elements when they enter the viewport.
 * 
 * @param options - Lazy load options
 * @returns Lazy load state and ref
 * 
 * @example
 * ```tsx
 * function LazyImage({ src, alt }: { src: string; alt: string }) {
 *   const { ref, inView } = useLazyLoad({
 *     rootMargin: '50px',
 *     threshold: 0.1,
 *   });
 * 
 *   return (
 *     <div ref={ref as any}>
 *       {inView ? (
 *         <img src={src} alt={alt} />
 *       ) : (
 *         <div className="placeholder" />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useLazyLoad(
  options: UseLazyLoadOptions = {}
): UseLazyLoadReturn {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    once = true,
    enabled = true,
    onIntersect,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;

          setInView(isIntersecting);

          if (isIntersecting) {
            setHasBeenSeen(true);
            onIntersect?.(entry);

            if (once) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, once, enabled, onIntersect]);

  return { ref, inView, hasBeenSeen };
}

/**
 * useLazyImage Hook
 * 
 * Lazy load image when it enters viewport.
 * 
 * @param src - Image source
 * @param options - Lazy load options
 * @returns Image state and ref
 * 
 * @example
 * ```tsx
 * function TourImage({ src, alt }: { src: string; alt: string }) {
 *   const { ref, loaded, imageSrc } = useLazyImage(src, {
 *     placeholder: '/placeholder.jpg',
 *   });
 * 
 *   return (
 *     <img
 *       ref={ref as any}
 *       src={imageSrc}
 *       alt={alt}
 *       className={loaded ? 'loaded' : 'loading'}
 *     />
 *   );
 * }
 * ```
 */
export function useLazyImage(
  src: string,
  options: UseLazyLoadOptions & { placeholder?: string } = {}
): {
  ref: RefObject<HTMLImageElement>;
  loaded: boolean;
  imageSrc: string;
} {
  const { placeholder, ...lazyOptions } = options;
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder || '');

  const { inView } = useLazyLoad({
    ...lazyOptions,
    onIntersect: () => {
      if (src) {
        setImageSrc(src);
      }
    },
  });

  useEffect(() => {
    if (!imgRef.current || !inView) return;

    const img = imgRef.current;

    const handleLoad = () => {
      setLoaded(true);
    };

    if (img.complete) {
      setLoaded(true);
    } else {
      img.addEventListener('load', handleLoad);
    }

    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [inView]);

  return {
    ref: imgRef,
    loaded,
    imageSrc,
  };
}

/**
 * useLazyComponent Hook
 * 
 * Lazy load React component when it enters viewport.
 * 
 * @param importFn - Dynamic import function
 * @param options - Lazy load options
 * @returns Component loading state and ref
 * 
 * @example
 * ```tsx
 * function LazySection() {
 *   const { ref, Component, loading } = useLazyComponent(
 *     () => import('./HeavyComponent'),
 *     { rootMargin: '100px' }
 *   );
 * 
 *   return (
 *     <div ref={ref as any}>
 *       {loading ? <Loading /> : Component && <Component />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useLazyComponent<T = any>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options: UseLazyLoadOptions = {}
): {
  ref: RefObject<HTMLElement>;
  Component: React.ComponentType<T> | null;
  loading: boolean;
} {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useLazyLoad({
    ...options,
    once: true,
  });

  useEffect(() => {
    if (!inView || Component || loading) return;

    setLoading(true);

    importFn()
      .then((module) => {
        setComponent(() => module.default);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load component:', error);
        setLoading(false);
      });
  }, [inView, Component, loading, importFn]);

  return { ref, Component, loading };
}

/**
 * useLazyData Hook
 * 
 * Lazy fetch data when element enters viewport.
 * 
 * @param fetchFn - Data fetching function
 * @param options - Lazy load options
 * @returns Data loading state and ref
 * 
 * @example
 * ```tsx
 * function TourList() {
 *   const { ref, data, loading, error } = useLazyData(
 *     () => fetch('/api/tours').then(r => r.json()),
 *     { rootMargin: '200px' }
 *   );
 * 
 *   return (
 *     <div ref={ref as any}>
 *       {loading && <Loading />}
 *       {error && <Error message={error.message} />}
 *       {data && <TourGrid tours={data} />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useLazyData<T = any>(
  fetchFn: () => Promise<T>,
  options: UseLazyLoadOptions = {}
): {
  ref: RefObject<HTMLElement>;
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { ref, inView } = useLazyLoad({
    ...options,
    once: true,
  });

  useEffect(() => {
    if (!inView || data || loading) return;

    setLoading(true);
    setError(null);

    fetchFn()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [inView, data, loading, fetchFn]);

  return { ref, data, loading, error };
}

/**
 * useIntersectionObserver Hook
 * 
 * Low-level intersection observer hook.
 * 
 * @param options - Observer options
 * @returns Observer state and ref
 * 
 * @example
 * ```tsx
 * function VisibilityTracker() {
 *   const { ref, entry, isIntersecting } = useIntersectionObserver({
 *     threshold: 0.5,
 *   });
 * 
 *   useEffect(() => {
 *     if (isIntersecting) {
 *       console.log('Element is 50% visible');
 *     }
 *   }, [isIntersecting]);
 * 
 *   return <div ref={ref as any}>Track me</div>;
 * }
 * ```
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): {
  ref: RefObject<HTMLElement>;
  entry: IntersectionObserverEntry | null;
  isIntersecting: boolean;
} {
  const ref = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setEntry(entries[0]);
      },
      options
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return {
    ref,
    entry,
    isIntersecting: entry?.isIntersecting ?? false,
  };
}

/**
 * useViewportVisibility Hook
 * 
 * Track element visibility in viewport with percentage.
 * 
 * @param options - Visibility options
 * @returns Visibility state and ref
 * 
 * @example
 * ```tsx
 * function AnimatedSection() {
 *   const { ref, visibility, isVisible } = useViewportVisibility({
 *     threshold: [0, 0.25, 0.5, 0.75, 1],
 *   });
 * 
 *   return (
 *     <div
 *       ref={ref as any}
 *       style={{
 *         opacity: visibility,
 *         transform: \`translateY(\${(1 - visibility) * 50}px)\`,
 *       }}
 *     >
 *       Animated content
 *     </div>
 *   );
 * }
 * ```
 */
export function useViewportVisibility(
  options: IntersectionObserverInit = {}
): {
  ref: RefObject<HTMLElement>;
  visibility: number;
  isVisible: boolean;
} {
  const { entry, ref, isIntersecting } = useIntersectionObserver(options);
  const visibility = entry?.intersectionRatio ?? 0;

  return {
    ref,
    visibility,
    isVisible: isIntersecting,
  };
}
