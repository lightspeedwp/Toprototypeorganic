/**
 * Color Contrast Checker & WCAG Compliance Utility
 * 
 * Provides automated color contrast testing for WCAG 2.1 AA and AAA compliance.
 * Tests all color combinations in both light and dark modes.
 * 
 * **Features:**
 * - Automatic contrast ratio calculation
 * - WCAG AA (4.5:1) and AAA (7:1) validation
 * - Light/dark mode testing
 * - Component-level contrast audit
 * - Detailed failure reporting
 * 
 * **Usage:**
 * Run `runContrastAudit()` in development console to get comprehensive
 * contrast compliance report for all design system colors.
 * 
 * @module contrastChecker
 * @category utils
 */

/**
 * WCAG conformance level.
 */
export type WCAGLevel = 'AA' | 'AAA';

/**
 * Text size category for WCAG.
 */
export type TextSize = 'normal' | 'large';

/**
 * Contrast test result.
 */
export interface ContrastResult {
  /** Color pair being tested */
  pair: string;
  /** Calculated contrast ratio */
  ratio: number;
  /** WCAG AA compliance (4.5:1 normal, 3:1 large) */
  passAA: boolean;
  /** WCAG AAA compliance (7:1 normal, 4.5:1 large) */
  passAAA: boolean;
  /** Foreground color (hex) */
  fg: string;
  /** Background color (hex) */
  bg: string;
  /** Size context */
  size: TextSize;
}

/**
 * Complete contrast audit report.
 */
export interface ContrastAuditReport {
  /** Light mode results */
  light: {
    passed: ContrastResult[];
    failed: ContrastResult[];
    warnings: ContrastResult[];
  };
  /** Dark mode results */
  dark: {
    passed: ContrastResult[];
    failed: ContrastResult[];
    warnings: ContrastResult[];
  };
  /** Overall AA compliance percentage */
  aaCompliance: number;
  /** Overall AAA compliance percentage */
  aaaCompliance: number;
  /** Timestamp of audit */
  timestamp: string;
}

/**
 * Converts hex color to RGB.
 * 
 * @param {string} hex - Hex color (#RRGGBB or #RGB)
 * @returns {{ r: number, g: number, b: number }} RGB values (0-255)
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Expand shorthand (#RGB -> #RRGGBB)
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGBA string to RGB object.
 * 
 * @param {string} rgba - RGBA string (e.g., "rgba(255, 255, 255, 1)")
 * @returns {{ r: number, g: number, b: number }} RGB values (0-255)
 */
function rgbaToRgb(rgba: string): { r: number; g: number; b: number } | null {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
  };
}

/**
 * Calculates relative luminance of a color.
 * 
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} Relative luminance (0-1)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates contrast ratio between two colors.
 * 
 * @param {string} fg - Foreground color (hex or rgba)
 * @param {string} bg - Background color (hex or rgba)
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(fg: string, bg: string): number {
  // Parse foreground color
  let fgRgb = hexToRgb(fg);
  if (!fgRgb && fg.includes('rgba')) {
    fgRgb = rgbaToRgb(fg);
  }
  
  // Parse background color
  let bgRgb = hexToRgb(bg);
  if (!bgRgb && bg.includes('rgba')) {
    bgRgb = rgbaToRgb(bg);
  }
  
  if (!fgRgb || !bgRgb) {
    return 0;
  }
  
  const l1 = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if contrast ratio meets WCAG level.
 * 
 * @param {number} ratio - Contrast ratio
 * @param {WCAGLevel} level - WCAG level (AA or AAA)
 * @param {TextSize} size - Text size (normal or large)
 * @returns {boolean} True if meets requirement
 */
