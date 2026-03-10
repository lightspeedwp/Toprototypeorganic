# Site Title Block

<!-- Metadata -->
- **Slug:** `core/site-title`
- **Category:** Theme
- **Introduced:** WordPress 5.9
- **React Component:** `/src/app/components/blocks/theme/SiteTitle.tsx`

## Purpose

The Site Title block displays the name of your website. It retrieves the site title from WordPress settings (`Settings › General`) and renders it wherever the block is placed. Editing the text within the block updates the site's name globally; this change affects the browser title bar and search results. WordPress documentation explains that the Site Title block displays the site name and that updating it updates the name across the site.

## WordPress context

This block appears in the **Theme** category and is typically used in header templates. The toolbar provides alignment options and the ability to transform the block into a heading (H1–H6) or paragraph for styling. The settings sidebar allows you to adjust typography (font size, weight), colors and spacing. You can also toggle whether the site title links to the homepage. Because this block controls the site's main title, changes to the text will reflect across the entire site.

## Design system requirements

### Typography
- **Font family:** Lora (`var(--font-family-lora)`) for headings
- **Font size:**
  - Homepage (H1): `var(--text-4xl)` (36px) on mobile, `var(--text-5xl)` (48px) on desktop
  - Subpages (H2-H3): `var(--text-2xl)` (24px) to maintain heading hierarchy
- **Font weight:** `var(--font-weight-bold)` (700) for maximum impact
- **Line height:** `1.2` for tight, impactful headings
- **Letter spacing:** Standard

### Color
- **Light mode:** `text-foreground` or `text-primary` for emphasis
- **Dark mode:** Automatically adjusts via CSS variables
- **Contrast:** Ensure WCAG AA compliance (4.5:1 minimum) against header background
- Use palette tokens: `text-foreground`, `text-primary`, `text-card-foreground`

### Spacing
- **Margins:** Use spacing tokens for separation from logo and navigation
- **Desktop:** `ml-4` (16px) if next to logo, `mr-8` (32px) before navigation
- **Mobile:** Center-aligned with `mx-auto` for balanced appearance
- **Padding:** None directly on title, applied to parent container

### Alignment
- **Desktop:** Left-aligned in header (with logo), center-aligned if standalone
- **Mobile:** Center-aligned for better readability
- Responsive classes: `text-left md:text-left` or `text-center`

### Link behavior
- **Default:** Site title links to home page (`/`)
- **Accessible label:** `aria-label="Home"` or `Go to homepage`
- **States:**
  - Normal: No underline
  - Hover: `text-primary` or subtle opacity change
  - Focus: `ring-2 ring-ring ring-offset-2`
- **Optional:** Disable link if logo already links home

## Component structure (React)

```tsx
<SiteTitle 
  tag="h1" 
  linkHref="/" 
  linkLabel="Home"
  className="site-title"
>
  LightSpeed Tours
</SiteTitle>
```

### Props

| Prop        | Type    | Default | Description |
|-------------|---------|---------|-------------|
| `tag`       | string  | `h1`    | HTML tag used to render the title (`h1`–`h6` or `p`) |
| `children`  | string  | —       | The site title text |
| `linkHref`  | string  | `/`     | URL to link the title to (home page) |
| `linkLabel` | string  | `Home`  | ARIA label for the link |
| `enableLink`| boolean | `true`  | Whether to wrap title in a link |
| `className` | string  | —       | Additional CSS classes |
| `style`     | object  | —       | Inline style overrides |

## Usage guidelines

1. **Consistent branding:** Use the Site Title block in headers and footers to display your site name. If you use a site logo, the title can complement or replace the logo when needed (e.g., screen readers, text-based browsers)

2. **Heading hierarchy:** 
   - Render the site title as **H1 on the homepage** to establish page hierarchy
   - On **subpages**, use a lower heading level (**H2 or H3**) to maintain semantic structure and allow the page title to take the H1 spot
   - Never skip heading levels

3. **Link to home:** 
   - Provide a link to the home page unless the logo already serves this purpose
   - Use accessible labels (`aria-label="Home"` or `aria-label="Go to homepage"`)
   - Ensure the link is not repeated multiple times in the header

4. **Updating the title:** 
   - Editing the Site Title block text will change the site name in WordPress settings
   - Ensure this action is intentional and coordinated with site administrators
   - Consider access controls for who can edit global settings

