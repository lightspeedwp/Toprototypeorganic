# Site Tagline Block

<!-- Metadata -->
- **Slug:** `core/site-tagline`
- **Category:** Theme
- **Introduced:** WordPress 5.9
- **React Component:** `/src/app/components/blocks/theme/SiteTagline.tsx`

## Purpose

The Site Tagline block displays a short description or slogan associated with your website. It pulls the tagline from WordPress settings and updates it globally when edited. According to WordPress documentation, the site tagline appears in search engines and social networks and helps visitors understand what the site is about; editing it in the block updates the tagline throughout the site.

## WordPress context

Found in the **Theme** category, this block is typically placed in the header or footer. The toolbar offers alignment options and the ability to transform it into a paragraph. The sidebar allows editing the tagline text (which updates WordPress settings), selecting text color and background color, adjusting typography (size, line height) and adding padding or margin. The tagline can optionally be linked to the home page.

## Design system requirements

### Typography
- **Font family:** Noto Sans (`var(--font-family-noto-sans)`) for body text
- **Font size:** `var(--text-base)` (16px) or `var(--text-sm)` (14px) for subtle emphasis
- **Font weight:** `var(--font-weight-normal)` (400) for readability
- **Line height:** `1.5` for optimal readability
- **Letter spacing:** Standard
- **Text transform:** None (sentence case preferred)

### Color
- **Default:** `text-muted-foreground` for subtle, secondary appearance
- **Alternative:** `text-foreground` for more emphasis
- **Dark mode:** Automatically adjusts via CSS variables
- **Contrast:** Ensure WCAG AA compliance (4.5:1 minimum)

### Spacing
- **Above tagline:** `mt-2` (8px) when below site title
- **Below tagline:** `mb-4` (16px) if additional content follows
- **Horizontal:** Inherit from parent container
- **Responsive:** Reduce spacing on mobile (`mt-1` on small screens)

### Alignment
- **Desktop:** Align with site title (usually left-aligned)
- **Mobile:** Center-aligned for balanced appearance
- **With logo:** Align left if logo is present
- **Standalone:** Center-aligned

### Link behavior (optional)
- **Default:** No link (tagline is informational)
- **Optional:** Link to home page if no other home link exists
- **States:**
  - Normal: No underline, `text-muted-foreground`
  - Hover: `text-primary` or subtle opacity change
  - Focus: `ring-2 ring-ring ring-offset-2`
- **Accessible label:** `aria-label="Home"` if linked

## Component structure (React)

```tsx
<SiteTagline 
  tag="p" 
  linkHref="/" 
  linkLabel="Home"
  className="site-tagline"
>
  Fast, scalable WordPress solutions
</SiteTagline>
```

### Props

| Prop        | Type    | Default | Description |
|-------------|---------|---------|-------------|
| `tag`       | string  | `p`     | HTML tag used (`p`, `span`, `div`) |
| `children`  | string  | —       | Tagline text content |
| `linkHref`  | string  | —       | URL to link the tagline to (optional, usually `/`) |
| `linkLabel` | string  | `Home`  | ARIA label if linked |
| `enableLink`| boolean | `false` | Whether to wrap tagline in a link |
| `className` | string  | —       | Additional CSS classes |
| `style`     | object  | —       | Inline style overrides |

## Usage guidelines

1. **Concise messaging:** 
   - Keep the tagline short and descriptive (5-10 words maximum)
   - Communicate your brand's value proposition clearly
   - Avoid jargon or overly complex language
   - Make it memorable and distinctive

2. **Complement the title:** 
   - Use smaller font size than Site Title to create clear hierarchy
   - Position tagline beneath or beside the title/logo
   - Maintain consistent spacing for visual balance
   - Consider muted color to differentiate from title

3. **Optional linking:** 
   - Only link tagline to home page if no other home link is available
   - Typically, logo or site title already provides home link
   - If linking, provide appropriate accessible label
   - Ensure link is distinguishable from plain text

4. **Update with care:** 
   - Editing the tagline updates WordPress settings globally
   - Ensure site administrators are aware when making changes
   - Consider SEO implications (tagline appears in search results)
   - Keep it aligned with current brand messaging

5. **Responsive behavior:**
   - Tagline may be hidden on very small screens if space is limited
   - Use `hidden sm:block` to hide on mobile, show on larger screens
   - Ensure it doesn't cause layout shifts or wrapping issues
   - Test on various screen sizes

## WordPress implementation notes

