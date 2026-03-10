# NPM Scripts Guide - Design System Enforcement

**Purpose:** Automated scripts to maintain design system compliance

---

## 📋 Available Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    
    "// Design System Scripts": "",
    "validate:design-tokens": "node scripts/validateDesignTokens.js",
    "validate:design-tokens:watch": "nodemon --watch src/app --ext tsx --exec 'npm run validate:design-tokens'",
    "fix:design-tokens": "node scripts/autofixDesignTokens.js",
    "generate:component": "node scripts/generateComponent.js",
    
    "// Quality Assurance Scripts": "",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
    
    "// Accessibility Scripts": "",
    "a11y:check": "node scripts/checkAccessibility.js",
    "contrast:check": "node scripts/checkContrast.js",
    
    "// Compliance Scripts": "",
    "compliance:check": "npm run validate:design-tokens && npm run a11y:check && npm run contrast:check",
    "compliance:report": "node scripts/generateComplianceReport.js",
    "compliance:daily": "node scripts/dailyComplianceCheck.sh",
    
    "// Pre-commit Scripts": "",
    "pre-commit": "npm run type-check && npm run lint && npm run validate:design-tokens",
    "prepare": "husky install"
  }
}
```

---

## 🛠️ Script Descriptions

### Development Scripts

#### `npm run dev`
Start the development server with hot reload.

**Usage:**
```bash
npm run dev
```

**What It Does:**
- Starts Vite dev server
- Enables hot module replacement (HMR)
- Runs on http://localhost:5173

---

#### `npm run build`
Build the application for production.

**Usage:**
```bash
npm run build
```

**What It Does:**
1. Runs TypeScript compiler (type checking)
2. Bundles code with Vite
3. Outputs to `/dist` folder
4. Optimizes for production

---

### Design System Scripts

#### `npm run validate:design-tokens`
Validate design token usage across all components.

**Usage:**
```bash
npm run validate:design-tokens

# Check specific file
npm run validate:design-tokens -- src/app/components/MyComponent.tsx

# Check specific directory
npm run validate:design-tokens -- src/app/components/patterns/
```

**What It Checks:**
- ✅ No hardcoded hex colors
- ✅ No hardcoded RGB values
- ✅ No text size classes on semantic HTML
- ✅ No hardcoded spacing in inline styles
- ✅ All images have alt text
- ✅ Icon-only buttons have aria-label
- ✅ Interactive elements have focus indicators

**Output:**
```
🔍 Design Token Validation

Scanning files...
  ✅ src/app/components/patterns/Hero.tsx (100%)
  ✅ src/app/components/patterns/CardGrid.tsx (100%)
  ⚠️  src/app/components/patterns/MyComponent.tsx (85%)

Overall Compliance: 95%

❌ Found 3 violations:

File: src/app/components/patterns/MyComponent.tsx
  Line 23: Hardcoded color #4a7311 (use var(--primary) instead)
  Line 45: Font size class on <h2> (remove text-2xl)
  Line 67: Inline spacing padding: 24px (use className="p-6")
```

---

#### `npm run validate:design-tokens:watch`
Watch mode - validates on file changes.

**Usage:**
```bash
npm run validate:design-tokens:watch
```

**What It Does:**
- Watches all `.tsx` files in `src/app/`
- Runs validation on save
- Provides immediate feedback

**Requirements:**
```bash
npm install --save-dev nodemon
```

---

#### `npm run fix:design-tokens`
Automatically fix common design token violations.

**Usage:**
```bash
# Dry run (preview changes)
npm run fix:design-tokens -- --dry-run

# Apply fixes
npm run fix:design-tokens

# Fix specific file
npm run fix:design-tokens -- src/app/components/MyComponent.tsx
```

**What It Fixes:**
1. Converts hex colors to semantic tokens
2. Removes text size classes from semantic HTML
3. Converts inline spacing to Tailwind classes
4. Adds placeholder alt text to images
5. Adds placeholder aria-labels to icon-only buttons

**Example Output:**
```
🔧 Auto-fixing design token violations...

File: src/app/components/MyComponent.tsx
  ✅ Line 23: #4a7311 → className="bg-primary"
  ✅ Line 45: Removed text-2xl from <h2>
  ✅ Line 67: style="padding: 24px" → className="p-6"

✅ 3 violations fixed automatically!
⚠️  2 violations require manual review
```

---

#### `npm run generate:component`
Generate a new component with proper structure.

**Usage:**
```bash
# Generate pattern component
npm run generate:component -- --name Hero --type pattern

# Generate common component
npm run generate:component -- --name Button --type common

# With description
npm run generate:component -- --name Hero --type pattern --desc "Hero section component"
```

**What It Generates:**
1. Component file (`/src/app/components/{type}/{Name}.tsx`)
2. Documentation (`/guidelines/components/{Name}.md`)
3. Proper TypeScript types
4. Design token usage by default
5. Accessibility features built-in

---

### Quality Assurance Scripts

#### `npm run lint`
Run ESLint to check for code quality issues.

**Usage:**
```bash
npm run lint
```

**What It Checks:**
- TypeScript/React best practices
- Unused variables
- Import order
- Custom design system rules

---

#### `npm run lint:fix`
Automatically fix ESLint issues.

**Usage:**
```bash
npm run lint:fix
```

---

#### `npm run type-check`
Run TypeScript compiler without emitting files.

**Usage:**
```bash
npm run type-check
```

**What It Does:**
- Checks for type errors
- Validates TypeScript configuration
- Fast feedback without building

---

#### `npm run format`
Format code with Prettier.

**Usage:**
```bash
npm run format
```

**What It Formats:**
- `.ts` and `.tsx` files
- `.css` files
- `.md` documentation files

---

#### `npm run format:check`
Check if code is formatted correctly.

**Usage:**
```bash
npm run format:check
```

---

### Accessibility Scripts

#### `npm run a11y:check`
Run accessibility audit.

**Usage:**
```bash
npm run a11y:check
```

**What It Checks:**
- Semantic HTML usage
- Alt text on images
- ARIA labels
- Focus indicators
- Keyboard navigation
- Heading hierarchy
- WCAG AA compliance

**Output:**
```
♿ Accessibility Check

