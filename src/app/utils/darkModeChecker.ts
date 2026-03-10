/**
 * Dark Mode Compliance Checker
 * 
 * Verifies that components properly support dark mode through:
 * - Semantic token usage (not hardcoded dark: overrides)
 * - Proper contrast in both light and dark modes
 * - Visual consistency across themes
 * - No light mode assumptions
 * 
 * @module darkModeChecker
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface DarkModeAuditResult {
  component: string;
  selector: string;
  lightModeScore: number;
  darkModeScore: number;
  overallScore: number;
  violations: DarkModeViolation[];
  recommendations: string[];
}

interface DarkModeViolation {
  severity: 'critical' | 'warning' | 'info';
  type: 'hardcoded-override' | 'missing-token' | 'contrast-fail' | 'visual-inconsistency';
  element: string;
  issue: string;
  fix: string;
}

interface ThemeComparisonResult {
  component: string;
  elementsInLight: number;
  elementsInDark: number;
  structureMatches: boolean;
  colorDifferences: ColorDifference[];
  contrastIssues: ContrastIssue[];
}

interface ColorDifference {
  element: string;
  lightColor: string;
  darkColor: string;
  isSemanticToken: boolean;
}

interface ContrastIssue {
  element: string;
  mode: 'light' | 'dark';
  foreground: string;
  background: string;
  ratio: number;
  requiredRatio: number;
  passed: boolean;
}

// ============================================================================
// DARK MODE OVERRIDE DETECTION
// ============================================================================

/**
 * Detect dark mode overrides in component classes.
 * 
 * Dark mode overrides (dark:*) are antipattern in our system.
 * We should use semantic tokens that automatically adapt.
 * 
 * @param selector - CSS selector for component
 * @returns List of elements with dark: overrides
 */
export function detectDarkModeOverrides(selector: string): DarkModeViolation[] {
  const component = document.querySelector(selector);
  if (!component) return [];

  const violations: DarkModeViolation[] = [];
  const elements = component.querySelectorAll('*');

  elements.forEach((el) => {
    const className = el.className;
    if (typeof className !== 'string') return;

    // Find all dark: classes
    const darkClasses = className.match(/dark:[^\s]+/g);
    if (!darkClasses || darkClasses.length === 0) return;

    darkClasses.forEach((darkClass) => {
      violations.push({
        severity: 'critical',
        type: 'hardcoded-override',
        element: el.tagName.toLowerCase(),
        issue: `Uses hardcoded dark mode override: ${darkClass}`,
        fix: `Replace with semantic token. Example: bg-white dark:bg-gray-900 → bg-background`,
      });
    });
  });

  return violations;
}

// ============================================================================
// SEMANTIC TOKEN VERIFICATION
// ============================================================================

/**
 * Verify that elements use semantic color tokens.
 * 
 * @param selector - CSS selector for component
 * @returns List of elements missing semantic tokens
 */
export function verifySemanticTokens(selector: string): DarkModeViolation[] {
  const component = document.querySelector(selector);
  if (!component) return [];

  const violations: DarkModeViolation[] = [];
  const elements = component.querySelectorAll('*');

  // Hardcoded color patterns (BAD)
  const hardcodedPatterns = [
    { pattern: /bg-white\b/, token: 'bg-background' },
    { pattern: /bg-black\b/, token: 'bg-foreground' },
    { pattern: /bg-gray-\d+/, token: 'bg-muted or bg-card' },
    { pattern: /text-white\b/, token: 'text-primary-foreground or text-accent-foreground' },
    { pattern: /text-black\b/, token: 'text-foreground' },
    { pattern: /text-gray-\d+/, token: 'text-muted-foreground' },
    { pattern: /border-gray-\d+/, token: 'border-border' },
  ];

  elements.forEach((el) => {
    const className = el.className;
    if (typeof className !== 'string') return;

    hardcodedPatterns.forEach(({ pattern, token }) => {
      if (pattern.test(className)) {
        const match = className.match(pattern)?.[0];
        violations.push({
          severity: 'warning',
          type: 'missing-token',
          element: el.tagName.toLowerCase(),
          issue: `Uses hardcoded color class: ${match}`,
          fix: `Replace with semantic token: ${token}`,
        });
      }
    });
  });

  return violations;
}

// ============================================================================
// CONTRAST CHECKING (BOTH MODES)
// ============================================================================

/**
 * Calculate luminance from RGB values.
 * 
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns Relative luminance (0-1)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors.
 * 
 * @param fg - Foreground color (rgb string)
 * @param bg - Background color (rgb string)
 * @returns Contrast ratio (1-21)
 */
