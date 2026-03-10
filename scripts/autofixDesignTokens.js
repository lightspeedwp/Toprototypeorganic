#!/usr/bin/env node

/**
 * Auto-fix Design Token Violations Script
 * 
 * Automatically fixes common design token violations by converting
 * hardcoded values to semantic tokens.
 * 
 * Usage:
 *   node scripts/autofixDesignTokens.js --dry-run (preview changes)
 *   node scripts/autofixDesignTokens.js (apply fixes)
 *   node scripts/autofixDesignTokens.js src/app/components/MyComponent.tsx
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

// Common color mappings (hex to semantic token)
const colorMappings = {
  // Primary colors (green)
  '#4a7311': 'bg-primary text-primary-foreground',
  '#6ea532': 'bg-primary text-primary-foreground',
  '#567d22': 'bg-primary/90',
  
  // Background colors
  '#ffffff': 'bg-background',
  '#000000': 'bg-foreground',
  '#f5f5f5': 'bg-muted',
  '#fafafa': 'bg-background',
  
  // Text colors
  '#1a1a1a': 'text-foreground',
  '#666666': 'text-muted-foreground',
  '#999999': 'text-muted-foreground',
  
  // Border colors
  '#e5e5e5': 'border-border',
  '#d4d4d4': 'border-border',
  '#cccccc': 'border-border',
};

/**
 * Auto-fix design token violations in code.
 */
