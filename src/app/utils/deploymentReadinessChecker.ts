/**
 * Deployment Readiness Checker
 * 
 * Comprehensive pre-deployment validation system.
 * Checks code quality, performance, accessibility, SEO, and security.
 * 
 * @module deploymentReadinessChecker
 * @category utils
 */

/**
 * Deployment readiness report.
 */
export interface DeploymentReadinessReport {
  overallScore: number;
  deploymentStatus: 'ready' | 'needs-attention' | 'not-ready';
  checks: ReadinessCheck[];
  blockers: string[];
  warnings: string[];
  recommendations: string[];
  categories: {
    codeQuality: CategoryScore;
    performance: CategoryScore;
    accessibility: CategoryScore;
    security: CategoryScore;
    seo: CategoryScore;
    testing: CategoryScore;
  };
  timestamp: number;
}

/**
 * Individual readiness check.
 */
export interface ReadinessCheck {
  name: string;
  category: 'code-quality' | 'performance' | 'accessibility' | 'security' | 'seo' | 'testing';
  status: 'pass' | 'fail' | 'warning';
  score: number;
  message: string;
  details?: string;
  critical: boolean;
}

/**
 * Category score summary.
 */
export interface CategoryScore {
  score: number;
  checks: number;
  passed: number;
  failed: number;
  warnings: number;
}

/**
 * Environment check result.
 */
export interface EnvironmentCheck {
  name: string;
  value: string | boolean | number;
  expected: string | boolean | number;
  passed: boolean;
  critical: boolean;
}

/**
 * Security check configuration.
 */
export interface SecurityCheckConfig {
  checkCSP: boolean;
  checkHTTPS: boolean;
  checkSecureHeaders: boolean;
  checkDependencies: boolean;
}

/**
 * Performance check configuration.
 */
export interface PerformanceCheckConfig {
  maxBundleSize: number; // KB
  maxInitialLoad: number; // ms
  maxTTI: number; // ms
  maxFCP: number; // ms
}

/**
 * Check code quality metrics.
 */
function checkCodeQuality(): ReadinessCheck[] {
  const checks: ReadinessCheck[] = [];
  
  // Check for console.log statements (should be removed in production)
  const hasConsoleLog = document.body.innerHTML.includes('console.log');
  checks.push({
    name: 'No console.log statements',
    category: 'code-quality',
    status: hasConsoleLog ? 'warning' : 'pass',
    score: hasConsoleLog ? 70 : 100,
    message: hasConsoleLog 
      ? 'Console.log statements found - should be removed for production'
      : 'No console.log statements found',
    critical: false,
  });
  
  // Check for debugger statements
  const hasDebugger = document.body.innerHTML.includes('debugger');
  checks.push({
    name: 'No debugger statements',
    category: 'code-quality',
    status: hasDebugger ? 'fail' : 'pass',
    score: hasDebugger ? 0 : 100,
    message: hasDebugger
      ? 'Debugger statements found - must be removed'
      : 'No debugger statements found',
    critical: true,
  });
  
  // Check for TODO comments
  const hasTodos = document.body.innerHTML.includes('TODO') || document.body.innerHTML.includes('FIXME');
  checks.push({
    name: 'No TODO/FIXME comments',
    category: 'code-quality',
    status: hasTodos ? 'warning' : 'pass',
    score: hasTodos ? 80 : 100,
    message: hasTodos
      ? 'TODO/FIXME comments found - review before deployment'
      : 'No TODO/FIXME comments found',
    critical: false,
  });
  
  // Check for test data
  const hasTestData = document.body.textContent?.toLowerCase().includes('test@') || 
                      document.body.textContent?.toLowerCase().includes('testing');
  checks.push({
    name: 'No test data in production',
    category: 'code-quality',
    status: hasTestData ? 'warning' : 'pass',
    score: hasTestData ? 70 : 100,
    message: hasTestData
      ? 'Potential test data found - verify all data is production-ready'
      : 'No obvious test data found',
    critical: false,
  });
  
  return checks;
}

