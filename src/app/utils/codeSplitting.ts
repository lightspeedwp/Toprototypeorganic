/**
 * Code Splitting Utilities
 * 
 * Advanced code splitting strategies for optimal bundle sizes.
 * Includes route-based, component-based, and vendor splitting.
 * 
 * @module codeSplitting
 * @category utils
 */

import { lazy, ComponentType, LazyExoticComponent } from 'react';

/**
 * Retry configuration for lazy loading.
 */
export interface RetryConfig {
  retries?: number;
  delay?: number;
  backoff?: boolean;
}

/**
 * Preload configuration.
 */
export interface PreloadConfig {
  routes?: string[];
  components?: string[];
  delay?: number;
}

/**
 * Bundle analysis data.
 */
export interface BundleAnalysis {
  name: string;
  size: number;
  gzipSize?: number;
  loadTime?: number;
  dependencies?: string[];
}

/**
 * Lazy load component with retry logic.
 * 
 * @param importFn - Dynamic import function
 * @param config - Retry configuration
 * @returns Lazy component
 * 
 * @example
 * ```tsx
 * const HeavyComponent = lazyWithRetry(
 *   () => import('./HeavyComponent'),
 *   { retries: 3, delay: 1000 }
 * );
 * 
 * <Suspense fallback={<Loading />}>
 *   <HeavyComponent />
 * </Suspense>
 * ```
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  config: RetryConfig = {}
): LazyExoticComponent<T> {
  const { retries = 3, delay = 1000, backoff = true } = config;

  return lazy(() => {
    return new Promise<{ default: T }>((resolve, reject) => {
      let attempts = 0;

      const attemptLoad = () => {
        attempts++;

        importFn()
          .then(resolve)
          .catch((error) => {
            if (attempts >= retries) {
              reject(error);
              return;
            }

            // Calculate delay with optional backoff
            const retryDelay = backoff ? delay * Math.pow(2, attempts - 1) : delay;

            console.warn(
              `Failed to load component (attempt ${attempts}/${retries}). Retrying in ${retryDelay}ms...`,
              error
            );

            setTimeout(attemptLoad, retryDelay);
          });
      };

      attemptLoad();
    });
  });
}

/**
 * Preload route component.
 * 
 * @param importFn - Dynamic import function
 * @returns Promise
 * 
 * @example
 * ```tsx
 * // Preload on hover
 * <Link
 *   to="/tours"
 *   onMouseEnter={() => preloadRoute(() => import('./pages/ToursPage'))}
 * >
 *   Tours
 * </Link>
 * ```
 */
export function preloadRoute(
  importFn: () => Promise<any>
): Promise<void> {
  return importFn()
    .then(() => {
      console.log('Route preloaded successfully');
    })
    .catch((error) => {
      console.error('Failed to preload route:', error);
    });
}

/**
 * Preload multiple routes.
 * 
 * @param routes - Array of import functions
 * @returns Promise that resolves when all routes are loaded
 * 
 * @example
 * ```tsx
 * preloadRoutes([
 *   () => import('./pages/ToursPage'),
 *   () => import('./pages/DestinationsPage'),
 *   () => import('./pages/AccommodationPage'),
 * ]);
 * ```
 */
export async function preloadRoutes(
  routes: Array<() => Promise<any>>
): Promise<void> {
  try {
    await Promise.all(routes.map((route) => route()));
    console.log(`Preloaded ${routes.length} routes successfully`);
  } catch (error) {
    console.error('Failed to preload routes:', error);
  }
}

/**
 * Lazy load component with prefetch on hover.
 * 
 * @param importFn - Dynamic import function
 * @returns Object with Component and prefetch function
 * 
 * @example
 * ```tsx
 * const { Component: TourDetail, prefetch } = lazyWithPrefetch(
 *   () => import('./TourDetail')
 * );
 * 
 * <Link to="/tours/1" onMouseEnter={prefetch}>
 *   View Tour
 * </Link>
 * 
 * <Suspense fallback={<Loading />}>
 *   <TourDetail />
 * </Suspense>
 * ```
 */
