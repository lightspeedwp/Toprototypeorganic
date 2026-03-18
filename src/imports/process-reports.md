# Process Reports — Organize and Archive Reports

**Type:** Utility  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `process reports`

---

## Prompt Purpose

**Objective:** Audit the `/reports/` directory — move misplaced reports, rename non-conforming files, archive old reports, and ensure directory structure follows conventions.

**When to Use:** Monthly or when the reports directory becomes cluttered.

---

## Workflow Steps

### Step 1: Inventory Reports

1. List all files in `/reports/` and subdirectories.
2. Check for reports in wrong locations (root `/`, `/docs/`, `/src/`, `/guidelines/`).
3. Record each report's: filename, location, date, and whether it follows naming convention.

### Step 2: Fix Locations

1. Move any reports found outside `/reports/` to the correct subdirectory.
2. Create monthly subdirectories as needed: `/reports/YYYY-MM/`.

### Step 3: Fix Naming

All report filenames must follow: `YYYY-MM-DD-description.md`

- Date first (ISO 8601)
- Lowercase, hyphen-separated description
- `.md` extension

Rename non-conforming files.

### Step 4: Archive Old Reports

1. Reports older than 60 days with zero references from active task lists → flag for archival.
2. Move flagged reports to `/reports/archive/YYYY-MM/`.
3. Do NOT auto-delete — archive only.

### Step 5: Summary

Output:
```
## Reports Processing — [Today's Date]

| Action | Count |
|--------|-------|
| Reports moved to correct location | [N] |
| Reports renamed | [N] |
| Reports archived | [N] |
| Active reports remaining | [N] |
```

---

## Success Criteria

- [ ] Zero reports outside `/reports/` directory
- [ ] All filenames follow `YYYY-MM-DD-description.md` convention
- [ ] Old reports archived (not deleted)
- [ ] Monthly subdirectories exist for all active reports
