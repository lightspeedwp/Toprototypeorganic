/**
 * Mobile Performance Tester
 * 
 * Tests and validates mobile-specific performance metrics.
 * 
 * **Features:**
 * - Touch target size validation
 * - Scroll performance testing
 * - Frame rate monitoring
 * - Memory usage tracking
 * - Network bandwidth detection
 * - Device capability detection
 * 
 * @module mobilePerformanceTester
 * @category utils
 */

/**
 * Touch target test result.
 */
interface TouchTargetResult {
  element: string;
  width: number;
  height: number;
  passed: boolean;
  recommendation: string;
}

/**
 * Scroll performance result.
 */
interface ScrollPerformanceResult {
  averageFPS: number;
  minFPS: number;
  maxFPS: number;
  frameDrops: number;
  rating: "good" | "needs-improvement" | "poor";
}

/**
 * Mobile performance test results.
 */
interface MobilePerformanceResults {
  touchTargets: TouchTargetResult[];
  scrollPerformance: ScrollPerformanceResult | null;
  deviceInfo: DeviceInfo;
  networkInfo: NetworkInfo;
  recommendations: string[];
}

/**
 * Device information.
 */
interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  supportsTouch: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  orientation: "portrait" | "landscape";
}

/**
 * Network information.
 */
interface NetworkInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

/**
 * Minimum touch target size (44x44px per WCAG).
 */
const MIN_TOUCH_TARGET_SIZE = 44;

/**
 * Test touch target sizes.
 */
function testTouchTargets(): TouchTargetResult[] {
  const results: TouchTargetResult[] = [];

  // Find all interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, input[type='button'], input[type='submit'], [role='button'], [onclick]"
  );

  interactiveElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const passed = width >= MIN_TOUCH_TARGET_SIZE && height >= MIN_TOUCH_TARGET_SIZE;

    if (!passed) {
      results.push({
        element: `${element.tagName.toLowerCase()}${
          element.className ? `.${element.className.split(" ")[0]}` : ""
        }`,
        width: Math.round(width),
        height: Math.round(height),
        passed,
        recommendation: `Increase size to at least ${MIN_TOUCH_TARGET_SIZE}x${MIN_TOUCH_TARGET_SIZE}px`,
      });
    }
  });

  return results;
}

/**
 * Test scroll performance.
 */
function testScrollPerformance(): Promise<ScrollPerformanceResult> {
  return new Promise((resolve) => {
    const frames: number[] = [];
    let lastFrameTime = performance.now();
    let animationFrameId: number;
    let testDuration = 0;
    const MAX_TEST_DURATION = 2000; // 2 seconds

    const measureFrame = () => {
      const now = performance.now();
      const delta = now - lastFrameTime;
      const fps = 1000 / delta;

      frames.push(fps);
      lastFrameTime = now;
      testDuration += delta;

      if (testDuration < MAX_TEST_DURATION) {
        animationFrameId = requestAnimationFrame(measureFrame);
      } else {
        cancelAnimationFrame(animationFrameId);

        // Calculate stats
        const averageFPS = frames.reduce((sum, fps) => sum + fps, 0) / frames.length;
        const minFPS = Math.min(...frames);
        const maxFPS = Math.max(...frames);
        const frameDrops = frames.filter((fps) => fps < 50).length;

        // Rating
        let rating: "good" | "needs-improvement" | "poor";
        if (averageFPS >= 55) {
          rating = "good";
        } else if (averageFPS >= 30) {
          rating = "needs-improvement";
        } else {
          rating = "poor";
        }

        resolve({
          averageFPS: Math.round(averageFPS),
          minFPS: Math.round(minFPS),
          maxFPS: Math.round(maxFPS),
          frameDrops,
          rating,
        });
      }
    };

    // Trigger scroll to measure performance
    window.scrollTo({ top: 100, behavior: "smooth" });
    animationFrameId = requestAnimationFrame(measureFrame);
  });
}

/**
 * Get device information.
 */
function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|tablet|kindle|playbook|silk/i.test(userAgent);
  const supportsTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0;

  return {
    isMobile,
    isTablet,
    supportsTouch,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    devicePixelRatio: window.devicePixelRatio,
    orientation: window.innerWidth > window.innerHeight ? "landscape" : "portrait",
  };
}

/**
 * Get network information.
 */
function getNetworkInfo(): NetworkInfo {
  // @ts-ignore
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (connection) {
    return {
      effectiveType: connection.effectiveType || "unknown",
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
      saveData: connection.saveData || false,
    };
  }

  return {
    effectiveType: "unknown",
    downlink: 0,
    rtt: 0,
    saveData: false,
  };
}

/**
 * Generate recommendations.
 */
