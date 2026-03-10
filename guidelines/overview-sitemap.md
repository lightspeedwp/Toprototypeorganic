# Site Architecture & URL Structure

## Purpose

This document defines the **site architecture, URL structure, and page hierarchy** for the LightSpeed Tour Operator plugin prototype, mapping React routes to WordPress template hierarchy.

**Last Updated:** February 16, 2026

---

## Site Structure

```
/
├── / (Home)
│
├── /tours
│   ├── /tours (Archive)
│   ├── /tours/:slug (Single Tour)
│   ├── /tours/travel-style/:slug (Taxonomy: Travel Style)
│   └── /tours/layout-b (Alternate layout)
│
├── /destinations
│   ├── /destinations (Archive)
│   ├── /destinations/:slug (Single Destination)
│   └── /destinations/continent/:slug (Taxonomy: Continent)
│
├── /accommodation
│   ├── /accommodation (Archive)
│   ├── /accommodation/:slug (Single Accommodation)
│   ├── /accommodation/type/:slug (Taxonomy: Type)
│   ├── /accommodation/brand/:slug (Taxonomy: Brand)
│   └── /accommodation/style/:slug (Taxonomy: Travel Style)
│
├── /blog
│   ├── /blog (Archive)
│   ├── /blog/:slug (Single Post)
│   ├── /blog/category/:slug (Taxonomy: Category)
│   ├── /blog/tag/:slug (Taxonomy: Tag)
│   └── /blog/author/:slug (Author Archive)
│
├── /reviews
│   ├── /reviews (Archive)
│   ├── /reviews/:slug (Single Review)
│   └── /reviews/category/:slug (Taxonomy: Category)
│
├── /team
│   ├── /team (Archive)
│   ├── /team/:slug (Single Team Member)
│   └── /team/role/:slug (Taxonomy: Role)
│
├── /specials
│   ├── /specials (Archive)
│   ├── /specials/:slug (Single Special)
│   └── /specials/category/:slug (Taxonomy: Category)
│
├── /faqs
│   ├── /faqs (Archive — aggregated)
│   └── /faqs/category/:slug (Taxonomy: Category)
│
├── /travel-styles/:slug (Shared Taxonomy)
│
├── Utility Pages
│   ├── /about
│   ├── /contact
│   ├── /faq
│   ├── /privacy-policy
│   ├── /terms-conditions
│   ├── /why-book-with-us
│   └── /sitemap
│
├── Conversion Pages
│   ├── /reviews-hub
│   ├── /quote-request
│   ├── /destination-guides
│   ├── /travel-insurance
│   ├── /newsletter
│   └── /packing-guides
│
├── Booking & Account
│   ├── /booking
│   ├── /booking/confirmation
│   ├── /booking/confirmation/enhanced
│   ├── /booking/management
│   ├── /payment
│   ├── /login
│   ├── /register
│   ├── /profile
│   ├── /profile/passengers
│   ├── /profile/settings
│   ├── /wishlist
│   ├── /compare
│   ├── /gallery
│   └── /trip-planner
│
├── Search
│   ├── /search
│   └── /search/advanced
│
└── Developer Tools (30 routes)
    ├── /dev-tools (Hub)
    ├── /dev-tools/style-guide
    ├── /dev-tools/typography
    ├── /dev-tools/spacing
    ├── /dev-tools/shadow
    ├── /dev-tools/radius
    ├── /dev-tools/buttons
    ├── /dev-tools/design-tokens
    ├── /dev-tools/design-playground
    ├── /dev-tools/component-showcase
    ├── /dev-tools/card-interactions
    ├── /dev-tools/animations
    ├── /dev-tools/section-presets
    ├── /dev-tools/documentation
    ├── /dev-tools/snippets
    ├── /dev-tools/code-quality
    ├── /dev-tools/visual-regression
    ├── /dev-tools/integration
    ├── /dev-tools/accessibility-audit
    ├── /dev-tools/component-api
    ├── /dev-tools/icons
    ├── /dev-tools/block-documentation
    ├── /dev-tools/header-footer
    ├── /dev-tools/deployment
    ├── /dev-tools/performance
    ├── /dev-tools/analytics
    ├── /dev-tools/template-tester
    ├── /dev-tools/design-blocks
    ├── /dev-tools/theme-blocks
    ├── /dev-tools/live-preview
    └── /dev-tools/hub (legacy)
```

---

## Primary Navigation Structure

### Header Mega Menu (5 dropdowns)

