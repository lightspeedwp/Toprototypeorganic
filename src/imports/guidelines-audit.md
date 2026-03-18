# Guidelines Audit — Systematic Review Prompt

**Type:** Audit  
**Created:** 2026-03-13  
**Status:** Ready  
**Estimated Duration:** 3-4 hours

---

## Prompt Purpose

**Objective:** Systematically review every single guideline file in `/guidelines/` to verify accuracy against the codebase, ensure template compliance, fix broken references, remove outdated content, and consolidate redundant files.

**Expected Output:**
- Audit report in `/reports/`
- Updated task list in `/tasks/`
- Fixed/updated guideline files
- Consolidated duplicates

**Success Criteria:**
- Every guideline file follows its designated template from `/guidelines/_templates/`
- Every CSS variable, token, and font reference matches the actual CSS files
- Zero broken cross-reference links
- Zero duplicate/redundant files
- Every file has correct version header (Category, Version, Last Updated, Status, Template Used)
- Guidelines.md is under 400 lines

---

## Prerequisites (REQUIRED — Read Before Running)

### Files to Read FIRST

1. **[/guidelines/Guidelines.md](/guidelines/Guidelines.md)** — Canonical reference
2. **[/guidelines/_templates.md](/guidelines/_templates.md)** — Template usage guide
3. **All templates in `/guidelines/_templates/`** — Know the structures

### CSS Source Files (Ground Truth)

These are the **source of truth** for all design token documentation:

| CSS File | Contains |
|---|---|
| `/src/styles/theme-base.css` | Base tokens (spacing, typography, borders, shadows, transitions) |
| `/src/styles/theme-light.css` | Light mode colors |
| `/src/styles/theme-dark.css` | Dark mode colors |
| `/src/styles/theme-funky.css` | Funky theme overrides |
| `/src/styles/global.css` | Global styles, font imports |
| `/src/styles/responsive.css` | Breakpoints, responsive rules |
| `/src/styles/tailwind.css` | Tailwind config with CSS variables |

---

## Execution Steps

### Phase 1: File Inventory (15 minutes)

List every file in `/guidelines/` recursively. Create a table:

| # | File Path | Template Used | Has Header | Version | Last Updated | Status |
|---|---|---|---|---|---|---|

Flag any file that:
- Missing version header
- Missing "Template Used" field
- Has no version number
- Has "Last Updated" older than 30 days without review

### Phase 2: Template Compliance (30 minutes)

For each guideline file, verify it follows its declared template:

**Design Token files** (`/guidelines/design-tokens/*.md`):
- Must follow `_templates/design-token-template.md`
- Must have: Overview, CSS Variables table, Usage Examples, WordPress Mapping, Related Guidelines

**Component files** (`/guidelines/components/*.md`):
- Must follow `_templates/component-template.md`
- Must have: Overview, Props/API Reference, CSS Classes, Usage Examples, Variants

**General files** (all others):
- Must follow `_templates/general-template.md`
- Must have: Purpose, Scope, Requirements, Examples

**Fix any non-compliant files** by restructuring to match the template.

### Phase 3: CSS Variable Accuracy (60 minutes)

For EACH design token file, verify EVERY documented CSS variable exists in the actual CSS:

**Method:**
1. Read the guideline file
2. Extract all `var(--something)` references
3. Search for each in `/src/styles/theme-base.css`, `theme-light.css`, `theme-dark.css`, `theme-funky.css`, `global.css`, `responsive.css`
4. Flag any documented variable that doesn't exist in CSS
5. Flag any CSS variable that isn't documented

**Files to audit (in order):**

| # | File | Verify Against |
|---|---|---|
| 1 | `colors.md` | `theme-light.css`, `theme-dark.css`, `theme-funky.css` |
| 2 | `typography.md` | `theme-base.css`, `global.css` |
| 3 | `spacing.md` | `theme-base.css` |
| 4 | `shadows.md` | `theme-base.css`, `theme-light.css`, `theme-dark.css` |
| 5 | `borders.md` | `theme-base.css` |
| 6 | `radii.md` | `theme-base.css` |
| 7 | `animations.md` | `theme-base.css` |
| 8 | `buttons.md` | `theme-base.css`, relevant CSS files |
| 9 | `forms.md` | `theme-base.css`, relevant CSS files |
| 10 | `dark-light-mode.md` | `theme-light.css`, `theme-dark.css` |
| 11 | `responsive.md` | `responsive.css` |
| 12 | `navigation.md` | Site header/footer CSS files |
| 13 | `iconography.md` | Phosphor icons package |
| 14 | `touch-targets.md` | `responsive.css`, component CSS |
| 15 | `css-variables-overview.md` | All theme CSS files |
| 16 | `css-variables.md` | All theme CSS files |
| 17 | `token-examples.md` | All theme CSS files |
| 18 | `funky-design.md` | `theme-funky.css` |

