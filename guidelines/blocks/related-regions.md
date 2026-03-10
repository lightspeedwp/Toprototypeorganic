# Related Regions Block

## Overview
**Slug:** `lsx-tour-operator/related-regions`

**Category:** Tour Operator

**Purpose:** The Related Regions block outputs a list or grid of regions connected to the current destination. It is useful for highlighting child regions or nearby areas that travellers might also be interested in.

## WordPress context
Use this block on country or parent destination pages. It queries child terms or connected posts to list sub‑regions (e.g., provinces within a country). The block can be placed after the main description or within a sidebar.

## Design system requirements
- **Layout:** Display the related regions as a list or grid. Each region can be a link to its destination page. Use spacing and border styles consistent with other lists.
- **Typography:** Apply body text styles for region names. Optionally include a small icon or avatar representing the region.
- **Colours:** Allow control of text and background colours. Keep link styles consistent across the site.
- **Spacing:** Provide margin and padding controls for integration into different layouts.
- **CSS Variables:** All styling must use CSS custom properties from `/src/styles/theme.css`
- **Font Families:** Use Lora for headings and Noto Sans for body text

## Component structure (React)
Create a `RelatedRegionsBlock` component that accepts query parameters (e.g., parent region ID) and returns an array of child regions. Render each region as a `<li>` containing a link. Provide attributes for layout type and number of columns.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `title` | string | Heading text (default "Explore Nearby Regions"). |
| `parentId` | string | The ID of the parent region to query. |
| `layout` | string | `list` or `grid` (default "grid"). |
| `columns` | number | Number of columns if using grid layout (default 3). |
| `className` | string | Additional CSS classes. |
| `onNavigate` | function | Navigation callback for region clicks. |

## Usage guidelines
Show only a manageable number of regions—if there are many, consider paginating or grouping alphabetically. Place the block near navigation elements so users can easily explore related areas.

## Implementation notes
- Use mock data from `/src/app/data/mock.ts`
- Query child destinations based on parentId
- Caching may be necessary if there are many requests
- Provide translation functions for static labels
- Use section-content-supporting style class

## Accessibility
Ensure that links to each region have descriptive titles. Use lists with proper semantic markup. If icons are used, mark them as decorative.

## Related components
The block is conceptually similar to Related Accommodations and Related Tours blocks. It may be used in combination with a Regions List pattern for countries.

## When to use
On high‑level destination pages where sub‑regions exist. Do not use this block on single tour pages.

## Additional notes
Future enhancements could allow sorting regions by popularity or alphabetical order.