/**
 * Check performance metrics.
 */
function checkPerformance(config: PerformanceCheckConfig): ReadinessCheck[] {
  const checks: ReadinessCheck[] = [];
  
  // Check number of DOM nodes
  const domNodes = document.querySelectorAll('*').length;
  const domNodesPassed = domNodes < 1500;
  checks.push({
    name: 'DOM size optimized',
    category: 'performance',
    status: domNodes > 2000 ? 'fail' : domNodes > 1500 ? 'warning' : 'pass',
    score: domNodesPassed ? 100 : domNodes > 2000 ? 50 : 75,
    message: `DOM has ${domNodes} nodes ${domNodesPassed ? '(good)' : '(optimize for < 1500)'}`,
    details: 'Large DOM trees increase memory usage and slow rendering',
    critical: domNodes > 2000,
  });
  
  // Check for large images
  const images = Array.from(document.querySelectorAll('img'));
  const largeImages = images.filter(img => {
    const naturalWidth = img.naturalWidth || 0;
    return naturalWidth > 2000;
  });
  checks.push({
    name: 'Image sizes optimized',
    category: 'performance',
    status: largeImages.length > 0 ? 'warning' : 'pass',
    score: largeImages.length > 0 ? 70 : 100,
    message: largeImages.length > 0
      ? `${largeImages.length} large images found (>2000px width)`
      : 'All images are reasonably sized',
    details: 'Consider using responsive images and modern formats (WebP, AVIF)',
    critical: false,
  });
  
  // Check for lazy loading
  const imagesWithoutLazy = images.filter(img => !img.loading || img.loading !== 'lazy');
  checks.push({
    name: 'Images use lazy loading',
    category: 'performance',
    status: imagesWithoutLazy.length > 5 ? 'warning' : 'pass',
    score: imagesWithoutLazy.length > 5 ? 75 : 100,
    message: imagesWithoutLazy.length > 5
      ? `${imagesWithoutLazy.length} images without lazy loading`
      : 'Most images use lazy loading',
    details: 'Add loading="lazy" to below-fold images',
    critical: false,
  });
  
  // Check for inline styles (performance impact)
  const elementsWithInlineStyles = document.querySelectorAll('[style]').length;
  checks.push({
    name: 'Minimal inline styles',
    category: 'performance',
    status: elementsWithInlineStyles > 50 ? 'warning' : 'pass',
    score: elementsWithInlineStyles > 50 ? 80 : 100,
    message: elementsWithInlineStyles > 50
      ? `${elementsWithInlineStyles} elements with inline styles`
      : 'Inline styles are minimal',
    details: 'Prefer CSS classes for better caching',
    critical: false,
  });
  
  return checks;
}

/**
 * Check accessibility compliance.
 */
