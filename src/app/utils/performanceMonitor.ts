/**
 * Performance Monitoring Utilities
 * 
 * Provides tools for measuring and monitoring application performance,
 * including component render times, bundle sizes, and Core Web Vitals.
 * 
 * @module performanceMonitor
 * @category utils
 */

/**
 * Performance metric types for Core Web Vitals and custom metrics.
 */
export interface PerformanceMetrics {
  /** First Contentful Paint (ms) */
  fcp?: number;
  /** Largest Contentful Paint (ms) */
  lcp?: number;
  /** First Input Delay (ms) */
  fid?: number;
  /** Cumulative Layout Shift (score) */
  cls?: number;
  /** Time to Interactive (ms) */
  tti?: number;
  /** Total Blocking Time (ms) */
  tbt?: number;
  /** Custom component render time (ms) */
  renderTime?: number;
  /** Memory usage (MB) */
  memoryUsage?: number;
}

/**
 * Performance threshold configuration for alerts.
 */
interface PerformanceThresholds {
  /** FCP threshold (ms) - Good: <1800, Needs Improvement: <3000 */
  fcp: number;
  /** LCP threshold (ms) - Good: <2500, Needs Improvement: <4000 */
  lcp: number;
  /** FID threshold (ms) - Good: <100, Needs Improvement: <300 */
  fid: number;
  /** CLS threshold (score) - Good: <0.1, Needs Improvement: <0.25 */
  cls: number;
  /** TTI threshold (ms) - Good: <3800, Needs Improvement: <7300 */
  tti: number;
}

/**
 * Default performance thresholds based on Core Web Vitals.
 */
const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  fcp: 1800, // First Contentful Paint
  lcp: 2500, // Largest Contentful Paint
  fid: 100,  // First Input Delay
  cls: 0.1,  // Cumulative Layout Shift
  tti: 3800, // Time to Interactive
};

/**
 * Measures First Contentful Paint (FCP).
 * 
 * FCP measures how long it takes for the first content to be rendered on screen.
 * 
 * @returns {number | null} FCP time in milliseconds, or null if not available
 * 
 * @example
 * const fcp = measureFCP();
 * if (fcp && fcp > 1800) {
 *   console.warn('FCP is slower than recommended');
 * }
 */
export function measureFCP(): number | null {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  
  return fcpEntry ? fcpEntry.startTime : null;
}

/**
 * Measures Largest Contentful Paint (LCP).
 * 
 * LCP measures when the largest content element becomes visible.
 * 
 * @param {(value: number) => void} callback - Function to call when LCP is measured
 * 
 * @example
 * measureLCP((lcp) => {
 *   console.log('LCP:', lcp, 'ms');
 *   if (lcp > 2500) {
 *     console.warn('LCP is slower than recommended');
 *   }
 * });
 */
export function measureLCP(callback: (value: number) => void): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      const lcp = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime;
      callback(lcp);
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('Error measuring LCP:', error);
  }
}

/**
 * Measures First Input Delay (FID).
 * 
 * FID measures the delay between user interaction and browser response.
 * 
 * @param {(value: number) => void} callback - Function to call when FID is measured
 * 
 * @example
 * measureFID((fid) => {
 *   console.log('FID:', fid, 'ms');
 *   if (fid > 100) {
 *     console.warn('FID is slower than recommended');
 *   }
 * });
 */
export function measureFID(callback: (value: number) => void): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEntry & { processingStart?: number };
        if (fidEntry.processingStart) {
          const fid = fidEntry.processingStart - entry.startTime;
          callback(fid);
        }
      });
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('Error measuring FID:', error);
  }
}

/**
 * Measures Cumulative Layout Shift (CLS).
 * 
 * CLS measures visual stability by tracking unexpected layout shifts.
 * 
 * @param {(value: number) => void} callback - Function to call with CLS score
 * 
 * @example
 * measureCLS((cls) => {
 *   console.log('CLS:', cls);
 *   if (cls > 0.1) {
 *     console.warn('CLS is higher than recommended');
 *   }
 * });
 */
export function measureCLS(callback: (value: number) => void): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const layoutShiftEntry = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
        if (layoutShiftEntry.value !== undefined && !layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
          callback(clsValue);
        }
      });
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.error('Error measuring CLS:', error);
  }
}

