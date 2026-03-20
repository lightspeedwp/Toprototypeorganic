# Archive Prompts — Review, Repurpose & Archive Prompt Files

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `archive prompts`  
**Repeatable:** Yes — run periodically to keep `/prompts/` clean  
**Estimated Duration:** 1 session (15-30 minutes)

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Trigger words table
- `/guidelines/prompts/trigger-words.md` — Categorised trigger word reference
- `/guidelines/rules/file-organization.md` — File placement rules

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Purpose

Review all prompt files in `/prompts/` that do NOT have a trigger word. Classify each as **General** (reusable) or **Specific** (one-time/page-specific). Repurpose general prompts into the trigger word system. Archive specific prompts that have already been executed.

---

## Classification Rules

### General Prompt (REPURPOSE)

A prompt is **general** if it can be reused across different pages, components, or contexts with little to no modification. Indicators:

- References a *type* of work, not a *specific* page or component
- Instructions apply broadly (e.g., "audit all CSS files" not "fix the Tours page CSS")
- Could be run again in the future on different targets
- Describes a repeatable workflow or methodology

**Action:** Update the prompt to remove specific references, add proper frontmatter (Type, Version, Trigger Word, Status), add Guideline References section, add Environment Reminder, then register it as a new trigger word.

### Specific Prompt (ARCHIVE)

A prompt is **specific** if it was created for a one-time task tied to a particular page, feature, or moment in time. Indicators:

- References a specific page by name (e.g., "Destinations page hero")
- References a specific data file or component by path
- Was created to solve a particular bug or issue
- Contains dates or version-specific instructions
- The work described has already been completed

**Action:** Move to `/prompts/archive/` with a date prefix if not already dated.

### Uncertain (FLAG)

If classification is unclear, flag for user review — do NOT auto-archive.

---

## Steps

### Step 1: Inventory Non-Trigger Prompts

1. List all `.md` files in `/prompts/` (top-level only)
2. Exclude files that already have a `Trigger Word:` in their frontmatter
3. Exclude subdirectories (`/prompts/archive/`, `/prompts/utilities/`, etc.)
4. Build the review list

### Step 2: Classify Each Prompt

For each non-trigger prompt file:

1. **Read the file** — understand its purpose, scope, and specificity
2. **Check if work was completed** — look for completion markers, check if referenced files/pages exist and match the prompt's goals
3. **Classify** as General, Specific, or Uncertain
4. **Record** the classification with reasoning

Output a classification table:

| # | File | Classification | Reasoning | Action |
|---|------|---------------|-----------|--------|
| 1 | `example-prompt.md` | General | Describes reusable CSS audit methodology | Repurpose |
| 2 | `fix-tours-hero.md` | Specific | One-time fix for tours hero, work complete | Archive |

### Step 3: Repurpose General Prompts

For each prompt classified as **General**:

1. **Choose a trigger word** — short, descriptive, follows existing naming patterns
2. **Update the file** with proper frontmatter:
   ```markdown
   # [Title] — [Subtitle]

   **Type:** [Audit/Maintenance/Migration/Scaffold/Utility]  
   **Version:** 1.0.0  
   **Created:** [Original date or today]  
   **Status:** Active  
   **Trigger Word:** `[chosen trigger word]`  
   **Repeatable:** Yes  
   **Estimated Duration:** 1 session ([estimate])

   ---

   ## Guideline References (Read-Only)

   - [relevant guideline files]

   ---

   ## Environment Reminder

   You are working inside **Figma Make** — a sandboxed web IDE...

   ---
   ```
3. **Remove specific references** — replace page/component names with generic placeholders or instructions
4. **Add to trigger word tables:**
   - `/guidelines/Guidelines.md` trigger words table
   - `/guidelines/prompts/trigger-words.md` in the appropriate category
5. **Rename the file** if needed to match trigger word conventions (e.g., `audit-[name].md`)

### Step 4: Archive Specific Prompts

For each prompt classified as **Specific**:

1. Create `/prompts/archive/` directory if it doesn't exist
2. Move the file to `/prompts/archive/`
3. Rename with date prefix if not already dated: `YYYY-MM-DD-original-name.md`

### Step 5: Handle Uncertain Prompts

List any uncertain prompts with context for the user to decide:

```
### Prompts Needing User Decision

| File | Why Uncertain | Recommendation |
|------|--------------|----------------|
| `name.md` | [explanation] | [lean towards archive/repurpose] |
```

### Step 6: Summary

```
## Archive Prompts Session — [Today's Date]

### Results
| Action | Count |
|--------|-------|
| Prompts reviewed | [N] |
| Repurposed (new trigger words) | [N] |
| Archived | [N] |
| Flagged for user review | [N] |
| Already had trigger words (skipped) | [N] |

### New Trigger Words Added
| Trigger | Prompt File | Category |
|---------|-------------|----------|
| [word] | [file] | [category] |

### Archived Files
| Original Location | Archive Location |
|-------------------|-----------------|
| `/prompts/name.md` | `/prompts/archive/YYYY-MM-DD-name.md` |

### Flagged for Review
- [list or "None"]
```

Update `/tasks/task-list.md` with any follow-up items.

---

## Rules

1. **Never archive a file that has an active trigger word** — those are part of the system
2. **Never delete prompt files** — always archive (move to `/prompts/archive/`)
3. **Preserve the original content** when archiving — just move the file
4. **When repurposing, keep the core methodology** — only remove specific references
5. **Run `update triggers`** after this prompt to verify sync
6. **One-way references only** — repurposed prompts reference guidelines, never other prompts circularly

---

## Success Criteria

- [ ] All non-trigger prompt files reviewed and classified
- [ ] General prompts repurposed with proper frontmatter and trigger words
- [ ] Specific/completed prompts archived to `/prompts/archive/`
- [ ] Trigger word tables updated for any new trigger words
- [ ] No useful prompts lost — everything either repurposed or archived
