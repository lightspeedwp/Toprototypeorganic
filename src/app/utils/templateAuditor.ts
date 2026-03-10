/**
 * Template Auditor - Comprehensive Design System Compliance Tool
 * 
 * Audits all templates for:
 * - Hardcoded font sizes (text-xl, text-2xl, etc.)
 * - Hardcoded colors (#fff, rgb(), rgba())
 * - Invalid spacing patterns
 * - Broken links (404 errors)
 * - Incorrect pattern usage
 * 
 * @module templateAuditor
 * @category utils
 */

export interface AuditIssue {
  file: string;
  line: number;
  type: 'font-size' | 'color' | 'spacing' | 'link' | 'pattern';
  severity: 'critical' | 'high' | 'medium' | 'low';
  issue: string;
  current: string;
  fix: string;
  context?: string;
}

export interface AuditReport {
  totalIssues: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  byType: {
    fontSizes: number;
    colors: number;
    spacing: number;
    links: number;
    patterns: number;
  };
  issues: AuditIssue[];
  summary: string;
}

/**
 * Detects hardcoded font sizes (Tailwind classes on semantic HTML)
 */
export function detectHardcodedFontSizes(code: string, filename: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const lines = code.split('\n');
  
  // Patterns to detect: <h1 className="text-2xl">, <h2 className="text-xl font-bold">, etc.
  const headingPattern = /<(h[1-6])\s+[^>]*className="[^"]*\b(text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black))[^"]*"/gi;
  
  lines.forEach((line, index) => {
    const matches = line.matchAll(headingPattern);
    for (const match of matches) {
      const headingTag = match[1];
      const forbiddenClass = match[2];
      
      issues.push({
        file: filename,
        line: index + 1,
        type: 'font-size',
        severity: 'high',
        issue: `Hardcoded ${forbiddenClass} on semantic <${headingTag}>`,
        current: match[0],
        fix: `Remove "${forbiddenClass}" class - semantic HTML gets styling from theme.css`,
        context: line.trim()
      });
    }
  });
  
  return issues;
}

/**
 * Detects hardcoded colors (hex, rgb, rgba, hsl)
 */
export function detectHardcodedColors(code: string, filename: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const lines = code.split('\n');
  
  // Patterns for hardcoded colors
  const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
  const rgbPattern = /rgb\([^)]+\)/g;
  const rgbaPattern = /rgba\([^)]+\)/g;
  const hslPattern = /hsl\([^)]+\)/g;
  
  lines.forEach((line, index) => {
    // Skip CSS variable definitions and comments
    if (line.includes('--') || line.trim().startsWith('//') || line.trim().startsWith('/*')) {
      return;
    }
    
    // Check for hex colors
    const hexMatches = line.match(hexPattern);
    if (hexMatches) {
      hexMatches.forEach(color => {
        issues.push({
          file: filename,
          line: index + 1,
          type: 'color',
          severity: 'critical',
          issue: `Hardcoded hex color: ${color}`,
          current: color,
          fix: 'Use semantic color tokens (text-foreground, bg-primary, etc.)',
          context: line.trim()
        });
      });
    }
    
    // Check for rgb/rgba
    const rgbMatches = [...(line.match(rgbPattern) || []), ...(line.match(rgbaPattern) || [])];
    if (rgbMatches.length > 0) {
      rgbMatches.forEach(color => {
        issues.push({
          file: filename,
          line: index + 1,
          type: 'color',
          severity: 'critical',
          issue: `Hardcoded RGB color: ${color}`,
          current: color,
          fix: 'Use semantic color tokens (text-foreground, bg-primary, etc.)',
          context: line.trim()
        });
      });
    }
    
    // Check for hsl
    const hslMatches = line.match(hslPattern);
    if (hslMatches) {
      hslMatches.forEach(color => {
        issues.push({
          file: filename,
          line: index + 1,
          type: 'color',
          severity: 'critical',
          issue: `Hardcoded HSL color: ${color}`,
          current: color,
          fix: 'Use semantic color tokens (text-foreground, bg-primary, etc.)',
          context: line.trim()
        });
      });
    }
  });
  
  return issues;
}

/**
 * Detects invalid spacing patterns
 */
