# Buttons Block

<!-- Metadata -->
- **Slug:** `core/buttons`
- **Category:** Design
- **Introduced:** WordPress 5.0

## Purpose

The Buttons block is a container that groups one or more individual Button blocks. It allows authors to add multiple call‑to‑action buttons side by side or stacked with consistent spacing. WordPress documentation notes that the Buttons block adds button‑style links to pages or posts and can link to internal pages or external sites.

## WordPress context

The Buttons block appears in the **Design** category. When selected, the toolbar offers controls to transform the block, move it, align it (left, center, right, wide, full) and change the layout orientation (horizontal or vertical). Inside the block, each child Button can be edited individually. The sidebar allows you to set spacing between buttons, typography, colours, border radius, border style and advanced settings.

## Design system requirements

- **Typography:** Buttons should use your primary label text style. Use a consistent font weight and uppercase or sentence case according to your brand guidelines. The theme's typography tokens (e.g., `--text-base`, `--font-family-noto-sans`) should be applied to button text for consistency.
- **Colors:** Buttons convey hierarchy. Use colour tokens to differentiate primary, secondary and tertiary button variants (e.g., primary uses `bg-primary text-primary-foreground`, secondary uses `bg-secondary text-secondary-foreground`, text buttons use transparent backgrounds with coloured text). Ensure sufficient contrast between text and background colours.
- **Spacing & size:** Apply consistent padding around button text using spacing tokens (e.g., `px-[var(--spacing-element-md)] py-[var(--spacing-element-sm)]` for small). Maintain a minimum touch target of 44 × 44 pixels for accessibility.
- **Border radius:** Use a uniform radius from your design system (e.g., `organic-radius-lg` or `radius-[var(--radius-lg)]`) across all button variants. Avoid mixing sharp and rounded corners.
- **Orientation & gap:** For horizontal button groups, use a small gap between buttons (e.g., `gap-[var(--spacing-gap-md)]`); for vertical arrangements, use larger spacing (e.g., `gap-[var(--spacing-gap-lg)]`). Configure the Buttons block's orientation property accordingly.
- **Icon wrapping:** Icons must NEVER wrap to a new line. Always use `flex-nowrap` and `whitespace-nowrap` on buttons to ensure text and icons stay horizontally aligned on a single line.

## Component structure (React)

```jsx
// Example React structure for a button group
<Buttons orientation="horizontal" gap="4" align="center">
  <Button variant="primary" href="/signup">Get Started</Button>
  <Button variant="secondary" href="/learn-more">Learn More</Button>
</Buttons>
```

### Buttons Container Props

| Prop          | Type    | Default | Description |
|---------------|---------|---------|-------------|
| `orientation` | string  | `horizontal` | Layout orientation: `horizontal` or `vertical`. |
| `gap`         | string  | `4` | Space between buttons (Tailwind gap value). |
| `align`       | string  | `start` | Alignment of button group: `start`, `center`, `end`. |
| `className`   | string  | —       | Additional CSS classes. |
| `children`    | node    | —       | Button components to render. |

### Button Props

| Prop          | Type    | Default  | Description |
|---------------|---------|----------|-------------|
| `variant`     | string  | `primary`| Visual style: `primary`, `secondary`, `outline`, `ghost`, `link`. |
| `size`        | string  | `default`| Button size: `sm`, `default`, `lg`. |
| `href`        | string  | —        | URL to link to (renders as <a>). |
| `children`    | node    | —        | Button content (text, icons). |
| `icon`        | element | —        | Optional icon element (lucide-react). |
| `iconPosition`| string  | `left`   | Icon position: `left` or `right`. |
| `disabled`    | boolean | false    | Disable the button. |
| `onClick`     | function| —        | Callback for click events. |
| `className`   | string  | —        | Additional CSS classes. |
| `ariaLabel`   | string  | —        | Accessible label (required for icon-only buttons). |

## Usage guidelines

1. **Hierarchy:** Use primary buttons for the main call‑to‑action on a page, secondary buttons for less prominent actions and ghost/link buttons for inline actions. Limit the number of primary buttons per section to avoid decision fatigue.
2. **Orientation:** Choose horizontal orientation when space allows and actions are related. Use vertical orientation for mobile screens or when buttons have long labels.
3. **Consistency:** Maintain consistent spacing between buttons; do not rely on manual margins for each Button. Use the Buttons block's `gap` prop to control spacing.
4. **Icons:** Use icons sparingly and only when they reinforce the button's purpose. Place icons to the left of the text by default and ensure they are sized consistently with the text.
5. **Links vs. buttons:** Use the Button component with `href` for navigation to another page. Use Button with `onClick` for actions (submitting a form, triggering a modal). The Buttons block can contain both but maintain proper semantics.

## Design system implementation

**CSS Variables Used:**
- Typography: `var(--font-family-noto-sans)`, `var(--text-base)`, `var(--font-weight-medium)`
- Colors: `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-secondary-foreground`
- Spacing: CSS variables for spacing (e.g., `px-[var(--spacing-element-md)]`, `py-[var(--spacing-element-sm)]`, `gap-[var(--spacing-gap-sm)]`)
- Border radius: `organic-radius-lg` or inline variables `rounded-[var(--radius-lg)]`
- Layout Constraints: `flex-nowrap`, `whitespace-nowrap`
- Transitions: `transition-colors`, `duration-200`

