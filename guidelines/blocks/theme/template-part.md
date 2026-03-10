# Template Part Block

<!-- Metadata -->
- **Slug:** `core/template-part`
- **Category:** Theme
- **Introduced:** WordPress 5.9
- **React Component:** Compositional (not a single component)

## Purpose

The Template Part block enables developers to define reusable structural parts of a theme, such as headers, footers, or other layout sections. It loads a template part file stored in the theme and allows it to be edited in the Site Editor. Template parts are meant to represent site structure rather than content. Because they are tied to a theme file, changes to a template part apply across templates that reference it.

## WordPress context

Template parts are registered in the theme's `theme.json` and `block-templates` directories. In the block editor, the Template Part block allows you to insert an existing template part (e.g., `header`, `footer`, `sidebar`) or create a new one. The toolbar includes controls to rename or detach the template part. The sidebar lets you assign the part to a slug and choose whether it is an area that can be replaced by a synced pattern. Template parts cannot be nested within patterns as they represent structure rather than content.

## Design system requirements

### Structural purpose
- Use Template Part blocks for structural elements repeated across pages
- Common template parts: headers, footers, sidebars, global CTAs
- Do not use for content that varies per page or needs multiple instances
- Maintain clear separation between structure (template parts) and content (patterns/blocks)

### Consistent layouts
- Follow same grid, spacing and alignment guidelines as other blocks
- Header template parts should align with content widths defined in layout system
- Maintain consistent padding and margins across all template parts
- Use Container block for width constraints

### Naming conventions
- Use descriptive, semantic names: `header-main`, `footer-primary`, `sidebar-blog`
- Use slug casing (lowercase, hyphenated): `header-transparent`, `footer-minimal`
- Prefix by type when multiple variations exist: `header-home`, `header-subpage`
- Align with WordPress naming conventions

### Editable regions
- Define clear regions where content can be inserted
- Use appropriate theme blocks: Navigation, Site Logo, Site Title, Site Tagline, Search
- Maintain modularity for easy customization
- Document which areas are editable vs. structural

### Variations
- Consider variations for different contexts: homepage vs. landing page
- Examples: transparent header, sticky header, simple footer, mega footer
- Use patterns or conditional logic to swap template parts
- Document when each variation should be used

## Component structure (React)

Template parts are compositional—they don't map to a single React component but rather compose other blocks:

```tsx
// Example: Header template part
<header className="site-header bg-background border-b border-border">
  <Container>
    <Row justify="between" align="center" className="py-4">
      {/* Logo */}
      <SiteLogo 
        src="/assets/logo.svg" 
        width="150px"
        linkHref="/"
      />
      
      {/* Navigation */}
      <Navigation 
        menu={primaryMenu}
        orientation="horizontal"
        spacing="6"
      />
      
      {/* Search (optional) */}
      <Search 
        buttonPosition="inside"
        placeholder="Search..."
      />
    </Row>
  </Container>
</header>
```

```tsx
// Example: Footer template part
<footer className="site-footer bg-muted py-12">
  <Container>
    <Grid columns={4} gap="8" className="mb-8">
      {/* Column 1: Branding */}
      <Stack gap="4">
        <SiteLogo src="/assets/logo.svg" width="120px" />
        <SiteTagline>Unforgettable Adventures</SiteTagline>
      </Stack>
      
      {/* Column 2-4: Navigation menus */}
      <Navigation menu={footerMenu1} orientation="vertical" />
      <Navigation menu={footerMenu2} orientation="vertical" />
      <Navigation menu={footerMenu3} orientation="vertical" />
    </Grid>
    
    {/* Copyright */}
    <div className="pt-8 border-t border-border text-center">
      <p className="text-muted-foreground text-sm">
        © 2024 LightSpeed Tours. All rights reserved.
      </p>
    </div>
  </Container>
</footer>
```

### Props

Template parts are composed of other blocks, so props depend on the components used. Common patterns:

| Prop       | Type    | Default | Description |
|------------|---------|---------|-------------|
| `name`     | string  | —       | Unique slug for the template part (e.g., `header-main`) |
| `children` | node    | —       | Components or blocks that make up the template part |
| `className`| string  | —       | Additional CSS classes |
| `style`    | object  | —       | Inline style overrides |

## Usage guidelines

1. **Structural reuse:** 
   - Create template parts for sections appearing across multiple templates
   - Define `header-main` and insert it into all page/post templates
   - Maintain consistency across site structure

2. **Keep content out:** 
   - Do not include dynamic content unless it's structural (e.g., navigation)
   - Content like blog posts should be handled by Query Loops or patterns
   - Template parts = structure, Patterns = content

3. **Naming and organization:** 
   - Organize in `block-template-parts` directory with descriptive names
   - Document each template part's purpose in theme documentation
   - Use consistent naming: `[type]-[variation]` (e.g., `header-transparent`)

4. **Editor considerations:** 
   - Avoid making local changes directly in markup
   - Adjust underlying templates or patterns instead
   - Provide clear instructions about which parts are safe to edit
   - Lock structural elements to prevent accidental changes

5. **Common template parts:**
   - **Headers:** `header-main`, `header-transparent`, `header-minimal`
   - **Footers:** `footer-primary`, `footer-minimal`, `footer-mega`
   - **Sidebars:** `sidebar-blog`, `sidebar-shop`, `sidebar-docs`
   - **Utility:** `announcement-bar`, `cookie-notice`, `breadcrumbs`

## WordPress implementation notes

Template parts are defined in your theme's `block-template-parts` directory as HTML files. In theme.json, define `templateParts` entries with `area`, `title` and `slug`:

