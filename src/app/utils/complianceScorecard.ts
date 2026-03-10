/**
 * Design System Compliance Scorecard
 * 
 * Audits components and pages for compliance with design system guidelines:
 * - Fluid typography usage
 * - Fluid spacing usage
 * - Semantic HTML
 * - Color token usage
 * - Font weight standards
 * - Accessibility compliance
 * 
 * @module complianceScorecard
 * @category utils
 */

/**
 * Compliance check result.
 */
export interface ComplianceResult {
  /** Category name */
  category: string;
  /** Pass/fail status */
  passed: boolean;
  /** Score (0-100) */
  score: number;
  /** Issues found */
  issues: string[];
  /** Recommendations */
  recommendations: string[];
}

/**
 * Complete compliance report.
 */
export interface ComplianceReport {
  /** Overall score (0-100) */
  overallScore: number;
  /** Category results */
  categories: ComplianceResult[];
  /** Total issues count */
  totalIssues: number;
  /** Compliance level */
  level: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
  /** Generated timestamp */
  timestamp: string;
}

/**
 * Checks if element uses fluid typography (clamp-based font sizes).
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if using fluid typography
 */
function usesFluidTypography(element: HTMLElement): boolean {
  const computedStyle = window.getComputedStyle(element);
  const fontSize = computedStyle.fontSize;
  
  // Check if font-size is a CSS variable (which uses clamp)
  // or directly uses clamp()
  return fontSize.includes('clamp') || 
         computedStyle.getPropertyValue('font-size').includes('var(--text-');
}

/**
 * Checks if element uses semantic HTML.
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if semantic
 */
function isSemanticHTML(element: HTMLElement): boolean {
  const semanticTags = [
    'header', 'nav', 'main', 'section', 'article', 'aside', 
    'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
    'p', 'ul', 'ol', 'li', 'blockquote', 'figure', 
    'figcaption', 'time', 'address'
  ];
  
  return semanticTags.includes(element.tagName.toLowerCase());
}

/**
 * Checks if element uses design system colors.
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if using design system colors
 */
function usesDesignSystemColors(element: HTMLElement): boolean {
  const computedStyle = window.getComputedStyle(element);
  const backgroundColor = computedStyle.backgroundColor;
  const color = computedStyle.color;
  
  // Check if colors are using CSS variables or rgba values from design system
  // (not hardcoded hex colors)
  const hasVarColor = color.includes('var(--') || backgroundColor.includes('var(--');
  const hasRgbaColor = color.includes('rgba') || backgroundColor.includes('rgba');
  
  return hasVarColor || hasRgbaColor || 
         (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent');
}

/**
 * Checks if element uses proper font weight.
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {Object} Font weight analysis
 */
function analyzesFontWeight(element: HTMLElement): {
  valid: boolean;
  weight: string;
  expectedWeight: string | null;
} {
  const computedStyle = window.getComputedStyle(element);
  const fontWeight = computedStyle.fontWeight;
  const tagName = element.tagName.toLowerCase();
  
  // Define expected weights for semantic elements based on updated theme.css
  const expectedWeights: Record<string, string> = {
    'h1': '700', // bold (updated from semibold)
    'h2': '600', // semibold (updated from medium)
    'h3': '600', // semibold (updated from medium)
    'h4': '500', // medium
    'h5': '500', // medium
    'h6': '500', // medium
    'p': '400',  // normal
    'button': '500', // medium
    'label': '500', // medium
    'strong': '600', // semibold
    'b': '600', // semibold
  };
  
  const expectedWeight = expectedWeights[tagName] || null;
  const valid = expectedWeight === null || fontWeight === expectedWeight;
  
  return {
    valid,
    weight: fontWeight,
    expectedWeight,
  };
}

/**
 * Audits fluid typography compliance.
 * 
 * @returns {ComplianceResult} Compliance result for fluid typography
 */
export function auditFluidTypography(): ComplianceResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Check all headings
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let headingsWithFluidType = 0;
  
  headings.forEach((heading) => {
    if (usesFluidTypography(heading as HTMLElement)) {
      headingsWithFluidType++;
    } else {
      const computedStyle = window.getComputedStyle(heading as HTMLElement);
      const fontSize = computedStyle.fontSize;
      issues.push(`${heading.tagName} has fixed font-size: ${fontSize} (should use fluid typography)`);
    }
  });
  
  // Check paragraphs
  const paragraphs = document.querySelectorAll('p');
  let paragraphsWithFluidType = 0;
  
  paragraphs.forEach((p) => {
    if (usesFluidTypography(p as HTMLElement)) {
      paragraphsWithFluidType++;
    }
  });
  
  const totalElements = headings.length + paragraphs.length;
  const compliantElements = headingsWithFluidType + paragraphsWithFluidType;
  const score = totalElements > 0 ? Math.round((compliantElements / totalElements) * 100) : 100;
  
  if (score < 90) {
    recommendations.push('Use CSS variable font sizes (var(--text-*)) for responsive typography');
    recommendations.push('Avoid hardcoded font-size values (px, rem) in components');
  }
  
  if (issues.length > 10) {
    issues.splice(10);
    issues.push(`... and ${issues.length - 10} more issues`);
  }
  
  return {
    category: 'Fluid Typography',
    passed: score >= 90,
    score,
    issues,
    recommendations,
  };
}

