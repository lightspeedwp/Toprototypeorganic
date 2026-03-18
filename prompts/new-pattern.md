# New Pattern — Scaffold a Block Pattern

**Type:** Implementation  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `new pattern`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Scaffold a new reusable block pattern component that maps to a WordPress block pattern. Patterns are section-level UI elements composed into page templates (hero, CTA, card grid, FAQ section, etc.).

**When to Use:** When a new reusable section needs to be created for use in page templates.

---

## Input Required

The user must provide:
1. **Pattern name** — e.g., "PricingTable", "TeamGrid", "ProcessTimeline"
2. **Pattern category** — hero, cta, content, media, social-proof, navigation, filter
3. **Props/data** — what data the pattern accepts (from `/src/app/data/`)
4. **WordPress mapping** — which WordPress block pattern this maps to

---

## Workflow Steps

### Step 1: Read Guidelines

1. Read `/guidelines/patterns/` for existing patterns (avoid duplicates).
2. Read `/guidelines/blocks/overview-blocks.md` for available blocks to compose from.
3. Read relevant pattern guidelines (e.g., `hero-patterns.md`, `card-grid-patterns.md`, `cta-patterns.md`).

### Step 2: Create Pattern Component

1. Create `/src/app/components/patterns/[PatternName].tsx`.
2. Define TypeScript interface with JSDoc documentation.
3. Use semantic HTML (`<section>`, `<article>`, `<aside>`, etc.).
4. Accept data via props — import from `/src/app/data/`, never hardcode content.
5. Keep under 300 lines — extract sub-components if needed.
6. Follow the appropriate page archetype pattern order.

### Step 3: Create Pattern CSS

1. Create `/src/styles/patterns/[pattern-name].css`.
2. Use BEM class naming: `.wp-pattern-[name]`, `.wp-pattern-[name]__element`.
3. All values via CSS variables — zero hardcoded values.
4. Include responsive breakpoints for mobile/tablet/desktop.
5. Include `@media (prefers-reduced-motion: reduce)` for any animations.
6. Zero Margin Policy — use flex/grid gaps only.

### Step 4: Design System Compliance

All generated code must:
- Use `var(--font-family-lora)` for headings
- Use `var(--font-family-noto-sans)` for body text
- Use `var(--font-family-caveat)` for accent text (sparingly)
- Use `var(--spacing-*)` for all spacing
- Use semantic color variables for all colors
- Use BEM classes — no Tailwind utilities
- Use `lucide-react` for icons
- Include ARIA labels and keyboard support
- Support light/dark mode via CSS variables

### Step 5: Register and Document

1. Add CSS import to `/src/styles/index.css` under the patterns section.
2. Add CHANGELOG entry under `[Unreleased]` -> Added.
3. If this was a tracked task, update `/tasks/task-list.md`.

---

## Success Criteria

- [ ] Pattern component created with TypeScript interface
- [ ] CSS file created with BEM classes and CSS variables
- [ ] Responsive breakpoints included
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard support
- [ ] Reduced motion support for animations
- [ ] Only approved fonts used (5 font variables)
- [ ] Zero Margin Policy followed
- [ ] CSS registered in `index.css`
- [ ] CHANGELOG updated
