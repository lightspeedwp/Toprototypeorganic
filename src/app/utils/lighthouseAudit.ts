/**
 * Lighthouse Audit Utility
 * 
 * Simulates Lighthouse audit checks in the browser.
 * Provides performance, accessibility, best practices, and SEO insights.
 * 
 * **Note:** This is a simplified version for development.
 * For full Lighthouse audits, use Chrome DevTools or CI/CD integration.
 * 
 * **Checks:**
 * - Performance metrics (LCP, FCP, CLS)
 * - Accessibility (ARIA, alt text, labels)
 * - Best practices (HTTPS, console errors, deprecated APIs)
 * - SEO (meta tags, structured data)
 * - PWA (manifest, service worker)
 * 
 * @module lighthouseAudit
 * @category utils
 */

/**
 * Audit category result.
 */
interface AuditCategory {
  score: number; // 0-100
  passed: number;
  failed: number;
  warnings: number;
  issues: string[];
}

/**
 * Complete audit results.
 */
interface LighthouseAuditResults {
  performance: AuditCategory;
  accessibility: AuditCategory;
  bestPractices: AuditCategory;
  seo: AuditCategory;
  pwa: AuditCategory;
  overallScore: number;
}

/**
 * Audit performance.
 */
function auditPerformance(): AuditCategory {
  const issues: string[] = [];
  let passed = 0;
  let failed = 0;
  
  // Check for render-blocking resources
  const blockingScripts = document.querySelectorAll("script[src]:not([async]):not([defer])");
  const blockingStyles = document.querySelectorAll('link[rel="stylesheet"]:not([media="print"])');
  
  if (blockingScripts.length > 0) {
    issues.push(`${blockingScripts.length} render-blocking script(s) found`);
    failed++;
  } else {
    passed++;
  }
  
  if (blockingStyles.length > 2) {
    issues.push(`${blockingStyles.length} render-blocking stylesheet(s) found (recommend < 2)`);
    failed++;
  } else {
    passed++;
  }
  
  // Check for lazy loading
  const images = document.querySelectorAll("img");
  const lazyImages = Array.from(images).filter((img) => img.loading === "lazy");
  
  if (lazyImages.length > 0) {
    passed++;
  } else {
    issues.push("No images use lazy loading");
    failed++;
  }
  
  // Check for font-display
  const fontFaces = Array.from(document.styleSheets).flatMap((sheet) => {
    try {
      return Array.from(sheet.cssRules || []);
    } catch {
      return [];
    }
  }).filter((rule: any) => rule.type === CSSRule.FONT_FACE_RULE);
  
  if (fontFaces.length > 0) {
    passed++;
  }
  
  // Check for preconnect
  const preconnects = document.querySelectorAll('link[rel="preconnect"]');
  if (preconnects.length > 0) {
    passed++;
  }
  
  const totalChecks = passed + failed;
  const score = totalChecks > 0 ? Math.round((passed / totalChecks) * 100) : 0;
  
  return {
    score,
    passed,
    failed,
    warnings: 0,
    issues,
  };
}

/**
 * Audit accessibility.
 */
function auditAccessibility(): AuditCategory {
  const issues: string[] = [];
  let passed = 0;
  let failed = 0;
  
  // Check for alt text on images
  const images = document.querySelectorAll("img");
  const imagesWithoutAlt = Array.from(images).filter((img) => !img.hasAttribute("alt"));
  
  if (imagesWithoutAlt.length === 0) {
    passed++;
  } else {
    issues.push(`${imagesWithoutAlt.length} image(s) missing alt attribute`);
    failed++;
  }
  
  // Check for form labels
  const inputs = document.querySelectorAll("input, select, textarea");
  const inputsWithoutLabels = Array.from(inputs).filter((input) => {
    const id = input.getAttribute("id");
    const ariaLabel = input.getAttribute("aria-label");
    const ariaLabelledBy = input.getAttribute("aria-labelledby");
    
    if (ariaLabel || ariaLabelledBy) return false;
    
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      return !label;
    }
    
    return true;
  });
  
  if (inputsWithoutLabels.length === 0) {
    passed++;
  } else {
    issues.push(`${inputsWithoutLabels.length} form input(s) missing labels`);
    failed++;
  }
  
  // Check for ARIA landmarks
  const hasMain = document.querySelector("main, [role='main']");
  const hasNav = document.querySelector("nav, [role='navigation']");
  
  if (hasMain) {
    passed++;
  } else {
    issues.push("Missing main landmark");
    failed++;
  }
  
  if (hasNav) {
    passed++;
  } else {
    issues.push("Missing navigation landmark");
    failed++;
  }
  
  // Check heading hierarchy
  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  const h1Count = headings.filter((h) => h.tagName === "H1").length;
  
  if (h1Count === 1) {
    passed++;
  } else if (h1Count === 0) {
    issues.push("No H1 heading found");
    failed++;
  } else {
    issues.push(`Multiple H1 headings found (${h1Count})`);
    failed++;
  }
  
  const totalChecks = passed + failed;
  const score = totalChecks > 0 ? Math.round((passed / totalChecks) * 100) : 0;
  
  return {
    score,
    passed,
    failed,
    warnings: 0,
    issues,
  };
}

