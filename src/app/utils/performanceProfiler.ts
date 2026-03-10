/**
 * Performance Profiler Utility
 * 
 * Advanced performance monitoring and profiling for React components.
 * Tracks render times, re-renders, and performance bottlenecks.
 * 
 * @module performanceProfiler
 * @category utils
 */

import { useEffect, useRef, useState } from 'react';
import React from 'react';

/**
 * Performance metrics for a component.
 */
interface PerformanceMetrics {
  componentName: string;
  renderCount: number;
  totalRenderTime: number;
  averageRenderTime: number;
  slowestRender: number;
  fastestRender: number;
  lastRenderTime: number;
  timestamp: number;
}

/**
 * Global performance tracking storage.
 */
const performanceRegistry = new Map<string, PerformanceMetrics>();

/**
 * Performance thresholds (in milliseconds).
 */
export const PERFORMANCE_THRESHOLDS = {
  excellent: 16, // < 16ms (60fps)
  good: 33,      // < 33ms (30fps)
  acceptable: 50, // < 50ms (20fps)
  slow: 100,     // < 100ms
  critical: 500, // < 500ms
} as const;

/**
 * Get performance rating based on render time.
 */
export function getPerformanceRating(renderTime: number): {
  rating: 'excellent' | 'good' | 'acceptable' | 'slow' | 'critical';
  color: string;
  emoji: string;
} {
  if (renderTime < PERFORMANCE_THRESHOLDS.excellent) {
    return { rating: 'excellent', color: 'text-primary', emoji: '🚀' };
  } else if (renderTime < PERFORMANCE_THRESHOLDS.good) {
    return { rating: 'good', color: 'text-primary', emoji: '✅' };
  } else if (renderTime < PERFORMANCE_THRESHOLDS.acceptable) {
    return { rating: 'acceptable', color: 'text-muted-foreground', emoji: '⚠️' };
  } else if (renderTime < PERFORMANCE_THRESHOLDS.slow) {
    return { rating: 'slow', color: 'text-destructive', emoji: '🐢' };
  } else {
    return { rating: 'critical', color: 'text-destructive', emoji: '🔴' };
  }
}

/**
 * React hook to profile component performance.
 * 
 * @param componentName - Name of the component to profile
 * @param enabled - Whether profiling is enabled (default: true in dev)
 * @returns Performance metrics and utilities
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { metrics, logMetrics } = usePerformanceProfiler('MyComponent');
 *   
 *   useEffect(() => {
 *     if (metrics.averageRenderTime > 50) {
 *       console.warn('Component is slow:', metrics);
 *     }
 *   }, [metrics]);
 *   
 *   return <div>Content</div>;
 * }
 * ```
 */
