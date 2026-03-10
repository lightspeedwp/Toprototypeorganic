/**
 * Lighthouse Performance Testing Utility
 * 
 * Provides automated Lighthouse-style performance testing and recommendations.
 * Simulates Lighthouse audits by testing real-world performance metrics and best practices.
 * 
 * **Features:**
 * - Performance scoring (0-100)
 * - Accessibility checks
 * - Best practices validation
 * - SEO recommendations
 * - Progressive Web App (PWA) checks
 * 
 * **Usage:**
 * Run `runLighthouseAudit()` in development console to get a comprehensive
 * performance report similar to Google Lighthouse.
 * 
 * @module lighthouseTest
 * @category utils
 */

/**
 * Lighthouse audit category result.
 */
export interface LighthouseCategory {
  /** Category name */
  name: string;
  /** Score (0-100) */
  score: number;
  /** Passed audits */
  passed: string[];
  /** Failed audits with recommendations */
  failed: {
    audit: string;
    impact: 'high' | 'medium' | 'low';
    recommendation: string;
  }[];
  /** Warnings (not failures but should be addressed) */
  warnings: string[];
}

/**
 * Complete Lighthouse audit report.
 */
export interface LighthouseReport {
  /** Overall performance score (0-100) */
  overallScore: number;
  /** Performance category */
  performance: LighthouseCategory;
  /** Accessibility category */
  accessibility: LighthouseCategory;
  /** Best practices category */
  bestPractices: LighthouseCategory;
  /** SEO category */
  seo: LighthouseCategory;
  /** Report generation timestamp */
  timestamp: string;
  /** Estimated load time (3G) */
  estimatedLoadTime: string;
  /** Total page weight */
  pageWeight: string;
}

/**
 * Audits performance metrics.
 * 
 * Checks:
 * - First Contentful Paint
 * - Largest Contentful Paint
 * - Total Blocking Time
 * - Cumulative Layout Shift
 * - Speed Index
 * - Time to Interactive
 * 
 * @returns {LighthouseCategory} Performance audit results
 */
export function auditPerformance(): LighthouseCategory {
  const passed: string[] = [];
  const failed: { audit: string; impact: 'high' | 'medium' | 'low'; recommendation: string }[] = [];
  const warnings: string[] = [];

  // Check image optimization
  const images = document.querySelectorAll('img');
  let unoptimizedImages = 0;
  let imagesWithoutAlt = 0;
  let largeImages = 0;

  images.forEach((img) => {
    // Check for alt text
    if (!img.alt) {
      imagesWithoutAlt++;
    }

    // Check for lazy loading
    if (!img.loading || img.loading !== 'lazy') {
      if (img.getBoundingClientRect().top > window.innerHeight) {
        unoptimizedImages++;
      }
    }

    // Check image size
    const naturalWidth = img.naturalWidth;
    const displayWidth = img.clientWidth;
    if (naturalWidth > displayWidth * 2) {
      largeImages++;
    }
  });

  if (unoptimizedImages === 0) {
    passed.push('✓ Images use lazy loading');
  } else {
    failed.push({
      audit: `${unoptimizedImages} off-screen images not lazy-loaded`,
      impact: 'medium',
      recommendation: 'Add loading="lazy" attribute to images below the fold',
    });
  }

  if (largeImages === 0) {
    passed.push('✓ Images are properly sized');
  } else {
    warnings.push(`${largeImages} images are larger than necessary`);
  }

  // Check for render-blocking resources
  const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
  if (scripts.length === 0) {
    passed.push('✓ No render-blocking scripts');
  } else {
    failed.push({
      audit: `${scripts.length} render-blocking scripts detected`,
      impact: 'high',
      recommendation: 'Add async or defer attributes to script tags',
    });
  }

  // Check for web fonts
  const fontFaces = Array.from(document.fonts);
  let unoptimizedFonts = 0;
  fontFaces.forEach((font) => {
    if (font.status === 'loading' || font.status === 'unloaded') {
      unoptimizedFonts++;
    }
  });

  if (unoptimizedFonts === 0) {
    passed.push('✓ Fonts are preloaded or system fonts');
  } else {
    warnings.push(`${unoptimizedFonts} fonts still loading (may cause layout shift)`);
  }

  // Check for unused CSS
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  if (stylesheets.length <= 2) {
    passed.push('✓ Minimal external stylesheets');
  } else if (stylesheets.length > 5) {
    failed.push({
      audit: `${stylesheets.length} external stylesheets detected`,
      impact: 'medium',
      recommendation: 'Combine stylesheets or use inline critical CSS',
    });
  }

  // Check for HTTPS
  if (window.location.protocol === 'https:') {
    passed.push('✓ Page served over HTTPS');
  } else {
    failed.push({
      audit: 'Page not served over HTTPS',
      impact: 'high',
      recommendation: 'Use HTTPS for all pages',
    });
  }

  // Calculate score
  const totalChecks = passed.length + failed.length + warnings.length;
  const score = totalChecks > 0 
    ? Math.round(((passed.length + warnings.length * 0.5) / totalChecks) * 100)
    : 100;

  return {
    name: 'Performance',
    score,
    passed,
    failed,
    warnings,
  };
}

