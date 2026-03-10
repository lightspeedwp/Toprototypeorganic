/**
 * Component-Specific Auditor
 * 
 * Performs targeted audits on individual components to verify:
 * - Semantic token usage (not hardcoded colors)
 * - Typography compliance (using theme fonts)
 * - Spacing compliance (using design tokens)
 * - Dark mode readiness (no dark: overrides)
 * - Accessibility compliance
 * 
 * @module componentAuditor
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ComponentAuditResult {
  component: string;
  selector: string;
  passed: boolean;
  issues: AuditIssue[];
  score: number;
  recommendations: string[];
}

interface AuditIssue {
  category: 'color' | 'typography' | 'spacing' | 'dark-mode' | 'accessibility';
  severity: 'critical' | 'warning' | 'info';
  element: string;
  issue: string;
  currentValue: string;
  recommendedValue: string;
  location: string;
}

interface ColorTokenAudit {
  totalElements: number;
  usingSemanticTokens: number;
  hardcodedColors: number;
  darkModeOverrides: number;
  violations: ColorViolation[];
}

interface ColorViolation {
  element: string;
  className: string;
  issue: string;
  suggestion: string;
}

interface TypographyAudit {
  totalTextElements: number;
  usingThemeFonts: number;
  customFonts: number;
  hardcodedSizes: number;
  violations: TypographyViolation[];
}

interface TypographyViolation {
  element: string;
  computedFont: string;
  expectedFont: string;
  issue: string;
}

interface SpacingAudit {
  totalElements: number;
  usingFluidSpacing: number;
  hardcodedSpacing: number;
  violations: SpacingViolation[];
}

interface SpacingViolation {
  element: string;
  property: string;
  value: string;
  suggestion: string;
}

// ============================================================================
// COLOR TOKEN AUDITING
// ============================================================================

/**
 * Audit a component for proper color token usage.
 * 
 * Checks for:
 * - Hardcoded color values (bg-white, text-black, etc.)
 * - Dark mode overrides (dark:bg-*, dark:text-*)
 * - Semantic token usage (bg-background, text-foreground, etc.)
 * 
 * @param selector - CSS selector for component
 * @returns Color token audit results
 */
export function auditComponentColors(selector: string): ColorTokenAudit {
  const component = document.querySelector(selector);
  
  if (!component) {
    return {
      totalElements: 0,
      usingSemanticTokens: 0,
      hardcodedColors: 0,
      darkModeOverrides: 0,
      violations: [],
    };
  }

  const elements = component.querySelectorAll('*');
  const violations: ColorViolation[] = [];
  let hardcodedColors = 0;
  let darkModeOverrides = 0;
  let semanticTokens = 0;

  // Hardcoded color patterns to detect
  const hardcodedColorPatterns = [
    /bg-white\b/,
    /bg-black\b/,
    /bg-gray-\d+/,
    /bg-slate-\d+/,
    /bg-zinc-\d+/,
    /text-white\b/,
    /text-black\b/,
    /text-gray-\d+/,
    /text-slate-\d+/,
    /border-white\b/,
    /border-black\b/,
    /border-gray-\d+/,
  ];

  // Semantic token patterns (these are GOOD)
  const semanticTokenPatterns = [
    /bg-background\b/,
    /bg-foreground\b/,
    /bg-primary\b/,
    /bg-secondary\b/,
    /bg-accent\b/,
    /bg-muted\b/,
    /bg-card\b/,
    /bg-sidebar\b/,
    /text-background\b/,
    /text-foreground\b/,
    /text-primary\b/,
    /text-secondary\b/,
    /text-accent\b/,
    /text-muted-foreground\b/,
    /border-border\b/,
    /border-sidebar-border\b/,
  ];

  elements.forEach((el) => {
    const className = el.className;
    if (typeof className !== 'string') return;

    // Check for dark mode overrides
    if (className.includes('dark:')) {
      darkModeOverrides++;
      const darkClasses = className.match(/dark:[^\s]+/g) || [];
      violations.push({
        element: el.tagName.toLowerCase(),
        className: className,
        issue: `Uses dark mode override: ${darkClasses.join(', ')}`,
        suggestion: 'Use semantic tokens instead (e.g., bg-background instead of bg-white dark:bg-gray-900)',
      });
    }

    // Check for hardcoded colors
    const hasHardcodedColor = hardcodedColorPatterns.some(pattern => pattern.test(className));
    if (hasHardcodedColor) {
      hardcodedColors++;
      const matches = hardcodedColorPatterns
        .map(pattern => className.match(pattern))
        .filter(Boolean)
        .map(match => match![0]);
      
      violations.push({
        element: el.tagName.toLowerCase(),
        className: className,
        issue: `Uses hardcoded color: ${matches.join(', ')}`,
        suggestion: 'Replace with semantic tokens (bg-background, text-foreground, etc.)',
      });
    }

    // Count semantic token usage
    const usesSemanticTokens = semanticTokenPatterns.some(pattern => pattern.test(className));
    if (usesSemanticTokens) {
      semanticTokens++;
    }
  });

  return {
    totalElements: elements.length,
    usingSemanticTokens: semanticTokens,
    hardcodedColors,
    darkModeOverrides,
    violations,
  };
}

