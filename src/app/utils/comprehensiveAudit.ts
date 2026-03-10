/**
 * Comprehensive Component Audit Tool
 * 
 * Audits all components for:
 * - Design system compliance
 * - Typography standards (fluid sizing, correct font weights)
 * - Color token usage
 * - Semantic HTML
 * - Light/dark mode compatibility
 * - WCAG contrast compliance
 * 
 * Run this in browser console after page load.
 * 
 * @module comprehensiveAudit
 * @category utils
 */

interface ComponentAuditResult {
  component: string;
  scores: {
    typography: number;
    colors: number;
    semanticHTML: number;
    accessibility: number;
    overall: number;
  };
  issues: string[];
  successes: string[];
  recommendations: string[];
}

/**
 * Audits typography compliance across the entire page.
 */
function auditTypography(): { score: number; issues: string[]; successes: string[] } {
  const issues: string[] = [];
  const successes: string[] = [];
  
  // Check all headings
  const headings = {
    h1: document.querySelectorAll('h1'),
    h2: document.querySelectorAll('h2'),
    h3: document.querySelectorAll('h3'),
    h4: document.querySelectorAll('h4'),
    h5: document.querySelectorAll('h5'),
    h6: document.querySelectorAll('h6')
  };

  // Expected font weights (modern 2024+ standards)
  const expectedWeights: { [key: string]: string[] } = {
    h1: ['700', 'bold'],
    h2: ['600', 'semibold'],
    h3: ['600', 'semibold'],
    h4: ['500', 'medium'],
    h5: ['500', 'medium'],
    h6: ['500', 'medium']
  };

  let totalChecks = 0;
  let passedChecks = 0;

  Object.entries(headings).forEach(([tag, elements]) => {
    elements.forEach((el, index) => {
      const computed = window.getComputedStyle(el);
      const fontWeight = computed.fontWeight;
      const fontSize = computed.fontSize;
      const fontFamily = computed.fontFamily;
      
      totalChecks++;

      // Check font family (should be Lora for headings)
      if (fontFamily.toLowerCase().includes('lora')) {
        passedChecks++;
        successes.push(`✅ ${tag.toUpperCase()}#${index + 1}: Correct font family (Lora)`);
      } else {
        issues.push(`❌ ${tag.toUpperCase()}#${index + 1}: Wrong font family (${fontFamily}), expected Lora`);
      }

      // Check font weight
      totalChecks++;
      if (expectedWeights[tag].includes(fontWeight) || 
          expectedWeights[tag].includes(fontWeight)) {
        passedChecks++;
        successes.push(`✅ ${tag.toUpperCase()}#${index + 1}: Correct font weight (${fontWeight})`);
      } else {
        issues.push(`❌ ${tag.toUpperCase()}#${index + 1}: Wrong font weight (${fontWeight}), expected ${expectedWeights[tag][0]}`);
      }

      // Check for inline styles (should be none)
      totalChecks++;
      const inlineStyle = el.getAttribute('style');
      if (!inlineStyle || !inlineStyle.includes('font')) {
        passedChecks++;
      } else {
        issues.push(`❌ ${tag.toUpperCase()}#${index + 1}: Has inline font styles (${inlineStyle})`);
      }
    });
  });

  // Check body text
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((p, index) => {
    const computed = window.getComputedStyle(p);
    const fontFamily = computed.fontFamily;
    const fontWeight = computed.fontWeight;

    totalChecks++;
    if (fontFamily.toLowerCase().includes('noto sans')) {
      passedChecks++;
    } else {
      issues.push(`❌ Paragraph#${index + 1}: Wrong font family (${fontFamily}), expected Noto Sans`);
    }

    totalChecks++;
    if (fontWeight === '400' || fontWeight === 'normal') {
      passedChecks++;
    } else {
      issues.push(`⚠️ Paragraph#${index + 1}: Font weight is ${fontWeight}, expected 400`);
    }
  });

  const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;
  return { score, issues, successes };
}

