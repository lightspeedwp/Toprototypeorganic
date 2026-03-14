# Cleanup Prompt

**Version:** 2.0.0
**Date:** March 13, 2026
**Type:** Single-session comprehensive cleanup
**Trigger:** User says **"cleanup"** (see `/guidelines/Guidelines.md` trigger words)
**Frequency:** After every major work session, weekly, or before milestones
**Duration:** ~30-45 minutes, ONE session, no follow-ups

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately. Use only the tools available: `read`, `write_tool`, `fast_apply_tool`, `edit_tool`, `delete_tool`, `file_search`, and `bash` (node_modules only).

---

## Execution Order

Run all 6 phases **sequentially in this single session**, then close with a summary. Do NOT split across multiple sessions.

```
Phase 1: Filesystem Cleanup        (~8 min)
Phase 2: Import & Route Integrity  (~8 min)
Phase 3: Task & Report Maintenance (~5 min)
Phase 4: Status Updates            (~5 min)
Phase 5: Dynamic Page Sync         (~5 min)
Phase 6: Summary & Close           (~4 min)
```

---

## Phase 1: Filesystem Cleanup

### 1a. Root Directory Audit

**ONLY these files are allowed in `/` (root):**

| Allowed | File |
|---------|------|
| Required | `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `pnpm-lock.yaml`, `postcss.config.mjs` |
| Optional | `README.md`, `CHANGELOG.md`, `ATTRIBUTIONS.md`, `.gitignore` |
| Protected | `Guidelines.md` (at `/guidelines/Guidelines.md` — NOT root) |

**DELETE everything else in root**, including but not limited to:
- `fix_*.js`, `check_*.cjs`, `test_sync.txt`, `snippets.code-snippets`
- Any `.sh` scripts (move to `/scripts/` if useful, otherwise delete)
- Any `.md` files other than the allowed list
- Any orphaned config files (`.eslintrc`, `.prettierrc`, etc. without matching dependency)

### 1b. Source Cleanup

**DELETE orphaned scripts in `/src/`:**
- `src/fix_*.js`, `src/check_*.js`, `src/test_*.js`, `src/contrast.js`
- Any file in `/src/` that is NOT `.tsx`, `.ts`, `.css`, `.svg`, `.md` (in imports/pasted_text only)

**DELETE `/tmp/` folder** and all contents if it exists.

### 1c. Docs Folder Audit

Scan `/docs/` for:
- Duplicate files (multiple "FINAL", "CONFIRMED", "ABSOLUTE" docs saying the same thing)
- Files not referenced anywhere in the codebase or guidelines
- Consolidate or delete. When in doubt, flag in summary — don't auto-delete.

---

## Phase 2: Import & Route Integrity

### 2a. CSS Import Chain

1. Read `/src/styles/index.css`
2. For every `@import` line, verify the target file exists
3. Check all CSS files that `@import` other CSS files (recursive)
4. **Report** any broken imports. **Fix** by either creating a stub file or removing the import.

### 2b. Route ↔ Page File Sync

1. Read `/src/app/routes.ts` — extract all lazy-imported page paths
2. List all `.tsx` files in `/src/app/pages/` and `/src/app/pages/dev-tools/`
3. Cross-reference to find:
   - **Missing routes:** Page files that exist but have no route → flag (don't auto-add)
   - **Broken routes:** Routes pointing to files that don't exist → **fix or remove**
   - **Orphaned imports:** `lazy()` imports at top of routes.ts that aren't used in any route → remove

### 2c. Component Import Spot-Check

Spot-check 5-10 recently modified components for broken relative imports. Focus on:
- Pages importing from `../components/patterns/`
- Templates importing from `../components/parts/`
- Any file importing from `../data/` or `../hooks/`

---

## Phase 3: Task & Report Maintenance

### 3a. Clean `/tasks/` Folder

1. Read `/tasks/task-list.md` (MASTER — **never delete**)
2. Scan `/tasks/` for other `.md` files
3. **DELETE** task files where ALL items are checked `[x]` — they're done
4. **KEEP** task files with unchecked items `[ ]` — they're active
5. **MOVE** partially-complete files older than 30 days to `/tasks/archive/`
6. Update `task-list.md` to remove references to deleted task files

### 3b. Clean `/reports/` Folder

1. Scan `/reports/` (not `/reports/archive/`)
2. Reports older than 30 days (by filename date) → move to `/reports/archive/`
3. If multiple reports cover the same topic, keep the most recent, archive the rest
4. Do NOT delete reports — always archive

### 3c. Clean `/prompts/` Folder

Prompts are **reusable and should NOT be deleted**. Only:
- Flag prompts that reference files/paths that no longer exist
- Note any prompts that are superseded by newer versions

---

## Phase 4: Status Updates

### 4a. Update `/tasks/task-list.md`

- Check the `**Status:**` line at the top — does it reflect current reality?
- Mark any newly completed tasks as `[x]`
- Update the "Next Actions" section
- Verify all referenced prompt/report/task files still exist
- Update `**Last Updated:**` date to today

### 4b. Update `/CHANGELOG.md`

Add a new entry under the latest version/unreleased section:

```markdown
### Cleanup — [TODAY'S DATE]

