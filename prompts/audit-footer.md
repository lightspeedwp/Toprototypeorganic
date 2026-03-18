# Audit Footer — Template Part Compliance

**Type:** Audit  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `audit footer`  
**Repeatable:** Yes  
**Estimated Duration:** 1 session (15-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/rules/design-system-rules.md` — Styling compliance
- `/guidelines/components/Footer.md` — Footer component guidelines
- `/guidelines/overview-components.md` — Component architecture
- `/guidelines/components/SocialLinks.md` — Social links component (if exists)

---

## Design System Rules

- **Typography:** ONLY 5 approved font variables (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light)
- **Colors:** CSS variables only from `theme-base.css` / `theme-light.css` / `theme-dark.css`
- **Icons:** `@phosphor-icons/react` (default) — `lucide-react` is legacy
- **Router:** `react-router` only — never `react-router-dom`
- **Styling:** External CSS with BEM naming (`.wp-part-footer__*`) — no inline styles
- **Layout:** Zero Margin Policy — flex/grid gaps only

---

## Purpose

Audit the footer template part to ensure it follows WordPress block theme architecture: **one template part** (`/src/app/components/parts/Footer.tsx`) that loads **different pattern components** based on page context.

### Architecture Goal

```
Footer (Template Part — ONE component, always loaded)
├── DefaultFooterPattern   — full footer: newsletter, nav columns, social, legal
├── DevToolsFooterPattern  — minimal footer: dev-tools links, version info, no newsletter
└── (future patterns...)   — extensible per section
```

---

## Audit Steps

### Step 1: Inventory Current Footer Usage

1. Read `/src/app/components/parts/Footer.tsx` — document API and behaviour
2. Read `/src/app/components/parts/FooterNew.tsx` — if exists, document differences
3. Search for ALL footer imports:
   ```
   file_search: content_pattern="import.*Footer" name_pattern="**/*.tsx"
   ```
4. Check `RootLayout.tsx` — which Footer is used?
5. Are there competing footer implementations?

**Record:**
- [ ] How many Footer component files exist? (goal: 1 template part + N patterns)
- [ ] Is `FooterNew.tsx` the active one? Should `Footer.tsx` be retired?
- [ ] Any pages rendering their own inline footer instead of the template part?

### Step 2: Check Pattern Architecture

1. Does the Footer accept a `variant` or `context` prop?
2. Does it switch patterns based on route?
3. Are main site and dev tools footers differentiated?

**Expected structure:**
```
/src/app/components/parts/Footer.tsx            — Template part (orchestrator)
/src/app/components/patterns/FooterDefault.tsx   — Main site footer pattern
/src/app/components/patterns/FooterDevTools.tsx   — Dev tools footer pattern
```

### Step 3: Main Site Footer Audit

The main site footer should include:
- [ ] Newsletter signup section
- [ ] Navigation columns (tours, destinations, company, etc.)
- [ ] Social media links
- [ ] Contact information (phone, email, address)
- [ ] Legal links (privacy policy, terms, sitemap)
- [ ] Brand logo
- [ ] Copyright notice
- [ ] Organic/decorative elements consistent with design language

### Step 4: Dev Tools Footer Audit

The dev tools footer should be **distinct and minimal**:
- [ ] Links to dev tool categories/pages
- [ ] Version information / build info
- [ ] NO newsletter signup (irrelevant for dev tools)
- [ ] NO tour/destination navigation
- [ ] Simplified legal/copyright
- [ ] Consistent with dev tools visual language (more utilitarian)

### Step 5: Data File Usage

- [ ] Footer navigation data sourced from `/src/app/data/content/navigation.ts` or `site-config.ts`?
- [ ] Contact details from `SITE_CONFIG`?
- [ ] Social links from data file?
- [ ] Dev tools footer links from data file?

### Step 6: CSS Architecture

- [ ] CSS file at `/src/styles/parts/footer.css`?
- [ ] BEM naming with `.wp-part-footer__*` prefix?
- [ ] All values CSS variables (no hardcoded colors, fonts, spacing)?
- [ ] Pattern-specific styles separated?

### Step 7: Generate Report

Save to `/reports/YYYY-MM/YYYY-MM-DD-footer-audit.md`:

```markdown
# Footer Template Part Audit

**Date:** [Today]

## Current State
- Footer files: [list]
- Active footer: [Footer.tsx / FooterNew.tsx / both]
- Pattern architecture: [monolithic / separated]
- Dev tools variant: [handled / not handled]

## Issues Found
1. [issue] — Priority [P0/P1/P2]

## Recommended Actions
1. [action]

## Files to Create/Modify
- [list]
```

Add tasks to `/tasks/task-list.md`.

---

## Success Criteria

- [ ] Single Footer template part identified or recommended
- [ ] Main site vs dev tools patterns documented
- [ ] Duplicate footer files flagged for consolidation
- [ ] Data file usage verified
- [ ] CSS architecture checked
- [ ] Report saved and tasks created