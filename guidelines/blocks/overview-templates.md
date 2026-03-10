# WordPress Templates Overview

## Purpose

This document defines **WordPress page templates** and the five canonical archetypes used in the LightSpeed Tour Operator plugin prototype.

---

## What Are Templates?

In WordPress block themes, **templates** define the structure and pattern order for specific page types:

- **Compositional** - Assemble patterns in fixed order
- **Type-specific** - One template per content/page type
- **Enforced structure** - No layout variation
- **Deterministic** - Same content type = same structure

---

## Template Hierarchy

WordPress resolves templates in this order:

### Archive Templates
```
1. archive-{post-type}.html       (e.g., archive-tour.html)
2. archive.html                    (generic archive)
3. index.html                      (fallback)
```

### Single Templates
```
1. single-{post-type}-{slug}.html (e.g., single-tour-iceland-explorer.html)
2. single-{post-type}.html        (e.g., single-tour.html)
3. single.html                     (generic single)
4. index.html                      (fallback)
```

### Taxonomy Templates
```
1. taxonomy-{taxonomy}-{term}.html
2. taxonomy-{taxonomy}.html
3. taxonomy.html
4. archive.html
5. index.html
```

### Page Templates
```
1. page-{slug}.html
2. page-{id}.html
3. page.html
4. index.html
```

---

## Five Canonical Archetypes

All pages must conform to **exactly one** of these archetypes.

### 1. Content Hub Archetype

**Purpose:** Top-level discovery for a single post type

**React Template:** `ToursArchive.tsx`, `DestinationsArchive.tsx`, etc.

**WordPress Template:** `archive-{post-type}.html`

**Required Pattern Order:**
1. Hero
2. Filter / taxonomy navigation (optional)
3. Card grid
4. FAQ section
5. CTA (optional)

**Example:**
```typescript
export default function ToursArchive() {
  return (
    <PageLayout>
      <Hero
        title="Our Tours"
        excerpt="Discover unforgettable adventures..."
      />
      <TaxonomyNav terms={travelStyles} />
      <CardGrid items={tours} CardComponent={TourCard} />
      <FAQ items={toursFAQ} />
      <CTA title="Custom Tour?" primaryAction={{ label: "Contact Us", href: "/contact" }} />
    </PageLayout>
  );
}
```

**WordPress Equivalent:**
```html
<!-- templates/archive-tour.html -->
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:pattern {"slug":"lightspeed/hero"} /-->
<!-- wp:pattern {"slug":"lightspeed/taxonomy-nav"} /-->
<!-- wp:query -->
  <!-- wp:post-template /-->
<!-- /wp:query -->
<!-- wp:pattern {"slug":"lightspeed/faq"} /-->
<!-- wp:pattern {"slug":"lightspeed/cta"} /-->

<!-- wp:template-part {"slug":"footer"} /-->
```

---

### 2. Taxonomy Archive Archetype

**Purpose:** Filtered views for taxonomy terms

**React Template:** `TaxonomyArchive.tsx`

**WordPress Template:** `taxonomy-{taxonomy}.html`

**Required Pattern Order:**
1. Archive header
2. Taxonomy navigation (siblings/children) (optional)
3. Card grid
4. Pagination (if needed)
5. FAQ section
6. CTA (optional)

**Example:**
```typescript
export default function TaxonomyArchive({ term }) {
  return (
    <PageLayout>
      <ArchiveHeader
        title={term.name}
        description={term.description}
        resultCount={filteredTours.length}
      />
      <TaxonomyNav terms={siblingTerms} activeTermId={term.id} />
      <CardGrid items={filteredTours} CardComponent={TourCard} />
      <FAQ items={taxonomyFAQ} />
      <CTA title="Not sure which tour?" primaryAction={{ label: "Contact Us", href: "/contact" }} />
    </PageLayout>
  );
}
```

---

### 3. Single Detail Archetype

**Purpose:** Consumption → context → discovery → conversion

**React Template:** `TourSingle.tsx`, `DestinationSingle.tsx`, etc.

**WordPress Template:** `single-{post-type}.html`

**Required Pattern Order:**
1. Hero
2. Editorial content (primary narrative)
3. Meta / quick-facts
4. Supporting editorial sections (optional)
5. Cross-link / related content
6. FAQ section
7. CTA (enquiry / next step)

