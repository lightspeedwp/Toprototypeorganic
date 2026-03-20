# Expand Guidelines — Discover & Clarify Guidelines from Chat History

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand guidelines`  
**Repeatable:** Yes — run periodically to capture tribal knowledge  
**Estimated Duration:** 1 session (15-30 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Master entry point, file structure
- `/guidelines/rules/design-system-rules.md` — Design system rules
- `/guidelines/rules/file-organization.md` — File placement

---

## Purpose

Scan the current chat history for decisions, clarifications, and corrections the user made that reveal **rules, preferences, or patterns not yet documented in guidelines**. These represent "tribal knowledge" that should be codified so future sessions produce consistent results without the user having to re-explain.

---

## What to Look For

### In Chat History

1. **Corrections** — Did the user correct the AI's output? The correction reveals a rule.
   - Example: AI used `lucide-react`, user said "Use Phosphor" → already in guidelines, but may need strengthening
   - Example: AI used inline styles, user said "No inline styles" → ensure rule is prominent

2. **Preferences** — Did the user express a preference not yet documented?
   - Example: "I prefer cards with rounded corners and subtle shadows" → add to component guidelines
   - Example: "Always put the CTA at the bottom of the page" → add to page archetype rules

3. **Clarifications** — Did the user clarify an ambiguous guideline?
   - Example: "When I say 'organic', I mean soft gradients and natural imagery" → expand the organic design language guideline

4. **New rules** — Did the user establish a new rule during the conversation?
   - Example: "All data must be in data files, never hardcoded" → ensure it's in design-system-rules.md
   - Example: "Prompts must never have circular references" → ensure it's documented

5. **Design decisions** — Did the user make design system decisions?
   - Example: "Use this spacing for all cards" → add to spacing guidelines
   - Example: "This colour palette for dark mode" → add to dark-light-mode guidelines

### In Existing Guidelines

1. **Vague rules** — Guidelines that say "should" but need specifics
2. **Missing examples** — Rules without code examples
3. **Incomplete coverage** — Component guidelines that don't cover all props/variants
4. **Contradictions** — Rules in one file that conflict with another

---

## Steps

### Step 1: Extract Chat Insights

1. Review the full chat history
2. For each insight, categorise:
   - **Rule** — A firm requirement (must/must not)
   - **Preference** — A strong recommendation (should/should not)
   - **Clarification** — An explanation of an existing rule
   - **Decision** — A one-time choice that establishes a pattern

Build an insights table:

| # | Type | Insight | Source (chat context) | Guideline Impact |
|---|------|---------|----------------------|-----------------|
| 1 | Rule | All content must be in data files | User corrected hardcoded content | Add to design-system-rules.md |
| 2 | Clarification | "Organic" means soft gradients, natural imagery | User explained during hero discussion | Expand audit-style.md |
| 3 | Decision | Phosphor is permanent, lucide is legacy | User reversed migration direction | Already documented |

### Step 2: Cross-Reference with Existing Guidelines

For each insight:

1. Search existing guideline files for related content
2. Classify the gap:
   - **Missing entirely** — no guideline covers this
   - **Mentioned but vague** — exists but needs specifics
   - **Exists but buried** — documented but hard to find
   - **Already covered** — no change needed

### Step 3: Recommend Updates

Present recommendations:

```
### Guideline Expansion Recommendations — [Today's Date]

| # | Action | Target File | Change Description | Priority |
|---|--------|------------|-------------------|----------|
| 1 | ADD RULE | rules/design-system-rules.md | "All content in data files" section | High |
| 2 | ADD EXAMPLE | components/Hero.md | Data-driven hero code example | Medium |
| 3 | CLARIFY | patterns/section-styles.md | Define "organic" visual language | Medium |
| 4 | PROMOTE | rules/design-system-rules.md | Move "no circular refs" from prompt to rule | Low |
```

**Priority guide:**
- **High** — Rule the user has corrected for multiple times
- **Medium** — Preference or clarification that prevents future mistakes
- **Low** — Nice-to-have documentation improvement

Wait for user confirmation before making changes.

### Step 4: Execute Approved Changes

For each approved recommendation:

1. Read the target guideline file
2. Add/update the relevant section
3. Include code examples where helpful
4. Update the file's version/date if it has frontmatter

### Step 5: Update Cross-References

1. If new sections were added, ensure they're discoverable:
   - Add to the relevant overview file's table of contents
   - Add to `Guidelines.md` reading order if significant
   - Add to relevant prompt files' `Guideline References` sections

### Step 6: Summary

```
## Expand Guidelines Session — [Today's Date]

| Action | Count |
|--------|-------|
| Insights extracted from chat | [N] |
| Already documented (no change) | [N] |
| Guidelines updated | [N] |
| New sections added | [N] |
| Examples added | [N] |
| Cross-references updated | [N] |
| Deferred (user declined) | [N] |
```

---

## Rules

1. **Always ask before modifying guidelines** — present recommendations first
2. **Never weaken existing rules** — only add or clarify
3. **Include code examples** — abstract rules need concrete examples
4. **One change per section** — don't overhaul a guideline in one pass
5. **Preserve existing content** — add alongside, don't replace

---

## Success Criteria

- [ ] Chat history fully analysed for undocumented decisions
- [ ] All insights cross-referenced with existing guidelines
- [ ] Recommendations presented with clear priority
- [ ] Approved changes include code examples
- [ ] Cross-references updated for discoverability
