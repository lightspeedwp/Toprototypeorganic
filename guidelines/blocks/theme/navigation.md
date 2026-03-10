# Navigation Block

<!-- Metadata -->
- **Slug:** `core/navigation`
- **Category:** Theme
- **Introduced:** WordPress 5.9 (for block themes)
- **React Component:** `/src/app/components/blocks/theme/Navigation.tsx`

## Purpose

The Navigation block displays a menu that helps visitors move around your website. It can contain links to pages, posts, categories, or custom URLs and is typically placed in header or footer templates. WordPress documentation notes that the navigation block displays the site's menu and is often added to header or footer templates; if no custom menu exists, a Page List block will automatically populate the menu.

## WordPress context

The Navigation block resides in the **Theme** category. When inserted, it may automatically display a menu structure based on existing navigation menus or pages. The block toolbar provides controls to transform the block, align it (left, center, right), open the menu in responsive (mobile) view, adjust orientation (horizontal or vertical) and set the menu's justification (space-between, center, etc.). The sidebar offers controls for selecting an existing menu, creating a new menu or using a Page List; adjusting the layout (horizontal/vertical), spacing between items, typography, colours, border settings and responsive behaviour.

Child blocks include **Custom Link**, **Home Link**, **Submenu** and **Social Icons**.

## Design system requirements

### Layout & orientation
- Use horizontal orientation for desktop navigation and vertical (stacked or collapsed) orientation for mobile
- Use a Row or Stack block to wrap the Navigation block and align it with the logo and site title in the header
- Responsive breakpoint: Stack vertically on mobile (< 768px), horizontal on desktop

### Spacing
- Define consistent spacing between menu items using design system tokens
- Desktop: `gap-6` (24px) between items
- Mobile: `gap-4` (16px) between stacked items
- Provide adequate padding around the navigation area to separate it from other header elements

### Typography
- **Font family:** Noto Sans (`var(--font-family-noto-sans)`)
- **Font size:** `var(--text-base)` (16px) for desktop, `var(--text-lg)` for mobile
- **Font weight:** `var(--font-weight-medium)` (500) for normal state, `var(--font-weight-semibold)` (600) for active
- **Letter spacing:** Standard
- **Text transform:** None (sentence case) or uppercase based on design

### Colours & states
- **Normal state:** `text-foreground`
- **Hover state:** `text-primary` with optional underline
- **Active/Current page:** `text-primary` with underline or highlight
- **Focus state:** `ring-2 ring-ring ring-offset-2` for keyboard navigation
- Ensure WCAG AA contrast ratio (4.5:1 minimum)

### Responsive behaviour
- Implement mobile menu (hamburger icon) that toggles navigation visibility
- Mobile menu: Overlay or slide-down panel with backdrop
- Menu toggle button: Clear affordances with `aria-label="Toggle navigation"`
- Close button inside mobile menu for explicit dismissal

### Link hierarchy
- Use submenus to group related links
- Limit depth of nested submenus to 2 levels maximum
- Provide visual indicators (arrows, chevrons) for expandable items
- Submenu animations: Fade in/slide down with 200ms transition

## Component structure (React)

```tsx
<Navigation 
  menu={primaryMenu} 
  orientation="horizontal" 
  spacing="6"
  align="center"
  mobileBreakpoint={768}
>
  {primaryMenu.map(item => (
    <NavItem 
      key={item.id} 
      href={item.url} 
      label={item.title}
      isActive={item.isActive}
      hasSubMenu={item.children?.length > 0}
    >
      {item.children?.length > 0 && (
        <SubMenu>
          {item.children.map(child => (
            <NavItem 
              key={child.id} 
              href={child.url} 
              label={child.title}
              isActive={child.isActive}
            />
          ))}
        </SubMenu>
      )}
    </NavItem>
  ))}
</Navigation>
```

### Props

| Prop              | Type     | Default      | Description |
|-------------------|----------|--------------|-------------|
| `menu`            | array    | —            | Array of menu items with `id`, `title`, `url`, `isActive`, optional `children` |
| `orientation`     | string   | `horizontal` | Layout orientation (`horizontal` or `vertical`) |
| `spacing`         | string   | `6`          | Gap between menu items (Tailwind scale: 1-12) |
| `align`           | string   | `flex-start` | Alignment (`start`, `center`, `end`, `space-between`) |
| `mobileBreakpoint`| number   | `768`        | Breakpoint in pixels for mobile menu toggle |
| `className`       | string   | —            | Additional CSS classes |
| `style`           | object   | —            | Inline style overrides |

