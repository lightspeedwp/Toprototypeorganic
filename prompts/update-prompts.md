# Update Prompts — Sync Prompt Files with Codebase

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update prompts`  
**Repeatable:** Yes — run after major codebase restructuring  
**Estimated Duration:** 1 session (15-25 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Trigger words table
- `/guidelines/prompts/trigger-words.md` — Categorised reference

---

## Purpose

Update all active trigger-word prompt files to ensure their instructions, file references, and guideline references match the current codebase. Unlike `archive prompts` (which classifies and archives), this prompt **updates active prompts in place**.

---

## Steps

### Step 1: Validate File References

For each active prompt file with a trigger word:

1. Extract all file paths mentioned in the prompt (e.g., `/src/app/routes.ts`, `/guidelines/rules/design-system-rules.md`)
2. Verify each referenced file exists
3. Fix broken references — update to current path or remove if file was deleted

### Step 2: Validate Guideline References

1. Check each prompt's `Guideline References (Read-Only)` section
2. Verify all linked guideline files exist
3. Add missing guideline references that are relevant to the prompt's scope
4. Remove references to archived/deleted guidelines

### Step 3: Validate Frontmatter

For each prompt, verify:
- `Type:` is present and accurate
- `Version:` follows semver
- `Trigger Word:` matches the filename convention
- `Status:` is Active, Deprecated, or Draft
- `Estimated Duration:` is present
- `Repeatable:` is present

Fix any missing or incorrect frontmatter.

### Step 4: Update Design System Reminders

Check that prompts which generate or modify UI code include the current design system rules:
- CSS variables only (no hardcoded values)
- 5 approved fonts
- `@phosphor-icons/react` as default icon library
- Zero Margin Policy
- No inline styles

Update prompts with stale or missing design system reminders.

### Step 5: Verify One-Way References

Scan for circular references between prompts:
- `Companion:` — remove (not allowed)
- Mutual `See also:` references — make one-way
- Ensure reference hierarchy: prompts → guidelines, orchestrators → sub-prompts

### Step 6: Summary

```
## Update Prompts Session — [Today's Date]

| Action | Count |
|--------|-------|
| Prompts reviewed | [N] |
| File references fixed | [N] |
| Guideline references updated | [N] |
| Frontmatter fixed | [N] |
| Design system reminders updated | [N] |
| Circular references removed | [N] |
```

---

## Success Criteria

- [ ] All file references in prompts point to existing files
- [ ] All guideline references are current
- [ ] All frontmatter is complete and accurate
- [ ] No circular references between prompts
