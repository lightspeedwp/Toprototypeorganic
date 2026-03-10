# Audit & Remove Inline Styles Prompt

**Created:** March 3, 2026  
**Category:** CSS Architecture Compliance  
**Purpose:** Eliminate all inline `style={{ }}` attributes and replace with WordPress theme.json aligned CSS classes

---

## Objective

Conduct a comprehensive audit of the entire codebase to:
1. **Identify** all React components using inline `style={{ }}` attributes
2. **Categorize** inline styles by type (colors, spacing, typography, layout, transforms, etc.)
3. **Create** appropriate CSS classes in existing stylesheets following BEM and WordPress conventions
4. **Replace** inline styles with CSS class names
5. **Verify** no visual regressions after migration

---

## Context

### Current State
- The codebase has inline styles scattered throughout components
- These inline styles bypass the design system
- Inline styles prevent global updates via CSS files
- Not aligned with WordPress theme.json methodology

### Desired State
- **Zero inline styles** in all `.tsx` components
- All styling defined in `/src/styles/` CSS files
- WordPress `wp-*` utility classes or BEM component classes only
- CSS custom properties (`var(--*)`) for all values
- Users can update styling by editing CSS files only

### Design System Requirements
- ✅ WordPress theme.json aligned CSS variables (e.g., `var(--wp--preset--color--primary)`)
- ✅ BEM naming convention (`.block__element--modifier`)
- ✅ `wp-*` utility classes from `/src/styles/utilities.css`
- ✅ Component-specific classes in `/src/styles/blocks/`
- ❌ NO inline `style={{ }}` attributes
- ❌ NO Tailwind utility classes in JSX
- ❌ NO hardcoded values (colors, spacing, fonts, etc.)

---

## Audit Scope

### Files to Audit

**Production Components:**
```
/src/app/components/
├── blocks/          # WordPress block components
├── common/          # Shared utility components
├── parts/           # Template parts (Header, Footer)
├── patterns/        # Reusable block patterns
└── ui/              # shadcn/ui library (EXEMPT - external library)
```

**Pages:**
```
/src/app/pages/      # All page templates
```

**Exemptions:**
- `/src/app/components/ui/` - shadcn/ui library components (external, DO NOT modify)
- `/src/app/components/figma/` - Figma-specific utilities (protected)
- CSS-in-JS libraries (motion/react `style` prop for animations is acceptable)

### Search Pattern

Search for all instances of:
- `style={{`
- `style = {{`
- `style={`

---

## Categorization Matrix

For each inline style found, categorize by type:

### 1. **Colors**
**Examples:**
```tsx
// ❌ Inline
style={{ backgroundColor: '#4A7A18' }}
style={{ color: 'rgba(255, 255, 255, 0.9)' }}

// ✅ CSS Class
className="wp-block-section--primary-bg"
// CSS: background-color: var(--wp--preset--color--primary);
```

### 2. **Spacing (Padding/Margin)**
**Examples:**
```tsx
// ❌ Inline
style={{ padding: '24px' }}
style={{ marginBottom: '48px' }}

// ✅ CSS Class
className="wp-p-50"
className="wp-mb-60"
// Or BEM: className="card__content"
// CSS: padding: var(--wp--preset--spacing--50);
```

### 3. **Typography**
**Examples:**
```tsx
// ❌ Inline
style={{ fontSize: '24px', fontWeight: 600 }}

// ✅ CSS Class + Semantic HTML
<h3 className="card__title">Title</h3>
// CSS: font-size: var(--wp--preset--font-size--500);
//      font-weight: var(--font-weight-semibold);
```

### 4. **Layout (Flexbox/Grid)**
**Examples:**
```tsx
// ❌ Inline
style={{ display: 'flex', gap: '16px', alignItems: 'center' }}

// ✅ CSS Class
className="wp-flex wp-items-center wp-gap-40"
// Or BEM: className="navigation__list"
// CSS: display: flex; align-items: center; gap: var(--wp--preset--spacing--40);
```

### 5. **Borders & Radius**
**Examples:**
```tsx
// ❌ Inline
style={{ borderRadius: '8px', border: '1px solid #ccc' }}

// ✅ CSS Class
className="card--rounded"
// CSS: border-radius: var(--radius-lg);
//      border: 1px solid var(--border);
```

### 6. **Transforms & Positioning**
**Examples:**
```tsx
// ❌ Inline
style={{ transform: 'translateY(-50%)' }}
style={{ position: 'absolute', top: '50%', right: '12px' }}

// ✅ CSS Class
className="search-bar__submit"
// CSS: position: absolute; top: 50%; right: var(--wp--preset--spacing--30);
//      transform: translateY(-50%);
```

### 7. **CSS Custom Properties (Dynamic Values)**
**Examples:**
```tsx
// ✅ ACCEPTABLE - Dynamic CSS variables
style={{ 
  '--vibe-overlay': palette.overlay,
  '--vibe-accent-rgb': palette.accentRgb
} as React.CSSProperties}

// Used in CSS:
// background: var(--vibe-overlay);
```

