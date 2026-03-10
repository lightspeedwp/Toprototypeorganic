# Component Generator Script

**Purpose:** Automatically generate compliant React components with proper structure, documentation, and design token usage.

---

## Usage

```bash
# Generate a pattern component
node scripts/generateComponent.js --name MyPattern --type pattern

# Generate a common component
node scripts/generateComponent.js --name MyUtility --type common

# Generate a block component
node scripts/generateComponent.js --name MyBlock --type block

# With description
node scripts/generateComponent.js --name Hero --type pattern --desc "Hero section component"
```

---

## What It Generates

### 1. Component File

**Location:** `/src/app/components/{type}/{ComponentName}.tsx`

**Template:**
```tsx
/**
 * {ComponentName} {type} component.
 * 
 * {description}
 * 
 * @module {ComponentName}
 * @category {type}
 */

import { cn } from "../../lib/utils";

interface {ComponentName}Props {
  /** Optional CSS class name */
  className?: string;
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * {ComponentName} component.
 * 
 * @component
 * @category {type}
 * 
 * @param {ComponentNameProps} props - Component properties
 * @returns {JSX.Element} Rendered component
 */
export function {ComponentName}({ className, children }: {ComponentName}Props) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-section-md",
      className
    )}>
      <div className="container">
        <h2>Section Title</h2>
        {children}
      </div>
    </section>
  );
}
```

### 2. Documentation File

**Location:** `/guidelines/components/{ComponentName}.md`

**Template:**
```markdown
# {ComponentName} Component

**Type:** {type}  
**Category:** {type}  
**Status:** Draft

---

## Overview

{description}

---

## Usage

\`\`\`tsx
import { {ComponentName} } from "../components/{type}/{ComponentName}";

export function MyPage() {
  return (
    <{ComponentName}>
      {/* Content */}
    </{ComponentName}>
  );
}
\`\`\`

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Optional CSS class name |
| `children` | `ReactNode` | `undefined` | Child elements |

---

## Design Tokens Used

### Colors
- `bg-background` - Background color
- `text-foreground` - Text color

### Spacing
- `py-section-md` - Vertical padding (48-96px fluid)

### Typography
- Semantic `<h2>` - Section heading

---

## Accessibility

- ✅ Semantic HTML (`<section>`)
- ✅ Proper heading hierarchy
- ✅ Keyboard accessible
- ✅ WCAG AA compliant

---

## Examples

### Basic Usage

\`\`\`tsx
<{ComponentName}>
  <p>Content goes here</p>
</{ComponentName}>
\`\`\`

### With Custom Styling

\`\`\`tsx
<{ComponentName} className="bg-muted">
  <p>Custom background</p>
</{ComponentName}>
\`\`\`

---

## Related Components

- [Container](Container.md)
- [Typography](Typography.md)

---

**Created:** {date}  
**Last Updated:** {date}
```

### 3. Test File (Optional)

**Location:** `/src/app/components/{type}/__tests__/{ComponentName}.test.tsx`

**Template:**
```tsx
import { render, screen } from '@testing-library/react';
import { {ComponentName} } from '../{ComponentName}';

describe('{ComponentName}', () => {
  it('renders children', () => {
    render(<{ComponentName}>Test Content</{ComponentName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <{ComponentName} className="custom-class">Content</{ComponentName}>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses semantic HTML', () => {
    const { container } = render(<{ComponentName}>Content</{ComponentName}>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
});
```

---

## Script Implementation

