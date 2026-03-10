# WordPress Mapping Reference

This document provides a comprehensive map of how the React prototype structure corresponds to WordPress block theme architecture.

---

## Complete Directory Mapping

### React → WordPress Equivalents

| React Path | WordPress Path | Purpose | Notes |
|------------|----------------|---------|-------|
| `/src/app/` | Theme root | Application entry | Main application directory |
| `/src/app/pages/` | `templates/*.html` | Page templates | Archive, single, and custom templates |
| `/src/app/components/parts/` | `parts/*.html` | Template parts | Header, footer, reusable sections |
| `/src/app/components/patterns/` | `patterns/*.php` | Block patterns | Reusable content patterns |
| `/src/app/components/blocks/` | Core/custom blocks | Block implementations | Future: Custom WordPress blocks |
| `/src/app/components/common/` | N/A | Utility components | Not WordPress blocks |
| `/src/app/components/ui/` | N/A | UI library (shadcn) | Not WordPress blocks |
| `/src/app/data/` | Mock content | Content models | Represents WP posts/taxonomies |
| `/src/app/hooks/` | N/A | React hooks | Client-side only |
| `/src/app/lib/` | N/A | Utility functions | Helper functions |
| `/src/styles/` | `theme.json` + CSS | Design tokens | Theme configuration |

---

## Post Types

All post types defined in `/src/app/data/types.ts` and `/src/app/data/mock.ts`

| Mock Constant | WordPress Post Type | Hierarchical | Description |
|---------------|---------------------|--------------|-------------|
| `TOURS` | `tour` | No | Tour packages |
| `DESTINATIONS` | `destination` | Yes | Travel destinations |
| `ACCOMMODATION` | `accommodation` | No | Hotels, lodges, resorts |
| `SPECIALS` | `special` | No | Special offers/deals |
| `TEAM` | `team_member` | No | Team member profiles |
| `REVIEWS` | `review` | No | Customer reviews |
| `BLOG_POSTS` | `post` | No | Blog posts |
| `PAGES` | `page` | No | Core pages (About, Contact, FAQ) |

---

## Taxonomies

All taxonomies defined in `/src/app/data/types.ts` and `/src/app/data/mock.ts`

| Mock Constant | WordPress Taxonomy | Applies To | Hierarchical |
|---------------|-------------------|------------|--------------|
| `TRAVEL_STYLES` | `travel_style` | Tours, Accommodation, Destinations | No |
| `ACCOMMODATION_TYPES` | `accommodation_type` | Accommodation | No |
| `CONTINENTS` | `continent` | Destinations | No |
| `BRANDS` | `brand` | Accommodation | No |
| `FACILITIES` | `facility` | Accommodation | No |
| `BLOG_CATEGORIES` | `category` | Posts | Yes |
| `BLOG_TAGS` | `tag` | Posts | No |

---

## Components NOT Mapped to WordPress

These are utility components that enhance the user experience but do not have direct WordPress block equivalents:

### Common Components
- **BackToTopButton** (`/src/app/components/common/BackToTopButton.tsx`)
  - Client-side scroll utility
  - No WordPress equivalent
  - Added to PageLayout for site-wide functionality

- **ScrollDownArrow** (`/src/app/components/common/ScrollDownArrow.tsx`)
  - Client-side scroll indicator
  - No WordPress equivalent
  - Used in Hero sections

- **Logo** (`/src/app/components/common/Logo.tsx`)
  - Site branding component
  - Maps conceptually to WordPress site title
  - Uses `get_bloginfo('name')` in WP

- **Container** (`/src/app/components/common/Container.tsx`)
  - Width constraint wrapper
  - Similar to WordPress Group block with "Constrained" layout
  - Not a block itself, but a utility wrapper

- **Typography** (`/src/app/components/common/Typography.tsx`)
  - Typography utility component (future)
  - CSS-based styling approach
  - Uses design tokens from theme.css

