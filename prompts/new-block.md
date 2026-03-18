# New Block — Scaffold an Atomic Block Component

**Type:** Implementation  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `new block`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

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

1. Read `/guidelines/blocks/overview-blocks.md` for existing blocks.
2. Read `/guidelines/design-tokens/` for available tokens.
3. Confirm this is a block (atomic element), not a pattern (section-level composition). If pattern, redirect to `new pattern`.

### Step 2: Create Block Component

1. Create `/src/app/components/blocks/[category]/[BlockName].tsx`.
2. Define TypeScript interface with JSDoc and all variant props.
3. Use semantic HTML elements (`<button>`, `<a>`, `<input>`, etc.).
4. Support all specified variants via a `variant` prop.
5. Keep under 200 lines — blocks should be simple.

### Step 3: Design System Compliance

All generated code must:
- Use `var(--font-family-lora)` for heading text within blocks
- Use `var(--font-family-noto-sans)` for body/UI text
- Use `var(--spacing-*)` for padding/gap (zero margins for layout)
- Use semantic color variables (`var(--primary)`, `var(--foreground)`, etc.)
- Use `var(--radius-*)` for border radius
- Use `lucide-react` for icons
- Support keyboard navigation and focus states (`:focus-visible`)
- Include `aria-label` for icon-only variants
- Meet 44x44px minimum touch target

### Step 4: Create Block CSS

1. Create `/src/styles/blocks/[block-name].css`.
2. Use BEM class naming: `.wp-block-[name]`, `.wp-block-[name]__element`, `.wp-block-[name]--modifier`.
3. All values via CSS variables — zero hardcoded values.
4. Include hover, focus, active, and disabled states.
5. Include light/dark mode support via CSS variables (no `dark:` classes).

### Step 5: Register and Document

1. Add CSS import to `/src/styles/index.css` under the blocks section.
2. Add CHANGELOG entry under `[Unreleased]` -> Added.

---

## Success Criteria

- [ ] Block component created with TypeScript interface
- [ ] All variants implemented via props
- [ ] BEM class naming with `.wp-block-*` convention
- [ ] 100% CSS variable compliance (zero hardcoded values)
- [ ] Only approved fonts used
- [ ] Keyboard accessible with visible focus states
- [ ] Touch target meets 44x44px minimum
- [ ] Under 200 lines
- [ ] CSS registered in `index.css`
- [ ] CHANGELOG updated
