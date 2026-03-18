# Update Guidelines

**Type:** Maintenance  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `update guidelines`

---

## Prompt Purpose

**Objective:** Update guideline files to ensure they accurately reflect the current codebase and follow the standardized frontmatter/template format.

**When to Use:** After making changes to design tokens, components, CSS variables, routes, or any system that a guideline file documents.

---

## Workflow Steps

### Step 1: Identify Guidelines Needing Updates

Read the following to determine what changed:

1. Check `/src/styles/` for CSS variable changes (colors, spacing, typography, borders).
2. Check `/src/app/components/` for new or modified components.
3. Check `/src/app/routes/` for route changes.
4. Check `/CHANGELOG.md` `[Unreleased]` section for recent work.

### Step 2: For Each Guideline File That Needs Updating

**Read the file first.** Then apply these rules:

1. **Update the frontmatter:**
   - Increment `Version` (patch for fixes, minor for additions, major for rewrites).
   - Set `Last Updated` to today's date (`YYYY-MM-DD`).
   - Verify `Status` is correct (`Active`, `Draft`, or `Deprecated`).
   - Verify `Template Used` references the correct template.

2. **Verify content accuracy:**
   - CSS variable names must match what is in `/src/styles/`.
   - Component names must match what is in `/src/app/components/`.
   - File paths must be valid.

3. **Apply template structure:**
   - If the file does NOT follow a template from `/guidelines/_templates/`, rewrite it using the appropriate template as a base.
   - Rewriting with a template produces more consistent results than patching a non-standard file.

4. **Check file size:**
   - Guidelines must be under 350 lines.
   - If over, split into sub-files with a parent index.

### Step 3: Update Version History

Add a row to the Version History table at the bottom of each updated file.

### Step 4: Update Cross-References

If file names or locations changed, update all files that reference them:
- `/guidelines/Guidelines.md` (Quick Reference table)
- `/guidelines/_templates.md` (Template index)
- Any file that links to the updated guideline

---

## Success Criteria

- [ ] All updated files have current frontmatter (Version, Last Updated)
- [ ] All CSS variable references match `/src/styles/`
- [ ] All component references match `/src/app/components/`
- [ ] All files follow a template structure
- [ ] All files are under 350 lines
- [ ] Version History tables are updated
- [ ] Cross-references are valid

---

## Notes

- **Do NOT create new guideline files** unless existing files cannot cover the content. Check existing files first.
- **Prefer rewriting** non-standard files using a template over patching them.
- **This prompt does not create reports or task lists.** It is a maintenance operation.

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0.0 | 2026-03-15 | Initial creation |