Define default styles for the Site Tagline block in `styles.blocks["core/site-tagline"]` in theme.json, specifying typography and color tokens. When converting Figma designs, map the tagline text layer to the SiteTagline component, apply the correct tag (e.g., `p`) and set the link properties if applicable.

Example theme.json configuration:
```json
{
  "styles": {
    "blocks": {
      "core/site-tagline": {
        "typography": {
          "fontFamily": "var(--font-family-noto-sans)",
          "fontSize": "var(--text-base)",
          "fontWeight": "var(--font-weight-normal)"
        },
        "color": {
          "text": "var(--wp--preset--color--muted-foreground)"
        },
        "spacing": {
          "margin": {
            "top": "var(--wp--preset--spacing--2)"
          }
        }
      }
    }
  }
}
```

## Accessibility considerations

- Provide sufficient color contrast between tagline and background (WCAG AA: 4.5:1)
- Use semantic tags (`<p>` or `<span>`) that reflect the content's structural role
- If linking the tagline, include accessible label describing link destination
- Ensure keyboard focus is clearly visible if tagline is interactive
- Screen readers should announce tagline as descriptive text, not a heading

## Variations

### Below site title
```tsx
<div>
  <SiteTitle tag="h1">LightSpeed Tours</SiteTitle>
  <SiteTagline className="mt-2">
    Unforgettable African Adventures
  </SiteTagline>
</div>
```

### With link
```tsx
<SiteTagline 
  linkHref="/" 
  linkLabel="Go to homepage"
  enableLink={true}
>
  Fast, scalable WordPress solutions
</SiteTagline>
```

### Subtle styling (muted)
```tsx
<SiteTagline className="text-muted-foreground text-sm">
  Expert-guided safari experiences
</SiteTagline>
```

### Hidden on mobile
```tsx
<SiteTagline className="hidden sm:block">
  Discover the wild side of Africa
</SiteTagline>
```

### Centered alignment
```tsx
<SiteTagline className="text-center">
  Premium tours since 2010
</SiteTagline>
```

## Related components

- **Site Title block:** Displays the site name (larger, more prominent)
- **Site Logo block:** Shows the graphical logo
- **Navigation block:** For primary menus
- **Row block / Stack block:** Used to layout title and tagline together

## When to use

Use the Site Tagline block to communicate your brand's mission or service promise in headers or footers. Avoid using it within posts or pages, where content should instead focus on the article or page itself.

**Use cases:**
- Site headers (below or next to site title)
- Site footers (copyright/branding area)
- About page hero sections
- Email signatures
- Social media bios

**Do not use for:**
- Page descriptions (use meta descriptions)
- Post excerpts (use excerpt field)
- Promotional banners (use patterns or blocks)
- Temporary messages (use notices)

## Design system compliance

**Typography:**
- ✅ Font family: Noto Sans (`var(--font-family-noto-sans)`)
- ✅ Font sizes from CSS variables
- ✅ Font weights from CSS variables
- ✅ Proper text hierarchy (smaller than title)

**Colors:**
- ✅ Semantic tokens only (`text-muted-foreground`, `text-foreground`)
- ✅ No hardcoded colors
- ✅ Dark mode support via CSS variables
- ✅ WCAG AA contrast ratios

**Spacing:**
- ✅ Spacing tokens for margins
- ✅ Responsive spacing
- ✅ No arbitrary values
- ✅ Consistent with design system

**Accessibility:**
- ✅ Semantic HTML (`<p>`, `<span>`)
- ✅ ARIA labels for links (if used)
- ✅ Sufficient contrast
- ✅ Keyboard accessible
- ✅ Not misused as heading

## Additional notes

The tagline may be displayed by social networks when sharing your site. Ensure it accurately reflects your site's purpose and is kept up to date.

**SEO considerations:**
- Tagline appears in search results (meta description fallback)
- Used by social networks for site descriptions
- Should complement site title, not duplicate it
- Keep under 160 characters for best display
- Include relevant keywords naturally

**Branding considerations:**
- Should be evergreen (not time-sensitive)
- Reflects brand personality and tone
- Differentiates from competitors
- Easy to understand and remember
- Avoid overused clichés

**Examples of effective taglines:**
- "Unforgettable African Adventures" (LightSpeed Tours)
- "Just Do It" (Nike)
- "Think Different" (Apple)
- "The Ultimate Driving Machine" (BMW)
- "Because You're Worth It" (L'Oréal)

**Performance:**
- Text-based, no images (fast loading)
- No JavaScript required
- Minimal CSS needed
- Cacheable with page content
