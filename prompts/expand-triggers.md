# Expand Triggers — Meta-Analysis of the Trigger Registry

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand triggers`  
**Repeatable:** Yes — run after creating new prompts or categories  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Trigger words table
- `/guidelines/prompts/trigger-words.md` — Categorised trigger word reference

---

## Purpose

Meta-trigger that analyses the **full trigger word registry** for structural gaps, overlaps, missing orchestrator coverage, naming inconsistencies, and category imbalances. Unlike `update triggers` (which syncs tables), this prompt proposes **new trigger words** to fill system-level gaps.

---

## Analysis Dimensions

### 1. Verb Coverage

Check that every action verb has consistent coverage:

| Verb | Triggers Using It | Missing Coverage? |
|------|------------------|-------------------|
| `audit` | 22 | [assess] |
| `update` | 9 | [assess] |
| `archive` | 4 | [assess] |
| `expand` | 6+ | [assess] |
| `new` | 3 | [assess] |
| `migrate` | 1 | [assess — should there be more?] |
| `cleanup` | 2 | [assess] |
| `optimize` | 1 | [assess] |

### 2. Audit ↔ Update ↔ Migrate Symmetry

For every `audit X`, check if a corresponding `update X` or `migrate X` exists:

| Domain | audit | update | migrate | archive | expand | Gap? |
|--------|-------|--------|---------|---------|--------|------|
| data | ✅ | ✅ | — | — | ✅ | — |
| routes | ✅ | ✅ | — | — | — | — |
| tokens | ✅ | — | — | — | — | Missing `update tokens`? |
| css | ✅ | — | — | — | — | Missing `update css`? |
| phosphor | ✅ | — | ✅ | — | — | — |
| a11y | ✅ | — | — | — | — | Missing `update a11y`? |

### 3. Orchestrator Coverage

Every prefix-based group should have an orchestrator:

| Prefix | Sub-triggers | Orchestrator | Status |
|--------|-------------|-------------|--------|
| `audit *` | 22 | `audit` ✅ | Complete |
| `update *` | 9 | `update` ✅ | Complete |
| `archive *` | 4 | `archive` ✅ | Complete |
| `expand *` | 6+ | `expand` ✅ | Complete |
| `new *` | 3 | — | Missing `new` orchestrator? |
| `migrate *` | 1 | — | Too few for orchestrator |

### 4. Naming Consistency

Check for inconsistencies:
- `audit a11y` vs `audit accessibility` — intentional (quick vs deep) or overlap?
- `cleanup` vs `cleanup guidelines` — is `cleanup` an orchestrator or standalone?
- `process reports` vs `process reports deep` — consistent naming?
- `sitemap` vs `update sitemap` — redundancy?

### 5. Category Balance

Identify categories with too few or too many triggers:

| Category | Count | Assessment |
|----------|-------|-----------|
| Design System Audits | 6 | Healthy |
| Scaffolding | 3 | Could use `new page`? |
| Archive | 4 | Balanced |
| Expand | 6+ | Growing |
| Infrastructure | 5 | Balanced |

---

## Steps

### Step 1: Full Registry Inventory

1. Count all trigger words from `/guidelines/prompts/trigger-words.md`
2. Categorise by verb prefix
3. Build the analysis tables above

### Step 2: Gap Analysis

Apply all 5 analysis dimensions. For each gap found:

| # | Gap Type | Description | Proposed Trigger | Priority |
|---|----------|-------------|-----------------|----------|
| 1 | Symmetry | `audit tokens` has no `update tokens` | `update tokens` | Low |
| 2 | Orchestrator | `new *` has no orchestrator | `new` | Low |
| 3 | Naming | `sitemap` overlaps `update sitemap` | Merge into `update sitemap` | Medium |

### Step 3: Overlap Detection

Identify triggers that do substantially the same thing:
- Same verb + same noun = definite overlap
- Similar scope with different names = potential overlap
- Orchestrator + standalone doing same work = confusion

### Step 4: Generate Recommendations

```
### Trigger Registry Expansion — [Today's Date]

#### New Triggers Recommended
| # | Trigger | Type | Justification |
|---|---------|------|---------------|

#### Overlaps to Resolve
| # | Triggers | Resolution |
|---|----------|-----------|

#### Naming Fixes
| # | Current | Proposed | Reason |
|---|---------|----------|--------|

#### Category Rebalancing
| Category | Current Count | Proposed Count | Changes |
|----------|--------------|---------------|---------|
```

### Step 5: User Decision

Present all recommendations. Wait for approval.

### Step 6: Execute

1. Create approved new prompt files
2. Apply approved renames/merges
3. Run `update triggers` to sync tables

---

## Rules

1. **Never auto-create triggers** — present analysis and wait for approval
2. **Naming must follow conventions** — `verb noun` format, 2-3 words max
3. **Every trigger needs a prompt file** — no table-only entries
4. **Orchestrators need 3+ sub-triggers** — don't create orchestrators for 1-2 items
5. **Run `update triggers` after** — always sync after changes

---

## Success Criteria

- [ ] Full registry inventoried by verb and category
- [ ] Audit ↔ Update ↔ Migrate symmetry checked
- [ ] Orchestrator coverage verified
- [ ] Naming inconsistencies flagged
- [ ] Category balance assessed
- [ ] Gap recommendations presented with justification