export function usePerformanceProfiler(
  componentName: string,
  enabled: boolean = process.env.NODE_ENV === 'development'
) {
  const renderStartTime = useRef<number>(0);
  const renderCountRef = useRef<number>(0);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    componentName,
    renderCount: 0,
    totalRenderTime: 0,
    averageRenderTime: 0,
    slowestRender: 0,
    fastestRender: Infinity,
    lastRenderTime: 0,
    timestamp: Date.now(),
  });

  // Start timing before render
  useEffect(() => {
    if (!enabled) return;
    
    renderStartTime.current = performance.now();
  });

  // Calculate metrics after render
  useEffect(() => {
    if (!enabled) return;
    
    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.current;
    renderCountRef.current += 1;

    const currentMetrics = performanceRegistry.get(componentName) || {
      componentName,
      renderCount: 0,
      totalRenderTime: 0,
      averageRenderTime: 0,
      slowestRender: 0,
      fastestRender: Infinity,
      lastRenderTime: 0,
      timestamp: Date.now(),
    };

    const updatedMetrics: PerformanceMetrics = {
      componentName,
      renderCount: currentMetrics.renderCount + 1,
      totalRenderTime: currentMetrics.totalRenderTime + renderTime,
      averageRenderTime:
        (currentMetrics.totalRenderTime + renderTime) /
        (currentMetrics.renderCount + 1),
      slowestRender: Math.max(currentMetrics.slowestRender, renderTime),
      fastestRender: Math.min(currentMetrics.fastestRender, renderTime),
      lastRenderTime: renderTime,
      timestamp: Date.now(),
    };

    performanceRegistry.set(componentName, updatedMetrics);
    setMetrics(updatedMetrics);
  });

  const logMetrics = () => {
    console.group(`📊 Performance Profile: ${componentName}`);
    console.log(`Render Count: ${metrics.renderCount}`);
    console.log(`Average Time: ${metrics.averageRenderTime.toFixed(2)}ms`);
    console.log(`Fastest: ${metrics.fastestRender.toFixed(2)}ms`);
    console.log(`Slowest: ${metrics.slowestRender.toFixed(2)}ms`);
    console.log(`Last: ${metrics.lastRenderTime.toFixed(2)}ms`);
    
    const rating = getPerformanceRating(metrics.averageRenderTime);
    console.log(`Rating: ${rating.emoji} ${rating.rating}`);
    console.groupEnd();
  };

  const resetMetrics = () => {
    performanceRegistry.delete(componentName);
    setMetrics({
      componentName,
      renderCount: 0,
      totalRenderTime: 0,
      averageRenderTime: 0,
      slowestRender: 0,
      fastestRender: Infinity,
      lastRenderTime: 0,
      timestamp: Date.now(),
    });
  };

  return {
    metrics,
    logMetrics,
    resetMetrics,
    rating: getPerformanceRating(metrics.averageRenderTime),
  };
}

/**
 * Get all performance metrics from registry.
 */
export function getAllPerformanceMetrics(): PerformanceMetrics[] {
  return Array.from(performanceRegistry.values()).sort(
    (a, b) => b.averageRenderTime - a.averageRenderTime
  );
}

/**
 * Log all performance metrics to console.
 */
export function logAllPerformanceMetrics() {
  const allMetrics = getAllPerformanceMetrics();
  
  if (allMetrics.length === 0) {
    console.log('No performance metrics recorded yet.');
    return;
  }

  console.group('🎯 Component Performance Report');
  console.table(
    allMetrics.map((m) => ({
      Component: m.componentName,
      'Renders': m.renderCount,
      'Avg (ms)': m.averageRenderTime.toFixed(2),
      'Min (ms)': m.fastestRender.toFixed(2),
      'Max (ms)': m.slowestRender.toFixed(2),
      'Last (ms)': m.lastRenderTime.toFixed(2),
      'Rating': getPerformanceRating(m.averageRenderTime).emoji,
    }))
  );
  console.groupEnd();

  // Highlight slow components
  const slowComponents = allMetrics.filter(
    (m) => m.averageRenderTime > PERFORMANCE_THRESHOLDS.acceptable
  );

  if (slowComponents.length > 0) {
    console.group('⚠️ Slow Components (> 50ms)');
    slowComponents.forEach((m) => {
      const rating = getPerformanceRating(m.averageRenderTime);
      console.warn(
        `${rating.emoji} ${m.componentName}: ${m.averageRenderTime.toFixed(2)}ms (${m.renderCount} renders)`
      );
    });
    console.groupEnd();
  }
}

/**
 * Clear all performance metrics.
 */
export function clearAllPerformanceMetrics() {
  performanceRegistry.clear();
  console.log('✅ All performance metrics cleared.');
}

/**
 * Export performance metrics as JSON.
 */
export function exportPerformanceMetrics(): string {
  const allMetrics = getAllPerformanceMetrics();
  return JSON.stringify(allMetrics, null, 2);
}

/**
 * Measure function execution time.
 * 
 * @param fn - Function to measure
 * @param label - Label for the measurement
 * @returns Result of the function
 * 
 * @example
 * ```tsx
 * const result = measureExecutionTime(() => {
 *   // Expensive operation
 *   return processData(data);
 * }, 'Data Processing');
 * ```
 */
