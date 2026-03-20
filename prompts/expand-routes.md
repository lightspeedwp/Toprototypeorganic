# Expand Routes — Discover Navigation Gaps & Dead-Ends

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand routes`  
**Repeatable:** Yes — run after adding new pages or templates  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Page archetypes, content architecture
- `/guidelines/patterns/navigation-links.md` — Link and navigation patterns

---

## Purpose

Analyse navigation flows across the entire site to identify **orphaned pages** (no inbound links), **dead-end pages** (no outbound navigation), **missing breadcrumbs**, and **UX flow gaps** where users could get stuck. Unlike `audit routes` (which checks route registration integrity), this prompt analyses the **user journey** and proposes navigation improvements.

---

## Steps

### Step 1: Build Complete Link Map

1. Read `/src/app/routes.ts` for all registered routes
2. Search all `.tsx` files for `<Link to=`, `<NavLink to=`, `navigate(`, `href=`
3. Read navigation data files for menu items
4. Build an inbound/outbound link matrix:

| Page | Route | Inbound Links From | Outbound Links To | Breadcrumbs? |
|------|-------|-------------------|-------------------|-------------|
| Home | `/` | All (logo) | Tours, Destinations, ... | N/A |
| Tour Detail | `/tours/:slug` | Tour Archive, Cards | Related Tours, CTA | ❌ |
| Privacy | `/privacy` | Footer | ❌ | ❌ |

### Step 2: Identify Navigation Issues

**Orphaned pages** (0-1 inbound links from navigation):
| Page | Route | Only Linked From | Issue |
|------|-------|-----------------|-------|
| Privacy | /privacy | Footer only | Not discoverable |

**Dead-end pages** (no meaningful outbound navigation):
| Page | Route | Has CTA? | Has Related? | Has Breadcrumbs? |
|------|-------|---------|-------------|-----------------|
| FAQ | /faq | ❌ | ❌ | ❌ |

**Missing breadcrumbs:**
| Page | Route | Parent | Breadcrumb Exists? |
|------|-------|--------|-------------------|

**Broken user journeys:**
| Journey | Steps | Break Point | Issue |
|---------|-------|-------------|-------|
| Browse → Detail → Book | 3 | Detail → Book | No booking CTA |

### Step 3: Propose Navigation Improvements

For each issue:

| # | Issue Type | Page | Proposal | Priority |
|---|-----------|------|----------|----------|
| 1 | Dead-end | FAQ | Add CTA section + related links | High |
| 2 | Orphaned | Privacy | Add to footer nav + sitemap | Medium |
| 3 | No breadcrumbs | Tour Detail | Add breadcrumb part | High |
| 4 | UX gap | All archives | Add "Back to top" + pagination | Medium |

### Step 4: User Decision

Present recommendations. Wait for approval.

---

## Rules

1. **Every page must have at least 2 inbound links** — navigation + contextual
2. **Every page must have outbound navigation** — no dead-ends
3. **Detail pages need breadcrumbs** — always show path back to archive
4. **Archive pages need pagination** — never infinite scroll without alternative
5. **CTAs on every page** — at minimum a footer CTA
6. **Never auto-implement** — present proposals and wait for approval

---

## Success Criteria

- [ ] Complete link map built
- [ ] Orphaned pages identified
- [ ] Dead-end pages identified
- [ ] Missing breadcrumbs flagged
- [ ] User journey gaps mapped
- [ ] Navigation improvements proposed with priority
