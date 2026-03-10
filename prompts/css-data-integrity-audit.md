# Prompt: Systematic Codebase Audit - CSS Architecture & Data Integrity

**Project:** LightSpeed Tour Operator WordPress Plugin Prototype  
**Stack:** React + Tailwind CSS v4 + CSS Custom Properties  
**Architecture:** WordPress block theme mapping with atomic CSS per tour-operator block

---

## Context

This project uses a layered CSS architecture:

1. **Tailwind CSS v4** (`tailwind.css`) - Utility-first framework with `@theme inline` integration
2. **Theme tokens** (`theme.css` + `theme-light.css` + `theme-dark.css`) - CSS custom properties for colors, typography, spacing
3. **Global styles** (`global.css`) - WordPress-aligned semantic HTML rules + utility classes
4. **Section presets** (`sections.css`) - 22 section background/layout presets
5. **Component CSS** (`blocks/tour-operator/*.css`) - Atomic CSS per tour-operator block
6. **Fluid utilities** (`theme.css`) - `.py-section-sm/md/lg/xl`, `.text-fluid-*` classes

Content has been refactored from hardcoded templates into dedicated data files in `/src/app/data/`. Two barrel export files exist: `data/mock.ts` (legacy) and `data/index.ts` (canonical).

---

## Audit Scope

Perform a deep-scan audit of the `/src/` directory. Do NOT attempt to fix style preferences (colors, fonts). Focus strictly on **architecture**, **build stability**, and **loading order**.

---

## Phase 1: CSS Import & Cascade Analysis

### 1.1 Analyze the CSS entry point (`/src/styles/index.css`)

- Check the `@import` order. Verify that:
  - Font faces load first
  - Tailwind preflight/utilities load before custom CSS
  - Theme variables load before consumers
  - Component styles load after base styles
  - Print styles load last
- Check for files that are imported both at the root level AND at the component level (causes duplication)

### 1.2 Component-to-CSS Mapping

- Scan all components in:
  - `/src/app/components/patterns/`
  - `/src/app/components/blocks/`
  - `/src/app/components/parts/`
  - `/src/app/components/common/`
  - `/src/app/templates/`
- Verify that components using dedicated CSS files explicitly import them
- Flag: CSS files in `/src/styles/` that are never imported by any `.tsx` or `.css` file
- Flag: Components that rely on global scope for styles that should be explicit imports

### 1.3 Specificity & Class Name Conflicts

- Identify CSS files using `!important` to force overrides
- Identify class names in `global.css` that shadow Tailwind utility classes (e.g., `.grid`, `.flex`, `.hidden`, `.card`, `.p-4`)
- Check for generic class names (`.card`, `.button`, `.grid`) defined in multiple CSS files
- Verify that `global.css` utility classes don't add unexpected properties that Tailwind's versions don't (e.g., `.grid { gap: ... }`)

### 1.4 Storybook/Preview CSS Loading

- Check `preview.tsx` for double-imports (individual files + index.css)
- Verify CSS load order matches production

---

## Phase 2: Data Layer Verification

### 2.1 Import/Export Mismatches

- Scan ALL files importing from `/src/app/data/`
- For each import, verify the named export exists in the target file
- Check for:
  - Named vs default export mismatches
  - Renamed exports that may have stale import names (e.g., `POSTS` vs `BLOG_POSTS`)
  - Barrel files (`mock.ts`, `index.ts`) that re-export but may miss some names

### 2.2 Path Resolution

- Verify all relative import paths point to existing files
- Check for imports using `@/` aliases (prohibited in this project)
- Check for absolute paths (prohibited in this project)

### 2.3 Type Safety

- Verify components import TypeScript interfaces from `data/types.ts`
- Flag any use of `any` type for data objects

### 2.4 Circular Dependencies

- Trace the import graph for all files in `/src/app/data/`
- Verify no circular chains exist (e.g., mock.ts -> index.ts -> mock.ts)
- Check if `generators.ts` imports from barrel files (it shouldn't)

---

## Phase 3: Dead Code & Zombie Imports

### 3.1 Unused CSS

- List CSS classes defined in `global.css` that are never referenced in any `.tsx` file's `className`
- List static spacing utilities (`.py-12`, `.py-16`) that have been superseded by fluid tokens
- Check for `global.css` responsive utilities (`.md\:grid--cols-*`) — these use BEM naming and won't match Tailwind's responsive syntax

### 3.2 Unused Data Imports

- Flag files that import data constants but never reference them in render output

### 3.3 Legacy Artifacts

- Flag any remaining static Tailwind spacing classes (`py-12`, `py-16`, `py-20`, `py-24`, `py-32`) in `className` props that should use fluid `py-section-*` tokens

---

## Output Format

Present findings as a Markdown report titled `AUDIT_REPORT_V6.md` with these sections:

### CRITICAL ERRORS (Build Blockers)
Broken imports, missing exports, syntax errors, circular dependencies.

### LOADING ORDER RISKS
Duplicate CSS imports, cascade conflicts, specificity issues.

### ARCHITECTURE VIOLATIONS
Components missing atomic CSS, classes shadowing Tailwind, dual barrel exports.

### REMEDIATION PLAN
Step-by-step list of exactly which files to edit, what to change, and in what order. Include risk assessment for each change.

---

## Key Files to Inspect

| File | Purpose |
|---|---|
| `/src/styles/index.css` | CSS entry point |
| `/src/styles/global.css` | WordPress-aligned global styles |
| `/src/styles/theme.css` | Theme token integration |
| `/src/styles/sections.css` | Section presets |
| `/src/app/App.tsx` | Application entry |
| `/src/app/routes.ts` | Route configuration |
| `/src/app/data/index.ts` | Data barrel export |
| `/src/app/data/mock.ts` | Legacy data barrel |
| `/src/app/data/mockExpanded.ts` | Expanded datasets |
| `/src/app/data/types.ts` | TypeScript interfaces |
| `/preview.tsx` | Storybook preview config |