export function meetsWCAG(ratio: number, level: WCAGLevel, size: TextSize): boolean {
  if (level === 'AA') {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  } else {
    // AAA
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
}

/**
 * Gets CSS variable value from computed styles.
 * 
 * @param {string} varName - CSS variable name (e.g., '--primary')
 * @param {boolean} darkMode - Whether to get dark mode value
 * @returns {string} Color value (rgba format)
 */
function getCSSVariable(varName: string, darkMode: boolean = false): string {
  if (darkMode) {
    // Create temporary dark mode element
    const temp = document.createElement('div');
    temp.className = 'dark';
    temp.style.display = 'none';
    document.body.appendChild(temp);
    
    const styles = getComputedStyle(temp);
    const value = styles.getPropertyValue(varName).trim();
    
    document.body.removeChild(temp);
    return value;
  } else {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue(varName).trim();
  }
}

/**
 * Tests a specific color pair for WCAG compliance.
 * 
 * @param {string} fgVar - Foreground CSS variable
 * @param {string} bgVar - Background CSS variable
 * @param {string} label - Label for the pair
 * @param {boolean} darkMode - Whether testing dark mode
 * @param {TextSize} size - Text size category
 * @returns {ContrastResult} Test result
 */
function testColorPair(
  fgVar: string,
  bgVar: string,
  label: string,
  darkMode: boolean = false,
  size: TextSize = 'normal'
): ContrastResult {
  const fg = getCSSVariable(fgVar, darkMode);
  const bg = getCSSVariable(bgVar, darkMode);
  
  const ratio = getContrastRatio(fg, bg);
  const passAA = meetsWCAG(ratio, 'AA', size);
  const passAAA = meetsWCAG(ratio, 'AAA', size);
  
  return {
    pair: label,
    ratio: Math.round(ratio * 100) / 100,
    passAA,
    passAAA,
    fg,
    bg,
    size,
  };
}

/**
 * Runs complete contrast audit for all design system colors.
 * 
 * @returns {ContrastAuditReport} Complete audit report
 */
export function runContrastAudit(): ContrastAuditReport {
  const lightResults: ContrastResult[] = [];
  const darkResults: ContrastResult[] = [];
  
  // Define all color pairs to test
  const colorPairs = [
    // Primary pairs
    { fg: '--primary-foreground', bg: '--primary', label: 'Primary Button' },
    { fg: '--foreground', bg: '--background', label: 'Body Text' },
    
    // Secondary pairs
    { fg: '--secondary-foreground', bg: '--secondary', label: 'Secondary Button' },
    
    // Accent pairs
    { fg: '--accent-foreground', bg: '--accent', label: 'Accent Element' },
    
    // Destructive pairs
    { fg: '--destructive-foreground', bg: '--destructive', label: 'Delete Button' },
    
    // Card pairs
    { fg: '--card-foreground', bg: '--card', label: 'Card Text' },
    
    // Popover pairs
    { fg: '--popover-foreground', bg: '--popover', label: 'Dropdown Text' },
    
    // Muted pairs
    { fg: '--muted-foreground', bg: '--background', label: 'Secondary Text' },
    { fg: '--muted-foreground', bg: '--muted', label: 'Muted on Muted' },
    
    // Input pairs
    { fg: '--foreground', bg: '--input-background', label: 'Input Text' },
    { fg: '--primary', bg: '--background', label: 'Primary Link' },
    { fg: '--accent', bg: '--background', label: 'Accent Link' },
    
    // Sidebar pairs
    { fg: '--sidebar-foreground', bg: '--sidebar', label: 'Navigation Text' },
    { fg: '--sidebar-primary-foreground', bg: '--sidebar-primary', label: 'Nav Primary' },
    { fg: '--sidebar-accent-foreground', bg: '--sidebar-accent', label: 'Nav Accent' },
    
    // Border pairs
    { fg: '--border', bg: '--background', label: 'Border Visibility' },
    { fg: '--ring', bg: '--background', label: 'Focus Ring' },
  ];
  
  // Test all pairs in light mode
  colorPairs.forEach((pair) => {
    lightResults.push(testColorPair(pair.fg, pair.bg, pair.label, false));
  });
  
  // Test all pairs in dark mode
  colorPairs.forEach((pair) => {
    darkResults.push(testColorPair(pair.fg, pair.bg, pair.label, true));
  });
  
  // Categorize results
  const categorizeLightResults = (results: ContrastResult[]) => {
    const passed = results.filter((r) => r.passAA);
    const failed = results.filter((r) => !r.passAA);
    const warnings = results.filter((r) => r.passAA && !r.passAAA);
    return { passed, failed, warnings };
  };
  
  const light = categorizeResults(lightResults);
  const dark = categorizeResults(darkResults);
  
  // Calculate compliance
  const totalTests = lightResults.length + darkResults.length;
  const aaPassed = [...lightResults, ...darkResults].filter((r) => r.passAA).length;
  const aaaPassed = [...lightResults, ...darkResults].filter((r) => r.passAAA).length;
  
  const aaCompliance = Math.round((aaPassed / totalTests) * 100);
  const aaaCompliance = Math.round((aaaPassed / totalTests) * 100);
  
  return {
    light,
    dark,
    aaCompliance,
    aaaCompliance,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Helper to categorize results.
 */
function categorizeResults(results: ContrastResult[]) {
  return {
    passed: results.filter((r) => r.passAA),
    failed: results.filter((r) => !r.passAA),
    warnings: results.filter((r) => r.passAA && !r.passAAA),
  };
}

/**
 * Logs contrast audit results to console.
 * 
 * @example
 * // Run in development console
 * logContrastReport();
 */
export function logContrastReport(): void {
  console.log('🎨 Running Color Contrast Audit (WCAG 2.1 AA/AAA)...\n');
  
  const report = runContrastAudit();
  
  console.log('='.repeat(70));
  console.log('COLOR CONTRAST COMPLIANCE REPORT');
  console.log('='.repeat(70));
  console.log(`Generated: ${new Date(report.timestamp).toLocaleString()}`);
  console.log(`WCAG AA Compliance: %c${report.aaCompliance}%`, 
    `color: ${report.aaCompliance >= 90 ? '#0cce6b' : report.aaCompliance >= 75 ? '#ffa400' : '#ff4e42'}; font-weight: bold;`);
  console.log(`WCAG AAA Compliance: %c${report.aaaCompliance}%`, 
    `color: ${report.aaaCompliance >= 90 ? '#0cce6b' : report.aaaCompliance >= 75 ? '#ffa400' : '#ff4e42'}; font-weight: bold;`);
  console.log('');
  
  // Light mode results
  console.log('-'.repeat(70));
  console.log('%cLIGHT MODE', 'font-weight: bold; font-size: 14px;');
  console.log('-'.repeat(70));
  
  if (report.light.passed.length > 0) {
    console.log('\n✅ Passed WCAG AA (4.5:1):');
    report.light.passed.forEach((result) => {
      console.log(`  ${result.pair}: ${result.ratio}:1 ${result.passAAA ? '(AAA ✓)' : '(AA only)'}`);
    });
  }
  
  if (report.light.failed.length > 0) {
    console.log('\n❌ Failed WCAG AA:');
    report.light.failed.forEach((result) => {
      console.log(`  ${result.pair}: ${result.ratio}:1 (need 4.5:1)`);
      console.log(`     FG: ${result.fg} on BG: ${result.bg}`);
    });
  }
  
  if (report.light.warnings.length > 0) {
    console.log('\n⚠️  Passed AA but not AAA:');
    report.light.warnings.forEach((result) => {
      console.log(`  ${result.pair}: ${result.ratio}:1 (need 7:1 for AAA)`);
    });
  }
  
  console.log('');
  
  // Dark mode results
  console.log('-'.repeat(70));
  console.log('%cDARK MODE', 'font-weight: bold; font-size: 14px;');
  console.log('-'.repeat(70));
  
  if (report.dark.passed.length > 0) {
    console.log('\n✅ Passed WCAG AA (4.5:1):');
    report.dark.passed.forEach((result) => {
      console.log(`  ${result.pair}: ${result.ratio}:1 ${result.passAAA ? '(AAA ✓)' : '(AA only)'}`);
    });
  }
  
  if (report.dark.failed.length > 0) {
    console.log('\n❌ Failed WCAG AA:');
    report.dark.failed.forEach((result) => {
      console.log(`  ${result.pair}: ${result.ratio}:1 (need 4.5:1)`);
      console.log(`     FG: ${result.fg} on BG: ${result.bg}`);
    });
  }
  
  if (report.dark.warnings.length > 0) {
    console.log('\n⚠️  Passed AA but not AAA:');
    report.dark.warnings.forEach((result) => {
      console.log(`  ${result.pair}: ${result.ratio}:1 (need 7:1 for AAA)`);
    });
  }
  
  console.log('');
  console.log('='.repeat(70));
  console.log('📊 SUMMARY');
  console.log('='.repeat(70));
  
  const totalPairs = report.light.passed.length + report.light.failed.length;
  const lightAA = report.light.passed.length;
  const darkAA = report.dark.passed.length;
  const lightAAA = report.light.passed.filter(r => r.passAAA).length;
  const darkAAA = report.dark.passed.filter(r => r.passAAA).length;
  
  console.log(`Total Color Pairs Tested: ${totalPairs}`);
  console.log(`Light Mode AA Pass Rate: ${Math.round((lightAA / totalPairs) * 100)}%`);
  console.log(`Dark Mode AA Pass Rate: ${Math.round((darkAA / totalPairs) * 100)}%`);
  console.log(`Light Mode AAA Pass Rate: ${Math.round((lightAAA / totalPairs) * 100)}%`);
  console.log(`Dark Mode AAA Pass Rate: ${Math.round((darkAAA / totalPairs) * 100)}%`);
  console.log('');
  
  if (report.light.failed.length > 0 || report.dark.failed.length > 0) {
    console.log('🎯 PRIORITY FIXES NEEDED:');
    console.log('-'.repeat(70));
    
    const allFailed = [
      ...report.light.failed.map(r => ({ ...r, mode: 'Light' })),
      ...report.dark.failed.map(r => ({ ...r, mode: 'Dark' }))
    ];
    
    allFailed.forEach((result, index) => {
      console.log(`${index + 1}. [${result.mode}] ${result.pair}`);
      console.log(`   Current: ${result.ratio}:1 | Need: 4.5:1`);
      console.log(`   Increase contrast between foreground and background`);
    });
  } else {
    console.log('✅ ALL COLOR PAIRS PASS WCAG AA!');
  }
  
  console.log('\n' + '='.repeat(70));
}

/**
 * Tests contrast for a specific component's colors.
 * 
 * @param {string} fgColor - Foreground color (hex or rgba)
 * @param {string} bgColor - Background color (hex or rgba)
 * @param {string} componentName - Component name for logging
 * @returns {boolean} True if passes WCAG AA
 */
export function testComponentContrast(
  fgColor: string,
  bgColor: string,
  componentName: string
): boolean {
  const ratio = getContrastRatio(fgColor, bgColor);
  const passAA = meetsWCAG(ratio, 'AA', 'normal');
  const passAAA = meetsWCAG(ratio, 'AAA', 'normal');
  
  console.log(`Testing ${componentName}:`);
  console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
  console.log(`  WCAG AA (4.5:1): ${passAA ? '✅ Pass' : '❌ Fail'}`);
  console.log(`  WCAG AAA (7:1): ${passAAA ? '✅ Pass' : '❌ Fail'}`);
  
  return passAA;
}
