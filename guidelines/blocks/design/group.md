# Group Block (Design)

**Slug:** `core/group`

**Category:** Design

**Version:** 1.0  
**Last Updated:** 26 December 2024

## Purpose

The **Group** block is a versatile container used to group other blocks together.  
It allows you to apply common background colours, spacing, width constraints and other styles to multiple child blocks, effectively defining sections or wrappers within layouts.

## WordPress Context

- **Toolbar options:** Align the group (wide, full), transform into other container types (e.g. Columns), and toggle justification of inner blocks.  
- **Block settings:** Supports background colour, gradients, padding, margin, border radius, shadow and layout settings.  
- **Attributes:** `layout` (flex, constrained), `tagName` (div, section), `align`, `style` (background, spacing, border, shadow).

## Design System Requirements

- **Section Styles:** Use the Group block to implement section styles as defined in the design system (e.g. default, surface, hero, brand). Each style variation defines background colour, padding and optional decorative elements.  
- **Spacing:** Apply consistent padding inside groups using spacing tokens; outer margins should separate sections clearly.  
- **Widths:** For content that requires a constrained width, apply the `alignwide` class or wrap the Group in a Container component that enforces maximum width.  
- **Colours:** Choose background and text colours that maintain contrast; for dark sections, adjust text colour accordingly.  
- **Layout:** Choose between `flex` layouts (Row or Stack) or default flow layout; use additional container blocks (Columns, Rows, Stacks) inside a Group to control positioning of child blocks.

## Component Structure (React)

```jsx
export function Group({ 
  children, 
  as: Tag = 'div', 
  className, 
  backgroundColor, 
  padding, 
  ...props 
}) {
  return (
    <Tag
      className={cn('wp-block-group', className)}
      style={{ 
        backgroundColor,
        padding,
        fontFamily: 'var(--font-family-noto-sans)',
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
```

## Props (Attributes)

| Prop             | Type    | Default | Description                                                         |
|------------------|---------|---------|---------------------------------------------------------------------|
| `as`             | string  | `'div'` | HTML tag used for the group container (e.g. `div`, `section`).      |
| `align`          | `'wide'\|'full'\|undefined` | —     | Controls width relative to the content area.                        |
| `backgroundColor`| string  | —       | Background colour or gradient.                                      |
| `padding`        | string  | —       | Internal spacing on all sides.                                      |
| `margin`         | string  | —       | External spacing (top and bottom).                                   |
| `border`         | string  | —       | Border width, style and colour.                                      |
| `shadow`         | string  | —       | Shadow applied to the group container.                               |
| `className`      | string  | —       | Additional CSS classes.                                              |

## Usage Guidelines

- Use the Group block to create sections with shared styling and spacing.  
- Apply section style variations to differentiate content areas (e.g. hero, brand, accent).  
- Avoid nesting Group blocks unnecessarily; too many nested containers can complicate layouts.  
- Use a Group block as a wrapper around complex blocks (e.g. Columns, Query Loop) to add background colour or padding.  
- When using a `section` tag, ensure it corresponds to a meaningful section in your document structure.

## Design System Implementation

**CSS Variables Used:**
- Typography: `var(--font-family-noto-sans)`
- Colors: `bg-background`, `bg-muted`, `bg-card`, semantic tokens
- Spacing: Tailwind spacing scale (`p-4`, `p-6`, `p-8`, `py-12`, `py-16`)
- Border radius: `rounded-lg`, `rounded-xl`
- Shadows: `shadow-sm`, `shadow-md`

**Font Requirements:**
- Container itself doesn't render text
- Inner content uses design system typography
- Never override child component fonts

## WordPress Implementation Notes

- The Group block is registered under the slug `core/group`.  
- Section styles are implemented via block style variations using the `is-style-*` class names defined in `theme.json`.  
- You can transform a Group into a Columns block or other container; ensure that the child blocks remain appropriate after transformation.  
- To centre content within a Group, wrap inner blocks with a Container block or apply `margin: 0 auto` via custom styles.

## Accessibility

- Use appropriate HTML semantic tags (`section`, `nav`, `header`, `footer`) via the `as` prop to convey document structure.  
- Ensure sufficient colour contrast between background and text within the group.  
- Provide skip links or navigation anchors when groups define major sections of a page.  
- Avoid using the Group block purely for decoration; it should provide structure or styling.

## Variations

- **Default:** Neutral background, standard padding.  
- **Surface:** Light elevation effect (subtle shadow).  
- **Hero:** Large padding and prominent background colour or image.  
- **Brand:** Uses brand colours for background and accent elements.  
- **Accent:** Applies an accent colour and emphasised typography.  
- **Full‑Width/Narrow/Compact:** Adjusts width and spacing for different contexts.

## Related Components

- **Columns block:** For multi‑column layouts inside a Group.  
- **Row block:** For horizontal alignment of child blocks.  
- **Stack block:** For vertical alignment with equal spacing.  
- **Container component:** A wrapper to constrain content width.

## When to Use

Use the Group block whenever you need to wrap multiple blocks to share a background, spacing or width constraint. It's the foundational container for creating sections, cards or panels.

## Additional Notes

Groups can be nested but should be used judiciously. When designing patterns, consider how Groups interact with section styles, responsive breakpoints and dark/light mode variations. Always define section styles in `theme.json` to enable consistent theming across the site.