#### Changed
- [list updated files]

#### Removed  
- [list deleted files with brief reason]

#### Fixed
- [list broken imports/routes fixed]
```

### 4c. Spot-Check `/guidelines/Guidelines.md`

- Open the "Guidelines File Structure" tree near the bottom
- Compare against actual `/guidelines/` folder contents
- **Only fix the tree section** if files were added/removed — do NOT rewrite the whole document

---

## Phase 5: Dynamic Page Sync

### 5a. SitemapPage (`/src/app/pages/SitemapPage.tsx`)

- Cross-reference sitemap links against `routes.ts`
- Add any missing public routes
- Remove any routes that no longer exist
- Update stats/counts if computed from data arrays

### 5b. DevToolsPage (`/src/app/pages/DevToolsPage.tsx`)

- Verify all dev tool links match routes under `dev-tools/*` in `routes.ts`
- Add links for any new dev tool pages
- Remove links to deleted dev tool pages

### 5c. dev-tools/index.tsx (`/src/app/pages/dev-tools/index.tsx`)

- Same checks as DevToolsPage — keep the dev tools hub in sync

---

## Phase 6: Summary & Close

Print a structured summary, then update `task-list.md` with the cleanup date.

### Summary Template

```
## Cleanup Summary — [DATE]

### Phase 1: Filesystem
- Files deleted: X
- [list each deleted file with 1-line reason]

### Phase 2: Imports & Routes
- Broken CSS imports fixed: X
- Missing routes flagged: X  
- Broken routes fixed: X
- Orphaned imports removed: X

### Phase 3: Tasks & Reports
- Task files archived/deleted: X
- Reports archived: X
- Prompts flagged: X

### Phase 4: Status Updates
- task-list.md: Updated ✅/No change
- CHANGELOG.md: Updated ✅/No change
- Guidelines.md: Updated ✅/No change

### Phase 5: Dynamic Pages
- SitemapPage: Updated ✅/No change
- DevToolsPage: Updated ✅/No change
- dev-tools/index: Updated ✅/No change

### Items Requiring Human Decision:
- [list anything you weren't sure about]
```

---

## Protected Files (NEVER delete or modify)

These files must NEVER be deleted or overwritten during cleanup:

| File | Reason |
|------|--------|
| `/src/app/components/figma/ImageWithFallback.tsx` | Figma Make system file |
| `/pnpm-lock.yaml` | Package lock (auto-generated) |
| `/tasks/task-list.md` | Master task list (update only, never delete) |
| `/guidelines/Guidelines.md` | Master guidelines (update tree section only) |
| `/CHANGELOG.md` | Version history (append only, never delete) |
| `/src/app/App.tsx` | Application entry point |
| `/src/app/routes.ts` | Route config (fix, never delete) |
| `/src/styles/index.css` | CSS entry point (fix imports, never delete) |
| `/src/styles/theme.css` | Theme orchestrator |
| `/src/styles/theme-base.css` | Base design tokens |
| `/src/styles/theme-light.css` | Light mode tokens |
| `/src/styles/theme-dark.css` | Dark mode tokens |
| All files in `/src/app/data/` | Mock data (never delete without explicit request) |

---

## Rules

1. **DO NOT create new documentation files** — cleanup only
2. **DO NOT refactor code logic** — only fix broken imports/routes
3. **DO NOT change design tokens or styling** — out of scope
4. **DO delete confidently** — orphaned scripts, tmp files, stale fix scripts
5. **DO update statuses** — task lists, changelogs, dynamic pages must reflect reality
6. **DO archive, don't delete** reports — always move to `/reports/archive/`
7. **ASK before deleting** any component, page, or data file — flag in summary instead
8. **NEVER suggest** refreshing browser, clearing cache, or restarting dev server — this is Figma Make
