# Icons Block

## Overview
**Slug:** `lsx-tour-operator/icons`

**Category:** Tour Operator

**Purpose:** The Icons block provides a simple way to insert SVG icons from the plugin's custom library. It ensures that graphical symbols are consistent across the site and controlled via the design system. Icons are typically used alongside other blocks (e.g., group size, health) to visually call attention to key information.

## WordPress context
This block is registered by the Tour Operator plugin and available in the block inserter. It does not render any text on its own—only the selected SVG icon. Use it inside Group blocks or other layout containers to accompany headings or paragraphs. The block does not support custom HTML because the SVG output is generated dynamically.

## Design system requirements
- **Colours:** Allow the icon's fill and background colours to be set via the block settings. The design system colour palette should drive these options.
- **Spacing:** Support margin and padding controls so icons can sit comfortably next to text or other UI elements.
- **Typography:** Provide font size and line height options when icons are displayed inline with text.

## Component structure (React)
Implement a React component called `TOIcon` that accepts `iconType` (outline, solid) and `iconName` (e.g., `groupSizeIcon`) as props. The component should fetch the corresponding SVG from the icon library and render it within an accessible `<span>` element. Use WordPress block controls to surface colour and spacing settings.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `iconType` | string | Type of icon style (e.g., `outline`, `solid`). Defaults to `outline`. |
| `iconName` | string | Name of the SVG glyph to render. |
| `style` | object | Style overrides for colours, spacing and typography. |

## Usage guidelines
Place this block inside a layout component (Group, Columns, etc.) next to descriptive text. Do not rely solely on the icon to convey meaning—always accompany it with text. When using multiple icons, maintain consistent sizing and alignment.

## Implementation notes
Icons should be stored as inline SVGs so they inherit colour settings. Use `aria-hidden="true"` on the SVG and provide an accessible label in the surrounding text. The block's attributes should be made translatable.

## Accessibility
Ensure that icons are decorative and do not require screen reader focus. If the icon conveys essential information, provide an alternative text description nearby.

## Related components
Many other tour operator blocks reference this icon block internally. For example, Group Size, Health and Special Interests blocks each include an icon before the text.

## Additional notes
You can extend the icon library by adding new SVGs to the plugin and updating the block's selection options. Ensure that new icons follow the same stroke width and visual style as existing icons.
