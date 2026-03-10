# Design System Contract Audit — Master Prompt

**Version:** 1.0.0
**Date:** March 3, 2026
**Scope:** Full CSS architecture audit against updated design system contracts
**Workflow:** Guidelines review → Audit → Report → Task List → Human Review

---

## 1. Context & Objective

We are building a highly responsive, mobile-first React prototype for a tour operator website (LightSpeed Tour Operator). The CSS architecture has just been updated with a new design system contract that introduces:

1. **WP-preset-first token contract** — `--wp--preset--*` variables are the canonical namespace, with project aliases (`--spacing-*`, `--text-*`) layered underneath
2. **Gap/padding-led layout composition** — Margins are prohibited in patterns/parts/templates; replaced by `gap` + `padding-block` + `padding-inline`
3. **320→1920 responsive ladder** — Clamp-first for fluid type/spacing; media queries only for structural changes (grid cols, nav switches)
4. **1→6 archive grid column progression** — 1(320-639), 2(640-1023), 3(1024-1279), 4(1280-1439), 5(1440-1679), 6(1680+)
5. **Container max-width expanded** — Default from 1440px to 1600px; wide from 1600px to 1800px

This audit must verify that all authored CSS and guideline documentation conform to these contracts.

---

## 2. Mandatory Workflow Order

Execute these steps **in this exact sequence**:

```
Step 1: GUIDELINES REVIEW — Verify docs match code source of truth
Step 2: CODE AUDIT — Scan all CSS/TSX files against contracts
Step 3: AUDIT REPORT — Produce severity-ranked findings
Step 4: TASK LIST — Produce phased implementation plan
Step 5: HUMAN REVIEW LIST — Flag items requiring human judgement
```

---

## 3. Design System Source of Truth

### 3.1 CSS Architecture Files (Read ALL before auditing)

| File | Role |
|------|------|
| `/src/styles/theme-base.css` | Shared tokens: typography, spacing, radius, layout, animation, z-index |
| `/src/styles/theme-light.css` | Light mode: colours, shadows, logos, hero overlay |
| `/src/styles/theme-dark.css` | Dark mode: colour overrides, shadows, logos, hero overlay |
| `/src/styles/theme-variables.css` | WordPress `--wp--preset--*` namespace mapping |
| `/src/styles/theme.css` | Orchestration entry point (import order) |
| `/src/styles/tailwind.css` | Build pipeline bridge ONLY — `@theme inline` maps vars to TW utility names |
| `/src/styles/global.css` | WordPress-aligned utility and component classes |
| `/src/styles/wordpress-classes.css` | WP BEM utility classes (`.wp-block-lts-*`) |
| `/src/styles/wordpress-color-utilities.css` | WP colour utility classes |

### 3.2 Guideline Documentation Files (Read ALL before auditing)

| File | Role |
|------|------|
| `/guidelines/design-tokens/MODERN-TYPOGRAPHY.md` | Fluid type scale (v3.0) |
| `/guidelines/design-tokens/MODERN-SPACING.md` | Fluid spacing + zero-margin policy (v4.0) |
| `/guidelines/design-tokens/breakpoints.md` | Responsive breakpoint system (v1.0) |
| `/guidelines/design-tokens/colors.md` | Semantic colour tokens |
| `/guidelines/design-tokens/borders.md` | Border tokens |
| `/guidelines/design-tokens/radii.md` | Border radius tokens |
| `/guidelines/design-tokens/shadows.md` | Shadow/elevation tokens |
| `/guidelines/design-tokens/typography.md` | Legacy reference (deprecated) |
| `/guidelines/design-tokens/spacing.md` | Legacy reference (deprecated) |

### 3.3 Pattern/Parts/Template CSS Directories (Audit ALL files in each)

- `/src/styles/patterns/*.css` — Block pattern styles
- `/src/styles/parts/*.css` — Template part styles (header, footer)
- `/src/styles/templates/*.css` — Page template styles
- `/src/styles/components/*.css` — Component styles (button, form, card, alert, badge)
- `/src/styles/common/*.css` — Common utility component styles
- `/src/styles/pages/*.css` — Page-specific styles
- `/src/styles/blocks/*.css` — Block UI component styles

