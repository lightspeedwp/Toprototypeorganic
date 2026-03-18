# Process Reports Orchestrator — Deep Report Processing

**Type:** Orchestrator  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `process reports deep`  
**Estimated Duration:** 1-2 hours

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Systematically process ALL reports in `/reports/`, verify findings against the codebase, create or update relevant task lists, and clean up resolved reports.

**Difference from `process reports`:** The basic `process reports` trigger organizes and archives reports. This orchestrator goes deeper — it reads each report's findings, verifies them against the codebase, extracts remaining open items into task lists, and deletes fully resolved reports.

**Success Criteria:**
- Zero reports with fully resolved findings remaining in `/reports/`
- All open findings have corresponding tasks in `/tasks/`
- Master task list reflects current project state
- CHANGELOG updated with processing session

---

## Protected Files (Never Delete)

- `/tasks/task-list.md`
- `/CHANGELOG.md`
- `/README.md`
- `/guidelines/Guidelines.md`

---

## Execution Steps

### Step 1: Inventory All Reports

List all files in `/reports/` recursively. For each report, record:
- File path
- Date (from header or filename)
- Key findings summary

### Step 2: Verify Each Report Against Codebase

For each report, verify whether its findings are still valid:

**Verification Methods:**
- **CSS findings:** Search for the specific CSS issues mentioned
- **Code findings:** Search for the specific imports, functions, or patterns mentioned
- **Data findings:** Check data files for the issues mentioned

**Classification:**
- **FULLY RESOLVED** — All findings addressed. No open items.
- **PARTIALLY RESOLVED** — Some findings addressed, some remain open.
- **ACTIVE** — Report feeds into ongoing work.
- **SUPERSEDED** — A newer report covers the same scope.

### Step 3: Process Each Report by Classification

#### FULLY RESOLVED Reports
1. Confirm all findings resolved via codebase search.
2. Move to `/reports/archive/YYYY-MM/`.
3. Note in session summary.

#### PARTIALLY RESOLVED Reports
1. Extract remaining open findings.
2. Add open findings to `/tasks/task-list.md`.
3. Keep the report.

#### ACTIVE Reports
1. Verify task list entries exist for the report's recommendations.
2. Create missing task entries if needed.
3. Keep the report.

#### SUPERSEDED Reports
1. Verify the newer report covers all content.
2. Move to `/reports/archive/YYYY-MM/`.
3. Note in session summary.

### Step 4: Update Task Lists

For each task list in `/tasks/`:
1. Cross-reference each task against the codebase.
2. Mark completed tasks as `[x]` with completion date.
3. Add new tasks discovered from report processing.
4. Remove duplicate tasks.

### Step 5: Update CHANGELOG

Add entry to `/CHANGELOG.md` under `[Unreleased]` -> `### Changed`:
```
- Report processing session: Processed X reports, archived Y resolved, created Z new tasks
```

### Step 6: Summary

```
## Report Processing — [Today's Date]

| Action | Count | Details |
|---|---|---|
| Reports reviewed | X | |
| Reports archived (resolved) | Y | [list filenames] |
| Reports kept (active) | Z | [list filenames] |
| New tasks created | N | [list tasks] |
| Tasks marked complete | M | [list tasks] |
```

---

## Guard Rails

- **NEVER delete a report without first verifying findings in the codebase**
- **NEVER delete protected files**
- **NEVER delete reports from the current day** unless explicitly told to
- **Always update CHANGELOG after changes**
- **When in doubt, keep the report** — false deletion is worse than clutter
- **Archive, don't delete** — move resolved reports to `/reports/archive/`