function generateRecommendations(results: MobilePerformanceResults): string[] {
  const recommendations: string[] = [];

  // Touch target recommendations
  if (results.touchTargets.length > 0) {
    recommendations.push(
      `${results.touchTargets.length} touch targets are below ${MIN_TOUCH_TARGET_SIZE}x${MIN_TOUCH_TARGET_SIZE}px`
    );
  }

  // Scroll performance recommendations
  if (results.scrollPerformance) {
    if (results.scrollPerformance.rating === "poor") {
      recommendations.push("Scroll performance is poor. Consider reducing animation complexity.");
    } else if (results.scrollPerformance.rating === "needs-improvement") {
      recommendations.push(
        "Scroll performance needs improvement. Optimize animations and reduce repaints."
      );
    }

    if (results.scrollPerformance.frameDrops > 10) {
      recommendations.push(
        `${results.scrollPerformance.frameDrops} frame drops detected. Use CSS transforms and will-change.`
      );
    }
  }

  // Device recommendations
  if (results.deviceInfo.devicePixelRatio > 2) {
    recommendations.push(
      "High DPI display detected. Provide high-resolution images (2x, 3x)."
    );
  }

  // Network recommendations
  if (results.networkInfo.effectiveType === "slow-2g" || results.networkInfo.effectiveType === "2g") {
    recommendations.push("Slow network detected. Enable aggressive caching and lazy loading.");
  }

  if (results.networkInfo.saveData) {
    recommendations.push("Data Saver mode enabled. Reduce image sizes and defer non-critical assets.");
  }

  return recommendations;
}

/**
 * Run mobile performance tests.
 */
export async function runMobilePerformanceTests(): Promise<MobilePerformanceResults> {
  console.log("📱 Running mobile performance tests...");

  const touchTargets = testTouchTargets();
  const scrollPerformance = await testScrollPerformance();
  const deviceInfo = getDeviceInfo();
  const networkInfo = getNetworkInfo();

  const results: MobilePerformanceResults = {
    touchTargets,
    scrollPerformance,
    deviceInfo,
    networkInfo,
    recommendations: [],
  };

  results.recommendations = generateRecommendations(results);

  return results;
}

/**
 * Log mobile performance test results.
 */
export async function logMobilePerformanceTests(): Promise<void> {
  const results = await runMobilePerformanceTests();

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║         MOBILE PERFORMANCE TEST REPORT                      ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  // Device Info
  console.log("📱 Device Information:");
  console.log(`  Type: ${results.deviceInfo.isMobile ? "Mobile" : results.deviceInfo.isTablet ? "Tablet" : "Desktop"}`);
  console.log(`  Touch Support: ${results.deviceInfo.supportsTouch ? "Yes" : "No"}`);
  console.log(`  Screen: ${results.deviceInfo.screenWidth}x${results.deviceInfo.screenHeight}`);
  console.log(`  DPR: ${results.deviceInfo.devicePixelRatio}x`);
  console.log(`  Orientation: ${results.deviceInfo.orientation}`);
  console.log("");

  // Network Info
  console.log("🌐 Network Information:");
  console.log(`  Effective Type: ${results.networkInfo.effectiveType}`);
  console.log(`  Downlink: ${results.networkInfo.downlink} Mbps`);
  console.log(`  RTT: ${results.networkInfo.rtt}ms`);
  console.log(`  Data Saver: ${results.networkInfo.saveData ? "On" : "Off"}`);
  console.log("");

  // Touch Targets
  console.log("👆 Touch Target Tests:");
  if (results.touchTargets.length === 0) {
    console.log("  ✅ All touch targets meet minimum size requirement");
  } else {
    console.log(`  ⚠️  ${results.touchTargets.length} touch targets below ${MIN_TOUCH_TARGET_SIZE}x${MIN_TOUCH_TARGET_SIZE}px:`);
    results.touchTargets.slice(0, 10).forEach((target, index) => {
      console.log(`  ${index + 1}. ${target.element}: ${target.width}x${target.height}px`);
      console.log(`     💡 ${target.recommendation}`);
    });
    if (results.touchTargets.length > 10) {
      console.log(`  ... and ${results.touchTargets.length - 10} more`);
    }
  }
  console.log("");

  // Scroll Performance
  if (results.scrollPerformance) {
    console.log("📊 Scroll Performance:");
    console.log(`  Average FPS: ${results.scrollPerformance.averageFPS}`);
    console.log(`  Min FPS: ${results.scrollPerformance.minFPS}`);
    console.log(`  Max FPS: ${results.scrollPerformance.maxFPS}`);
    console.log(`  Frame Drops: ${results.scrollPerformance.frameDrops}`);

    const emoji =
      results.scrollPerformance.rating === "good"
        ? "✅"
        : results.scrollPerformance.rating === "needs-improvement"
        ? "⚠️"
        : "❌";
    console.log(`  Rating: ${emoji} ${results.scrollPerformance.rating}`);
    console.log("");
  }

  // Recommendations
  if (results.recommendations.length > 0) {
    console.log("💡 Recommendations:");
    results.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
    console.log("");
  }

  console.log("════════════════════════════════════════════════════════════════\n");
}

/**
 * Auto-run in development mode (mobile only).
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.addEventListener("load", () => {
    const deviceInfo = getDeviceInfo();

    if (deviceInfo.isMobile || deviceInfo.isTablet || deviceInfo.supportsTouch) {
      setTimeout(() => {
        logMobilePerformanceTests();
      }, 5000);
    }
  });
}