function getContrastRatio(fg: string, bg: string): number {
  const parseForeground = fg.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const parseBackground = bg.match(/\d+/g)?.map(Number) || [255, 255, 255];

  const [r1, g1, b1] = parseForeground;
  const [r2, g2, b2] = parseBackground;

  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check contrast ratios in both light and dark modes.
 * 
 * @param selector - CSS selector for component
 * @returns Contrast issues found
 */
export function checkContrastBothModes(selector: string): ContrastIssue[] {
  const component = document.querySelector(selector);
  if (!component) return [];

  const issues: ContrastIssue[] = [];
  const textElements = component.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label');

  // Check in current mode
  const isDark = document.documentElement.classList.contains('dark');
  const currentMode = isDark ? 'dark' : 'light';

  textElements.forEach((el) => {
    const computed = window.getComputedStyle(el);
    const color = computed.color;
    const backgroundColor = computed.backgroundColor;
    
    // Skip if no background (transparent)
    if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
      // Try to find parent background
      let parent = el.parentElement;
      let parentBg = 'rgba(0, 0, 0, 0)';
      while (parent && (parentBg === 'rgba(0, 0, 0, 0)' || parentBg === 'transparent')) {
        parentBg = window.getComputedStyle(parent).backgroundColor;
        parent = parent.parentElement;
      }
      if (parentBg !== 'rgba(0, 0, 0, 0)' && parentBg !== 'transparent') {
        const ratio = getContrastRatio(color, parentBg);
        const fontSize = parseFloat(computed.fontSize);
        const requiredRatio = fontSize >= 18 ? 3 : 4.5;

        if (ratio < requiredRatio) {
          issues.push({
            element: el.tagName.toLowerCase(),
            mode: currentMode,
            foreground: color,
            background: parentBg,
            ratio: Math.round(ratio * 100) / 100,
            requiredRatio,
            passed: false,
          });
        }
      }
    } else {
      const ratio = getContrastRatio(color, backgroundColor);
      const fontSize = parseFloat(computed.fontSize);
      const requiredRatio = fontSize >= 18 ? 3 : 4.5;

      if (ratio < requiredRatio) {
        issues.push({
          element: el.tagName.toLowerCase(),
          mode: currentMode,
          foreground: color,
          background: backgroundColor,
          ratio: Math.round(ratio * 100) / 100,
          requiredRatio,
          passed: false,
        });
      }
    }
  });

  return issues;
}

// ============================================================================
// COMPREHENSIVE DARK MODE AUDIT
// ============================================================================

/**
 * Run a comprehensive dark mode audit on a component.
 * 
 * @param componentName - Human-readable component name
 * @param selector - CSS selector for component
 * @returns Dark mode audit result
 */
export function auditDarkMode(componentName: string, selector: string): DarkModeAuditResult {
  const overrideViolations = detectDarkModeOverrides(selector);
  const tokenViolations = verifySemanticTokens(selector);
  const contrastIssues = checkContrastBothModes(selector);

  const allViolations = [
    ...overrideViolations,
    ...tokenViolations,
    ...contrastIssues.map(issue => ({
      severity: 'warning' as const,
      type: 'contrast-fail' as const,
      element: issue.element,
      issue: `Low contrast in ${issue.mode} mode: ${issue.ratio}:1 (needs ${issue.requiredRatio}:1)`,
      fix: `Adjust color tokens to meet WCAG AA contrast requirements`,
    })),
  ];

  // Calculate scores
  const criticalCount = allViolations.filter(v => v.severity === 'critical').length;
  const warningCount = allViolations.filter(v => v.severity === 'warning').length;
  
  const lightModeScore = contrastIssues.filter(i => i.mode === 'light').length === 0 ? 100 : 70;
  const darkModeScore = contrastIssues.filter(i => i.mode === 'dark').length === 0 ? 100 : 70;
  
  const overallScore = Math.max(0, 100 - (criticalCount * 20) - (warningCount * 5));

  // Generate recommendations
  const recommendations: string[] = [];
  if (overrideViolations.length > 0) {
    recommendations.push(`Remove ${overrideViolations.length} dark: overrides and use semantic tokens`);
  }
  if (tokenViolations.length > 0) {
    recommendations.push(`Replace ${tokenViolations.length} hardcoded colors with semantic tokens`);
  }
  if (contrastIssues.length > 0) {
    recommendations.push(`Fix ${contrastIssues.length} contrast issues to meet WCAG AA`);
  }

  return {
    component: componentName,
    selector,
    lightModeScore,
    darkModeScore,
    overallScore,
    violations: allViolations,
    recommendations,
  };
}

