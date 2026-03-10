#!/usr/bin/env node

/**
 * Accessibility Checker
 * 
 * Validates accessibility best practices in code.
 * 
 * Usage:
 *   node scripts/checkAccessibility.js [path]
 */

const fs = require('fs');
const path = require('path');

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
 * Check accessibility in a file.
 */
function checkAccessibility(code, filename) {
  const issues = {
    missingAlt: [],
    missingAriaLabel: [],
    noFocusIndicator: [],
    clickWithoutKeyboard: [],
    headingSkip: [],
    buttonAsLink: [],
    linkAsButton: [],
  };

  const lines = code.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Skip comments and imports
    if (isComment(line) || isImport(line)) return;

    // Check 1: Missing alt text on images
    if (line.includes('<img') && !line.includes('alt=')) {
      issues.missingAlt.push({
        line: lineNumber,
        code: line.trim(),
      });
    }

    // Check 2: Missing aria-label on icon-only buttons
    if (
      line.includes('<button') &&
      line.match(/<[A-Z]\w+\s*\/>/) &&
      !line.includes('aria-label') &&
      !line.includes('children')
    ) {
      issues.missingAriaLabel.push({
        line: lineNumber,
        code: line.trim(),
      });
    }

    // Check 3: Interactive elements without focus indicators
    if (
      (line.includes('<a ') || line.includes('<button ')) &&
      line.includes('className') &&
      !line.includes('focus-visible:') &&
      !line.includes('focus:') &&
      !line.includes('Button') // Skip shadcn Button
    ) {
      issues.noFocusIndicator.push({
        line: lineNumber,
        code: line.trim(),
      });
    }

    // Check 4: onClick without keyboard handler
    if (
      line.includes('onClick') &&
      !line.includes('<button') &&
      !line.includes('onKeyDown') &&
      !line.includes('onKeyPress') &&
      !line.includes('role=')
    ) {
      issues.clickWithoutKeyboard.push({
        line: lineNumber,
        code: line.trim(),
      });
    }

    // Check 5: Button used for navigation (should be link)
    if (line.includes('<button') && (line.includes('href=') || line.includes('navigate('))) {
      issues.buttonAsLink.push({
        line: lineNumber,
        code: line.trim(),
      });
    }

    // Check 6: Link used for actions (should be button)
    if (
      line.includes('<a ') &&
      line.includes('onClick') &&
      !line.includes('href=') &&
      !line.includes('href={')
    ) {
      issues.linkAsButton.push({
        line: lineNumber,
        code: line.trim(),
      });
    }
  });

  return issues;
}

/**
 * Check if line is a comment.
 */
function isComment(line) {
  const trimmed = line.trim();
  return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
}

/**
 * Check if line is an import.
 */
function isImport(line) {
  return line.trim().startsWith('import ');
}

/**
 * Log accessibility issues.
 */
