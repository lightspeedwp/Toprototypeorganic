# Memory Reduction Audit Prompt

**Prompt Type:** Dedicated Codebase Memory Audit
**Created:** March 5, 2026
**Category:** Performance & Architecture
**Related Prompt:** `/prompts/memory-optimization-prompt.md`
**Related Report:** `/reports/2026-03/memory-reduction-audit-march-5.md`
**Related Tasks:** `/tasks/memory-reduction-tasks.md`

---

## Purpose

This is a **focused, actionable audit prompt** specifically for reducing codebase memory consumption in the LSX Design prototype. It targets the five highest-impact areas identified through quantitative analysis of 213,213 lines across 968 files.

Unlike the broader memory optimization prompt, this audit focuses exclusively on **measurable reduction** with concrete file-by-file actions.

---

## Audit Area 1: Eliminate Duplicate CSS File Pairs

**Problem:** 31 template CSS files exist in both original and "-optimized" versions. Both are loaded simultaneously -- originals via component-level imports, optimized versions via `index.css` global imports. This doubles the CSS payload for 31 templates.

**Audit Steps:**
1. For each of the 31 pairs, determine which version the template component actually imports
2. Check if the optimized version in `index.css` overrides or supplements the original
3. Decide: keep optimized (in `index.css`) and remove the original import from the component, OR keep the original and remove the optimized from `index.css`
4. Delete the unused file from each pair
5. Update all import references

**Files to Audit (31 pairs):**

| Original File | Optimized File | Original Lines | Optimized Lines |
|---------------|---------------|----------------|-----------------|
| `analytics-service.css` | `analytics-service-optimized.css` | ~500 | 441 |
| `accessibility-service.css` | `accessibility-service-optimized.css` | ~500 | 453 |
| `ai-engine-service.css` | `ai-engine-service-optimized.css` | ~500 | 501 |
| `answer-engine-service.css` | `answer-engine-service-optimized.css` | ~500 | 506 |
| `content-strategy-service.css` | `content-strategy-service-optimized.css` | ~500 | 474 |
| `migrations-service.css` | `migrations-service-optimized.css` | ~500 | 429 |
| `seo-service.css` | `seo-service-optimized.css` | ~500 | 384 |
| `support-service.css` | `support-service-optimized.css` | ~500 | 386 |
| `page-service-development.css` | `page-service-development-optimized.css` | 891 | 336 |
| `page-service-design.css` | `page-service-design-optimized.css` | 626 | 265 |
| `page-service-discovery.css` | `page-service-discovery-optimized.css` | 1,045 | 314 |
| `page-service-performance.css` | `page-service-performance-optimized.css` | 659 | 372 |
| `page-service-security.css` | `page-service-security-optimized.css` | 639 | 346 |
| `page-service-training.css` | `page-service-training-optimized.css` | 708 | 512 |
| `page-service-content.css` | `page-service-content-optimized.css` | 673 | 257 |
| `page-services-landing.css` | `page-services-landing-optimized.css` | 986 | 943 |
| `page-service-ai-landing.css` | `page-service-ai-landing-optimized.css` | ~400 | 216 |
| `page-service-content-landing.css` | `page-service-content-landing-optimized.css` | ~400 | 183 |
| `page-service-design-systems.css`* | `page-service-design-systems-optimized.css` | ~300 | 118 |
| `portfolio-archive.css` | `portfolio-archive-optimized.css` | 782 | 674 |
| `portfolio-tag-archive.css` | `portfolio-tag-archive-optimized.css` | ~300 | 173 |
| `single-project.css` | `single-project-optimized.css` | ~500 | 355 |
| `page-about.css` | `page-about-optimized.css` | 567 | 50 |
| `page-team.css` | `page-team-optimized.css` | 710 | 164 |
| `page-solution-ai.css` | `page-solution-ai-optimized.css` | ~400 | 49 |
| `podcast-archive.css` | `podcast-archive-optimized.css` | ~400 | 213 |
| `testimonial-archive.css` | `testimonial-archive-optimized.css` | ~400 | 162 |
| `tour-operator-archive.css` | `tour-operator-archive-optimized.css` | ~400 | 326 |
| `video-archive.css` | `video-archive-optimized.css` | ~400 | 48 |
| `component-showcase.css` | `component-showcase-optimized.css` | ~400 | 47 |
| `404.css` | `404-optimized.css` | ~200 | 46 |

**Estimated Savings:** 9,743 - 15,000+ lines (depending on which version is kept per pair)

---

## Audit Area 2: Consolidate Duplicate Data Files

**Problem:** Multiple data files contain overlapping or superseded content for the same domain entity.

**Files to Consolidate:**

| Domain | Files | Combined Lines | Action |
|--------|-------|----------------|--------|
| **Testimonials** | `testimonials.ts` (220) + `testimonials-extended.ts` (379) + `testimonials-enhanced.ts` (297) | 896 | Merge into single `testimonials.ts` with all entries |
| **FAQs** | `faqs.ts` (725) + `faqs-extended.ts` (862) | 1,587 | Split by page context: `faqs/homepage.ts`, `faqs/services.ts`, etc. |
| **Pages/Navigation** | `pages.ts` (86) + `site-pages.ts` (10) + `site-pages/pages.ts` (883) | 979 | Clarify canonical, delete unused |
| **Hosting** | `hosting.ts` (92) + `hosting-page.ts` (346) | 438 | Merge into `hosting.ts` |
| **Why Choose Us** | `why-choose-us.ts` (409) + `why-choose-us-page.ts` (31) | 440 | Merge into `why-choose-us.ts` |

**Estimated Savings:** ~1,500-2,500 lines through deduplication

---

## Audit Area 3: Split Oversized Files