function autofixDesignTokens(code, filename) {
  let fixedCode = code;
  const fixes = [];
  const lines = code.split('\n');
  let lineNumber = 0;

  // Fix 1: Replace hardcoded hex colors with semantic tokens
  Object.entries(colorMappings).forEach(([hex, token]) => {
    const regex = new RegExp(hex, 'gi');
    if (regex.test(fixedCode)) {
      // Check if it's in a style attribute
      const styleRegex = new RegExp(`(style=\\{\\{[^}]*)(color|backgroundColor|borderColor):\\s*['"]${hex}['"]([^}]*\\}\\})`, 'gi');
      
      if (styleRegex.test(fixedCode)) {
        fixes.push({
          line: 0, // We'll calculate this later
          type: 'color',
          original: `style={{ color: '${hex}' }}`,
          fixed: `className="${token.split(' ')[0]}"`,
          message: `Converted hex color ${hex} to semantic token ${token}`,
        });
        
        // This is complex - skip for now and mark as manual
        fixes[fixes.length - 1].manual = true;
      }
    }
  });

  // Fix 2: Remove text size classes from semantic HTML
  const semanticElements = ['<h1', '<h2', '<h3', '<h4', '<h5', '<h6', '<p'];
  const textSizeRegex = /\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)\b/g;
  
  fixedCode = fixedCode.split('\n').map((line, index) => {
    lineNumber = index + 1;
    let fixedLine = line;
    
    semanticElements.forEach((element) => {
      if (line.includes(element)) {
        const matches = line.match(textSizeRegex);
        if (matches) {
          matches.forEach((match) => {
            fixes.push({
              line: lineNumber,
              type: 'size',
              original: match,
              fixed: '(removed)',
              message: `Removed ${match} from semantic HTML element`,
            });
            
            // Remove the text size class
            fixedLine = fixedLine.replace(match, '').replace(/\s+/g, ' ').trim();
          });
        }
      }
    });
    
    return fixedLine;
  }).join('\n');

  // Fix 3: Convert inline spacing to Tailwind classes
  const spacingMappings = {
    '4px': '1',
    '8px': '2',
    '12px': '3',
    '16px': '4',
    '20px': '5',
    '24px': '6',
    '32px': '8',
    '48px': '12',
    '64px': '16',
  };
  
  fixedCode = fixedCode.split('\n').map((line, index) => {
    lineNumber = index + 1;
    let fixedLine = line;
    
    // Check for inline padding
    const paddingRegex = /padding:\s*['"]?(\d+px)['"]?/g;
    let match;
    while ((match = paddingRegex.exec(line)) !== null) {
      const pixels = match[1];
      const tailwindValue = spacingMappings[pixels];
      
      if (tailwindValue) {
        fixes.push({
          line: lineNumber,
          type: 'spacing',
          original: `padding: ${pixels}`,
          fixed: `className="p-${tailwindValue}"`,
          message: `Converted inline padding to Tailwind class`,
          manual: true, // Requires manual review
        });
      }
    }
    
    // Check for inline margin
    const marginRegex = /margin:\s*['"]?(\d+px)['"]?/g;
    while ((match = marginRegex.exec(line)) !== null) {
      const pixels = match[1];
      const tailwindValue = spacingMappings[pixels];
      
      if (tailwindValue) {
        fixes.push({
          line: lineNumber,
          type: 'spacing',
          original: `margin: ${pixels}`,
          fixed: `className="m-${tailwindValue}"`,
          message: `Converted inline margin to Tailwind class`,
          manual: true, // Requires manual review
        });
      }
    }
    
    return fixedLine;
  }).join('\n');

  // Fix 4: Add placeholder alt text to images
  fixedCode = fixedCode.split('\n').map((line, index) => {
    lineNumber = index + 1;
    let fixedLine = line;
    
    if (line.includes('<img') && !line.includes('alt=')) {
      fixes.push({
        line: lineNumber,
        type: 'alt',
        original: '<img src=...',
        fixed: '<img src=... alt="TODO: Add descriptive alt text"',
        message: 'Added placeholder alt text',
      });
      
      // Add alt text before the closing />
      fixedLine = fixedLine.replace(/\s*\/>/, ' alt="TODO: Add descriptive alt text" />');
    }
    
    return fixedLine;
  }).join('\n');

  // Fix 5: Add placeholder aria-label to icon-only buttons
  fixedCode = fixedCode.split('\n').map((line, index) => {
    lineNumber = index + 1;
    let fixedLine = line;
    
    // Simple heuristic: button with icon component and no text
    if (line.includes('<button') && 
        line.match(/<[A-Z]\w+\s*\/>/) && 
        !line.includes('aria-label') &&
        !line.includes('children')) {
      
      fixes.push({
        line: lineNumber,
        type: 'aria',
        original: '<button>...',
        fixed: '<button aria-label="TODO: Add descriptive label">...',
        message: 'Added placeholder aria-label',
      });
      
      // Add aria-label after <button
      fixedLine = fixedLine.replace(/<button/, '<button aria-label="TODO: Add descriptive label"');
    }
    
    return fixedLine;
  }).join('\n');

  // Fix 6: Add focus indicators to links and buttons
  fixedCode = fixedCode.split('\n').map((line, index) => {
    lineNumber = index + 1;
    let fixedLine = line;
    
    // Check for links/buttons without focus indicators
    if ((line.includes('<a ') || line.includes('<button ')) && 
        line.includes('className') && 
        !line.includes('focus-visible:') &&
        !line.includes('focus:') &&
        !line.includes('Button') && // Skip shadcn Button
        !line.includes('// Skip focus check')) {
      
      fixes.push({
        line: lineNumber,
        type: 'focus',
        original: 'className="..."',
        fixed: 'className="... focus-visible:ring-2 focus-visible:ring-ring"',
        message: 'Added focus indicator classes',
        manual: true, // Needs proper placement in className
      });
    }
    
    return fixedLine;
  }).join('\n');

  return {
    fixedCode,
    fixes,
    originalCode: code,
  };
}

/**
 * Log fixes applied.
 */
function logFixes(result, filename, isDryRun) {
  const automaticFixes = result.fixes.filter(f => !f.manual);
  const manualFixes = result.fixes.filter(f => f.manual);
  
  console.log(`\n${colors.bright}${colors.cyan}📝 File: ${filename}${colors.reset}`);
  
  if (result.fixes.length === 0) {
    console.log(`${colors.green}✅ No fixes needed!${colors.reset}`);
    return;
  }
  
  console.log(`Found ${result.fixes.length} fix(es):\n`);
  
  if (automaticFixes.length > 0) {
    console.log(`${colors.bright}${colors.green}Automatic Fixes (${automaticFixes.length}):${colors.reset}`);
    automaticFixes.forEach((fix) => {
      console.log(`  ${colors.cyan}Line ${fix.line}:${colors.reset} ${fix.message}`);
      console.log(`    ${colors.red}- ${fix.original}${colors.reset}`);
      console.log(`    ${colors.green}+ ${fix.fixed}${colors.reset}`);
    });
  }
  
  if (manualFixes.length > 0) {
    console.log(`\n${colors.bright}${colors.yellow}Manual Review Required (${manualFixes.length}):${colors.reset}`);
    manualFixes.forEach((fix) => {
      console.log(`  ${colors.cyan}Line ${fix.line}:${colors.reset} ${fix.message}`);
      console.log(`    ${colors.yellow}Original: ${fix.original}${colors.reset}`);
      console.log(`    ${colors.blue}Suggested: ${fix.fixed}${colors.reset}`);
    });
  }
  
  if (isDryRun) {
    console.log(`\n${colors.yellow}🔍 DRY RUN - No changes written to file${colors.reset}`);
  } else {
    console.log(`\n${colors.green}✅ Automatic fixes applied!${colors.reset}`);
    if (manualFixes.length > 0) {
      console.log(`${colors.yellow}⚠️  ${manualFixes.length} fix(es) require manual review${colors.reset}`);
    }
  }
}

/**
 * Process a single file.
 */
function processFile(filePath, isDryRun) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(process.cwd(), filePath);
  const result = autofixDesignTokens(code, relativePath);
  
  logFixes(result, relativePath, isDryRun);
  
  // Write file if not dry run
  if (!isDryRun && result.fixes.filter(f => !f.manual).length > 0) {
    fs.writeFileSync(filePath, result.fixedCode);
  }
  
  return result;
}