/**
 * Measures component render time using React Profiler API.
 * 
 * @param {string} id - Component identifier
 * @param {string} phase - Render phase ('mount' or 'update')
 * @param {number} actualDuration - Time spent rendering (ms)
 * @param {number} baseDuration - Estimated time for clean render (ms)
 * @param {number} startTime - When render started
 * @param {number} commitTime - When changes were committed
 * 
 * @example
 * <Profiler id="TourCard" onRender={logRenderTime}>
 *   <TourCard tour={tour} />
 * </Profiler>
 */
export function logRenderTime(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
): void {
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Profiler] ${id} (${phase}):`, {
      actualDuration: `${actualDuration.toFixed(2)}ms`,
      baseDuration: `${baseDuration.toFixed(2)}ms`,
      startTime: `${startTime.toFixed(2)}ms`,
      commitTime: `${commitTime.toFixed(2)}ms`,
    });
  }
}

/**
 * Measures memory usage (Chrome only).
 * 
 * @returns {number | null} Memory usage in MB, or null if not available
 * 
 * @example
 * const memory = measureMemoryUsage();
 * if (memory && memory > 50) {
 *   console.warn('High memory usage:', memory, 'MB');
 * }
 */
export function measureMemoryUsage(): number | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // TypeScript doesn't know about performance.memory
  const performanceMemory = (performance as any).memory;
  
  if (performanceMemory && performanceMemory.usedJSHeapSize) {
    // Convert bytes to MB
    return Math.round(performanceMemory.usedJSHeapSize / 1024 / 1024);
  }

  return null;
}

/**
 * Collects all performance metrics.
 * 
 * @returns {Promise<PerformanceMetrics>} Object containing all available metrics
 * 
 * @example
 * const metrics = await collectPerformanceMetrics();
 * console.log('Performance Metrics:', metrics);
 */
export async function collectPerformanceMetrics(): Promise<PerformanceMetrics> {
  const metrics: PerformanceMetrics = {};

  // FCP (available immediately)
  const fcp = measureFCP();
  if (fcp) {
    metrics.fcp = fcp;
  }

  // LCP (measured via observer)
  await new Promise<void>((resolve) => {
    let resolved = false;
    measureLCP((lcp) => {
      metrics.lcp = lcp;
      if (!resolved) {
        resolved = true;
        resolve();
      }
    });
    // Timeout after 5 seconds
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    }, 5000);
  });

  // Memory usage
  const memory = measureMemoryUsage();
  if (memory) {
    metrics.memoryUsage = memory;
  }

  return metrics;
}

/**
 * Evaluates performance metrics against thresholds.
 * 
 * @param {PerformanceMetrics} metrics - Metrics to evaluate
 * @param {Partial<PerformanceThresholds>} customThresholds - Custom threshold overrides
 * @returns {Object} Evaluation results with warnings
 * 
 * @example
 * const metrics = await collectPerformanceMetrics();
 * const evaluation = evaluatePerformance(metrics);
 * console.log('Performance Score:', evaluation.score);
 * evaluation.warnings.forEach(warning => console.warn(warning));
 */
export function evaluatePerformance(
  metrics: PerformanceMetrics,
  customThresholds: Partial<PerformanceThresholds> = {}
): {
  score: number;
  warnings: string[];
  metrics: PerformanceMetrics;
} {
  const thresholds = { ...DEFAULT_THRESHOLDS, ...customThresholds };
  const warnings: string[] = [];
  let totalScore = 0;
  let metricCount = 0;

  // Evaluate FCP
  if (metrics.fcp !== undefined) {
    metricCount++;
    if (metrics.fcp <= thresholds.fcp) {
      totalScore += 100;
    } else if (metrics.fcp <= thresholds.fcp * 1.5) {
      totalScore += 50;
      warnings.push(`FCP (${metrics.fcp.toFixed(0)}ms) needs improvement. Target: <${thresholds.fcp}ms`);
    } else {
      warnings.push(`FCP (${metrics.fcp.toFixed(0)}ms) is poor. Target: <${thresholds.fcp}ms`);
    }
  }

  // Evaluate LCP
  if (metrics.lcp !== undefined) {
    metricCount++;
    if (metrics.lcp <= thresholds.lcp) {
      totalScore += 100;
    } else if (metrics.lcp <= thresholds.lcp * 1.5) {
      totalScore += 50;
      warnings.push(`LCP (${metrics.lcp.toFixed(0)}ms) needs improvement. Target: <${thresholds.lcp}ms`);
    } else {
      warnings.push(`LCP (${metrics.lcp.toFixed(0)}ms) is poor. Target: <${thresholds.lcp}ms`);
    }
  }

  // Evaluate FID
  if (metrics.fid !== undefined) {
    metricCount++;
    if (metrics.fid <= thresholds.fid) {
      totalScore += 100;
    } else if (metrics.fid <= thresholds.fid * 3) {
      totalScore += 50;
      warnings.push(`FID (${metrics.fid.toFixed(0)}ms) needs improvement. Target: <${thresholds.fid}ms`);
    } else {
      warnings.push(`FID (${metrics.fid.toFixed(0)}ms) is poor. Target: <${thresholds.fid}ms`);
    }
  }

  // Evaluate CLS
  if (metrics.cls !== undefined) {
    metricCount++;
    if (metrics.cls <= thresholds.cls) {
      totalScore += 100;
    } else if (metrics.cls <= thresholds.cls * 2.5) {
      totalScore += 50;
      warnings.push(`CLS (${metrics.cls.toFixed(3)}) needs improvement. Target: <${thresholds.cls}`);
    } else {
      warnings.push(`CLS (${metrics.cls.toFixed(3)}) is poor. Target: <${thresholds.cls}`);
    }
  }

  // Evaluate memory usage
  if (metrics.memoryUsage !== undefined) {
    if (metrics.memoryUsage > 100) {
      warnings.push(`High memory usage: ${metrics.memoryUsage}MB. Consider optimizing.`);
    } else if (metrics.memoryUsage > 50) {
      warnings.push(`Moderate memory usage: ${metrics.memoryUsage}MB.`);
    }
  }

  const score = metricCount > 0 ? Math.round(totalScore / metricCount) : 0;

  return {
    score,
    warnings,
    metrics,
  };
}

/**
 * Logs performance metrics to console (development only).
 * 
 * @example
 * // In development, call on app load
 * if (process.env.NODE_ENV === 'development') {
 *   logPerformanceMetrics();
 * }
 */
export async function logPerformanceMetrics(): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.log('📊 Collecting performance metrics...');
  
  const metrics = await collectPerformanceMetrics();
  const evaluation = evaluatePerformance(metrics);

  console.log('='.repeat(60));
  console.log('PERFORMANCE METRICS');
  console.log('='.repeat(60));
  console.log('Score:', `${evaluation.score}/100`);
  console.log('');
  console.log('Core Web Vitals:');
  if (metrics.fcp) console.log(`  FCP: ${metrics.fcp.toFixed(0)}ms (Target: <1800ms)`);
  if (metrics.lcp) console.log(`  LCP: ${metrics.lcp.toFixed(0)}ms (Target: <2500ms)`);
  if (metrics.fid) console.log(`  FID: ${metrics.fid.toFixed(0)}ms (Target: <100ms)`);
  if (metrics.cls) console.log(`  CLS: ${metrics.cls.toFixed(3)} (Target: <0.1)`);
  console.log('');
  console.log('Resource Usage:');
  if (metrics.memoryUsage) console.log(`  Memory: ${metrics.memoryUsage}MB`);
  console.log('');

  if (evaluation.warnings.length > 0) {
    console.log('⚠️  Warnings:');
    evaluation.warnings.forEach(warning => console.log(`  - ${warning}`));
  } else {
    console.log('✅ All metrics within recommended thresholds!');
  }
  console.log('='.repeat(60));
}

/**
 * Marks a custom performance measure point.
 * 
 * @param {string} name - Name of the performance mark
 * 
 * @example
 * markPerformance('tour-load-start');
 * // ... load tours
 * markPerformance('tour-load-end');
 * const duration = measurePerformance('tour-load', 'tour-load-start', 'tour-load-end');
 * console.log('Tour load time:', duration, 'ms');
 */
export function markPerformance(name: string): void {
  if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
    performance.mark(name);
  }
}

/**
 * Measures time between two performance marks.
 * 
 * @param {string} name - Name for this measurement
 * @param {string} startMark - Name of start mark
 * @param {string} endMark - Name of end mark
 * @returns {number | null} Duration in milliseconds, or null if measurement failed
 * 
 * @example
 * markPerformance('component-render-start');
 * // ... component renders
 * markPerformance('component-render-end');
 * const duration = measurePerformance('component-render', 'component-render-start', 'component-render-end');
 */
export function measurePerformance(name: string, startMark: string, endMark: string): number | null {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  try {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];
    return measure ? measure.duration : null;
  } catch (error) {
    console.error('Error measuring performance:', error);
    return null;
  }
}