### Nested components

**NavItem:**
| Prop        | Type     | Default | Description |
|-------------|----------|---------|-------------|
| `href`      | string   | —       | Link URL |
| `label`     | string   | —       | Link text |
| `isActive`  | boolean  | `false` | Whether this is the current page |
| `hasSubMenu`| boolean  | `false` | Whether this item has children |
| `children`  | node     | —       | Nested SubMenu component |

**SubMenu:**
| Prop       | Type  | Default | Description |
|------------|-------|---------|-------------|
| `children` | node  | —       | Nested NavItem components |

**MenuToggle:**
| Prop        | Type     | Default          | Description |
|-------------|----------|------------------|-------------|
| `isOpen`    | boolean  | `false`          | Whether menu is open |
| `onClick`   | function | —                | Click handler |
| `ariaLabel` | string   | `Toggle navigation` | Accessible label |

## Usage guidelines

1. **Plan menu structure:** Organise pages and categories into logical groups. Use submenus for hierarchical navigation but avoid deep nesting (no more than 2 levels)
2. **Consistency across devices:** Provide the same top-level links on desktop and mobile. Hidden items on mobile should be accessible through the menu toggle
3. **Visual cues:** Indicate active links and hover states with color change and/or underline. Provide clear indicators for submenus (caret/chevron icons)
4. **Keyboard navigation:** Ensure menus are fully navigable via keyboard. Use proper `tabindex` sequencing and ARIA roles (`navigation`, `menu`, `menuitem`)
5. **Accessible labels:** Menu toggle button must include accessible label. For submenus, set `aria-haspopup="true"` and `aria-expanded` attributes

## WordPress implementation notes

In theme.json, set default typography, color and spacing for navigation menus under `styles.blocks["core/navigation"]`. Use classes such as `.wp-block-navigation` to target menu styling. When converting Figma designs, map nav bars or menu groups to the Navigation component and ensure menu data can be dynamic (loaded from WordPress menus).

## Accessibility considerations

- Provide meaningful link text for each menu item. Avoid using icons alone without labels
- Implement keyboard navigation: Tab to move between items, Enter/Space to activate links and expand submenus
- Use appropriate ARIA roles and states: `<nav role="navigation">`, `aria-current="page"` for active items
- Ensure adequate color contrast for text and focus indicators (WCAG AA: 4.5:1)
- Provide skip links to bypass navigation: `<a href="#main-content" class="sr-only">Skip to content</a>`

## Variations

- **Horizontal menu:** Default for desktop headers
- **Vertical menu:** For sidebars or mobile
- **Centered menu:** Center-aligned items
- **Mega menu:** Multi-column dropdown with additional content
- **Icon menu:** Icons with or without labels
- **Mobile variations:** Slide-in, overlay, push content

## Related components

- **Site Logo block:** Often placed next to navigation in headers
- **Site Title block:** Typically adjacent to navigation
- **Search block:** Commonly placed near navigation in headers
- **Row block:** Used to layout navigation with logo/title

## When to use

Use the Navigation block in site headers, footers or sidebar templates to allow visitors to navigate your site. Do not place navigation menus within page content (use links or buttons instead). Use submenus judiciously to organize many links without overwhelming users.

## Design system compliance

**Typography:**
- ✅ Font family: Noto Sans (`var(--font-family-noto-sans)`)
- ✅ Font sizes from CSS variables
- ✅ Font weights from CSS variables
- ✅ No hardcoded text styling

**Colors:**
- ✅ Semantic tokens only (`text-foreground`, `text-primary`, etc.)
- ✅ No hardcoded colors
- ✅ Dark mode support via CSS variables

**Spacing:**
- ✅ Tailwind gap scale (`gap-4`, `gap-6`)
- ✅ Responsive padding
- ✅ No arbitrary values

**Accessibility:**
- ✅ WCAG AA contrast ratios
- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus indicators

## Additional notes

Navigation is critical for usability. Ensure that your design system provides clear guidelines for link spacing, font sizes and states. Test navigation with keyboard and screen readers to ensure a seamless experience for all users. Mobile menu should be tested on various devices to ensure touch targets are adequately sized (minimum 44px × 44px).