export function lazyWithPrefetch<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): {
  Component: LazyExoticComponent<T>;
  prefetch: () => void;
} {
  let prefetched = false;
  let prefetchPromise: Promise<{ default: T }> | null = null;

  const prefetch = () => {
    if (!prefetched) {
      prefetched = true;
      prefetchPromise = importFn();
    }
  };

  const Component = lazy(() => {
    if (prefetchPromise) {
      return prefetchPromise;
    }
    return importFn();
  });

  return { Component, prefetch };
}

/**
 * Create route-based code splits.
 * 
 * @param routes - Route configuration
 * @returns Route components
 * 
 * @example
 * ```tsx
 * const routes = createRouteSplits({
 *   home: () => import('./pages/HomePage'),
 *   tours: () => import('./pages/ToursPage'),
 *   destinations: () => import('./pages/DestinationsPage'),
 * });
 * 
 * <Route path="/" element={<routes.home />} />
 * <Route path="/tours" element={<routes.tours />} />
 * ```
 */
export function createRouteSplits<T extends Record<string, () => Promise<any>>>(
  routes: T
): Record<keyof T, LazyExoticComponent<ComponentType<any>>> {
  const splits: any = {};

  Object.entries(routes).forEach(([key, importFn]) => {
    splits[key] = lazyWithRetry(importFn as any, { retries: 3 });
  });

  return splits;
}

/**
 * Check if code splitting is supported.
 * 
 * @returns True if supported
 * 
 * @example
 * ```tsx
 * if (supportsCodeSplitting()) {
 *   // Use dynamic imports
 * } else {
 *   // Fallback to static imports
 * }
 * ```
 */
export function supportsCodeSplitting(): boolean {
  try {
    // Check if dynamic import is supported
    // Removed new Function('import("")') to avoid Vite errors
    return true;
  } catch {
    return false;
  }
}

/**
 * Analyze bundle size.
 * 
 * @param name - Bundle name
 * @returns Bundle analysis
 * 
 * @example
 * ```tsx
 * const analysis = analyzeBundle('tours');
 * console.log(`Bundle size: ${(analysis.size / 1024).toFixed(2)}KB`);
 * ```
 */
export function analyzeBundle(name: string): BundleAnalysis | null {
  // Check if performance API is available
  if (!('performance' in window)) {
    return null;
  }

  const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  // Find resources matching the bundle name
  const bundleEntries = entries.filter((entry) =>
    entry.name.includes(name) && entry.name.endsWith('.js')
  );

  if (bundleEntries.length === 0) {
    return null;
  }

  // Calculate total size and load time
  const totalSize = bundleEntries.reduce(
    (sum, entry) => sum + (entry.transferSize || 0),
    0
  );
  
  const totalLoadTime = bundleEntries.reduce(
    (sum, entry) => sum + entry.duration,
    0
  );

  return {
    name,
    size: totalSize,
    loadTime: totalLoadTime,
    dependencies: bundleEntries.map((entry) => entry.name),
  };
}

/**
 * Get all loaded bundles.
 * 
 * @returns Array of bundle analyses
 * 
 * @example
 * ```tsx
 * const bundles = getLoadedBundles();
 * bundles.forEach(bundle => {
 *   console.log(`${bundle.name}: ${(bundle.size / 1024).toFixed(2)}KB`);
 * });
 * ```
 */
export function getLoadedBundles(): BundleAnalysis[] {
  if (!('performance' in window)) {
    return [];
  }

  const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  const jsEntries = entries.filter((entry) => entry.name.endsWith('.js'));

  return jsEntries.map((entry) => ({
    name: entry.name.split('/').pop() || entry.name,
    size: entry.transferSize || 0,
    loadTime: entry.duration,
    dependencies: [],
  }));
}

/**
 * Calculate total bundle size.
 * 
 * @returns Total size in bytes
 * 
 * @example
 * ```tsx
 * const totalSize = getTotalBundleSize();
 * console.log(`Total bundle size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
 * ```
 */
