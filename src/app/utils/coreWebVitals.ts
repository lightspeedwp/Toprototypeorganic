/**
 * Core Web Vitals Tracker
 * 
 * Tracks and reports Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 * 
 * **Performance Metrics:**
 * - Real user monitoring (RUM)
 * - Automatic threshold validation
 * - Console logging with color coding
 * - Performance recommendations
 * 
 * @module coreWebVitals
 * @category utils
 */

/**
 * Core Web Vitals metric.
 */
interface WebVitalMetric {
  name: "LCP" | "FID" | "CLS" | "FCP" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

/**
 * Performance thresholds (from Google).
 */
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint (ms)
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay (ms)
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift (score)
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte (ms)
  INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint (ms)
};

/**
 * Get rating for a metric value.
 */
function getRating(
  name: WebVitalMetric["name"],
  value: number
): "good" | "needs-improvement" | "poor" {
  const threshold = THRESHOLDS[name];
  
  if (value <= threshold.good) return "good";
  if (value <= threshold.needsImprovement) return "needs-improvement";
  return "poor";
}

/**
 * Format metric value for display.
 */
function formatValue(name: WebVitalMetric["name"], value: number): string {
  if (name === "CLS") {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

/**
 * Get console color for rating.
 */
function getConsoleColor(rating: WebVitalMetric["rating"]): string {
  switch (rating) {
    case "good":
      return "color: #0cce6b; font-weight: bold;";
    case "needs-improvement":
      return "color: #ffa400; font-weight: bold;";
    case "poor":
      return "color: #ff4e42; font-weight: bold;";
  }
}

/**
 * Get recommendation for poor metrics.
 */
function getRecommendation(name: WebVitalMetric["name"]): string {
  switch (name) {
    case "LCP":
      return `
• Optimize images (lazy loading, WebP, compression)
• Reduce server response time
• Remove render-blocking resources
• Preload critical assets
• Use CDN for static assets`;
    case "FID":
      return `
• Minimize JavaScript execution time
• Break up long tasks
• Use Web Workers for heavy computation
• Defer non-critical JavaScript
• Reduce third-party code impact`;
    case "CLS":
      return `
• Set explicit width/height on images/videos
• Reserve space for dynamic content
• Avoid inserting content above existing content
• Use CSS aspect-ratio for responsive images
• Preload fonts to avoid FOIT/FOUT`;
    case "FCP":
      return `
• Eliminate render-blocking resources
• Minify CSS and JavaScript
• Remove unused CSS
• Preconnect to required origins
• Use font-display: swap`;
    case "TTFB":
      return `
• Use a CDN
• Implement server-side caching
• Optimize database queries
• Enable compression (gzip/brotli)
• Upgrade server resources`;
    case "INP":
      return `
• Optimize event handlers
• Avoid long JavaScript tasks
• Reduce JavaScript execution time
• Use requestIdleCallback for non-critical work
• Debounce expensive operations`;
  }
}

/**
 * Report metric to console.
 */
function reportMetric(metric: WebVitalMetric): void {
  const { name, value, rating } = metric;
  const formattedValue = formatValue(name, value);
  const color = getConsoleColor(rating);
  const emoji = rating === "good" ? "✅" : rating === "needs-improvement" ? "⚠️" : "❌";
  
  console.log(
    `%c${emoji} ${name}: ${formattedValue} (${rating})`,
    color
  );
  
  // Show recommendations for poor metrics
  if (rating === "poor") {
    console.log(`%c💡 Recommendations for ${name}:`, "color: #666;");
    console.log(getRecommendation(name));
  }
}

/**
 * Track Largest Contentful Paint (LCP).
 * 
 * Measures loading performance.
 * Target: < 2.5s (good), < 4s (needs improvement)
 */
function trackLCP(): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
  
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      if (lastEntry) {
        const metric: WebVitalMetric = {
          name: "LCP",
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: getRating("LCP", lastEntry.renderTime || lastEntry.loadTime),
          delta: lastEntry.renderTime || lastEntry.loadTime,
          id: lastEntry.id || "",
        };
        
        reportMetric(metric);
      }
    });
    
    observer.observe({ entryTypes: ["largest-contentful-paint"] });
  } catch (error) {
    console.error("Error tracking LCP:", error);
  }
}

/**
 * Track First Input Delay (FID).
 * 
 * Measures interactivity.
 * Target: < 100ms (good), < 300ms (needs improvement)
 */
function trackFID(): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
  
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        const metric: WebVitalMetric = {
          name: "FID",
          value: entry.processingStart - entry.startTime,
          rating: getRating("FID", entry.processingStart - entry.startTime),
          delta: entry.processingStart - entry.startTime,
          id: entry.id || "",
        };
        
        reportMetric(metric);
      });
    });
    
    observer.observe({ entryTypes: ["first-input"] });
  } catch (error) {
    console.error("Error tracking FID:", error);
  }
}

