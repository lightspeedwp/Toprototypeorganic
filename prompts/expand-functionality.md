# Expand Functionality — Discover & Propose New Interactive Features

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand functionality`  
**Repeatable:** Yes — run after major feature milestones  
**Estimated Duration:** 1 session (15-25 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Design system rules, content architecture
- `/guidelines/rules/design-system-rules.md` — Styling compliance
- `/guidelines/WCAG-ACCESSIBILITY-STANDARDS.md` — Accessibility requirements

---

## Purpose

Analyse the current prototype to identify **missing interactive features, UI behaviours, and user experience enhancements** that would make the prototype feel complete and production-ready. Focus on features that are expected by users of a modern tour operator website but are currently absent or incomplete.

---

## Analysis Steps

### Step 1: Inventory Existing Functionality

Scan the codebase for interactive features:

| Feature | Status | Location | Notes |
|---------|--------|----------|-------|
| Dark mode toggle | ? | Header | |
| Mobile menu | ? | Header | |
| Search | ? | Header/global | |
| Filtering | ? | Archive pages | |
| Sorting | ? | Archive pages | |
| Pagination | ? | Archive pages | |
| Image gallery/lightbox | ? | Detail pages | |
| Map view | ? | Destination pages | |
| Breadcrumbs | ? | All pages | |
| Back to top | ? | Global | |
| Form validation | ? | Contact page | |
| Loading states | ? | Data-heavy pages | |
| Empty states | ? | Filtered results | |
| Error boundaries | ? | Global | |
| Skeleton loading | ? | Card grids | |
| Toast notifications | ? | Form submissions | |

### Step 2: User Journey Gaps

Trace the primary user journeys and identify friction points:

**Browse → Select → Enquire:**
1. User lands on home → can they discover tours? (hero, featured, search)
2. User browses tours → can they filter/sort/paginate?
3. User views tour detail → can they see gallery, itinerary, pricing?
4. User wants to enquire → is there a clear CTA path?

**Research → Compare → Decide:**
1. Can users compare tours/accommodations side-by-side?
2. Can users save favourites/wishlist?
3. Can users share pages/tours?

### Step 3: Accessibility Feature Gaps

Check for WCAG 2.1 AA interactive requirements:

- Skip links present?
- Focus management on route changes?
- Keyboard-navigable menus and modals?
- Reduced motion support?
- Screen reader announcements for dynamic content?

### Step 4: Performance & Polish Features

- Lazy loading for images and heavy sections?
- Intersection Observer animations?
- Progressive image loading (blur-up)?
- Smooth scroll behaviour?
- Route transition animations?

### Step 5: Generate Recommendations

```
### Functionality Expansion Proposals — [Today's Date]

| # | Priority | Feature | Category | Scope | Justification |
|---|----------|---------|----------|-------|---------------|
| 1 | High | Archive filtering | Interaction | Pattern | Required by Content Hub archetype |
| 2 | High | Pagination | Navigation | Pattern | 87 destinations can't display as one page |
| 3 | High | Skip links | Accessibility | Global | WCAG 2.1 AA requirement |
| 4 | Medium | Search | Navigation | Global | Expected by users |
| 5 | Medium | Image lightbox | Interaction | Pattern | Detail pages need gallery viewing |
| 6 | Low | Tour comparison | Feature | Page | Nice-to-have conversion tool |

Total: [N] features recommended
```

**Priority guide:**
- **High** — Required for archetype compliance or WCAG AA
- **Medium** — Expected by users of tour operator websites
- **Low** — Enhancement that adds polish or conversion value

### Step 6: Implementation Sizing

For each recommendation, estimate:
- **Small** (1 component/pattern) — e.g., back-to-top button
- **Medium** (pattern + data + integration) — e.g., filtering system
- **Large** (multiple patterns + pages + data) — e.g., search with results page

### Step 7: User Decision

Present proposals and wait for approval. Features can be implemented directly or via related trigger words (`new pattern`, `new block`, `new template`).

---

## Rules

1. **All features must use CSS variables** — no hardcoded styling
2. **All features must meet WCAG 2.1 AA** — keyboard, focus, screen reader
3. **Accessibility features are always High priority**
4. **Frontend only** — no backend dependencies unless user has Supabase connected
5. **Never auto-build** — present proposals and wait for approval

---

## Success Criteria

- [ ] Existing functionality inventoried
- [ ] User journey friction points identified
- [ ] Accessibility feature gaps flagged
- [ ] Performance enhancements identified
- [ ] Prioritised proposal table with sizing
- [ ] Clear implementation path for each recommendation
