/**
 * Style Consistency Checker
 * 
 * Validates consistent use of design tokens, spacing, and typography across the application.
 * Ensures all components follow the design system standards.
 * 
 * @module styleConsistencyChecker
 * @category utils
 */

/**
 * Style consistency report.
 */
export interface StyleConsistencyReport {
  score: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  violations: StyleViolation[];
  warnings: StyleWarning[];
  recommendations: string[];
  summary: string;
  timestamp: number;
}

/**
 * Style violation.
 */
export interface StyleViolation {
  type: 'color' | 'spacing' | 'typography' | 'border' | 'shadow' | 'layout';
  severity: 'critical' | 'warning' | 'info';
  element: HTMLElement;
  property: string;
  value: string;
  expectedValue?: string;
  message: string;
  fix: string;
  line?: number;
}

/**
 * Style warning.
 */
export interface StyleWarning {
  type: string;
  message: string;
  count: number;
  elements: HTMLElement[];
  recommendation: string;
}

/**
 * Design system tokens reference.
 */
const DESIGN_TOKENS = {
  colors: {
    semantic: [
      'hsl(var(--background))',
      'hsl(var(--foreground))',
      'hsl(var(--card))',
      'hsl(var(--card-foreground))',
      'hsl(var(--primary))',
      'hsl(var(--primary-foreground))',
      'hsl(var(--secondary))',
      'hsl(var(--secondary-foreground))',
      'hsl(var(--muted))',
      'hsl(var(--muted-foreground))',
      'hsl(var(--accent))',
      'hsl(var(--accent-foreground))',
      'hsl(var(--destructive))',
      'hsl(var(--destructive-foreground))',
      'hsl(var(--border))',
      'hsl(var(--input))',
      'hsl(var(--ring))',
    ],
  },
  fonts: {
    families: ['Lora', 'Noto Sans'],
    weights: ['400', '500', '600', '700'],
  },
  spacing: {
    scale: ['4px', '8px', '12px', '16px', '20px', '24px', '28px', '32px', '36px', '40px', '44px', '48px', '56px', '64px', '80px', '96px', '112px', '128px'],
  },
  borders: {
    widths: ['1px', '2px'],
    radii: ['2px', '4px', '6px', '8px', '16px', '24px', '9999px'],
  },
};

/**
 * Check if a color is a semantic token.
 */
function isSemanticColor(color: string): boolean {
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
    return true; // Transparent is acceptable
  }
  
  // Check if color uses CSS variable
  if (color.includes('var(--')) {
    return true;
  }
  
  // Check if it's a semantic HSL color
  if (color.startsWith('hsl(') && color.includes('var(--')) {
    return true;
  }
  
  return false;
}

/**
 * Check if a font family is allowed.
 */
function isAllowedFont(fontFamily: string): boolean {
  const fonts = fontFamily.toLowerCase();
  return DESIGN_TOKENS.fonts.families.some(allowed => 
    fonts.includes(allowed.toLowerCase())
  );
}

/**
 * Check if spacing uses design system values.
 */
function isValidSpacing(spacing: string): boolean {
  if (!spacing || spacing === '0px' || spacing === '0') {
    return true;
  }
  
  // Check if uses clamp() (fluid spacing)
  if (spacing.includes('clamp(')) {
    return true;
  }
  
  // Check if uses CSS variable
  if (spacing.includes('var(--')) {
    return true;
  }
  
  // Check if matches scale
  const value = spacing.trim();
  return DESIGN_TOKENS.spacing.scale.includes(value);
}

/**
 * Extract numeric value from spacing string.
 */
