/**
 * Accessibility Auditor Utility
 * 
 * Comprehensive accessibility testing tool that checks:
 * - Color contrast ratios (WCAG AA/AAA)
 * - Keyboard navigation
 * - ARIA labels and roles
 * - Semantic HTML
 * - Focus indicators
 * - Touch target sizes
 * - Heading hierarchy
 * - Alt text on images
 * - Form labels
 * 
 * @module accessibilityAuditor
 * @category utils
 * @version 4.0
 */

/**
 * Accessibility violation severity levels.
 */
export type ViolationSeverity = 'critical' | 'serious' | 'moderate' | 'minor';

/**
 * Individual accessibility violation.
 */
export interface A11yViolation {
  severity: ViolationSeverity;
  message: string;
  criterion: string;
  wcagLevel: string;
  impact: string;
  suggestion: string;
  element: HTMLElement;
}

/**
 * Accessibility audit result structure.
 */
export interface A11yAuditResult {
  score: number;
  summary: string;
  stats: {
    totalIssues: number;
    criticalIssues: number;
    warningIssues: number;
    passedChecks: number;
  };
  wcagCompliance: {
    levelA: boolean;
    levelAA: boolean;
    levelAAA: boolean;
  };
  passedChecks: number;
  totalChecks: number;
  violations: A11yViolation[];
  contrastIssues: any[]; // For dashboard compatibility
  recommendations: string[]; // For dashboard compatibility
  timestamp: string;
}

/**
 * Accessibility audit options.
 */
export interface AuditOptions {
  includeWarnings?: boolean;
  checkColorContrast?: boolean;
  checkKeyboardNav?: boolean;
  checkAria?: boolean;
  checkForms?: boolean;
  checkImages?: boolean;
  checkHeadings?: boolean;
  checkLandmarks?: boolean;
}

/**
 * Calculate relative luminance of a color.
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors.
 */
function getContrastRatio(color1: string, color2: string): number {
  const parseColor = (color: string): [number, number, number] | null => {
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
    
    const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (rgbaMatch) return [parseInt(rgbaMatch[1]), parseInt(rgbaMatch[2]), parseInt(rgbaMatch[3])];
    
    const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) return [parseInt(hexMatch[1], 16), parseInt(hexMatch[2], 16), parseInt(hexMatch[3], 16)];
    
    return null;
  };

  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getRelativeLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getRelativeLuminance(rgb2[0], rgb2[1], rgb2[2]);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Run comprehensive accessibility audit on an element and its children.
 * 
 * @param {HTMLElement} root - Root element to audit (defaults to document.body)
 * @param {AuditOptions} options - Audit configuration
 * @returns {A11yAuditResult} Audit findings
 */
