# Site Structure Overview

**Version:** 1.0  
**Last Updated:** 2025-12-24  
**Purpose:** Complete sitemap breakdown for the LightSpeed Tour Operator prototype

---

## Overview

This document provides a comprehensive breakdown of the prototype's information architecture, mapping all pages, templates, and navigation patterns to WordPress block theme concepts. The structure follows content-first principles with canonical content types and reusable layout patterns.

---

## Site Hierarchy

### Level 1: Primary Navigation

**Main Navigation Items (Global Header):**

```
├── Tours (Archive)
├── Destinations (Archive)
├── Accommodation (Archive - Future)
├── Specials (Archive - Future)
├── Team (Archive - Future)
├── Blog (Archive)
├── About (Utility Page - Future)
└── Contact (Utility Page - Future)
```

**WordPress Mapping:**
- Header navigation = `parts/header.html` template part
- Navigation menu = Core Navigation block
- Menu items = Custom post type archives + core pages

---

## Content Type Archives

### 1. Tours Archive (`/tours`)

**URL:** `/tours`  
**Template:** `ToursArchive.tsx`  
**Archetype:** Content Hub  
**WordPress:** `templates/archive-tour.html`

**Pattern Composition:**
1. Hero - Page introduction with featured image
2. TaxonomyNav - Filter by Travel Styles
3. CardGrid - Display tour cards
4. CTA - Contact/inquiry call-to-action

**Navigation:**
- Links to: Individual tour pages (`/tours/{slug}`)
- Filters by: Travel Styles taxonomy
- Related: Destinations, Accommodation

### 2. Destinations Archive (`/destinations`)

**URL:** `/destinations`  
**Template:** `DestinationsArchive.tsx`  
**Archetype:** Content Hub (Hierarchical)  
**WordPress:** `templates/archive-destination.html`

**Pattern Composition:**
1. Hero - Page introduction
2. CardGrid - Display destination cards (parent destinations)
3. CTA - Explore destinations

**Navigation:**
- Links to: Individual destination pages (`/destinations/{slug}`)
- Hierarchical: Parent destinations → Child destinations
- Related: Tours, Accommodation

### 3. Blog Archive (`/blog`)

**URL:** `/blog`  
**Template:** `BlogArchive.tsx`  
**Archetype:** Editorial Listing  
**WordPress:** `templates/home.html` (blog archive)

**Pattern Composition:**
1. ArchiveHeader - Blog listing header
2. CardGrid - Display blog post cards
3. Pagination - Browse multiple pages (future)
4. CTA - Newsletter signup (future)

**Navigation:**
- Links to: Individual blog posts (`/blog/{slug}`)
- Filters by: Blog Categories (future)
- Related: Blog Tags (secondary)

### 4. Travel Style Archive (`/travel-styles/{slug}`)

**URL:** `/travel-styles/{slug}` (e.g., `/travel-styles/adventure`)  
**Template:** `TaxonomyArchive.tsx`  
**Archetype:** Taxonomy Archive  
**WordPress:** `templates/taxonomy-travel-style.html`

**Pattern Composition:**
1. ArchiveHeader - Taxonomy term description
2. TaxonomyNav - Sibling travel styles navigation
3. CardGrid - Tours in this travel style
4. Pagination - Browse results (future)
5. CTA - Contact for custom tours

**Navigation:**
- Links to: Tours in this style
- Related: Other travel styles (siblings)
- Parent: Tours archive

### 5. Accommodation Archive (`/accommodation`) - Future

**URL:** `/accommodation`  
**Template:** `AccommodationArchive.tsx` (future)  
**Archetype:** Content Hub  
**WordPress:** `templates/archive-accommodation.html`

**Pattern Composition:**
1. Hero - Accommodation introduction
2. TaxonomyNav - Filter by Accommodation Types
3. CardGrid - Display accommodation cards
4. CTA - Booking inquiry

### 6. Specials Archive (`/specials`) - Future

**URL:** `/specials`  
**Template:** `SpecialsArchive.tsx` (future)  
**Archetype:** Content Hub  
**WordPress:** `templates/archive-special.html`

**Pattern Composition:**
1. Hero - Current offers
2. CardGrid - Display special cards (time-sensitive)
3. CTA - Book now

### 7. Team Archive (`/team`) - Future

**URL:** `/team`  
**Template:** `TeamArchive.tsx` (future)  
**Archetype:** Content Hub  
**WordPress:** `templates/archive-team.html`

**Pattern Composition:**
1. Hero - Meet the team
2. CardGrid - Display team member cards
3. FAQ - Team/company FAQs
4. CTA - Join our team / Contact

