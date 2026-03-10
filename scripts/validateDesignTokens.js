#!/usr/bin/env node

/**
 * Design Token Validator Script
 * 
 * Validates design token usage across TypeScript/React files.
 * Checks for hardcoded colors, sizes, spacing, and accessibility issues.
 * 
 * Usage:
 *   node scripts/validateDesignTokens.js
 *   node scripts/validateDesignTokens.js src/app/components/MyComponent.tsx
 *   node scripts/validateDesignTokens.js src/app/components/patterns/
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Validates design token usage in a code string.
 */
function validateDesignTokens(code, filename) {
  const violations = [];
  const lines = code.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Skip imports and comments
    if (isInImport(line) || isComment(line)) {
      return;
    }

    // Check 1: Hardcoded hex colors
    const hexColorRegex = /#([0-9a-f]{3}|[0-9a-f]{6})\b/gi;
    let match;
    while ((match = hexColorRegex.exec(line)) !== null) {
      // Skip if in comment
      if (isInComment(line, match.index)) continue;

      violations.push({
        line: lineNumber,
        column: match.index + 1,
        type: 'color',
        severity: 'error',
        message: `Hardcoded hex color ${match[0]} found`,
        suggestion: 'Use semantic color tokens like bg-primary or text-foreground',
        code: line.trim(),
      });
    }

    // Check 2: Hardcoded RGB/RGBA values
    const rgbRegex = /rgba?\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+/gi;
    while ((match = rgbRegex.exec(line)) !== null) {
      if (isInComment(line, match.index)) continue;

      violations.push({
        line: lineNumber,
        column: match.index + 1,
        type: 'color',
        severity: 'error',
        message: `Hardcoded rgb/rgba color found`,
        suggestion: 'Use semantic color tokens like bg-primary or text-foreground',
        code: line.trim(),
      });
    }

    // Check 3: Text size classes on semantic HTML
    const semanticElements = ['<h1', '<h2', '<h3', '<h4', '<h5', '<h6', '<p', '<label'];
    const textSizeClasses = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'];
    
    semanticElements.forEach((element) => {
      if (line.includes(element)) {
        textSizeClasses.forEach((sizeClass) => {
          if (line.includes(sizeClass) && !line.includes('// Allow size override')) {
            violations.push({
              line: lineNumber,
              column: line.indexOf(sizeClass) + 1,
              type: 'size',
              severity: 'error',
              message: `Text size class "${sizeClass}" on semantic HTML element`,
              suggestion: `Remove "${sizeClass}" and use semantic HTML sizing from theme.css`,
              code: line.trim(),
            });
          }
        });
      }
    });

    // Check 4: Hardcoded spacing in inline styles
    const inlineSpacingRegex = /(padding|margin|gap)\s*:\s*['"]?\d+px['"]?/gi;
    while ((match = inlineSpacingRegex.exec(line)) !== null) {
      violations.push({
        line: lineNumber,
        column: match.index + 1,
        type: 'spacing',
        severity: 'error',
        message: `Hardcoded spacing in inline style`,
        suggestion: 'Use Tailwind classes like p-6, mb-12, gap-4 instead',
        code: line.trim(),
      });
    }

    // Check 5: Missing alt text on images
    if (line.includes('<img') && !line.includes('alt=')) {
      violations.push({
        line: lineNumber,
        column: line.indexOf('<img') + 1,
        type: 'alt',
        severity: 'error',
        message: 'Image missing alt attribute',
        suggestion: 'Add alt text: <img src="..." alt="Descriptive text" />',
        code: line.trim(),
      });
    }

    // Check 6: Icon-only buttons without aria-label (simple heuristic)
    if (line.includes('<button') && line.includes('/>') && !line.includes('aria-label') && !line.includes('children')) {
      // Check if there's a likely icon (capital letter component)
      if (line.match(/<[A-Z]\w+\s*\/>/)) {
        violations.push({
          line: lineNumber,
          column: line.indexOf('<button') + 1,
          type: 'aria',
          severity: 'error',
          message: 'Icon-only button missing aria-label',
          suggestion: 'Add aria-label: <button aria-label="Close dialog">',
          code: line.trim(),
        });
      }
    }

    // Check 7: Links/buttons without focus indicator
    if ((line.includes('<a ') || line.includes('<button ')) && 
        line.includes('className') && 
        !line.includes('focus-visible:') && 
        !line.includes('focus:') &&
        !line.includes('Button') && // Skip shadcn Button component
        !line.includes('// Skip focus check')) {
      violations.push({
        line: lineNumber,
        column: line.indexOf('className') + 1,
        type: 'focus',
        severity: 'warning',
        message: 'Interactive element may be missing focus indicator',
        suggestion: 'Add focus-visible:ring-2 focus-visible:ring-ring to className',
        code: line.trim(),
      });
    }

    // Check 8: Using div for interactive elements
    if (line.includes('<div') && line.includes('onClick') && !line.includes('role=')) {
      violations.push({
        line: lineNumber,
        column: line.indexOf('<div') + 1,
        type: 'semantic',
        severity: 'error',
        message: 'Using div for interactive element without role',
        suggestion: 'Use <button> or <a> for interactive elements, or add role attribute',
        code: line.trim(),
      });
    }
  });

  // Calculate compliance score
  const totalChecks = lines.length * 8; // 8 checks per line
  const violationCount = violations.length;
  const compliance = Math.max(0, Math.round(((totalChecks - violationCount) / totalChecks) * 100));

  // Summarize violations by type
  const summary = {
    total: violations.length,
    hardcodedColors: violations.filter((v) => v.type === 'color').length,
    hardcodedSizes: violations.filter((v) => v.type === 'size').length,
    hardcodedSpacing: violations.filter((v) => v.type === 'spacing').length,
    missingAlt: violations.filter((v) => v.type === 'alt').length,
    missingAria: violations.filter((v) => v.type === 'aria').length,
    noFocusIndicator: violations.filter((v) => v.type === 'focus').length,
    semanticIssues: violations.filter((v) => v.type === 'semantic').length,
  };

  return {
    file: filename,
    violations,
    compliance,
    summary,
  };
}

