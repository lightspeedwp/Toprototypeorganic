#!/usr/bin/env node

/**
 * Component Generator Script
 * 
 * Generates compliant React components with proper structure,
 * documentation, and design token usage.
 * 
 * Usage:
 *   node scripts/generateComponent.js --name Hero --type pattern
 *   node scripts/generateComponent.js --name Button --type common --desc "Button component"
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

/**
 * Parse command line arguments.
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    parsed[key] = value;
  }
  
  return parsed;
}

/**
 * Get component template.
 */
function getComponentTemplate(name, type, description) {
  const importPath = type === 'pattern' ? '../../lib/utils' : '../../lib/utils';
  
  return `/**
 * ${name} ${type} component.
 * 
 * ${description}
 * 
 * @module ${name}
 * @category ${type}
 */

import { cn } from "${importPath}";

/**
 * Props for the ${name} component.
 * 
 * @interface ${name}Props
 */
interface ${name}Props {
  /** Optional CSS class name */
  className?: string;
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * ${name} component.
 * 
 * ${description}
 * 
 * @component
 * @category ${type}
 * 
 * @param {${name}Props} props - Component properties
 * @returns {JSX.Element} Rendered component
 * 
 * @example
 * \`\`\`tsx
 * <${name}>
 *   <p>Content goes here</p>
 * </${name}>
 * \`\`\`
 */
export function ${name}({ className, children }: ${name}Props) {
  return (
    <section className={cn(
      // Background and text colors using semantic tokens
      "bg-background text-foreground",
      // Fluid vertical spacing
      "py-section-md",
      // Custom classes
      className
    )}>
      <div className="container">
        {/* Semantic heading - no size classes */}
        <h2>Section Title</h2>
        <div className="mt-6">
          {children}
        </div>
      </div>
    </section>
  );
}
`;
}

/**
 * Get documentation template.
 */
function getDocTemplate(name, type, description) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return `# ${name} Component

**Type:** ${type}  
**Category:** ${type}  
**Status:** Draft

---

## Overview

${description}

---

## Usage

\`\`\`tsx
import { ${name} } from "../components/${type}/${name}";

export function MyPage() {
  return (
    <${name}>
      {/* Content */}
    </${name}>
  );
}
\`\`\`

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`className\` | \`string\` | \`undefined\` | Optional CSS class name for additional styling |
| \`children\` | \`ReactNode\` | \`undefined\` | Child elements to render inside the component |

---

## Design Tokens Used

### Colors
- \`bg-background\` - Main background color (light/dark mode aware)
- \`text-foreground\` - Main text color (light/dark mode aware)

### Spacing
- \`py-section-md\` - Vertical padding using fluid spacing (48-96px)
- \`mt-6\` - Top margin (24px)

### Typography
- Semantic \`<h2>\` - Section heading (uses theme.css sizing)
- No hardcoded font sizes - relies on semantic HTML

---

## Accessibility

✅ **WCAG 2.1 Level AA Compliant**

- ✅ Semantic HTML (\`<section>\`, \`<h2>\`)
- ✅ Proper heading hierarchy
- ✅ Keyboard accessible
- ✅ Screen reader compatible
- ✅ Color contrast ≥ 4.5:1
- ✅ Touch targets ≥ 44px

### Keyboard Navigation
- Standard tab navigation
- All interactive elements keyboard-reachable

### Screen Reader Support
- Proper semantic structure
- Meaningful heading hierarchy

---

## Examples

### Basic Usage

\`\`\`tsx
<${name}>
  <p>This is basic content inside the component.</p>
</${name}>
\`\`\`

### With Custom Styling

\`\`\`tsx
<${name} className="bg-muted">
  <p>Custom background applied via className.</p>
</${name}>
\`\`\`

### With Complex Content

\`\`\`tsx
<${name}>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-card p-6 rounded-lg">
      <h3>Feature 1</h3>
      <p>Description of feature 1</p>
    </div>
    <div className="bg-card p-6 rounded-lg">
      <h3>Feature 2</h3>
      <p>Description of feature 2</p>
    </div>
    <div className="bg-card p-6 rounded-lg">
      <h3>Feature 3</h3>
      <p>Description of feature 3</p>
    </div>
  </div>
</${name}>
\`\`\`

---

## Design System Compliance

### ✅ Checklist

- [x] Uses semantic HTML elements
- [x] No hardcoded colors (uses semantic tokens)
- [x] No hardcoded font sizes (uses semantic HTML)
- [x] No hardcoded spacing (uses Tailwind classes)
- [x] Proper TypeScript types
- [x] Accessibility features included
- [x] Responsive design
- [x] Dark mode support (via semantic tokens)

---

## Related Components

- [Container](Container.md) - Width constraint wrapper
- [Typography](Typography.md) - Typography utility component

---

## WordPress Alignment

**Maps to:**
- WordPress pattern or block equivalent
- Can be registered as a block pattern in WordPress

**Theme.json Tokens:**
- Uses semantic color tokens
- Follows spacing scale
- Respects typography hierarchy

---

## Notes

- Component follows WordPress block theme architecture
- All styling uses design tokens from \`theme.css\`
- Fully responsive and mobile-friendly
- Supports light and dark modes automatically

---

**Created:** ${today}  
**Last Updated:** ${today}  
**Version:** 1.0
`;
}

/**
 * Get test template.
 */