export function detectInvalidSpacing(code: string, filename: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const lines = code.split('\n');
  
  // Patterns for hardcoded spacing in style attributes
  const hardcodedPaddingPattern = /style="[^"]*padding:\s*\d+px[^"]*"/g;
  const hardcodedMarginPattern = /style="[^"]*margin:\s*\d+px[^"]*"/g;
  const hardcodedGapPattern = /style="[^"]*gap:\s*\d+px[^"]*"/g;
  
  lines.forEach((line, index) => {
    // Skip CSS variable usage
    if (line.includes('var(--spacing') || line.includes('clamp(')) {
      return;
    }
    
    // Check for hardcoded padding
    if (hardcodedPaddingPattern.test(line)) {
      issues.push({
        file: filename,
        line: index + 1,
        type: 'spacing',
        severity: 'medium',
        issue: 'Hardcoded padding in inline style',
        current: line.match(hardcodedPaddingPattern)?.[0] || '',
        fix: 'Use Tailwind classes (p-4, py-6) or fluid spacing variables',
        context: line.trim()
      });
    }
    
    // Check for hardcoded margin
    if (hardcodedMarginPattern.test(line)) {
      issues.push({
        file: filename,
        line: index + 1,
        type: 'spacing',
        severity: 'medium',
        issue: 'Hardcoded margin in inline style',
        current: line.match(hardcodedMarginPattern)?.[0] || '',
        fix: 'Use Tailwind classes (m-4, mb-6) or fluid spacing variables',
        context: line.trim()
      });
    }
    
    // Check for hardcoded gap
    if (hardcodedGapPattern.test(line)) {
      issues.push({
        file: filename,
        line: index + 1,
        type: 'spacing',
        severity: 'medium',
        issue: 'Hardcoded gap in inline style',
        current: line.match(hardcodedGapPattern)?.[0] || '',
        fix: 'Use Tailwind classes (gap-4) or fluid gap variables',
        context: line.trim()
      });
    }
  });
  
  return issues;
}

/**
 * Detects potentially broken links
 */
export function detectBrokenLinks(code: string, filename: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const lines = code.split('\n');
  
  // Patterns for links
  const hrefPattern = /href="([^"]+)"/g;
  const toPattern = /to="([^"]+)"/g;
  
  // Valid route prefixes
  const validRoutes = [
    '/',
    '/about',
    '/contact',
    '/faq',
    '/tours',
    '/destinations',
    '/accommodation',
    '/specials',
    '/team',
    '/reviews',
    '/blog',
    '/travel-styles',
    '/destination-guides',
    '/packing-guides',
    '/newsletter',
    '/privacy-policy',
    '/terms-conditions',
    '/travel-insurance',
    '/why-book-with-us',
    '/quote-request',
    '/trip-planner',
    '/search',
    '/dev-tools'
  ];
  
  lines.forEach((line, index) => {
    // Check href attributes
    const hrefMatches = line.matchAll(hrefPattern);
    for (const match of hrefMatches) {
      const url = match[1];
      
      // Skip external URLs, anchors, and special URLs
      if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        continue;
      }
      
      // Check if URL matches valid routes
      const isValid = validRoutes.some(route => url === route || url.startsWith(route + '/'));
      
      if (!isValid && url !== '#') {
        issues.push({
          file: filename,
          line: index + 1,
          type: 'link',
          severity: 'high',
          issue: `Potentially invalid link: "${url}"`,
          current: url,
          fix: 'Verify this route exists or update to correct route',
          context: line.trim()
        });
      }
    }
    
    // Check React Router "to" attributes
    const toMatches = line.matchAll(toPattern);
    for (const match of toMatches) {
      const url = match[1];
      
      // Skip external URLs and anchors
      if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        continue;
      }
      
      // Check if URL matches valid routes
      const isValid = validRoutes.some(route => url === route || url.startsWith(route + '/'));
      
      if (!isValid && url !== '#') {
        issues.push({
          file: filename,
          line: index + 1,
          type: 'link',
          severity: 'high',
          issue: `Potentially invalid React Router link: "${url}"`,
          current: url,
          fix: 'Verify this route exists or update to correct route',
          context: line.trim()
        });
      }
    }
  });
  
  return issues;
}

/**
 * Generates a comprehensive audit report
 */