export function measureExecutionTime<T>(
  fn: () => T,
  label: string = 'Execution'
): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;

  const rating = getPerformanceRating(duration);
  console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms ${rating.emoji}`);

  return result;
}

/**
 * Measure async function execution time.
 * 
 * @param fn - Async function to measure
 * @param label - Label for the measurement
 * @returns Promise with result
 * 
 * @example
 * ```tsx
 * const data = await measureAsyncExecutionTime(async () => {
 *   return await fetchData();
 * }, 'Data Fetch');
 * ```
 */
export async function measureAsyncExecutionTime<T>(
  fn: () => Promise<T>,
  label: string = 'Async Execution'
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  const duration = end - start;

  const rating = getPerformanceRating(duration);
  console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms ${rating.emoji}`);

  return result;
}

/**
 * React hook to measure effect execution time.
 * 
 * @param callback - Effect callback
 * @param deps - Effect dependencies
 * @param label - Label for measurement
 * 
 * @example
 * ```tsx
 * useTimedEffect(() => {
 *   // Expensive side effect
 *   processData(data);
 * }, [data], 'Data Processing Effect');
 * ```
 */
export function useTimedEffect(
  callback: () => void,
  deps: React.DependencyList,
  label: string = 'Effect'
) {
  useEffect(() => {
    const start = performance.now();
    callback();
    const end = performance.now();
    const duration = end - start;

    const rating = getPerformanceRating(duration);
    console.log(`⚡ ${label}: ${duration.toFixed(2)}ms ${rating.emoji}`);
  }, deps);
}

/**
 * Detect unnecessary re-renders.
 * 
 * @param componentName - Name of the component
 * @param props - Component props
 * @returns Boolean indicating if render is necessary
 * 
 * @example
 * ```tsx
 * function MyComponent(props) {
 *   useRenderLogger('MyComponent', props);
 *   return <div>Content</div>;
 * }
 * ```
 */
export function useRenderLogger(componentName: string, props?: any) {
  const renderCount = useRef(0);
  const prevProps = useRef(props);

  useEffect(() => {
    renderCount.current += 1;

    if (renderCount.current > 1) {
      console.group(`🔄 Re-render #${renderCount.current}: ${componentName}`);
      
      if (props && prevProps.current) {
        const changedProps = Object.keys(props).filter(
          (key) => props[key] !== prevProps.current[key]
        );

        if (changedProps.length > 0) {
          console.log('Changed props:', changedProps);
          changedProps.forEach((key) => {
            console.log(`  ${key}:`, {
              old: prevProps.current[key],
              new: props[key],
            });
          });
        } else {
          console.warn('⚠️ Re-render with no prop changes (unnecessary?)');
        }
      }
      
      console.groupEnd();
    }

    prevProps.current = props;
  });
}

/**
 * Monitor component mount/unmount cycles.
 * 
 * @param componentName - Name of the component
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   useComponentLifecycle('MyComponent');
 *   return <div>Content</div>;
 * }
 * ```
 */
export function useComponentLifecycle(componentName: string) {
  useEffect(() => {
    console.log(`✅ Mounted: ${componentName}`);
    
    return () => {
      console.log(`❌ Unmounted: ${componentName}`);
    };
  }, [componentName]);
}

/**
 * Performance monitoring HOC (Higher-Order Component).
 * 
 * @param Component - Component to wrap
 * @param componentName - Name for profiling
 * @returns Wrapped component with performance monitoring
 * 
 * @example
 * ```tsx
 * const ProfiledComponent = withPerformanceMonitoring(MyComponent, 'MyComponent');
 * ```
 */
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceMonitoredComponent(props: P) {
    const { metrics, rating } = usePerformanceProfiler(componentName);

    // Log warning if component is slow
    useEffect(() => {
      if (metrics.averageRenderTime > PERFORMANCE_THRESHOLDS.acceptable) {
        console.warn(
          `⚠️ ${componentName} is slow: ${metrics.averageRenderTime.toFixed(2)}ms average`
        );
      }
    }, [metrics.averageRenderTime]);

    return React.createElement(Component, props);
  };
}

