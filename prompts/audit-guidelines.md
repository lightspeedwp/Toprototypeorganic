# Audit Guidelines — Guideline File Standards Audit

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit guidelines`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Verify all guideline files in `/guidelines/` conform to frontmatter standards, heading hierarchy rules, file size limits, and template compliance. Identify and fix non-conforming files.

**When to Use:** After creating or updating guideline files, or periodically to enforce documentation standards.

---

## Workflow Steps

### Step 1: Inventory All Guidelines

1. List every `.md` file in `/guidelines/` and all subdirectories.
2. For each file, record: path, line count, has frontmatter (yes/no).

### Step 2: Frontmatter Compliance

Every guideline file MUST have these metadata fields near the top:

```markdown
# Document Title

**Category:** [Development/Process/Standards/Core]  
**Version:** [X.Y.Z]  
**Last Updated:** [YYYY-MM-DD]  
**Status:** [Draft/Active/Deprecated]  
**Template Used:** [template filename or "Canonical"]
```

Check:
1. Has all 5 frontmatter fields? Flag missing fields.
2. Version follows SemVer (`X.Y.Z`)? Flag non-compliant versions.
3. Last Updated is a valid date? Flag stale dates.
4. Status is one of: Draft, Active, Deprecated? Flag other values.

### Step 3: Heading Hierarchy

1. **One H1 only** — the document title. Flag files with multiple H1s.
2. **Sequential headings** — H2 -> H3 -> H4. Flag skipped levels.

### Step 4: File Size Check

1. Flag any guideline file over 350 lines.
2. Suggest split strategies for oversized files.

### Step 5: Template Compliance

1. Read templates in `/guidelines/_templates/`.
2. For each guideline, determine which template it should follow.
3. Flag files that deviate significantly from their template structure.

### Step 6: Fix and Report

1. Add missing frontmatter to files that lack it.
2. Fix heading hierarchy violations.
3. Save report to `/reports/YYYY-MM/guidelines-standards-audit.md`.

---

## Success Criteria

- [ ] All guideline files have complete frontmatter (5 fields)
- [ ] All files have exactly one H1
- [ ] All files use sequential heading levels
- [ ] All files are under 350 lines
- [ ] Report saved to `/reports/`