---

## Single Detail Pages

### 1. Tour Single (`/tours/{slug}`)

**URL:** `/tours/iceland-explorer`  
**Template:** `TourSingle.tsx`  
**Archetype:** Single Detail  
**WordPress:** `templates/single-tour.html`

**Pattern Composition:**
1. Hero - Tour hero image and title
2. EditorialContent - Tour narrative/overview
3. FastFacts - Quick tour details (duration, price, group size, etc.)
4. EditorialContent - Itinerary/highlights sections
5. FAQ - Tour-specific FAQs (future)
6. RelatedContent - Related tours
7. CTA - Booking inquiry

**Navigation:**
- Breadcrumbs: Home → Tours → {Travel Style} → {Tour Title}
- Links to: Related destinations, accommodation
- Back to: Tours archive

### 2. Destination Single (`/destinations/{slug}`)

**URL:** `/destinations/south-africa`  
**Template:** `DestinationSingle.tsx`  
**Archetype:** Single Detail  
**WordPress:** `templates/single-destination.html`

**Pattern Composition:**
1. Hero - Destination hero image
2. EditorialContent - Destination overview
3. FastFacts - Quick destination info (climate, currency, language, etc.)
4. TaxonomyNav - Child destinations (if parent)
5. RelatedContent - Tours to this destination
6. FAQ - Destination-specific FAQs (future)
7. CTA - Plan your visit

**Navigation:**
- Breadcrumbs: Home → Destinations → {Parent (if child)} → {Destination}
- Links to: Tours, accommodation in this destination
- Hierarchical: Child destinations if parent

### 3. Blog Post Single (`/blog/{slug}`) - Future

**URL:** `/blog/top-safari-packing-tips`  
**Template:** `BlogSingle.tsx` (future)  
**Archetype:** Single Detail (Editorial)  
**WordPress:** `templates/single-post.html`

**Pattern Composition:**
1. Hero - Featured image and title
2. Post meta - Author, date, categories
3. EditorialContent - Post content
4. RelatedContent - Related blog posts
5. CTA - Newsletter signup

---

## Utility Pages

### 1. FAQ Page (`/faq`)

**URL:** `/faq`  
**Template:** `FAQPage.tsx`  
**Archetype:** Utility Page  
**WordPress:** `templates/page-faq.html`

**Pattern Composition:**
1. Hero - Page introduction
2. FAQ Pattern - Accordion-based Q&A
3. CTA - Contact for more questions

**Content:** General safari/travel FAQs

### 2. About Page (`/about`) - Future

**URL:** `/about`  
**Template:** `AboutPage.tsx` (future)  
**Archetype:** Utility Page  
**WordPress:** `templates/page-about.html`

**Pattern Composition:**
1. Hero - Company introduction
2. EditorialContent - Company story/mission
3. FastFacts - Company stats/achievements
4. CardGrid - Team member highlights (subset)
5. FAQ - Company-specific FAQs
6. CTA - Contact us / Join us

### 3. Contact Page (`/contact`) - Future

**URL:** `/contact`  
**Template:** `ContactPage.tsx` (future)  
**Archetype:** Utility Page  
**WordPress:** `templates/page-contact.html`

**Pattern Composition:**
1. Hero - Get in touch
2. EditorialContent - Contact methods/office locations
3. Contact Form - Inquiry form (future)
4. FAQ - Contact-related FAQs
5. CTA - Visit us / Call us

---

## Template Parts

### 1. Site Header

**Component:** `Header.tsx`  
**Location:** `/src/app/components/parts/`  
**WordPress:** `parts/header.html`

**Elements:**
- Site logo/title (links to home)
- Primary navigation menu
- Mobile menu toggle
- Sticky positioning

**Links:**
- Home: `#home`
- Tours: `#tours`
- Destinations: `#destinations`
- Accommodation: `#accommodation`
- Specials: `#specials`
- Team: `#team`
- Blog: `#blog`
- About: `#about`
- Contact: `#contact`

### 2. Site Footer

**Component:** `Footer.tsx`  
**Location:** `/src/app/components/parts/`  
**WordPress:** `parts/footer.html`

**Sections:**
- Company info
- Quick links (navigation)
- Social media links
- Newsletter signup (future)
- Copyright notice

**Links:**
- All primary navigation items
- Legal pages (Privacy, Terms - future)
- Social profiles

---

## Navigation Patterns

### Primary Navigation

**Location:** Site Header  
**Type:** Horizontal menu (desktop) / Hamburger menu (mobile)  
**Items:**
- Tours
- Destinations
- Accommodation
- Specials
- Team
- Blog
- About
- Contact