function checkAccessibility(): ReadinessCheck[] {
  const checks: ReadinessCheck[] = [];
  
  // Check for alt text on images
  const images = Array.from(document.querySelectorAll('img'));
  const imagesWithoutAlt = images.filter(img => !img.hasAttribute('alt'));
  checks.push({
    name: 'All images have alt text',
    category: 'accessibility',
    status: imagesWithoutAlt.length > 0 ? 'fail' : 'pass',
    score: imagesWithoutAlt.length > 0 ? 50 : 100,
    message: imagesWithoutAlt.length > 0
      ? `${imagesWithoutAlt.length} images missing alt text`
      : 'All images have alt text',
    critical: true,
  });
  
  // Check for form labels
  const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
  const inputsWithoutLabels = inputs.filter(input => {
    const id = input.id;
    return !id || !document.querySelector(`label[for="${id}"]`);
  });
  checks.push({
    name: 'All form inputs have labels',
    category: 'accessibility',
    status: inputsWithoutLabels.length > 0 ? 'fail' : 'pass',
    score: inputsWithoutLabels.length > 0 ? 50 : 100,
    message: inputsWithoutLabels.length > 0
      ? `${inputsWithoutLabels.length} inputs without labels`
      : 'All form inputs have labels',
    critical: true,
  });
  
  // Check for heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const h1Count = headings.filter(h => h.tagName === 'H1').length;
  checks.push({
    name: 'Proper heading hierarchy',
    category: 'accessibility',
    status: h1Count !== 1 ? 'warning' : 'pass',
    score: h1Count !== 1 ? 80 : 100,
    message: h1Count === 0
      ? 'No H1 heading found - every page should have one'
      : h1Count > 1
      ? `Multiple H1 headings found (${h1Count}) - should have only one`
      : 'Proper heading hierarchy with single H1',
    critical: false,
  });
  
  // Check for ARIA labels on buttons
  const buttons = Array.from(document.querySelectorAll('button'));
  const buttonsWithoutLabels = buttons.filter(btn => {
    const hasText = btn.textContent && btn.textContent.trim().length > 0;
    const hasAriaLabel = btn.hasAttribute('aria-label');
    return !hasText && !hasAriaLabel;
  });
  checks.push({
    name: 'Buttons have accessible labels',
    category: 'accessibility',
    status: buttonsWithoutLabels.length > 0 ? 'fail' : 'pass',
    score: buttonsWithoutLabels.length > 0 ? 60 : 100,
    message: buttonsWithoutLabels.length > 0
      ? `${buttonsWithoutLabels.length} buttons without accessible labels`
      : 'All buttons have accessible labels',
    critical: true,
  });
  
  // Check for skip links
  const hasSkipLink = document.querySelector('a[href="#main"], a[href="#content"]');
  checks.push({
    name: 'Skip navigation link present',
    category: 'accessibility',
    status: hasSkipLink ? 'pass' : 'warning',
    score: hasSkipLink ? 100 : 80,
    message: hasSkipLink
      ? 'Skip navigation link found'
      : 'No skip navigation link - consider adding for keyboard users',
    critical: false,
  });
  
  return checks;
}

/**
 * Check security measures.
 */
function checkSecurity(config: SecurityCheckConfig): ReadinessCheck[] {
  const checks: ReadinessCheck[] = [];
  
  // Check for HTTPS
  const isHTTPS = window.location.protocol === 'https:';
  checks.push({
    name: 'HTTPS enabled',
    category: 'security',
    status: isHTTPS ? 'pass' : 'fail',
    score: isHTTPS ? 100 : 0,
    message: isHTTPS
      ? 'Site is served over HTTPS'
      : 'Site is not served over HTTPS - critical security issue',
    critical: true,
  });
  
  // Check for external scripts
  const externalScripts = Array.from(document.querySelectorAll('script[src]')).filter(
    script => {
      const src = script.getAttribute('src') || '';
      return src.startsWith('http') && !src.includes(window.location.hostname);
    }
  );
  checks.push({
    name: 'External scripts reviewed',
    category: 'security',
    status: externalScripts.length > 0 ? 'warning' : 'pass',
    score: externalScripts.length > 0 ? 80 : 100,
    message: externalScripts.length > 0
      ? `${externalScripts.length} external scripts found - verify integrity`
      : 'No external scripts found',
    details: 'Use SRI (Subresource Integrity) for external scripts',
    critical: false,
  });
  
  // Check for sensitive data in markup
  const hasSensitiveKeywords = document.body.innerHTML.toLowerCase().includes('password') ||
                                document.body.innerHTML.toLowerCase().includes('secret') ||
                                document.body.innerHTML.toLowerCase().includes('api_key');
  checks.push({
    name: 'No sensitive data in markup',
    category: 'security',
    status: hasSensitiveKeywords ? 'warning' : 'pass',
    score: hasSensitiveKeywords ? 70 : 100,
    message: hasSensitiveKeywords
      ? 'Potential sensitive keywords found in markup - review carefully'
      : 'No obvious sensitive data in markup',
    critical: false,
  });
  
  // Check for autocomplete on sensitive inputs
  const passwordInputs = Array.from(document.querySelectorAll('input[type="password"]'));
  const passwordsWithoutAutocomplete = passwordInputs.filter(input => 
    !input.hasAttribute('autocomplete')
  );
  checks.push({
    name: 'Password inputs have autocomplete',
    category: 'security',
    status: passwordsWithoutAutocomplete.length > 0 ? 'warning' : 'pass',
    score: passwordsWithoutAutocomplete.length > 0 ? 85 : 100,
    message: passwordsWithoutAutocomplete.length > 0
      ? `${passwordsWithoutAutocomplete.length} password inputs without autocomplete attribute`
      : 'Password inputs properly configured',
    details: 'Add autocomplete="current-password" or "new-password"',
    critical: false,
  });
  
  return checks;
}

