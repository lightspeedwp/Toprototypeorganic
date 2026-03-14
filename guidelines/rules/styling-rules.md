# Styling Rules

**Category:** Rules — Design System Enforcement
**Last Updated:** March 13, 2026
**Status:** Active — Zero Tolerance

---

## Core Principle

**ALL styling must use CSS custom properties from `/src/styles/theme-base.css`, `/src/styles/theme-light.css`, and `/src/styles/theme-dark.css`.** No exceptions for production components.

---

## The 7 Non-Negotiable Rules

### 1. CSS Variables Only
- **NEVER** hardcode colors: ❌ `#548235`, `rgb(...)`, `rgba(...)`
- **ALWAYS** use tokens: ✅ `var(--primary)`, `var(--foreground)`, `var(--accent)`

### 2. Approved Fonts Only (5 Total)
| Font | Variable | Usage |
|------|----------|-------|
| Lora | `var(--font-family-lora)` | Headings (H1-H6), editorial content |
| Noto Sans | `var(--font-family-noto-sans)` | Body text, UI elements, buttons |
| Courier New | `var(--font-family-mono)` | Code blocks, technical content |
| Caveat | `var(--font-family-caveat)` | Accent text, organic flourishes |
| Shadows Into Light | `var(--font-family-shadows)` | Alternative accent text |

**NO OTHER FONTS ARE ALLOWED.**

### 3. External CSS with BEM Naming
- All styling in external `.css` files
- BEM convention: `.wp-part-*`, `.wp-pattern-*`, `.wp-card-*`
- Never create styles inline in JSX

### 4. Zero Inline Styles
**PROHIBITED** for all production components:
```tsx
// ❌ NEVER
<div style={{ backgroundColor: 'white', color: 'green' }}>
```

**Exemptions:**
- `motion/react` style prop for dynamic animation values
- Dynamic CSS Custom Properties: `style={{ '--dynamic-color': color } as React.CSSProperties}`

### 5. Zero `dark:` Classes
CSS variables handle dark mode automatically. Never use Tailwind dark mode classes:
```tsx
// ❌ NEVER
<div className="dark:bg-slate-800 dark:text-white">

// ✅ CORRECT
<div className="bg-background text-foreground">
```

### 6. Zero Margin Policy
ALL elements must rely on flex/grid gaps or specific padding:
```tsx
// ❌ NEVER
<div className="mb-4 mt-8 mx-auto">

// ✅ CORRECT — use gap on parent
<div className="flex flex-col gap-4">
```

### 7. Semantic HTML
Use proper HTML elements, not styled divs:
```tsx
// ❌ NEVER
<div className="heading">Title</div>

// ✅ CORRECT
<h2>Title</h2>  // Gets Lora, 32px, 600 automatically from theme.css
```

---

## Typography Rules

**Do NOT use Tailwind typography classes unless explicitly overriding defaults.**

Semantic HTML elements inherit styling from `theme.css @layer base`:
- `<h1>` → `var(--text-6xl)`, Lora, Bold (700)
- `<h2>` → `var(--text-4xl)`, Lora, Semibold (600)
- `<h3>` → `var(--text-3xl)`, Lora, Semibold (600)
- `<h4>` → `var(--text-2xl)`, Lora, Medium (500)
- `<h5>` → `var(--text-xl)`, Lora, Medium (500)
- `<h6>` → `var(--text-lg)`, Lora, Medium (500)
- `<p>` → `var(--text-base)`, Noto Sans, Normal (400)

**Exception:** Use Tailwind text classes only when intentionally deviating (small print, card metadata, feature stats).

---

## Correct Patterns

```tsx
// ✅ Button with design tokens
<button className="bg-primary text-primary-foreground rounded-md">
  Click me
</button>

// ✅ Card with semantic tokens
<article className="bg-card text-card-foreground border border-border rounded-lg">
  <h3>Card Title</h3>
  <p>Card description</p>
</article>
```

---

## Enforcement

- **Automated:** Compliance Scorecard runs in dev mode (browser console)
- **Manual:** Code review against this checklist before merge
- **Audit:** `/prompts/design-system-contract-audit.md`

---

## Related Guidelines

| Guideline | Content |
|-----------|---------|
| `/guidelines/design-tokens/colors.md` | Full color token reference |
| `/guidelines/design-tokens/typography.md` | Typography scale and weights |
| `/guidelines/design-tokens/spacing.md` | Spacing scale |
| `/guidelines/DESIGN-SYSTEM-ENFORCEMENT.md` | Enforcement tools and utilities |
| `/guidelines/WCAG-ACCESSIBILITY-STANDARDS.md` | Accessibility requirements |