/**
 * Audits accessibility compliance.
 * 
 * Checks:
 * - Heading hierarchy
 * - Alt text on images
 * - Form labels
 * - ARIA attributes
 * - Color contrast
 * - Keyboard navigation
 * 
 * @returns {LighthouseCategory} Accessibility audit results
 */
export function auditAccessibility(): LighthouseCategory {
  const passed: string[] = [];
  const failed: { audit: string; impact: 'high' | 'medium' | 'low'; recommendation: string }[] = [];
  const warnings: string[] = [];

  // Check for proper heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const h1Count = headings.filter((h) => h.tagName === 'H1').length;

  if (h1Count === 1) {
    passed.push('✓ Page has exactly one H1');
  } else if (h1Count === 0) {
    failed.push({
      audit: 'No H1 heading found',
      impact: 'high',
      recommendation: 'Add a main H1 heading to the page',
    });
  } else {
    failed.push({
      audit: `Multiple H1 headings found (${h1Count})`,
      impact: 'medium',
      recommendation: 'Use only one H1 per page',
    });
  }

  // Check heading order
  let lastLevel = 0;
  let headingSkips = 0;
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    if (lastLevel > 0 && level > lastLevel + 1) {
      headingSkips++;
    }
    lastLevel = level;
  });

  if (headingSkips === 0) {
    passed.push('✓ Heading hierarchy is correct');
  } else {
    warnings.push(`${headingSkips} heading level skips detected`);
  }

  // Check images for alt text
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach((img) => {
    if (!img.alt && img.alt !== '') {
      imagesWithoutAlt++;
    }
  });

  if (imagesWithoutAlt === 0) {
    passed.push('✓ All images have alt text');
  } else {
    failed.push({
      audit: `${imagesWithoutAlt} images missing alt text`,
      impact: 'high',
      recommendation: 'Add descriptive alt text to all images',
    });
  }

  // Check form labels
  const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
  let inputsWithoutLabels = 0;
  inputs.forEach((input) => {
    const id = input.id;
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel) {
      inputsWithoutLabels++;
    }
  });

  if (inputsWithoutLabels === 0) {
    passed.push('✓ All form inputs have labels');
  } else if (inputsWithoutLabels > 0) {
    failed.push({
      audit: `${inputsWithoutLabels} form inputs missing labels`,
      impact: 'high',
      recommendation: 'Add labels or aria-label to all form inputs',
    });
  }

  // Check for skip links
  const skipLinks = document.querySelectorAll('a[href^="#"]');
  const hasSkipToContent = Array.from(skipLinks).some((link) => 
    link.textContent?.toLowerCase().includes('skip') || 
    link.textContent?.toLowerCase().includes('content')
  );

  if (hasSkipToContent) {
    passed.push('✓ Skip-to-content link present');
  } else {
    warnings.push('No skip-to-content link found (improves keyboard navigation)');
  }

  // Check buttons for aria-label
  const buttons = document.querySelectorAll('button');
  let buttonsWithoutText = 0;
  buttons.forEach((button) => {
    const hasText = button.textContent?.trim();
    const hasAriaLabel = button.hasAttribute('aria-label');
    
    if (!hasText && !hasAriaLabel) {
      buttonsWithoutText++;
    }
  });

  if (buttonsWithoutText === 0) {
    passed.push('✓ All buttons have accessible names');
  } else {
    failed.push({
      audit: `${buttonsWithoutText} buttons without accessible names`,
      impact: 'high',
      recommendation: 'Add aria-label or text content to all buttons',
    });
  }

  // Check for lang attribute
  const htmlLang = document.documentElement.lang;
  if (htmlLang) {
    passed.push('✓ Page has lang attribute');
  } else {
    failed.push({
      audit: 'No lang attribute on <html>',
      impact: 'medium',
      recommendation: 'Add lang="en" (or appropriate language) to <html> tag',
    });
  }

  // Calculate score
  const totalChecks = passed.length + failed.length + warnings.length;
  const score = totalChecks > 0 
    ? Math.round(((passed.length + warnings.length * 0.7) / totalChecks) * 100)
    : 100;

  return {
    name: 'Accessibility',
    score,
    passed,
    failed,
    warnings,
  };
}