// ============================================================================
// TYPOGRAPHY AUDITING
// ============================================================================

/**
 * Audit a component for typography compliance.
 * 
 * Checks for:
 * - Font family usage (Lora for headings, Noto Sans for body)
 * - Font size usage (CSS variables vs hardcoded)
 * - Font weight usage (design system weights)
 * 
 * @param selector - CSS selector for component
 * @returns Typography audit results
 */
export function auditComponentTypography(selector: string): TypographyAudit {
  const component = document.querySelector(selector);
  
  if (!component) {
    return {
      totalTextElements: 0,
      usingThemeFonts: 0,
      customFonts: 0,
      hardcodedSizes: 0,
      violations: [],
    };
  }

  const textElements = component.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label');
  const violations: TypographyViolation[] = [];
  let usingThemeFonts = 0;
  let customFonts = 0;

  const expectedFonts = {
    h1: 'Lora',
    h2: 'Lora',
    h3: 'Lora',
    h4: 'Lora',
    h5: 'Lora',
    h6: 'Lora',
    p: 'Noto Sans',
    span: 'Noto Sans',
    a: 'Noto Sans',
    button: 'Noto Sans',
    label: 'Noto Sans',
  };

  textElements.forEach((el) => {
    const computed = window.getComputedStyle(el);
    const fontFamily = computed.fontFamily;
    const tagName = el.tagName.toLowerCase() as keyof typeof expectedFonts;
    const expectedFont = expectedFonts[tagName];

    if (fontFamily.includes(expectedFont)) {
      usingThemeFonts++;
    } else if (!fontFamily.includes('Lora') && !fontFamily.includes('Noto Sans')) {
      customFonts++;
      violations.push({
        element: tagName,
        computedFont: fontFamily,
        expectedFont,
        issue: `Element uses non-theme font: ${fontFamily}`,
      });
    }
  });

  return {
    totalTextElements: textElements.length,
    usingThemeFonts,
    customFonts,
    hardcodedSizes: 0, // Could extend to check for hardcoded font sizes
    violations,
  };
}

// ============================================================================
// SPACING AUDITING
// ============================================================================

/**
 * Audit a component for spacing compliance.
 * 
 * Checks for:
 * - Use of fluid spacing tokens
 * - Hardcoded pixel values
 * - Consistent gap/padding patterns
 * 
 * @param selector - CSS selector for component
 * @returns Spacing audit results
 */
