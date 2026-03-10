# Related Accommodations Block

## Overview
**Slug:** `lsx-tour-operator/accommodation-related-accommodation`

**Category:** Tour Operator

**Purpose:** The Related Accommodations block displays other accommodation options located near the current accommodation. It helps users discover similar properties and encourages cross‑navigation between listings. By default it shows a heading and a grid of three cards with each related accommodation.

## WordPress context
Use this block on single accommodation pages. It queries accommodations based on proximity or taxonomy relationships (e.g., same destination). The block should appear after the main content, perhaps in a "Related" section.

## Design system requirements
- **Layout:** Present related accommodations in a grid of cards. Each card should include an image, title and short description. Use spacing and border styles consistent with the design system.
- **Typography:** Use heading styles for the block title ("Related accommodation") and body styles for descriptions inside the cards.
- **Colours:** Allow background and border colour customisation through block settings. Keep text colours consistent with the site.
- **CSS Variables:** All styling must use CSS custom properties from `/src/styles/theme.css`
- **Font Families:** Use Lora for headings and Noto Sans for body text

## Component structure (React)
Implement a `RelatedAccommodationsBlock` component that accepts query parameters (e.g., number of posts, taxonomy) and returns a list of related accommodations. Each item should use the tour operator card pattern (e.g., "accommodation card" pattern) to display the information. Provide attributes for the heading text and number of columns.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `title` | string | Optional heading for the block. Defaults to "Related Accommodations". |
| `postsPerPage` | number | Number of accommodations to display (default 3). |
| `currentAccommodationId` | string | ID of current accommodation to exclude from results. |
| `destinationId` | string | Optional destination ID for filtering. |
| `className` | string | Additional CSS classes. |
| `onNavigate` | function | Navigation callback for card clicks. |

## Usage guidelines
Ensure that related accommodations are genuinely relevant—use shared taxonomy terms or geographic proximity. Avoid showing the current accommodation in the list. Place the block near the end of the page, after primary information and reviews.

## Implementation notes
- Use mock data from `/src/app/data/mock.ts`
- Filter accommodations by shared destinations or types
- Consider caching results for performance
- Integrate the AccommodationCard pattern to ensure visual consistency
- Use section-related-default style class

## Accessibility
Use semantic `<article>` elements for each accommodation card. Provide alt text for images and ensure that card headings are links to the accommodation pages. Use ARIA landmarks to denote the related content section.

## Related components
The block relies on the **AccommodationCard** pattern to render each item. It is conceptually similar to Related Tours and Related Destinations blocks.

## When to use
On accommodation pages where you want to promote nearby or similar properties. Do not use on pages that already list all accommodations (e.g., archive pages).

## Additional notes
Consider adding filters in the future to let users narrow down related accommodations by price range or facility.