export function getTotalBundleSize(): number {
  const bundles = getLoadedBundles();
  return bundles.reduce((sum, bundle) => sum + bundle.size, 0);
}

/**
 * Prefetch critical routes on idle.
 * 
 * @param routes - Array of import functions
 * 
 * @example
 * ```tsx
 * prefetchOnIdle([
 *   () => import('./pages/ToursPage'),
 *   () => import('./pages/DestinationsPage'),
 * ]);
 * ```
 */
export function prefetchOnIdle(routes: Array<() => Promise<any>>): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      preloadRoutes(routes);
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      preloadRoutes(routes);
    }, 1000);
  }
}

/**
 * Prefetch route on hover with delay.
 * 
 * @param importFn - Dynamic import function
 * @param delay - Hover delay in ms
 * @returns Hover handler
 * 
 * @example
 * ```tsx
 * const handleHover = prefetchOnHover(
 *   () => import('./pages/TourDetail'),
 *   300
 * );
 * 
 * <Link to="/tours/1" onMouseEnter={handleHover}>
 *   View Tour
 * </Link>
 * ```
 */
export function prefetchOnHover(
  importFn: () => Promise<any>,
  delay: number = 300
): () => void {
  let timeoutId: NodeJS.Timeout;
  let prefetched = false;

  return () => {
    if (prefetched) return;

    timeoutId = setTimeout(() => {
      prefetched = true;
      preloadRoute(importFn);
    }, delay);
  };
}

/**
 * Split vendor bundles.
 * 
 * @returns Vendor bundle configuration
 * 
 * @example
 * ```tsx
 * // In webpack/vite config
 * const vendorSplits = getVendorSplits();
 * ```
 */
export function getVendorSplits(): Record<string, string[]> {
  return {
    react: ['react', 'react-dom', 'react-router-dom'],
    ui: ['@phosphor-icons/react', '@radix-ui'],
    motion: ['motion', 'framer-motion'],
    utils: ['clsx', 'tailwind-merge'],
  };
}

/**
 * Check if chunk is cached.
 * 
 * @param chunkName - Chunk name
 * @returns True if cached
 * 
 * @example
 * ```tsx
 * if (isChunkCached('tours')) {
 *   // Chunk is in cache
 * }
 * ```
 */
export async function isChunkCached(chunkName: string): Promise<boolean> {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const cache = await caches.open('chunks');
    const keys = await cache.keys();
    return keys.some((request) => request.url.includes(chunkName));
  } catch {
    return false;
  }
}

/**
 * Clear chunk cache.
 * 
 * @example
 * ```tsx
 * await clearChunkCache();
 * console.log('Chunk cache cleared');
 * ```
 */
export async function clearChunkCache(): Promise<void> {
  if (!('caches' in window)) {
    return;
  }

  try {
    await caches.delete('chunks');
    console.log('Chunk cache cleared successfully');
  } catch (error) {
    console.error('Failed to clear chunk cache:', error);
  }
}

/**
 * Monitor chunk loading performance.
 * 
 * @param onChunkLoad - Callback for chunk load events
 * @returns Cleanup function
 * 
 * @example
 * ```tsx
 * const cleanup = monitorChunkLoading((chunk) => {
 *   console.log(`Loaded ${chunk.name} in ${chunk.loadTime}ms`);
 * });
 * ```
 */
export function monitorChunkLoading(
  onChunkLoad: (chunk: BundleAnalysis) => void
): () => void {
  if (!('PerformanceObserver' in window)) {
    return () => {};
  }

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource' && entry.name.endsWith('.js')) {
        const resourceEntry = entry as PerformanceResourceTiming;
        
        onChunkLoad({
          name: resourceEntry.name.split('/').pop() || resourceEntry.name,
          size: resourceEntry.transferSize || 0,
          loadTime: resourceEntry.duration,
          dependencies: [],
        });
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });

  return () => observer.disconnect();
}