### UI Library Components

All components in `/src/app/components/ui/` are from the shadcn/ui library:

- `accordion.tsx` - Accordion UI primitive
- `alert.tsx` - Alert/notification component
- `badge.tsx` - Badge/label component
- `button.tsx` - Button component
- `card.tsx` - Card container
- `dialog.tsx` - Modal dialog
- `input.tsx` - Form input
- `tabs.tsx` - Tab interface
- ... and many more

**WordPress Relationship:**
- These enhance WordPress blocks but are not blocks themselves
- Similar to how WordPress uses React components internally
- Provide consistent UI patterns across the application

### Layout Components

- **PageLayout** (`/src/app/components/layout/PageLayout.tsx`)
  - Overall page structure shell
  - Maps to WordPress template structure
  - Includes Header, Footer, and main content area

---

## Pattern Components

These components map directly to WordPress block patterns (reusable compositions of blocks):

| Component | File | WordPress Pattern | Contains |
|-----------|------|-------------------|----------|
| Hero | `/src/app/components/patterns/Hero.tsx` | Hero pattern | Cover block + heading + text |
| ArchiveHeader | `/src/app/components/patterns/ArchiveHeader.tsx` | Archive header | Heading + description |
| CardGrid | `/src/app/components/patterns/CardGrid.tsx` | Card grid pattern | Grid + custom cards |
| CTA | `/src/app/components/patterns/CTA.tsx` | CTA pattern | Container + heading + button |
| EditorialContent | `/src/app/components/patterns/EditorialContent.tsx` | Content block | Group + paragraph + image |
| FastFacts | `/src/app/components/patterns/FastFacts.tsx` | Meta info | List + icons + text |
| RelatedContent | `/src/app/components/patterns/RelatedContent.tsx` | Related items | Query loop + cards |
| FAQ | `/src/app/components/patterns/FAQ.tsx` | FAQ accordion | Accordion + items |
| TaxonomyNav | `/src/app/components/patterns/TaxonomyNav.tsx` | Term navigation | Navigation + links |

---

## Template Parts

These map directly to WordPress template parts:

| Component | File | WordPress Part | Description |
|-----------|------|----------------|-------------|
| Header | `/src/app/components/parts/Header.tsx` | `parts/header.html` | Site header with logo + nav |
| Footer | `/src/app/components/parts/Footer.tsx` | `parts/footer.html` | Site footer with links |

---

## Page Templates

These map directly to WordPress templates:

| Component | File | WordPress Template | Type |
|-----------|------|-------------------|------|
| ToursArchive | `/src/app/pages/ToursArchive.tsx` | `templates/archive-tour.html` | Archive |
| TourSingle | `/src/app/pages/TourSingle.tsx` | `templates/single-tour.html` | Single |
| DestinationsArchive | `/src/app/pages/DestinationsArchive.tsx` | `templates/archive-destination.html` | Archive |
| DestinationSingle | `/src/app/pages/DestinationSingle.tsx` | `templates/single-destination.html` | Single |
| AccommodationArchive | `/src/app/pages/AccommodationArchive.tsx` | `templates/archive-accommodation.html` | Archive |
| BlogArchive | `/src/app/pages/BlogArchive.tsx` | `templates/archive-post.html` | Archive |
| TaxonomyArchive | `/src/app/pages/TaxonomyArchive.tsx` | `templates/taxonomy-travel_style.html` | Taxonomy |
| TeamArchive | `/src/app/pages/TeamArchive.tsx` | `templates/archive-team_member.html` | Archive |
| AboutPage | `/src/app/pages/AboutPage.tsx` | `templates/page-about.html` | Page |
| ContactPage | `/src/app/pages/ContactPage.tsx` | `templates/page-contact.html` | Page |
| FAQPage | `/src/app/pages/FAQPage.tsx` | `templates/page-faq.html` | Page |

---

## Design System Mapping

### React → WordPress

