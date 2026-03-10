# Audit: Inline Styles, Broken Links & Broken Images

**Created:** March 3, 2026  
**Category:** Quality Assurance & CSS Architecture Compliance  
**Purpose:** Eliminate inline `style={{ }}` attributes and fix broken assets/links.

---

## Objective

Conduct a comprehensive audit of the entire codebase to:
1. **Identify and Remove** all React components using inline `style={{ }}` attributes (excluding motion/react and dynamic CSS vars).
2. **Detect and Fix** all broken links (404s, missing routes, empty `href="#"` without purpose).
3. **Detect and Fix** all broken image URLs (placeholder images, missing figma:assets, or 404 external URLs).
4. **Align** styling with the LSX Design System using WordPress-native BEM classes and theme.json variables.

---

## Context

### Design System Requirements
- ✅ **CSS Variables:** Use `--wp--preset--color--*`, `--wp--preset--spacing--*`, etc.
- ✅ **BEM Naming:** Use `.wp-block-lts-*` or `.wp-pattern-lts-*` conventions.
- ✅ **Utility Classes:** Use `has-*` or `is-*` classes from `wordpress-classes.css`.
- ❌ **NO Inline Styles:** `style={{ ... }}` is prohibited for static design.
- ❌ **NO Hardcoded Assets:** All images should use `ImageWithFallback` or valid `figma:asset` imports.

---

## Audit Scope

### Files to Audit
- `/src/app/components/` (excluding `ui/` and `figma/`)
- `/src/app/pages/`
- `/src/app/templates/`

### Search Patterns

#### 1. Inline Styles
- `style={{`
- `style = {{`

#### 2. Broken Links
- `href="#"` (unless strictly used for top-of-page or specific JS trigger)
- `to="#"`
- Links pointing to routes that don't exist in `routes.ts`
- `href=""` or `to=""`

#### 3. Broken Images
- `src=""`
- `src={""}`
- Image tags without `alt` text (accessibility violation)
- `unsplash` URLs that might be placeholders (e.g., `unsplash.com/photo-123?w=200`) - verify if they should be replaced with real content.

---

## Categorization & Fix Strategy

### 1. **Inline Styles**
- **Fix:** Move styles to component-specific `.css` files or use `has-*` utility classes.
- **Exception:** Keep `motion/react` animation styles or dynamic CSS custom properties (e.g., `--dynamic-progress`).

### 2. **Broken Links**
- **Fix:** Update to valid internal routes using `Link` component or external URLs.
- **Empty Links:** If a link is just a placeholder, convert to a `button` or remove if redundant.

### 3. **Broken Images**
- **Fix:** Replace missing images with valid `unsplash_tool` results or `figma:asset` references.
- **Alt Text:** Add descriptive `alt` text to all `<img>` or `ImageWithFallback` components.

---

## Audit Process

### Step 1: Inventory
Scan for violations and document in a table:

| File | Line | Type | Finding | Proposed Fix |
|------|------|------|---------|--------------|
| `Hero.tsx` | 45 | Style | `backgroundColor: '#4A7A18'` | Replace with `has-primary-background-color` |
| `Footer.tsx`| 120 | Link | `href="#"` | Link to `/contact` |
| `Card.tsx` | 88 | Image | `src=""` | Use `unsplash_tool` for travel image |

### Step 2: Migration
Execute fixes in batches:
1. P0: Hardcoded styles and broken links.
2. P1: Missing images and alt text.
3. P2: Optimization of utility classes.

---

## Verification
- [ ] No `style={{ }}` in production components (grep check).
- [ ] No `href="#"` without justification.
- [ ] All images load correctly in light/dark mode.
- [ ] All links navigate to existing pages or valid external sites.

---

**End of Prompt**