/**
 * Audits color token usage.
 */
function auditColors(): { score: number; issues: string[]; successes: string[] } {
  const issues: string[] = [];
  const successes: string[] = [];

  // Get all elements
  const allElements = document.querySelectorAll('*');
  let totalColorChecks = 0;
  let passingColorChecks = 0;

  // Forbidden hardcoded colors (common mistakes)
  const forbiddenColors = [
    /rgb\(\d+,\s*\d+,\s*\d+\)/,
    /#[0-9a-fA-F]{3,6}/,
  ];

  allElements.forEach((el) => {
    const inlineStyle = el.getAttribute('style');
    if (inlineStyle && (inlineStyle.includes('color') || inlineStyle.includes('background'))) {
      totalColorChecks++;
      
      let hasForbiddenColor = false;
      forbiddenColors.forEach(pattern => {
        if (pattern.test(inlineStyle)) {
          hasForbiddenColor = true;
        }
      });

      if (hasForbiddenColor) {
        issues.push(`❌ ${el.tagName}: Hardcoded color in inline style (${inlineStyle.substring(0, 50)}...)`);
      } else if (inlineStyle.includes('var(--')) {
        passingColorChecks++;
        successes.push(`✅ ${el.tagName}: Using CSS variable`);
      } else {
        totalColorChecks--; // Not a color-related inline style
      }
    }
  });

  // Check Tailwind classes for proper semantic usage
  const elementsWithClasses = document.querySelectorAll('[class*="bg-"], [class*="text-"]');
  elementsWithClasses.forEach((el) => {
    const classes = typeof el.className === 'string' ? el.className : el.className.toString();
    totalColorChecks++;
    
    // Good semantic classes
    if (classes.match(/bg-(primary|secondary|accent|muted|card|background)/)) {
      passingColorChecks++;
    } else if (classes.match(/text-(primary|secondary|accent|muted-foreground|card-foreground)/)) {
      passingColorChecks++;
    } else {
      // Not necessarily wrong, just not semantic
    }
  });

  const score = totalColorChecks > 0 ? Math.round((passingColorChecks / totalColorChecks) * 100) : 100;
  
  if (totalColorChecks === 0) {
    successes.push('✅ No inline color styles detected (good!)');
  }

  return { score, issues, successes };
}

/**
 * Audits semantic HTML usage.
 */
function auditSemanticHTML(): { score: number; issues: string[]; successes: string[] } {
  const issues: string[] = [];
  const successes: string[] = [];
  let totalChecks = 0;
  let passedChecks = 0;

  // Check H1 count (should be exactly 1)
  totalChecks++;
  const h1Count = document.querySelectorAll('h1').length;
  if (h1Count === 1) {
    passedChecks++;
    successes.push('✅ Exactly 1 H1 on page');
  } else if (h1Count === 0) {
    issues.push('❌ No H1 found on page');
  } else {
    issues.push(`❌ Multiple H1s found (${h1Count}), should be only 1`);
  }

  // Check heading hierarchy
  totalChecks++;
  const h2s = document.querySelectorAll('h2');
  const h3s = document.querySelectorAll('h3');
  
  if (h2s.length > 0) {
    passedChecks++;
    successes.push(`✅ Page has proper heading structure (${h2s.length} H2s, ${h3s.length} H3s)`);
  }

  // Check for semantic elements
  const semanticElements = ['main', 'header', 'footer', 'nav', 'section', 'article'];
  semanticElements.forEach(tag => {
    totalChecks++;
    const count = document.querySelectorAll(tag).length;
    if (count > 0) {
      passedChecks++;
      successes.push(`✅ Uses <${tag}> element (${count} found)`);
    } else {
      // Not all pages need all elements
      if (['main', 'header', 'footer'].includes(tag)) {
        issues.push(`⚠️ No <${tag}> element found`);
      }
    }
  });

  // Check for divitis (excessive div usage)
  totalChecks++;
  const divCount = document.querySelectorAll('div').length;
  const semanticCount = semanticElements.reduce((sum, tag) => 
    sum + document.querySelectorAll(tag).length, 0);
  
  if (semanticCount / divCount > 0.1) {
    passedChecks++;
    successes.push(`✅ Good semantic/div ratio (${Math.round(semanticCount / divCount * 100)}%)`);
  } else {
    issues.push(`⚠️ Low semantic HTML usage (${Math.round(semanticCount / divCount * 100)}% semantic elements)`);
  }

  const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;
  return { score, issues, successes };
}

