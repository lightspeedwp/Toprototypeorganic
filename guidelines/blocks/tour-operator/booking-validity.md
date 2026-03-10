# Booking Validity Block

## Overview
**Slug:** `lsx-tour-operator/booking-validity`

**Category:** Tour Operator

**Purpose:** The Booking Validity block displays the date range during which a tour or offer is valid.  It presents "Valid from" and "Valid until" dates, optionally with icons, so travellers know when the pricing or promotion applies.

## WordPress context
Use this block on tour pages or promotional pages where the booking period is limited.  The block can appear near the price or booking CTA.  It pulls the validity dates from custom fields on the tour post.

## Design system requirements
- **Layout:** Arrange the start and end dates in a horizontal line or stacked vertically.  Use icons (calendar) to differentiate them visually.
- **Typography:** Apply subtitle or body text styles for the labels, and emphasise the dates with bold or a larger font size.
- **Colours:** Provide options for text and background colours.  Use subtle accent colours for the icons to reduce clutter.
- **Spacing:** Support padding and margin controls so the block fits within different designs.

## Component structure (React)
Create a `BookingValidityBlock` component that receives `startDate` and `endDate` attributes.  Render two groups: one for the "From" date and one for the "Until" date.  Use the Icons block to insert a calendar icon before each date.  The component should format the dates using WordPress date settings.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `startDate` | string | Start of the booking validity period (YYYY‑MM‑DD). |
| `endDate` | string | End of the validity period (YYYY‑MM‑DD). |
| `className` | string | Additional CSS classes. |
| `icon` | string | Name of the icon (e.g., calendar). |

## Usage guidelines
Always specify both start and end dates.  If the validity is open‑ended, consider using another block or clarifying text ("Until further notice").  Keep the date range current; expired dates should be removed.

## Implementation notes
Bind the `startDate` and `endDate` attributes to custom meta fields on the tour post.  Use translation functions for static labels ("Valid from", "Valid until").  Ensure date formatting respects the site's locale settings.

## Accessibility
Provide clear labels for each date and ensure that screen readers announce them correctly.  Do not rely solely on icons; include text labels.

## Related components
Often used alongside Price and Included Items blocks.  May also appear in promotional patterns and hero covers.

## When to use
On any tour or special offer page where there is a defined booking window.  Do not use this block for general content without a validity period.

## Additional notes
Consider adding an optional tooltip or note for more detail (e.g., "Bookings must be made within this period to qualify for the discount").