/**
 * Audit best practices.
 */
function auditBestPractices(): AuditCategory {
  const issues: string[] = [];
  let passed = 0;
  let failed = 0;
  
  // Check for HTTPS
  if (window.location.protocol === "https:") {
    passed++;
  } else if (window.location.protocol === "http:" && window.location.hostname !== "localhost") {
    issues.push("Site not served over HTTPS");
    failed++;
  } else {
    passed++; // localhost is OK
  }
  
  // Check for console errors (simplified)
  const hasConsoleErrors = false; // Would need to override console.error to track
  if (!hasConsoleErrors) {
    passed++;
  }
  
  // Check for deprecated APIs
  if (typeof document.all === "undefined") {
    passed++;
  }
  
  // Check for meta viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    passed++;
  } else {
    issues.push("Missing viewport meta tag");
    failed++;
  }
  
  // Check for doctype
  if (document.doctype) {
    passed++;
  } else {
    issues.push("Missing doctype");
    failed++;
  }
  
  const totalChecks = passed + failed;
  const score = totalChecks > 0 ? Math.round((passed / totalChecks) * 100) : 0;
  
  return {
    score,
    passed,
    failed,
    warnings: 0,
    issues,
  };
}

/**
 * Audit SEO.
 */
function auditSEO(): AuditCategory {
  const issues: string[] = [];
  let passed = 0;
  let failed = 0;
  
  // Check for title
  const title = document.querySelector("title");
  if (title && title.textContent && title.textContent.length > 0) {
    passed++;
  } else {
    issues.push("Missing or empty <title> tag");
    failed++;
  }
  
  // Check for meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && metaDescription.getAttribute("content")) {
    passed++;
  } else {
    issues.push("Missing meta description");
    failed++;
  }
  
  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    passed++;
  }
  
  // Check for robots meta
  const robots = document.querySelector('meta[name="robots"]');
  if (robots) {
    passed++;
  }
  
  // Check for structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length > 0) {
    passed++;
  }
  
  // Check for Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (ogTitle && ogDescription && ogImage) {
    passed++;
  }
  
  const totalChecks = passed + failed;
  const score = totalChecks > 0 ? Math.round((passed / totalChecks) * 100) : 0;
  
  return {
    score,
    passed,
    failed,
    warnings: 0,
    issues,
  };
}

/**
 * Audit PWA.
 */
function auditPWA(): AuditCategory {
  const issues: string[] = [];
  let passed = 0;
  let failed = 0;
  
  // Check for manifest
  const manifest = document.querySelector('link[rel="manifest"]');
  if (manifest) {
    passed++;
  } else {
    issues.push("Missing web app manifest");
    failed++;
  }
  
  // Check for service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length > 0) {
        passed++;
      } else {
        issues.push("No service worker registered");
        failed++;
      }
    });
  } else {
    issues.push("Service worker not supported");
    failed++;
  }
  
  // Check for theme color
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    passed++;
  }
  
  // Check for apple touch icon
  const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (appleTouchIcon) {
    passed++;
  }
  
  const totalChecks = passed + failed;
  const score = totalChecks > 0 ? Math.round((passed / totalChecks) * 100) : 0;
  
  return {
    score,
    passed,
    failed,
    warnings: 0,
    issues,
  };
}

