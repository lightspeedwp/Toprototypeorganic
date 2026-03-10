# LightSpeed Tour Operator — Complete Guidelines Index

**Version:** V3 — WordPress-Native Alignment  
**Last Updated:** December 2024

This document provides a **complete index** of all guidelines, documentation, and resources for the LightSpeed Tour Operator plugin prototype.

---

## Quick Start Checklist

Before writing any code, complete these steps **in order**:

- [ ] Read [Guidelines.md](Guidelines.md) - Entry point and system principles
- [ ] Read all **Overview** files (architecture, components, patterns, icons)
- [ ] Read all **Design Tokens** files (colors, typography, spacing, borders, radii, shadows)
- [ ] Read **Component Guidelines** for components you'll use
- [ ] Read **Pattern Guidelines** for patterns you'll implement
- [ ] Read **Icon Guidelines** and verify icons exist before importing
- [ ] Read **Mobile Guidelines** for responsive implementation
- [ ] Read **Theme Variations** for light/dark mode implementation

---

## Core Documentation

### Entry Point

| Document | Purpose | Priority |
|----------|---------|----------|
| [Guidelines.md](Guidelines.md) | System entry point, core principles | **REQUIRED** |

---

## System Architecture

### Overview Files (All Required)

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Complete system architecture with WordPress mapping |
| [overview-components.md](overview-components.md) | Component architecture, directory structure, import conventions |
| [overview-patterns.md](overview-patterns.md) | Block patterns, composition rules, pattern taxonomy |
| [overview-icons.md](overview-icons.md) | Icon system, verification process, usage guidelines |
| [overview-sitemap.md](overview-sitemap.md) | Site structure and URL patterns |

### Supporting Architecture

| Document | Purpose |
|----------|---------|
| [COMPONENT-INDEX.md](COMPONENT-INDEX.md) | Comprehensive component catalog |
| [THEME-VARIATIONS.md](THEME-VARIATIONS.md) | Light/dark mode theme system |
| [design-patterns-modern.md](design-patterns-modern.md) | Modern design patterns and best practices |

---

## Design Tokens (All Required)

### Core Tokens

| Document | Covers |
|----------|--------|
| [design-tokens/colors.md](design-tokens/colors.md) | Semantic color system with dark mode support |
| [design-tokens/typography.md](design-tokens/typography.md) | Typography hierarchy, font families, usage rules |
| [design-tokens/spacing.md](design-tokens/spacing.md) | Spacing scale, responsive patterns, layout tokens |
| [design-tokens/borders.md](design-tokens/borders.md) | Border styles and widths |
| [design-tokens/radii.md](design-tokens/radii.md) | Border radius presets |
| [design-tokens/shadows.md](design-tokens/shadows.md) | Shadow/elevation system |

---

## Component Guidelines

### Common Components (Read Before Using)

| Component | Guideline File | WordPress Mapping |
|-----------|----------------|-------------------|
| Logo | [components/Logo.md](components/Logo.md) | Site branding (customizer) |
| Container | [components/Container.md](components/Container.md) | Width constraint wrapper |
| BackToTopButton | [components/ScrollBackToTop.md](components/ScrollBackToTop.md) | Client-side scroll utility |
| ScrollDownArrow | [components/ScrollDownArrow.md](components/ScrollDownArrow.md) | Scroll indicator |
| ThemeSwitcher | *(No guideline yet)* | Theme toggle utility |
| TemplateBrowser | *(No guideline yet)* | Template navigation utility |

### Pattern Components (Future)

| Component | Guideline File | Status |
|-----------|----------------|--------|
| Hero | [components/Hero.md](components/Hero.md) | Future |
| ArchiveHeader | [components/ArchiveHeader.md](components/ArchiveHeader.md) | Future |
| CardGrid | [components/CardGrid.md](components/CardGrid.md) | Future |
| CTA | [components/CTA.md](components/CTA.md) | Future |
| EditorialContent | [components/EditorialContent.md](components/EditorialContent.md) | Future |
| FastFacts | [components/FastFacts.md](components/FastFacts.md) | Future |

### Template Parts (Future)

| Component | Guideline File | WordPress Equivalent |
|-----------|----------------|---------------------|
| Header | [components/Header.md](components/Header.md) | `parts/header.html` |
| Footer | [components/Footer.md](components/Footer.md) | `parts/footer.html` |

---

## Pattern Guidelines

### Content Patterns

