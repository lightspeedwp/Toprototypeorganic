# Best Time to Visit Block

## Overview
**Slug:** `lsx-tour-operator/best-time-to-visit`

**Category:** Tour Operator

**Purpose:** The Best Time to Visit block summarises the optimal months or seasons to visit a destination.  It conveys climate and seasonal highlights in a concise format, often using a calendar or bar chart style.  Travellers can easily see when conditions are ideal for activities such as safaris or beach holidays.

## WordPress context
Use this block on destination pages where weather or seasonal factors are important.  Editors populate the months via custom fields or a repeater.  The block displays this information visually, which can be more engaging than plain text.

## Design system requirements
- **Layout:** Represent months as a horizontal bar with highlighted segments or as a list of month names.  Ensure the design is clear on both desktop and mobile.
- **Colour:** Use the site's palette to highlight recommended months.  Avoid red/green colour coding alone; provide textual indicators for colour‑blind users.
- **Typography:** Use body or label styles for month names.  Provide a heading (e.g., "Best time to visit") using the appropriate heading level.
- **Spacing:** Include controls for padding and margin to integrate within various layouts.

## Component structure (React)
Create a `BestTimeToVisitBlock` component that accepts an array of recommended month names or numbers.  Render a list or progress bar indicating favourable months.  Use attributes to control layout type (bar vs list) and colours.  Optionally allow adding a short descriptive paragraph about seasonal highlights.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `months` | array | List of months (1–12 or names) that are ideal for visiting. |
| `layout` | string | Display type: `bar` or `list`. |
| `className` | string | Additional CSS classes. |

## Usage guidelines
Highlight at least three months to provide a clear guidance window.  If the destination is suitable year‑round, mention this instead of leaving the block empty.  Keep descriptions brief and link to detailed climate information if needed.

## Implementation notes
Store the months in a custom field (e.g., a repeater).  Convert them to the appropriate format in the block's edit component.  Use translation functions for static labels ("Best time to visit").

## Accessibility
Ensure that any visual indicator (e.g., a bar with coloured segments) has a text alternative or labels for screen readers.  Use high contrast colours for readability.

## Related components
Often paired with Climate (if implemented) or Travel Styles blocks.  It can also appear in hero sections or cards in archive patterns.

## When to use
On any destination page where seasonality affects travel plans.  Do not use this block if there is no meaningful variation across the year.

## Additional notes
Consider allowing multiple ranges (e.g., March–May and September–November) to accommodate destinations with several peak seasons.
