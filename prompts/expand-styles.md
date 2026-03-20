# Expand Styles — Discover & Propose Style Coverage Gaps

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand styles`  
**Repeatable:** Yes — run after adding new components or pages  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/rules/design-system-rules.md` — Styling compliance
- `/guidelines/design-tokens/colors.md` — Color tokens
- `/guidelines/design-tokens/typography.md` — Typography tokens
- `/guidelines/design-tokens/spacing.md` — Spacing tokens
- `/guidelines/styles/section-styles.md` — Section preset styles

---

## Design System Rules

- ALL styling via CSS variables — no hardcoded values
- Typography: ONLY approved font faces via CSS variables
- External `.css` files with BEM naming
- Organised in `/styles/blocks/`, `/styles/patterns/`, `/styles/parts/`, `/styles/pages/`
- Zero Margin Policy: flex/grid gaps only

---

## Purpose

Audit the style file architecture to identify **missing CSS files, inconsistent BEM naming, unused design tokens, missing dark mode support, and style organisation gaps**. Propose new style files, token additions, and structural improvements to the CSS architecture.

---

## Style Architecture Expected

```
/src/styles/
├── index.css              ← Master import
├── global.css             ← Global styles, resets
├── theme-base.css         ← Shared tokens (spacing, typography, etc.)
├── theme-light.css        ← Light mode colour tokens
├── theme-dark.css         ← Dark mode colour tokens
├── fonts.css              ← @font-face declarations
├── blocks/                ← Block component styles
│   ├── button.css
│   ├── price-tag.css
│   └── ...
├── patterns/              ← Pattern component styles
│   ├── hero.css
│   ├── card-grid.css
│   └── ...
├── parts/                 ← Template part styles
│   ├── header.css
│   ├── footer.css
│   └── ...
├── pages/                 ← Page-specific styles
│   └── ...
└── templates/             ← Template archetype styles
    └── ...
```

---

## Steps

### Step 1: Inventory Style Files

1. List all `.css` files in `/src/styles/` recursively
2. Map each to its consuming component
3. Identify orphaned CSS files (no component imports them)
4. Identify components without dedicated CSS files

| CSS File | Component | Imported? | BEM Root |
|----------|-----------|-----------|----------|
| blocks/button.css | Button.tsx | ✅ | .wp-block-button |
| patterns/hero.css | Hero.tsx | ✅ | .wp-pattern-hero |

### Step 2: Check BEM Compliance

For each CSS file, verify:
- Root class follows `.wp-[type]-[name]` convention
- All child classes use BEM modifiers (`__element`, `--modifier`)
- No utility classes that should be design tokens
- No hardcoded values (colours, fonts, spacing)

| CSS File | BEM Root Correct? | Hardcoded Values? | Issues |
|----------|------------------|-------------------|--------|
| patterns/hero.css | ✅ | 2 hex colours | Migrate to tokens |

### Step 3: Token Coverage Audit

Check which design tokens exist but are unused, and which are needed but missing:

**Unused tokens:**
| Token | Defined In | Used By |
|-------|-----------|---------|
| `--color-accent-3` | theme-base.css | ❌ No CSS files |

**Missing tokens:**
| Need | Context | Proposed Token |
|------|---------|---------------|
| Card hover shadow | Cards need consistent hover shadow | `--shadow-card-hover` |
| Section max-width | Inconsistent max-widths | `--section-max-width` |

### Step 4: Dark Mode Coverage

For each component CSS file, check dark mode support:

| CSS File | Uses CSS Variables? | Dark Mode Works? | Issue |
|----------|-------------------|-----------------|-------|
| patterns/hero.css | Partial | ❌ | 2 hardcoded colours |
| blocks/badge.css | ✅ | ✅ | — |

### Step 5: Propose Improvements

| # | Type | Target | Change | Priority |
|---|------|--------|--------|----------|
| 1 | Missing CSS | blocks/price-tag.css | Create for PriceTag block | High |
| 2 | Token gap | theme-base.css | Add `--shadow-card-hover` | Medium |
| 3 | Hardcoded | patterns/hero.css | Migrate 2 hex values to tokens | High |
| 4 | Orphaned | pages/old-page.css | Delete (component removed) | Low |
| 5 | Structure | styles/templates/ | Create directory | Low |

### Step 6: User Decision

Present recommendations. Wait for approval.

---

## Rules

1. **Every component needs a CSS file** — in the matching subdirectory
2. **BEM naming is mandatory** — `.wp-[type]-[name]` root class
3. **CSS variables for all values** — no hardcoded colours, fonts, spacing
4. **Dark mode via variables** — never use `dark:` Tailwind classes
5. **Never auto-implement** — present proposals and wait for approval
6. **Preserve existing styles** — only add or fix, never remove without approval

---

## Success Criteria

- [ ] All style files inventoried
- [ ] Orphaned CSS files identified
- [ ] Components without CSS files flagged
- [ ] BEM compliance verified
- [ ] Token coverage gaps identified
- [ ] Dark mode coverage checked
- [ ] Structural improvements proposed
