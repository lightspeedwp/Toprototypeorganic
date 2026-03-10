# Related Reviews Block

## Overview
**Slug:** `lsx-tour-operator/review-related-accommodation`

**Category:** Tour Operator

**Purpose:** This block displays reviews related to the current accommodation. It enables prospective guests to see what others have said about the property, fostering trust and informed decision‑making.

## WordPress context
Use this block on single accommodation pages. It queries the `review` post type filtered by relationship fields that link reviews to the accommodation. The block includes a heading ("Reviews") and a grid or list of review cards.

## Design system requirements
- **Heading and Separators:** Use a centred heading with separators on either side.
- **Layout:** Display reviews in a grid (e.g., two columns) using the Review Card pattern. Each card should include review excerpt, reviewer name and rating.
- **Colours and Typography:** Follow the card style guidelines for colours and fonts. Provide spacing controls around the block.
- **CSS Variables:** All styling must use CSS custom properties from `/src/styles/theme.css`
- **Font Families:** Use Lora for headings and Noto Sans for body text

## Component structure (React)
Create a `RelatedReviewsBlock` component that accepts query parameters (e.g., number of reviews, order) and returns review posts. Use WordPress `Query` and `PostTemplate` components to render the loop. Insert the Review Card pattern for each review.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `title` | string | Heading text (default "Customer Reviews"). |
| `postsPerPage` | number | Number of reviews to display (default 6). |
| `accommodationId` | string | ID of accommodation to filter reviews. |
| `order` | string | Order of reviews (`asc` or `desc` by date). |
| `className` | string | Additional CSS classes. |

## Usage guidelines
Display a manageable number of reviews (4–8) to avoid overwhelming users. Encourage leaving reviews through a call‑to‑action (e.g., "Leave a Review") near the block. Place the block after primary information sections.

## Implementation notes
- Use mock data from `/src/app/data/mock.ts`
- Filter reviews by accommodation relationship
- Cache queries for performance on high‑traffic pages
- Use translation functions for the heading and labels
- Use section-content-default style class

## Accessibility
Ensure each review card includes clear headings and alt text for any images. Use semantic HTML and ensure keyboard navigability. Provide screen reader announcements for star ratings.

## Related components
This block is analogous to Related Tours and Related Accommodations blocks but for the review post type. It pairs well with the Review Card pattern.

## When to use
On any accommodation page where reviews are available. Do not use if no reviews exist—consider prompting users to leave the first review instead.

## Additional notes
Implement a moderation workflow to ensure only approved reviews are displayed.