function extractNumericValue(spacing: string): number {
  const match = spacing.match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Find closest valid spacing value.
 */
function findClosestSpacing(value: string): string {
  const numeric = extractNumericValue(value);
  
  let closest = DESIGN_TOKENS.spacing.scale[0];
  let minDiff = Infinity;
  
  DESIGN_TOKENS.spacing.scale.forEach(spacing => {
    const spacingValue = extractNumericValue(spacing);
    const diff = Math.abs(spacingValue - numeric);
    
    if (diff < minDiff) {
      minDiff = diff;
      closest = spacing;
    }
  });
  
  return closest;
}

/**
 * Check color consistency across elements.
 */
function checkColorConsistency(container: HTMLElement): StyleViolation[] {
  const violations: StyleViolation[] = [];
  const elements = container.querySelectorAll('*');
  
  elements.forEach(el => {
    const element = el as HTMLElement;
    const computed = window.getComputedStyle(element);
    
    // Check background color
    const bgColor = computed.backgroundColor;
    if (!isSemanticColor(bgColor)) {
      violations.push({
        type: 'color',
        severity: 'critical',
        element,
        property: 'background-color',
        value: bgColor,
        message: 'Hardcoded background color detected',
        fix: 'Use semantic color tokens (bg-background, bg-card, bg-primary, etc.)',
      });
    }
    
    // Check text color
    const textColor = computed.color;
    if (!isSemanticColor(textColor)) {
      violations.push({
        type: 'color',
        severity: 'critical',
        element,
        property: 'color',
        value: textColor,
        message: 'Hardcoded text color detected',
        fix: 'Use semantic color tokens (text-foreground, text-primary, etc.)',
      });
    }
    
    // Check border color
    const borderColor = computed.borderColor;
    if (borderColor && borderColor !== 'rgb(0, 0, 0)' && !isSemanticColor(borderColor)) {
      violations.push({
        type: 'color',
        severity: 'warning',
        element,
        property: 'border-color',
        value: borderColor,
        message: 'Hardcoded border color detected',
        fix: 'Use border-border token',
      });
    }
  });
  
  return violations;
}

/**
 * Check typography consistency.
 */
function checkTypographyConsistency(container: HTMLElement): StyleViolation[] {
  const violations: StyleViolation[] = [];
  const elements = container.querySelectorAll('*');
  
  elements.forEach(el => {
    const element = el as HTMLElement;
    const computed = window.getComputedStyle(element);
    const tagName = element.tagName.toLowerCase();
    
    // Check font family
    const fontFamily = computed.fontFamily;
    if (!isAllowedFont(fontFamily)) {
      violations.push({
        type: 'typography',
        severity: 'critical',
        element,
        property: 'font-family',
        value: fontFamily,
        expectedValue: 'Lora or Noto Sans',
        message: 'Non-standard font family used',
        fix: 'Use Lora (headings) or Noto Sans (body text)',
      });
    }
    
    // Check for text size classes on headings
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      const classes = element.className;
      const textSizeClasses = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'];
      
      const hasTextSize = textSizeClasses.some(cls => classes.includes(cls));
      if (hasTextSize) {
        violations.push({
          type: 'typography',
          severity: 'warning',
          element,
          property: 'text size class',
          value: classes,
          message: 'Heading uses text size class instead of semantic HTML',
          fix: 'Remove text size classes from headings; use semantic HTML sizing',
        });
      }
    }
    
    // Check font weight
    const fontWeight = computed.fontWeight;
    if (!DESIGN_TOKENS.fonts.weights.includes(fontWeight)) {
      violations.push({
        type: 'typography',
        severity: 'info',
        element,
        property: 'font-weight',
        value: fontWeight,
        expectedValue: '400, 500, 600, or 700',
        message: 'Non-standard font weight',
        fix: 'Use standard font weights (400, 500, 600, 700)',
      });
    }
  });
  
  return violations;
}

/**
 * Check spacing consistency.
 */
function checkSpacingConsistency(container: HTMLElement): StyleViolation[] {
  const violations: StyleViolation[] = [];
  const elements = container.querySelectorAll('*');
  
  elements.forEach(el => {
    const element = el as HTMLElement;
    const computed = window.getComputedStyle(element);
    
    // Check padding
    const padding = computed.padding;
    if (padding && padding !== '0px' && !isValidSpacing(padding)) {
      violations.push({
        type: 'spacing',
        severity: 'warning',
        element,
        property: 'padding',
        value: padding,
        expectedValue: findClosestSpacing(padding),
        message: 'Padding does not match design system scale',
        fix: `Use p-* classes or closest value: ${findClosestSpacing(padding)}`,
      });
    }
    
    // Check margin
    const margin = computed.margin;
    if (margin && margin !== '0px' && !isValidSpacing(margin)) {
      violations.push({
        type: 'spacing',
        severity: 'warning',
        element,
        property: 'margin',
        value: margin,
        expectedValue: findClosestSpacing(margin),
        message: 'Margin does not match design system scale',
        fix: `Use m-* classes or closest value: ${findClosestSpacing(margin)}`,
      });
    }
  });
  
  return violations;
}

