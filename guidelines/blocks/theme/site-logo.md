# Site Logo Block

<!-- Metadata -->
- **Slug:** `core/site-logo`
- **Category:** Theme
- **Introduced:** WordPress 5.9 (for block themes)
- **React Component:** `/src/app/components/blocks/theme/SiteLogo.tsx`
- **Existing Component:** `/src/app/components/common/Logo.tsx` (to be transformed)

## Purpose

The Site Logo block displays a graphical representation of your site's identity—typically your company logo. It is part of the theme block library and ensures that the logo is managed centrally; updating it in one place updates it across the entire site. WordPress documentation notes that the Site Logo block displays an image representing the site and that updating it applies changes globally.

## WordPress context

The Site Logo block appears under the **Theme** category and is intended for use in templates such as headers or footers. In the block toolbar, you can upload a logo, replace it, and adjust alignment (left, center, right). The sidebar settings allow you to set the width, apply cropping and toggle the option to link the logo to the home page. The block supports duotone filters and can inherit colors from the theme palette.

## Design system requirements

### Logo source
- **Format:** SVG preferred for scalability and sharpness across devices
- **Fallback:** High-resolution PNG (2x) with transparent background
- **File size:** Optimize for web (< 50KB for SVG, < 100KB for PNG)
- **Dimensions:** Maintain aspect ratio, typically 120-200px wide

### Sizing
- **Desktop:** 150px wide (height auto to preserve aspect ratio)
- **Mobile:** 100px wide (scaled down for small screens)
- **Max width:** 200px to prevent oversized logos
- Use CSS `object-fit: contain` to preserve aspect ratio

### Spacing
- **Padding:** Use spacing tokens for padding around logo
- **Margins:** `mr-8` (32px) on desktop to separate from navigation
- **Mobile margins:** `mr-4` (16px) for compact spacing
- Avoid leaving logo too close to navigation or other header elements

### Colors & filters
- **Light mode:** Use dark logo version
- **Dark mode:** Use light logo version (automatic via CSS variables)
- **Duotone filters:** Optional for brand consistency
- Ensure sufficient contrast with header background

### Link behavior
- **Default:** Logo links to home page (`/`)
- **Accessible label:** `aria-label="Home"` or site name
- **Visual feedback:** Optional subtle hover effect (opacity or scale)
- **No text decoration:** Remove default link underline

### Dark mode support
- Provide separate logo files for light and dark modes
- Use CSS variables to switch logos automatically:
  ```css
  .logo-light { display: block; }
  .logo-dark { display: none; }
  
  .dark .logo-light { display: none; }
  .dark .logo-dark { display: block; }
  ```

## Component structure (React)

```tsx
<SiteLogo 
  src="/assets/logo.svg" 
  alt="LightSpeed Logo" 
  width="150px"
  linkHref="/"
  linkLabel="Home"
/>
```

### Props

| Prop        | Type    | Default  | Description |
|-------------|---------|----------|-------------|
| `src`       | string  | —        | Image source URL (light mode) |
| `srcDark`   | string  | —        | Image source URL for dark mode (optional) |
| `alt`       | string  | —        | Alternative text describing the logo |
| `width`     | string  | `150px`  | Width of the logo; height auto for aspect ratio |
| `linkHref`  | string  | `/`      | URL to link the logo to (usually home page) |
| `linkLabel` | string  | `Home`   | ARIA label for the link |
| `className` | string  | —        | Additional CSS classes |
| `style`     | object  | —        | Inline style overrides |

## Usage guidelines

1. **Centralize logo management:** Use the Site Logo block in global templates (header, footer) rather than inserting the logo manually in each page. This ensures consistent appearance and easier updates

2. **Maintain aspect ratio:** Do not stretch the logo. Set only the width, letting the height adjust automatically to preserve proportions

3. **Provide alt text:** Although logos often contain text, you should still provide descriptive alternative text (e.g., "LightSpeed Tour Operator Logo") for screen readers

4. **Link to home:** The logo typically links back to the home page. Provide an accessible label to indicate that the link returns the user to the home page