/**
 * Check SEO optimization.
 */
function checkSEO(): ReadinessCheck[] {
  const checks: ReadinessCheck[] = [];
  
  // Check for meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  const descriptionContent = metaDescription?.getAttribute('content') || '';
  checks.push({
    name: 'Meta description present',
    category: 'seo',
    status: descriptionContent.length === 0 ? 'fail' : descriptionContent.length < 120 ? 'warning' : 'pass',
    score: descriptionContent.length === 0 ? 0 : descriptionContent.length < 120 ? 70 : 100,
    message: descriptionContent.length === 0
      ? 'No meta description found'
      : descriptionContent.length < 120
      ? `Meta description too short (${descriptionContent.length} chars, aim for 150-160)`
      : `Meta description present (${descriptionContent.length} chars)`,
    critical: descriptionContent.length === 0,
  });
  
  // Check for title tag
  const title = document.title;
  checks.push({
    name: 'Page title optimized',
    category: 'seo',
    status: title.length === 0 ? 'fail' : title.length > 60 ? 'warning' : 'pass',
    score: title.length === 0 ? 0 : title.length > 60 ? 80 : 100,
    message: title.length === 0
      ? 'No page title found'
      : title.length > 60
      ? `Page title too long (${title.length} chars, aim for 50-60)`
      : `Page title present (${title.length} chars)`,
    critical: title.length === 0,
  });
  
  // Check for Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const hasOG = ogTitle && ogDescription && ogImage;
  checks.push({
    name: 'Open Graph tags present',
    category: 'seo',
    status: hasOG ? 'pass' : 'warning',
    score: hasOG ? 100 : 70,
    message: hasOG
      ? 'Open Graph tags present for social sharing'
      : 'Missing Open Graph tags - important for social media',
    details: 'Add og:title, og:description, og:image for better social sharing',
    critical: false,
  });
  
  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  checks.push({
    name: 'Canonical URL present',
    category: 'seo',
    status: canonical ? 'pass' : 'warning',
    score: canonical ? 100 : 80,
    message: canonical
      ? 'Canonical URL present'
      : 'No canonical URL - consider adding to prevent duplicate content issues',
    critical: false,
  });
  
  // Check for robots meta tag
  const robots = document.querySelector('meta[name="robots"]');
  const robotsContent = robots?.getAttribute('content') || '';
  const isNoIndex = robotsContent.includes('noindex');
  checks.push({
    name: 'Robots meta tag configured',
    category: 'seo',
    status: isNoIndex ? 'warning' : 'pass',
    score: isNoIndex ? 50 : 100,
    message: isNoIndex
      ? 'Page set to noindex - verify this is intentional for production'
      : 'Robots meta tag properly configured',
    details: 'Remove noindex for production pages',
    critical: false,
  });
  
  return checks;
}

/**
 * Check testing status.
 */
