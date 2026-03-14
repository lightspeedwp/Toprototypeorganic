# Report Processor Orchestrator

**Version:** 1.0
**Category:** Workflow Automation
**Trigger:** Run manually or after any audit completes
**Estimated Time:** 15-30 minutes per session

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. All file changes are live immediately. Use only the available tools. NEVER suggest terminal commands, browser refresh, cache clearing, or npm install.

---

## Objective

Process all reports in `/reports/` folder — extract actionable findings, create or update task lists, archive resolved reports, and synchronise the master task list.

---

## Phase 1: Inventory Active Reports

1. **Read `/reports/` directory** — List all non-archived report files
2. **For each report, extract:**
   - Report date
   - Scope/category
   - Total findings (Critical / High / Medium / Low)
   - Whether findings are resolved or open
   - Connected task list (if any)
   - Connected prompt (if any)

3. **Create inventory table:**

```markdown
| Report | Date | Findings | Open | Connected Tasks | Action |
|--------|------|----------|------|----------------|--------|
```

---

## Phase 2: Classify Each Report

For each report, determine action:

### Action: ARCHIVE
**Criteria:** ALL findings are resolved, 0 open tasks remain
**Steps:**
1. Create summary version in `/reports/archive/[filename]`
2. Delete original from `/reports/`
3. Update master task list to mark related tasks as complete

### Action: CREATE TASKS
**Criteria:** Report has open findings but NO connected task list exists
**Steps:**
1. Create task list in `/tasks/[report-name]-tasks.md` using template `/guidelines/_templates/task-list.md`
2. Extract each finding as a task with severity, file path, and fix description
3. Add entry to master task list `/tasks/task-list.md`

### Action: UPDATE TASKS
**Criteria:** Report has open findings AND a connected task list exists
**Steps:**
1. Read existing task list
2. Check which tasks are complete (cross-reference with current codebase)
3. Update checkboxes
4. Add any new findings not yet tracked
5. Update master task list progress

### Action: KEEP
**Criteria:** Report is active reference material (e.g., mapping documents, architecture references)
**Steps:**
1. No changes needed
2. Verify it's referenced in master task list

---

## Phase 3: Verify Findings Against Codebase

For each OPEN finding in active reports:

1. **Read the file referenced** in the finding
2. **Check if the violation still exists** at the specified line
3. **If resolved:** Mark task as complete, note resolution date
4. **If still present:** Keep task open, update line numbers if code has shifted

### Verification Commands

```
# Check for inline styles
file_search: content_pattern="style={{" name_pattern="**/*.tsx"

# Check for dark: classes
file_search: content_pattern="dark:" name_pattern="**/*.tsx"

# Check for hardcoded colors
file_search: content_pattern="#[0-9a-fA-F]{3,8}" name_pattern="**/styles/**/*.css"

# Check for non-approved fonts
file_search: content_pattern="font-family:" name_pattern="**/styles/**/*.css"
```

---

## Phase 4: Synchronise Master Task List

1. **Read `/tasks/task-list.md`**
2. **For each report-connected section:**
   - Update completion percentages
   - Tick off completed tasks
   - Add new task entries from Phase 2
3. **Update the header:**
   - Last Updated date
   - Status summary line
4. **Ensure every open task is actionable** (has a file path and clear fix description)

---

## Phase 5: Report Aging & Cleanup

1. **Reports older than 7 days:**
   - Verify ALL findings are resolved by checking codebase
   - If fully resolved → ARCHIVE
   - If partially resolved → UPDATE TASKS with remaining items
   - If unresolved → KEEP (flag as stale in master task list)

2. **Reports older than 30 days:**
   - Move to `/reports/archive/` regardless
   - Any open tasks should be promoted to standalone task lists

---

## Output

After processing, create a summary:

```markdown
## Report Processing Summary — [DATE]

**Reports Processed:** [N]
**Archived:** [N] (all findings resolved)
**Tasks Created:** [N] new task files
**Tasks Updated:** [N] existing task files
**Master Task List:** Updated with [N] new entries

### Actions Taken
1. [Report] → [Action taken]
2. [Report] → [Action taken]
```

---

## Acceptance Criteria

- [ ] Every report in `/reports/` has been reviewed
- [ ] All resolved reports are archived
- [ ] All open findings have corresponding task entries
- [ ] Master task list is current and accurate
- [ ] No orphaned tasks (task list without report) or orphaned reports (report without tasks)

---

## Related Guidelines

| Guideline | Purpose |
|-----------|---------|
| `/guidelines/_templates/report.md` | Report file template |
| `/guidelines/_templates/task-list.md` | Task list template |
| `/guidelines/prompts/report-naming.md` | Naming conventions |
| `/guidelines/Guidelines.md` | Master entry point |
