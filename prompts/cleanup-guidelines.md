# Cleanup Guidelines — Guideline File Maintenance

**Type:** Audit + Cleanup  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `cleanup guidelines`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit all guideline files for duplicates, outdated content, non-standard formatting, and oversized files. Merge duplicates, deprecate outdated files, and restructure non-standard files using templates.

**When to Use:** Periodically (monthly) or when the `/guidelines/` directory feels cluttered or inconsistent.

---

## Workflow Steps

### Step 1: Inventory All Guideline Files

1. List every file in `/guidelines/` and all subdirectories.
2. Record each file's: name, location, line count, frontmatter status (has/missing), last updated date.
3. Flag files over 350 lines.
4. Flag files missing frontmatter.
5. Flag files with `Last Updated` older than 60 days.

### Step 2: Identify Duplicates

Compare file purposes and content to find:

1. **Exact duplicates** — same content in different locations.
2. **Near-duplicates** — files covering the same topic with overlapping content.
3. **Superseded files** — old files replaced by newer ones but not deprecated.

**Decision rule:** Keep the file in the most logical location per `/guidelines/Guidelines.md` file structure. Merge content into the canonical version.

### Step 3: Check Template Compliance

For each file:

1. Does it have the required frontmatter header? (Category, Version, Last Updated, Status, Template Used)
2. Does it follow a template structure from `/guidelines/_templates/`?

**Template selection:**

| Content Type | Template |
|---|---|
| Design tokens | `design-token-template.md` |
| Components | `component-template.md` |
| Processes/standards | `general-template.md` |
| Reports | `report-template.md` |
| Prompts | `prompt-template.md` |
| Task lists | `task-list-template.md` |

### Step 4: Merge or Deprecate

1. **If content is still valid:** Merge into the canonical file. Update version and frontmatter.
2. **If content is outdated:** Add deprecation notice.
3. **If content is empty or trivially small:** Delete after verifying zero references.

### Step 5: Verify Cross-References

After all merges/deprecations:

1. Search for broken links to deleted/moved files.
2. Update all references in `Guidelines.md` and other files.
3. Verify the trigger words table in `Guidelines.md` is complete.

### Step 6: Save Report

Save to `/reports/YYYY-MM/guidelines-cleanup-audit.md` with:
- Files audited (count)
- Files merged (count + details)
- Files deprecated (count + details)
- Files deleted (count + details)
- Remaining issues

### Step 7: Update Task List

Add any remaining cleanup tasks to `/tasks/task-list.md`.

---

## Success Criteria

- [ ] All guideline files have frontmatter (Category, Version, Last Updated, Status)
- [ ] Zero duplicate files (merged or deprecated)
- [ ] All files follow a template structure
- [ ] All files are under 350 lines
- [ ] Zero broken cross-references
- [ ] Report saved to `/reports/`

---

## Notes

- **Do NOT delete files without checking references first.** Use `file_search` to find all imports and links.
- **Prefer deprecation over deletion** for files that may have external references.
- **When rewriting files with templates:** copy meaningful content from the old file into the template structure.
