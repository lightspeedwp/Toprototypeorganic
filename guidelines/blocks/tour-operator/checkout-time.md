---
slug: lsx-tour-operator/checkout-time
category: lsx-tour-operator
version: 2.1
---

# Check Out Time Block

## Purpose

The **Check Out Time** block displays the time at which guests must vacate an accommodation.  It communicates logistics clearly to travellers and can be used on accommodation pages or within accommodation cards.

## WordPress context

This block is registered under the slug `lsx-tour-operator/checkout-time` and belongs to the Tour Operator category.  It is typically inserted into single accommodation templates or summary components.  The block supports custom class names and spacing controls and includes a simple example showing the check‑out time in bold with the time value.

## Design system requirements

- **Typography:** Bold the label "Check Out Time:" to make it stand out.  Use regular body text for the time value.  Follow the base type scale for paragraph text.
- **Spacing:** Provide margin and padding controls to position the block in lists or sidebars.  Use the block gap setting to separate the label from the value if using multiple elements.
- **Colours:** Allow users to customise text and background colours via block settings.  Default colours should align with the site palette and maintain contrast.
- **Layout:** Use a single column layout; no icons are required by default but you may add a clock icon if consistent with other factoid blocks.

## Component structure (React)

```jsx
import { Paragraph } from '@wordpress/components';

export default function CheckoutTime({ time = '3:00 PM', className }) {
  return (
    <div className={className} aria-label="Check out time">
      <Paragraph><strong>Check Out Time:</strong> {time}</Paragraph>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|-----|------|---------|-------------|
| `time` | string | `'3:00 PM'` | Time to display for check‑out. |
| `className` | string | `''` | Custom CSS class for styling. |

## Usage guidelines

1. **Populate from custom fields:** The time should be sourced from an accommodation custom field (e.g., `checkout_time`) and passed to the block via block bindings.
2. **Consistency:** Use a 12‑hour or 24‑hour time format consistently across all check‑in/out blocks.
3. **Location:** Place the block near the Check In Time block so users can easily see arrival and departure times together.
4. **Avoid duplication:** Do not repeat the block in contexts where check‑out time is obvious or irrelevant.

## Implementation notes

- Use server‑side rendering or block bindings to pull the time from post metadata.
- Enable spacing and colour supports in the `block.json` file to allow editors to customise appearance.
- Translate the label using localisation functions to support different languages.

## Accessibility

- Provide an `aria-label` or visually hidden description on the wrapper for screen readers.
- Ensure high colour contrast and avoid relying solely on colour to convey meaning.

## Variations & related components

- **Check In Time block:** Displays the arrival time for accommodations; often paired with this block.
- **Accommodation Type block:** Shows the category of accommodation.  Use together to create a comprehensive information panel.

## When to use

Insert the Check Out Time block on accommodation detail pages, in summary cards, or within dynamic lists where departure logistics matter to guests.  Do not use it for tours or destinations where check‑out time isn't applicable.