---

## 4. Audit Contracts (What to Check)

### Contract A: Token Usage Compliance

**Rule:** All authored prototype styles MUST use CSS variables. No hardcoded colour, font, spacing, radius, or shadow values.

**Check for violations:**
- Hardcoded hex colours (`#fff`, `#4A7311`, etc.) outside of theme-light.css / theme-dark.css / theme-variables.css
- Hardcoded `px` or `rem` values for spacing (e.g., `padding: 24px`, `gap: 2rem`) outside of theme-base.css
- Hardcoded font-family declarations (e.g., `font-family: Arial`) outside of theme-base.css
- Hardcoded font-size values (e.g., `font-size: 18px`) outside of theme-base.css
- Hardcoded border-radius values (e.g., `border-radius: 8px`) outside of theme-base.css
- Hardcoded box-shadow values outside of theme-light.css / theme-dark.css

**Exemptions:**
- `0`, `0px`, `none`, `transparent`, `inherit`, `currentColor` — always allowed
- `1px solid` for standard borders — allowed (thickness is structural)
- `100%`, `100vh`, `100vw`, `auto` — always allowed
- `min-height: 44px` for WCAG touch targets — allowed
- Values inside `clamp()` definitions in theme-base.css — allowed (they ARE the tokens)
- Values in theme-light.css, theme-dark.css, theme-variables.css — allowed (they ARE the source)

### Contract B: Zero-Margin Layout Policy

**Rule:** No margin properties (`margin`, `margin-top`, `margin-bottom`, `margin-left`, `margin-right`, `margin-block`, `margin-inline`) in pattern, part, or template CSS files.

**Exemptions (do NOT flag these):**
- `margin-inline: auto` (centering pattern)
- `margin: 0` or `margin-*: 0` (resets)
- Margins in `theme.css @layer base` on semantic elements (h1-h6, p, blockquote, ul, ol, li, hr, pre)
- Margins in `@media print` blocks
- Negative margins for accessibility helpers (e.g., sr-only)

**Check these directories:**
- `/src/styles/patterns/*.css`
- `/src/styles/parts/*.css`
- `/src/styles/templates/*.css`

### Contract C: Typography Contract

**Rule:** Only three font families permitted:
- `var(--font-family-lora)` — Headings (H1-H6), labels, blockquotes, editorial
- `var(--font-family-noto-sans)` — Body text, buttons, inputs, UI
- `var(--font-family-mono)` — Code blocks, technical values (booking IDs/reference codes)

**Check for violations:**
- Any `font-family` declaration not using one of the three CSS variables
- Any `font-family` declaration referencing fonts other than Lora, Noto Sans, or Courier New
- Font declarations in component CSS that should inherit from theme.css base rules

**Rule:** Font sizes must use the fluid `--text-*` scale tokens. No hardcoded font sizes.
**Rule:** Font weights must use `--font-weight-*` tokens. No hardcoded numeric weights.

### Contract D: Responsive/Layout Contract

**Rule:** Container max-width must be `1600px` (default), `800px` (narrow), or `1800px` (wide).
**Check:** Any `max-width` declaration in layout classes that doesn't match `var(--container-max-width*)` or these values.

**Rule:** Breakpoints must follow the mobile-first ladder: 320, 480, 640, 768, 1024, 1280, 1440, 1600, 1920.
**Check:** Any `@media (max-width: ...)` queries (desktop-first is prohibited).
**Check:** Any `@media (min-width: ...)` values not in the approved set.

**Rule:** Archive grids must hit the defined column progression.
**Check:** Grid column definitions in archive/card-grid CSS.

### Contract E: WordPress Class Naming Convention

**Rule:** Authored prototype components must use WordPress-aligned class names:
- `.wp-block-*` for block-level elements
- `.wp-pattern-*` for pattern compositions
- `.wp-part-*` for template parts
- `.has-*` for utility modifiers
- `.is-*` for state modifiers

**Rule:** Tailwind utility classes must NOT be used for authored prototype component styling. Tailwind is infrastructure only (build pipeline, `@theme inline` mapping).

