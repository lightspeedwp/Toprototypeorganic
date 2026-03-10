---
slug: lsx-tour-operator/facts-regions-wrapper
category: lsx-tour-operator
version: 1.0
---

# Regions List Block

## Purpose

The **Regions List** block displays a list of child regions related to a country‑level destination.  It leverages post connection bindings to fetch and display the names of all sub‑regions (e.g., provinces or states) associated with the current destination.

## WordPress context

This block is registered as `lsx-tour-operator/facts-regions-wrapper` and belongs to the Tour Operator category.  It is typically used on country destination pages to show all subordinate regions.  Editors can customise spacing, typography and colours via the block settings.

## Design system requirements

- **Typography:** Use a heading or label (e.g., `<h3>Regions</h3>`) to introduce the list, followed by body text for the region names.  Maintain consistent font sizes with the type scale.
- **Layout:** Display the regions in a simple list or comma‑separated sentence.  On wide screens, you may use columns or a grid if there are many regions.
- **Spacing:** Provide margin and padding controls and adjust block gap to space the list items.
- **Colours:** Support custom text and background colours; default colours should adhere to the theme palette.

## Component structure (React)

```jsx
import { Heading, Paragraph } from '@wordpress/components';

export default function RegionsList({ regions = [], className }) {
  return (
    <div className={className} aria-label="Regions list">
      <Heading level={3}>Regions</Heading>
      <Paragraph>{regions.join(', ')}</Paragraph>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|-----|------|---------|-------------|
| `regions` | string[] | `[]` | Array of child region names to display. |
| `className` | string | `''` | CSS class for custom styling. |

## Usage guidelines

1. **Populate automatically:** Retrieve child regions via a post connection (e.g., `acf_relationship`) and pass them to the component.
2. **Introduce with a heading:** Use a heading to provide context for the list.  Adjust the heading level based on page hierarchy.
3. **List formatting:** For more than five regions, consider using a comma‑separated sentence instead of a bulleted list to save space.
4. **Combine with travel information:** Display alongside other factual blocks such as country, travel information or related destinations.

## Implementation notes

- The block supports spacing, typography and colour customisation via the `supports` property in `block.json`.
- Use localisation functions when outputting static labels.

## Accessibility

- Provide an `aria-label` to describe the list for screen readers.
- Ensure adequate contrast and readable font sizes.

## Variations & related components

- **Facts Country block:** Shows the parent country of a destination; pair with Regions List to provide context.
- **Related Regions block:** Another block that lists connected regions for general destinations (not just country level).

## When to use

Use the Regions List block on country‑level destination pages or posts where a hierarchical list of sub‑regions is helpful.  Avoid using it on pages that already display the same information in another context.
