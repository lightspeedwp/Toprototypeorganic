# New Pattern — Scaffold a Block Pattern

**Type:** Implementation  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `new pattern`

---

## Prompt Purpose

**Objective:** Scaffold a new reusable block pattern component that maps to a WordPress block pattern. Patterns are section-level UI elements composed into page templates.

**When to Use:** When a new reusable section needs to be created (hero, CTA, feature grid, etc.).

---

## Input Required

The user must provide:
1. **Pattern name** — e.g., "PricingTable", "TeamGrid", "ProcessTimeline"
2. **Pattern category** — hero, cta, content, media, social-proof, navigation
3. **Props/data** — what data the pattern accepts
4. **WordPress mapping** — which WordPress block/pattern this maps to

---

## Workflow Steps

### Step 1: Read Guidelines

1. Read `/guidelines/patterns/pattern-catalog.md` for existing patterns (avoid duplicates).
2. Read `/guidelines/components/components-vs-patterns.md` for pattern vs component rules.
3. Read `/guidelines/build-rules.md` for composition and token rules.

### Step 2: Create Pattern Component

1. Create `/src/app/components/patterns/[PatternName].tsx`.
2. Define TypeScript interface with JSDoc documentation.
3. Use semantic HTML (`<section>`, `<article>`, etc.).
4. Accept data via props — no hardcoded content.
5. Keep under 300 lines — extract sub-components if needed.

### Step 3: Create Pattern CSS

1. Create `/src/styles/patterns/[pattern-name].css`.
2. Use `.wp-*` prefixed class names.
3. All values via CSS variables — zero hardcoded values.
4. Include responsive breakpoints for mobile/tablet/desktop.
5. Include `@media (prefers-reduced-motion: reduce)` for animations.

### Step 4: Design System Compliance

All generated code must:
- Use `var(--font-primary)` / `var(--font-secondary)` for fonts
- Use `var(--spacing-*)` for all spacing
- Use semantic color variables for all colors
- Use `.wp-*` classes — no Tailwind
- Use `@phosphor-icons/react` for icons
- Include ARIA labels and keyboard support

### Step 5: Register and Document

1. Add CSS import to `/src/styles/index.css`.
2. Export from pattern index if one exists.
3. Add to `/guidelines/patterns/pattern-catalog.md`.
4. Add CHANGELOG entry under `[Unreleased]` → Added.

---

## Success Criteria

- [ ] Pattern component created with TypeScript interface
- [ ] CSS file created with `.wp-*` classes and CSS variables
- [ ] Responsive breakpoints included
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard support
- [ ] Reduced motion support for animations
- [ ] Pattern catalog updated
- [ ] CHANGELOG updated
