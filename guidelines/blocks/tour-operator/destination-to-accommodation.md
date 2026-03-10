---
slug: lsx-tour-operator/destination-to-accommodation
category: lsx-tour-operator
version: 2.1
---

# Destination to Accommodation Block

## Purpose

The **Destination to Accommodation** block lists the destinations (e.g., cities or regions) associated with a given accommodation.  It helps travellers understand where the accommodation is located and which destinations it serves.

## WordPress context

This block is registered as `lsx-tour-operator/destination-to-accommodation`.  It is usually used on single accommodation pages to show a comma‑separated list of destinations.  The block supports inner blocks, allowing you to customise the layout (e.g., grouping with headings or icons).

## Design system requirements

- **Typography:** Bold a label such as "Location:" or "Destinations:" followed by the list of destination names.  Use body text styling for the values.
- **Layout:** A simple single‑line layout is sufficient, but you can wrap the content in a flex container to align labels and icons horizontally.
- **Spacing:** Provide margin and padding controls for the wrapper.  Use block gap for spacing between icon and text if you choose to include an icon.
- **Colour:** Support custom text and background colours; defaults should match the theme palette.

## Component structure (React)

```jsx
import { Paragraph } from '@wordpress/components';

export default function DestinationToAccommodation({ destinations = [], className, label = 'Location' }) {
  return (
    <div className={className} aria-label="Destinations">
      <Paragraph><strong>{label}:</strong> {destinations.join(', ')}</Paragraph>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|-----|------|---------|-------------|
| `destinations` | string[] | `[]` | List of destination names associated with the accommodation. |
| `className` | string | `''` | Additional CSS classes for styling. |
| `label` | string | `'Location'` | Custom label preceding the list. |

## Usage guidelines

1. **Fetch associations:** Pull the associated destinations via relationships or custom fields and supply them to the `destinations` prop.
2. **Label customisation:** Use a descriptive label such as "Destinations" or "Location" depending on context.  Localise this label as needed.
3. **Combination with maps:** Pair this block with a Google Map block to provide both a textual and visual representation of location.
4. **Responsive behaviour:** Allow the list to wrap on small screens; ensure readability.

## Implementation notes

- Use translation functions for labels to support multiple languages.
- Add spacing, typography and colour supports in the `block.json` file for editor customisation.

## Accessibility

- Add an `aria-label` to describe the content (e.g., "Associated destinations").
- Ensure there is sufficient contrast between text and background colours.

## Variations & related components

- **Google Map block:** Display an interactive map of the locations.
- **Regions block:** Show regions attached to the accommodation in addition to specific destinations.

## When to use

Place the Destination to Accommodation block on accommodation detail pages to clearly indicate the associated destinations.  Omit it if there is only one destination and it is already obvious from the context.