/**
 * Process all files in a directory.
 */
function processDirectory(dirPath, isDryRun) {
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
        results.push(processFile(filePath, isDryRun));
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
  const isDryRun = args.includes('--dry-run');
  const target = args.find(arg => !arg.startsWith('--')) || 'src/app';
  
  console.log(`${colors.bright}${colors.cyan}Auto-fix Design Token Violations${colors.reset}`);
  console.log(`${'='.repeat(50)}\n`);
  
  if (isDryRun) {
    console.log(`${colors.yellow}🔍 Running in DRY RUN mode (no files will be modified)${colors.reset}\n`);
  }
  
  if (!fs.existsSync(target)) {
    console.error(`${colors.red}❌ Error: Path "${target}" does not exist${colors.reset}`);
    process.exit(1);
  }
  
  const stat = fs.statSync(target);
  const results = stat.isDirectory() ? processDirectory(target, isDryRun) : [processFile(target, isDryRun)];
  
  // Overall summary
  if (results.length > 1) {
    const totalFixes = results.reduce((sum, r) => sum + r.fixes.length, 0);
    const automaticFixes = results.reduce((sum, r) => sum + r.fixes.filter(f => !f.manual).length, 0);
    const manualFixes = results.reduce((sum, r) => sum + r.fixes.filter(f => f.manual).length, 0);
    const filesModified = results.filter(r => r.fixes.filter(f => !f.manual).length > 0).length;
    
    console.log(`\n${colors.bright}${colors.cyan}📊 Overall Summary${colors.reset}`);
    console.log(`${'='.repeat(50)}`);
    console.log(`Files scanned: ${results.length}`);
    console.log(`Total fixes found: ${totalFixes}`);
    console.log(`Automatic fixes: ${colors.green}${automaticFixes}${colors.reset}`);
    console.log(`Manual review required: ${colors.yellow}${manualFixes}${colors.reset}`);
    
    if (!isDryRun) {
      console.log(`Files modified: ${filesModified}`);
      console.log(`\n${colors.green}✅ Automatic fixes applied!${colors.reset}`);
      
      if (manualFixes > 0) {
        console.log(`${colors.yellow}⚠️  ${manualFixes} fix(es) require manual review${colors.reset}`);
        console.log(`\n${colors.bright}Next steps:${colors.reset}`);
        console.log(`1. Review manual fixes in the output above`);
        console.log(`2. Make manual adjustments where needed`);
        console.log(`3. Run validation: npm run validate:design-tokens`);
      }
    } else {
      console.log(`\n${colors.yellow}🔍 DRY RUN complete - Run without --dry-run to apply fixes${colors.reset}`);
    }
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { autofixDesignTokens };
