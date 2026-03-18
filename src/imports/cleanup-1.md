# Codebase Cleanup & Status Sync

**Type:** Audit + Cleanup + Status Update
**Version:** 2.0
**Created:** March 13, 2026
**Status:** Production
**Trigger:** User types `cleanup` (see `/guidelines/prompt-triggers.md`)
**Repeatable:** Yes — run weekly or after each major work session
**Estimated Duration:** 1 session (20-40 minutes)
**Companion:** Always followed by `/prompts/continue.md` unless user says otherwise

---

## Instructions

When triggered, execute ALL steps below IN ORDER within a single session. Do not create sub-prompts, orchestrators, or defer work to future sessions.

**Environment Reminder:** You are working inside **Figma Make**. Do NOT tell the user to refresh their browser, clear cache, restart dev servers, or run terminal commands — none of that applies here. All work is done via the file editing tools available in this environment.

**Design System Rules (apply to ALL generated/modified UI):**
- ALL styling via CSS variables from `/src/styles/theme-base.css` and `/src/styles/index.css`
- Typography: ONLY font faces defined in `/src/styles/fonts.css` — use `var(--font-primary)` and `var(--font-secondary)`
- Icons: `@phosphor-icons/react` only — zero `lucide-react`
- Router: `react-router` only — never `react-router-dom`
- NEVER delete service template files
- See `/guidelines/prompt-triggers.md` for protected files list

---

## Step 1 — Root Directory Cleanup

**Goal:** Root (`/`) contains ONLY config files + `README.md` + `CHANGELOG.md` + `ATTRIBUTIONS.md`.

1. List all files in `/` (root level only)
2. Any `.md` files that are NOT `README.md`, `CHANGELOG.md`, or `ATTRIBUTIONS.md` → **move** to correct location per `/guidelines/Guidelines.md` folder structure
3. Any `.sh` scripts → **move** to `/scripts/`
4. Any reports/tasks/prompts/guidelines in root → **move** to their correct folder
5. Delete empty or temp files (but NEVER protected files — see `/guidelines/housekeeping.md`)

**Output:** List what was moved/deleted, or confirm "Root is clean."

---

## Step 2 — Broken Import Audit

**Goal:** Zero broken imports across CSS and TypeScript files.

### 2a. CSS Imports
1. Read `/src/styles/index.css` — verify every `@import` path resolves to an actual file
2. Spot-check 5-10 template CSS files for broken `@import` references
3. **Fix** broken paths (correct the path, remove if file was intentionally deleted)

### 2b. TypeScript/TSX Imports
1. Search for `from 'lucide-react'` or `from "lucide-react"` — must be zero
2. Search for `from 'react-router-dom'` or `from "react-router-dom"` — must be zero
3. Search for imports referencing deleted directories (e.g., `/src/styles/bundles/`)
4. Check route files (`/src/app/routes/*.tsx`) — verify component imports resolve
5. **Fix** any broken imports found

**Output:** "[N] broken imports found and fixed" or "Zero broken imports."

---

## Step 3 — Route Completeness Check

**Goal:** Every template has a route; no routes point to missing templates.

1. List all `.tsx` files in `/src/app/components/templates/` (including subdirectories)
2. Read all route files in `/src/app/routes/` to build the registered route list
3. **Missing routes:** Templates with no route → add to the appropriate route file with correct path
4. **Dead routes:** Routes pointing to templates that don't exist → remove them
5. Do NOT remove any existing valid routes

**Output:** "[N] routes added, [N] dead routes removed" or "All routes complete."

---

## Step 4 — Orphaned File Scan

**Goal:** Flag files with zero importers.

1. Check for CSS files not imported by `index.css` AND not imported by any component
2. Check for data files in `/src/app/data/` not imported anywhere
3. Check for utility files in `/src/app/utils/` not imported anywhere
4. For confirmed orphans: **delete** (but NEVER service templates, NEVER protected files)
5. For uncertain files: **list them** in the output but leave them

**Output:** "[N] orphaned files deleted, [N] flagged for review" or "No orphans found."

---

## Step 5 — Task List Maintenance

**Goal:** Task trackers are current and tidy.

See `/guidelines/housekeeping.md` for detailed rules.