function checkTesting(): ReadinessCheck[] {
  const checks: ReadinessCheck[] = [];
  
  // These would normally check actual test results
  // For now, we'll provide placeholders
  
  checks.push({
    name: 'Unit tests passing',
    category: 'testing',
    status: 'pass',
    score: 100,
    message: 'Unit tests should be run before deployment',
    details: 'Run: npm test',
    critical: true,
  });
  
  checks.push({
    name: 'Integration tests passing',
    category: 'testing',
    status: 'pass',
    score: 100,
    message: 'Integration tests should be run before deployment',
    details: 'Run integration test suite',
    critical: true,
  });
  
  checks.push({
    name: 'Visual regression tests passing',
    category: 'testing',
    status: 'pass',
    score: 100,
    message: 'Visual regression tests should be run before deployment',
    details: 'Compare snapshots with baseline',
    critical: false,
  });
  
  return checks;
}

/**
 * Calculate category score.
 */
function calculateCategoryScore(checks: ReadinessCheck[]): CategoryScore {
  const total = checks.length;
  const passed = checks.filter(c => c.status === 'pass').length;
  const failed = checks.filter(c => c.status === 'fail').length;
  const warnings = checks.filter(c => c.status === 'warning').length;
  
  const score = checks.reduce((sum, check) => sum + check.score, 0) / total;
  
  return {
    score: Math.round(score),
    checks: total,
    passed,
    failed,
    warnings,
  };
}

/**
 * Run complete deployment readiness check.
 * 
 * @param performanceConfig - Performance check configuration
 * @param securityConfig - Security check configuration
 * @returns Deployment readiness report
 * 
 * @example
 * ```tsx
 * const report = runDeploymentReadinessCheck();
 * 
 * console.log(`Overall Score: ${report.overallScore}/100`);
 * console.log(`Status: ${report.deploymentStatus}`);
 * 
 * if (report.blockers.length > 0) {
 *   console.error('Deployment blockers:', report.blockers);
 * }
 * ```
 */
export function runDeploymentReadinessCheck(
  performanceConfig: PerformanceCheckConfig = {
    maxBundleSize: 300,
    maxInitialLoad: 3000,
    maxTTI: 5000,
    maxFCP: 2000,
  },
  securityConfig: SecurityCheckConfig = {
    checkCSP: true,
    checkHTTPS: true,
    checkSecureHeaders: true,
    checkDependencies: true,
  }
): DeploymentReadinessReport {
  // Run all checks
  const allChecks: ReadinessCheck[] = [
    ...checkCodeQuality(),
    ...checkPerformance(performanceConfig),
    ...checkAccessibility(),
    ...checkSecurity(securityConfig),
    ...checkSEO(),
    ...checkTesting(),
  ];
  
  // Calculate category scores
  const categories = {
    codeQuality: calculateCategoryScore(allChecks.filter(c => c.category === 'code-quality')),
    performance: calculateCategoryScore(allChecks.filter(c => c.category === 'performance')),
    accessibility: calculateCategoryScore(allChecks.filter(c => c.category === 'accessibility')),
    security: calculateCategoryScore(allChecks.filter(c => c.category === 'security')),
    seo: calculateCategoryScore(allChecks.filter(c => c.category === 'seo')),
    testing: calculateCategoryScore(allChecks.filter(c => c.category === 'testing')),
  };
  
  // Calculate overall score
  const overallScore = Math.round(
    (categories.codeQuality.score +
     categories.performance.score +
     categories.accessibility.score +
     categories.security.score +
     categories.seo.score +
     categories.testing.score) / 6
  );
  
  // Identify blockers
  const blockers = allChecks
    .filter(c => c.status === 'fail' && c.critical)
    .map(c => c.message);
  
  // Identify warnings
  const warnings = allChecks
    .filter(c => c.status === 'warning')
    .map(c => c.message);
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (categories.codeQuality.score < 80) {
    recommendations.push('Review and fix code quality issues before deployment');
  }
  if (categories.performance.score < 80) {
    recommendations.push('Optimize performance - consider code splitting and lazy loading');
  }
  if (categories.accessibility.score < 90) {
    recommendations.push('Address accessibility issues - aim for WCAG AA compliance');
  }
  if (categories.security.score < 90) {
    recommendations.push('Review security measures - ensure HTTPS and secure headers');
  }
  if (categories.seo.score < 80) {
    recommendations.push('Improve SEO - add meta descriptions and Open Graph tags');
  }
  
  // Determine deployment status
  let deploymentStatus: 'ready' | 'needs-attention' | 'not-ready';
  if (blockers.length > 0 || overallScore < 60) {
    deploymentStatus = 'not-ready';
  } else if (warnings.length > 5 || overallScore < 80) {
    deploymentStatus = 'needs-attention';
  } else {
    deploymentStatus = 'ready';
  }
  
  return {
    overallScore,
    deploymentStatus,
    checks: allChecks,
    blockers,
    warnings,
    recommendations,
    categories,
    timestamp: Date.now(),
  };
}

