# Archive Reports — Review, Repurpose & Archive Report Files

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `archive reports`  
**Repeatable:** Yes — run periodically to keep `/reports/` clean  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Guideline References (Read-Only)

- `/guidelines/rules/file-organization.md` — File placement rules
- `/guidelines/rules/workflow.md` — Task/report workflow
- `/guidelines/prompts/report-naming.md` — Report naming conventions

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Purpose

Review all report files across the project. Classify each as **General** (methodology/template worth keeping as a reference) or **Specific** (point-in-time audit result). Archive resolved specific reports. Promote general reports that contain reusable methodology into reference documents.

---

## Classification Rules

### General Report (PROMOTE)

A report is **general** if it contains reusable methodology, reference tables, or patterns that remain useful over time. Indicators:

- Contains a reusable checklist or audit methodology
- Includes reference tables (icon mappings, token lists, migration guides)
- Describes a repeatable process or workflow
- Content is not tied to a specific date or snapshot

**Action:** Move to `/docs/` as a reference document, or extract the reusable parts into a guideline file in `/guidelines/`.

### Specific Report (ARCHIVE)

A report is **specific** if it captures a point-in-time audit result or one-time analysis. Indicators:

- Dated results (grades, counts, file lists from a specific scan)
- All issues documented have been resolved
- Superseded by a newer report covering the same audit
- References a specific version or state of the codebase

**Action:** Move to `/reports/archive/` (create the directory if needed).

### Active Report (KEEP)

A report is **active** if it has unresolved issues or tasks that still need attention.

**Action:** Keep in `/reports/` or `/reports/YYYY-MM/`. Do NOT archive.

---

## Steps

### Step 1: Inventory All Reports

1. List all `.md` files in `/reports/` (including subdirectories)
2. Check for stray reports in wrong locations: `/`, `/docs/`, `/src/`, `/tasks/`
3. Move any misplaced reports to `/reports/` first
4. Build the review list

### Step 2: Classify Each Report

For each report file:

1. **Read the file** — understand its scope and status
2. **Check for open issues** — any `[ ]` unchecked items? Any "Open Issues" sections with remaining work?
3. **Check for superseding reports** — is there a newer report covering the same audit?
4. **Classify** as General, Specific (resolved), Specific (superseded), or Active

Output a classification table:

| # | File | Classification | Open Issues | Reasoning | Action |
|---|------|---------------|-------------|-----------|--------|
| 1 | `tokens-audit.md` | Specific (resolved) | 0 | All issues fixed | Archive |
| 2 | `icon-mapping-reference.md` | General | N/A | Reusable mapping table | Promote to /docs/ |
| 3 | `css-audit-march.md` | Active | 5 | Unresolved issues remain | Keep |

### Step 3: Promote General Reports

For each report classified as **General**:

1. Determine best destination:
   - Methodology/process → `/docs/`
   - Design system reference → `/guidelines/` (appropriate subdirectory)
   - Migration reference → `/docs/`
2. Move the file to the destination
3. Update any cross-references in task files or other reports

### Step 4: Archive Specific Reports

For each report classified as **Specific (resolved)** or **Specific (superseded)**:

1. Create `/reports/archive/` directory if it doesn't exist
2. Move to `/reports/archive/`
3. Ensure filename has date prefix: `YYYY-MM-DD-description.md`
4. If superseded, add a note at the top: `> Superseded by: [path to newer report]`

### Step 5: Clean Up Active Reports

For reports classified as **Active**:

1. Verify they are in the correct location (`/reports/` or `/reports/YYYY-MM/`)
2. Ensure filenames follow naming conventions
3. Check that corresponding tasks exist in `/tasks/task-list.md`

### Step 6: Summary

```
## Archive Reports Session — [Today's Date]

### Results
| Action | Count |
|--------|-------|
| Reports reviewed | [N] |
| Promoted to /docs/ or /guidelines/ | [N] |
| Archived (resolved) | [N] |
| Archived (superseded) | [N] |
| Kept (active) | [N] |
| Misplaced reports moved | [N] |

### Promoted Files
| Original Location | New Location | Reason |
|-------------------|-------------|--------|
| `/reports/name.md` | `/docs/name.md` | Reusable methodology |

### Archived Files
| Original Location | Archive Location |
|-------------------|-----------------|
| `/reports/name.md` | `/reports/archive/YYYY-MM-DD-name.md` |

### Active Reports (kept)
| File | Open Issues |
|------|-------------|
| `/reports/name.md` | [N] |
```

---

## Rules

1. **Never delete reports** — always archive or promote
2. **Never archive reports with open issues** — those are still active
3. **Preserve original content** when archiving — just move the file
4. **Date-prefix archived files** — `YYYY-MM-DD-description.md`
5. **Update cross-references** — if a report is promoted, update any files that link to it

---

## Success Criteria

- [ ] All report files reviewed and classified
- [ ] No stray reports in wrong directories
- [ ] Resolved/superseded reports archived
- [ ] General-purpose reports promoted to reference docs
- [ ] Active reports confirmed with corresponding tasks
- [ ] All filenames follow naming conventions
