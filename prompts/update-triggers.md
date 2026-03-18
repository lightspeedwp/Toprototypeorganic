# Update Triggers — Trigger Word & Prompt Sync

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update triggers`  
**Repeatable:** Yes — run after creating, renaming, or deleting any prompt file  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Master trigger words table (lines 10-51)
- `/guidelines/prompts/trigger-words.md` — Full trigger word reference with categories

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Purpose

Synchronize the three sources of truth for trigger words:

1. **Prompt files** in `/prompts/*.md` — the actual executable prompts (each has a `Trigger Word:` in its frontmatter)
2. **Guidelines.md** trigger words table — the quick-reference lookup in `/guidelines/Guidelines.md`
3. **trigger-words.md** — the categorised reference in `/guidelines/prompts/trigger-words.md`

All three must agree. This prompt detects drift and fixes it.

---

## Reference Hierarchy (ONE-WAY — never circular)

```
/prompts/*.md (source of truth — each file declares its own trigger word)
    ↓ aggregated into
/guidelines/prompts/trigger-words.md (categorised reference)
    ↓ summarised into
/guidelines/Guidelines.md trigger words table (quick lookup)
```

**Direction of sync:** Prompt files → trigger-words.md → Guidelines.md  
**Never** the reverse — if a trigger word exists in Guidelines.md but has no prompt file, it must be removed from the table.

---

## Audit Steps

### Step 1: Inventory All Prompt Files

1. List all `.md` files in `/prompts/` (top-level only, not subdirectories)
2. For each file, extract:
   - Filename
   - `Trigger Word:` value from frontmatter (if present)
   - `Type:` value (Audit, Migration, Maintenance, Utility, Orchestrator, Scaffold)
   - `Version:` value
   - `Status:` value (Active, Deprecated, Draft)
   - One-line description (from the `# Title` heading)

3. Build a master inventory table:

| # | Prompt File | Trigger Word | Type | Version | Status | Description |
|---|-------------|-------------|------|---------|--------|-------------|

4. Separately list prompt files that have NO `Trigger Word:` in frontmatter — these are either:
   - Legacy/imported prompts (not part of the trigger system)
   - Missing frontmatter (needs fixing)

### Step 2: Cross-Reference with Guidelines.md

1. Read `/guidelines/Guidelines.md` — extract ALL entries from the trigger words table
2. Compare against Step 1 inventory:

**Missing from Guidelines.md** (prompt file exists with trigger word, but not in table):
- Add these to the table

**Orphaned in Guidelines.md** (table entry exists but no matching prompt file):
- Remove these from the table (or flag if the prompt file was accidentally deleted)

**Mismatched descriptions** (prompt file title doesn't match table description):
- Update the table description to match the prompt's actual purpose

### Step 3: Cross-Reference with trigger-words.md

1. Read `/guidelines/prompts/trigger-words.md` — extract all entries
2. Compare against Step 1 inventory
3. Apply same checks: missing, orphaned, mismatched
4. Ensure categories are correct:

**Expected categories in trigger-words.md:**
- **Core Workflow** — cleanup, continue, cleanup then continue, changelog, release
- **Scaffolding** — new block, new pattern, new template
- **Guideline Management** — cleanup guidelines, update guidelines, audit guidelines, guidelines audit
- **Report Management** — process reports, process reports deep
- **Design System Audits** — audit, audit tokens, audit css, audit styles, audit style, audit theme, apply bem
- **Content & Data Audits** — audit data, audit images
- **Accessibility & Layout Audits** — audit a11y, audit accessibility, audit responsive, audit layout
- **Routing & Functionality Audits** — audit routing, audit routes, audit functionality
- **Icons & Icon Migration** — audit phosphor, migrate phosphor
- **Template Parts** — audit header, audit footer, audit hero
- **Infrastructure** — audit webgl, audit memory, optimize memory, sitemap, status
- **Prompt Maintenance** — update triggers

### Step 4: Verify Frontmatter Consistency

For each active prompt file, verify it has the required frontmatter fields:
- `Type:` — present and valid
- `Version:` — present, follows semver
- `Trigger Word:` — present (for trigger-word prompts)
- `Status:` — present (Active/Deprecated/Draft)

Flag any files missing required fields.

### Step 5: Check for Circular References

Scan all prompt files for cross-references to other prompt files:
```
file_search: content_pattern="/prompts/" name_pattern="**/prompts/*.md"
```

Verify ALL cross-references are ONE-WAY:
- `Followed by:` — acceptable (downstream)
- `Prerequisite:` — acceptable (upstream dependency)
- `Companion:` — **NOT ALLOWED** (creates circular references) — remove if found
- Mutual references between two prompts — **NOT ALLOWED** — fix by making one the prerequisite

### Step 6: Update Count

Count total trigger words (unique triggers with their own prompt files + combos like "cleanup then continue").

Update the count in:
- `/CHANGELOG.md` (latest entry)
- Any references to "Total trigger words: N"

### Step 7: Apply Fixes

1. Update `/guidelines/Guidelines.md` trigger words table
2. Update `/guidelines/prompts/trigger-words.md` categorised table
3. Fix any prompt frontmatter issues found in Step 4
4. Remove any circular references found in Step 5

### Step 8: Generate Summary

```
## Trigger Word Sync — [Today's Date]

### Inventory
- Total prompt files in /prompts/: [N]
- Prompt files WITH trigger words: [N]
- Prompt files WITHOUT trigger words (legacy): [N]
- Total unique trigger words: [N]
- Combo triggers: [N]

### Changes Made
| Action | Count |
|--------|-------|
| Added to Guidelines.md table | [N] |
| Removed from Guidelines.md table | [N] |
| Added to trigger-words.md | [N] |
| Removed from trigger-words.md | [N] |
| Frontmatter fixed | [N] |
| Circular references removed | [N] |
| Descriptions updated | [N] |

### Issues Requiring Review
- [list or "None"]
```

---

## Success Criteria

- [ ] Every prompt file with a trigger word appears in Guidelines.md table
- [ ] Every prompt file with a trigger word appears in trigger-words.md
- [ ] No orphaned entries in either table (entry without matching prompt file)
- [ ] No circular references between prompts
- [ ] All descriptions match actual prompt purpose
- [ ] Trigger word count is accurate
- [ ] All prompt frontmatter has required fields