**Problem:** 10 files exceed 1,000 lines. These are harder to maintain, slower to parse, and increase memory during editing.

**Files > 1,000 lines:**

| File | Lines | Split Strategy |
|------|-------|---------------|
| `routes.tsx` | 1,147 | Split into route group files: `routes/about.ts`, `routes/services.ts`, `routes/solutions.ts`, `routes/work.ts`, `routes/insights.ts`, `routes/shop.ts`, `routes/dev-tools.ts`, `routes/index.ts` |
| `site-header.css` | 1,051 | Split: `site-header-base.css`, `site-header-mega-menu.css`, `site-header-responsive.css` |
| `page-journey-stage.css` | 1,050 | Split: hero, content, interactive sections |
| `page-service-discovery.css` | 1,045 | Replace with optimized version (see Area 1) |

**Files 800-1,000 lines (high priority):**

| File | Lines | Split Strategy |
|------|-------|---------------|
| `page-services-landing.css` | 986 | Replace with optimized (943 lines), then split |
| `mailchimp-solution-page.css` | 961 | Extract to solution-base patterns |
| `page-solution-tour-design.css` | 939 | Extract to solution-base patterns |
| `page-solution-redesign.css` | 917 | Extract to solution-base patterns |
| `page-service-development.css` | 891 | Replace with optimized (336 lines) |
| `site-pages/pages.ts` | 883 | Split into page groups |
| `faqs-extended.ts` | 862 | Split by context (see Area 2) |
| `blog-index-page.css` | 848 | Split: hero, grid, sidebar |
| `page-solution-ecommerce.css` | 844 | Extract to solution-base |
| `portfolio-base.css` | 841 | Already a base -- audit for unused selectors |
| `contact-page.css` | 840 | Split: hero, form, info |
| `wetu-importer-page.css` | 833 | Split into sections |
| `about-base.css` | 823 | Already a base -- audit for unused selectors |
| `lsx-search-page.css` | 823 | Split: search, results, filters |
| `site-footer.css` | 817 | Split: base, widgets, responsive |
| `utilities.css` | 805 | Split: grid, text, display, spacing utilities |

---

## Audit Area 4: Clean Up Hidden Layers

**Problem:** Commented-out code, unused imports, and orphaned files add dead weight.

**Scan Checklist:**
- [ ] **Commented-out JSX blocks:** Search `{/*` and `//` patterns in templates for disabled sections (> 5 lines)
- [ ] **Unused imports:** Imports declared but never used in the file body
- [ ] **Orphaned CSS files:** CSS files with no corresponding TSX import anywhere in `/src/`
- [ ] **Orphaned data exports:** Named exports in `/src/app/data/` that are never imported
- [ ] **Dead CSS selectors:** Classes defined in CSS that appear in zero TSX files
- [ ] **Legacy comments:** Block comments describing removed features or old architecture

**Tools:**
```bash
# Find CSS files not imported anywhere
find src/styles -name "*.css" | while read f; do
  basename=$(basename "$f")
  if ! grep -rl "$basename" src/ --include="*.tsx" --include="*.css" | grep -v "$f" > /dev/null 2>&1; then
    echo "ORPHANED: $f"
  fi
done

# Find unused data exports
grep -r "export " src/app/data/ --include="*.ts" | grep -o "export [a-zA-Z]* [a-zA-Z]*" | sort
```

---

## Audit Area 5: Trim Pattern Variants

**Problem:** Multiple pattern components serve near-identical purposes with minor differences, increasing the total component count and maintenance burden.

**Consolidation Candidates:**

| Pattern Family | Current Count | Target | Components |
|---------------|--------------|--------|------------|
| **Testimonials** | 8 | 3-4 | TestimonialCard, TestimonialGrid, TestimonialSlider, TestimonialInline, FeaturedTestimonial, VideoTestimonial, ServiceTestimonial, ServiceTestimonials |
| **CTAs** | 4 | 2 | FunkyCTA, CTAInline, CTASection, GradientCTASection |
| **Stats** | 3 | 1-2 | StatsGrid, StatsSection, StatCounter |
| **Related Content** | 5 | 2-3 | RelatedPosts, RelatedServices, RelatedServicesGrid, RelatedServicesInPhase, RelatedContentWidget |
| **Query Loops** | 13 | 5-7 | QueryLoop + 12 variants (Posts, Portfolio, Services, etc.) |

**Strategy:** Use component properties (props) instead of separate components:
```tsx
// BEFORE: 8 separate components
<TestimonialCard />
<TestimonialInline />
<FeaturedTestimonial />

// AFTER: 1 component with layout prop
<Testimonial layout="card" />
<Testimonial layout="inline" />
<Testimonial layout="featured" />
```

---

## Execution Instructions

### For AI Agent:

1. **Run quantitative analysis** using `bash` tool:
   - Count lines in all file categories
   - List files > 500, 800, 1,000 lines
   - Identify CSS import chains (what imports what)
   - Check for orphaned files

2. **Analyze each audit area** in order (1-5):
   - Document specific files and line counts
   - Estimate savings per action
   - Note dependencies and risks

3. **Write report** to `/reports/2026-03/memory-reduction-audit-march-5.md`

4. **Create task list** to `/tasks/memory-reduction-tasks.md`

5. **Update general task list** at `/tasks/task-list.md`

---

## Constraints

- **NEVER delete service template files** -- consolidation means reorganizing, not deleting
- **Maintain 100% CSS variable compliance** -- no hardcoded values
- **Preserve all functionality** -- only remove truly unused code
- **Test after each change** -- verify no broken imports or missing styles
- **Update imports** -- when moving/splitting files, update all references

---

**End of Prompt**
