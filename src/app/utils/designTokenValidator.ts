/**
 * Design Token Validator
 * 
 * Validates that components use design tokens from theme.css
 * instead of hardcoded values.
 * 
 * @module designTokenValidator
 * @category utils
 */

interface ValidationResult {
  file: string;
  violations: Violation[];
  compliance: number;
  summary: {
    total: number;
    hardcodedColors: number;
    hardcodedSizes: number;
    hardcodedSpacing: number;
    missingAlt: number;
    missingAria: number;
    noFocusIndicator: number;
  };
}

interface Violation {
  line: number;
  column: number;
  type: 'color' | 'size' | 'spacing' | 'alt' | 'aria' | 'focus' | 'semantic';
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
  code: string;
}

/**
 * Validates design token usage in a code string.
 * 
 * @param code - The code to validate
 * @param filename - The filename being validated
 * @returns ValidationResult with all violations found
 */
export function validateDesignTokens(code: string, filename: string): ValidationResult {
  const violations: Violation[] = [];
  const lines = code.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Check 1: Hardcoded hex colors
    const hexColorRegex = /#([0-9a-f]{3}|[0-9a-f]{6})\b/gi;
    let match;
    while ((match = hexColorRegex.exec(line)) !== null) {
      // Skip if in comments or imports
      if (isInComment(line, match.index) || isInImport(line)) {
        continue;
      }

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
      if (isInComment(line, match.index) || isInImport(line)) {
        continue;
      }

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
          if (line.includes(sizeClass)) {
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

    // Check 6: Icon-only buttons without aria-label
    if (line.includes('<button') && (line.includes('<') && line.includes('/>')) && !line.includes('aria-label')) {
      // Simple heuristic: button with self-closing tag likely has icon
      if (!line.includes('children') && !line.includes('{') && line.match(/<[A-Z]\w+\s*\/>/)) {
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
        !line.includes('focus:')) {
      violations.push({
        line: lineNumber,
        column: line.indexOf('className') + 1,
        type: 'focus',
        severity: 'warning',
        message: 'Interactive element missing focus indicator',
        suggestion: 'Add focus-visible:ring-2 focus-visible:ring-ring to className',
        code: line.trim(),
      });
    }

    // Check 8: Using div for interactive elements
    if (line.includes('<div') && line.includes('onClick')) {
      violations.push({
        line: lineNumber,
        column: line.indexOf('<div') + 1,
        type: 'semantic',
        severity: 'error',
        message: 'Using div for interactive element',
        suggestion: 'Use <button> or <a> for interactive elements',
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
function isInComment(line: string, position: number): boolean {
  const beforePosition = line.substring(0, position);
  
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
 * Checks if a line is an import statement.
 */
function isInImport(line: string): boolean {
  return line.trim().startsWith('import ');
}

/**
 * Logs validation results to console with formatting.
 */
export function logValidationResults(result: ValidationResult): void {
  console.group(`🔍 Design Token Validation: ${result.file}`);
  
  console.log(`\n📊 Compliance Score: ${result.compliance}%`);
  
  if (result.violations.length === 0) {
    console.log('✅ No violations found! Perfect compliance.');
  } else {
    console.log(`\n❌ Found ${result.violations.length} violation(s):\n`);
    
    // Group violations by type
    const violationsByType = result.violations.reduce((acc, v) => {
      if (!acc[v.type]) acc[v.type] = [];
      acc[v.type].push(v);
      return acc;
    }, {} as Record<string, Violation[]>);
    
    Object.entries(violationsByType).forEach(([type, violations]) => {
      console.group(`\n${getTypeIcon(type)} ${type.toUpperCase()} (${violations.length})`);
      violations.forEach((v) => {
        console.log(`\nLine ${v.line}:${v.column}`);
        console.log(`  Message: ${v.message}`);
        console.log(`  Code: ${v.code}`);
        console.log(`  Fix: ${v.suggestion}`);
      });
      console.groupEnd();
    });
  }
  
  console.log('\n📈 Summary:');
  console.log(`  Total violations: ${result.summary.total}`);
  console.log(`  Hardcoded colors: ${result.summary.hardcodedColors}`);
  console.log(`  Hardcoded sizes: ${result.summary.hardcodedSizes}`);
  console.log(`  Hardcoded spacing: ${result.summary.hardcodedSpacing}`);
  console.log(`  Missing alt text: ${result.summary.missingAlt}`);
  console.log(`  Missing ARIA labels: ${result.summary.missingAria}`);
  console.log(`  Missing focus indicators: ${result.summary.noFocusIndicator}`);
  
  console.groupEnd();
}

/**
 * Gets an icon for a violation type.
 */
function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
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
 * Validates all files in a directory.
 */
export async function validateDirectory(directory: string): Promise<ValidationResult[]> {
  // This would require file system access
  // For now, return empty array
  // In a real implementation, you'd use fs.readdir and fs.readFile
  return [];
}

/**
 * Generates a compliance report.
 */
export function generateComplianceReport(results: ValidationResult[]): string {
  const totalFiles = results.length;
  const filesWithViolations = results.filter((r) => r.violations.length > 0).length;
  const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0);
  const avgCompliance = Math.round(
    results.reduce((sum, r) => sum + r.compliance, 0) / totalFiles
  );

  return `
Design System Compliance Report
Generated: ${new Date().toLocaleString()}

📊 Overall Statistics:
  Files scanned: ${totalFiles}
  Files with violations: ${filesWithViolations}
  Total violations: ${totalViolations}
  Average compliance: ${avgCompliance}%

${results.map((r) => `
${r.file}: ${r.compliance}%
  Violations: ${r.violations.length}
  ${r.violations.length > 0 ? `  - Colors: ${r.summary.hardcodedColors}
  - Sizes: ${r.summary.hardcodedSizes}
  - Spacing: ${r.summary.hardcodedSpacing}
  - Alt text: ${r.summary.missingAlt}
  - ARIA: ${r.summary.missingAria}
  - Focus: ${r.summary.noFocusIndicator}` : '  ✅ Perfect compliance!'}
`).join('\n')}
  `;
}