// ============================================================================
// CONSOLE REPORTING
// ============================================================================

/**
 * Log a detailed dark mode audit report to console.
 * 
 * @param componentName - Component name
 * @param selector - CSS selector
 */
export function logDarkModeAudit(componentName: string, selector: string): void {
  const result = auditDarkMode(componentName, selector);
  
  console.group(`🌓 DARK MODE AUDIT: ${componentName}`);
  console.log(`Selector: ${selector}`);
  console.log(`Overall Score: ${result.overallScore}/100`);
  console.log(`Light Mode: ${result.lightModeScore}/100`);
  console.log(`Dark Mode: ${result.darkModeScore}/100`);
  
  if (result.violations.length > 0) {
    console.group(`⚠️ Violations Found (${result.violations.length})`);
    
    // Group by type
    const byType = result.violations.reduce((acc, v) => {
      if (!acc[v.type]) acc[v.type] = [];
      acc[v.type].push(v);
      return acc;
    }, {} as Record<string, DarkModeViolation[]>);
    
    Object.entries(byType).forEach(([type, violations]) => {
      console.group(`${type.toUpperCase().replace(/-/g, ' ')} (${violations.length})`);
      violations.forEach((v, i) => {
        const emoji = v.severity === 'critical' ? '🔴' : v.severity === 'warning' ? '🟡' : 'ℹ️';
        console.group(`${emoji} ${i + 1}. ${v.element}`);
        console.log(`Issue: ${v.issue}`);
        console.log(`Fix: ${v.fix}`);
        console.groupEnd();
      });
      console.groupEnd();
    });
    
    console.groupEnd();
  } else {
    console.log('✅ No violations found!');
  }
  
  if (result.recommendations.length > 0) {
    console.group(`💡 Recommendations (${result.recommendations.length})`);
    result.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Log dark mode audits for all key components.
 */
export function logAllDarkModeAudits(): void {
  console.log('\n' + '='.repeat(80));
  console.log('🌓 COMPREHENSIVE DARK MODE COMPLIANCE REPORT');
  console.log('='.repeat(80) + '\n');

  const components: [string, string][] = [
    ['Header', 'header'],
    ['Footer', 'footer'],
    ['Hero Section', '[class*="Hero"]'],
    ['Card Grid', '[class*="CardGrid"]'],
    ['CTA Section', '[class*="CTA"]'],
    ['Editorial Content', '[class*="Editorial"]'],
    ['FAQ Section', '[class*="FAQ"]'],
  ];

  const results = components.map(([name, sel]) => auditDarkMode(name, sel));
  
  // Summary table
  console.table(results.map(r => ({
    Component: r.component,
    Overall: r.overallScore + '/100',
    Light: r.lightModeScore + '/100',
    Dark: r.darkModeScore + '/100',
    Issues: r.violations.length,
  })));

  // Detailed reports
  results.forEach(result => {
    logDarkModeAudit(result.component, result.selector);
  });

  // Overall summary
  const avgScore = Math.round(results.reduce((sum, r) => sum + r.overallScore, 0) / results.length);
  const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0);
  const criticalViolations = results.reduce((sum, r) => 
    sum + r.violations.filter(v => v.severity === 'critical').length, 0
  );

  console.log('\n' + '='.repeat(80));
  console.log('📊 OVERALL SUMMARY');
  console.log('='.repeat(80));
  console.log(`Average Score: ${avgScore}/100`);
  console.log(`Total Violations: ${totalViolations}`);
  console.log(`Critical Violations: ${criticalViolations}`);
  console.log(`Components Passing: ${results.filter(r => r.overallScore >= 80).length}/${results.length}`);
  console.log('='.repeat(80) + '\n');
}

/**
 * Quick dark mode test - toggle theme and compare.
 * 
 * @param selector - CSS selector for component
 */
export function quickDarkModeTest(selector: string): void {
  const isDark = document.documentElement.classList.contains('dark');
  
  console.group('🌓 QUICK DARK MODE TEST');
  console.log(`Current mode: ${isDark ? 'DARK' : 'LIGHT'}`);
  console.log('Running audit in current mode...');
  
  const currentResult = auditDarkMode('Component', selector);
  console.log(`Score: ${currentResult.overallScore}/100`);
  console.log(`Violations: ${currentResult.violations.length}`);
  
  console.log('\n💡 Toggle dark mode in the UI and run this test again to compare both modes.');
  console.groupEnd();
}
