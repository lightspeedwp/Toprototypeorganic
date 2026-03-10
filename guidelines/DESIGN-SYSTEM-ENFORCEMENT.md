# Design System Enforcement Guide

**Version:** 1.0  
**Date:** December 28, 2024  
**Purpose:** Tools and utilities to enforce design system compliance

---

## 🎯 Overview

This guide provides **automated tools, utilities, and best practices** to ensure all code adheres to the design system using CSS variables from `theme.css`.

**Goal:** Make it **easy to do the right thing** and **hard to do the wrong thing**.

---

## 🚫 **STRICT PROHIBITION: INLINE STYLES**

The LSX Design System enforces a **zero inline style policy** for all components in `/src/app/components/` (excluding `ui/`) and pages in `/src/app/pages/`.

### **Why?**
- **Maintenance:** Inline styles cannot be updated globally via CSS files.
- **Consistency:** Bypasses design tokens and creates visual drift.
- **WordPress Alignment:** Prevents the system from being controlled by `theme.json`.

### **Acceptable Exceptions:**
1. **Animation:** motion/react `style` prop for dynamic animation values.
2. **Dynamic Tokens:** Inline `style` using CSS custom properties (e.g., `style={{ '--dynamic-gap': gap } as React.CSSProperties}`).

---

## 🛠️ Enforcement Tools

### 1. Design Token Validator

A utility to scan code and validate design token usage.

**Location:** `/src/app/utils/designTokenValidator.ts`

**Usage:**
```typescript
import { validateDesignTokens } from './utils/designTokenValidator';

// Validate a component file
const results = await validateDesignTokens('./src/app/components/MyComponent.tsx');

// Results include:
// - hardcodedColors: string[] (hex/rgb values found)
// - hardcodedSizes: string[] (pixel font sizes found)
// - hardcodedSpacing: string[] (pixel spacing found)
// - compliance: number (0-100%)
```

**What It Checks:**
- ✅ No hardcoded hex colors (`#xxx`)
- ✅ No hardcoded RGB values (`rgb()`, `rgba()`)
- ✅ No hardcoded font sizes on semantic HTML (`text-*` classes)
- ✅ No hardcoded spacing in inline styles (`padding:`, `margin:`)
- ✅ Semantic HTML usage
- ✅ ARIA labels on icon-only buttons

---

### 2. Component Generator

A CLI tool to generate compliant components automatically.

**Location:** `/scripts/generateComponent.js`

**Usage:**
```bash
# Generate a new component
npm run generate:component MyNewComponent

# Generates:
# - /src/app/components/patterns/MyNewComponent.tsx (compliant template)
# - /guidelines/components/MyNewComponent.md (documentation)
```

**Generated Template:**
```tsx
import { cn } from "../../lib/utils";

interface MyNewComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export function MyNewComponent({ className, children }: MyNewComponentProps) {
  return (
    <div className={cn(
      // ✅ Uses semantic tokens
      "bg-card text-card-foreground",
      "p-6",  // ✅ Tailwind spacing
      "rounded-lg",  // ✅ Tailwind radius
      "border border-border",  // ✅ Semantic border color
      className
    )}>
      {/* ✅ Semantic HTML - no size classes */}
      <h2>Component Title</h2>
      <p>{children}</p>
    </div>
  );
}
```

---

### 3. Pre-Commit Hook

Automatically validate design token usage before commits.

**Location:** `/scripts/pre-commit.sh`

**Setup:**
```bash
# Install husky
npm install --save-dev husky

# Setup git hooks
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run validate:design-tokens"
```

**What It Does:**
1. Scans all staged `.tsx` files
2. Checks for design system violations
3. Prevents commit if violations found
4. Provides fix suggestions

**Example Output:**
```
❌ Design System Violations Found:

File: src/app/components/MyComponent.tsx
- Line 23: Hardcoded color #4a7311 (use var(--primary) instead)
- Line 45: Font size class on <h2> (remove text-2xl, use semantic HTML)
- Line 67: Inline spacing padding: 24px (use className="p-6" instead)

❌ Commit blocked. Fix violations and try again.
```

---

### 4. VS Code Snippets

Code snippets for rapid compliant component creation.

**Location:** `/.vscode/snippets.code-snippets`

**Available Snippets:**

