# Expand SEO — Discover Missing SEO & Structured Data

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand seo`  
**Repeatable:** Yes — run after adding new pages or content types  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Content architecture, page archetypes

---

## Purpose

Scan all templates and pages for **missing SEO elements**: meta descriptions, Open Graph tags, JSON-LD schema markup, canonical URLs, and internal linking opportunities. Propose a structured approach to SEO that can be implemented via data files and shared components.

---

## SEO Elements to Assess

### Per-Page Meta

1. **Title tag** — unique, descriptive, 50-60 characters
2. **Meta description** — unique, compelling, 150-160 characters
3. **Canonical URL** — self-referencing canonical
4. **Robots meta** — index/noindex per page type

### Open Graph / Social

5. **og:title** — page title for social sharing
6. **og:description** — social description
7. **og:image** — social sharing image (1200x630)
8. **og:type** — website, article, product
9. **twitter:card** — summary_large_image

### Schema.org / JSON-LD

10. **Organization** — site-wide business info
11. **WebSite** — search action, site name
12. **BreadcrumbList** — breadcrumb structured data
13. **Product** — tour/accommodation details, price, availability
14. **Review** — customer reviews with rating
15. **FAQPage** — FAQ structured data
16. **Article** — blog post structured data
17. **LocalBusiness** — office/branch locations

### Internal Linking

18. **Related content links** — cross-linking between content types
19. **Contextual anchor text** — descriptive link text (not "click here")
20. **Hub and spoke** — archive pages link to all detail pages
21. **Breadcrumb links** — hierarchical navigation links

---

## Steps

### Step 1: Audit Current SEO Implementation

1. Search for `<title>`, `<meta name="description"`, `<meta property="og:` across all files
2. Search for `application/ld+json` schema blocks
3. Check if a shared SEO/Head component exists
4. Check page data files for meta fields

| Element | Implemented? | Coverage | Quality |
|---------|-------------|----------|---------|
| Title tags | Partial | 5/20 pages | Generic titles |
| Meta descriptions | ❌ | 0/20 | Missing |
| OG tags | ❌ | 0/20 | Missing |
| Schema markup | ❌ | 0/20 | Missing |
| Breadcrumb schema | ❌ | 0/20 | Missing |

### Step 2: Map Content Types to Schema

| Content Type | Recommended Schema | Priority |
|-------------|-------------------|----------|
| Tours | Product + Offer | High |
| Accommodations | LodgingBusiness + Product | High |
| Reviews | Review + AggregateRating | High |
| Blog Posts | Article | Medium |
| FAQ Page | FAQPage | Medium |
| Team | Person | Low |
| Destinations | Place | Medium |

### Step 3: Propose SEO Data Structure

```typescript
// Proposed: /src/app/data/types.ts addition
export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  canonical?: string;
  noIndex?: boolean;
  schema?: Record<string, unknown>[];
}
```

### Step 4: Propose SEO Component

```
### Proposed: SEOHead Component

**Location:** `/src/app/components/common/SEOHead.tsx`
**Consumes:** PageMeta from data files
**Renders:** document.head meta tags via React Helmet or equivalent
**Used by:** All page templates
```

### Step 5: Propose Internal Linking Improvements

| # | Opportunity | Pages Affected | Impact |
|---|------------|---------------|--------|
| 1 | Add "Related Tours" to destination pages | 87 destinations | High |
| 2 | Add "Nearby Accommodations" to tour pages | 61 tours | High |
| 3 | Cross-link blog posts with tours/destinations | All blog posts | Medium |

### Step 6: User Decision

Present recommendations. Wait for approval.

---

## Rules

1. **SEO data in data files** — never hardcode meta content in components
2. **One PageMeta per page** — stored in page data files
3. **Schema must be valid** — follow schema.org specifications
4. **Unique descriptions** — no duplicate meta descriptions across pages
5. **Never auto-implement** — present proposals and wait for approval

---

## Success Criteria

- [ ] Current SEO implementation audited
- [ ] Content types mapped to schema.org types
- [ ] PageMeta data structure proposed
- [ ] SEO component specification ready
- [ ] Internal linking opportunities identified
- [ ] Recommendations presented for user approval
