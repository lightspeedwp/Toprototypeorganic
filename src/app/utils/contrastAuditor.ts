/**
 * WCAG Contrast Auditor
 * 
 * Comprehensive contrast checking tool for light and dark modes.
 * Tests all color combinations against WCAG AA (4.5:1) and AAA (7.1:1) standards.
 * 
 * **Features:**
 * - Automatic light/dark mode detection
 * - WCAG 2.1 Level AA and AAA compliance
 * - Real-time DOM element scanning
 * - Detailed violation reports
 * - Actionable fix recommendations
 * 
 * @module contrastAuditor
 * @category utils
 * @version 3.0
 */

/**
 * Color contrast result for a single element.
 */
export interface ContrastResult {
  /** Element selector/description */
  element: string;
  /** Foreground color (text) */
  foreground: string;
  /** Background color */
  background: string;
  /** Calculated contrast ratio */
  ratio: number;
  /** Passes WCAG AA (4.5:1 for normal text) */
  passesAA: boolean;
  /** Passes WCAG AAA (7:1 for normal text) */
  passesAAA: boolean;
  /** Element size (affects requirements) */
  isLargeText: boolean;
  /** Current theme mode */
  mode: 'light' | 'dark';
}

/**
 * Complete contrast audit report.
 */
export interface ContrastReport {
  /** Current theme mode */
  mode: 'light' | 'dark';
  /** Total elements checked */
  totalElements: number;
  /** Elements passing AA */
  passAA: number;
  /** Elements passing AAA */
  passAAA: number;
  /** Failing elements */
  failures: ContrastResult[];
  /** Overall score (0-100) */
  score: number;
  /** Compliance level */
  level: 'AAA' | 'AA' | 'Fail';
  /** Generated timestamp */
  timestamp: string;
}

/**
 * Converts RGB color to luminance value.
 * 
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} Relative luminance (0-1)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(val => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Parses RGB/RGBA string to color values.
 * 
 * @param {string} color - RGB/RGBA color string
 * @returns {[number, number, number, number]} RGBA values
 */
function parseColor(color: string): [number, number, number, number] {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) {
    return [0, 0, 0, 1];
  }
  
  return [
    parseInt(match[1]),
    parseInt(match[2]),
    parseInt(match[3]),
    match[4] ? parseFloat(match[4]) : 1
  ];
}

/**
 * Calculates contrast ratio between two colors.
 * 
 * @param {string} fg - Foreground color (RGB/RGBA string)
 * @param {string} bg - Background color (RGB/RGBA string)
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(fg: string, bg: string): number {
  const [r1, g1, b1] = parseColor(fg);
  const [r2, g2, b2] = parseColor(bg);
  
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determines if text is considered "large" by WCAG standards.
 * Large text: 18pt+ (24px+) or 14pt+ bold (18.66px+)
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if text is large
 */
function isLargeText(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  const fontSize = parseFloat(style.fontSize);
  const fontWeight = parseInt(style.fontWeight);
  
  // 18pt = 24px or larger
  if (fontSize >= 24) return true;
  
  // 14pt bold = 18.66px or larger with bold weight
  if (fontSize >= 18.66 && fontWeight >= 700) return true;
  
  return false;
}

/**
 * Gets the effective background color of an element.
 * Traverses up the DOM tree to find the first opaque background.
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {string} RGB/RGBA background color
 */
function getEffectiveBackgroundColor(element: HTMLElement): string {
  let current: HTMLElement | null = element;
  
  while (current) {
    const style = window.getComputedStyle(current);
    const bgColor = style.backgroundColor;
    
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      const [, , , a] = parseColor(bgColor);
      if (a > 0.8) { // Consider mostly opaque as effective background
        return bgColor;
      }
    }
    
    current = current.parentElement;
  }
  
  // Default to document background
  return window.getComputedStyle(document.body).backgroundColor || 'rgb(255, 255, 255)';
}

/**
 * Checks if element should be included in audit.
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if should be audited
 */
function shouldAuditElement(element: HTMLElement): boolean {
  // Skip hidden elements
  if (element.offsetWidth === 0 || element.offsetHeight === 0) {
    return false;
  }
  
  // Skip SVG elements
  if (element instanceof SVGElement) {
    return false;
  }
  
  // Only audit text-containing elements
  const style = window.getComputedStyle(element);
  const hasText = element.textContent && element.textContent.trim().length > 0;
  const hasColor = style.color && style.color !== 'rgba(0, 0, 0, 0)';
  
  return hasText && hasColor;
}

