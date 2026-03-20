# Codebase Cleanup & Status Sync

**Type:** Audit + Cleanup + Status Update  
**Version:** 4.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `cleanup`  
**Repeatable:** Yes — run weekly or after each major work session  
**Estimated Duration:** 1 session (20-40 minutes)  
**Followed by:** Type `continue` after this completes to resume the next open task.

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately. Use only the tools available: `read`, `write_tool`, `fast_apply_tool`, `edit_tool`, `delete_tool`, `file_search`, and `bash` (node_modules only).

---

## Guideline References (Read-Only)

- `/guidelines/rules/design-system-rules.md` — Styling compliance
- `/guidelines/rules/file-organization.md` — File placement rules
- `/guidelines/overview-components.md` — Component architecture

---

## Design System Rules (apply to ALL generated/modified UI)

- ALL styling via CSS variables from `/src/styles/theme-base.css`, `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`
- Typography: ONLY 5 approved font faces via variables:
  - `var(--font-family-lora)` — Headings, editorial
  - `var(--font-family-noto-sans)` — Body, UI
  - `var(--font-family-caveat)` — Accent (sparingly)
  - `var(--font-family-shadows)` — Decorative (very sparingly)
  - `var(--font-family-mono)` — Code, technical
- Icons: `@phosphor-icons/react` (default) — `lucide-react` is legacy
- Router: `react-router` only — never `react-router-dom`
- Zero Margin Policy: flex/grid gaps only for layout spacing
- NEVER delete service template files or protected files

---

## Instructions

When triggered, execute ALL steps below IN ORDER within a single session. Do not create sub-prompts, orchestrators, or defer work to future sessions.

---

## Step 1 — Root Directory Cleanup

**Goal:** Root (`/`) contains ONLY config files + `README.md` + `CHANGELOG.md` + `ATTRIBUTIONS.md`.

1. List all files in `/` (root level only)
2. Any `.md` files that are NOT `README.md`, `CHANGELOG.md`, or `ATTRIBUTIONS.md` -> **move** to correct location per `/guidelines/Guidelines.md` folder structure
3. Any reports/tasks/prompts/guidelines in root -> **move** to their correct folder
4. Delete empty or temp files (but NEVER protected files)

**Output:** List what was moved/deleted, or confirm "Root is clean."

---

## Step 2 — Broken Import Audit

**Goal:** Zero broken imports across CSS and TypeScript files.

### 2a. CSS Imports
1. Read `/src/styles/index.css` — verify every `@import` path resolves to an actual file
2. Read `/src/styles/global.css` — verify its unique imports resolve
3. Spot-check 5-10 CSS files for broken `@import` references
4. **Fix** broken paths

### 2b. TypeScript/TSX Imports
1. Search for `from 'react-router-dom'` or `from "react-router-dom"` — must be zero
2. Search for imports referencing deleted directories
3. Check route file (`/src/app/routes.ts`) — verify component imports resolve
4. Flag any `lucide-react` imports — these are migration targets (do not fix here, just count)
5. **Fix** any broken imports found

**Output:** "[N] broken imports found and fixed, [N] lucide-react files remaining" or "Zero broken imports."

---

## Step 3 — Route Completeness Check

**Goal:** Every page has a route; no routes point to missing pages.

1. List all page `.tsx` files in `/src/app/pages/` (including subdirectories)
2. Read `/src/app/routes.ts` to build the registered route list
3. **Missing routes:** Pages with no route -> add to routes with correct path
4. **Dead routes:** Routes pointing to pages that don't exist -> remove them
5. Do NOT remove any existing valid routes

**Output:** "[N] routes added, [N] dead routes removed" or "All routes complete."

---

## Step 4 — Orphaned File Scan

**Goal:** Flag files with zero importers.

1. Check for CSS files not imported by `index.css` or `global.css` AND not imported by any component
2. Check for data files in `/src/app/data/` not imported anywhere
3. Check for utility files not imported anywhere
4. For confirmed orphans: **delete** (but NEVER protected files)
5. For uncertain files: **list them** in output but leave them

**Output:** "[N] orphaned files deleted, [N] flagged for review" or "No orphans found."

---

## Step 5 — Task List Maintenance

**Goal:** Task trackers are current and tidy.

### 5a. Archive Completed Task Files
1. Read each `.md` in `/tasks/` (not subdirectories, not `task-list.md`)
2. If ALL tasks are `[x]` -> move to `/tasks/archive/`
3. NEVER delete or move `task-list.md`

### 5b. Update task-list.md
1. Update `Last Updated` date to today
2. Mark tasks `[x]` if work is confirmed complete
3. Remove duplicate entries

**Output:** "[N] files archived, task-list.md updated."

---

## Step 6 — Reports Cleanup

**Goal:** Reports folder is organized.

1. Check for reports in wrong locations (root, `/docs/`, `/src/`) -> move to `/reports/`
2. Reports older than 30 days with no active references -> flag (do NOT auto-delete)
3. Verify report filenames follow `YYYY-MM-DD-description.md` or categorical format

**Output:** "[N] reports moved, [N] flagged for archival" or "Reports clean."

---

## Step 7 — CHANGELOG Update

**Goal:** Changelog reflects all work since last update.

1. Read `/CHANGELOG.md`
2. Under `[Unreleased]`, add concise entries for any recent work not yet documented
3. Keep entries to 1-2 sentences each
4. Follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format
5. NEVER delete existing entries

**Output:** "[N] changelog entries added" or "Changelog already current."

---

## Step 8 — DevTools Sync

**Goal:** DevTools hub and pages reflect current codebase state.

1. Verify DevTools hub at `/dev-tools` lists all 12 dev-tools pages
2. Check Route Map page reflects current routes from `/src/app/routes.ts`
3. Check Mock Data Explorer references current data files
4. All dev-tools styling must use CSS variables — no hardcoded values

**Output:** "[N] DevTools pages updated" or "DevTools are current."

---

## Step 9 — Guidelines Quick-Check

**Goal:** Key guideline files are accurate.

1. Verify `/guidelines/Guidelines.md` version and date are current
2. Verify trigger words table is complete (count prompts in `/prompts/` vs table entries)
3. Spot-check 3-5 cross-reference links — fix any broken ones

**Output:** "[N] guideline issues fixed" or "Guidelines are current."

---

## Step 10 — Session Summary

Provide a final summary:

```
## Cleanup Session — [Today's Date]

| Action | Count |
|--------|-------|
| Files moved/deleted | [N] |
| Imports fixed | [N] |
| Routes added/removed | [N] |
| Task files archived | [N] |
| Changelog entries | [N] |
| DevTools changes | [N] |
| Guideline fixes | [N] |
| lucide-react files remaining | [N] |

### Issues Requiring Manual Review
- [list anything unresolved, or "None"]
```

Add any discovered follow-up items to `/tasks/task-list.md`.

**This cleanup phase is complete.**

**Recommended follow-up triggers:**
- `archive` — Run full archive sweep (prompts, reports, tasks, guidelines). **Strongly recommended** after cleanup to ensure archived items are properly filed.
- `continue` — Resume next open task from `task-list.md`
- `cleanup then continue` — If triggered by this combo, proceed to run `archive` first, then `continue`.

---

## Step 11 — Archive Invocation (Auto)

After cleanup completes, **automatically invoke** the `archive` trigger by reading and executing `/prompts/archive.md`. This ensures:

1. Completed prompts without trigger words are repurposed or archived
2. Resolved reports are archived or promoted
3. Completed task files are archived
4. Outdated guidelines are merged, updated, or archived

If the user explicitly says "skip archive" or "cleanup only", skip this step.