/**
 * Audits semantic HTML compliance.
 * 
 * @returns {ComplianceResult} Compliance result for semantic HTML
 */
export function auditSemanticHTML(): ComplianceResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Check for divs that should be semantic elements
  const allElements = document.querySelectorAll('*');
  let semanticCount = 0;
  let nonSemanticCount = 0;
  
  allElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const tagName = htmlElement.tagName.toLowerCase();
    
    if (isSemanticHTML(htmlElement)) {
      semanticCount++;
    } else if (tagName === 'div' || tagName === 'span') {
      nonSemanticCount++;
      
      // Check if div should be a semantic element
      const classList = Array.from(htmlElement.classList);
      if (classList.some(c => c.includes('header'))) {
        issues.push(`<div class="${classList.join(' ')}"> should be <header>`);
      } else if (classList.some(c => c.includes('footer'))) {
        issues.push(`<div class="${classList.join(' ')}"> should be <footer>`);
      } else if (classList.some(c => c.includes('nav'))) {
        issues.push(`<div class="${classList.join(' ')}"> should be <nav>`);
      } else if (classList.some(c => c.includes('section'))) {
        issues.push(`<div class="${classList.join(' ')}"> should be <section>`);
      }
    }
  });
  
  // Check heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const h1Count = headings.filter(h => h.tagName === 'H1').length;
  
  if (h1Count === 0) {
    issues.push('No H1 heading found on page (accessibility issue)');
  } else if (h1Count > 1) {
    issues.push(`Multiple H1 headings found (${h1Count}). Should have exactly one H1 per page.`);
  }
  
  // Check for proper heading order
  let lastLevel = 0;
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    if (lastLevel > 0 && level > lastLevel + 1) {
      issues.push(`Heading hierarchy skip: ${heading.tagName} after H${lastLevel} (should increment by 1)`);
    }
    lastLevel = level;
  });
  
  const totalElements = semanticCount + nonSemanticCount;
  const score = totalElements > 0 ? Math.round((semanticCount / totalElements) * 100) : 100;
  
  if (score < 80) {
    recommendations.push('Use semantic HTML elements (header, nav, main, section, article, footer)');
    recommendations.push('Replace divs with semantic equivalents where appropriate');
  }
  
  if (issues.length > 10) {
    const remaining = issues.length - 10;
    issues.splice(10);
    issues.push(`... and ${remaining} more issues`);
  }
  
  return {
    category: 'Semantic HTML',
    passed: score >= 80 && h1Count === 1,
    score,
    issues,
    recommendations,
  };
}

/**
 * Audits font weight compliance with design system.
 * 
 * @returns {ComplianceResult} Compliance result for font weights
 */