function logIssues(issues, filename) {
  const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);

  console.log(`\n${colors.bright}${colors.cyan}♿ Accessibility Check: ${filename}${colors.reset}`);

  if (totalIssues === 0) {
    console.log(`${colors.green}✅ No accessibility issues found!${colors.reset}`);
    return;
  }

  console.log(`\n${colors.yellow}⚠️  Found ${totalIssues} issue(s):${colors.reset}\n`);

  // Missing alt text
  if (issues.missingAlt.length > 0) {
    console.log(`${colors.bright}🖼️  Missing Alt Text (${issues.missingAlt.length})${colors.reset}`);
    issues.missingAlt.slice(0, 3).forEach((issue) => {
      console.log(`  Line ${issue.line}: ${issue.code}`);
      console.log(`  ${colors.cyan}Fix: Add alt="Descriptive text"${colors.reset}`);
    });
    if (issues.missingAlt.length > 3) {
      console.log(`  ${colors.yellow}... and ${issues.missingAlt.length - 3} more${colors.reset}`);
    }
    console.log('');
  }

  // Missing ARIA labels
  if (issues.missingAriaLabel.length > 0) {
    console.log(
      `${colors.bright}♿ Missing ARIA Labels (${issues.missingAriaLabel.length})${colors.reset}`
    );
    issues.missingAriaLabel.slice(0, 3).forEach((issue) => {
      console.log(`  Line ${issue.line}: ${issue.code}`);
      console.log(`  ${colors.cyan}Fix: Add aria-label="Action description"${colors.reset}`);
    });
    if (issues.missingAriaLabel.length > 3) {
      console.log(
        `  ${colors.yellow}... and ${issues.missingAriaLabel.length - 3} more${colors.reset}`
      );
    }
    console.log('');
  }

  // Missing focus indicators
  if (issues.noFocusIndicator.length > 0) {
    console.log(
      `${colors.bright}🎯 Missing Focus Indicators (${issues.noFocusIndicator.length})${colors.reset}`
    );
    issues.noFocusIndicator.slice(0, 3).forEach((issue) => {
      console.log(`  Line ${issue.line}`);
      console.log(`  ${colors.cyan}Fix: Add focus-visible:ring-2 focus-visible:ring-ring${colors.reset}`);
    });
    if (issues.noFocusIndicator.length > 3) {
      console.log(
        `  ${colors.yellow}... and ${issues.noFocusIndicator.length - 3} more${colors.reset}`
      );
    }
    console.log('');
  }

  // Click without keyboard
  if (issues.clickWithoutKeyboard.length > 0) {
    console.log(
      `${colors.bright}⌨️  Click Without Keyboard (${issues.clickWithoutKeyboard.length})${colors.reset}`
    );
    issues.clickWithoutKeyboard.slice(0, 3).forEach((issue) => {
      console.log(`  Line ${issue.line}: ${issue.code}`);
      console.log(
        `  ${colors.cyan}Fix: Use <button> or add role and keyboard handlers${colors.reset}`
      );
    });
    if (issues.clickWithoutKeyboard.length > 3) {
      console.log(
        `  ${colors.yellow}... and ${issues.clickWithoutKeyboard.length - 3} more${colors.reset}`
      );
    }
    console.log('');
  }

  // Button as link
  if (issues.buttonAsLink.length > 0) {
    console.log(
      `${colors.bright}🔗 Button Used for Navigation (${issues.buttonAsLink.length})${colors.reset}`
    );
    issues.buttonAsLink.slice(0, 3).forEach((issue) => {
      console.log(`  Line ${issue.line}`);
      console.log(`  ${colors.cyan}Fix: Use <a> or <Link> for navigation${colors.reset}`);
    });
    if (issues.buttonAsLink.length > 3) {
      console.log(
        `  ${colors.yellow}... and ${issues.buttonAsLink.length - 3} more${colors.reset}`
      );
    }
    console.log('');
  }

  // Link as button
  if (issues.linkAsButton.length > 0) {
    console.log(
      `${colors.bright}🔘 Link Used for Actions (${issues.linkAsButton.length})${colors.reset}`
    );
    issues.linkAsButton.slice(0, 3).forEach((issue) => {
      console.log(`  Line ${issue.line}`);
      console.log(`  ${colors.cyan}Fix: Use <button> for actions${colors.reset}`);
    });
    if (issues.linkAsButton.length > 3) {
      console.log(
        `  ${colors.yellow}... and ${issues.linkAsButton.length - 3} more${colors.reset}`
      );
    }
    console.log('');
  }
}

/**
 * Check a file.
 */
function checkFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(process.cwd(), filePath);
  return checkAccessibility(code, relativePath);
}

/**
 * Check all files in directory.
 */
function checkDirectory(dirPath) {
  const results = [];

  function walkDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (
          !file.startsWith('.') &&
          file !== 'node_modules' &&
          file !== 'dist' &&
          file !== 'build'
        ) {
          walkDir(filePath);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const issues = checkFile(filePath);
        const relativePath = path.relative(process.cwd(), filePath);
        results.push({ path: relativePath, issues });
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

  console.log(`${colors.bright}${colors.cyan}Accessibility Checker${colors.reset}`);
  console.log(`${'='.repeat(50)}\n`);

  if (!fs.existsSync(target)) {
    console.error(`${colors.red}❌ Error: Path "${target}" does not exist${colors.reset}`);
    process.exit(1);
  }

  const stat = fs.statSync(target);
  const results = stat.isDirectory() ? checkDirectory(target) : [{ path: target, issues: checkFile(target) }];

  // Log individual results
  results.forEach((result) => {
    logIssues(result.issues, result.path);
  });

  // Overall summary
  if (results.length > 1) {
    const totalIssues = results.reduce((sum, r) => {
      return (
        sum +
        Object.values(r.issues).reduce((issueSum, arr) => issueSum + arr.length, 0)
      );
    }, 0);

    const filesWithIssues = results.filter((r) => {
      return Object.values(r.issues).some((arr) => arr.length > 0);
    }).length;

    console.log(`\n${colors.bright}${colors.cyan}📊 Overall Summary${colors.reset}`);
    console.log(`${'='.repeat(50)}`);
    console.log(`Files scanned: ${results.length}`);
    console.log(`Files with issues: ${filesWithIssues}`);
    console.log(`Total issues: ${totalIssues}`);

    if (totalIssues === 0) {
      console.log(`\n${colors.green}✅ Excellent! No accessibility issues found.${colors.reset}`);
    } else {
      console.log(`\n${colors.yellow}⚠️  Review and fix accessibility issues above.${colors.reset}`);
    }
  }

  // Exit code based on critical issues
  const criticalIssues = results.reduce((sum, r) => {
    return sum + r.issues.missingAlt.length + r.issues.clickWithoutKeyboard.length;
  }, 0);

  process.exit(criticalIssues > 0 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { checkAccessibility };