✅ Semantic HTML: 100%
✅ Alt Text: 100%
✅ ARIA Labels: 98%
✅ Focus Indicators: 95%
✅ WCAG AA Compliance: 100%

Overall Score: 99% ✅
```

---

#### `npm run contrast:check`
Check color contrast ratios.

**Usage:**
```bash
npm run contrast:check
```

**What It Checks:**
- Text/background contrast (4.5:1 minimum)
- Large text contrast (3:1 minimum)
- UI component contrast (3:1 minimum)
- Both light and dark modes

**Output:**
```
🎨 Color Contrast Check

Light Mode:
  ✅ Text on Background: 7.8:1 (AAA)
  ✅ Primary on Background: 7.2:1 (AAA)
  ✅ Muted Text: 4.8:1 (AA)

Dark Mode:
  ✅ Text on Background: 8.1:1 (AAA)
  ✅ Primary on Background: 5.8:1 (AAA)
  ✅ Muted Text: 4.6:1 (AA)

Overall: 100% WCAG AA ✅
```

---

### Compliance Scripts

#### `npm run compliance:check`
Run all compliance checks.

**Usage:**
```bash
npm run compliance:check
```

**What It Runs:**
1. Design token validation
2. Accessibility check
3. Color contrast check

**Output:**
```
📊 Full Compliance Check

1. Design Tokens: 98% ✅
2. Accessibility: 100% ✅
3. Color Contrast: 100% ✅

Overall Compliance: 99% ✅
```

---

#### `npm run compliance:report`
Generate comprehensive compliance report.

**Usage:**
```bash
npm run compliance:report
```

**What It Generates:**
- PDF report
- HTML dashboard
- JSON data file
- Trend analysis

**Output Location:** `/reports/compliance-{date}.pdf`

---

#### `npm run compliance:daily`
Daily automated compliance check (use with cron).

**Usage:**
```bash
# Manual run
npm run compliance:daily

# Cron job (every weekday at 9am)
0 9 * * 1-5 cd /path/to/project && npm run compliance:daily
```

**What It Does:**
1. Runs all compliance checks
2. Compares to previous day
3. Sends email if issues found
4. Logs to dashboard

---

### Pre-commit Scripts

#### `npm run pre-commit`
Run before every commit (automated with Husky).

**Usage:**
```bash
npm run pre-commit
```

**What It Runs:**
1. Type checking
2. Linting
3. Design token validation

**Setup:**
```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run pre-commit"
```

---

## 🚀 Quick Start Workflow

### Daily Development
```bash
# Start development server
npm run dev

# In another terminal, watch for violations
npm run validate:design-tokens:watch
```

### Before Committing
```bash
# Run full compliance check
npm run compliance:check

# Fix any issues
npm run fix:design-tokens
npm run lint:fix
npm run format

# Commit (pre-commit hook will run automatically)
git commit -m "Add new component"
```

### Creating New Components
```bash
# Generate component
npm run generate:component -- --name Hero --type pattern

# Edit component
# vim src/app/components/patterns/Hero.tsx

# Validate
npm run validate:design-tokens -- src/app/components/patterns/Hero.tsx

# Commit
git add .
git commit -m "Add Hero component"
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
# Development dependencies
npm install --save-dev \
  husky \
  nodemon \
  eslint \
  prettier \
  typescript

# Optional (for PDF reports)
npm install --save-dev puppeteer
```

### 2. Create Script Files

```bash
# Create scripts directory
mkdir -p scripts

# Create script files
touch scripts/validateDesignTokens.js
touch scripts/autofixDesignTokens.js
touch scripts/generateComponent.js
touch scripts/checkAccessibility.js
touch scripts/checkContrast.js
touch scripts/generateComplianceReport.js
touch scripts/dailyComplianceCheck.sh
```

### 3. Setup Husky (Pre-commit Hooks)

```bash
# Install and initialize Husky
npm install --save-dev husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run pre-commit"

# Make executable
chmod +x .husky/pre-commit
```

### 4. Configure ESLint

Create `.eslintrc.cjs`:
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // Design system enforcement
    'no-restricted-syntax': [
      'error',
      {
        selector: "Literal[value=/#[0-9a-f]{3,6}/i]",
        message: 'Use CSS variables instead of hardcoded colors'
      }
    ]
  }
};
```

### 5. Configure Prettier

Create `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2
}
```

---

## 📊 Monitoring & Reporting

### Daily Reports

Set up a cron job to run daily compliance checks:

```bash
# Edit crontab
crontab -e

# Add this line (runs every weekday at 9am)
0 9 * * 1-5 cd /path/to/project && npm run compliance:daily
```

### CI/CD Integration

Add to your CI pipeline (GitHub Actions example):

```yaml
name: Compliance Check

on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run compliance:check
```

---

## ✅ Success Metrics

Track these metrics:
- **Design Token Compliance:** 95%+ (target: 98%)
- **Accessibility Score:** 100% WCAG AA
- **New Violations/Month:** < 5
- **Average Fix Time:** < 1 hour
- **Developer Onboarding:** < 1 week

---

**Document Version:** 1.0  
**Last Updated:** December 28, 2024  
**Maintained By:** Development Team