export function auditFontWeights(): ComplianceResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Check all text elements
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, label, strong, b');
  let compliantCount = 0;
  
  textElements.forEach((element) => {
    const analysis = analyzesFontWeight(element as HTMLElement);
    if (analysis.valid) {
      compliantCount++;
    } else if (analysis.expectedWeight) {
      issues.push(
        `${element.tagName} has font-weight: ${analysis.weight} (expected: ${analysis.expectedWeight})`
      );
    }
  });
  
  const score = textElements.length > 0 
    ? Math.round((compliantCount / textElements.length) * 100) 
    : 100;
  
  if (score < 90) {
    recommendations.push('H1: Use font-weight: 700 (bold)');
    recommendations.push('H2-H6: Use font-weight: 600 (semibold)');
    recommendations.push('Body/paragraphs: Use font-weight: 400 (normal)');
    recommendations.push('Buttons/labels: Use font-weight: 500 (medium)');
    recommendations.push('Strong/bold: Use font-weight: 600 (semibold)');
  }
  
  if (issues.length > 10) {
    const remaining = issues.length - 10;
    issues.splice(10);
    issues.push(`... and ${remaining} more issues`);
  }
  
  return {
    category: 'Font Weights',
    passed: score >= 90,
    score,
    issues,
    recommendations,
  };
}

/**
 * Audits color token compliance.
 * 
 * @returns {ComplianceResult} Compliance result for colors
 */
export function auditColorTokens(): ComplianceResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Check all visible elements
  const visibleElements = Array.from(document.querySelectorAll('*')).filter((el) => {
    const htmlEl = el as HTMLElement;
    return htmlEl.offsetWidth > 0 && htmlEl.offsetHeight > 0;
  });
  
  let compliantCount = 0;
  
  visibleElements.forEach((element) => {
    if (usesDesignSystemColors(element as HTMLElement)) {
      compliantCount++;
    } else {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      const color = computedStyle.color;
      const backgroundColor = computedStyle.backgroundColor;
      
      if (color && color !== 'rgb(0, 0, 0)' && !color.includes('var')) {
        const tagName = (element as HTMLElement).tagName.toLowerCase();
        const classes = Array.from((element as HTMLElement).classList).join(' ');
        issues.push(`${tagName}${classes ? `.${classes.split(' ')[0]}` : ''} uses hardcoded color: ${color}`);
      }
    }
  });
  
  const score = visibleElements.length > 0 
    ? Math.round((compliantCount / visibleElements.length) * 100) 
    : 100;
  
  if (score < 90) {
    recommendations.push('Use Tailwind color classes (bg-primary, text-foreground, etc.)');
    recommendations.push('Avoid hardcoded hex colors (#000000) or rgb() values');
    recommendations.push('All colors should reference CSS variables from theme.css');
  }
  
  if (issues.length > 10) {
    const remaining = issues.length - 10;
    issues.splice(10);
    issues.push(`... and ${remaining} more issues`);
  }
  
  return {
    category: 'Color Tokens',
    passed: score >= 90,
    score,
    issues,
    recommendations,
  };
}

/**
 * Audits fluid spacing compliance.
 * 
 * @returns {ComplianceResult} Compliance result for fluid spacing
 */