/**
 * Checks if a position in a line is within a comment.
 */
function isInComment(line, position = 0) {
  const beforePosition = line.substring(0, position || line.length);
  
  // Check for line comments
  if (beforePosition.includes('//')) {
    const commentStart = beforePosition.lastIndexOf('//');
    return position > commentStart;
  }
  
  // Check for block comments (simple check)
  if (beforePosition.includes('/*') && !beforePosition.includes('*/')) {
    return true;
  }
  
  return false;
}

/**
 * Checks if a line is a comment.
 */
function isComment(line) {
  const trimmed = line.trim();
  return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
}

/**
 * Checks if a line is an import statement.
 */
function isInImport(line) {
  return line.trim().startsWith('import ');
}

/**
 * Gets an icon for a violation type.
 */
function getTypeIcon(type) {
  const icons = {
    color: '🎨',
    size: '📏',
    spacing: '📐',
    alt: '🖼️',
    aria: '♿',
    focus: '🎯',
    semantic: '🏷️',
  };
  return icons[type] || '⚠️';
}

/**
 * Logs validation results to console with formatting.
 */
function logValidationResults(result) {
  console.log(`\n${colors.bright}${colors.cyan}🔍 Design Token Validation: ${result.file}${colors.reset}`);
  
  const complianceColor = result.compliance >= 95 ? colors.green : result.compliance >= 80 ? colors.yellow : colors.red;
  console.log(`\n📊 Compliance Score: ${complianceColor}${result.compliance}%${colors.reset}`);
  
  if (result.violations.length === 0) {
    console.log(`${colors.green}✅ No violations found! Perfect compliance.${colors.reset}`);
  } else {
    console.log(`\n${colors.red}❌ Found ${result.violations.length} violation(s):${colors.reset}\n`);
    
    // Group violations by type
    const violationsByType = result.violations.reduce((acc, v) => {
      if (!acc[v.type]) acc[v.type] = [];
      acc[v.type].push(v);
      return acc;
    }, {});
    
    Object.entries(violationsByType).forEach(([type, violations]) => {
      console.log(`${getTypeIcon(type)} ${colors.bright}${type.toUpperCase()}${colors.reset} (${violations.length})`);
      violations.slice(0, 5).forEach((v) => {
        const severityColor = v.severity === 'error' ? colors.red : colors.yellow;
        console.log(`  ${severityColor}Line ${v.line}:${v.column}${colors.reset}`);
        console.log(`    Message: ${v.message}`);
        console.log(`    ${colors.blue}Fix: ${v.suggestion}${colors.reset}`);
      });
      if (violations.length > 5) {
        console.log(`  ${colors.yellow}... and ${violations.length - 5} more${colors.reset}`);
      }
      console.log('');
    });
  }
  
  console.log(`${colors.bright}📈 Summary:${colors.reset}`);
  console.log(`  Total violations: ${result.summary.total}`);
  console.log(`  Hardcoded colors: ${result.summary.hardcodedColors}`);
  console.log(`  Hardcoded sizes: ${result.summary.hardcodedSizes}`);
  console.log(`  Hardcoded spacing: ${result.summary.hardcodedSpacing}`);
  console.log(`  Missing alt text: ${result.summary.missingAlt}`);
  console.log(`  Missing ARIA labels: ${result.summary.missingAria}`);
  console.log(`  Missing focus indicators: ${result.summary.noFocusIndicator}`);
  console.log(`  Semantic issues: ${result.summary.semanticIssues}`);
}