/**
 * Check border consistency.
 */
function checkBorderConsistency(container: HTMLElement): StyleViolation[] {
  const violations: StyleViolation[] = [];
  const elements = container.querySelectorAll('*');
  
  elements.forEach(el => {
    const element = el as HTMLElement;
    const computed = window.getComputedStyle(element);
    
    // Check border width
    const borderWidth = computed.borderWidth;
    if (borderWidth && borderWidth !== '0px' && !DESIGN_TOKENS.borders.widths.includes(borderWidth)) {
      violations.push({
        type: 'border',
        severity: 'info',
        element,
        property: 'border-width',
        value: borderWidth,
        expectedValue: '1px or 2px',
        message: 'Non-standard border width',
        fix: 'Use border or border-2 classes',
      });
    }
    
    // Check border radius
    const borderRadius = computed.borderRadius;
    if (borderRadius && borderRadius !== '0px' && !DESIGN_TOKENS.borders.radii.includes(borderRadius)) {
      violations.push({
        type: 'border',
        severity: 'info',
        element,
        property: 'border-radius',
        value: borderRadius,
        message: 'Non-standard border radius',
        fix: 'Use rounded-sm, rounded-md, rounded-lg, or rounded-xl',
      });
    }
  });
  
  return violations;
}

/**
 * Check for common anti-patterns.
 */
function checkAntiPatterns(container: HTMLElement): StyleWarning[] {
  const warnings: StyleWarning[] = [];
  
  // Check for inline styles
  const elementsWithInlineStyles = Array.from(container.querySelectorAll('[style]'));
  if (elementsWithInlineStyles.length > 0) {
    warnings.push({
      type: 'inline-styles',
      message: 'Inline styles detected',
      count: elementsWithInlineStyles.length,
      elements: elementsWithInlineStyles as HTMLElement[],
      recommendation: 'Avoid inline styles; use Tailwind classes or design tokens',
    });
  }
  
  // Check for non-semantic HTML
  const divs = Array.from(container.querySelectorAll('div[onclick], div[role="button"]'));
  if (divs.length > 0) {
    warnings.push({
      type: 'non-semantic-html',
      message: 'Non-semantic interactive elements (divs with onclick)',
      count: divs.length,
      elements: divs as HTMLElement[],
      recommendation: 'Use <button> or <a> elements for interactive components',
    });
  }
  
  // Check for missing alt text
  const imagesWithoutAlt = Array.from(container.querySelectorAll('img:not([alt])'));
  if (imagesWithoutAlt.length > 0) {
    warnings.push({
      type: 'missing-alt',
      message: 'Images without alt text',
      count: imagesWithoutAlt.length,
      elements: imagesWithoutAlt as HTMLElement[],
      recommendation: 'Add alt text to all images for accessibility',
    });
  }
  
  return warnings;
}

/**
 * Generate recommendations based on violations.
 */
function generateRecommendations(violations: StyleViolation[]): string[] {
  const recommendations: string[] = [];
  
  const colorViolations = violations.filter(v => v.type === 'color').length;
  const typographyViolations = violations.filter(v => v.type === 'typography').length;
  const spacingViolations = violations.filter(v => v.type === 'spacing').length;
  
  if (colorViolations > 5) {
    recommendations.push('🎨 High number of color violations. Review color token usage across components.');
  }
  
  if (typographyViolations > 3) {
    recommendations.push('📝 Typography violations detected. Ensure semantic HTML and design system fonts are used.');
  }
  
  if (spacingViolations > 10) {
    recommendations.push('📏 Spacing inconsistencies found. Use Tailwind spacing classes (p-*, m-*, gap-*).');
  }
  
  if (violations.some(v => v.severity === 'critical')) {
    recommendations.push('🔴 Critical violations found. Address these immediately for design system compliance.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ Great job! Style consistency is well maintained.');
  }
  
  return recommendations;
}

