# New Template — Scaffold a Page Template

**Type:** Implementation  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `new template`

---

## Prompt Purpose

**Objective:** Scaffold a new page template following the LSX Design pattern composition architecture. The template is composed entirely from registered patterns and uses 100% CSS variables.

**When to Use:** When a new page needs to be added to the site.

---

## Input Required

The user must provide:
1. **Page name** — e.g., "Case Studies", "Pricing", "Careers"
2. **Page type** — Service, About, Archive, Landing, Utility, System (see `/guidelines/templates/page-archetypes.md`)
3. **Patterns to include** — e.g., Hero, Features, FAQ, CTA (see `/guidelines/patterns/pattern-catalog.md`)

---

## Workflow Steps

### Step 1: Read Guidelines

1. Read `/guidelines/templates/page-archetypes.md` for the appropriate archetype.
2. Read `/guidelines/patterns/pattern-catalog.md` for available patterns.
3. Read `/guidelines/components/components-vs-patterns.md` for composition rules.
4. Read the relevant CSS base file (e.g., `service-base.css`, `about-base.css`).

### Step 2: Create Template File

1. Create `/src/app/components/templates/[PageName]Template.tsx`.
2. Compose from registered patterns only — no bespoke sections.
3. Use the appropriate CSS base (service, about, archive, etc.).

### Step 3: Create CSS File

1. Create `/src/styles/templates/[page-name].css`.
2. Import the relevant base CSS file.
3. Add only unique overrides — shared styles come from the base.
4. All values must use CSS variables — zero hardcoded values.

### Step 4: Design System Compliance

All generated code must:
- Use `var(--font-primary)` / `var(--font-secondary)` for fonts
- Use `var(--spacing-*)` for all spacing
- Use semantic color variables for all colors
- Use `.wp-*` classes for layout utilities
- Use `@phosphor-icons/react` for icons
- Use `react-router` for navigation (never `react-router-dom`)

### Step 5: Register Route

1. Add the route to the appropriate file in `/src/app/routes/`.
2. Add the CSS import to `/src/styles/index.css`.

### Step 6: Update Tracking

1. Add CHANGELOG entry under `[Unreleased]` → Added.
2. Update `/tasks/task-list.md` if this was a tracked task.

---

## Success Criteria

- [ ] Template file created in `/src/app/components/templates/`
- [ ] CSS file created with base import + unique overrides only
- [ ] Route registered
- [ ] CSS imported in `index.css`
- [ ] 100% CSS variable compliance
- [ ] Composed from registered patterns only
- [ ] CHANGELOG updated