| React File | WordPress File | Purpose |
|------------|----------------|---------|
| `/src/styles/theme.css` | `theme.json` + `style.css` | Design tokens, color palette |
| `/src/styles/fonts.css` | `style.css` | Font imports |
| `/src/styles/index.css` | `style.css` | Base styles |
| `/src/styles/tailwind.css` | N/A | Tailwind utilities (compiled) |

### CSS Variables → theme.json

All CSS custom properties in `/src/styles/theme.css` would map to `theme.json` settings:

```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "primary",
          "color": "rgba(74, 115, 17, 1)",
          "name": "Primary"
        },
        {
          "slug": "secondary",
          "color": "rgba(172, 159, 124, 1)",
          "name": "Secondary"
        }
        // ... more colors
      ]
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "'Lora', serif",
          "slug": "lora",
          "name": "Lora"
        },
        {
          "fontFamily": "'Noto Sans', sans-serif",
          "slug": "noto-sans",
          "name": "Noto Sans"
        }
      ],
      "fontSizes": [
        {
          "slug": "base",
          "size": "16px",
          "name": "Base"
        },
        {
          "slug": "2xl",
          "size": "32px",
          "name": "2XL"
        }
        // ... more sizes
      ]
    }
  }
}
```

---

## Summary of Non-WordPress Components

### Pure React/Client-Side

1. **BackToTopButton** - Scroll to top functionality
2. **ScrollDownArrow** - Scroll indicator
3. **Logo** - Site branding (links to home)
4. **Container** - Width constraint wrapper
5. **Typography** - Typography utility (future)
6. **All shadcn/ui components** - UI primitives (40+ components)
7. **PageLayout** - Page structure wrapper
8. **useIsMobile hook** - Responsive detection
9. **cn utility** - Class name helper
10. **All React Router components** - Client-side routing

### Why These Don't Map

These components are either:
- **Client-side only** (scroll behavior, responsive detection)
- **UI primitives** (buttons, inputs, dialogs from shadcn/ui)
- **Utility functions** (class name helpers, formatting)
- **Structural wrappers** (Container, PageLayout)

They enhance the WordPress block theme experience but exist as implementation details of the React prototype.

---

## Migration Path: React → WordPress

When converting this prototype to a WordPress block theme:

1. **Templates** (`/src/app/pages/*.tsx`) → Create matching `templates/*.html` files
2. **Template Parts** (`/src/app/components/parts/*.tsx`) → Create `parts/*.html` files
3. **Patterns** (`/src/app/components/patterns/*.tsx`) → Create `patterns/*.php` files
4. **Design Tokens** (`/src/styles/theme.css`) → Convert to `theme.json`
5. **Post Types/Taxonomies** → Register via `functions.php`
6. **Mock Data** → Import as real WordPress content

**Exclude from WordPress:**
- `/src/app/components/common/*` - Implementation details
- `/src/app/components/ui/*` - UI library
- `/src/app/hooks/*` - Client-side hooks
- `/src/app/lib/*` - Utility functions

**WordPress Handles Differently:**
- Routing - WordPress uses permalinks
- Data fetching - WordPress uses WP_Query
- State management - WordPress uses server-side rendering

---

## Quick Reference

**WordPress Blocks** = `/src/app/components/blocks/` (future)
**WordPress Patterns** = `/src/app/components/patterns/`
**WordPress Template Parts** = `/src/app/components/parts/`
**WordPress Templates** = `/src/app/pages/`
**WordPress Content** = `/src/app/data/`
**WordPress Design** = `/src/styles/theme.css` → `theme.json`

**NOT WordPress**:
- `/src/app/components/common/` - Utilities
- `/src/app/components/ui/` - UI library
- `/src/app/hooks/` - React hooks
- `/src/app/lib/` - Helpers

---

This mapping ensures that the React prototype validates the WordPress block theme architecture while using modern development tools and workflows.