5. **Responsive behavior:**
   - Scale down font size on mobile for better fit
   - Center-align on mobile if standalone
   - Ensure title doesn't wrap awkwardly (use `white-space: nowrap` if needed)

## WordPress implementation notes

Define default styles for the Site Title block in `styles.blocks["core/site-title"]` in theme.json. For example, set `typography.fontSize` and `color.text` to match your design tokens. Provide a mechanism to override heading level via props. When mapping Figma designs, convert the site name text layer to the SiteTitle component and set the appropriate heading level based on template type.

Example theme.json configuration:
```json
{
  "styles": {
    "blocks": {
      "core/site-title": {
        "typography": {
          "fontFamily": "var(--font-family-lora)",
          "fontSize": "var(--text-4xl)",
          "fontWeight": "var(--font-weight-bold)"
        },
        "color": {
          "text": "var(--wp--preset--color--foreground)"
        }
      }
    }
  }
}
```

## Accessibility considerations

- Ensure the site title has sufficient color contrast against its background (WCAG AA: 4.5:1)
- Provide meaningful `aria-label` for the link to indicate it navigates to the home page
- Use semantic heading levels that reflect the document structure (H1 on homepage, H2-H3 on subpages)
- Ensure keyboard focus is clearly visible on the link
- Consider screen reader users: Site title should be announced as a heading

## Variations

### Homepage (H1, large)
```tsx
<SiteTitle tag="h1" linkHref="/" className="text-4xl md:text-5xl">
  LightSpeed Tours
</SiteTitle>
```

### Subpages (H2, smaller)
```tsx
<SiteTitle tag="h2" linkHref="/" className="text-2xl md:text-3xl">
  LightSpeed Tours
</SiteTitle>
```

### Without link
```tsx
<SiteTitle tag="h1" enableLink={false}>
  LightSpeed Tours
</SiteTitle>
```

### Centered (mobile)
```tsx
<SiteTitle 
  tag="h1" 
  className="text-center md:text-left"
>
  LightSpeed Tours
</SiteTitle>
```

## Related components

- **Site Logo block:** For a graphical representation of your brand
- **Site Tagline block:** Displays your site's tagline or slogan
- **Navigation block:** For menus adjacent to the site title
- **Row block:** Used to layout title with logo/navigation horizontally

## When to use

Use the Site Title block whenever you need to display the name of your website in templates or pattern designs. Do not insert it manually into post content. For accessible branding, consider pairing the Site Title with the Site Logo.

**Use cases:**
- Site headers (all templates)
- Site footers (optional)
- Login/registration pages
- 404 error pages
- Print stylesheets

**Do not use for:**
- Page titles (use H1 in page content instead)
- Post titles (use post title block)
- Product names
- Author names

## Design system compliance

**Typography:**
- ✅ Font family: Lora (`var(--font-family-lora)`)
- ✅ Font sizes from CSS variables
- ✅ Font weights from CSS variables
- ✅ Proper heading hierarchy

**Colors:**
- ✅ Semantic tokens only (`text-foreground`, `text-primary`)
- ✅ No hardcoded colors
- ✅ Dark mode support via CSS variables
- ✅ WCAG AA contrast ratios

**Spacing:**
- ✅ Spacing tokens for margins
- ✅ Responsive spacing
- ✅ No arbitrary values

**Accessibility:**
- ✅ Semantic HTML (proper heading tags)
- ✅ ARIA labels for links
- ✅ Keyboard accessible
- ✅ Focus indicators
- ✅ Proper heading hierarchy

## Additional notes

Avoid using the site title as an image. Text is preferable because it:
- Scales better across devices
- Loads faster (no HTTP request)
- Is accessible to screen readers
- Is indexable by search engines
- Can be translated automatically
- Respects user font preferences

**SEO considerations:**
- Site title appears in browser tabs and bookmarks
- Used by search engines for site name
- Appears in social media shares
- Should match site name in WordPress settings
- Keep under 60 characters for best display

**Branding considerations:**
- Use consistent capitalization (Title Case or ALL CAPS)
- Consider trademark symbols if applicable (®, ™)
- Ensure it matches printed materials and other branding
- Test readability at various sizes
