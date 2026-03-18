# Report Processing Orchestrator

**Type:** Orchestrator  
**Created:** 2026-03-13  
**Status:** Ready  
**Estimated Duration:** 1-2 hours per run

---

## Prompt Purpose

**Objective:** Systematically process all reports in `/reports/`, verify findings against the codebase, create or update relevant task lists, and clean up resolved reports.

**Expected Output:**
- Updated task lists in `/tasks/`
- Cleaned-up `/reports/` folder (resolved reports deleted)
- Updated `/tasks/master-task-list.md` with current status
- Updated `/CHANGELOG.md` with changes made

**Success Criteria:**
- Zero reports with fully resolved findings remaining in `/reports/`
- All open findings have corresponding tasks in `/tasks/`
- Master task list reflects current project state
- CHANGELOG updated with report processing session

---

## Prerequisites (REQUIRED — Read Before Running)

### Guidelines to Read FIRST

1. **[/guidelines/Guidelines.md](/guidelines/Guidelines.md)** — Canonical reference (read the Project Organisation Rules section)
2. **[/guidelines/housekeeping.md](/guidelines/housekeeping.md)** — Protected files, cleanup rules, archive policies
3. **[/guidelines/changelog-maintenance.md](/guidelines/changelog-maintenance.md)** — CHANGELOG format standards
4. **[/guidelines/_templates.md](/guidelines/_templates.md)** — Template usage guide (for creating new task lists)
5. **[/guidelines/data-files.md](/guidelines/data-files.md)** — Data system (for content-related findings)
6. **[/guidelines/design-tokens/css-variables-overview.md](/guidelines/design-tokens/css-variables-overview.md)** — Token system (for CSS-related findings)

### Template to Use for New Task Lists

Use `/guidelines/_templates/task-list-template.md` when creating new task lists.

### Protected Files (Never Delete)

- `/tasks/task-list.md`
- `/tasks/master-task-list.md`
- `/CHANGELOG.md`
- `/README.md`
- `/ATTRIBUTIONS.md`
- `/guidelines/Guidelines.md`

---

## Execution Steps

### Step 1: Inventory All Reports

List all files in `/reports/` recursively. For each report, record:
- File path
- Date (from report header or filename)
- Status (from report header)
- Key findings summary

### Step 2: Verify Each Report Against Codebase

For each report, verify whether its findings are still valid:

**Verification Methods:**
- **CSS findings:** Search for the specific CSS selectors, files, or patterns mentioned
- **Code findings:** Search for the specific imports, functions, or patterns mentioned
- **Architecture findings:** Verify file structures, naming conventions
- **Data findings:** Check data files for the issues mentioned

**Classification:**
- **FULLY RESOLVED** — All findings have been addressed. No open items.
- **PARTIALLY RESOLVED** — Some findings addressed, some remain open.
- **ACTIVE** — Report feeds into ongoing or upcoming work.
- **SUPERSEDED** — A newer report covers the same scope.

### Step 3: Process Each Report by Classification

#### FULLY RESOLVED Reports (older than 7 days)
1. Confirm all findings resolved via codebase search
2. Delete the report file
3. Note deletion in this session's summary

#### FULLY RESOLVED Reports (within 7 days)
1. Confirm all findings resolved
2. Flag for deletion in next cleanup session
3. Or delete now if you are certain

#### PARTIALLY RESOLVED Reports
1. Extract remaining open findings
2. Add open findings to appropriate task list:
   - General tasks → `/tasks/task-list.md`
   - Memory-specific → `/tasks/memory-reduction-tasks.md`
   - New initiative → Create new task list in `/tasks/`
3. Keep the report (don't delete)

#### ACTIVE Reports
1. Verify task list entries exist for the report's recommendations
2. Create missing task entries if needed
3. Keep the report (don't delete)

#### SUPERSEDED Reports
1. Verify the newer report covers all content
2. Delete the superseded report
3. Note deletion in this session's summary

### Step 4: Update Task Lists

For each task list in `/tasks/`:
1. Read the file
2. Cross-reference each task against the codebase
3. Mark completed tasks as `[x]` with completion date
4. Add new tasks discovered from report processing
5. Remove duplicate tasks

### Step 5: Update Master Task List

Update `/tasks/master-task-list.md`:
1. Refresh the Summary Dashboard table with current counts
2. Update completion percentages
3. Move fully completed sections to "Completed" area
4. Update "Recently Completed" section
5. Update "Next Session Recommendations"
6. Update the "Last Updated" date

### Step 6: Update CHANGELOG

Add an entry to `/CHANGELOG.md` under `[Unreleased]` → `### Changed`:
```
- **Report Processing Session — [Date]:** Processed X reports. Deleted Y fully resolved reports. Created Z new tasks. Updated master task list.
```

### Step 7: Summary

Output a summary table:

| Action | Count | Details |
|---|---|---|
| Reports reviewed | X | |
| Reports deleted (resolved) | Y | [list filenames] |
| Reports kept (active) | Z | [list filenames] |
| New tasks created | N | [list tasks] |
| Tasks marked complete | M | [list tasks] |

---

## Guard Rails

- **NEVER delete a report without first verifying findings in the codebase**
- **NEVER delete protected files** (see list above)
- **NEVER delete reports from the current day** unless explicitly told to
- **Always update master-task-list.md after any task changes**
- **Always update CHANGELOG.md after deletions or task changes**
- **When in doubt, keep the report** — false deletion is worse than clutter

---

## Scheduling

Run this orchestrator:
- **Weekly** as part of regular maintenance
- **After completing a major workflow** (e.g., after Workflow 3, before Workflow 4)
- **When triggered by `cleanup`** prompt trigger

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-13 | Initial creation |

---

**Maintainer:** LSX Design  
**Category:** Process  
**Status:** Active