**Note:** Dynamic CSS custom properties are acceptable when values change based on state/props.

### 8. **Motion/Animation (motion/react)**
**Examples:**
```tsx
// ✅ ACCEPTABLE - motion/react style prop for animations
<motion.div style={{ y: bgY }}>
  {/* Parallax effect */}
</motion.div>
```

**Note:** motion/react `style` prop is acceptable for animation values.

---

## Audit Process

### Step 1: Search & Inventory

Run file search for all `style={{` instances:
```bash
# Find all inline styles (excluding ui/ and figma/)
grep -rn "style={{" /src/app/components/ \
  --include="*.tsx" \
  --exclude-dir="ui" \
  --exclude-dir="figma"

grep -rn "style={{" /src/app/pages/ --include="*.tsx"
```

### Step 2: Document Findings

Create an inventory table:

| File | Line | Component | Style Type | Current Inline Style | Proposed CSS Class | CSS File Location |
|------|------|-----------|------------|---------------------|-------------------|------------------|
| `/src/app/components/patterns/Hero.tsx` | 45 | Hero | Colors | `backgroundColor: '#4A7A18'` | `hero--primary-bg` | `/src/styles/blocks/design/hero.css` |
| ... | ... | ... | ... | ... | ... | ... |

### Step 3: Categorize by Priority

**P0 - Critical (Design System Violations):**
- Hardcoded colors (hex, rgb values)
- Hardcoded spacing (px, rem values)
- Hardcoded typography (font sizes, weights)

**P1 - High (Maintainability):**
- Layout styles (flexbox, grid)
- Borders and radius
- Transforms and positioning

**P2 - Medium (Acceptable Patterns):**
- Dynamic CSS custom properties (keep as-is)
- motion/react style props (keep as-is)

### Step 4: Create Migration Plan

For each P0/P1 inline style:
1. Determine appropriate CSS file location:
   - Component-specific: `/src/styles/blocks/design/{component}.css`
   - Pattern-specific: `/src/styles/blocks/{pattern}.css`
   - Utility: `/src/styles/utilities.css` (if reusable)
2. Create BEM class name or use existing `wp-*` utility
3. Add CSS rule with design system variables
4. Replace inline style with className

---

## Replacement Guidelines

### Rule 1: Use Existing wp-* Utilities First

Check `/src/styles/utilities.css` for existing classes:
- Layout: `wp-flex`, `wp-grid`, `wp-block`, `wp-inline-block`
- Spacing: `wp-p-{scale}`, `wp-m-{scale}`, `wp-gap-{scale}`
- Typography: `wp-text-{size}`, `wp-font-{weight}`
- Colors: `wp-bg-{color}`, `wp-text-{color}`

### Rule 2: Create BEM Classes for Component-Specific Styles

```css
/* /src/styles/blocks/design/hero.css */
.hero__content {
  padding: var(--wp--preset--spacing--60);
  background-color: var(--wp--preset--color--primary);
}

.hero__title {
  font-size: var(--wp--preset--font-size--800);
  font-weight: var(--font-weight-bold);
  color: var(--wp--preset--color--foreground);
}
```

### Rule 3: Always Use CSS Variables

**Never hardcode values:**
```css
/* ❌ Hardcoded */
.hero { padding: 48px; color: #4A7A18; }

/* ✅ Design System Variables */
.hero { 
  padding: var(--wp--preset--spacing--60); 
  color: var(--wp--preset--color--primary); 
}
```

### Rule 4: WordPress theme.json Alignment

Use WordPress preset naming:
- Colors: `--wp--preset--color--{name}`
- Spacing: `--wp--preset--spacing--{scale}`
- Font sizes: `--wp--preset--font-size--{scale}`
- Font families: `--wp--preset--font-family--{name}`

### Rule 5: Preserve Dynamic CSS Custom Properties

**Keep these inline styles:**
```tsx
// ✅ Dynamic values - ACCEPTABLE
style={{ 
  '--dynamic-color': computedColor,
  '--animation-duration': `${duration}ms`
} as React.CSSProperties}
```

Then reference in CSS:
```css
.component {
  background-color: var(--dynamic-color);
  animation-duration: var(--animation-duration);
}
```

### Rule 6: Preserve motion/react Animations

**Keep these inline styles:**
```tsx
// ✅ motion/react animations - ACCEPTABLE
<motion.div style={{ y: scrollY, opacity: fadeValue }}>
```

---

## Migration Example

### Before (Inline Styles)

```tsx
// ❌ Multiple inline style violations
export function SearchBar() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px',
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <input 
        style={{ 
          fontSize: '16px',
          color: '#333',
          border: 'none'
        }}
        placeholder="Search..."
      />
      <button style={{ 
        backgroundColor: '#4A7A18',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '4px'
      }}>
        Search
      </button>
    </div>
  );
}
```

