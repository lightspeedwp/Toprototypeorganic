---
slug: lsx-tour-operator/group-size
category: lsx-tour-operator
version: 2.1
---

# Group Size Block

## Purpose

The **Group Size** block displays the maximum number of travellers allowed on a tour.  It provides quick context for guests when comparing different tours and is commonly presented alongside other factoids such as duration or travel styles.  The block uses an icon and bolded label followed by the actual group‑size value.

## WordPress context

Use this block inside a tour single page template or within card patterns to communicate the maximum group size.  The block is registered as `lsx-tour-operator/group-size` and can be inserted anywhere in the editor.  It supports custom class names, spacing, typography and colour settings and can be reused or locked as needed.

## Design system requirements

- **Iconography:** Use the Tour Operator icons library (`TOIcon`) with an appropriate icon such as `groupSizeIcon`.  The icon should be left‑aligned and sized consistently with other factoids.
- **Typography:** Set the label ("Group Size:") in a medium weight with a small gap before the value.  Use design‑system font sizes for body text and allow adjustments via the typography controls (font size, line height, text alignment).
- **Colour:** Allow users to choose text, background and link colours via the block settings.  Default colours should follow the site's palette and meet WCAG contrast requirements.
- **Spacing:** Provide padding and margin controls for the outer wrapper as well as block gap for spacing between icon and text.
- **Layout:** Use a `flex` layout within the wrapper to align icon and text horizontally and vertically centred; avoid wrapping to maintain a single row.

## Component structure (React)

```jsx
import { Group, Paragraph } from '@wordpress/components';
import TOIcon from '../icons';

export default function GroupSize({ value = '12', className }) {
  return (
    <div className={className} role="group" aria-label="Group size">
      <Group layout={{ type: 'flex', flexWrap: 'nowrap', verticalAlignment: 'middle' }}>
        <TOIcon iconType="solid" iconName="groupSizeIcon" />
        <Paragraph><strong>Group Size:</strong> {value}</Paragraph>
      </Group>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|-----|------|---------|-------------|
| `value` | string | `12` | Maximum number of travellers to display.  Accept numeric strings or numbers. |
| `className` | string | `''` | Custom CSS class for styling the wrapper. |

## Usage guidelines

1. **Placement:** Insert the Group Size block within the tour summary section or sidebars where users expect to see logistical details.  Avoid using it on pages where group size isn't relevant.
2. **Combining with icons:** Always display an icon to improve scanability.  Use `groupSizeIcon` from the icon set and ensure it scales with text.
3. **Responsive behaviour:** For narrow viewports, allow the text to wrap but keep the icon aligned with the first line.  Avoid reducing the font size too much; instead, adjust spacing and stack items if necessary.
4. **Translations:** Wrap all static strings in localisation functions when implementing in PHP to enable translation.

## Implementation notes

- In PHP registration, map custom fields to the `value` prop using block bindings or server‑side rendering.
- Use the `supports` configuration in `block.json` to enable spacing, typography and colour controls.

## Accessibility

- Provide an `aria-label` on the wrapper to describe the purpose of the group size information.
- Ensure the icon has a descriptive `aria-label` or use `role="presentation"` if purely decorative.
- Maintain sufficient colour contrast between the text and background colours.

## Variations & related components

- **Duration block:** Often used alongside group size to provide a complete summary of a tour's logistics.
- **Travel Styles block:** Lists categories such as adventure or luxury; pair with group size to help users match group size with style.
- **Custom factoids:** Create additional blocks for other numerical details to maintain consistent layout and design.

## When to use

Use the Group Size block on tour product pages, summary cards, or overview sections whenever you need to communicate the maximum group size.  Avoid using it for accommodations or destinations that don't have a group‑size concept.