/**
 * Check style consistency across a container.
 * 
 * @param container - Container element to check
 * @returns Style consistency report
 * 
 * @example
 * ```tsx
 * const report = checkStyleConsistency(document.body);
 * console.log(`Score: ${report.score}/100`);
 * console.log(`Violations: ${report.violations.length}`);
 * ```
 */
export function checkStyleConsistency(
  container: HTMLElement = document.body
): StyleConsistencyReport {
  const violations: StyleViolation[] = [];
  
  // Run all checks
  violations.push(...checkColorConsistency(container));
  violations.push(...checkTypographyConsistency(container));
  violations.push(...checkSpacingConsistency(container));
  violations.push(...checkBorderConsistency(container));
  
  // Check for anti-patterns
  const warnings = checkAntiPatterns(container);
  
  // Calculate total checks
  const totalElements = container.querySelectorAll('*').length;
  const totalChecks = totalElements * 5; // 5 checks per element
  const failedChecks = violations.length;
  const passedChecks = totalChecks - failedChecks;
  
  // Calculate score (0-100)
  const score = Math.max(0, Math.round((passedChecks / totalChecks) * 100));
  
  // Generate recommendations
  const recommendations = generateRecommendations(violations);
  
  // Generate summary
  let summary = '';
  if (score >= 90) {
    summary = `✅ Excellent! Style consistency score: ${score}/100`;
  } else if (score >= 70) {
    summary = `⚠️ Good, but needs attention. Score: ${score}/100`;
  } else {
    summary = `❌ Poor style consistency. Score: ${score}/100 - Immediate action required`;
  }
  
  return {
    score,
    totalChecks,
    passedChecks,
    failedChecks,
    violations,
    warnings,
    recommendations,
    summary,
    timestamp: Date.now(),
  };
}

/**
 * Log style consistency report to console.
 */
export function logStyleConsistencyReport(report: StyleConsistencyReport): void {
  console.group('🎨 Style Consistency Report');
  
  console.log(`\n${report.summary}`);
  console.log(`Score: ${report.score}/100`);
  console.log(`Total Checks: ${report.totalChecks}`);
  console.log(`Passed: ${report.passedChecks}`);
  console.log(`Failed: ${report.failedChecks}`);
  
  if (report.violations.length > 0) {
    console.group(`\n❌ Violations (${report.violations.length})`);
    
    // Group by type
    const byType: Record<string, StyleViolation[]> = {
      color: [],
      typography: [],
      spacing: [],
      border: [],
      shadow: [],
      layout: [],
    };
    
    report.violations.forEach(v => byType[v.type].push(v));
    
    Object.entries(byType).forEach(([type, violations]) => {
      if (violations.length > 0) {
        console.group(`\n${type.toUpperCase()} (${violations.length})`);
        violations.forEach(v => {
          const icon = v.severity === 'critical' ? '🔴' : v.severity === 'warning' ? '🟡' : 'ℹ️';
          console.warn(`${icon} ${v.message}`);
          console.log(`   Property: ${v.property}`);
          console.log(`   Value: ${v.value}`);
          if (v.expectedValue) {
            console.log(`   Expected: ${v.expectedValue}`);
          }
          console.log(`   Fix: ${v.fix}`);
        });
        console.groupEnd();
      }
    });
    
    console.groupEnd();
  }
  
  if (report.warnings.length > 0) {
    console.group(`\n⚠️ Warnings (${report.warnings.length})`);
    report.warnings.forEach(w => {
      console.warn(`${w.message} (${w.count} occurrences)`);
      console.log(`  Recommendation: ${w.recommendation}`);
    });
    console.groupEnd();
  }
  
  if (report.recommendations.length > 0) {
    console.group('\n💡 Recommendations');
    report.recommendations.forEach(r => console.log(r));
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Export report as JSON.
 */
export function exportReport(report: StyleConsistencyReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * Get violations by severity.
 */
export function getViolationsBySeverity(
  report: StyleConsistencyReport,
  severity: 'critical' | 'warning' | 'info'
): StyleViolation[] {
  return report.violations.filter(v => v.severity === severity);
}

/**
 * Get violations by type.
 */
export function getViolationsByType(
  report: StyleConsistencyReport,
  type: StyleViolation['type']
): StyleViolation[] {
  return report.violations.filter(v => v.type === type);
}