### 5a. Archive Completed Task Files
1. Read each `.md` in `/tasks/` (not subdirectories, not `task-list.md` or `master-task-list.md`)
2. If ALL tasks are `[x]` → move to `/tasks/archive/` (create dir if needed)
3. NEVER delete or move `task-list.md` — it is protected

### 5b. Update task-list.md
1. Update `Last Updated` date to today
2. Mark tasks `[x]` if the work is confirmed complete (check reports/changelog)
3. Remove duplicate entries
4. Ensure "Open Tasks" section accurately reflects current state

### 5c. Update master-task-list.md
1. Update `Last Updated` date to today
2. Recalculate Summary Dashboard counts and percentages
3. Mark any newly-completed categories

**Output:** "[N] files archived, task-list.md updated, master-task-list.md updated."

---

## Step 6 — Reports Cleanup

**Goal:** Reports folder is organized per `/guidelines/reporting.md`.

1. Check for reports in wrong locations (root, `/docs/`, `/src/`) → move to `/reports/`
2. Reports older than 30 days with no active references → flag (do NOT auto-delete)
3. Verify report filenames follow `YYYY-MM-DD-description.md` format

**Output:** "[N] reports moved, [N] flagged for archival" or "Reports clean."

---

## Step 7 — CHANGELOG Update

**Goal:** Changelog reflects all work since last update.

1. Read `/CHANGELOG.md`
2. Under `[Unreleased]`, add concise entries for any recent work not yet documented:
   - **Added:** New files, routes, features
   - **Changed:** Refactored code, updated configs
   - **Fixed:** Bug fixes, broken imports
   - **Removed:** Deleted files, dead code
3. Keep entries to 1-2 sentences each — no multi-paragraph walls
4. Follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format
5. NEVER delete existing entries

**Output:** "[N] changelog entries added" or "Changelog already current."

---

## Step 8 — SiteMap Template Sync

**Goal:** SiteMapTemplate reflects actual current routes.

1. Read `/src/app/components/templates/SiteMapTemplate.tsx`
2. Compare its page listings against the actual routes from Step 3
3. **Add** pages that exist in routes but are missing from the sitemap
4. **Remove** pages listed in the sitemap that no longer have routes
5. Update any statistics (page counts, section counts)
6. All styling must use CSS variables — no hardcoded values

**Output:** "[N] pages added, [N] removed from sitemap" or "Sitemap is current."

---

## Step 9 — DevTools Templates Update

**Goal:** DevTools pages show accurate live data.

Update these templates with current codebase values:

1. **DevToolsTemplate** — update file counts, component counts, route counts
2. **CodeQualityDashboardTemplate** — update metrics, compliance scores, icon library name (Phosphor)
3. **DesignTokensReferenceTemplate** — ensure token values match `/src/styles/theme-base.css`
4. **DeploymentReadinessTemplate** — update readiness checklist

For ALL: use CSS variables for styling, `var(--font-primary/secondary)` for fonts, `@phosphor-icons/react` for icons.

**Output:** "[N] DevTools templates updated" or "DevTools are current."

---

## Step 10 — Guidelines Quick-Check

**Goal:** Key guideline files are accurate.

1. Update `/docs/implementation-status.md` milestones and percentages
2. Verify `/guidelines/Guidelines.md` header has today's date
3. Spot-check 3-5 cross-reference links in Guidelines.md — fix any broken ones

**Output:** "[N] guideline issues fixed" or "Guidelines are current."

---

## Step 11 — Session Summary

Provide a final summary in this format:

```
## Cleanup Session — [Today's Date]

| Action | Count |
|--------|-------|
| Files moved/deleted | [N] |
| Imports fixed | [N] |
| Routes added/removed | [N] |
| Task files archived | [N] |
| Changelog entries | [N] |
| Sitemap changes | [N] |
| DevTools updated | [N] |
| Guideline fixes | [N] |

### Issues Requiring Manual Review
- [list anything unresolved, or "None"]
```

Add any discovered follow-up items to `/tasks/task-list.md`.

**This cleanup phase is complete.** If this was triggered by `cleanup` (not standalone), proceed to `/prompts/continue.md`.

---

**Prompt Location:** `/prompts/cleanup.md`
**Category:** Utilities
**Difficulty:** Medium
**Repeatable:** Yes
