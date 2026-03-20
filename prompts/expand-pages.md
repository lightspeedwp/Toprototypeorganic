# Expand Pages — Discover & Propose New Standalone Pages

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand pages`  
**Repeatable:** Yes — run after adding new features or content areas  
**Estimated Duration:** 1 session (10-20 minutes)  
**Followed by:** Type `continue` to scaffold the next approved page via the `new template` trigger.

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Page archetypes, canonical post types
- `/guidelines/blocks/overview-templates.md` — Template reference

---

## Purpose

Distinct from `expand templates` (which focuses on content-type archive/detail coverage), this prompt identifies **standalone utility and marketing pages** that a complete tour operator website would need. These are pages that don't map 1:1 to a content type but are essential for user experience, SEO, legal compliance, or conversion.

---

## Analysis Steps

### Step 1: Inventory Existing Pages

1. List all pages in `/src/app/pages/` with routes
2. Categorise: Content Archive | Content Detail | Utility | Marketing | Legal | Dev Tools

### Step 2: Essential Page Checklist

Cross-reference against what a complete tour operator website needs:

**Core Pages:**
| Page | Exists? | Route | Notes |
|------|---------|-------|-------|
| Home | ? | / | Landing page |
| About Us | ? | /about | Company info |
| Contact | ? | /contact | Form + details |
| FAQ | ? | /faq | Structured Q&A |
| Sitemap | ? | /sitemap | Route index |
| 404 Not Found | ? | /* | Error page |

**Legal/Compliance:**
| Page | Exists? | Route | Notes |
|------|---------|-------|-------|
| Privacy Policy | ? | /privacy | GDPR/POPIA |
| Terms & Conditions | ? | /terms | Booking T&Cs |
| Cookie Policy | ? | /cookies | Cookie consent |

**Marketing/Conversion:**
| Page | Exists? | Route | Notes |
|------|---------|-------|-------|
| Why Choose Us | ? | /why-us | USP showcase |
| Testimonials | ? | /reviews | Social proof |
| Special Offers | ? | /specials | Promotions |
| Travel Guides | ? | /guides | SEO content |
| Group Tours | ? | /group-tours | Niche landing |
| Corporate Travel | ? | /corporate | B2B landing |

**Support:**
| Page | Exists? | Route | Notes |
|------|---------|-------|-------|
| Booking Process | ? | /how-to-book | User guide |
| Travel Insurance | ? | /insurance | Info page |
| Visa Information | ? | /visas | Info page |
| Packing Lists | ? | /packing | Utility content |

### Step 3: SEO & Content Gap Analysis

1. Check which content types have data but no dedicated landing page
2. Check for common tour operator search queries without matching pages
3. Identify internal link targets that don't resolve

### Step 4: Generate Recommendations

```
### Page Expansion Proposals — [Today's Date]

| # | Priority | Page Name | Archetype | Route | Justification |
|---|----------|----------|-----------|-------|---------------|
| 1 | High | Privacy Policy | Utility | /privacy | Legal compliance |
| 2 | High | Terms & Conditions | Utility | /terms | Legal compliance |
| 3 | Medium | Why Choose Us | Utility | /why-us | Conversion page |
| 4 | Medium | Booking Process | Utility | /how-to-book | Reduces support queries |
| 5 | Low | Travel Guides | Editorial Listing | /guides | SEO value |

Total: [N] new pages recommended
```

### Step 5: User Decision

Wait for user input. User says `continue` → scaffold via `new template` trigger.

---

## Continuation Protocol

When the user says **`continue`** after this prompt:

1. Read `/prompts/new-template.md`
2. Execute it with the next approved page from the proposals table
3. For legal/utility pages, create corresponding data files with placeholder content
4. After each page: "Page [name] complete. Say `continue` for the next page."

---

## Rules

1. **Only propose pages that serve a clear user or business need**
2. **Legal pages are always High priority** — compliance is non-negotiable
3. **Marketing pages need data** — create data files for any proposed content
4. **Never auto-build** — present proposals and wait for approval
5. **All pages must conform to an approved archetype**

---

## Success Criteria

- [ ] Existing pages categorised
- [ ] Essential page checklist evaluated
- [ ] Legal compliance gaps flagged
- [ ] Marketing/conversion opportunities identified
- [ ] Prioritised proposal table generated
- [ ] Ready for `continue` → `new template` chain
