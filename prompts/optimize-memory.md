# Optimize Memory — Codebase Memory Optimization

**Type:** Implementation  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `optimize memory`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Execute memory optimization based on findings from `audit memory`. Reduce codebase memory footprint by splitting oversized files, consolidating duplicates, removing orphaned files, and flattening component hierarchies.

**Prerequisites:** Run `audit memory` first to identify targets. Read the audit report before executing.

---

## Execution Order

### Phase 1: Quick Wins — Duplicate Resolution

1. Read the latest memory audit report from `/reports/`.
2. Resolve all identified duplicate CSS file pairs (keep active version, delete unused).
3. Consolidate identified duplicate data files.
4. Update all import references after deletions.
5. Verify zero broken imports.

### Phase 2: File Splitting

1. Split all files > 1,000 lines using recommended strategies from audit.
2. Split CSS files > 400 lines by concern.
3. Split data files > 500 lines by category.
4. Update `index.css` imports for any split CSS files.

### Phase 3: Orphan Cleanup

1. Delete confirmed orphaned CSS files (verify zero importers first).
2. Delete confirmed orphaned data exports.
3. Remove dead CSS selectors.
4. Remove commented-out code blocks (> 5 lines).

### Phase 4: Component Consolidation

1. Merge similar component variants into prop-driven components.
2. Replace layout-only variants with a `layout` prop.
3. Replace color-only variants with a `variant` prop.
4. Update all consumer files to use consolidated components.

---

## Design System Compliance (Non-Negotiable)

All changes MUST maintain:
- 100% CSS variable usage from `theme-base.css` / `theme-light.css` / `theme-dark.css`
- Only 5 approved font families via CSS variables
- BEM class naming + `.wp-*` utilities
- `lucide-react` for icons
- `react-router` for routing
- Zero Margin Policy (flex/grid gaps only)
- `prefers-reduced-motion` support for animations
- WCAG 2.1 AA compliance

---

## Constraints

- **NEVER delete protected files**
- **Preserve all functionality** — only remove truly unused code
- **Update imports** — when moving/splitting files, update all references
- **Test after each change** — verify no broken imports or missing styles

---

## Deliverables

1. Updated codebase with optimizations applied
2. Updated `/reports/` with optimization results
3. Updated `/tasks/task-list.md` with any remaining items
4. CHANGELOG entry under `[Unreleased]`

---

## Success Metrics

| Metric | Target |
|---|---|
| Files > 1,000 lines | 0 |
| Duplicate CSS pairs | 0 |
| Orphaned files | 0 |
| Average CSS file size | < 300 lines |
