# Guidelines Audit — Systematic Review

**Type:** Audit  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `guidelines audit`  
**Estimated Duration:** 2-3 hours

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Systematically review every guideline file in `/guidelines/` to verify accuracy against the codebase, ensure template compliance, fix broken references, remove outdated content, and consolidate redundant files.

**Success Criteria:**
- Every guideline file follows its designated template from `/guidelines/_templates/`
- Every CSS variable, token, and font reference matches the actual CSS files
- Zero broken cross-reference links
- Zero duplicate/redundant files
- Every file has correct version header
- Guidelines.md is under 400 lines

---

## CSS Source Files (Ground Truth)

These are the **source of truth** for all design token documentation:

| CSS File | Contains |
|---|---|
| `/src/styles/theme-base.css` | Typography (5 font families, fluid type scale, weights), spacing, radius, layout constants, animations |
| `/src/styles/theme-light.css` | Light mode colors, shadows |
| `/src/styles/theme-dark.css` | Dark mode colors, shadows |
| `/src/styles/theme-organic.css` | Organic design tokens |
| `/src/styles/global.css` | WordPress-aligned utility classes |
| `/src/styles/fonts.css` | Font face imports |

---

## Execution Steps

### Phase 1: File Inventory (15 min)

List every file in `/guidelines/` recursively. Flag any file that:
- Missing version header
- Has no version number
- Has `Last Updated` older than 30 days without review

### Phase 2: Template Compliance (30 min)

**Design Token files** (`/guidelines/design-tokens/*.md`):
- Must have: Overview, CSS Variables table, Usage Examples, Related Guidelines

**Component files** (`/guidelines/components/*.md`):
- Must have: Overview, Props/API Reference, CSS Classes, Usage Examples

### Phase 3: CSS Variable Accuracy (60 min)

For EACH design token file, verify EVERY documented CSS variable exists in the actual CSS:

1. Extract all `var(--something)` references from the guideline
2. Search for each in `theme-base.css`, `theme-light.css`, `theme-dark.css`
3. Flag documented variables that don't exist in CSS
4. Flag CSS variables that aren't documented

**Critical check:** Verify font documentation references only the 5 approved fonts:
- `var(--font-family-lora)` — Lora
- `var(--font-family-noto-sans)` — Noto Sans
- `var(--font-family-caveat)` — Caveat
- `var(--font-family-shadows)` — Shadows Into Light
- `var(--font-family-mono)` — Courier New

### Phase 4: Cross-Reference Links (30 min)

For EVERY guideline file:
1. Find all markdown links
2. Verify each linked file exists
3. Fix or remove broken links

### Phase 5: Duplicate & Redundancy Check (30 min)

Check for files with overlapping content. For each potential duplicate:
1. Read both files
2. Identify unique content in each
3. Decide: merge into one file, or keep both with clear scope distinction

### Phase 6: Write Report & Tasks (15 min)

1. **Report:** Save to `/reports/YYYY-MM/guidelines-audit.md`
2. **Tasks:** Add fixes to `/tasks/task-list.md`
3. **CHANGELOG:** Add entry

---

## Guard Rails

- **NEVER delete a guideline file without merging its content first**
- **NEVER modify Guidelines.md to exceed 400 lines**
- **NEVER add CSS variables that don't exist in the actual CSS files**
- **NEVER remove documentation for CSS variables that DO exist**
- **Always increment version numbers when editing files**
- **Always update "Last Updated" date when editing files**
