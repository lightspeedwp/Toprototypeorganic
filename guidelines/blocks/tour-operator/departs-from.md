---
slug: lsx-tour-operator/departs-from
category: lsx-tour-operator
version: 2.1
---

# Departs From Block

## Purpose

The **Departs From** block shows the starting location of a tour, helping travellers identify where their journey begins (e.g., "Cape Town, South Africa").  This information is crucial for planning logistics such as flights and transport.

## WordPress context

This block is registered as `lsx-tour-operator/departs-from` and is used on tour pages or summary cards.  It supports custom class names, spacing, typography and colour settings.  The block typically consists of an icon and a label with the departure location.

## Design system requirements

- **Iconography:** Use a relevant icon (e.g., plane or departure arrow) from the icon set.  Align the icon to the left of the text.
- **Typography:** Bold the label "Departs From:" and display the location in regular body text.  Use the type scale for consistent font sizes.
- **Layout:** Arrange icon and text using a horizontal flex layout.  Provide padding and margin controls for spacing and block gap for the distance between icon and text.
- **Colours:** Support custom text and background colours via block settings; default colours should match the site palette.

## Component structure (React)

```jsx
import { Group, Paragraph } from '@wordpress/components';
import TOIcon from '../icons';

export default function DepartsFrom({ location = '', className }) {
  return (
    <div className={className} role="group" aria-label="Departs from">
      <Group layout={{ type: 'flex', flexWrap: 'nowrap', verticalAlignment: 'middle' }}>
        <TOIcon iconType="solid" iconName="bookingValidityIcon" />
        <Paragraph><strong>Departs From:</strong> {location}</Paragraph>
      </Group>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|-----|------|---------|-------------|
| `location` | string | `''` | Name of the departure city or region. |
| `className` | string | `''` | CSS class for custom styling. |

## Usage guidelines

1. **Populate from metadata:** Pull the departure location from a custom field associated with the tour and bind it to the `location` prop.
2. **Combine with other factoids:** Place this block near other logistical details such as duration and group size.
3. **Locale formatting:** Use localised names for cities and regions where appropriate (e.g., "Cape Town" rather than "Kapstadt").
4. **Responsive layout:** Allow text to wrap on small screens and adjust spacing accordingly.

## Implementation notes

- Expose spacing, typography and colour controls through `supports` in the `block.json` file.
- Use translation functions for the label to support multiple languages.
- Provide optional alignment settings (e.g., left, centre, right) if needed.

## Accessibility

- Provide an `aria-label` describing the purpose of the information.
- Hide decorative icons from screen readers or provide a visually hidden label.

## Variations & related components

- **Duration block:** Show the length of the tour.
- **Departs To block:** (if exists) would show where the tour ends.
- **Checkout/Checkin blocks:** Provide additional logistic information for accommodations.

## When to use

Use the Departs From block on tour detail pages or promotional cards where the departure point is relevant.  Avoid using it on destination pages that aren't tied to a specific tour.