```json
{
  "templateParts": [
    {
      "name": "header-main",
      "title": "Main Header",
      "area": "header"
    },
    {
      "name": "footer-primary",
      "title": "Primary Footer",
      "area": "footer"
    }
  ]
}
```

Use the Template Part block in templates to reference these files:
```html
<!-- wp:template-part {"slug":"header-main","area":"header"} /-->
```

When converting Figma designs:
1. Identify global structural elements (headers, footers, sidebars)
2. Map to Template Part definitions
3. Build using appropriate theme blocks (Row, Columns, Stack, Navigation, Site Logo)
4. Follow WordPress naming conventions
5. Document variations and usage

## Accessibility considerations

- Use semantic HTML elements: `<header>`, `<footer>`, `<nav>`, `<aside>`
- Assign appropriate ARIA roles and labels:
  ```html
  <nav aria-label="Main navigation">
  <footer role="contentinfo">
  ```
- Support keyboard navigation throughout template parts
- Include skip links in header to bypass repeated content:
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only">
    Skip to content
  </a>
  ```
- Ensure all interactive elements are keyboard accessible
- Provide sufficient color contrast for all text
- Test with screen readers

## Variations

### Transparent header (for hero sections)
```tsx
<header className="absolute top-0 left-0 right-0 z-50 bg-transparent text-white">
  <Container>
    <Row justify="between" align="center" className="py-6">
      <SiteLogo src="/assets/logo-light.svg" width="150px" />
      <Navigation menu={primaryMenu} className="text-white" />
    </Row>
  </Container>
</header>
```

### Sticky header
```tsx
<header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
  <Container>
    <Row justify="between" align="center" className="py-4">
      <SiteLogo src="/assets/logo.svg" width="120px" />
      <Navigation menu={primaryMenu} spacing="6" />
    </Row>
  </Container>
</header>
```

### Minimal footer
```tsx
<footer className="bg-background border-t py-8">
  <Container>
    <Row justify="between" align="center">
      <p className="text-muted-foreground text-sm">
        © 2024 LightSpeed Tours
      </p>
      <Navigation menu={legalMenu} orientation="horizontal" spacing="4" />
    </Row>
  </Container>
</footer>
```

### Mega footer (multi-column)
```tsx
<footer className="bg-muted py-16">
  <Container>
    <Grid columns={5} gap="8" className="mb-12">
      <Stack gap="4">
        <SiteLogo src="/assets/logo.svg" width="120px" />
        <SiteTagline />
      </Stack>
      <Navigation menu={toursMenu} orientation="vertical" />
      <Navigation menu={destinationsMenu} orientation="vertical" />
      <Navigation menu={resourcesMenu} orientation="vertical" />
      <Navigation menu={companyMenu} orientation="vertical" />
    </Grid>
    
    <div className="pt-8 border-t border-border">
      <Row justify="between" align="center">
        <p className="text-muted-foreground text-sm">
          © 2024 LightSpeed Tours. All rights reserved.
        </p>
        <Navigation menu={legalMenu} orientation="horizontal" spacing="4" />
      </Row>
    </div>
  </Container>
</footer>
```

## Related components

- **Navigation block:** For menus within headers and footers
- **Site Logo block:** Displays logo
- **Site Title and Tagline blocks:** Show site name and tagline
- **Search block:** Search functionality in headers
- **Container block:** Width constraints
- **Row / Stack / Grid blocks:** Layout composition
- **Separator block:** Visual dividers

## When to use

**Use Template Part blocks for:**
- Site headers (all variations)
- Site footers (all variations)
- Global sidebars
- Announcement bars
- Cookie notices
- Breadcrumb navigation
- Social media bars

**Do not use for:**
- Content that varies per page (use patterns)
- Reusable content modules (use synced patterns)
- One-off layouts (use blocks directly)
- Dynamic content sections (use Query Loop)

## Design system compliance

**Structure:**
- ✅ Semantic HTML tags (`<header>`, `<footer>`, `<nav>`)
- ✅ Proper ARIA roles and labels
- ✅ Logical document structure
- ✅ Skip links for accessibility

**Typography:**
- ✅ Font families from CSS variables (Lora for headings, Noto Sans for body)
- ✅ Font sizes from design system
- ✅ Consistent font weights
- ✅ No hardcoded styling

**Colors:**
- ✅ Semantic tokens only
- ✅ Dark mode support
- ✅ WCAG AA contrast ratios
- ✅ No hardcoded colors

**Spacing:**
- ✅ Spacing tokens for padding/margins
- ✅ Responsive spacing
- ✅ Consistent with design system
- ✅ No arbitrary values

**Layout:**
- ✅ Uses design blocks (Container, Row, Stack, Grid)
- ✅ Responsive by default
- ✅ Mobile-first approach
- ✅ Consistent max-widths

## Additional notes

Template parts are theme-level constructs. When building headless or front-end frameworks, represent them as composed React components. Keep structure and design system guidelines in sync across WordPress and front-end implementations.

**Best practices:**
- Keep template parts focused (single responsibility)
- Avoid deeply nested structures
- Use semantic HTML throughout
- Provide variations for different contexts
- Document all template parts
- Version control template part files
- Test across different page types
- Ensure consistent spacing

**Performance considerations:**
- Minimize external dependencies
- Use CSS variables for theming
- Avoid large images in structural elements
- Lazy load non-critical content
- Optimize for Core Web Vitals

**Maintenance:**
- Review template parts regularly
- Update for new features/content
- Ensure compatibility with WordPress updates
- Keep documentation current
- Test after theme updates