export function auditFluidSpacing(): ComplianceResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Check for responsive spacing classes
  const allElements = document.querySelectorAll('*');
  let responsiveSpacingCount = 0;
  let fixedSpacingCount = 0;
  
  allElements.forEach((element) => {
    const classList = Array.from((element as HTMLElement).classList);
    
    // Check for responsive spacing (e.g., py-12 md:py-16 lg:py-20)
    const hasResponsiveSpacing = classList.some(c => 
      (c.includes('md:') || c.includes('lg:')) && 
      (c.includes('p-') || c.includes('m-') || c.includes('gap-') || c.includes('space-'))
    );
    
    const hasFixedSpacing = classList.some(c => 
      (c.startsWith('p-') || c.startsWith('m-') || c.startsWith('gap-') || c.startsWith('space-')) &&
      !classList.some(c2 => c2.includes('md:') || c2.includes('lg:'))
    );
    
    if (hasResponsiveSpacing) {
      responsiveSpacingCount++;
    } else if (hasFixedSpacing) {
      fixedSpacingCount++;
      
      // Only report major spacing elements
      const tagName = (element as HTMLElement).tagName.toLowerCase();
      if (['section', 'div', 'header', 'footer', 'main'].includes(tagName)) {
        const spacingClass = classList.find(c => 
          c.startsWith('p-') || c.startsWith('m-') || c.startsWith('gap-')
        );
        if (spacingClass && !classList.some(c => c.includes('md:') || c.includes('lg:'))) {
          issues.push(`${tagName} uses fixed spacing (${spacingClass}) without responsive variants`);
        }
      }
    }
  });
  
  const totalSpacing = responsiveSpacingCount + fixedSpacingCount;
  const score = totalSpacing > 0 
    ? Math.round((responsiveSpacingCount / totalSpacing) * 100) 
    : 100;
  
  if (score < 70) {
    recommendations.push('Use responsive spacing: py-12 md:py-16 lg:py-20');
    recommendations.push('Increase spacing on larger screens for better use of space');
    recommendations.push('Apply responsive spacing to sections, containers, and major layout elements');
  }
  
  if (issues.length > 10) {
    const remaining = issues.length - 10;
    issues.splice(10);
    issues.push(`... and ${remaining} more issues`);
  }
  
  return {
    category: 'Fluid Spacing',
    passed: score >= 70,
    score,
    issues,
    recommendations,
  };
}

/**
 * Runs complete compliance audit.
 * 
 * @returns {ComplianceReport} Complete compliance report
 * 
 * @example
 * const report = runComplianceAudit();
 * console.log('Overall Score:', report.overallScore);
 * report.categories.forEach(cat => {
 *   console.log(`${cat.category}: ${cat.score}/100`);
 * });
 */
export function runComplianceAudit(): ComplianceReport {
  const categories: ComplianceResult[] = [
    auditFluidTypography(),
    auditSemanticHTML(),
    auditFontWeights(),
    auditColorTokens(),
    auditFluidSpacing(),
  ];
  
  const totalScore = categories.reduce((sum, cat) => sum + cat.score, 0);
  const overallScore = Math.round(totalScore / categories.length);
  const totalIssues = categories.reduce((sum, cat) => sum + cat.issues.length, 0);
  
  let level: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
  if (overallScore >= 90) {
    level = 'Excellent';
  } else if (overallScore >= 75) {
    level = 'Good';
  } else if (overallScore >= 60) {
    level = 'Needs Improvement';
  } else {
    level = 'Poor';
  }
  
  return {
    overallScore,
    categories,
    totalIssues,
    level,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Logs compliance report to console.
 * 
 * @example
 * logComplianceReport();
 */
export function logComplianceReport(): void {
  console.log('📋 Running Design System Compliance Audit...');
  
  const report = runComplianceAudit();
  
  console.log('='.repeat(60));
  console.log('DESIGN SYSTEM COMPLIANCE SCORECARD');
  console.log('='.repeat(60));
  console.log(`Overall Score: ${report.overallScore}/100 (${report.level})`);
  console.log(`Total Issues: ${report.totalIssues}`);
  console.log(`Timestamp: ${new Date(report.timestamp).toLocaleString()}`);
  console.log('');
  
  report.categories.forEach((category) => {
    const statusIcon = category.passed ? '✅' : '⚠️';
    console.log(`${statusIcon} ${category.category}: ${category.score}/100`);
    
    if (category.issues.length > 0) {
      console.log('  Issues:');
      category.issues.slice(0, 5).forEach(issue => {
        console.log(`    - ${issue}`);
      });
      if (category.issues.length > 5) {
        console.log(`    ... and ${category.issues.length - 5} more`);
      }
    }
    
    if (category.recommendations.length > 0) {
      console.log('  Recommendations:');
      category.recommendations.forEach(rec => {
        console.log(`    • ${rec}`);
      });
    }
    
    console.log('');
  });
  
  console.log('='.repeat(60));
}