**File:** `/scripts/generateComponent.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const name = getArg('--name');
const type = getArg('--type') || 'pattern';
const description = getArg('--desc') || `${name} component`;

if (!name) {
  console.error('❌ Error: --name is required');
  console.log('Usage: node generateComponent.js --name MyComponent --type pattern');
  process.exit(1);
}

// Validate type
const validTypes = ['pattern', 'common', 'block'];
if (!validTypes.includes(type)) {
  console.error(`❌ Error: Invalid type "${type}". Must be one of: ${validTypes.join(', ')}`);
  process.exit(1);
}

console.log(`\n🚀 Generating ${type} component: ${name}\n`);

// Generate component file
const componentPath = path.join(
  __dirname,
  '../src/app/components',
  type,
  `${name}.tsx`
);
const componentTemplate = getComponentTemplate(name, type, description);
fs.writeFileSync(componentPath, componentTemplate);
console.log(`✅ Created: ${componentPath}`);

// Generate documentation file
const docPath = path.join(
  __dirname,
  '../guidelines/components',
  `${name}.md`
);
const docTemplate = getDocTemplate(name, type, description);
fs.writeFileSync(docPath, docTemplate);
console.log(`✅ Created: ${docPath}`);

console.log(`\n✨ Component generated successfully!\n`);
console.log(`Next steps:`);
console.log(`1. Edit ${componentPath} to add your component logic`);
console.log(`2. Update ${docPath} with usage examples`);
console.log(`3. Import in your page: import { ${name} } from "../components/${type}/${name}"`);
console.log();

// Helper functions
function getArg(flag) {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
}

function getComponentTemplate(name, type, description) {
  return `/**
 * ${name} ${type} component.
 * 
 * ${description}
 * 
 * @module ${name}
 * @category ${type}
 */

import { cn } from "../../lib/utils";

interface ${name}Props {
  /** Optional CSS class name */
  className?: string;
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * ${name} component.
 * 
 * @component
 * @category ${type}
 * 
 * @param {${name}Props} props - Component properties
 * @returns {JSX.Element} Rendered component
 */
export function ${name}({ className, children }: ${name}Props) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-section-md",
      className
    )}>
      <div className="container">
        <h2>Section Title</h2>
        {children}
      </div>
    </section>
  );
}
`;
}

function getDocTemplate(name, type, description) {
  const today = new Date().toLocaleDateString();
  
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
| \`className\` | \`string\` | \`undefined\` | Optional CSS class name |
| \`children\` | \`ReactNode\` | \`undefined\` | Child elements |

---

## Design Tokens Used

### Colors
- \`bg-background\` - Background color
- \`text-foreground\` - Text color

### Spacing
- \`py-section-md\` - Vertical padding (48-96px fluid)

### Typography
- Semantic \`<h2>\` - Section heading

---

## Accessibility

- ✅ Semantic HTML (\`<section>\`)
- ✅ Proper heading hierarchy
- ✅ Keyboard accessible
- ✅ WCAG AA compliant

---

## Examples

### Basic Usage

\`\`\`tsx
<${name}>
  <p>Content goes here</p>
</${name}>
\`\`\`

### With Custom Styling

\`\`\`tsx
<${name} className="bg-muted">
  <p>Custom background</p>
</${name}>
\`\`\`

---

## Related Components

- [Container](Container.md)
- [Typography](Typography.md)

---

**Created:** ${today}  
**Last Updated:** ${today}
`;
}
```

---

## Installation

1. Create the script file:
```bash
touch scripts/generateComponent.js
chmod +x scripts/generateComponent.js
```

2. Add to package.json:
```json
{
  "scripts": {
    "generate:component": "node scripts/generateComponent.js"
  }
}
```

3. Use it:
```bash
npm run generate:component -- --name MyComponent --type pattern --desc "My component description"
```

---

## Benefits

✅ **Consistency** - All components follow same structure
✅ **Speed** - Generate components in seconds
✅ **Compliance** - Built-in design token usage
✅ **Documentation** - Auto-generated docs
✅ **Best Practices** - Enforces patterns
✅ **Accessibility** - Semantic HTML by default

---

## Future Enhancements

- [ ] Add TypeScript strict mode templates
- [ ] Generate test files automatically
- [ ] Interactive CLI with prompts
- [ ] Customizable templates
- [ ] Integration with ComponentShowcase
- [ ] Automatic import in index files