```
Tours
├── By Style
│   ├── Adventure Tours (/tours/travel-style/adventure)
│   ├── Cultural Tours (/tours/travel-style/cultural)
│   └── Wildlife Safaris (/tours/travel-style/wildlife)
└── Quick Links
    ├── All Tours (/tours)
    └── Special Offers (/specials)

Destinations
├── Featured
│   ├── Antarctica (/destinations/antarctica)
│   ├── Arctic (/destinations/arctic)
│   └── Patagonia (/destinations/patagonia)
└── Explore
    └── All Destinations (/destinations)

Accommodation
├── Types
│   ├── Luxury Lodges (/accommodation/type/lodge)
│   ├── Expedition Ships (/accommodation/type/expedition-ship)
│   └── Wilderness Camps (/accommodation/type/camp)
└── Quick Links
    ├── All Accommodation (/accommodation)
    └── Special Offers (/specials)

Blog
├── Categories
│   ├── Travel Tips (/blog/category/travel-tips)
│   ├── Destination Guides (/blog/category/destination-guides)
│   └── Wildlife & Nature (/blog/category/wildlife-nature)
└── Explore
    └── All Articles (/blog)

About
├── Company
│   ├── About Us (/about)
│   ├── Our Team (/team)
│   └── Guest Reviews (/reviews)
└── Support
    ├── FAQs (/faqs)
    ├── Why Book With Us (/why-book-with-us)
    └── Contact Us (/contact)
```

---

## Template Hierarchy Mapping

### Content Archive Templates

| URL Pattern | WordPress Template | React Component |
|---|---|---|
| `/tours` | `archive-tour.html` | `ArchiveTourTemplate` |
| `/destinations` | `archive-destination.html` | `ArchiveDestinationTemplate` |
| `/accommodation` | `archive-accommodation.html` | `AccommodationArchive` |
| `/blog` | `archive-post.html` | `BlogArchive` |
| `/reviews` | `archive-review.html` | `ReviewsArchive` |
| `/team` | `archive-team.html` | `TeamArchive` |
| `/specials` | `archive-special.html` | `SpecialsArchive` |
| `/faqs` | `archive-faq.html` | `FAQsArchivePage` |

### Content Single Templates

| URL Pattern | WordPress Template | React Component |
|---|---|---|
| `/tours/:slug` | `single-tour.html` | `SingleTourTemplate` |
| `/destinations/:slug` | `single-destination.html` | `SingleDestinationTemplate` |
| `/accommodation/:slug` | `single-accommodation.html` | `AccommodationSingle` |
| `/blog/:slug` | `single-post.html` | `BlogSingle` |
| `/reviews/:slug` | `single-review.html` | `ReviewSingle` |
| `/team/:slug` | `single-team.html` | `TeamSingle` |
| `/specials/:slug` | `single-special.html` | `SpecialSingle` |

### Taxonomy Archive Templates

| URL Pattern | WordPress Template | React Component |
|---|---|---|
| `/tours/travel-style/:slug` | `taxonomy-travel_style.html` | `TaxonomyArchive` |
| `/destinations/continent/:slug` | `taxonomy-continent.html` | `TaxonomyArchive` |
| `/accommodation/type/:slug` | `taxonomy-accommodation_type.html` | `TaxonomyArchive` |
| `/accommodation/brand/:slug` | `taxonomy-brand.html` | `TaxonomyArchive` |
| `/blog/category/:slug` | `taxonomy-category.html` | `TaxonomyArchive` |
| `/blog/tag/:slug` | `taxonomy-post_tag.html` | `TaxonomyArchive` |
| `/reviews/category/:slug` | `taxonomy-review_category.html` | `TaxonomyArchive` |
| `/team/role/:slug` | `taxonomy-team_role.html` | `TaxonomyArchive` |
| `/specials/category/:slug` | `taxonomy-special_category.html` | `TaxonomyArchive` |
| `/travel-styles/:slug` | `taxonomy-travel_style.html` | `TaxonomyArchive` |

---

## Route Configuration

All routes are defined in `/src/app/routes.ts` using React Router Data Mode:

```typescript
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    Component: RootLayout,  // Header + Footer shell
    children: [
      { index: true, Component: HomePage },
      { path: "tours", children: [...] },
      { path: "destinations", children: [...] },
      // ... all routes
      { path: "*", Component: NotFoundPage },
    ],
  },
];

export const router = createBrowserRouter(routes);
```

**Key conventions:**
- All page components use lazy loading (`lazy(() => import(...)`)
- RootLayout provides Header + Footer for all pages
- Catch-all `*` route handles 404s
- `/sitemap` provides a visual index of all routes
