# New Block — Scaffold an Atomic Block Component

**Type:** Implementation  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `new block`

---

## Prompt Purpose

**Objective:** Scaffold a new atomic block component that maps to a WordPress core or custom block. Blocks are the smallest reusable UI elements (buttons, cards, badges, inputs) — smaller than patterns but larger than raw HTML elements.

**When to Use:** When a new atomic-level UI component is needed that maps to a WordPress block.

---

## Input Required

The user must provide:
1. **Block name** — e.g., "Button", "Card", "Badge", "Input", "Avatar"
2. **Block category** — `design` (visual) or `theme` (structural)
3. **WordPress block mapping** — which core/custom block this represents
4. **Variants** — size/style variants needed (e.g., primary, outline, ghost)

---

## Workflow Steps

### Step 1: Read Guidelines

1. Read `/guidelines/components/components-vs-patterns.md` — confirm this is a block, not a pattern.
2. Read `/guidelines/blocks/overview-blocks.md` (if exists) for existing blocks.
3. Read `/guidelines/design-tokens/` for available tokens.

### Step 2: Determine Block vs Pattern

A **block** is:
- A single atomic UI element (button, card, badge, input)
- Used INSIDE patterns — never standalone on a page
- Maps to a single WordPress block

A **pattern** is:
- A section-level composition of blocks (hero, CTA section, pricing table)
- Used directly in page templates
- Maps to a WordPress block pattern

If the request is actually a pattern, redirect to `/prompts/new-pattern.md`.

### Step 3: Create Block Component

1. Create `/src/app/components/blocks/[category]/[BlockName].tsx`.
2. Define TypeScript interface with JSDoc and all variant props.
3. Use semantic HTML elements (`<button>`, `<a>`, `<input>`, etc.).
4. Support all specified variants via a `variant` prop.
5. Keep under 200 lines — blocks should be simple.

### Step 4: Design System Compliance

All generated code must:
- Use `var(--font-primary)` for typography
- Use `var(--spacing-*)` for padding/margin
- Use semantic color variables for theming
- Use `var(--radius*)` for border radius
- Support keyboard navigation and focus states
- Include `aria-label` for icon-only variants
- Meet 44x44px minimum touch target

### Step 5: Create Block CSS

1. Create `/src/styles/blocks/[block-name].css` (if needed).
2. Use `.wp-block-[name]` class naming to match WordPress convention.
3. All values via CSS variables.
4. Include hover, focus, active, and disabled states.

### Step 6: Register and Document

1. Add CSS import to `/src/styles/index.css`.
2. Export from block index if one exists.
3. Add CHANGELOG entry under `[Unreleased]` → Added.

---

## Success Criteria

- [ ] Block component created with TypeScript interface
- [ ] All variants implemented
- [ ] WordPress block naming convention used (`.wp-block-*`)
- [ ] 100% CSS variable compliance
- [ ] Keyboard accessible with visible focus states
- [ ] Touch target meets 44x44px minimum
- [ ] Under 200 lines
- [ ] CHANGELOG updated