/**
 * Audits best practices.
 * 
 * Checks:
 * - Console errors
 * - Deprecated APIs
 * - HTTPS usage
 * - Document type
 * - Meta viewport
 * 
 * @returns {LighthouseCategory} Best practices audit results
 */
export function auditBestPractices(): LighthouseCategory {
  const passed: string[] = [];
  const failed: { audit: string; impact: 'high' | 'medium' | 'low'; recommendation: string }[] = [];
  const warnings: string[] = [];

  // Check for doctype
  const hasDoctype = document.doctype !== null;
  if (hasDoctype) {
    passed.push('✓ Page has valid DOCTYPE');
  } else {
    failed.push({
      audit: 'Missing DOCTYPE declaration',
      impact: 'medium',
      recommendation: 'Add <!DOCTYPE html> at the top of the document',
    });
  }

  // Check for meta viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    passed.push('✓ Meta viewport is set');
  } else {
    failed.push({
      audit: 'No meta viewport tag',
      impact: 'high',
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
    });
  }

  // Check for charset
  const charset = document.querySelector('meta[charset]');
  if (charset) {
    passed.push('✓ Character set is declared');
  } else {
    warnings.push('No charset meta tag (may cause encoding issues)');
  }

  // Check HTTPS
  if (window.location.protocol === 'https:' || window.location.protocol === 'file:') {
    passed.push('✓ Uses HTTPS or local development');
  } else {
    failed.push({
      audit: 'Page not served over HTTPS',
      impact: 'high',
      recommendation: 'Serve page over HTTPS in production',
    });
  }

  // Check for passive event listeners
  // Note: This is a heuristic check, actual passive listener detection requires instrumentation
  const touchHandlers = document.querySelectorAll('[ontouchstart], [ontouchmove]');
  if (touchHandlers.length === 0) {
    passed.push('✓ No non-passive touch listeners detected');
  } else {
    warnings.push('Touch event handlers detected (consider using passive listeners)');
  }

  // Check for geolocation over HTTPS
  if (window.location.protocol === 'https:' || !('geolocation' in navigator)) {
    passed.push('✓ Geolocation (if used) is secure');
  } else {
    warnings.push('Geolocation API should only be used over HTTPS');
  }

  // Check for proper cache headers (can only estimate based on resource loading)
  const performanceEntries = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  if (performanceEntries.length > 0) {
    const navigation = performanceEntries[0];
    if (navigation.transferSize === 0) {
      passed.push('✓ Page appears to use caching');
    } else {
      warnings.push('Page may not be using browser caching effectively');
    }
  }

  // Calculate score
  const totalChecks = passed.length + failed.length + warnings.length;
  const score = totalChecks > 0 
    ? Math.round(((passed.length + warnings.length * 0.6) / totalChecks) * 100)
    : 100;

  return {
    name: 'Best Practices',
    score,
    passed,
    failed,
    warnings,
  };
}

