# Related Tours (Destination) Block

## Overview
**Slug:** `lsx-tour-operator/tour-related-destination`

**Category:** Tour Operator

**Purpose:** This block displays tours related to the current destination. It enables users browsing a destination page to discover tours that visit that destination.

## WordPress context
Place this block on destination pages. It queries tours where the destination appears in a custom field or taxonomy relationship. The block shows a heading and a grid of tour cards, similar to the Related Tours block on tour pages.

## Design system requirements
- **Heading and Separators:** Use a centred heading ("Related Tours") with separators on each side to delineate the section.
- **Layout:** Present tours in a responsive grid (e.g., three columns). Each card should use the Tour Card pattern.
- **Colours and Typography:** Follow the card styling defined in the design system. Provide margin and padding controls around the block.
- **CSS Variables:** All styling must use CSS custom properties from `/src/styles/theme.css`
- **Font Families:** Use Lora for headings and Noto Sans for body text

## Component structure (React)
Create a `ToursForDestinationBlock` component that accepts the destination ID and returns tours linked to that destination. Use a `Query` component with `postType: 'tour'` and a taxonomy filter to fetch relevant tours. Use `PostTemplate` to loop through posts and insert the Tour Card pattern.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `title` | string | Heading text (default "Tours to This Destination"). |
| `destinationId` | string | ID of the destination used for querying tours. |
| `postsPerPage` | number | Number of tours to display (default 6). |
| `className` | string | Additional CSS classes. |
| `onNavigate` | function | Navigation callback for card clicks. |

## Usage guidelines
Display only a small number of tours to avoid cluttering the page. Ensure that the tours truly include the destination in their itinerary. Place the block after general destination information but before comments or related regions.

## Implementation notes
- Use mock data from `/src/app/data/mock.ts`
- Query tours using the relevant destination relationship
- Use translation functions for static labels
- Use the Tour Card pattern to present each tour consistently
- Use section-related-default style class

## Accessibility
Provide semantic headings and labels. Use accessible card structures with alt text for images and clear link labels.

## Related components
This block is similar to the **Related Tours (Tour)** block but filters tours based on destination rather than related tours. It complements the Related Destinations and Related Accommodations blocks.

## When to use
On destination pages where there are tours visiting the destination. Do not use on pages without tour associations.

## Additional notes
Consider adding sorting options (e.g., by price, rating) in future enhancements.