export function generateAuditReport(issues: AuditIssue[]): AuditReport {
  const report: AuditReport = {
    totalIssues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length,
    high: issues.filter(i => i.severity === 'high').length,
    medium: issues.filter(i => i.severity === 'medium').length,
    low: issues.filter(i => i.severity === 'low').length,
    byType: {
      fontSizes: issues.filter(i => i.type === 'font-size').length,
      colors: issues.filter(i => i.type === 'color').length,
      spacing: issues.filter(i => i.type === 'spacing').length,
      links: issues.filter(i => i.type === 'link').length,
      patterns: issues.filter(i => i.type === 'pattern').length,
    },
    issues: issues.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
    summary: ''
  };
  
  report.summary = `
Audit Complete
--------------
Total Issues: ${report.totalIssues}

Severity Breakdown:
- Critical: ${report.critical}
- High: ${report.high}
- Medium: ${report.medium}
- Low: ${report.low}

Issue Types:
- Font Sizes: ${report.byType.fontSizes}
- Colors: ${report.byType.colors}
- Spacing: ${report.byType.spacing}
- Links: ${report.byType.links}
- Patterns: ${report.byType.patterns}
  `.trim();
  
  return report;
}

/**
 * Logs audit report to console
 */
export function logAuditReport(report: AuditReport): void {
  console.group('🔍 Template Audit Report');
  console.log(report.summary);
  
  if (report.totalIssues > 0) {
    console.group('\n📋 Issues by File');
    
    // Group issues by file
    const byFile = report.issues.reduce((acc, issue) => {
      if (!acc[issue.file]) acc[issue.file] = [];
      acc[issue.file].push(issue);
      return acc;
    }, {} as Record<string, AuditIssue[]>);
    
    Object.entries(byFile).forEach(([file, issues]) => {
      console.group(`\n📄 ${file} (${issues.length} issues)`);
      
      issues.forEach(issue => {
        const icon = issue.severity === 'critical' ? '🔴' : 
                     issue.severity === 'high' ? '🟠' : 
                     issue.severity === 'medium' ? '🟡' : '🔵';
        
        console.log(`${icon} Line ${issue.line}: ${issue.issue}`);
        console.log(`   Current: ${issue.current}`);
        console.log(`   Fix: ${issue.fix}`);
        if (issue.context) {
          console.log(`   Context: ${issue.context.substring(0, 80)}...`);
        }
      });
      
      console.groupEnd();
    });
    
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Generates task list markdown
 */
export function generateTaskList(report: AuditReport): string {
  let markdown = `# Template Audit - Task List\n\n`;
  markdown += `**Generated:** ${new Date().toLocaleDateString()}\n`;
  markdown += `**Total Issues:** ${report.totalIssues}\n\n`;
  
  markdown += `## Priority Breakdown\n\n`;
  markdown += `- 🔴 Critical: ${report.critical}\n`;
  markdown += `- 🟠 High: ${report.high}\n`;
  markdown += `- 🟡 Medium: ${report.medium}\n`;
  markdown += `- 🔵 Low: ${report.low}\n\n`;
  
  markdown += `## Issues by Type\n\n`;
  markdown += `| Type | Count |\n`;
  markdown += `|------|-------|\n`;
  markdown += `| Font Sizes | ${report.byType.fontSizes} |\n`;
  markdown += `| Colors | ${report.byType.colors} |\n`;
  markdown += `| Spacing | ${report.byType.spacing} |\n`;
  markdown += `| Links | ${report.byType.links} |\n`;
  markdown += `| Patterns | ${report.byType.patterns} |\n\n`;
  
  // Group by file
  const byFile = report.issues.reduce((acc, issue) => {
    if (!acc[issue.file]) acc[issue.file] = [];
    acc[issue.file].push(issue);
    return acc;
  }, {} as Record<string, AuditIssue[]>);
  
  markdown += `## Files to Fix\n\n`;
  
  Object.entries(byFile)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([file, issues]) => {
      markdown += `### ${file}\n\n`;
      markdown += `**Issues:** ${issues.length}\n\n`;
      
      markdown += `| Line | Severity | Type | Issue | Fix |\n`;
      markdown += `|------|----------|------|-------|-----|\n`;
      
      issues.forEach(issue => {
        const icon = issue.severity === 'critical' ? '🔴' : 
                     issue.severity === 'high' ? '🟠' : 
                     issue.severity === 'medium' ? '🟡' : '🔵';
        
        markdown += `| ${issue.line} | ${icon} ${issue.severity} | ${issue.type} | ${issue.issue} | ${issue.fix} |\n`;
      });
      
      markdown += `\n`;
    });
  
  return markdown;
}