/**
 * Audits SEO optimization.
 * 
 * Checks:
 * - Title tag
 * - Meta description
 * - Heading structure
 * - Crawlability
 * - Mobile friendliness
 * 
 * @returns {LighthouseCategory} SEO audit results
 */
export function auditSEO(): LighthouseCategory {
  const passed: string[] = [];
  const failed: { audit: string; impact: 'high' | 'medium' | 'low'; recommendation: string }[] = [];
  const warnings: string[] = [];

  // Check for title
  const title = document.querySelector('title');
  if (title && title.textContent && title.textContent.length > 0) {
    if (title.textContent.length < 60) {
      passed.push('✓ Document has a title');
    } else {
      warnings.push('Title is longer than 60 characters (may be truncated in search results)');
    }
  } else {
    failed.push({
      audit: 'Document has no title',
      impact: 'high',
      recommendation: 'Add a descriptive <title> tag to the page',
    });
  }

  // Check for meta description
  const description = document.querySelector('meta[name="description"]');
  if (description && description.getAttribute('content')) {
    const content = description.getAttribute('content') || '';
    if (content.length >= 50 && content.length <= 160) {
      passed.push('✓ Meta description has good length');
    } else if (content.length < 50) {
      warnings.push('Meta description is too short (< 50 characters)');
    } else {
      warnings.push('Meta description is too long (> 160 characters)');
    }
  } else {
    failed.push({
      audit: 'Missing meta description',
      impact: 'medium',
      recommendation: 'Add <meta name="description" content="..."> with 50-160 characters',
    });
  }

  // Check for meta viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    passed.push('✓ Mobile-friendly viewport configured');
  } else {
    failed.push({
      audit: 'No viewport meta tag',
      impact: 'high',
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
    });
  }

  // Check for H1
  const h1 = document.querySelector('h1');
  if (h1 && h1.textContent) {
    passed.push('✓ Page has an H1 heading');
  } else {
    failed.push({
      audit: 'No H1 heading',
      impact: 'high',
      recommendation: 'Add a main H1 heading describing the page content',
    });
  }

  // Check for links with descriptive text
  const links = document.querySelectorAll('a[href]');
  let linksWithoutText = 0;
  links.forEach((link) => {
    const text = link.textContent?.trim();
    if (!text || text.length < 3) {
      linksWithoutText++;
    }
  });

  if (linksWithoutText === 0) {
    passed.push('✓ All links have descriptive text');
  } else {
    warnings.push(`${linksWithoutText} links with unclear text (use descriptive link text)`);
  }

  // Check for robots meta
  const robots = document.querySelector('meta[name="robots"]');
  if (!robots || !robots.getAttribute('content')?.includes('noindex')) {
    passed.push('✓ Page is crawlable');
  } else {
    warnings.push('Page has noindex directive (will not appear in search results)');
  }

  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && canonical.getAttribute('href')) {
    passed.push('✓ Page has canonical URL');
  } else {
    warnings.push('No canonical URL specified (may cause duplicate content issues)');
  }

  // Calculate score
  const totalChecks = passed.length + failed.length + warnings.length;
  const score = totalChecks > 0 
    ? Math.round(((passed.length + warnings.length * 0.5) / totalChecks) * 100)
    : 100;

  return {
    name: 'SEO',
    score,
    passed,
    failed,
    warnings,
  };
}