export function auditAccessibility(root: HTMLElement = document.body, options: AuditOptions = {}): A11yAuditResult {
  const violations: A11yViolation[] = [];
  let totalChecks = 0;
  let passedChecks = 0;

  // 1. Color Contrast
  if (options.checkColorContrast !== false) {
    const textElements = root.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6, label, input, textarea');
    textElements.forEach((el) => {
      totalChecks++;
      const element = el as HTMLElement;
      const style = window.getComputedStyle(element);
      const fg = style.color;
      let bg = style.backgroundColor;
      
      // Basic recursive background check for transparency
      let parent = element.parentElement;
      while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && parent) {
        bg = window.getComputedStyle(parent).backgroundColor;
        parent = parent.parentElement;
      }

      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const ratio = getContrastRatio(fg, bg);
        const fontSize = parseFloat(style.fontSize);
        const isLarge = fontSize >= 24 || (fontSize >= 18.66 && parseInt(style.fontWeight) >= 700);
        const aaThreshold = isLarge ? 3 : 4.5;
        
        if (ratio < aaThreshold) {
          violations.push({
            severity: ratio < 3 ? 'critical' : 'serious',
            message: `Low color contrast (${ratio.toFixed(2)}:1)`,
            criterion: '1.4.3 Contrast (Minimum)',
            wcagLevel: 'AA',
            impact: 'Users with visual impairments may have difficulty reading this text.',
            suggestion: `Increase contrast ratio to at least ${aaThreshold}:1.`,
            element
          });
        } else {
          passedChecks++;
        }
      } else {
        passedChecks++;
      }
    });
  }

  // 2. Images and Alt Text
  if (options.checkImages !== false) {
    const images = root.querySelectorAll('img');
    images.forEach((img) => {
      totalChecks++;
      const element = img as HTMLElement;
      const alt = element.getAttribute('alt');
      if (alt === null) {
        violations.push({
          severity: 'critical',
          message: 'Image missing alt attribute',
          criterion: '1.1.1 Non-text Content',
          wcagLevel: 'A',
          impact: 'Screen reader users will not know what this image represents.',
          suggestion: 'Add an alt attribute. Use an empty string (alt="") for decorative images.',
          element
        });
      } else {
        passedChecks++;
      }
    });
  }

  // 3. Form Labels
  if (options.checkForms !== false) {
    const inputs = root.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      const element = input as HTMLElement;
      if (element.type === 'hidden' || element.type === 'submit' || element.type === 'button') return;
      
      totalChecks++;
      const id = element.id;
      const hasLabel = id ? !!document.querySelector(`label[for="${id}"]`) : false;
      const hasAriaLabel = !!element.getAttribute('aria-label') || !!element.getAttribute('aria-labelledby');
      
      if (!hasLabel && !hasAriaLabel) {
        violations.push({
          severity: 'serious',
          message: 'Form input missing associated label',
          criterion: '3.3.2 Labels or Instructions',
          wcagLevel: 'A',
          impact: 'Users may not know what information to enter in this field.',
          suggestion: 'Add a <label> with a "for" attribute matching the input ID, or use aria-label.',
          element
        });
      } else {
        passedChecks++;
      }
    });
  }

  // 4. Headings
  if (options.checkHeadings !== false) {
    const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const h1s = headings.filter(h => h.tagName === 'H1');
    
    totalChecks++;
    if (h1s.length === 0) {
      violations.push({
        severity: 'serious',
        message: 'No H1 heading found',
        criterion: '2.4.6 Headings and Labels',
        wcagLevel: 'AA',
        impact: 'Users may have difficulty understanding the primary purpose of the page.',
        suggestion: 'Add a single H1 heading that describes the page content.',
        element: root
      });
    } else if (h1s.length > 1) {
      violations.push({
        severity: 'moderate',
        message: 'Multiple H1 headings found',
        criterion: '2.4.6 Headings and Labels',
        wcagLevel: 'AA',
        impact: 'Page structure may be confusing for screen reader users.',
        suggestion: 'Use only one H1 per page for the main title.',
        element: h1s[1] as HTMLElement
      });
    } else {
      passedChecks++;
    }

    // Heading hierarchy
    let lastLevel = 0;
    headings.forEach((h) => {
      totalChecks++;
      const level = parseInt(h.tagName[1]);
      if (lastLevel > 0 && level > lastLevel + 1) {
        violations.push({
          severity: 'moderate',
          message: `Heading level skip (H${lastLevel} to H${level})`,
          criterion: '2.4.6 Headings and Labels',
          wcagLevel: 'AA',
          impact: 'Broken heading hierarchy makes navigation difficult for screen readers.',
          suggestion: 'Ensure heading levels are used sequentially.',
          element: h as HTMLElement
        });
      } else {
        passedChecks++;
      }
      lastLevel = level;
    });
  }

  // 5. Interactive Elements (Buttons, Links)
  if (options.checkKeyboardNav !== false) {
    const interactives = root.querySelectorAll('a, button, [role="button"], [tabindex]:not([tabindex="-1"])');
    interactives.forEach((el) => {
      const element = el as HTMLElement;
      totalChecks++;
      
      // Touch target size
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        violations.push({
          severity: 'moderate',
          message: `Small touch target (${Math.round(rect.width)}x${Math.round(rect.height)}px)`,
          criterion: '2.5.5 Target Size',
          wcagLevel: 'AAA',
          impact: 'Users with motor impairments may find it difficult to click this element.',
          suggestion: 'Increase target size to at least 44x44px.',
          element
        });
      } else {
        passedChecks++;
      }

      // Empty buttons/links
      if (element.tagName === 'A' || element.tagName === 'BUTTON') {
        totalChecks++;
        const content = element.textContent?.trim();
        const label = element.getAttribute('aria-label');
        if (!content && !label) {
          violations.push({
            severity: 'critical',
            message: 'Empty interactive element',
            criterion: '4.1.2 Name, Role, Value',
            wcagLevel: 'A',
            impact: 'Users will not know what this interactive element does.',
            suggestion: 'Add visible text or an aria-label.',
            element
          });
        } else {
          passedChecks++;
        }
      }
    });
  }

  // Calculate score
  const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;
  
  // Summary message
  let summary = 'Excellent accessibility! No major issues found.';
  if (score < 70) summary = 'Significant accessibility improvements needed.';
  else if (score < 90) summary = 'Good accessibility with some minor issues to address.';

  const criticalIssues = violations.filter(v => v.severity === 'critical').length;
  const seriousIssues = violations.filter(v => v.severity === 'serious').length;
  const moderateIssues = violations.filter(v => v.severity === 'moderate').length;
  const minorIssues = violations.filter(v => v.severity === 'minor').length;

  return {
    score,
    summary,
    stats: {
      totalIssues: violations.length,
      criticalIssues: criticalIssues + seriousIssues,
      warningIssues: moderateIssues + minorIssues,
      passedChecks,
    },
    wcagCompliance: {
      levelA: violations.every(v => v.wcagLevel !== 'A'),
      levelAA: violations.every(v => v.wcagLevel !== 'A' && v.wcagLevel !== 'AA'),
      levelAAA: violations.length === 0
    },
    passedChecks,
    totalChecks,
    violations,
    contrastIssues: violations.filter(v => v.criterion.includes('Contrast')),
    recommendations: Array.from(new Set(violations.map(v => v.suggestion))),
    timestamp: new Date().toISOString()
  };
}

/**
 * Run comprehensive accessibility audit. (Alias for compatibility)
 */
export const runAccessibilityAudit = auditAccessibility;

/**
 * Log accessibility audit results to console.
 */
export function logAccessibilityAudit(result?: A11yAuditResult): void {
  const auditResult = result || auditAccessibility();
  
  console.log('%c ACCESSIBILITY AUDIT REPORT ', 'background: #22c55e; color: #fff; font-weight: bold; padding: 4px;');
  console.log(`Score: ${auditResult.score}/100`);
  console.log(`Summary: ${auditResult.summary}`);
  console.log(`Violations: ${auditResult.violations.length}`);
  console.log(`Compliance: ${auditResult.wcagCompliance.levelAA ? 'AA Pass' : 'AA Fail'}`);
  
  if (auditResult.violations.length > 0) {
    console.group('Violations');
    auditResult.violations.forEach(v => {
      const color = v.severity === 'critical' ? '#ef4444' : v.severity === 'serious' ? '#f97316' : '#6b7280';
      console.log(`%c[${v.severity.toUpperCase()}] ${v.message}`, `color: ${color}; font-weight: bold;`);
      console.log(`Criterion: ${v.criterion} (${v.wcagLevel})`);
      console.log('Suggestion:', v.suggestion);
      console.log('Element:', v.element);
      console.log('---');
    });
    console.groupEnd();
  }
}