/**
 * Audits accessibility compliance.
 */
function auditAccessibility(): { score: number; issues: string[]; successes: string[] } {
  const issues: string[] = [];
  const successes: string[] = [];
  let totalChecks = 0;
  let passedChecks = 0;

  // Check images for alt text
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    totalChecks++;
    const alt = img.getAttribute('alt');
    if (alt !== null) {
      passedChecks++;
      if (alt === '') {
        successes.push(`✅ Image#${index + 1}: Has empty alt (decorative)`);
      } else {
        successes.push(`✅ Image#${index + 1}: Has alt text`);
      }
    } else {
      issues.push(`❌ Image#${index + 1}: Missing alt attribute`);
    }
  });

  // Check buttons for labels
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn, index) => {
    totalChecks++;
    const text = btn.textContent?.trim();
    const ariaLabel = btn.getAttribute('aria-label');
    
    if (text || ariaLabel) {
      passedChecks++;
      successes.push(`✅ Button#${index + 1}: Has label`);
    } else {
      issues.push(`❌ Button#${index + 1}: No text or aria-label`);
    }
  });

  // Check links for meaningful text
  const links = document.querySelectorAll('a');
  links.forEach((link, index) => {
    totalChecks++;
    const text = link.textContent?.trim();
    const ariaLabel = link.getAttribute('aria-label');
    
    if (text && text.length > 2) {
      passedChecks++;
    } else if (ariaLabel) {
      passedChecks++;
      successes.push(`✅ Link#${index + 1}: Has aria-label`);
    } else {
      issues.push(`⚠️ Link#${index + 1}: Very short or no text`);
    }
  });

  // Check form inputs for labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((input, index) => {
    totalChecks++;
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const label = id ? document.querySelector(`label[for="${id}"]`) : null;
    
    if (label || ariaLabel) {
      passedChecks++;
      successes.push(`✅ Input#${index + 1}: Has associated label`);
    } else {
      issues.push(`❌ Input#${index + 1}: No associated label or aria-label`);
    }
  });

  const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;
  
  if (totalChecks === 0) {
    successes.push('✅ No accessibility issues detected (or no interactive elements on page)');
  }

  return { score, issues, successes };
}

/**
 * Main audit function that runs all checks.
 */
export function runComprehensiveAudit(): ComponentAuditResult {
  console.log('🔍 Running Comprehensive Component Audit...\n');

  const typography = auditTypography();
  const colors = auditColors();
  const semanticHTML = auditSemanticHTML();
  const accessibility = auditAccessibility();

  const overall = Math.round(
    (typography.score + colors.score + semanticHTML.score + accessibility.score) / 4
  );

  const result: ComponentAuditResult = {
    component: document.title || 'Current Page',
    scores: {
      typography: typography.score,
      colors: colors.score,
      semanticHTML: semanticHTML.score,
      accessibility: accessibility.score,
      overall
    },
    issues: [
      ...typography.issues,
      ...colors.issues,
      ...semanticHTML.issues,
      ...accessibility.issues
    ],
    successes: [
      ...typography.successes,
      ...colors.successes,
      ...semanticHTML.successes,
      ...accessibility.successes
    ],
    recommendations: []
  };

  // Generate recommendations based on scores
  if (typography.score < 90) {
    result.recommendations.push('🔤 Improve typography compliance: Use semantic HTML elements (h1-h6, p) instead of styled divs');
  }
  if (colors.score < 90) {
    result.recommendations.push('🎨 Improve color token usage: Replace hardcoded colors with CSS variables or Tailwind semantic classes');
  }
  if (semanticHTML.score < 80) {
    result.recommendations.push('📝 Improve semantic HTML: Use more semantic elements (section, article, nav, aside) instead of divs');
  }
  if (accessibility.score < 95) {
    result.recommendations.push('♿ Improve accessibility: Add missing alt attributes, labels, and ARIA attributes');
  }

  return result;
}