**Behavior:**
- Active state for current page
- Hover states
- Mobile collapsible

### Breadcrumbs

**Location:** Below header on single pages  
**Type:** Hierarchical navigation trail  
**Format:** Home → Archive → [Taxonomy] → Current Page

**Examples:**
- Tour: `Home → Tours → Adventure → Iceland Explorer`
- Destination: `Home → Destinations → South Africa → Cape Town`
- Blog: `Home → Blog → Travel Tips → Article Title`

**Implementation:** Future - needs Breadcrumb component

### Taxonomy Navigation

**Location:** Archive pages  
**Type:** Horizontal pill/chip navigation  
**Purpose:** Filter content by taxonomy terms

**Used on:**
- Tours Archive (filter by Travel Styles)
- Travel Style Archive (show sibling styles)
- Destination Single (show child destinations)

### Pagination

**Location:** Archive pages with many items  
**Type:** Numbered page navigation  
**Implementation:** Future - using PageNav pattern

### Related Content Links

**Location:** Single detail pages  
**Type:** Card grid of related items  
**Purpose:** Cross-link related content

**Used on:**
- Tour Single → Related tours
- Destination Single → Tours to this destination
- Blog Single → Related articles

---

## URL Structure

### Content Types

```
/tours                          → Tours Archive
/tours/{slug}                   → Tour Single

/destinations                   → Destinations Archive
/destinations/{slug}            → Destination Single
/destinations/{parent}/{child}  → Child Destination (hierarchical)

/travel-styles/{slug}           → Travel Style Taxonomy Archive

/accommodation                  → Accommodation Archive (future)
/accommodation/{slug}           → Accommodation Single (future)

/specials                       → Specials Archive (future)
/specials/{slug}                → Special Single (future)

/team                          → Team Archive (future)
/team/{slug}                   → Team Member Single (future)

/blog                          → Blog Archive
/blog/{slug}                   → Blog Post Single (future)
/blog/category/{slug}          → Blog Category Archive (future)

/faq                           → FAQ Page
/about                         → About Page (future)
/contact                       → Contact Page (future)
```

### WordPress Mapping

```
React Route              → WordPress Template
-----------------------------------------------
/tours                   → archive-tour.html
/tours/{slug}            → single-tour.html
/destinations            → archive-destination.html
/destinations/{slug}     → single-destination.html
/travel-styles/{slug}    → taxonomy-travel-style.html
/blog                    → home.html (posts archive)
/blog/{slug}             → single-post.html
/faq                     → page-faq.html
/about                   → page-about.html
/contact                 → page-contact.html
```

---

## Content Relationships

### Tours

**Related Content:**
- Travel Styles (taxonomy) - many-to-many
- Destinations - many-to-many
- Accommodation - many-to-many

**Appears on:**
- Tours Archive
- Travel Style Archives
- Destination Singles
- Tour Single

### Destinations

**Related Content:**
- Parent/Child Destinations (hierarchical)
- Tours - many-to-many
- Accommodation - many-to-many

**Appears on:**
- Destinations Archive
- Destination Single (parent/children)
- Tour Single

### Travel Styles

**Related Content:**
- Tours - many-to-many

**Appears on:**
- Tours Archive (filter)
- Travel Style Archive
- Tour Single

### Blog Posts

**Related Content:**
- Categories (taxonomy)
- Tags (taxonomy)
- Author

**Appears on:**
- Blog Archive
- Category Archives
- Tag Archives (future)

---

## FAQ Integration

### Global FAQ

**Location:** `/faq`  
**Content Type:** Standalone page  
**Topics:** General safari/travel questions

### Contextual FAQs

**Tour FAQs:**
- Location: Tour Single pages
- Topics: Specific to that tour
- Placement: After itinerary, before related tours

**Destination FAQs:**
- Location: Destination Single pages
- Topics: Specific to that destination
- Placement: After overview, before related tours

**Company FAQs:**
- Location: About page
- Topics: Company policies, team, mission
- Placement: After team section

**Contact FAQs:**
- Location: Contact page
- Topics: Contact methods, response times, office hours
- Placement: Below contact form

**Implementation:** FAQ pattern component with mock data injection

---

## Search & Discovery

### Filters (Future)

**Tours Archive:**
- Travel Style (taxonomy)
- Destination
- Duration
- Price range
- Difficulty

**Blog Archive:**
- Category
- Date
- Author

### Search (Future)

**Global Search:**
- Location: Header
- Scope: All content types
- Results: Unified search results page

---

## Responsive Behavior

### Desktop (1024px+)

