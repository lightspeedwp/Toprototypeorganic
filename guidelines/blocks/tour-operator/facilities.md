# Facilities Block

## Overview
**Slug:** `lsx-tour-operator/facilities`

**Category:** Tour Operator

**Purpose:** The Facilities block lists key facilities and amenities offered by an accommodation, such as Wi‑Fi, pool, restaurant or spa.  It consolidates amenity information so guests know what to expect during their stay.

## WordPress context
Use this block on accommodation pages, in sidebars or cards, to highlight available facilities.  The block will fetch amenity data from custom fields or taxonomy terms assigned to the accommodation.  Editors can add or remove items via the custom fields without editing the block content.

## Design system requirements
- **Layout:** Present facilities as a list or grid of bullet points.  Use icons (via the Icons block) next to each facility for visual interest.
- **Typography:** Apply body text styles for the facility names.  Use emphasised text for section headings if needed.
- **Colour and Spacing:** Provide options to set text and background colours.  Allow margin/padding adjustments to fit within cards or sections.

## Component structure (React)
Create a `FacilitiesBlock` component that iterates through an array of facility names and outputs each as a list item.  Optionally include an icon component for each facility.  Use block attributes for layout (grid vs list) and spacing controls.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `facilities` | array | List of facility strings or objects (fetched from custom fields). |
| `layout` | string | Either `list` or `grid` to control presentation. |
| `className` | string | Additional CSS classes. |

## Usage guidelines
List only the most important facilities so the block remains concise.  Consider grouping similar amenities (e.g., spa & wellness) into one bullet.  Use the block in combination with other info blocks like Group Size or Price.

## Implementation notes
Facilities can be stored as a repeater field or taxonomy terms.  Map these to the `facilities` prop in the React component.  Provide translation functions for each facility name if necessary.

## Accessibility
Structure the facilities as a semantic list (`<ul>`).  If icons are used, mark them as decorative and rely on the accompanying text for meaning.

## Related components
Often paired with Special Interests and Suggested Visitor Types blocks when describing accommodations.  Also used in cards within archive patterns.

## When to use
On any accommodation page where you need to highlight available amenities.  Do not use this block on tour pages; use the Included Items or Price Include & Exclude blocks instead.

## Additional notes
You can customise the order of facilities through the custom fields.  Future versions may support grouping by amenity type.