**Font Requirements:**
- All button text uses **Noto Sans** (`var(--font-family-noto-sans)`)
- Font weight: **Medium (500)** for buttons (`var(--font-weight-medium)`)
- Never use Lora for buttons

## WordPress implementation notes

In theme.json, define styles for core/button within the `styles.blocks` section to ensure button typography, colours and spacing match your design tokens. Use CSS classes like `.is-style-outline` or `.is-style-fill` to support variations. When building React components from Figma, map frames labelled "Button" to the Button component and group multiple buttons using the Buttons component. Provide user controls for orientation and spacing.

## Accessibility considerations

- Buttons must have accessible labels that describe their action. Avoid using only icons without accompanying text; if an icon is present, add `aria-label` or visually hidden text.
- Ensure sufficient contrast between button text and background colours, meeting WCAG AA standards (4.5:1 minimum).
- Provide focus styles for keyboard navigation. Use `focus:ring-2 focus:ring-ring focus:ring-offset-2` for consistent focus indicators.
- For buttons triggering modals or dynamic content, manage focus by shifting focus to the modal and returning focus to the button on close.
- Minimum touch target: 44 × 44 pixels for mobile accessibility.

## Variations

Common button styles include:
- **Primary:** Solid background with `bg-primary text-primary-foreground`, used for primary CTAs.
- **Secondary:** Solid background with `bg-secondary text-secondary-foreground`, used for secondary actions.
- **Outline:** Transparent background with `border-2 border-primary text-primary`, used for less prominent actions.
- **Ghost:** Transparent background with `hover:bg-accent hover:text-accent-foreground`, used for tertiary actions.
- **Link:** No background, colored text only `text-primary underline-offset-4 hover:underline`, used for inline navigation.
- **Icon buttons:** Buttons containing only an icon with accessible label (use with `ariaLabel` prop).

Each variation should adhere to your design system tokens for colours, borders, typography and spacing.

## Size variants

- **Small:** `px-4 py-2 text-sm` (32px height minimum)
- **Default:** `px-6 py-3 text-base` (44px height minimum)
- **Large:** `px-8 py-4 text-lg` (52px height minimum)

## Related components

- **Button block:** The individual button used inside the Buttons block (documented within this file).
- **CTA pattern:** Uses Buttons for call-to-action sections.
- **Hero pattern:** Uses Buttons for primary and secondary CTAs.

## When to use

Use the Buttons block when you need to present two or more calls to action together. For single actions, the Button component alone is sufficient. Avoid grouping unrelated actions together, which can confuse users.

## Code examples

### Primary + Secondary Buttons
```jsx
<Buttons orientation="horizontal" gap="4" align="center">
  <Button variant="primary" size="lg">
    Get Started
  </Button>
  <Button variant="secondary" size="lg">
    Learn More
  </Button>
</Buttons>
```

### Buttons with Icons
```jsx
<Buttons orientation="horizontal" gap="3">
  <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
    Continue
  </Button>
  <Button variant="outline" icon={<Download className="h-4 w-4" />}>
    Download PDF
  </Button>
</Buttons>
```

### Vertical Stack (Mobile)
```jsx
<Buttons orientation="vertical" gap="3" align="center">
  <Button variant="primary" size="lg" className="w-full">
    Book Now
  </Button>
  <Button variant="outline" size="lg" className="w-full">
    Request Quote
  </Button>
  <Button variant="link" size="default">
    View Details
  </Button>
</Buttons>
```

### Icon-Only Buttons
```jsx
<Buttons orientation="horizontal" gap="2">
  <Button variant="ghost" size="sm" ariaLabel="Edit">
    <Edit className="h-4 w-4" />
  </Button>
  <Button variant="ghost" size="sm" ariaLabel="Delete">
    <Trash2 className="h-4 w-4" />
  </Button>
  <Button variant="ghost" size="sm" ariaLabel="Share">
    <Share2 className="h-4 w-4" />
  </Button>
</Buttons>
```

## Additional notes

Buttons are critical interactive elements. Ensure they are placed prominently, use action‑oriented labels, and adhere to accessibility standards. When translating Figma designs, map each button layer to a React Button component and group them within a Buttons component to maintain consistent layout and spacing.

## Implementation checklist

- [ ] All buttons use `var(--font-family-noto-sans)` for font family
- [ ] Font weight is `var(--font-weight-medium)` (500)
- [ ] Primary buttons use `bg-primary text-primary-foreground`
- [ ] Secondary buttons use `bg-secondary text-secondary-foreground`
- [ ] Minimum touch target is 44 × 44 pixels
- [ ] Focus states use `focus:ring-2 focus:ring-ring`
- [ ] Icons are from lucide-react only
- [ ] Accessible labels provided for icon-only buttons
- [ ] WCAG AA color contrast maintained (4.5:1 minimum)
- [ ] Consistent spacing using gap prop