5. **Responsive design:** Adjust logo size based on viewport width. Use CSS clamp values or breakpoints to scale the logo gracefully:
   ```css
   width: clamp(100px, 15vw, 150px);
   ```

6. **Dark mode:** Provide separate logo files optimized for light and dark backgrounds. Switch automatically via CSS variables or theme context

## Transforming existing Logo component

The existing `Logo.tsx` component in `/src/app/components/common/Logo.tsx` should be transformed into the new `SiteLogo.tsx` theme block component:

**Migration steps:**
1. Review existing Logo component implementation
2. Add dark mode support (srcDark prop and CSS logic)
3. Add ARIA labels and accessibility improvements
4. Ensure design system compliance (CSS variables only)
5. Update all imports across the codebase
6. Maintain backward compatibility during transition

## WordPress implementation notes

Define default styles for the Site Logo block in `styles.blocks["core/site-logo"]` in theme.json. Set `width` and `height` or `max-width` values, and specify object fit to maintain aspect ratio. Provide duotone presets if your design requires tinted logos. When converting Figma to React, map the logo layer to the SiteLogo component and supply props for `src`, `alt` and `width`.

## Accessibility considerations

- Provide meaningful alternative text describing the logo and the organization it represents
- Ensure that the link (if used) has an appropriate accessible name (e.g., `aria-label="Home"`)
- Consider adding visually hidden text next to the logo for screen readers that conveys the site name if the logo does not contain text
- Ensure adequate color contrast between logo and background (WCAG AA)

## Variations

### Light mode logo
```tsx
<SiteLogo 
  src="/assets/logo-dark.svg"
  alt="LightSpeed Logo"
  width="150px"
/>
```

### Dark mode support
```tsx
<SiteLogo 
  src="/assets/logo-dark.svg"
  srcDark="/assets/logo-light.svg"
  alt="LightSpeed Logo"
  width="150px"
/>
```

### Compact logo (mobile)
```tsx
<SiteLogo 
  src="/assets/logo.svg"
  alt="LightSpeed Logo"
  width="100px"
  className="md:w-[150px]"
/>
```

### Logo without link
```tsx
<SiteLogo 
  src="/assets/logo.svg"
  alt="LightSpeed Logo"
  width="150px"
  linkHref=""
/>
```

## Related components

- **Site Title block:** Displays the site name text
- **Site Tagline block:** Displays a brief description or slogan
- **Navigation block:** For menus placed alongside the logo in headers
- **Row block:** Used to layout logo with navigation horizontally

## When to use

Use the Site Logo block in global template parts such as headers, footers or sidebars. Avoid adding it in post or page content. Use the Site Title block instead when text is preferred over an image. Consider using both logo and title together for redundancy and SEO benefits.

## Design system compliance

**Images:**
- ✅ SVG preferred for scalability
- ✅ Optimized file sizes
- ✅ Transparent backgrounds
- ✅ Aspect ratio preserved

**Spacing:**
- ✅ Spacing tokens for margins/padding
- ✅ Responsive spacing (desktop vs mobile)
- ✅ No arbitrary values

**Accessibility:**
- ✅ Meaningful alt text
- ✅ ARIA labels for links
- ✅ Keyboard accessible
- ✅ Focus indicators

**Dark mode:**
- ✅ Automatic logo switching
- ✅ CSS variable integration
- ✅ Sufficient contrast in both modes

## Additional notes

Ensure the logo file is optimized for web use and scales gracefully. Provide separate assets for retina displays if using PNGs (2x resolution). Where possible, use an SVG with appropriate viewBox settings to ensure crisp rendering at any size.

**Logo best practices:**
- Keep it simple and recognizable
- Ensure it works at small sizes (favicon)
- Test on various backgrounds
- Provide adequate whitespace around logo
- Consider animated logo for special occasions (sparingly)

**Performance considerations:**
- Inline SVG for critical logos (faster rendering)
- Lazy load logos below the fold
- Use appropriate image formats (SVG > PNG > JPG)
- Compress images without quality loss