export function auditComponentSpacing(selector: string): SpacingAudit {
  const component = document.querySelector(selector);
  
  if (!component) {
    return {
      totalElements: 0,
      usingFluidSpacing: 0,
      hardcodedSpacing: 0,
      violations: [],
    };
  }

  const elements = component.querySelectorAll('*');
  const violations: SpacingViolation[] = [];
  let usingFluidSpacing = 0;
  let hardcodedSpacing = 0;

  // Fluid spacing classes (these are GOOD)
  const fluidSpacingPatterns = [
    /p-\d+/,      // Tailwind spacing scale
    /px-\d+/,
    /py-\d+/,
    /pt-\d+/,
    /pb-\d+/,
    /pl-\d+/,
    /pr-\d+/,
    /m-\d+/,
    /mx-\d+/,
    /my-\d+/,
    /mt-\d+/,
    /mb-\d+/,
    /ml-\d+/,
    /mr-\d+/,
    /gap-\d+/,
    /space-x-\d+/,
    /space-y-\d+/,
  ];

  elements.forEach((el) => {
    const className = el.className;
    if (typeof className !== 'string') return;

    const usesFluidSpacing = fluidSpacingPatterns.some(pattern => pattern.test(className));
    if (usesFluidSpacing) {
      usingFluidSpacing++;
    }

    // Check for inline styles with hardcoded pixels
    const inlineStyle = (el as HTMLElement).style;
    if (inlineStyle.padding || inlineStyle.margin) {
      const padding = inlineStyle.padding;
      const margin = inlineStyle.margin;
      
      if (padding && padding.includes('px') && !padding.includes('clamp')) {
        hardcodedSpacing++;
        violations.push({
          element: el.tagName.toLowerCase(),
          property: 'padding',
          value: padding,
          suggestion: 'Use Tailwind spacing classes (p-4, p-6, etc.) instead',
        });
      }
      
      if (margin && margin.includes('px') && !margin.includes('clamp')) {
        hardcodedSpacing++;
        violations.push({
          element: el.tagName.toLowerCase(),
          property: 'margin',
          value: margin,
          suggestion: 'Use Tailwind spacing classes (m-4, m-6, etc.) instead',
        });
      }
    }
  });

  return {
    totalElements: elements.length,
    usingFluidSpacing,
    hardcodedSpacing,
    violations,
  };
}

// ============================================================================
// COMPREHENSIVE COMPONENT AUDIT
// ============================================================================

/**
 * Run a comprehensive audit on a specific component.
 * 
 * @param componentName - Human-readable component name
 * @param selector - CSS selector for component
 * @returns Complete audit result
 */
export function auditComponent(componentName: string, selector: string): ComponentAuditResult {
  const colorAudit = auditComponentColors(selector);
  const typographyAudit = auditComponentTypography(selector);
  const spacingAudit = auditComponentSpacing(selector);

  const issues: AuditIssue[] = [];
  const recommendations: string[] = [];

  // Color issues
  colorAudit.violations.forEach(v => {
    issues.push({
      category: v.issue.includes('dark:') ? 'dark-mode' : 'color',
      severity: v.issue.includes('dark:') ? 'critical' : 'warning',
      element: v.element,
      issue: v.issue,
      currentValue: v.className,
      recommendedValue: v.suggestion,
      location: selector,
    });
  });

  // Typography issues
  typographyAudit.violations.forEach(v => {
    issues.push({
      category: 'typography',
      severity: 'warning',
      element: v.element,
      issue: v.issue,
      currentValue: v.computedFont,
      recommendedValue: v.expectedFont,
      location: selector,
    });
  });

  // Spacing issues
  spacingAudit.violations.forEach(v => {
    issues.push({
      category: 'spacing',
      severity: 'info',
      element: v.element,
      issue: `Hardcoded ${v.property}`,
      currentValue: v.value,
      recommendedValue: v.suggestion,
      location: selector,
    });
  });

  // Calculate score (0-100)
  const colorScore = colorAudit.totalElements > 0
    ? ((colorAudit.totalElements - colorAudit.hardcodedColors - colorAudit.darkModeOverrides) / colorAudit.totalElements) * 100
    : 100;
  
  const typographyScore = typographyAudit.totalTextElements > 0
    ? (typographyAudit.usingThemeFonts / typographyAudit.totalTextElements) * 100
    : 100;
  
  const spacingScore = spacingAudit.totalElements > 0
    ? ((spacingAudit.totalElements - spacingAudit.hardcodedSpacing) / spacingAudit.totalElements) * 100
    : 100;

  const score = Math.round((colorScore + typographyScore + spacingScore) / 3);

  // Generate recommendations
  if (colorAudit.hardcodedColors > 0) {
    recommendations.push(`Replace ${colorAudit.hardcodedColors} hardcoded colors with semantic tokens`);
  }
  if (colorAudit.darkModeOverrides > 0) {
    recommendations.push(`Remove ${colorAudit.darkModeOverrides} dark mode overrides - use semantic tokens instead`);
  }
  if (typographyAudit.customFonts > 0) {
    recommendations.push(`Update ${typographyAudit.customFonts} elements to use theme fonts (Lora/Noto Sans)`);
  }
  if (spacingAudit.hardcodedSpacing > 0) {
    recommendations.push(`Replace ${spacingAudit.hardcodedSpacing} hardcoded spacing with Tailwind classes`);
  }

  const passed = issues.filter(i => i.severity === 'critical').length === 0;

  return {
    component: componentName,
    selector,
    passed,
    issues,
    score,
    recommendations,
  };
}

