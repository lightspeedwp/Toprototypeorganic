# Expand Prompts — Discover & Create Reusable Prompts from Chat History

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand prompts`  
**Repeatable:** Yes — run periodically to capture new patterns  
**Estimated Duration:** 1 session (15-30 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Trigger words table, reading order
- `/guidelines/prompts/trigger-words.md` — Categorised trigger word reference
- `/guidelines/rules/workflow.md` — Task/report workflow

---

## Purpose

Scan the current chat history for recurring patterns, manual multi-step workflows, and ad-hoc requests that could be captured as reusable trigger-word prompts. The goal is to identify work the user does repeatedly (or would benefit from repeating) and codify it into the prompt system so it can be invoked with a single trigger word.

---

## What to Look For

### In Chat History

1. **Repeated requests** — Has the user asked for the same type of work more than once?
   - Example: "Update all cards to use the new spacing tokens" → could become `update tokens` or `migrate tokens`

2. **Multi-step manual workflows** — Did the user guide the AI through a complex sequence?
   - Example: "First check all hero images, then update the ones that are broken, then verify" → could become `audit heroes` or `update heroes`

3. **Ad-hoc audits** — Did the user ask for a one-off review that could be generalised?
   - Example: "Check if all buttons have proper hover states" → could become `audit interactions`

4. **Configuration changes** — Did the user request systematic updates across many files?
   - Example: "Update all components to use the new font variable" → could become `migrate fonts`

5. **Debugging patterns** — Did the user troubleshoot a class of issues that could be prevented?
   - Example: "Why are these images broken?" → strengthen `audit images`

### In Existing Prompts

1. **Gaps between audit and update** — Is there an `audit X` but no `update X`?
2. **Missing orchestrators** — Are there related prompts that should be grouped?
3. **Overlapping prompts** — Could two prompts be merged or one extended?
4. **Missing coverage** — Are there project areas with no prompt coverage?

---

## Steps

### Step 1: Analyse Chat History

1. Review the full chat history for this session
2. Extract patterns matching the criteria above
3. For each pattern, determine:
   - What trigger word would invoke it?
   - Does an existing prompt already cover it? (enhance vs create new)
   - Is it truly repeatable or was it a one-time need?

Build a recommendations table:

| # | Pattern Observed | Recommendation | Type | Trigger Word |
|---|-----------------|---------------|------|-------------|
| 1 | User repeatedly asked to migrate hardcoded content | Already created as `update data` | Existing | `update data` |
| 2 | User manually checked icon imports 3 times | Enhance `audit phosphor` with auto-fix | Enhancement | `audit phosphor` |
| 3 | User asked for component scaffolding with data integration | New prompt for data-connected components | New | `new component` |

### Step 2: Analyse Prompt Coverage

1. List all registered trigger words by category
2. Identify gaps:
   - Categories with only 1 prompt (could use more coverage)
   - Audit prompts without corresponding Update prompts
   - Common project tasks with no prompt coverage
3. Cross-reference with the project's content types, page archetypes, and component categories

### Step 3: Recommend Enhancements

For existing prompts that could be improved:

| Prompt | Current Scope | Recommended Enhancement |
|--------|--------------|------------------------|
| `audit images` | Checks URLs and alt text | Add auto-fix for common issues |
| `cleanup` | 10 steps | Add `archive` invocation |

### Step 4: Recommend New Prompts

For patterns that need new prompts:

| Trigger Word | Type | Category | Description |
|-------------|------|----------|-------------|
| `new component` | Scaffold | Scaffolding | Data-connected component with types, data file, CSS |

### Step 5: User Confirmation

Present all recommendations in a single decision table:

```
### Recommendations — [Today's Date]

| # | Action | Trigger | Description | Create? |
|---|--------|---------|-------------|---------|
| 1 | NEW | `new component` | Scaffold data-connected component | [Y/N] |
| 2 | ENHANCE | `audit images` | Add auto-fix capability | [Y/N] |
| 3 | MERGE | `sitemap` → `update sitemap` | Deduplicate | [Y/N] |
```

Wait for user confirmation before creating or modifying any prompts.

### Step 6: Execute Approved Changes

1. Create new prompt files with proper frontmatter
2. Apply enhancements to existing prompts
3. Run `update triggers` to sync tables

### Step 7: Summary

```
## Expand Prompts Session — [Today's Date]

| Action | Count |
|--------|-------|
| Patterns identified in chat | [N] |
| New prompts created | [N] |
| Existing prompts enhanced | [N] |
| Prompts merged | [N] |
| Recommendations deferred | [N] |
| Total trigger words after | [N] |
```

---

## Rules

1. **Always ask before creating** — present recommendations, wait for approval
2. **Enhance before creating** — if an existing prompt can cover the need, enhance it
3. **Follow naming conventions** — trigger words must be short, verb-first, descriptive
4. **No speculative prompts** — only create prompts for observed patterns or clear gaps
5. **Run `update triggers` after** — always sync tables after changes

---

## Success Criteria

- [ ] Chat history fully analysed for patterns
- [ ] Prompt coverage gaps identified
- [ ] Recommendations presented with clear rationale
- [ ] User-approved changes executed
- [ ] Trigger word tables synced
