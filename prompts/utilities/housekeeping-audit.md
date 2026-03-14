# Housekeeping Audit — Single-Session Cleanup

**Usage:** Paste the prompt below into a new conversation to run a full project hygiene pass. Designed to complete in ONE session (~45 min). Run regularly (weekly or after major work sessions).

---

## Prompt

```
Run the Housekeeping Audit from /prompts/utilities/housekeeping-audit.md — execute all 5 phases in this single session, then close off with a summary.
```

---

## What This Prompt Does (5 Phases)

### Phase 1: File System Cleanup (~10 min)

**1a. Root directory audit**
- Scan `/` for files that violate root directory rules in Guidelines.md
- Only these are allowed in root: `README.md`, `CHANGELOG.md`, `ATTRIBUTIONS.md`, `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `.gitignore`, `pnpm-lock.yaml`, `postcss.config.mjs`
- DELETE orphaned scripts: `fix_*.js`, `check_*.cjs`, `test_sync.txt`, `snippets.code-snippets`, etc.
- DELETE `/tmp/` folder and all contents
- DELETE `/workflows/` if not needed by CI
- DELETE any `.js` fix/test scripts in `/src/` root (e.g., `src/fix_*.js`, `src/check_*.js`, `src/test_*.js`, `src/contrast.js`)

**1b. Docs folder audit**
- Scan `/docs/` for duplicate, superseded, or stale documentation
- Look for files that say the same thing (e.g., multiple "FINAL" or "CONFIRMED" docs)
- Consolidate or delete redundant files
- Keep only actively referenced docs

**1c. Reports & tasks cleanup**
- In `/reports/`: Move reports older than 30 days to `/reports/archive/`
- In `/tasks/`: Delete completed task files (keep `task-list.md` as master)
- In `/prompts/`: Keep all prompts (they're reusable), but flag any that reference deleted files

### Phase 2: Import & Route Integrity (~10 min)

**2a. Broken CSS imports**
- Read `/src/styles/index.css` and verify every `@import` target file exists
- Check all CSS files that `@import` other CSS files
- Report any imports pointing to non-existent files

**2b. Broken JS/TS imports**
- Scan all `.tsx` and `.ts` files in `/src/app/` for imports
- Verify each import target exists (relative paths)
- Flag any imports to files that don't exist
- Focus on: pages, components, data, hooks, utils, lib

**2c. Missing routes**
- Read `/src/app/routes.ts`
- List all page files in `/src/app/pages/` and `/src/app/pages/dev-tools/`
- Cross-reference: identify any page files NOT registered in routes.ts
- Cross-reference: identify any routes pointing to page files that don't exist
- Report both missing and orphaned entries

**2d. Unused page files**
- Identify pages that exist but have no route AND are not imported anywhere else
- These are candidates for deletion (flag, don't auto-delete)

### Phase 3: Status Updates (~10 min)

**3a. Update `/tasks/task-list.md`**
- Read current status of all tasks
- Mark any newly completed tasks as `[x]`
- Update the status line at the top with current state
- Update the "Next Actions" section to reflect what's actually next
- Delete references to task files that no longer exist

**3b. Update `/CHANGELOG.md`**
- Add an `[Unreleased]` entry (or update existing one) with today's date
- Summarize all changes made in this housekeeping session under appropriate headings:
  - `### Added` — new files, features
  - `### Changed` — modified files, updated statuses
  - `### Removed` — deleted files, cleaned up items
  - `### Fixed` — broken imports, missing routes

**3c. Update Guidelines.md (spot check)**
- Open `/guidelines/Guidelines.md`
- Verify the "Guidelines File Structure" tree at the bottom still matches actual `/guidelines/` folder structure
- If files were added or removed from `/guidelines/`, update the tree
- Do NOT rewrite the entire file — only fix the file tree section if needed

### Phase 4: Dynamic Page Updates (~10 min)

**4a. Update SitemapPage**
- Open `/src/app/pages/SitemapPage.tsx`
- Verify all route paths in the sitemap match actual routes in `routes.ts`
- Add any missing routes that should appear in the sitemap
- Remove any routes that no longer exist
- Update counts/stats if they're computed from data

**4b. Update DevToolsPage**
- Open `/src/app/pages/DevToolsPage.tsx`
- Verify all dev tool links match actual routes in `routes.ts` under `dev-tools/`
- Add any new dev tool pages that exist but aren't listed
- Remove any links to pages that no longer exist
- Update descriptions if they reference outdated information

**4c. Update dev-tools/index.tsx**
- Open `/src/app/pages/dev-tools/index.tsx`
- Same checks as DevToolsPage — verify links, add missing, remove stale

### Phase 5: Summary & Close (~5 min)

**5a. Print summary**
```
## Housekeeping Summary — [DATE]

### Files Deleted: X
- [list deleted files]

### Broken Imports Fixed: X
- [list fixes]

### Missing Routes Added: X
- [list new routes]

### Stale Routes Removed: X
- [list removed routes]

### Task List Updated: Yes/No
### CHANGELOG Updated: Yes/No
### SitemapPage Updated: Yes/No
### DevToolsPage Updated: Yes/No
### Guidelines Updated: Yes/No

### Remaining Issues (manual action needed):
- [any items that need human decision]
```

**5b. Update task-list.md** with housekeeping completion date

---

## Rules

1. **DO NOT create new documentation files** — this is a cleanup session, not a creation session
2. **DO NOT refactor code** — only fix broken imports and missing routes
3. **DO NOT change design tokens** — visual styling is out of scope
4. **DO delete confidently** — orphaned scripts, tmp files, and stale docs should be removed
5. **DO update statuses** — task lists, changelogs, and dynamic pages must reflect reality
6. **ASK before deleting** any file you're unsure about — flag it in the summary instead

---

## Frequency

Run this prompt:
- After every major work session (2+ hours of changes)
- Weekly during active development
- Before any milestone or handoff