### Phase 4: Cross-Reference Links (30 minutes)

For EVERY guideline file:
1. Find all markdown links `[text](./path)` or `[text](path)`
2. Verify each linked file exists
3. Fix or remove broken links
4. Update relative paths if files have moved

### Phase 5: Duplicate & Redundancy Check (30 minutes)

Check for files with overlapping content:

**Known potential duplicates:**
- `css-variables.md` vs `css-variables-overview.md` — May need merging
- `token-examples.md` — May overlap with individual token files

**For each potential duplicate:**
1. Read both files
2. Identify unique content in each
3. Decide: merge into one file, or keep both with clear scope distinction
4. If merging: create merged file first, verify content, then delete the redundant file

### Phase 6: Non-Token Guideline Files (30 minutes)

Audit all non-design-token files in `/guidelines/`:

| File | Check |
|---|---|
| `accessibility.md` | WCAG references accurate, checklist complete |
| `build-rules.md` | Rules match current architecture |
| `changelog-maintenance.md` | Format matches actual CHANGELOG.md |
| `data-files.md` | Data file list matches `/src/app/data/` |
| `housekeeping.md` | Protected files list is current |
| `imports.md` | Import rules match codebase |
| `performance.md` | Performance guidelines current |
| `project-goals.md` | Goals align with current direction |
| `prompt-triggers.md` | Triggers match actual prompts |
| `prompts.md` | Prompt guidelines current |
| `qa-checklist.md` | QA items match current system |
| `reporting.md` | Report format guidelines current |
| `routes.md` | Routes match `routes.tsx` |
| `wordpress-mapping.md` | WP mapping accurate |
| `writing-guidelines.md` | Content guidelines current |
| `patterns/pattern-catalog.md` | Patterns match codebase |
| `components/components-vs-patterns.md` | Component list accurate |
| `components/non-block-components.md` | Component list accurate |
| `templates/page-archetypes.md` | Archetypes match templates |
| `strategy/README.md` | Strategy overview accurate |
| `_templates.md` | Template list matches `_templates/` folder |

### Phase 7: Write Report & Tasks (15 minutes)

1. **Report:** Save to `/reports/YYYY-MM/guidelines-audit-[date].md`
2. **Tasks:** Add fixes to `/tasks/task-list.md`
3. **Master task list:** Update `/tasks/master-task-list.md`
4. **CHANGELOG:** Add entry

---

## Report Format

```markdown
# Guidelines Audit Report

**Date:** [Date]
**Files Audited:** [Count]
**Issues Found:** [Count]
**Issues Fixed:** [Count]
**Issues Remaining:** [Count]

## Summary by Category

| Category | Files | Compliant | Issues | Fixed |
|---|---|---|---|---|
| Design Tokens | X | Y | Z | W |
| Components | X | Y | Z | W |
| General | X | Y | Z | W |

## Findings

### Critical (Inaccurate Token Documentation)
[List each inaccuracy]

### Major (Template Non-Compliance)
[List each non-compliant file]

### Minor (Broken Links, Typos)
[List each issue]

### Duplicates Identified
[List each duplicate pair with recommendation]
```

---

## Guard Rails

- **NEVER delete a guideline file without merging its content first**
- **NEVER modify Guidelines.md to exceed 400 lines**
- **NEVER add CSS variables that don't exist in the actual CSS files**
- **NEVER remove documentation for CSS variables that DO exist**
- **Always increment version numbers when editing files**
- **Always update "Last Updated" date when editing files**

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-13 | Initial creation |

---

**Maintainer:** LSX Design  
**Category:** Audit  
**Status:** Active
