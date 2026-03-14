# Guidelines File Audit Prompt

**Version:** 1.0
**Category:** Audit
**Estimated Time:** 60–90 minutes
**Prerequisites:** Read `/guidelines/_templates.md` and all template files in `/guidelines/_templates/`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. All file changes are live immediately. Use only the available tools. NEVER suggest terminal commands, browser refresh, cache clearing, or npm install.

---

## Objective

Systematically audit every guideline file in `/guidelines/` and its subfolders. For each file, verify it is accurate, not duplicated, follows the correct template, references the correct source CSS files, and contains no stale or incorrect information.

---

## Scope

**In Scope:**
- Every `.md` file in `/guidelines/` and all subfolders
- Cross-references between guideline files
- Accuracy against actual CSS source files in `/src/styles/`
- Template compliance (does each file follow the appropriate template?)
- Duplication detection (are two files covering the same topic?)

**Out of Scope:**
- Source code changes (this is a documentation audit only)
- Creating new components or patterns
- Report processing (see `/prompts/report-processor-orchestrator.md`)

---

## Phase 1: Inventory All Guidelines Files

1. **Read every subfolder** in `/guidelines/`
2. **Create a complete inventory** with this structure:

```markdown
| # | File Path | Category | Template Type | Status |
|---|-----------|----------|---------------|--------|
| 1 | /guidelines/Guidelines.md | Entry Point | general | [Audit pending] |
```

**Categories:** Entry Point, Architecture, Design Token, Component, Pattern, Block, Icon, Mobile, Style, Template, Testing, Prompt, Workflow, Index

---

## Phase 2: Check Each File Against Its Template

For each file, verify:

1. **Correct template type** — Does it use the right template from `/guidelines/_templates/`?
2. **Required sections present:**
   - Design tokens → Source of Truth, Token Reference, Do/Don't, Quick Reference
   - Components → Purpose, WordPress Mapping, Props, Usage, Styling, Accessibility
   - Patterns → Purpose, Composition, Variants, Section Styles, Usage in Templates
   - General → Purpose, Rules, Examples, Related Guidelines
3. **Source of Truth accuracy** — Does the referenced CSS file actually contain these tokens?
4. **Token values match** — Do documented values match the actual CSS?

---

## Phase 3: Verify Against Source CSS

For each design token guideline:

1. **Read the referenced CSS file** (e.g., `theme-base.css`)
2. **Compare every documented token** against the actual CSS
3. **Flag discrepancies:**
   - Token exists in CSS but not in docs → **MISSING from docs**
   - Token exists in docs but not in CSS → **STALE in docs**
   - Token value differs → **DRIFT**
4. **Record findings** in the audit report

### CSS Source Files to Cross-Reference

| CSS File | Guideline Files That Reference It |
|----------|----------------------------------|
| `/src/styles/theme-base.css` | typography, spacing, borders, radii, animations, responsive, touch-targets, forms |
| `/src/styles/theme-light.css` | colors, dark-light-mode, shadows, buttons, navigation |
| `/src/styles/theme-dark.css` | colors, dark-light-mode, shadows |
| `/src/styles/theme-variables.css` | colors (WordPress presets) |
| `/src/styles/global.css` | typography (WordPress block classes) |

---

## Phase 4: Detect Duplications

Check for files that cover the same topic:

### Known Potential Duplications
- `typography.md` vs `MODERN-TYPOGRAPHY.md` — Which is canonical?
- `spacing.md` vs `MODERN-SPACING.md` — Which is canonical?
- `breakpoints.md` vs `responsive.md` — Overlap?
- `/guidelines/mobile/touch-targets.md` vs `/guidelines/design-tokens/touch-targets.md`
- `/guidelines/mobile/forms.md` vs `/guidelines/design-tokens/forms.md`
- `/guidelines/styles/section-styles.md` vs `/guidelines/patterns/section-styles.md`
- `/guidelines/blocks/overview-patterns.md` vs `/guidelines/overview-patterns.md`

### Resolution Options
1. **Merge** — Combine into one canonical file, delete the other
2. **Redirect** — Keep one as primary, make the other a 1-line redirect
3. **Differentiate** — If they serve different purposes, add clear scope headers
4. **Delete** — If fully superseded, remove the old version

---

## Phase 5: Check Cross-References

For each file that links to other guidelines:

1. **Verify the referenced file exists** at the specified path
2. **Verify the link text is accurate** (file hasn't been renamed)
3. **Flag broken references** as HIGH priority fixes

---

## Phase 6: Content Quality Checks

For each file, verify:

1. **No hardcoded values** in examples (must use CSS variables)
2. **Examples use approved fonts only** (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light)
3. **Examples use BEM naming** (`.wp-pattern-*`, `.wp-part-*`, `.wp-block-*`)
4. **No inline style examples** shown as correct (only as "Don't" examples)
5. **Consistent terminology** (e.g., "design tokens" not "design variables")

---

## Output

### Report
Save to: `/reports/[YYYY-MM-DD]-guidelines-audit-report.md`

Structure:
```markdown
# Guidelines Audit Report

## Executive Summary
- Total files audited: [N]
- Template compliant: [N]
- Source-verified: [N]
- Duplications found: [N]
- Broken references: [N]
- Stale content: [N]

## Findings by Severity
### Critical (blocks generation)
### High (causes inconsistency)
### Medium (incomplete docs)
### Low (style/formatting)

## File-by-File Results
[Table with every file and its status]

## Recommended Actions
[Prioritised list of fixes]
```

### Task List
Save to: `/tasks/guidelines-audit-tasks.md`
Update: `/tasks/task-list.md` with new section

---

## Acceptance Criteria

- [ ] Every `.md` file in `/guidelines/` has been read and assessed
- [ ] All design token files verified against source CSS
- [ ] All duplications identified with resolution recommendations
- [ ] All broken cross-references flagged
- [ ] Report saved to `/reports/`
- [ ] Task list created in `/tasks/`
- [ ] Master task list updated

---

## Relevant Guidelines

| Guideline | Why It's Relevant |
|-----------|-------------------|
| `/guidelines/_templates.md` | Template system reference |
| `/guidelines/_templates/design-token.md` | Design token file template |
| `/guidelines/_templates/component.md` | Component file template |
| `/guidelines/_templates/pattern.md` | Pattern file template |
| `/guidelines/_templates/general.md` | General guideline template |
| `/guidelines/design-tokens/colors.md` | Example of a well-structured token file |
| `/guidelines/design-tokens/MODERN-TYPOGRAPHY.md` | Example of detailed token documentation |
| `/src/styles/theme-base.css` | Primary CSS source of truth |
| `/src/styles/theme-light.css` | Light mode color source |
| `/src/styles/theme-dark.css` | Dark mode color source |