/**
 * Validates a file.
 */
function validateFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(process.cwd(), filePath);
  return validateDesignTokens(code, relativePath);
}

/**
 * Validates all files in a directory.
 */
function validateDirectory(dirPath) {
  const results = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip node_modules, .git, dist, etc.
        if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist' && file !== 'build') {
          walkDir(filePath);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(validateFile(filePath));
      }
    });
  }
  
  walkDir(dirPath);
  return results;
}

/**
 * Main execution.
 */
function main() {
  const args = process.argv.slice(2);
  const target = args[0] || 'src/app';
  
  console.log(`${colors.bright}${colors.cyan}Design Token Validator${colors.reset}`);
  console.log(`${colors.bright}=======================${colors.reset}\n`);
  
  if (!fs.existsSync(target)) {
    console.error(`${colors.red}❌ Error: Path "${target}" does not exist${colors.reset}`);
    process.exit(1);
  }
  
  const stat = fs.statSync(target);
  const results = stat.isDirectory() ? validateDirectory(target) : [validateFile(target)];
  
  // Log individual results
  results.forEach((result) => {
    logValidationResults(result);
  });
  
  // Overall summary
  if (results.length > 1) {
    const totalFiles = results.length;
    const filesWithViolations = results.filter((r) => r.violations.length > 0).length;
    const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0);
    const avgCompliance = Math.round(results.reduce((sum, r) => sum + r.compliance, 0) / totalFiles);
    
    console.log(`\n${colors.bright}${colors.cyan}📊 Overall Summary${colors.reset}`);
    console.log(`${'='.repeat(50)}`);
    console.log(`Files scanned: ${totalFiles}`);
    console.log(`Files with violations: ${filesWithViolations}`);
    console.log(`Total violations: ${totalViolations}`);
    
    const complianceColor = avgCompliance >= 95 ? colors.green : avgCompliance >= 80 ? colors.yellow : colors.red;
    console.log(`Average compliance: ${complianceColor}${avgCompliance}%${colors.reset}`);
    
    if (avgCompliance >= 95) {
      console.log(`\n${colors.green}✅ Excellent! Maintaining high compliance.${colors.reset}`);
    } else if (avgCompliance >= 80) {
      console.log(`\n${colors.yellow}⚠️  Good, but there's room for improvement.${colors.reset}`);
    } else {
      console.log(`\n${colors.red}❌ Needs attention. Please fix violations.${colors.reset}`);
    }
  }
  
  // Exit code based on compliance
  const avgCompliance = results.reduce((sum, r) => sum + r.compliance, 0) / results.length;
  process.exit(avgCompliance >= 95 ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { validateDesignTokens, validateFile, validateDirectory };