**Example:**
```typescript
export default function TourSingle({ tour }) {
  return (
    <PageLayout>
      <Hero
        title={tour.title}
        excerpt={tour.excerpt}
        taxonomyLabel={tour.travelStyle}
      />
      <EditorialContent content={tour.content} />
      <FastFacts facts={tourFacts} />
      <EditorialContent
        sections={[
          { heading: "What's Included", content: tour.included },
          { heading: "Itinerary", content: tour.itinerary }
        ]}
      />
      <RelatedContent
        title="Similar Tours"
        items={relatedTours}
        CardComponent={TourCard}
        limit={3}
      />
      <FAQ items={tourFAQ} />
      <CTA
        title="Ready to Book?"
        description="Contact us to reserve your spot"
        primaryAction={{ label: "Enquire Now", href: "/contact" }}
      />
    </PageLayout>
  );
}
```

---

### 4. Editorial Listing Archetype

**Purpose:** Blog discovery without commercial mixing

**React Template:** `BlogArchive.tsx`

**WordPress Template:** `home.html` / `archive.html`

**Required Pattern Order:**
1. Listing header
2. Card grid (posts only)
3. Pagination/load more
4. FAQ section (optional)

**Example:**
```typescript
export default function BlogArchive({ posts, currentPage, totalPages }) {
  return (
    <PageLayout>
      <ArchiveHeader
        title="Travel Blog"
        description="Travel tips, destination guides, and inspiration"
      />
      <CardGrid items={posts} CardComponent={BlogCard} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </PageLayout>
  );
}
```

---

### 5. Utility Page Archetype

**Purpose:** Trust, support, and operational pages

**React Template:** `AboutPage.tsx`, `ContactPage.tsx`, `FAQPage.tsx`

**WordPress Template:** `page-{slug}.html`

**Required Pattern Order:**
1. Page header
2. Editorial content blocks
3. Structured utility block (optional)
4. CTA (optional)

**Example (About Page):**
```typescript
export default function AboutPage() {
  return (
    <PageLayout>
      <Hero title="About Us" />
      <EditorialContent content={aboutContent} />
      <CardGrid items={teamMembers} CardComponent={TeamCard} />
      <CTA
        title="Ready to Start Your Adventure?"
        primaryAction={{ label: "View Tours", href: "/tours" }}
      />
    </PageLayout>
  );
}
```

**Example (FAQ Page):**
```typescript
export default function FAQPage() {
  return (
    <PageLayout>
      <Hero title="Frequently Asked Questions" />
      <EditorialContent content={faqIntro} />
      <FaqAccordion items={faqItems} />
      <CTA
        title="Still Have Questions?"
        primaryAction={{ label: "Contact Us", href: "/contact" }}
      />
    </PageLayout>
  );
}
```

---

## Template Rules

### 1. Fixed Pattern Order

Templates enforce a **non-negotiable pattern order**:

**✅ Good:**
```typescript
<PageLayout>
  <Hero />           {/* 1. Hero */}
  <CardGrid />       {/* 2. Card grid */}
  <CTA />            {/* 3. CTA */}
</PageLayout>
```

**❌ Bad:**
```typescript
<PageLayout>
  <CTA />            {/* Out of order */}
  <Hero />
  <CardGrid />
</PageLayout>
```

---

### 2. Optional Patterns

Patterns can be omitted if content is missing:

**✅ Good:**
```typescript
<PageLayout>
  <Hero />
  {taxonomyTerms.length > 0 && <TaxonomyNav terms={taxonomyTerms} />}
  <CardGrid />
  <CTA />
</PageLayout>
```

---

### 3. One Archetype Per Page

Pages must conform to **exactly one archetype**:

**✅ Good:**
```typescript
// This is a Content Hub
<PageLayout>
  <Hero />
  <TaxonomyNav />
  <CardGrid />
  <CTA />
</PageLayout>
```

**❌ Bad:**
```typescript
// Mixing archetypes
<PageLayout>
  <Hero />           {/* Content Hub */}
  <EditorialContent /> {/* Single Detail */}
  <CardGrid />       {/* Content Hub */}
</PageLayout>
```

---

## Template to Archetype Mapping

| Template | Archetype | WordPress Template |
|----------|-----------|-------------------|
| ToursArchive | Content Hub | archive-tour.html |
| DestinationsArchive | Content Hub | archive-destination.html |
| TaxonomyArchive | Taxonomy Archive | taxonomy-travel-style.html |
| TourSingle | Single Detail | single-tour.html |
| DestinationSingle | Single Detail | single-destination.html |
| BlogArchive | Editorial Listing | home.html |
| AboutPage | Utility Page | page-about.html |
| ContactPage | Utility Page | page-contact.html |
| FAQPage | Utility Page | page-faq.html |

---

## Related Documentation

- [blocks/overview-blocks.md](overview-blocks.md) - Block components
- [blocks/overview-patterns.md](overview-patterns.md) - Pattern compositions
- [blocks/overview-parts.md](overview-parts.md) - Template parts
- [Guidelines.md](../Guidelines.md) - Page archetypes
- [overview-sitemap.md](../overview-sitemap.md) - Site structure