/**
 * Get performance insights and recommendations.
 */
export function getPerformanceInsights() {
  const allMetrics = getAllPerformanceMetrics();
  
  if (allMetrics.length === 0) {
    return {
      summary: 'No performance data available yet.',
      recommendations: [],
      score: 100,
    };
  }

  const slowComponents = allMetrics.filter(
    (m) => m.averageRenderTime > PERFORMANCE_THRESHOLDS.acceptable
  );
  
  const criticalComponents = allMetrics.filter(
    (m) => m.averageRenderTime > PERFORMANCE_THRESHOLDS.critical
  );

  const recommendations: string[] = [];

  if (criticalComponents.length > 0) {
    recommendations.push(
      `🔴 ${criticalComponents.length} component(s) have critical performance issues (>500ms)`
    );
    criticalComponents.forEach((m) => {
      recommendations.push(
        `  - ${m.componentName}: ${m.averageRenderTime.toFixed(2)}ms - Consider code splitting or optimization`
      );
    });
  }

  if (slowComponents.length > 0) {
    recommendations.push(
      `⚠️ ${slowComponents.length} component(s) are slow (>50ms)`
    );
    slowComponents.forEach((m) => {
      recommendations.push(
        `  - ${m.componentName}: ${m.averageRenderTime.toFixed(2)}ms - Consider memoization`
      );
    });
  }

  // Check for components with many re-renders
  const frequentReRenders = allMetrics.filter((m) => m.renderCount > 10);
  if (frequentReRenders.length > 0) {
    recommendations.push(
      `🔄 ${frequentReRenders.length} component(s) re-render frequently`
    );
    frequentReRenders.forEach((m) => {
      recommendations.push(
        `  - ${m.componentName}: ${m.renderCount} renders - Check dependencies and memoization`
      );
    });
  }

  // Calculate overall performance score (0-100)
  const avgPerformance =
    allMetrics.reduce((sum, m) => sum + m.averageRenderTime, 0) /
    allMetrics.length;
  
  let score = 100;
  if (avgPerformance > PERFORMANCE_THRESHOLDS.excellent) score -= 10;
  if (avgPerformance > PERFORMANCE_THRESHOLDS.good) score -= 20;
  if (avgPerformance > PERFORMANCE_THRESHOLDS.acceptable) score -= 30;
  if (avgPerformance > PERFORMANCE_THRESHOLDS.slow) score -= 20;
  if (criticalComponents.length > 0) score -= 20;

  score = Math.max(0, score);

  return {
    summary: `Performance Score: ${score}/100`,
    recommendations:
      recommendations.length > 0
        ? recommendations
        : ['✅ All components performing well!'],
    score,
    totalComponents: allMetrics.length,
    slowComponents: slowComponents.length,
    criticalComponents: criticalComponents.length,
    averageRenderTime: avgPerformance,
  };
}

/**
 * Initialize performance monitoring (call once in your app).
 * 
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * // In your App.tsx or index.tsx
 * initPerformanceMonitoring({
 *   logInterval: 30000, // Log every 30 seconds
 *   autoLog: true,
 * });
 * ```
 */
export function initPerformanceMonitoring(options?: {
  logInterval?: number;
  autoLog?: boolean;
}) {
  const { logInterval = 60000, autoLog = true } = options || {};

  if (autoLog && typeof window !== 'undefined') {
    // Log performance metrics periodically
    const interval = setInterval(() => {
      const metrics = getAllPerformanceMetrics();
      if (metrics.length > 0) {
        logAllPerformanceMetrics();
        
        const insights = getPerformanceInsights();
        console.group('💡 Performance Insights');
        console.log(insights.summary);
        insights.recommendations.forEach((r) => console.log(r));
        console.groupEnd();
      }
    }, logInterval);

    // Cleanup
    return () => clearInterval(interval);
  }
}