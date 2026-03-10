# Tour Operator Blocks Overview

**Version:** 1.0  
**Last Updated:** December 29, 2024  
**Component Location:** `/src/app/components/blocks/tour-operator/`  
**Guidelines Location:** `/guidelines/components/blocks/tour-operator/`

---

## Purpose

This document lists all custom blocks provided by the **LightSpeed Tour Operator** plugin. Each block extends the WordPress block editor to display domain-specific information about tours, accommodations, and destinations. Use this table to quickly locate the guideline for a specific block. The individual guideline files live in the `/guidelines/components/blocks/tour-operator/` folder.

---

## Design System Requirements

**All tour operator blocks MUST:**

- ✅ Use CSS variables from `/src/styles/theme.css` for all styling
- ✅ Use Lora font family for headings
- ✅ Use Noto Sans font family for body text
- ✅ Use semantic color tokens (primary, background, foreground, border, muted)
- ✅ Support dark mode automatically via CSS custom properties
- ✅ Be fully responsive (mobile-first approach)
- ✅ Meet WCAG 2.1 AA accessibility standards
- ✅ Use Tailwind utility classes for spacing and layout
- ✅ Include proper ARIA labels and semantic HTML

---

## Block Categories

### Information Blocks
Blocks that display static or dynamic information about tours, destinations, and accommodations.

### Relationship Blocks
Blocks that display related content (tours, accommodations, reviews, regions).

### Interactive Blocks
Blocks with user interaction (modals, buttons, maps).

### Media Blocks
Blocks for displaying visual content (galleries, videos, banners).

### List Blocks
Blocks for displaying structured lists (facilities, included items, travel styles).

---

## Complete Block List

| Block | Component | Purpose | Guideline |
|-------|-----------|---------|-----------|
| **Banner Cover** | `BannerCover.tsx` | Render a full-width cover using a banner image from a custom field | [banner-cover.md](../../guidelines/components/blocks/tour-operator/banner-cover.md) |
| **Best Time to Visit** | `BestTimeToVisit.tsx` | Summarise the optimal travel months for a destination | [best-time-to-visit.md](../../guidelines/components/blocks/tour-operator/best-time-to-visit.md) |
| **Booking Validity** | `BookingValidity.tsx` | Display a booking validity date range for tours | [booking-validity.md](../../guidelines/components/blocks/tour-operator/booking-validity.md) |
| **Check Out Time** | `CheckoutTime.tsx` | Show the check-out time for accommodation | [checkout-time.md](../../guidelines/components/blocks/tour-operator/checkout-time.md) |
| **Departs From** | `DepartsFrom.tsx` | Display departure location/city for tours | [departs-from.md](../../guidelines/components/blocks/tour-operator/departs-from.md) |
| **Destination to Accommodation** | `DestinationToAccommodation.tsx` | Show which destinations are associated with an accommodation | [destination-to-accommodation.md](../../guidelines/components/blocks/tour-operator/destination-to-accommodation.md) |
| **Dress** | `Dress.tsx` | Show dress code and clothing recommendations | [dress.md](../../guidelines/components/blocks/tour-operator/dress.md) |
| **Facilities** | `Facilities.tsx` | List facilities and amenities offered by an accommodation | [facilities.md](../../guidelines/components/blocks/tour-operator/facilities.md) |
| **Gallery** | `Gallery.tsx` | Output a gallery of images for tours or accommodations | [gallery.md](../../guidelines/components/blocks/tour-operator/gallery.md) |
| **Group Size** | `GroupSize.tsx` | Display the maximum group size for a tour | [group-size.md](../../guidelines/components/blocks/tour-operator/group-size.md) |
| **Health** | `Health.tsx` | Provide health and medical information for a destination | [health.md](../../guidelines/components/blocks/tour-operator/health.md) |
| **Regions List** | `RegionsList.tsx` | Display a list of child regions for a destination with post connections | [regions-list.md](../../guidelines/components/blocks/tour-operator/regions-list.md) |
| **Related Accommodations** | `RelatedAccommodationsBlock.tsx` | Display other accommodation options associated with the current accommodation | [related-accommodations.md](../../guidelines/components/blocks/tour-operator/related-accommodations.md) |
| **Related Regions** | `RelatedRegionsBlock.tsx` | List child regions or connected regions for a destination | [related-regions.md](../../guidelines/components/blocks/tour-operator/related-regions.md) |
| **Related Reviews** | `RelatedReviewsBlock.tsx` | Present reviews related to an accommodation | [related-reviews.md](../../guidelines/components/blocks/tour-operator/related-reviews.md) |
| **Related Tours** | `RelatedToursBlock.tsx` | Show similar tours on a tour page | [related-tours.md](../../guidelines/components/blocks/tour-operator/related-tours.md) |
| **Tours for Destination** | `ToursForDestinationBlock.tsx` | Display tours related to a destination | [tours-for-destination.md](../../guidelines/components/blocks/tour-operator/tours-for-destination.md) |