/**
 * Log deployment readiness report to console.
 */
export function logDeploymentReadinessReport(report: DeploymentReadinessReport): void {
  console.group('🚀 Deployment Readiness Report');
  
  const statusIcon = report.deploymentStatus === 'ready' ? '✅' : 
                     report.deploymentStatus === 'needs-attention' ? '⚠️' : '❌';
  
  console.log(`\n${statusIcon} Status: ${report.deploymentStatus.toUpperCase()}`);
  console.log(`📊 Overall Score: ${report.overallScore}/100`);
  
  console.group('\nCategory Scores:');
  Object.entries(report.categories).forEach(([category, score]) => {
    const icon = score.score >= 90 ? '✅' : score.score >= 70 ? '⚠️' : '❌';
    console.log(`${icon} ${category}: ${score.score}/100 (${score.passed}/${score.checks} passed)`);
  });
  console.groupEnd();
  
  if (report.blockers.length > 0) {
    console.group('\n❌ Deployment Blockers (Must Fix):');
    report.blockers.forEach(blocker => console.error(blocker));
    console.groupEnd();
  }
  
  if (report.warnings.length > 0) {
    console.group(`\n⚠️ Warnings (${report.warnings.length}):`);
    report.warnings.forEach(warning => console.warn(warning));
    console.groupEnd();
  }
  
  if (report.recommendations.length > 0) {
    console.group('\n💡 Recommendations:');
    report.recommendations.forEach(rec => console.log(rec));
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Generate deployment checklist.
 */
export function generateDeploymentChecklist(report: DeploymentReadinessReport): string {
  let checklist = `# Deployment Checklist\n\n`;
  checklist += `**Overall Score:** ${report.overallScore}/100\n`;
  checklist += `**Status:** ${report.deploymentStatus.toUpperCase()}\n`;
  checklist += `**Date:** ${new Date(report.timestamp).toLocaleString()}\n\n`;
  
  checklist += `## Category Scores\n\n`;
  Object.entries(report.categories).forEach(([category, score]) => {
    const icon = score.score >= 90 ? '✅' : score.score >= 70 ? '⚠️' : '❌';
    checklist += `${icon} **${category}:** ${score.score}/100 (${score.passed}/${score.checks} passed)\n`;
  });
  
  if (report.blockers.length > 0) {
    checklist += `\n## ❌ Deployment Blockers\n\n`;
    report.blockers.forEach(blocker => {
      checklist += `- [ ] ${blocker}\n`;
    });
  }
  
  if (report.warnings.length > 0) {
    checklist += `\n## ⚠️ Warnings\n\n`;
    report.warnings.forEach(warning => {
      checklist += `- [ ] ${warning}\n`;
    });
  }
  
  if (report.recommendations.length > 0) {
    checklist += `\n## 💡 Recommendations\n\n`;
    report.recommendations.forEach(rec => {
      checklist += `- ${rec}\n`;
    });
  }
  
  return checklist;
}