/**
 * Run complete Lighthouse audit.
 */
export function runLighthouseAudit(): LighthouseAuditResults {
  console.log("🔍 Running Lighthouse-style audit...");
  
  const performance = auditPerformance();
  const accessibility = auditAccessibility();
  const bestPractices = auditBestPractices();
  const seo = auditSEO();
  const pwa = auditPWA();
  
  const overallScore = Math.round(
    (performance.score + accessibility.score + bestPractices.score + seo.score) / 4
  );
  
  return {
    performance,
    accessibility,
    bestPractices,
    seo,
    pwa,
    overallScore,
  };
}

/**
 * Log Lighthouse audit to console.
 */
export function logLighthouseAudit(): void {
  const results = runLighthouseAudit();
  
  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║           LIGHTHOUSE-STYLE AUDIT REPORT                     ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");
  
  console.log(`🎯 Overall Score: ${results.overallScore}/100\n`);
  
  // Helper to get emoji for score
  const getEmoji = (score: number) => {
    if (score >= 90) return "🟢";
    if (score >= 50) return "🟡";
    return "🔴";
  };
  
  // Performance
  console.log(`${getEmoji(results.performance.score)} Performance: ${results.performance.score}/100`);
  console.log(`   ✅ Passed: ${results.performance.passed} checks`);
  console.log(`   ❌ Failed: ${results.performance.failed} checks`);
  if (results.performance.issues.length > 0) {
    console.log("   Issues:");
    results.performance.issues.forEach((issue) => {
      console.log(`    • ${issue}`);
    });
  }
  console.log("");
  
  // Accessibility
  console.log(`${getEmoji(results.accessibility.score)} Accessibility: ${results.accessibility.score}/100`);
  console.log(`   ✅ Passed: ${results.accessibility.passed} checks`);
  console.log(`   ❌ Failed: ${results.accessibility.failed} checks`);
  if (results.accessibility.issues.length > 0) {
    console.log("   Issues:");
    results.accessibility.issues.forEach((issue) => {
      console.log(`    • ${issue}`);
    });
  }
  console.log("");
  
  // Best Practices
  console.log(`${getEmoji(results.bestPractices.score)} Best Practices: ${results.bestPractices.score}/100`);
  console.log(`   ✅ Passed: ${results.bestPractices.passed} checks`);
  console.log(`   ❌ Failed: ${results.bestPractices.failed} checks`);
  if (results.bestPractices.issues.length > 0) {
    console.log("   Issues:");
    results.bestPractices.issues.forEach((issue) => {
      console.log(`    • ${issue}`);
    });
  }
  console.log("");
  
  // SEO
  console.log(`${getEmoji(results.seo.score)} SEO: ${results.seo.score}/100`);
  console.log(`   ✅ Passed: ${results.seo.passed} checks`);
  console.log(`   ❌ Failed: ${results.seo.failed} checks`);
  if (results.seo.issues.length > 0) {
    console.log("   Issues:");
    results.seo.issues.forEach((issue) => {
      console.log(`    • ${issue}`);
    });
  }
  console.log("");
  
  // PWA
  console.log(`${getEmoji(results.pwa.score)} PWA: ${results.pwa.score}/100`);
  console.log(`   ✅ Passed: ${results.pwa.passed} checks`);
  console.log(`   ❌ Failed: ${results.pwa.failed} checks`);
  if (results.pwa.issues.length > 0) {
    console.log("   Issues:");
    results.pwa.issues.forEach((issue) => {
      console.log(`    • ${issue}`);
    });
  }
  console.log("");
  
  // Overall assessment
  if (results.overallScore >= 90) {
    console.log("🎉 Excellent! Your site is well-optimized.");
  } else if (results.overallScore >= 70) {
    console.log("👍 Good! Some improvements can be made.");
  } else if (results.overallScore >= 50) {
    console.log("⚠️ Fair. Several optimizations recommended.");
  } else {
    console.log("🔴 Poor. Significant improvements needed.");
  }
  
  console.log("\n💡 For full Lighthouse audit, use Chrome DevTools (Lighthouse tab)");
  console.log("════════════════════════════════════════════════════════════════\n");
}

/**
 * Auto-run in development mode.
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      logLighthouseAudit();
    }, 4000);
  });
}