#### `comp-pattern` - Pattern Component
```typescript
// Type: comp-pattern
// Generates a full pattern component
import { cn } from "../../lib/utils";

interface ${1:ComponentName}Props {
  className?: string;
  children?: React.ReactNode;
}

export function ${1:ComponentName}({ className, children }: ${1:ComponentName}Props) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-section-md",
      className
    )}>
      <div className="container">
        <h2>${2:Section Title}</h2>
        {children}
      </div>
    </section>
  );
}
```

#### `comp-card` - Card Component
```typescript
// Type: comp-card
// Generates a card component
<div className={cn(
  "bg-card text-card-foreground",
  "p-6 rounded-lg",
  "border border-border",
  "shadow-sm",
  className
)}>
  {children}
</div>
```

#### `comp-button` - Button Link
```typescript
// Type: comp-button
// Generates a button with semantic styling
<button className={cn(
  "bg-primary text-primary-foreground",
  "px-6 py-3 rounded-lg",
  "hover:bg-primary/90 transition-colors",
  "focus-visible:ring-2 focus-visible:ring-ring",
  className
)}>
  ${1:Button Text}
</button>
```

#### `sem-heading` - Semantic Heading
```typescript
// Type: sem-heading
// Generates a semantic heading (no size classes)
<h${1:2}>${2:Heading Text}</h${1:2}>
```

---

### 5. ESLint Rules

Custom ESLint rules to catch violations.

**Location:** `/.eslintrc.cjs`

**Rules:**
```javascript
module.exports = {
  rules: {
    // Prevent hardcoded colors
    'no-restricted-syntax': [
      'error',
      {
        selector: "Literal[value=/#[0-9a-f]{3,6}/i]",
        message: 'Use CSS variables instead of hardcoded colors (e.g., var(--primary))'
      },
      {
        selector: "CallExpression[callee.name='rgb']",
        message: 'Use CSS variables instead of rgb() values'
      },
      {
        selector: "CallExpression[callee.name='rgba']",
        message: 'Use CSS variables instead of rgba() values'
      }
    ],
    
    // Prevent inline styles
    'react/forbid-dom-props': [
      'error',
      {
        forbid: [
          {
            propName: 'style',
            message: 'Use className with Tailwind/CSS variables instead of inline styles'
          }
        ]
      }
    ],
    
    // Prevent text size classes on semantic HTML
    'custom/no-text-classes-on-semantic': 'error'
  }
};
```

---

### 6. Stylelint Configuration

Lint CSS files for design token usage.

**Location:** `/.stylelintrc.json`

**Configuration:**
```json
{
  "rules": {
    "color-no-hex": true,
    "declaration-property-value-allowed-list": {
      "color": ["/var\\(--/"],
      "background-color": ["/var\\(--/"],
      "border-color": ["/var\\(--/"]
    },
    "unit-allowed-list": ["rem", "em", "%", "vh", "vw", "deg", "s", "ms"],
    "function-allowed-list": ["var", "calc", "clamp", "min", "max", "rgb", "rgba", "hsl", "hsla"]
  }
}
```

---

## 📋 Component Checklist

Use this checklist before creating any new component:

### Before You Start
- [ ] Read relevant guidelines in `/guidelines/`
- [ ] Check if similar component exists
- [ ] Review design tokens in `/src/styles/theme.css`
- [ ] Plan component structure (pattern, common, or block)

### Styling Checklist
- [ ] Use semantic HTML elements (`<h1>`, `<p>`, `<button>`, `<a>`)
- [ ] No Tailwind size/weight classes on semantic elements
- [ ] All colors use semantic tokens (`bg-primary`, `text-foreground`)
- [ ] All spacing uses Tailwind classes (`p-6`, `mb-12`)
- [ ] All borders use semantic tokens (`border-border`)
- [ ] All radius uses Tailwind (`rounded-lg`)
- [ ] All shadows use Tailwind (`shadow-sm`)

### Accessibility Checklist
- [ ] Semantic HTML (not `<div>` for buttons/links)
- [ ] Alt text on images
- [ ] ARIA labels on icon-only buttons
- [ ] Focus indicators visible (`focus-visible:ring-2`)
- [ ] Touch targets ≥ 44px
- [ ] Color contrast ≥ 4.5:1

### Testing Checklist
- [ ] Run `npm run validate:design-tokens`
- [ ] Test in light and dark mode
- [ ] Test on mobile (375px)
- [ ] Test keyboard navigation
- [ ] Check Lighthouse accessibility score

