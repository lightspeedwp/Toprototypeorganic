# Update Guidelines — Sync Guideline Files with Codebase

**Type:** Maintenance  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update guidelines`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Update guideline files to ensure they accurately reflect the current codebase and follow standardized frontmatter/template format.

**When to Use:** After making changes to design tokens, components, CSS variables, routes, data files, or any system that a guideline file documents.

**This is NOT an audit.** This prompt does not create reports or task lists. It is a direct maintenance operation — read, verify, fix.

---

## Workflow Steps

### Step 1: Identify Guidelines Needing Updates

Read the following to determine what changed recently:

1. Check `/CHANGELOG.md` `[Unreleased]` section for recent work.
2. Check `/src/styles/` for CSS variable changes (colors, spacing, typography, borders).
3. Check `/src/app/components/` for new or modified components.
4. Check `/src/app/routes.ts` for route changes.
5. Check `/src/app/data/` for new or modified data files.

### Step 2: For Each Guideline File That Needs Updating

**Read the file first.** Then apply these rules:

1. **Update the frontmatter:**
   - Increment `Version` (patch for fixes, minor for additions, major for rewrites).
   - Set `Last Updated` to today's date (`YYYY-MM-DD`).
   - Verify `Status` is correct (`Active`, `Draft`, or `Deprecated`).

2. **Verify content accuracy:**
   - CSS variable names must match what is in `/src/styles/theme-base.css`, `theme-light.css`, `theme-dark.css`.
   - Font references must use only the 5 approved fonts:
     - `var(--font-family-lora)` — Lora (headings, editorial)
     - `var(--font-family-noto-sans)` — Noto Sans (body, UI)
     - `var(--font-family-caveat)` — Caveat (accent)
     - `var(--font-family-shadows)` — Shadows Into Light (decorative)
     - `var(--font-family-mono)` — Courier New (code)
   - Component names must match what is in `/src/app/components/`.
   - File paths must be valid.
   - Icon library references must say `lucide-react` (not Phosphor).
   - Router references must say `react-router` (not `react-router-dom`).

3. **Apply template structure:**
   - If the file does NOT follow a template from `/guidelines/_templates/`, rewrite it using the appropriate template.

4. **Check file size:**
   - Guidelines must be under 350 lines.
   - If over, split into sub-files with a parent index.

### Step 3: Update Version History

Add a row to the Version History table at the bottom of each updated file.

### Step 4: Update Cross-References

If file names or locations changed, update all files that reference them:
- `/guidelines/Guidelines.md` (trigger words table, quick reference)
- Any file that links to the updated guideline

---

## Success Criteria

- [ ] All updated files have current frontmatter (Version, Last Updated)
- [ ] All CSS variable references match `/src/styles/`
- [ ] All component references match `/src/app/components/`
- [ ] Only 5 approved font variables referenced
- [ ] Icon library = `lucide-react`, Router = `react-router`
- [ ] All files follow a template structure
- [ ] All files are under 350 lines
- [ ] Version History tables updated
- [ ] Cross-references are valid

---

## Notes

- **Do NOT create new guideline files** unless existing files cannot cover the content.
- **Prefer rewriting** non-standard files using a template over patching them.
- **This prompt does not create reports or task lists.** It is a maintenance operation.