- Full horizontal navigation
- Multi-column card grids (3 columns)
- Side-by-side content layouts

### Tablet (768px - 1023px)

- Full horizontal navigation
- 2-column card grids
- Stacked content layouts

### Mobile (< 768px)

- Hamburger menu
- Single-column card grids
- Fully stacked layouts
- Touch-friendly tap targets (44px min)

---

## Future Expansions

### Phase 1 (Current)

✅ Tours Archive  
✅ Destinations Archive  
✅ Tour Single  
✅ Destination Single  
✅ Travel Style Archive  
✅ Blog Archive  
✅ FAQ Page  

### Phase 2 (Next)

- [ ] About Page with company FAQs
- [ ] Contact Page with contact FAQs
- [ ] Team Archive with team FAQs
- [ ] Accommodation Archive
- [ ] Specials Archive
- [ ] Blog Single

### Phase 3 (Future)

- [ ] Breadcrumb component integration
- [ ] Pagination component
- [ ] Search functionality
- [ ] Advanced filtering
- [ ] Accommodation Single
- [ ] Special Single
- [ ] Team Member Single
- [ ] Legal pages (Privacy, Terms)

---

## Page Archetype Reference

### Content Hub Archetype

**Pages:** Tours Archive, Destinations Archive, Accommodation Archive, Specials Archive, Team Archive

**Pattern Order:**
1. Hero
2. Filter/TaxonomyNav (optional)
3. CardGrid
4. Pagination (if needed)
5. CTA

### Taxonomy Archive Archetype

**Pages:** Travel Style Archive, Blog Category Archive

**Pattern Order:**
1. ArchiveHeader
2. TaxonomyNav (siblings)
3. CardGrid
4. Pagination (if needed)
5. CTA

### Single Detail Archetype

**Pages:** Tour Single, Destination Single, Blog Single, Accommodation Single

**Pattern Order:**
1. Hero
2. EditorialContent (primary)
3. Meta/FastFacts
4. EditorialContent (secondary sections)
5. FAQ (contextual)
6. RelatedContent
7. CTA

### Editorial Listing Archetype

**Pages:** Blog Archive

**Pattern Order:**
1. ArchiveHeader
2. CardGrid (posts)
3. Pagination
4. CTA (newsletter)

### Utility Page Archetype

**Pages:** FAQ, About, Contact

**Pattern Order:**
1. Hero/PageHeader
2. EditorialContent
3. Structured utility block (FAQ accordion, contact form)
4. FAQ (contextual)
5. CTA

---

## Accessibility Considerations

### Heading Hierarchy

- One H1 per page (page title in Hero)
- Logical H2 → H3 → H4 progression
- No skipped heading levels

### Keyboard Navigation

- All interactive elements keyboard-accessible
- Visible focus indicators
- Skip to content link (future)
- Logical tab order

### ARIA Labels

- Navigation landmarks
- Main content landmarks
- Complementary content (sidebars)
- Form labels
- Button labels (icon-only buttons)

### Color Contrast

- Minimum 4.5:1 for body text
- Minimum 3:1 for large text (18pt+)
- All design tokens meet WCAG 2.1 AA standards

---

## Related Documentation

- **[Guidelines.md](Guidelines.md)** - Main guidelines entry point
- **[overview-components.md](overview-components.md)** - Component architecture
- **[overview-patterns.md](overview-patterns.md)** - Block patterns and composition
- **[blocks/overview-blocks.md](blocks/overview-blocks.md)** - WordPress blocks and tour operator blocks
- **[overview-icons.md](overview-icons.md)** - Icon system and usage
- **[design-tokens/colors.md](design-tokens/colors.md)** - Color system
- **[design-tokens/typography.md](design-tokens/typography.md)** - Typography scale
- **[design-tokens/spacing.md](design-tokens/spacing.md)** - Spacing system

---

## Summary

This site structure follows WordPress block theme architecture with:

- **7+ page templates** (archive, single, taxonomy, utility)
- **2 template parts** (header, footer)
- **5 content types** (Tours, Destinations, Accommodation, Specials, Team)
- **Hierarchical content** (parent/child destinations)
- **Taxonomy filtering** (Travel Styles, Blog Categories)
- **Reusable patterns** (Hero, CardGrid, FAQ, CTA, etc.)
- **Contextual FAQs** integrated across pages
- **Cross-linking** via related content

All structure maps directly to WordPress concepts, ensuring this prototype can be converted to a fully functioning WordPress block theme with minimal architectural changes.

---

**Version:** 1.0  
**Status:** Living Document  
**Maintained By:** LightSpeed Tour Operator Team