---

## Additional Blocks (Future Implementation)

These blocks are referenced in the LSX Tour Operator plugin but not yet implemented in the prototype:

| Block | Purpose | Status |
|-------|---------|--------|
| **Icons** | Insert an SVG icon from the tour operator icon library | 📋 Planned |
| **Visa** | Display visa requirements for a destination, with optional icon | 📋 Planned |
| **Price** | Show the starting price for a tour | 📋 Planned |
| **Videos** | Present a gallery of videos for a tour or destination | ✅ Implemented (VideoGallery) |
| **Tagline** | Output a tagline or short description for a tour | 📋 Planned |
| **Included Items** | List items included in the tour price | 📋 Planned |
| **Google Map** | Embed a dynamic Google Map showing the location | 📋 Planned |
| **Modal Button** | Insert a button that opens a modal dialog | 📋 Planned |
| **Permalink Button** | Provide a styled button linking to the single post or page | 📋 Planned |
| **Special Interests** | Highlight special interests or activities available | 📋 Planned |
| **Suggested Visitor Types** | Recommend visitor profiles suited to an accommodation | 📋 Planned |
| **WETU Map** | Integrate a WETU map showing tour routes | 📋 Planned |
| **Transport** | Provide information on transport options and getting around | 📋 Planned |
| **Itinerary** | Define a placeholder for itinerary lists | 📋 Planned |
| **More Link** | Insert a "View More" link or button for lists | 📋 Planned |
| **Travel Styles** | Show travel style categories associated with a tour | 📋 Planned |
| **Minimum Child Age** | Display the minimum child age allowed | 📋 Planned |
| **Accommodation Type** | Output the type/category of an accommodation | 📋 Planned |
| **Price Include & Exclude** | List what's included and excluded in pricing | 📋 Planned |
| **Single Supplement** | Show the single supplement charge for solo travellers | 📋 Planned |

---

## How to Use This Document

### 1. Locate Your Block

Use the table above to find the block you need. Each row includes:
- **Block name** - Human-readable block title
- **Component** - React component filename
- **Purpose** - Brief description of what the block does
- **Guideline** - Link to detailed implementation guidelines

### 2. Read the Guideline

Open the linked guideline file to understand:
- **Purpose** - What the block is for
- **Design System Requirements** - CSS variables, typography, colors to use
- **Component Structure** - Props, state, and render logic
- **WordPress Mapping** - How it maps to WordPress blocks
- **Usage Patterns** - Code examples and integration
- **Accessibility** - ARIA labels, keyboard navigation, semantic HTML

### 3. Follow Best Practices

Ensure you meet the requirements described in each guideline:
- ✅ Use design system CSS variables
- ✅ Lora for headings, Noto Sans for body text
- ✅ Semantic color tokens
- ✅ Responsive design (mobile-first)
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Proper TypeScript types

### 4. Map Figma to WordPress

Use the guidelines as a bridge between:
- **Figma Design** → React component structure → **WordPress block output**

This ensures React components align with WordPress block conventions and can be translated to PHP/HTML in the future.

---

## Block Implementation Checklist

Before creating a new tour operator block, ensure:

- [ ] Read the block-specific guideline
- [ ] Understand the WordPress block it represents
- [ ] Review the design system requirements
- [ ] Check for existing similar components
- [ ] Use the correct font families (Lora/Noto Sans)
- [ ] Use semantic color tokens (no hardcoded colors)
- [ ] Implement responsive breakpoints (sm:, md:, lg:)
- [ ] Add proper TypeScript types
- [ ] Include ARIA labels and semantic HTML
- [ ] Test in light and dark modes
- [ ] Verify mobile responsiveness
- [ ] Check keyboard navigation
- [ ] Add JSDoc comments
- [ ] Export from index.ts

---

## Component Structure Standards

All tour operator blocks should follow this structure:

