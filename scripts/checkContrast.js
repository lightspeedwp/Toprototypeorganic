#!/usr/bin/env node

/**
 * Color Contrast Checker
 * 
 * Validates color contrast ratios for WCAG AA/AAA compliance.
 * 
 * Usage:
 *   node scripts/checkContrast.js
 */

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

/**
 * Color pairs to check from theme.css
 */
const colorPairs = {
  'Light Mode': [
    { name: 'Text on Background', fg: '#1a1a1a', bg: '#ffffff', type: 'text' },
    { name: 'Primary on Background', fg: '#4a7311', bg: '#ffffff', type: 'text' },
    { name: 'Primary Foreground on Primary', fg: '#ffffff', bg: '#4a7311', type: 'text' },
    { name: 'Secondary on Background', fg: '#f5f5f5', bg: '#1a1a1a', type: 'text' },
    { name: 'Muted Text on Background', fg: '#666666', bg: '#ffffff', type: 'text' },
    { name: 'Muted Text on Muted BG', fg: '#1a1a1a', bg: '#f5f5f5', type: 'text' },
    { name: 'Card Text on Card BG', fg: '#1a1a1a', bg: '#ffffff', type: 'text' },
    { name: 'Accent Text on Accent BG', fg: '#1a1a1a', bg: '#f5f5f5', type: 'text' },
    { name: 'Border (UI)', fg: '#e5e5e5', bg: '#ffffff', type: 'ui' },
  ],
  'Dark Mode': [
    { name: 'Text on Background', fg: '#f5f5f5', bg: '#1a1a1a', type: 'text' },
    { name: 'Primary on Background', fg: '#6ea532', bg: '#1a1a1a', type: 'text' },
    { name: 'Primary Foreground on Primary', fg: '#1a1a1a', bg: '#6ea532', type: 'text' },
    { name: 'Secondary on Background', fg: '#2a2a2a', bg: '#f5f5f5', type: 'text' },
    { name: 'Muted Text on Background', fg: '#999999', bg: '#1a1a1a', type: 'text' },
    { name: 'Muted Text on Muted BG', fg: '#f5f5f5', bg: '#2a2a2a', type: 'text' },
    { name: 'Card Text on Card BG', fg: '#f5f5f5', bg: '#2a2a2a', type: 'text' },
    { name: 'Accent Text on Accent BG', fg: '#f5f5f5', bg: '#2a2a2a', type: 'text' },
    { name: 'Border (UI)', fg: '#333333', bg: '#1a1a1a', type: 'ui' },
  ],
};

/**
 * Convert hex to RGB.
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance.
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio.
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio passes WCAG standards.
 */
function checkCompliance(ratio, type) {
  const wcagAA = type === 'text' ? 4.5 : 3.0; // Large text is 3.0
  const wcagAAA = type === 'text' ? 7.0 : 4.5;

  return {
    passAA: ratio >= wcagAA,
    passAAA: ratio >= wcagAAA,
    wcagAA,
    wcagAAA,
  };
}

/**
 * Main execution.
 */
function main() {
  console.log(`${colors.bright}${colors.cyan}Color Contrast Checker${colors.reset}`);
  console.log(`${'='.repeat(50)}\n`);

  let totalPairs = 0;
  let passedAA = 0;
  let passedAAA = 0;
  const failures = [];

  Object.entries(colorPairs).forEach(([mode, pairs]) => {
    console.log(`${colors.bright}${mode}:${colors.reset}\n`);

    pairs.forEach((pair) => {
      totalPairs++;
      const ratio = getContrastRatio(pair.fg, pair.bg);
      const compliance = checkCompliance(ratio, pair.type);

      let status = '';
      let statusColor = '';

      if (compliance.passAAA) {
        status = 'AAA';
        statusColor = colors.green;
        passedAA++;
        passedAAA++;
      } else if (compliance.passAA) {
        status = 'AA';
        statusColor = colors.green;
        passedAA++;
      } else {
        status = 'FAIL';
        statusColor = colors.red;
        failures.push({ mode, pair, ratio, compliance });
      }

      console.log(
        `  ${statusColor}${status.padEnd(4)}${colors.reset} ${pair.name.padEnd(35)} ${ratio.toFixed(2)}:1`
      );

      if (!compliance.passAA) {
        console.log(
          `       ${colors.red}⚠️  Fails WCAG AA (requires ${compliance.wcagAA}:1)${colors.reset}`
        );
      }
    });

    console.log('');
  });

  // Summary
  console.log(`${colors.bright}${colors.cyan}📊 Summary${colors.reset}`);
  console.log(`${'='.repeat(50)}`);
  console.log(`Total pairs checked: ${totalPairs}`);
  console.log(
    `WCAG AA compliance: ${passedAA}/${totalPairs} (${Math.round((passedAA / totalPairs) * 100)}%)`
  );
  console.log(
    `WCAG AAA compliance: ${passedAAA}/${totalPairs} (${Math.round((passedAAA / totalPairs) * 100)}%)`
  );

  if (failures.length > 0) {
    console.log(`\n${colors.red}❌ ${failures.length} pair(s) failed WCAG AA${colors.reset}\n`);
    failures.forEach((f) => {
      console.log(`${colors.red}${f.mode} - ${f.pair.name}${colors.reset}`);
      console.log(`  Foreground: ${f.pair.fg}`);
      console.log(`  Background: ${f.pair.bg}`);
      console.log(`  Ratio: ${f.ratio.toFixed(2)}:1 (requires ${f.compliance.wcagAA}:1)`);
      console.log('');
    });
  } else {
    console.log(`\n${colors.green}✅ All color pairs pass WCAG AA!${colors.reset}\n`);
  }

  // Exit code
  process.exit(failures.length > 0 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { getContrastRatio, checkCompliance };