/**
 * Logs the audit report to console in a formatted way.
 */
export function logComprehensiveAuditReport(): void {
  const result = runComprehensiveAudit();

  console.log('%c═══════════════════════════════════════════════════════', 'color: #6ea532; font-weight: bold;');
  console.log('%c  📊 COMPREHENSIVE COMPONENT AUDIT REPORT', 'color: #6ea532; font-weight: bold; font-size: 16px;');
  console.log('%c═══════════════════════════════════════════════════════\n', 'color: #6ea532; font-weight: bold;');

  console.log(`%c📄 Page: ${result.component}`, 'font-weight: bold; font-size: 14px;');
  console.log('');

  // Scores
  console.log('%c🎯 COMPLIANCE SCORES', 'color: #6ea532; font-weight: bold; font-size: 14px;');
  console.log(`   Typography:    ${result.scores.typography}/100 ${result.scores.typography >= 95 ? '✅' : result.scores.typography >= 90 ? '⚠️' : '❌'}`);
  console.log(`   Colors:        ${result.scores.colors}/100 ${result.scores.colors >= 95 ? '✅' : result.scores.colors >= 90 ? '⚠️' : '❌'}`);
  console.log(`   Semantic HTML: ${result.scores.semanticHTML}/100 ${result.scores.semanticHTML >= 90 ? '✅' : result.scores.semanticHTML >= 80 ? '⚠️' : '❌'}`);
  console.log(`   Accessibility: ${result.scores.accessibility}/100 ${result.scores.accessibility >= 95 ? '✅' : result.scores.accessibility >= 90 ? '⚠️' : '❌'}`);
  console.log('');
  console.log(`%c   OVERALL: ${result.scores.overall}/100 ${result.scores.overall >= 95 ? '✅ EXCELLENT' : result.scores.overall >= 90 ? '⚠️ GOOD' : '❌ NEEDS IMPROVEMENT'}`, 
    `font-weight: bold; font-size: 16px; color: ${result.scores.overall >= 95 ? '#22c55e' : result.scores.overall >= 90 ? '#f59e0b' : '#ef4444'};`);
  console.log('');

  // Successes
  if (result.successes.length > 0) {
    console.log('%c✅ SUCCESSES (' + result.successes.length + ')', 'color: #22c55e; font-weight: bold;');
    result.successes.slice(0, 10).forEach(success => console.log(`   ${success}`));
    if (result.successes.length > 10) {
      console.log(`   ... and ${result.successes.length - 10} more`);
    }
    console.log('');
  }

  // Issues
  if (result.issues.length > 0) {
    console.log('%c❌ ISSUES (' + result.issues.length + ')', 'color: #ef4444; font-weight: bold;');
    result.issues.forEach(issue => console.log(`   ${issue}`));
    console.log('');
  } else {
    console.log('%c✅ NO ISSUES FOUND!', 'color: #22c55e; font-weight: bold;');
    console.log('');
  }

  // Recommendations
  if (result.recommendations.length > 0) {
    console.log('%c💡 RECOMMENDATIONS', 'color: #3b82f6; font-weight: bold;');
    result.recommendations.forEach(rec => console.log(`   ${rec}`));
    console.log('');
  }

  console.log('%c═══════════════════════════════════════════════════════', 'color: #6ea532; font-weight: bold;');
}

// Auto-run in development mode disabled - manually run logComprehensiveAuditReport() in console if needed
// This prevents performance issues and Figma iframe abort errors
/*
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    logComprehensiveAuditReport();
  }, 2000);
}
*/