**Check for violations in CSS files:**
- CSS selectors using non-WP-aligned naming (e.g., bare `.card`, `.hero-title` without WP prefix)
- Note: Some legacy selectors may exist from pre-migration — flag as migration candidates, not blockers

### Contract F: Documentation ↔ Code Token Alignment

**Rule:** Guideline documents must accurately reflect the current CSS variable values.

**Check:**
- `/guidelines/design-tokens/MODERN-TYPOGRAPHY.md` values match `/src/styles/theme-base.css` exactly
- `/guidelines/design-tokens/MODERN-SPACING.md` values match `/src/styles/theme-base.css` exactly
- `/guidelines/design-tokens/breakpoints.md` breakpoints match implemented media queries
- `/guidelines/design-tokens/colors.md` colours match `/src/styles/theme-light.css` and `/src/styles/theme-dark.css`
- `/guidelines/design-tokens/radii.md` values match `/src/styles/theme-base.css`
- `/guidelines/design-tokens/shadows.md` values match light/dark theme files
- WP preset mapping in docs matches `/src/styles/theme-variables.css`

---

## 5. Audit Output Format

### 5.1 Audit Report → `/reports/2026-03-03-design-system-contract-audit.md`

Structure:

```markdown
# Design System Contract Audit Report
**Date:** 2026-03-03
**Auditor:** [AI]
**Scope:** Full CSS architecture

## Executive Summary
- Total files audited: X
- Total violations found: X
- Critical: X | High: X | Medium: X | Low: X

## Contract A: Token Usage — X violations
### Critical (hardcoded colours in component CSS)
| File | Line | Violation | Fix |
|------|------|-----------|-----|
| ... | ... | ... | ... |

### High (hardcoded spacing)
...

## Contract B: Zero-Margin Policy — X violations
...

## Contract C: Typography — X violations
...

## Contract D: Responsive/Layout — X violations
...

## Contract E: Class Naming — X violations
...

## Contract F: Docs ↔ Code Alignment — X mismatches
...
```

**Severity Definitions:**
- **Critical:** Breaks design system contract; blocks WP migration (e.g., hardcoded colours in component CSS)
- **High:** Violates updated contract; causes visual inconsistency (e.g., non-exempt margins in patterns)
- **Medium:** Legacy pattern that should be migrated (e.g., old token names, non-WP class names)
- **Low:** Documentation drift; cosmetic naming inconsistency

### 5.2 Task List → `/tasks/design-system-contract-tasks.md`

Structure:

```markdown
# Design System Contract — Task List
**Generated:** 2026-03-03
**Source:** /reports/2026-03-03-design-system-contract-audit.md

## Phase 1: Critical Fixes (Token compliance)
- [ ] File: path — Description of fix
- [ ] ...

## Phase 2: Margin Elimination (Layout contract)
- [ ] File: path — Remove margin, replace with gap/padding
- [ ] ...

## Phase 3: Typography & Responsive (Naming + breakpoints)
- [ ] File: path — Description
- [ ] ...

## Phase 4: Documentation Alignment
- [ ] File: path — Update doc to match code
- [ ] ...
```

### 5.3 Human Review List → `/tasks/design-system-human-review.md`

Items that **cannot be auto-fixed** and require human design/architecture judgement:

```markdown
# Human Review Required
**Generated:** 2026-03-03

## Decisions Needed
- [ ] File: path — Question requiring human judgement
  - **Context:** Why this can't be auto-decided
  - **Options:** A) ... B) ...
  - **Recommendation:** ...

## Visual Regression Checks
- [ ] Verify Hero overlay contrast at 320px and 1920px
- [ ] Verify archive grid column progression at each breakpoint
- [ ] Verify dark mode colour contrast meets WCAG AA
- [ ] ...
```

---

## 6. Acceptance Criteria

The audit is complete when:

- [ ] All files in `/src/styles/` have been scanned
- [ ] All 6 contracts (A-F) have been checked
- [ ] Report saved to `/reports/2026-03-03-design-system-contract-audit.md`
- [ ] Task list saved to `/tasks/design-system-contract-tasks.md`
- [ ] Human review list saved to `/tasks/design-system-human-review.md`
- [ ] Master task list `/tasks/task-list.md` updated with new tasks
- [ ] Breakpoint acceptance checklist covers: 320, 480, 640, 768, 1024, 1280, 1440, 1600, 1920