| Pattern | Guideline File | Used On |
|---------|----------------|---------|
| Hero Patterns | [patterns/hero-patterns.md](patterns/hero-patterns.md) | All page types |
| Card Grid Patterns | [patterns/card-grid-patterns.md](patterns/card-grid-patterns.md) | Archives, listings |
| Filter & Taxonomy Patterns | [patterns/filter-patterns.md](patterns/filter-patterns.md) | Archives with filtering |
| Editorial Content Patterns | [patterns/editorial-content-patterns.md](patterns/editorial-content-patterns.md) | Long-form content |
| CTA Patterns | [patterns/cta-patterns.md](patterns/cta-patterns.md) | Conversion points |

### Meta Patterns (Future)

| Pattern | Guideline File | Purpose |
|---------|----------------|---------|
| Meta/Quick Facts | *(Future)* | Tour details, specifications |
| Related Content | *(Future)* | Cross-linking patterns |
| Breadcrumbs | *(Future)* | Hierarchical navigation |
| Pagination | *(Future)* | Multi-page navigation |

---

## WordPress Block System

### Block Components (Future)

| Document | Covers |
|----------|--------|
| [blocks/overview-blocks.md](blocks/overview-blocks.md) | Block component architecture |

### Pattern Compositions

| Document | Covers |
|----------|--------|
| [blocks/overview-patterns.md](blocks/overview-patterns.md) | Pattern composition rules |

### Template Parts

| Document | Covers |
|----------|--------|
| [blocks/overview-parts.md](blocks/overview-parts.md) | Template parts (header, footer) |

### Page Templates

| Document | Covers |
|----------|--------|
| [blocks/overview-templates.md](blocks/overview-templates.md) | Page template archetypes |

---

## Icon System

### Icon Guidelines (Read Before Using Icons)

| Document | Covers |
|----------|--------|
| [icons/travel.md](icons/travel.md) | Travel-related icons (destinations, activities, transportation) |
| [icons/interface.md](icons/interface.md) | UI control icons (navigation, actions, status) |

**CRITICAL:** Always verify icons exist using bash before importing:

```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

---

## Mobile Guidelines

### Mobile-Specific Patterns (All Required for Mobile)

| Document | Covers |
|----------|--------|
| [mobile/typography.md](mobile/typography.md) | 16px minimum, line heights, heading adjustments |
| [mobile/images.md](mobile/images.md) | Responsive sizing, lazy loading, aspect ratios |
| [mobile/performance.md](mobile/performance.md) | Optimization, Core Web Vitals, 3G testing |
| [mobile/forms.md](mobile/forms.md) | 44px inputs, keyboard types, validation |
| [mobile/touch-targets.md](mobile/touch-targets.md) | 44px minimum touch targets, spacing |

---

## Content Types & Data Models

### Mock Data Location

All mock data: `/src/app/data/`

| File | Purpose |
|------|---------|
| `types.ts` | TypeScript interfaces for all content types |
| `mock.ts` | Sample data exports for all content types |

### Canonical Content Types (Fixed)

**Post Types:**
- Tours
- Destinations (hierarchical)
- Accommodation
- Specials
- Team
- Blog posts
- Core pages (About, Contact, FAQ)

**Taxonomies:**
- Travel Styles (Tours, Accommodation, Destinations)
- Accommodation Types (Accommodation)
- Continents (Destinations)
- Brands (Accommodation)
- Facilities (Accommodation)
- Blog Categories (Posts)
- Blog Tags (Posts)

**Rule:** Do not invent new content types or taxonomies.

---

## Page Archetypes

### Template Patterns

| Archetype | Example Pages | Required Patterns |
|-----------|---------------|-------------------|
| **Content Hub** | Tours Archive, Destinations Archive | Hero → Filter/Taxonomy → Card Grid → FAQ → CTA |
| **Taxonomy Archive** | Travel Style Archive | Archive Header → Sibling Nav → Card Grid → Pagination → FAQ → CTA |
| **Single Detail** | Tour Single, Destination Single | Hero → Editorial → Meta/Facts → Supporting Sections → Related → FAQ → CTA |
| **Editorial Listing** | Blog Archive | Listing Header → Card Grid → Pagination → FAQ |
| **Utility Page** | FAQ, Contact | Page Header → Editorial → Structured Block → CTA |

---

## Directory Structure

### React Component Organization

```
/src/app/components/
├── blocks/           # WordPress block equivalents (future)
├── common/           # Shared utility components
│   ├── BackToTopButton.tsx
│   ├── Container.tsx
│   ├── Logo.tsx
│   ├── ScrollDownArrow.tsx
│   ├── TemplateBrowser.tsx
│   └── ThemeSwitcher.tsx
├── figma/            # Figma-specific utilities (protected)
├── layout/           # Layout wrappers
├── parts/            # Template parts (Header, Footer)
├── patterns/         # Reusable block patterns
└── ui/               # shadcn/ui library components ONLY
```

### Other Key Directories

```
/src/app/
├── data/             # Mock data, content models
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page templates
└── styles/           # Global CSS, theme tokens

