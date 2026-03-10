# Related Tours (Tour) Block

## Overview
**Slug:** `lsx-tour-operator/tour-related-tour`

**Category:** Tour Operator

**Purpose:** This block displays tours that are similar to the current tour. By recommending alternative or complementary tours, it encourages cross‑sales and helps travellers explore more options.

## WordPress context
Use this block on single tour pages. It queries tours that share categories, destinations or other taxonomy terms with the current tour. The block typically appears towards the end of the page, before the reviews or enquiry section.

## Design system requirements
- **Heading:** Include a heading such as "Related Tours" with separators on either side to visually separate the section.
- **Layout:** Display related tours in a grid (e.g., three columns). Each card should use the Tour Card pattern with an image, title and summary.
- **Colours and Typography:** Follow the same card styles defined in the design system (background, border, typography). Provide spacing controls around the block.
- **CSS Variables:** All styling must use CSS custom properties from `/src/styles/theme.css`
- **Font Families:** Use Lora for headings and Noto Sans for body text

## Component structure (React)
Implement a `RelatedToursBlock` component that accepts query parameters (e.g., taxonomy term IDs, number of posts) and returns a set of tour posts. Use the `Query` and `PostTemplate` components to build the loop. Each item should insert the Tour Card pattern via `core/pattern`.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `title` | string | Heading text (default "You May Also Like"). |
| `postsPerPage` | number | Number of tours to display (default 3). |
| `currentTourId` | string | ID of current tour to exclude from results. |
| `travelStyles` | string[] | Travel style IDs for filtering similar tours. |
| `destinations` | string[] | Destination IDs for filtering similar tours. |
| `className` | string | Additional CSS classes. |
| `onNavigate` | function | Navigation callback for card clicks. |

## Usage guidelines
Display only a handful of related tours (3–6) to avoid overwhelming users. Ensure that the chosen tours truly share relevant attributes with the current tour. Place the block after the main itinerary and before user reviews.

## Implementation notes
- Use mock data from `/src/app/data/mock.ts`
- Filter tours with shared taxonomy terms (travel styles or destinations)
- Consider caching queries for performance
- Use translation functions for the heading
- Use the Tour Card pattern for consistent card layouts
- Use section-related-default style class

## Accessibility
Ensure that headings and separators have appropriate semantic roles. Use `<article>` elements for each tour card. Provide meaningful alt text for images and ensure link focus states are clear.

## Related components
This block parallels the **Related Tours (Destination)** and **Related Reviews** blocks. Each uses a similar pattern but queries different post types.

## When to use
On single tour pages to suggest other tours that might interest the user. Avoid using on archive pages where tours are already listed in detail.

## Additional notes
Future enhancements could allow manual selection of related tours or weight relatedness by popularity or price.