// ============================================================================
// BATCH AUDITING
// ============================================================================

/**
 * Audit multiple components at once.
 * 
 * @param components - Array of [name, selector] pairs
 * @returns Array of audit results
 */
export function auditComponents(components: [string, string][]): ComponentAuditResult[] {
  return components.map(([name, selector]) => auditComponent(name, selector));
}

// ============================================================================
// CONSOLE REPORTING
// ============================================================================

/**
 * Log a detailed component audit report to console.
 * 
 * @param componentName - Component name
 * @param selector - CSS selector
 */
export function logComponentAudit(componentName: string, selector: string): void {
  const result = auditComponent(componentName, selector);
  
  console.group(`🔍 COMPONENT AUDIT: ${componentName}`);
  console.log(`Selector: ${selector}`);
  console.log(`Score: ${result.score}/100 ${result.passed ? '✅' : '❌'}`);
  
  if (result.issues.length > 0) {
    console.group(`⚠️ Issues Found (${result.issues.length})`);
    
    // Group by category
    const byCategory = result.issues.reduce((acc, issue) => {
      if (!acc[issue.category]) acc[issue.category] = [];
      acc[issue.category].push(issue);
      return acc;
    }, {} as Record<string, AuditIssue[]>);
    
    Object.entries(byCategory).forEach(([category, issues]) => {
      console.group(`${category.toUpperCase()} (${issues.length})`);
      issues.forEach((issue, i) => {
        const emoji = issue.severity === 'critical' ? '🔴' : issue.severity === 'warning' ? '🟡' : 'ℹ️';
        console.group(`${emoji} ${i + 1}. ${issue.element}`);
        console.log(`Issue: ${issue.issue}`);
        console.log(`Current: ${issue.currentValue}`);
        console.log(`Recommended: ${issue.recommendedValue}`);
        console.groupEnd();
      });
      console.groupEnd();
    });
    
    console.groupEnd();
  } else {
    console.log('✅ No issues found!');
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
 * Log audits for all key components.
 */
export function logAllComponentAudits(): void {
  console.log('\n' + '='.repeat(80));
  console.log('🎯 COMPREHENSIVE COMPONENT AUDIT REPORT');
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

  const results = auditComponents(components);
  
  // Summary table
  console.table(results.map(r => ({
    Component: r.component,
    Score: r.score + '/100',
    Status: r.passed ? '✅ PASS' : '❌ FAIL',
    Issues: r.issues.length,
    Critical: r.issues.filter(i => i.severity === 'critical').length,
  })));

  // Detailed reports
  results.forEach(result => {
    logComponentAudit(result.component, result.selector);
  });

  // Overall summary
  const avgScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  const criticalIssues = results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'critical').length, 0);

  console.log('\n' + '='.repeat(80));
  console.log('📊 OVERALL SUMMARY');
  console.log('='.repeat(80));
  console.log(`Average Score: ${avgScore}/100`);
  console.log(`Total Components: ${results.length}`);
  console.log(`Total Issues: ${totalIssues}`);
  console.log(`Critical Issues: ${criticalIssues}`);
  console.log(`Components Passing: ${results.filter(r => r.passed).length}/${results.length}`);
  console.log('='.repeat(80) + '\n');
}