/guidelines/          # All documentation (this)
├── blocks/
├── components/
├── design-tokens/
├── icons/
├── mobile/
└── patterns/
```

---

## Import Conventions

**All imports use relative paths from the importing file.**

### From Pages (`/src/app/pages/*.tsx`):

```typescript
// Parts
import { Header } from "../components/parts/Header";

// Patterns
import { Hero } from "../components/patterns/Hero";

// Common
import { Container } from "../components/common/Container";

// Data
import { TOURS } from "../data/mock";
import type { Tour } from "../data/types";

// Utilities
import { cn } from "../lib/utils";
```

---

## Critical Rules

### File Creation

❌ **NEVER create numbered backup files:**
- `App-2.tsx`, `Component-backup.tsx` ❌
- Always modify the original file directly ✅

### Component Usage

1. **Read guidelines first** - Before using any component
2. **Verify icons** - Use bash to check lucide-react exports
3. **Use CSS variables** - All styling from `/src/styles/theme.css`
4. **Import from data** - Use `/src/app/data/mock.ts`, not hardcoded values
5. **Override defaults** - Explicitly set styling to match guidelines

### Typography Rules

❌ **DO NOT use Tailwind typography classes unless explicitly overriding:**

```typescript
// ❌ Bad
<h2 className="text-2xl font-bold">Title</h2>

// ✅ Good
<h2>Title</h2>  // Gets 32px, Lora, 600 from theme.css
```

**Exception:** Only override when intentionally deviating (e.g., card metadata).

---

## CSS Variables System

All styling **must** use CSS custom properties from `/src/styles/theme.css`:

### Typography

```css
--font-family-lora: 'Lora', Georgia, serif;
--font-family-noto-sans: 'Noto Sans', sans-serif;
--text-4xl: 60px;
--text-2xl: 32px;
--text-xl: 20px;
```

### Colors

```css
--primary: rgba(74, 115, 17, 1);
--background: rgba(255, 255, 255, 1);
--foreground: rgba(9, 9, 9, 1);
--muted-foreground: rgba(86, 86, 86, 1);
```

### Spacing, Borders, Shadows

Use Tailwind classes that reference these variables:
- `p-4`, `gap-6`, `mb-12` (spacing)
- `border`, `border-border` (borders)
- `rounded-md`, `rounded-lg` (radii)
- `shadow-sm` (elevations)

---

## Accessibility Requirements

All components must meet **WCAG 2.1 AA**:

1. ✅ One H1 per page
2. ✅ Logical heading order (H1 → H2 → H3)
3. ✅ Keyboard navigation for all interactive elements
4. ✅ Visible focus indicators (`ring-ring`)
5. ✅ Color-independent information
6. ✅ Proper ARIA labels
7. ✅ Explicit empty states
8. ✅ 44px × 44px minimum touch targets

---

## Theme System

### Light & Dark Mode

- **Automatic switching** via CSS variables
- **User preference** persisted to localStorage
- **System preference** detected on first visit
- **No manual dark mode classes** - handled by CSS

### ThemeSwitcher Component

Location: `/src/app/components/common/ThemeSwitcher.tsx`

**Features:**
- Floating button (bottom-right)
- Sun/Moon icon
- Accessible labels
- Smooth transitions

---

## Template Browser

### TemplateBrowser Component

Location: `/src/app/components/common/TemplateBrowser.tsx`

**Features:**
- Search functionality
- Current template indicator
- Template descriptions
- Keyboard accessible
- Works in light & dark modes

---

## Performance Best Practices

1. **Lazy load images** - Use `loading="lazy"` (except first 3)
2. **Explicit dimensions** - Always set `width` and `height`
3. **Code splitting** - Lazy load pages with React.lazy()
4. **Tree shaking** - Import only what's needed
5. **Font display swap** - Use `font-display: swap`
6. **Debounced search** - Throttle input handlers
7. **CSS containment** - Use `contain` property

---

## Testing Checklist

Before submitting work:

- [ ] All pages display correctly in light mode
- [ ] All pages display correctly in dark mode
- [ ] Theme switcher toggles between modes
- [ ] All components use CSS variables
- [ ] Typography uses semantic HTML
- [ ] Icons verified in lucide-react
- [ ] All text meets contrast requirements (4.5:1)
- [ ] Touch targets are 44px minimum
- [ ] Forms inputs are 16px font minimum
- [ ] Images have explicit dimensions
- [ ] Empty states are explicit
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] No numbered backup files created

---

## Common Workflows

### Adding a New Icon

1. Check [icons/travel.md](icons/travel.md) or [icons/interface.md](icons/interface.md)
2. Verify exists: `grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js`
3. Import: `import { IconName } from 'lucide-react'`
4. Use: `<IconName className="w-5 h-5" />`

---

### Creating a New Page

1. Determine archetype (Hub, Taxonomy, Single, Editorial, Utility)
2. Read pattern guidelines for required patterns
3. Create page in `/src/app/pages/`
4. Use patterns in specified order
5. Import mock data from `/src/app/data/mock.ts`
6. Add to App.tsx PAGES array

---

### Adding a New Component

1. Determine category (blocks, patterns, parts, common)
2. Create in appropriate `/src/app/components/` subdirectory
3. Use CSS variables for all styling
4. Create guideline file in `/guidelines/components/`
5. Document props, usage, and examples
6. Add to this index

---

## Demo Site Reference

**Production Site:** https://tour-operator.lightspeedwp.dev/

### Key Reference Pages

| Page Type | URL |
|-----------|-----|
| **Archives** | |
| Tours | https://tour-operator.lightspeedwp.dev/tours/ |
| Destinations | https://tour-operator.lightspeedwp.dev/destinations/ |
| Accommodation | https://tour-operator.lightspeedwp.dev/accommodation/ |
| Blog | https://tour-operator.lightspeedwp.dev/blog/ |
| Team | https://tour-operator.lightspeedwp.dev/team/ |
| Specials | https://tour-operator.lightspeedwp.dev/specials/ |
| **Taxonomies** | |
| Travel Style | https://tour-operator.lightspeedwp.dev/travel-style/honeymoon/ |
| Accommodation Type | https://tour-operator.lightspeedwp.dev/accommodation-type/resort/ |
| Blog Category | https://tour-operator.lightspeedwp.dev/category/news/ |
| **Singles** | |
| Tour Detail | https://tour-operator.lightspeedwp.dev/tour/tanzanias-top-sights-5/ |
| Destination Detail | https://tour-operator.lightspeedwp.dev/destination/south-africa/ |
| Hierarchical Destination | https://tour-operator.lightspeedwp.dev/destination/south-africa/cape-town/ |
| Accommodation Detail | https://tour-operator.lightspeedwp.dev/accommodation/ellerman-house/ |
| Blog Post | https://tour-operator.lightspeedwp.dev/botswanas-thriving-wonders/ |
| Team Member | https://tour-operator.lightspeedwp.dev/team/zared-rogers/ |
| Special | https://tour-operator.lightspeedwp.dev/special/honeymoon-promotion/ |
| **Utility** | |
| About | https://tour-operator.lightspeedwp.dev/about/ |
| Contact | https://tour-operator.lightspeedwp.dev/contact/ |
| FAQ | https://tour-operator.lightspeedwp.dev/faq/ |

---

## Support & Questions

### System Documentation

| Document | Purpose |
|----------|---------|
| [TOURS-SYSTEM.md](TOURS-SYSTEM.md) | Complete documentation for Tours system implementation |
| [DESTINATIONS-SYSTEM.md](DESTINATIONS-SYSTEM.md) | Complete documentation for Destinations system implementation |

### When You're Stuck

1. **Check Guidelines.md** - System overview
2. **Check this index** - Find relevant guideline
3. **Check demo site** - See pattern in action
4. **Check component guidelines** - Specific implementation
5. **Check pattern guidelines** - Usage examples

### Common Issues

| Issue | Solution |
|-------|----------|
| Icon not found | Verify exists in lucide-react using bash |
| Dark mode not working | Check using CSS variables, not hardcoded colors |
| Typography wrong size | Use semantic HTML, remove Tailwind size classes |
| Touch targets too small | Minimum 44px, check mobile guidelines |
| Layout shift | Add explicit width/height to images |

---

## Quick Reference Links

### Most Important Files

1. [Guidelines.md](Guidelines.md) - **START HERE**
2. [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
3. [overview-components.md](overview-components.md) - Component structure
4. [design-tokens/colors.md](design-tokens/colors.md) - Color system
5. [design-tokens/typography.md](design-tokens/typography.md) - Typography
6. [patterns/hero-patterns.md](patterns/hero-patterns.md) - Hero patterns
7. [patterns/card-grid-patterns.md](patterns/card-grid-patterns.md) - Card grids
8. [mobile/typography.md](mobile/typography.md) - Mobile typography rules
9. [THEME-VARIATIONS.md](THEME-VARIATIONS.md) - Light/dark mode

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| V3 | Dec 2024 | WordPress-native alignment, complete documentation |
| V2 | - | Initial guidelines structure |
| V1 | - | Foundation |

---

**Remember:** This is a **content-first, structural prototype** - not a visual exploration. Build reusable patterns, validate content models, and ensure WordPress block theme alignment.