/**
 * Audits contrast for all text elements on the page.
 * 
 * @returns {ContrastReport} Complete contrast audit report
 */
export function auditContrast(): ContrastReport {
  const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const results: ContrastResult[] = [];
  const failures: ContrastResult[] = [];
  
  // Get all text-containing elements
  const elements = Array.from(document.querySelectorAll('*')).filter(el => 
    shouldAuditElement(el as HTMLElement)
  );
  
  elements.forEach((el) => {
    const element = el as HTMLElement;
    const style = window.getComputedStyle(element);
    
    const foreground = style.color;
    const background = getEffectiveBackgroundColor(element);
    
    if (!foreground || !background) return;
    
    const ratio = getContrastRatio(foreground, background);
    const large = isLargeText(element);
    
    // WCAG thresholds
    const aaThreshold = large ? 3.0 : 4.5;
    const aaaThreshold = large ? 4.5 : 7.0;
    
    const passesAA = ratio >= aaThreshold;
    const passesAAA = ratio >= aaaThreshold;
    
    const result: ContrastResult = {
      element: `${element.tagName.toLowerCase()}${element.className ? `.${element.className.split(' ')[0]}` : ''}`,
      foreground,
      background,
      ratio: Math.round(ratio * 100) / 100,
      passesAA,
      passesAAA,
      isLargeText: large,
      mode,
    };
    
    results.push(result);
    
    if (!passesAA) {
      failures.push(result);
    }
  });
  
  const passAA = results.filter(r => r.passesAA).length;
  const passAAA = results.filter(r => r.passesAAA).length;
  const score = results.length > 0 ? Math.round((passAA / results.length) * 100) : 100;
  
  let level: 'AAA' | 'AA' | 'Fail';
  if (passAAA === results.length) {
    level = 'AAA';
  } else if (passAA === results.length) {
    level = 'AA';
  } else {
    level = 'Fail';
  }
  
  return {
    mode,
    totalElements: results.length,
    passAA,
    passAAA,
    failures,
    score,
    level,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Logs contrast report to console with detailed information.
 * 
 * @param {ContrastReport} [report] - Report to log (auto-generates if not provided)
 * 
 * @example
 * logContrastReport();
 */
export function logContrastReport(report?: ContrastReport): void {
  const auditReport = report || auditContrast();
  
  console.log('='.repeat(60));
  console.log(`WCAG CONTRAST AUDIT - ${auditReport.mode.toUpperCase()} MODE`);
  console.log('='.repeat(60));
  console.log(`Overall Score: ${auditReport.score}/100`);
  console.log(`Compliance Level: ${auditReport.level}`);
  console.log(`Total Elements: ${auditReport.totalElements}`);
  console.log(`Passing AA (4.5:1): ${auditReport.passAA} (${Math.round((auditReport.passAA / auditReport.totalElements) * 100)}%)`);
  console.log(`Passing AAA (7:1): ${auditReport.passAAA} (${Math.round((auditReport.passAAA / auditReport.totalElements) * 100)}%)`);
  console.log(`Timestamp: ${new Date(auditReport.timestamp).toLocaleString()}`);
  console.log('');
  
  if (auditReport.failures.length > 0) {
    console.log(`⚠️  ${auditReport.failures.length} CONTRAST FAILURES:`);
    console.log('');
    
    auditReport.failures.slice(0, 20).forEach((failure, index) => {
      console.log(`${index + 1}. ${failure.element}`);
      console.log(`   Ratio: ${failure.ratio}:1 (${failure.isLargeText ? 'Large text' : 'Normal text'})`);
      console.log(`   Foreground: ${failure.foreground}`);
      console.log(`   Background: ${failure.background}`);
      console.log(`   Required: ${failure.isLargeText ? '3.0:1 (AA), 4.5:1 (AAA)' : '4.5:1 (AA), 7.0:1 (AAA)'}`);
      console.log('');
    });
    
    if (auditReport.failures.length > 20) {
      console.log(`... and ${auditReport.failures.length - 20} more failures`);
    }
  } else {
    console.log('✅ All elements pass WCAG AA contrast requirements!');
  }
  
  console.log('='.repeat(60));
}

/**
 * Tests specific color combinations against WCAG standards.
 * 
 * @param {string} foreground - Foreground color (RGB/RGBA)
 * @param {string} background - Background color (RGB/RGBA)
 * @param {boolean} [isLarge=false] - Is text considered large?
 * @returns {Object} Test result with pass/fail status
 * 
 * @example
 * testColorPair('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
 * // Returns: { ratio: 21, passesAA: true, passesAAA: true }
 */
export function testColorPair(
  foreground: string, 
  background: string, 
  isLarge: boolean = false
): {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  recommendation: string;
} {
  const ratio = getContrastRatio(foreground, background);
  const aaThreshold = isLarge ? 3.0 : 4.5;
  const aaaThreshold = isLarge ? 4.5 : 7.0;
  
  const passesAA = ratio >= aaThreshold;
  const passesAAA = ratio >= aaaThreshold;
  
  let recommendation = '';
  if (!passesAA) {
    recommendation = `Fails WCAG AA. Increase contrast to at least ${aaThreshold}:1. Current: ${ratio.toFixed(2)}:1`;
  } else if (!passesAAA) {
    recommendation = `Passes AA but not AAA. For AAA compliance, increase to ${aaaThreshold}:1. Current: ${ratio.toFixed(2)}:1`;
  } else {
    recommendation = `✅ Passes both WCAG AA and AAA standards!`;
  }
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA,
    passesAAA,
    recommendation,
  };
}

/**
 * Runs contrast audit for both light and dark modes.
 * Requires toggling theme and re-running audit.
 * 
 * @returns {Object} Reports for both modes
 * 
 * @example
 * const { light, dark } = await auditBothModes();
 */
export async function auditBothModes(): Promise<{
  light: ContrastReport;
  dark: ContrastReport;
}> {
  // Get current mode
  const isDark = document.documentElement.classList.contains('dark');
  
  // Audit light mode
  if (isDark) {
    document.documentElement.classList.remove('dark');
    await new Promise(resolve => setTimeout(resolve, 100)); // Let DOM update
  }
  const lightReport = auditContrast();
  
  // Audit dark mode
  document.documentElement.classList.add('dark');
  await new Promise(resolve => setTimeout(resolve, 100)); // Let DOM update
  const darkReport = auditContrast();
  
  // Restore original mode
  if (!isDark) {
    document.documentElement.classList.remove('dark');
  }
  
  return { light: lightReport, dark: darkReport };
}

/**
 * Logs comparison of light and dark mode contrast.
 * 
 * @example
 * await logBothModesComparison();
 */
export async function logBothModesComparison(): Promise<void> {
  console.log('🔍 Running contrast audit for BOTH modes...\n');
  
  const { light, dark } = await auditBothModes();
  
  console.log('='.repeat(60));
  console.log('LIGHT & DARK MODE CONTRAST COMPARISON');
  console.log('='.repeat(60));
  console.log('');
  console.log('LIGHT MODE:');
  console.log(`  Score: ${light.score}/100`);
  console.log(`  Level: ${light.level}`);
  console.log(`  AA Pass: ${light.passAA}/${light.totalElements} (${Math.round((light.passAA / light.totalElements) * 100)}%)`);
  console.log(`  AAA Pass: ${light.passAAA}/${light.totalElements} (${Math.round((light.passAAA / light.totalElements) * 100)}%)`);
  console.log(`  Failures: ${light.failures.length}`);
  console.log('');
  console.log('DARK MODE:');
  console.log(`  Score: ${dark.score}/100`);
  console.log(`  Level: ${dark.level}`);
  console.log(`  AA Pass: ${dark.passAA}/${dark.totalElements} (${Math.round((dark.passAA / dark.totalElements) * 100)}%)`);
  console.log(`  AAA Pass: ${dark.passAAA}/${dark.totalElements} (${Math.round((dark.passAAA / dark.totalElements) * 100)}%)`);
  console.log(`  Failures: ${dark.failures.length}`);
  console.log('');
  
  if (light.failures.length > 0) {
    console.log(`⚠️  LIGHT MODE FAILURES (${light.failures.length}):`);
    light.failures.slice(0, 5).forEach((f, i) => {
      console.log(`  ${i + 1}. ${f.element}: ${f.ratio}:1`);
    });
    console.log('');
  }
  
  if (dark.failures.length > 0) {
    console.log(`⚠️  DARK MODE FAILURES (${dark.failures.length}):`);
    dark.failures.slice(0, 5).forEach((f, i) => {
      console.log(`  ${i + 1}. ${f.element}: ${f.ratio}:1`);
    });
    console.log('');
  }
  
  console.log('='.repeat(60));
}