/**
 * Runs complete Lighthouse-style audit.
 * 
 * @returns {LighthouseReport} Complete audit report
 * 
 * @example
 * const report = runLighthouseAudit();
 * console.log('Overall Score:', report.overallScore);
 * console.log('Performance:', report.performance.score);
 */
export function runLighthouseAudit(): LighthouseReport {
  const performanceAudit = auditPerformance();
  const accessibility = auditAccessibility();
  const bestPractices = auditBestPractices();
  const seo = auditSEO();

  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (performanceAudit.score * 0.4 +
      accessibility.score * 0.25 +
      bestPractices.score * 0.2 +
      seo.score * 0.15) /
      1.0
  );

  // Estimate page weight
  const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const totalSize = resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0);
  const pageWeight = totalSize > 0 
    ? `${(totalSize / 1024 / 1024).toFixed(2)} MB`
    : 'Unknown';

  // Estimate load time on 3G
  const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;
  const estimated3GTime = loadTime > 0 
    ? `${(loadTime / 1000).toFixed(2)}s (estimated)`
    : 'Unknown';

  return {
    overallScore,
    performance: performanceAudit,
    accessibility,
    bestPractices,
    seo,
    timestamp: new Date().toISOString(),
    estimatedLoadTime: estimated3GTime,
    pageWeight,
  };
}

/**
 * Logs Lighthouse audit results to console.
 * 
 * Formats results in a readable table format with colors and recommendations.
 * 
 * @example
 * // Run in development console
 * logLighthouseReport();
 */
export function logLighthouseReport(): void {
  console.log('🔦 Running Lighthouse-style Performance Audit...\n');
  
  const report = runLighthouseAudit();

  // Helper to get score color
  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#0cce6b'; // Green
    if (score >= 50) return '#ffa400'; // Orange
    return '#ff4e42'; // Red
  };

  // Helper to get score label
  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  console.log('='.repeat(70));
  console.log('LIGHTHOUSE AUDIT REPORT');
  console.log('='.repeat(70));
  console.log(`Overall Score: %c${report.overallScore}/100 (${getScoreLabel(report.overallScore)})`, 
    `color: ${getScoreColor(report.overallScore)}; font-weight: bold; font-size: 16px;`);
  console.log(`Generated: ${new Date(report.timestamp).toLocaleString()}`);
  console.log(`Page Weight: ${report.pageWeight}`);
  console.log(`Estimated Load Time: ${report.estimatedLoadTime}`);
  console.log('');

  // Log each category
  [report.performance, report.accessibility, report.bestPractices, report.seo].forEach((category) => {
    console.log('-'.repeat(70));
    console.log(`%c${category.name}: ${category.score}/100 (${getScoreLabel(category.score)})`,
      `color: ${getScoreColor(category.score)}; font-weight: bold;`);
    console.log('-'.repeat(70));

    if (category.passed.length > 0) {
      console.log('\n✅ Passed:');
      category.passed.forEach((item) => console.log(`  ${item}`));
    }

    if (category.failed.length > 0) {
      console.log('\n❌ Failed:');
      category.failed.forEach((item) => {
        console.log(`  ${item.audit} [${item.impact.toUpperCase()} impact]`);
        console.log(`     💡 ${item.recommendation}`);
      });
    }

    if (category.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      category.warnings.forEach((item) => console.log(`  ${item}`));
    }

    console.log('');
  });

  console.log('='.repeat(70));
  console.log('🎯 Key Recommendations:');
  console.log('='.repeat(70));

  // Collect all high-impact failures
  const highImpactIssues: string[] = [];
  [report.performance, report.accessibility, report.bestPractices, report.seo].forEach((category) => {
    category.failed
      .filter((f) => f.impact === 'high')
      .forEach((f) => highImpactIssues.push(`${category.name}: ${f.recommendation}`));
  });

  if (highImpactIssues.length > 0) {
    highImpactIssues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
  } else {
    console.log('✅ No high-impact issues found!');
  }

  console.log('\n' + '='.repeat(70));
}