### Documentation Checklist
- [ ] Add TSDoc comments
- [ ] Create guidelines document if pattern
- [ ] Update AUDIT-AND-COMPLIANCE-INDEX.md
- [ ] Add examples to ComponentShowcase

---

## 🎨 Design Token Reference

### Quick Reference for Common Patterns

#### Colors
```tsx
// Background colors
bg-background          // Main background
bg-card                // Card backgrounds
bg-muted               // Subtle backgrounds
bg-accent              // Highlighted areas

// Text colors
text-foreground        // Main text
text-card-foreground   // Text on cards
text-muted-foreground  // Secondary text
text-accent-foreground // Text on accent backgrounds

// Brand colors
bg-primary text-primary-foreground     // Primary actions
bg-secondary text-secondary-foreground // Secondary actions
bg-accent text-accent-foreground       // Accents

// Utility colors
bg-destructive text-destructive-foreground // Errors, delete actions

// Borders
border-border          // Default borders
ring-ring              // Focus rings
```

#### Spacing
```tsx
// Component padding/margin
p-4, p-6, p-8         // Padding (16px, 24px, 32px)
m-4, m-6, m-8         // Margin
gap-4, gap-6, gap-8   // Grid/flex gaps

// Section spacing (fluid)
py-section-md         // clamp(3rem, 5vw + 1rem, 6rem) = 48-96px
py-section-lg         // clamp(4rem, 6vw + 2rem, 8rem) = 64-128px

// Element spacing (fluid)
py-element-md         // clamp(1rem, 2vw + 0.5rem, 2rem) = 16-32px
```

#### Typography
```tsx
// Semantic HTML only (no size classes)
<h1>Large heading</h1>      // var(--text-6xl) = 48-72px
<h2>Section heading</h2>    // var(--text-4xl) = 30-48px
<h3>Subsection heading</h3> // var(--text-3xl) = 24-36px
<p>Body text</p>            // var(--text-base) = 16-18px

// Font families (automatic via CSS)
// Headings: Lora (serif)
// Body: Noto Sans (sans-serif)
```

#### Borders & Radius
```tsx
// Borders
border              // 1px solid
border-2            // 2px solid
border-border       // Uses semantic color

// Radius
rounded-sm          // var(--radius-sm) = 2px
rounded-md          // var(--radius-md) = 4px
rounded-lg          // var(--radius-lg) = 6px
rounded-xl          // var(--radius-xl) = 8px
```

#### Shadows
```tsx
shadow-sm           // var(--elevation-sm) = subtle shadow
```

---

## 🚫 Common Violations & Fixes

### Violation 1: Hardcoded Colors

**❌ WRONG:**
```tsx
<div style={{ backgroundColor: '#4a7311', color: '#ffffff' }}>
  Content
</div>
```

**✅ CORRECT:**
```tsx
<div className="bg-primary text-primary-foreground">
  Content
</div>
```

---

### Violation 2: Text Classes on Semantic HTML

**❌ WRONG:**
```tsx
<h2 className="text-2xl font-bold">Section Title</h2>
```

**✅ CORRECT:**
```tsx
<h2>Section Title</h2>  {/* Gets 32px, Lora, 600 automatically */}
```

---

### Violation 3: Hardcoded Spacing

**❌ WRONG:**
```tsx
<div style={{ padding: '24px', marginBottom: '48px' }}>
  Content
</div>
```

**✅ CORRECT:**
```tsx
<div className="p-6 mb-12">
  Content
</div>
```

---

### Violation 4: Inline Styles

**❌ WRONG:**
```tsx
<button style={{ 
  backgroundColor: '#4a7311',
  padding: '12px 24px',
  borderRadius: '8px'
}}>
  Click Me
</button>
```

**✅ CORRECT:**
```tsx
<button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
  Click Me
</button>
```

---

### Violation 5: Div Instead of Semantic HTML

**❌ WRONG:**
```tsx
<div onClick={handleClick} className="cursor-pointer">
  Click Me
</div>
```

**✅ CORRECT:**
```tsx
<button onClick={handleClick}>
  Click Me
</button>
```

---

### Violation 6: Missing Alt Text

**❌ WRONG:**
```tsx
<img src={tour.image} />
```

**✅ CORRECT:**
```tsx
<img src={tour.image} alt={`${tour.name} - scenic tour destination`} />
```

---

### Violation 7: Icon-Only Button Without Label

**❌ WRONG:**
```tsx
<button>
  <X />
</button>
```

**✅ CORRECT:**
```tsx
<button aria-label="Close dialog">
  <X />
</button>
```

