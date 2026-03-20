# Archive Guidelines — Review, Repurpose & Archive Guideline Files

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `archive guidelines`  
**Repeatable:** Yes — run periodically to keep `/guidelines/` clean  
**Estimated Duration:** 1 session (15-25 minutes)

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Master entry point, reading order, file structure
- `/guidelines/rules/file-organization.md` — File placement rules

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Purpose

Review all guideline files in `/guidelines/` (and subdirectories). Identify outdated, duplicate, or superseded guidelines. Archive guidelines that no longer match the codebase. Consolidate fragmented guidelines covering the same topic. Ensure every active guideline is referenced from the appropriate overview or entry-point file.

---

## Classification Rules

### Active Guideline (KEEP)

A guideline is **active** if it accurately describes current codebase patterns, components, or rules. Indicators:

- Referenced components/files still exist in the codebase
- Rules described are still enforced
- Listed in `Guidelines.md` reading order or referenced by prompts
- Not contradicted by a newer guideline

**Action:** Keep in place. Verify cross-references are correct.

### Outdated Guideline (UPDATE or ARCHIVE)

A guideline is **outdated** if it describes patterns or components that have changed. Indicators:

- References components, files, or patterns that no longer exist
- Describes deprecated approaches (e.g., lucide-react as primary, old token names)
- Contains stale examples that don't match current code
- Has an `-UPDATED` variant (e.g., `cta-patterns.md` + `cta-patterns-UPDATED.md`)

**Action — minor drift:** Update the guideline to match current codebase.  
**Action — major drift:** Archive and create a replacement if needed.  
**Action — has UPDATED variant:** Merge the updated content into the original, delete the `-UPDATED` file.

### Duplicate Guideline (MERGE)

A guideline is a **duplicate** if another file covers the same topic with overlapping content. Indicators:

- Two files with similar names (e.g., `spacing.md` + `MODERN-SPACING.md`)
- Content overlap > 50%
- One is clearly a newer/better version of the other

**Action:** Merge the best content into the canonical file. Archive the duplicate.

### Orphaned Guideline (FLAG)

A guideline is **orphaned** if no prompt, overview, or entry-point file references it. Indicators:

- Not listed in `Guidelines.md` reading order
- Not referenced by any prompt file's `Guideline References` section
- Not imported or linked from any other guideline

**Action:** Determine if it should be linked from an overview file (fix the gap) or archived (truly unused).

---

## Steps

### Step 1: Inventory All Guideline Files

1. List all `.md` files in `/guidelines/` recursively (all subdirectories)
2. Exclude `Guidelines.md` itself (master entry point, never archive)
3. Exclude `_templates/` directory (template files, separate concern)
4. Build the review list with full paths

### Step 2: Cross-Reference Check

For each guideline file:

1. **Check Guidelines.md** — is it listed in the reading order or referenced anywhere?
2. **Check prompt files** — does any prompt reference it in its `Guideline References` section?
3. **Check other guidelines** — does any overview file link to it?
4. **Check codebase** — do the components/patterns it describes still exist?

Build a reference map:

| Guideline File | In Guidelines.md? | Referenced by Prompts? | Referenced by Other Guidelines? | Codebase Match? |
|---------------|-------------------|----------------------|-------------------------------|----------------|

### Step 3: Classify Each Guideline

Using the reference map and content review:

| # | File | Classification | Reasoning | Action |
|---|------|---------------|-----------|--------|
| 1 | `components/Header.md` | Active | Component exists, referenced by audit-header | Keep |
| 2 | `cta-patterns-UPDATED.md` | Duplicate | Updated version of cta-patterns.md | Merge |
| 3 | `old-routing.md` | Outdated | Describes deprecated routing approach | Archive |

### Step 4: Merge Duplicates

For each duplicate pair:

1. Compare both files — identify which has the better/newer content
2. Merge the best content into the canonical file
3. Delete the duplicate (not archive — it's been merged, content preserved)
4. Update any cross-references that pointed to the deleted file

### Step 5: Update Outdated Guidelines

For guidelines with minor drift:

1. Update examples to match current code
2. Fix references to renamed files/components
3. Update token names, icon library references, etc.
4. Update the file's version/date if it has frontmatter

### Step 6: Archive Truly Outdated Guidelines

For guidelines with major drift or that describe removed features:

1. Create `/guidelines/archive/` directory if it doesn't exist
2. Move to `/guidelines/archive/`
3. Add date prefix if not already dated

### Step 7: Fix Orphaned Guidelines

For orphaned guidelines that are still relevant:

1. Add them to the appropriate section in `Guidelines.md` reading order
2. Add them to relevant prompt files' `Guideline References` sections
3. Link them from the appropriate overview file

### Step 8: Update Guidelines.md

1. Remove any references to archived/deleted guideline files
2. Add references to any newly discovered unlinked guidelines
3. Verify the file structure diagram at the bottom matches reality
4. Update version and date

### Step 9: Summary

```
## Archive Guidelines Session — [Today's Date]

### Results
| Action | Count |
|--------|-------|
| Guidelines reviewed | [N] |
| Kept (active) | [N] |
| Updated (minor drift) | [N] |
| Merged (duplicates) | [N] |
| Archived (outdated) | [N] |
| Orphans linked (fixed) | [N] |
| Orphans archived | [N] |
| Guidelines.md references fixed | [N] |

### Merged Files
| Kept (Canonical) | Deleted (Merged Into Canonical) |
|-----------------|-------------------------------|
| `patterns/cta-patterns.md` | `patterns/cta-patterns-UPDATED.md` |

### Archived Files
| Original Location | Archive Location |
|-------------------|-----------------|
| `/guidelines/old-file.md` | `/guidelines/archive/YYYY-MM-DD-old-file.md` |

### Newly Linked Orphans
| File | Now Referenced From |
|------|-------------------|
| `patterns/name.md` | `Guidelines.md` Step 5, `audit.md` |
```

---

## Rules

1. **NEVER archive `Guidelines.md`** — it is the master entry point
2. **NEVER archive `_templates/` directory** — those are file templates
3. **NEVER archive `rules/*.md`** — mandatory rules are always active
4. **Never delete guideline files without merging first** — content must be preserved somewhere
5. **Preserve the reading order** in `Guidelines.md` — only remove entries for archived files
6. **One-way references** — guidelines reference other guidelines or design token files, never prompts

---

## Success Criteria

- [ ] All guideline files reviewed and classified
- [ ] No duplicate files covering the same topic
- [ ] No outdated guidelines with stale examples
- [ ] Every active guideline referenced from an entry point
- [ ] `Guidelines.md` file structure diagram matches reality
- [ ] Archive directory contains only truly superseded content