---

## 7. Test Cases to Verify During Audit

These specific scenarios MUST be checked and reported on:

### TC-1: Fluid Typography Scaling
Verify that `--text-6xl` through `--text-xs` all use `clamp()` in theme-base.css and that no CSS file overrides them with fixed values.

### TC-2: Fluid Spacing Scaling
Verify that `--spacing-section-*`, `--spacing-container-*`, `--spacing-element-*`, and `--spacing-gap-*` all use `clamp()` in theme-base.css.

### TC-3: Archive Grid Column Progression
Verify that archive/card-grid CSS implements the exact column progression:
- 1 col at 320-639px
- 2 cols at 640-1023px
- 3 cols at 1024-1279px
- 4 cols at 1280-1439px
- 5 cols at 1440-1679px
- 6 cols at 1680px+

### TC-4: Non-Exempt Margin Scan
Scan every `.css` file in `/src/styles/patterns/`, `/src/styles/parts/`, `/src/styles/templates/` for margin properties. Report all non-exempt instances.

### TC-5: Block Gap Behaviour
Verify that `--wp--style--block-gap` is defined and that flow/flex/grid layout classes use `gap` instead of margins.

### TC-6: WP-Aligned Class Conventions
Verify that all pattern/part/template CSS files use `.wp-pattern-*`, `.wp-part-*`, or `.wp-block-*` prefixed selectors.

### TC-7: Docs ↔ Code Token Match
For each token category (typography, spacing, colour, radius, shadow), verify that the guideline doc values match the CSS file values character-for-character.

### TC-8: Container Max-Width
Verify that `.container` / `.wp-block-container` uses `--container-max-width` (1600px) and that no other container class uses a hardcoded width of 1440px.

### TC-9: Tailwind Non-Authoring
Verify that no CSS file in patterns/parts/templates/components uses `@apply` or references Tailwind utility classes in selectors.

### TC-10: Font Family Compliance
Verify that every `font-family` declaration across all CSS files references one of the three permitted variables or their underlying font names (Lora, Noto Sans, Courier New).

---

## 8. Assumptions

1. CSS custom properties in `/src/styles/theme-base.css` and `/src/styles/theme-variables.css` are the **source of truth** for theme.json alignment mapping.
2. Tailwind remains **non-authoring infrastructure only**; authored prototype code avoids Tailwind utility classes. The `@theme inline` block in `tailwind.css` is a legacy bridge.
3. "Do not use Tailwind" is interpreted as "do not introduce/use Tailwind utilities in custom prototype component CSS." Existing JSX using Tailwind classes is tracked separately in the migration task list.
4. Phase 4 (after implementation) will be verification, regression hardening, and rollout sign-off.
5. Exempt margins (prose flow, auto-centering, print, accessibility) are explicitly allowed and must NOT be flagged as violations.

---

## 9. Phased Implementation Sequence (for Task List)

After the audit produces findings, tasks must be organized into these phases:

### Phase 1: Guidelines/Docs Reconciliation
- Fix any docs ↔ code token mismatches
- Archive superseded legacy docs
- Ensure all 3 master guideline docs are current

### Phase 2: Critical Token Compliance
- Replace all hardcoded colours in component/pattern/template CSS with `var(--*)` tokens
- Replace all hardcoded font declarations with `var(--font-family-*)` tokens
- Replace all hardcoded font sizes with `var(--text-*)` tokens

### Phase 3: Layout Contract Migration
- Eliminate non-exempt margins in patterns/parts/templates
- Replace with `gap` on parent containers or `padding-block`/`padding-inline`
- Verify archive grid column progression
- Update container max-widths to new contract values

### Phase 4: Verification & Regression
- Visual regression check at all 9 breakpoints (320/480/640/768/1024/1280/1440/1600/1920)
- Dark mode contrast verification
- Compliance scorecard pass
- Human review sign-off on flagged items

---

**End of Prompt**
