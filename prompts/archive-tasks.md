# Archive Tasks — Review, Repurpose & Archive Task Files

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `archive tasks`  
**Repeatable:** Yes — run periodically to keep `/tasks/` clean  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Guideline References (Read-Only)

- `/guidelines/rules/file-organization.md` — File placement rules
- `/guidelines/rules/workflow.md` — Task/report workflow

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Purpose

Review all task files in `/tasks/`. Archive fully completed task files. Extract any reusable checklists or workflows from completed tasks into prompt files or guidelines. Consolidate fragmented task files. Ensure `task-list.md` is the single source of truth for active work.

---

## Classification Rules

### General Task File (REPURPOSE)

A task file is **general** if it contains a reusable workflow, checklist, or methodology that could serve as a prompt template. Indicators:

- Contains a multi-step process applicable to different targets
- Describes a repeatable review or audit workflow
- Includes checklists that could become audit criteria
- The methodology is more valuable than the specific tasks listed

**Action:** Extract the reusable methodology into a new prompt file in `/prompts/`, then archive the original task file.

### Completed Task File (ARCHIVE)

A task file is **completed** if ALL checkboxes are marked `[x]` or all items are noted as done. Indicators:

- Every task item is `[x]`
- Completion dates noted on items
- No "TODO" or "In Progress" markers remain

**Action:** Move to `/tasks/archive/`.

### Active Task File (KEEP)

A task file is **active** if it has unchecked `[ ]` items that still need work.

**Action:** Keep in `/tasks/`. Verify items are reflected in `task-list.md`.

### Stale Task File (FLAG)

A task file is **stale** if it has unchecked items but hasn't been touched in 30+ days and the work may no longer be relevant.

**Action:** Flag for user decision — the work may have been superseded or deprioritised.

---

## Steps

### Step 1: Inventory All Task Files

1. List all `.md` files in `/tasks/` (top-level only, not `/tasks/archive/`)
2. Identify `task-list.md` — this is the master file, NEVER archive it
3. Build the review list (everything except `task-list.md`)

### Step 2: Classify Each Task File

For each task file:

1. **Read the file** — count `[ ]` vs `[x]` items
2. **Check dates** — when was it last updated? Any completion dates?
3. **Assess reusability** — does the methodology have value beyond the specific tasks?
4. **Classify** as General, Completed, Active, or Stale

Output a classification table:

| # | File | [ ] Open | [x] Done | Classification | Action |
|---|------|----------|----------|---------------|--------|
| 1 | `css-fixes.md` | 0 | 12 | Completed | Archive |
| 2 | `audit-workflow.md` | 3 | 8 | Active | Keep |
| 3 | `old-migration.md` | 5 | 2 | Stale | Flag |

### Step 3: Repurpose General Task Files

For each task file classified as **General**:

1. Extract the reusable methodology into a draft prompt
2. Determine if it overlaps with an existing trigger word prompt
   - If overlap → merge the useful parts into the existing prompt
   - If unique → create a new prompt file with proper frontmatter
3. Archive the original task file after extraction

### Step 4: Archive Completed Task Files

For each completed task file:

1. Create `/tasks/archive/` directory if it doesn't exist
2. Move to `/tasks/archive/`
3. Add date prefix if not already dated

### Step 5: Consolidate Active Task Files

For active task files:

1. Check if their open items exist in `task-list.md`
   - Missing items → add to `task-list.md`
   - Duplicate items → deduplicate
2. If a task file has only 1-2 remaining items, consider merging them into `task-list.md` directly and archiving the file

### Step 6: Flag Stale Task Files

List stale files for user review:

```
### Stale Task Files — Need Decision

| File | Last Updated | Open Items | Recommendation |
|------|-------------|------------|----------------|
| `name.md` | [date] | [N] | Archive (likely superseded) / Keep (still relevant) |
```

### Step 7: Update task-list.md

1. Update `Last Updated` date to today
2. Remove any items that reference archived/completed task files
3. Ensure no duplicate entries
4. Verify all `[x]` items truly are complete

### Step 8: Summary

```
## Archive Tasks Session — [Today's Date]

### Results
| Action | Count |
|--------|-------|
| Task files reviewed | [N] |
| Repurposed (methodology extracted) | [N] |
| Archived (completed) | [N] |
| Kept (active) | [N] |
| Flagged (stale) | [N] |
| Items added to task-list.md | [N] |
| Items removed from task-list.md | [N] |

### Archived Files
| Original | Archive Location |
|----------|-----------------|
| `/tasks/name.md` | `/tasks/archive/name.md` |

### Methodology Extracted
| Source Task File | Destination |
|-----------------|-------------|
| `/tasks/name.md` | `/prompts/new-prompt.md` or merged into existing |

### Stale (awaiting user decision)
- [list or "None"]
```

---

## Rules

1. **NEVER archive or delete `task-list.md`** — it is the master task file
2. **Never delete task files** — always archive
3. **Preserve original content** when archiving
4. **Sync with `task-list.md`** — all active work must be reflected there
5. **One-way references** — extracted prompts reference guidelines, not back to task files

---

## Success Criteria

- [ ] All task files reviewed and classified
- [ ] Completed task files archived
- [ ] Reusable methodologies extracted into prompts
- [ ] `task-list.md` is accurate and deduplicated
- [ ] Stale files flagged with clear recommendation
- [ ] No orphaned tasks (every open item tracked in `task-list.md`)