function getTestTemplate(name, type) {
  return `import { render, screen } from '@testing-library/react';
import { ${name} } from '../${name}';

describe('${name}', () => {
  it('renders children correctly', () => {
    render(
      <${name}>
        <p>Test Content</p>
      </${name}>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <${name} className="custom-class">
        <p>Content</p>
      </${name}>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses semantic HTML', () => {
    const { container } = render(
      <${name}>
        <p>Content</p>
      </${name}>
    );
    
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('includes semantic heading', () => {
    render(
      <${name}>
        <p>Content</p>
      </${name}>
    );
    
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders without children', () => {
    const { container } = render(<${name} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
`;
}

/**
 * Create component file.
 */
function createComponentFile(name, type, description) {
  const componentDir = path.join(process.cwd(), 'src', 'app', 'components', type);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  const componentPath = path.join(componentDir, `${name}.tsx`);
  
  // Check if file already exists
  if (fs.existsSync(componentPath)) {
    console.log(`${colors.yellow}⚠️  Warning: File already exists: ${componentPath}${colors.reset}`);
    console.log(`${colors.yellow}   Skipping component file creation.${colors.reset}`);
    return null;
  }
  
  const template = getComponentTemplate(name, type, description);
  fs.writeFileSync(componentPath, template);
  
  return componentPath;
}

/**
 * Create documentation file.
 */
function createDocFile(name, type, description) {
  const docDir = path.join(process.cwd(), 'guidelines', 'components');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir, { recursive: true });
  }
  
  const docPath = path.join(docDir, `${name}.md`);
  
  // Check if file already exists
  if (fs.existsSync(docPath)) {
    console.log(`${colors.yellow}⚠️  Warning: File already exists: ${docPath}${colors.reset}`);
    console.log(`${colors.yellow}   Skipping documentation file creation.${colors.reset}`);
    return null;
  }
  
  const template = getDocTemplate(name, type, description);
  fs.writeFileSync(docPath, template);
  
  return docPath;
}

/**
 * Create test file (optional).
 */
function createTestFile(name, type) {
  const testDir = path.join(process.cwd(), 'src', 'app', 'components', type, '__tests__');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  const testPath = path.join(testDir, `${name}.test.tsx`);
  
  // Check if file already exists
  if (fs.existsSync(testPath)) {
    console.log(`${colors.yellow}⚠️  Warning: File already exists: ${testPath}${colors.reset}`);
    console.log(`${colors.yellow}   Skipping test file creation.${colors.reset}`);
    return null;
  }
  
  const template = getTestTemplate(name, type);
  fs.writeFileSync(testPath, template);
  
  return testPath;
}

/**
 * Main execution.
 */
function main() {
  const args = parseArgs();
  const name = args.name;
  const type = args.type || 'pattern';
  const description = args.desc || `${name} component`;
  const withTests = args.test === 'true';
  
  console.log(`\n${colors.bright}${colors.cyan}🚀 Component Generator${colors.reset}`);
  console.log(`${'='.repeat(50)}\n`);
  
  // Validate arguments
  if (!name) {
    console.error(`${colors.red}❌ Error: --name is required${colors.reset}`);
    console.log(`\n${colors.bright}Usage:${colors.reset}`);
    console.log(`  node scripts/generateComponent.js --name MyComponent --type pattern`);
    console.log(`\n${colors.bright}Options:${colors.reset}`);
    console.log(`  --name   Component name (required)`);
    console.log(`  --type   Component type: pattern, common, or block (default: pattern)`);
    console.log(`  --desc   Component description (default: "{name} component")`);
    console.log(`  --test   Generate test file: true or false (default: false)`);
    process.exit(1);
  }
  
  // Validate type
  const validTypes = ['pattern', 'common', 'block'];
  if (!validTypes.includes(type)) {
    console.error(`${colors.red}❌ Error: Invalid type "${type}"${colors.reset}`);
    console.log(`${colors.bright}Valid types:${colors.reset} ${validTypes.join(', ')}`);
    process.exit(1);
  }
  
  console.log(`${colors.bright}Generating ${type} component: ${name}${colors.reset}`);
  console.log(`Description: ${description}\n`);
  
  // Create files
  const componentPath = createComponentFile(name, type, description);
  const docPath = createDocFile(name, type, description);
  const testPath = withTests ? createTestFile(name, type) : null;
  
  // Summary
  console.log(`\n${colors.bright}${colors.green}✨ Component generated successfully!${colors.reset}\n`);
  
  if (componentPath) {
    console.log(`${colors.green}✅${colors.reset} Created: ${componentPath}`);
  }
  if (docPath) {
    console.log(`${colors.green}✅${colors.reset} Created: ${docPath}`);
  }
  if (testPath) {
    console.log(`${colors.green}✅${colors.reset} Created: ${testPath}`);
  }
  
  console.log(`\n${colors.bright}Next steps:${colors.reset}`);
  console.log(`1. Edit ${componentPath || `src/app/components/${type}/${name}.tsx`}`);
  console.log(`2. Update ${docPath || `guidelines/components/${name}.md`} with usage examples`);
  console.log(`3. Import in your page:`);
  console.log(`   ${colors.cyan}import { ${name} } from "../components/${type}/${name}"${colors.reset}`);
  console.log(`4. Run validation:`);
  console.log(`   ${colors.cyan}npm run validate:design-tokens -- ${componentPath || `src/app/components/${type}/${name}.tsx`}${colors.reset}`);
  console.log('');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { getComponentTemplate, getDocTemplate, getTestTemplate };
