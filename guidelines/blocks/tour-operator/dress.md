# Dress Block

## Overview
**Slug:** `lsx-tour-operator/dress`

**Category:** Tour Operator

**Purpose:** The Dress block provides clothing recommendations for destinations, such as appropriate attire for cultural sites or climate conditions.  It helps travellers pack the right clothes and respect local customs.

## WordPress context
Insert this block on destination pages or itineraries where specific dress guidance is needed.  The content is typically stored in a custom field and can include multiple paragraphs or lists.  Use within an information section alongside Visa and Health blocks.

## Design system requirements
- **Typography:** Use body text styles for the recommendations.  If listing items, use bullet lists for clarity.
- **Colours and Icons:** Allow a subtle background colour or accent icon (e.g., a clothing icon) to differentiate the block.  Icons should come from the Icons block and be decorative.
- **Spacing:** Provide margin and padding controls to separate the block from surrounding content.

## Component structure (React)
Implement a `DressBlock` component that renders the dress guidelines as rich text.  Optionally include a heading and icon.  Use attributes for colour and spacing settings.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `content` | string | Dress recommendations text. |
| `icon` | string | Name of an optional dress icon. |
| `className` | string | Additional CSS classes. |

## Usage guidelines
Keep guidance concise and culturally sensitive.  Provide clear instructions on what is acceptable or recommended.  If certain items are prohibited, list them explicitly.

## Implementation notes
Pull the dress guidance from a custom field such as `dress_code` on the destination post.  Use translation functions for static labels.  Sanitize output to prevent HTML injection.

## Accessibility
Ensure the text is readable and not too small.  Provide alternative text for any icons used.

## Related components
Often used with Health and Best Time to Visit blocks in information sections.  May also appear within itinerary patterns if specific excursions require special attire.

## When to use
Use this block on destinations where climate, activities or culture dictate specific clothing requirements.  Avoid using it on generic pages without targeted guidance.

## Additional notes
Encourage linking to detailed packing guides or travel blogs for more extensive advice.
