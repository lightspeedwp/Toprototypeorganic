# Expand Patterns — Discover & Propose New Block Patterns

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand patterns`  
**Repeatable:** Yes — run after adding new content types or pages  
**Estimated Duration:** 1 session (15-25 minutes)  
**Followed by:** Type `continue` to scaffold the next approved pattern via the `new pattern` trigger.

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/overview-patterns.md` — Block pattern architecture
- `/guidelines/patterns/` — All existing pattern guidelines
- `/guidelines/blocks/overview-blocks.md` — Block inventory
- `/guidelines/Guidelines.md` — Page archetypes (required patterns per archetype)

---

## Purpose

Analyse the current codebase to identify **missing, underused, or improvable block patterns**. Propose new patterns based on gaps in page archetype coverage, common UI needs across pages, and content types lacking dedicated presentation patterns. Each recommendation is scaffoldable via the `new pattern` trigger word.

---

## Analysis Steps

### Step 1: Inventory Existing Patterns

1. List all components in `/src/app/components/patterns/`
2. For each pattern, note:
   - Pattern name and type (Hero, CTA, CardGrid, FAQ, Editorial, etc.)
   - Which pages use it (cross-reference with `/src/app/pages/`)
   - Variants available (if any)

Build a usage matrix:

| Pattern | Type | Used By (Pages) | Variant Count |
|---------|------|-----------------|---------------|
| Hero | Hero | Home, About, Tours | 3 |
| ... | ... | ... | ... |

### Step 2: Analyse Page Archetype Coverage

For each page archetype in Guidelines.md:

| Archetype | Required Patterns | Available | Missing |
|-----------|------------------|-----------|---------|
| Content Hub | Hero, Filter, CardGrid, FAQ, CTA | Hero ✅, CardGrid ✅ | Filter ❌, FAQ ❌ |
| Single Detail | Hero, Editorial, Meta/Facts, Related, FAQ, CTA | Hero ✅ | Meta/Facts ❌ |

### Step 3: Analyse Content Type Coverage

For each content type in `/src/app/data/`:

| Content Type | Records | Card Pattern | Detail Pattern | List Pattern | Missing |
|-------------|---------|-------------|---------------|-------------|---------|
| Tours | 61 | TourCard ✅ | TourDetail ✅ | — | ListView ❌ |
| Destinations | 87 | DestCard ✅ | — | — | Detail ❌, Map ❌ |

### Step 4: Identify Common UI Needs

Scan pages for repeated inline UI structures that could become patterns:
- Repeated section layouts not extracted into patterns
- Inline testimonial/review displays
- Inline pricing/comparison tables
- Inline team/staff grids
- Social proof sections
- Newsletter/signup sections
- Breadcrumb navigation sections
- Statistics/counter displays

### Step 5: Generate Recommendations

Present a prioritised proposal table:

```
### Pattern Expansion Proposals — [Today's Date]

| # | Priority | Pattern Name | Type | Justification | Pages That Need It |
|---|----------|-------------|------|---------------|-------------------|
| 1 | High | FilterBar | Filter | Required by Content Hub archetype, currently missing | Tours, Destinations, Accommodation |
| 2 | High | FAQSection | FAQ | Required by 3 archetypes, only inline implementations | All archive pages |
| 3 | Medium | MetaFacts | Detail | Required by Single Detail archetype | Tour Detail, Accommodation Detail |
| 4 | Medium | TestimonialStrip | Social Proof | Reviews data exists but no dedicated pattern | Home, About, Tour Detail |
| 5 | Low | NewsletterSignup | CTA variant | Common conversion pattern, not yet built | Footer, Blog |

Total: [N] new patterns recommended
```

**Priority guide:**
- **High** — Required by a page archetype but missing entirely
- **Medium** — Would reduce code duplication or unlock a data type's potential
- **Low** — Nice-to-have enhancement or variant of an existing pattern

### Step 6: User Decision

Wait for user input:
- User approves specific items → note which to build
- User says `continue` → scaffold the highest-priority approved pattern using `new pattern` trigger

---

## Continuation Protocol

When the user says **`continue`** after this prompt:

1. Read `/prompts/new-pattern.md`
2. Execute it with the next approved pattern from the proposals table
3. Provide the `new pattern` trigger with:
   - Pattern name
   - Pattern type
   - Target pages
   - Data source (if applicable)
   - Design requirements from the proposal

After each pattern is built, prompt: "Pattern [name] complete. Say `continue` for the next pattern, or give a new instruction."

---

## Rules

1. **Only propose patterns that map to WordPress block patterns** — no utility components
2. **Every proposal must cite a justification** — archetype requirement, data gap, or duplication reduction
3. **Never auto-build** — always present proposals and wait for approval
4. **Proposals must be scaffoldable** — each must have enough detail for `new pattern` to execute
5. **Use existing data** — proposals should leverage data files in `/src/app/data/`

---

## Success Criteria

- [ ] Complete inventory of existing patterns with usage data
- [ ] Page archetype coverage gaps identified
- [ ] Content type presentation gaps identified
- [ ] Inline UI structures identified for extraction
- [ ] Prioritised proposal table with clear justifications
- [ ] Ready for `continue` → `new pattern` execution chain