---

### Violation 8: No Focus Indicator

**❌ WRONG:**
```tsx
<a href="/tours" className="outline-none">
  View Tours
</a>
```

**✅ CORRECT:**
```tsx
<a href="/tours" className="focus-visible:ring-2 focus-visible:ring-ring">
  View Tours
</a>
```

---

## 🔧 Automated Fixes

### Fix Script

**Location:** `/scripts/autofix-design-tokens.js`

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
1. Converts hardcoded colors to semantic tokens
2. Removes text size classes from semantic HTML
3. Converts inline spacing to Tailwind classes
4. Adds missing alt text placeholders
5. Adds missing ARIA labels

**Example:**
```bash
$ npm run fix:design-tokens

Scanning files...
Found 3 violations in src/app/components/MyComponent.tsx

Fixes applied:
- Line 23: #4a7311 → bg-primary
- Line 45: Removed text-2xl from <h2>
- Line 67: style="padding: 24px" → className="p-6"

✅ All fixes applied successfully!
```

---

## 📊 Compliance Monitoring

### Daily Compliance Check

**Location:** `/scripts/daily-compliance-check.sh`

**Setup (cron job):**
```bash
# Run every weekday at 9am
0 9 * * 1-5 cd /path/to/project && npm run compliance:check
```

**Output:**
```
Daily Compliance Report - December 28, 2024

Overall Compliance: 98% ✅

Breakdown:
- Font Sizes:   100% ✅ (0 violations)
- Colors:        95% ✅ (94 acceptable instances)
- Spacing:      100% ✅ (0 violations)
- Links:         98% ✅ (5 acceptable instances)
- Patterns:     100% ✅ (0 violations)
- Accessibility: 100% ✅ (WCAG AA)

New Issues Since Last Check: 0

✅ No action required. Maintaining excellent compliance!
```

---

## 🎓 Training Resources

### For New Developers

**Week 1: Onboarding**
1. Read MODERN-DESIGN-PRINCIPLES.md (1 hour)
2. Read WCAG-ACCESSIBILITY-STANDARDS.md (1.5 hours)
3. Review theme.css design tokens (30 min)
4. Complete design system quiz (30 min)

**Week 2: Practice**
1. Generate a component with CLI tool
2. Review existing compliant components
3. Modify an existing component (supervised)
4. Create a new component from scratch (supervised)

**Week 3: Independent Work**
1. Create components independently
2. Run validation tools before commits
3. Participate in code reviews
4. Help maintain compliance

### Code Review Checklist

**For Reviewers:**
- [ ] Run `npm run validate:design-tokens`
- [ ] Check design system compliance manually
- [ ] Verify accessibility (WCAG AA)
- [ ] Test in light and dark mode
- [ ] Test keyboard navigation
- [ ] Review for semantic HTML
- [ ] Check for hardcoded values
- [ ] Verify focus indicators

---

## 🚀 Future Enhancements

### Planned Tools

1. **Visual Regression Testing**
   - Automated screenshot comparisons
   - Detect unintended style changes
   - Catch design system drift

2. **Design Token Dashboard**
   - Visual reference for all tokens
   - Live preview of changes
   - Usage statistics

3. **AI-Powered Code Review**
   - Suggest design token replacements
   - Auto-fix common violations
   - Learn from past reviews

4. **Browser Extension**
   - Highlight design token usage
   - Show compliance score
   - Suggest improvements

---

## ✅ Success Metrics

**Goal:** Maintain 95%+ compliance

**Key Performance Indicators:**
- Design token usage: 95%+
- WCAG AA compliance: 100%
- New violations per month: < 5
- Time to fix violations: < 24 hours
- Developer onboarding time: < 1 week

**Current Status:**
- ✅ Design token usage: 98%
- ✅ WCAG AA compliance: 100%
- ✅ New violations: 0 (last 30 days)
- ✅ Average fix time: < 1 hour
- ✅ Onboarding time: 3 days

---

## 📞 Support

**Questions about design tokens?**
- Check `/src/styles/theme.css` for reference
- Review MODERN-DESIGN-PRINCIPLES.md
- Ask in team Slack channel
- Schedule pairing session

**Found a violation?**
- Run validation tools
- Check this guide for fixes
- Submit PR with fix
- Update documentation

---

**Document Version:** 1.0  
**Last Updated:** December 28, 2024  
**Next Review:** Monthly  
**Maintainer:** Development Team