/**
 * Track Cumulative Layout Shift (CLS).
 * 
 * Measures visual stability.
 * Target: < 0.1 (good), < 0.25 (needs improvement)
 */
function trackCLS(): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
  
  try {
    let clsValue = 0;
    let clsEntries: any[] = [];
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });
      
      const metric: WebVitalMetric = {
        name: "CLS",
        value: clsValue,
        rating: getRating("CLS", clsValue),
        delta: clsValue,
        id: "",
      };
      
      reportMetric(metric);
    });
    
    observer.observe({ entryTypes: ["layout-shift"] });
    
    // Report final CLS on page unload
    window.addEventListener("pagehide", () => {
      const finalMetric: WebVitalMetric = {
        name: "CLS",
        value: clsValue,
        rating: getRating("CLS", clsValue),
        delta: clsValue,
        id: "",
      };
      
      console.log("%c📊 Final CLS Score", "font-weight: bold; font-size: 14px;");
      reportMetric(finalMetric);
    });
  } catch (error) {
    console.error("Error tracking CLS:", error);
  }
}

/**
 * Track First Contentful Paint (FCP).
 * 
 * Measures perceived loading speed.
 * Target: < 1.8s (good), < 3s (needs improvement)
 */
function trackFCP(): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
  
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        if (entry.name === "first-contentful-paint") {
          const metric: WebVitalMetric = {
            name: "FCP",
            value: entry.startTime,
            rating: getRating("FCP", entry.startTime),
            delta: entry.startTime,
            id: entry.id || "",
          };
          
          reportMetric(metric);
        }
      });
    });
    
    observer.observe({ entryTypes: ["paint"] });
  } catch (error) {
    console.error("Error tracking FCP:", error);
  }
}

/**
 * Track Time to First Byte (TTFB).
 * 
 * Measures server response time.
 * Target: < 800ms (good), < 1800ms (needs improvement)
 */
function trackTTFB(): void {
  if (typeof window === "undefined" || !window.performance) return;
  
  try {
    const navEntry = performance.getEntriesByType("navigation")[0] as any;
    
    if (navEntry) {
      const ttfb = navEntry.responseStart - navEntry.requestStart;
      
      const metric: WebVitalMetric = {
        name: "TTFB",
        value: ttfb,
        rating: getRating("TTFB", ttfb),
        delta: ttfb,
        id: "",
      };
      
      reportMetric(metric);
    }
  } catch (error) {
    console.error("Error tracking TTFB:", error);
  }
}

/**
 * Track Interaction to Next Paint (INP).
 * 
 * Measures responsiveness to user interactions.
 * Target: < 200ms (good), < 500ms (needs improvement)
 */
function trackINP(): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
  
  try {
    let maxDuration = 0;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        const duration = entry.processingEnd - entry.startTime;
        
        if (duration > maxDuration) {
          maxDuration = duration;
          
          const metric: WebVitalMetric = {
            name: "INP",
            value: duration,
            rating: getRating("INP", duration),
            delta: duration,
            id: entry.id || "",
          };
          
          reportMetric(metric);
        }
      });
    });
    
    observer.observe({ entryTypes: ["event"] });
  } catch (error) {
    console.error("Error tracking INP:", error);
  }
}

/**
 * Initialize Core Web Vitals tracking.
 * 
 * Starts tracking all Core Web Vitals metrics.
 */
export function initCoreWebVitals(): void {
  if (typeof window === "undefined") return;
  
  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║              CORE WEB VITALS TRACKER                        ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");
  
  console.log("🎯 Tracking Core Web Vitals...\n");
  console.log("📊 Thresholds:");
  console.log("  • LCP: < 2.5s (good), < 4s (needs improvement)");
  console.log("  • FID: < 100ms (good), < 300ms (needs improvement)");
  console.log("  • CLS: < 0.1 (good), < 0.25 (needs improvement)");
  console.log("  • FCP: < 1.8s (good), < 3s (needs improvement)");
  console.log("  • TTFB: < 800ms (good), < 1800ms (needs improvement)");
  console.log("  • INP: < 200ms (good), < 500ms (needs improvement)\n");
  console.log("═══════════════════════════════════════════════════════════════\n");
  
  // Track all metrics
  trackLCP();
  trackFID();
  trackCLS();
  trackFCP();
  trackTTFB();
  trackINP();
  
  // Summary on page unload
  window.addEventListener("beforeunload", () => {
    console.log("\n═══════════════════════════════════════════════════════════════");
    console.log("📊 Core Web Vitals tracking session ended");
    console.log("═══════════════════════════════════════════════════════════════\n");
  });
}

/**
 * Auto-initialize in development mode.
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      initCoreWebVitals();
    }, 1000);
  });
}