### After (CSS Classes)

**Component:**
```tsx
// ✅ All styling via CSS classes
export function SearchBar() {
  return (
    <div className="search-bar">
      <input 
        className="search-bar__input"
        placeholder="Search..."
      />
      <button className="search-bar__submit wp-button wp-button--primary">
        Search
      </button>
    </div>
  );
}
```

**CSS File:** `/src/styles/blocks/design/search-bar.css`
```css
/* Search Bar Component */
.search-bar {
  display: flex;
  align-items: center;
  gap: var(--wp--preset--spacing--40);
  padding: var(--wp--preset--spacing--50);
  background-color: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-sm);
}

.search-bar__input {
  flex: 1;
  font-size: var(--wp--preset--font-size--200);
  color: var(--foreground);
  border: none;
  background: transparent;
}

.search-bar__input::placeholder {
  color: var(--muted-foreground);
}

.search-bar__submit {
  background-color: var(--wp--preset--color--primary);
  color: var(--wp--preset--color--primary-foreground);
  padding: var(--wp--preset--spacing--30) var(--wp--preset--spacing--50);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
}

.search-bar__submit:hover {
  background-color: var(--primary-hover);
}
```

---

## Verification Checklist

After migration, verify:

- [ ] All inline `style={{ }}` removed (except dynamic CSS vars and motion/react)
- [ ] All components render identically (no visual regressions)
- [ ] Dark mode still works correctly
- [ ] Responsive breakpoints still work
- [ ] Hover/focus states preserved
- [ ] No hardcoded colors, spacing, or typography
- [ ] All CSS files use design system variables
- [ ] BEM naming conventions followed
- [ ] WordPress theme.json alignment maintained

---

## Output Format

### Audit Report Structure

Save to: `/reports/YYYY-MM-DD-inline-styles-audit-report.md`

**Include:**
1. **Executive Summary**
   - Total inline styles found
   - Breakdown by category (P0/P1/P2)
   - Files affected count
   - Estimated effort

2. **Detailed Findings**
   - Full inventory table
   - Priority categorization
   - Violation examples

3. **Migration Plan**
   - Phase 1: P0 critical violations
   - Phase 2: P1 high priority
   - Phase 3: Documentation & verification

4. **CSS Architecture Changes**
   - New CSS files created
   - New BEM classes added
   - New CSS variables needed

5. **Recommendations**
   - Linting rules to prevent future inline styles
   - Documentation updates
   - Team training needs

### Task List

Save to: `/tasks/inline-styles-removal-tasks.md`

**Include:**
- [ ] Task 1: Audit /src/app/components/patterns/ (15 files)
- [ ] Task 2: Audit /src/app/components/blocks/ (30 files)
- [ ] Task 3: Create CSS classes for P0 violations
- [ ] Task 4: Migrate P0 inline styles to CSS
- [ ] Task 5: Create CSS classes for P1 violations
- [ ] Task 6: Migrate P1 inline styles to CSS
- [ ] Task 7: Visual regression testing
- [ ] Task 8: Dark mode verification
- [ ] Task 9: Update component guidelines
- [ ] Task 10: Add ESLint rule to prevent inline styles

---

## Success Criteria

✅ **Complete when:**
1. Zero P0/P1 inline styles remain in codebase
2. All styling controlled via CSS files
3. 100% design system variable usage
4. No visual regressions
5. Dark/light modes work correctly
6. All components pass accessibility audit
7. Documentation updated

---

## References

**Guidelines:**
- `/guidelines/MANDATORY-CSS-VARIABLES-ONLY.md` - CSS variable enforcement
- `/guidelines/design-tokens/colors.md` - Color system
- `/guidelines/design-tokens/spacing.md` - Spacing scale
- `/guidelines/design-tokens/typography.md` - Typography system
- `/guidelines/styles/wordpress-block-styling.md` - WordPress block classes

**CSS Files:**
- `/src/styles/utilities.css` - WordPress utility classes
- `/src/styles/blocks/` - Component-specific styles
- `/src/styles/theme.css` - Design system variables

**Tools:**
- `grep -rn "style={{" /src/app/` - Find inline styles
- Browser DevTools - Visual regression testing
- `/src/app/utils/complianceScorecard.ts` - Automated compliance checks

---

## Notes

**Dynamic Values Exception:**
When component styling depends on state/props, use CSS custom properties:

```tsx
// ✅ CORRECT: Dynamic CSS variables
<div 
  className="adaptive-component"
  style={{ 
    '--computed-color': userSelectedColor,
    '--dynamic-height': `${height}px`
  } as React.CSSProperties}
/>
```

```css
.adaptive-component {
  background-color: var(--computed-color);
  height: var(--dynamic-height);
}
```

**Motion Animation Exception:**
motion/react requires inline `style` for animated values:

```tsx
// ✅ CORRECT: motion/react animation
<motion.div style={{ y: scrollY, opacity: fadeIn }}>
```

---

**End of Prompt**