```tsx
/**
 * [Block Name] Component
 * 
 * [Brief description of what the block does]
 * 
 * **WordPress Mapping:**
 * - Block: lsx/[block-slug]
 * - Category: tour-operator
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Lora for headings, Noto Sans for body
 * - Colors: Semantic tokens (primary, background, foreground)
 * - Spacing: Tailwind utilities
 * 
 * @module [BlockName]
 * @category blocks/tour-operator
 */

import { cn } from "../../../lib/utils";

/**
 * Component props interface.
 */
interface [BlockName]Props {
  /** Prop description */
  propName: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * [Block Name] Component
 * 
 * @param {[BlockName]Props} props - Component properties
 * @returns {JSX.Element} Rendered block
 */
export function [BlockName]({
  propName,
  className,
}: [BlockName]Props) {
  return (
    <div className={cn("base-styles", className)}>
      {/* Component content */}
    </div>
  );
}

export default [BlockName];
```

---

## Testing Requirements

All tour operator blocks must pass:

### Functionality Tests
- [ ] Renders with correct data
- [ ] Props work as expected
- [ ] Conditional rendering works
- [ ] No console errors

### Design System Tests
- [ ] Uses CSS variables (no hardcoded colors)
- [ ] Correct font families (Lora/Noto Sans)
- [ ] Proper spacing (Tailwind utilities)
- [ ] Border radius matches design system

### Responsive Tests
- [ ] Mobile (< 640px) - Single column, readable text
- [ ] Tablet (640px - 1024px) - 2 columns where appropriate
- [ ] Desktop (> 1024px) - Full layout

### Accessibility Tests
- [ ] Semantic HTML elements
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast meets WCAG AA

### Dark Mode Tests
- [ ] Colors invert correctly
- [ ] Text remains readable
- [ ] No hardcoded light/dark colors
- [ ] Images/icons adapt if needed

---

## Common Patterns

### Icon with Text Pattern
```tsx
<div className="flex items-center gap-2">
  <Icon size={20} className="text-primary" />
  <span className="text-foreground">Text content</span>
</div>
```

### List Pattern
```tsx
<ul className="space-y-2">
  {items.map((item, index) => (
    <li key={index} className="flex items-start gap-2">
      <Check size={16} className="mt-1 text-primary" />
      <span className="text-foreground">{item}</span>
    </li>
  ))}
</ul>
```

### Card Pattern
```tsx
<div className="rounded-lg border border-border bg-card p-4">
  <h3 className="mb-2 text-foreground">{title}</h3>
  <p className="text-muted-foreground">{description}</p>
</div>
```

### Section Pattern
```tsx
<section className="space-y-4">
  <h2 className="text-foreground">{heading}</h2>
  <div className="text-muted-foreground">
    {content}
  </div>
</section>
```

---

## WordPress Block Registration Example

For reference, here's how these blocks map to WordPress:

```php
// WordPress block registration (PHP)
register_block_type(
  'lsx/banner-cover',
  array(
    'title' => __( 'Banner Cover', 'tour-operator' ),
    'description' => __( 'Display a full-width banner image', 'tour-operator' ),
    'category' => 'tour-operator',
    'icon' => 'cover-image',
    'render_callback' => 'lsx_render_banner_cover',
  )
);
```

Our React components simulate this behavior for prototyping.

---

## Resources

### Internal Documentation
- [Design System Guide](/DESIGN-SYSTEM-GUIDE.md)
- [Typography Guidelines](/guidelines/design-tokens/typography.md)
- [Colors Guidelines](/guidelines/design-tokens/colors.md)
- [Spacing Guidelines](/guidelines/design-tokens/spacing.md)
- [Component Overview](/guidelines/overview-components.md)
- [Block Overview](/guidelines/blocks/overview-blocks.md)

### WordPress References
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Theme.json Documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)

---

## Support & Contribution

### Getting Help
- Review the block-specific guideline first
- Check the design system guide
- Refer to existing component implementations
- Ask team for clarification

### Contributing New Blocks
1. Create component in `/src/app/components/blocks/tour-operator/`
2. Create guideline in `/guidelines/components/blocks/tour-operator/`
3. Add to this overview document
4. Export from `index.ts`
5. Update documentation
6. Test thoroughly
7. Submit for review

---

**Last Updated:** December 29, 2024  
**Maintained By:** Development Team  
**Version:** 1.0
