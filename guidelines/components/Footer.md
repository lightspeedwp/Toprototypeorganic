# Footer Component Guidelines

**Component:** Footer  
**Category:** Template Parts  
**WordPress Equivalent:** `parts/footer.html`  
**File:** `/src/app/components/parts/Footer.tsx`

---

## Purpose

The Footer component provides supplementary site navigation organized by category, contact information, copyright details, and developer tools. It serves as the secondary navigation and information footer for all pages.

---

## WordPress Mapping

**Template Part:** `parts/footer.html`

In WordPress block themes, this would be composed of:
- `core/columns` - Multi-column layout
- `core/navigation` - Footer menus
- `core/paragraph` - Contact info and copyright
- `core/social-links` - Social media (optional)

---

## Component API

### Props

```typescript
interface FooterProps {
  /** Current active page ID (for highlighting active links) */
  currentPage?: string;
  
  /** Callback when navigation link is clicked */
  onNavigate?: (pageId: string) => void;
}
```

### Usage

```tsx
import { Footer } from "./components/parts/Footer";

// Basic usage
<Footer />

// With navigation handling
<Footer 
  currentPage="tours-archive"
  onNavigate={(pageId) => setCurrentPage(pageId)}
/>
```

---

## Features

### 1. Multi-Column Layout

**4 Columns (Desktop):**
1. Company Information
2. Explore Links
3. Company Links
4. Contact Information

**Single Column (Mobile):**
- Stacked columns
- Same content order

### 2. Company Information (Column 1)

**Content:**
- Site name/branding: "Tour Operator"
- Tagline: "Creating unforgettable African safari experiences since 2005"

**Styling:**
- Heading: Lora, 20px, semibold
- Text: Noto Sans, 16px, muted foreground

### 3. Explore Links (Column 2)

**Heading:** "Explore"

**Links:**
- Tours → `tour-archive-wp`
- Destinations → `destination-archive-wp`
- Accommodation → `accommodation-archive`
- Travel Styles → `taxonomy-archive`

**Behavior:**
- Click navigates to page
- Scrolls to top on navigation
- Hover color changes to foreground

### 4. Company Links (Column 3)

**Heading:** "Company"

**Links:**
- About Us → `about-page`
- Our Team → `team-archive`
- Blog → `blog-archive`
- Contact → `contact-page`
- FAQ → `faq-page`

### 5. Contact Information (Column 4)

**Heading:** "Contact"

**Information:**
- Location: "Cape Town, South Africa"
- Phone: "+27 21 123 4567" (clickable tel: link)
- Email: "info@touroperator.com" (clickable mailto: link)

**Styling:**
- Static text: Muted foreground
- Links: Hover color changes to foreground

### 6. Footer Bottom

**Left Side:**
- Copyright: "© 2024 Tour Operator. All rights reserved."

**Right Side:**
- Template Browser Link: "Test All Templates & Pages"
- Icon: Grid icon (SVG)
- Behavior: Scrolls to top (template browser is at top-left)

---

## Layout Specifications

### Desktop Layout

**Grid:** 4 columns  
**Gap:** 32px (gap-8)  
**Padding:** 48px vertical (py-12)  
**Background:** Muted background (bg-muted/30)  
**Border:** Top border (border-t)

**Footer Bottom:**
- Margin top: 32px (mt-8)
- Border top: 1px (border-t)
- Padding top: 32px (pt-8)
- Flex row: space-between
- Alignment: center

### Mobile Layout

**Grid:** Single column (stacked)  
**Gap:** 32px (gap-8)  
**Padding:** 48px vertical (py-12)

**Footer Bottom:**
- Flex column (stacked)
- Gap: 16px (gap-4)
- Text center
- Items center

---

## Typography

### Headings

**Column Headings (h4):**
- Font: Lora
- Size: 16px (var(--text-base))
- Weight: Semibold (var(--font-weight-semibold))
- Margin bottom: 16px

**Company Heading (h3):**
- Font: Lora
- Size: 20px (var(--text-lg))
- Weight: Semibold
- Margin bottom: 16px

### Body Text

**Links:**
- Font: Noto Sans
- Size: 16px (var(--text-base))
- Color: Muted foreground
- Hover: Foreground color

**Paragraphs:**
- Font: Noto Sans
- Size: 16px (var(--text-base))
- Color: Muted foreground

**Copyright:**
- Font: Noto Sans
- Size: 16px (var(--text-base))
- Color: Muted foreground

---

## Accessibility

### Semantic HTML

```tsx
<footer>
  <Container>
    {/* Columns use div with grid */}
    <div className="grid">
      <div>
        <h3>Company Name</h3>
        <p>Description</p>
      </div>
      <div>
        <h4>Column Heading</h4>
        <ul>
          <li><button>Link</button></li>
        </ul>
      </div>
    </div>
  </Container>
</footer>
```

### Keyboard Navigation

**Tab Order:**
1. All Explore links (top to bottom)
2. All Company links (top to bottom)
3. Phone link (tel:)
4. Email link (mailto:)
5. Template Browser link

**Keyboard Controls:**
- `Tab` - Navigate through links
- `Enter/Space` - Activate link
- `Shift+Tab` - Navigate backwards

### Screen Reader Support

- Semantic `<footer>` landmark
- Column headings (h3, h4) for structure
- List markup (`ul`, `li`) for link groups
- Descriptive link text (no "click here")
- Phone/email links with proper protocols

### Focus States

- Visible focus ring on all links
- Focus color: `ring-ring`
- No hidden focus indicators
- High contrast focus states

---

## Link Types

### Internal Navigation Links

**Implementation:**
```tsx
<button 
  onClick={() => handleNavigate('page-id')}
  className="text-muted-foreground hover:text-foreground transition-colors text-left"
>
  Link Text
</button>
```

**Behavior:**
- Calls `onNavigate` callback
- Scrolls to top
- Changes active page

### External Links (Email/Phone)

**Email:**
```tsx
<a 
  href="mailto:info@touroperator.com"
  className="hover:text-foreground transition-colors"
>
  info@touroperator.com
</a>
```

**Phone:**
```tsx
<a 
  href="tel:+27211234567"
  className="hover:text-foreground transition-colors"
>
  +27 21 123 4567
</a>
```

**Behavior:**
- Opens default email client (mailto:)
- Initiates phone call (tel:)
- No navigation

### Template Browser Link

**Implementation:**
```tsx
<a 
  href="#template-browser"
  onClick={handleTemplateBrowserClick}
>
  Test All Templates & Pages
</a>
```

**Behavior:**
- Prevents default anchor behavior
- Scrolls to top
- Template browser is already visible (top-left)

---

## Styling

### Colors

**Background:**
- `bg-muted/30` - Subtle muted background
- Differentiates footer from main content

**Border:**
- `border-t` - Top border for separation
- Default border color

**Text:**
- Default: `text-muted-foreground`
- Hover: `text-foreground`
- Transition: `transition-colors`

### Spacing

**Column Spacing:**
- Gap: 32px (gap-8)
- Mobile: Stacks with same gap

**Vertical Padding:**
- Top/bottom: 48px (py-12)
- Footer bottom margin: 32px (mt-8)
- Footer bottom padding: 32px (pt-8)

**Link Spacing:**
- Vertical: 8px (space-y-2)
- Between columns: 32px (gap-8)

---

## Content Guidelines

### Column 1: Company Info

✅ **Do:**
- Keep tagline to 1-2 sentences
- Focus on brand value proposition
- Use conversational tone
- Make it memorable

❌ **Don't:**
- Write a full paragraph
- Include dates that need updating
- Use marketing jargon
- Make claims without proof

### Column 2 & 3: Navigation

✅ **Do:**
- Group related links logically
- Use clear, concise labels
- Limit to 4-6 links per column
- Prioritize important pages
- Match main nav structure

❌ **Don't:**
- Duplicate every page link
- Use vague labels
- Create orphan pages (not in footer)
- Forget mobile users
- Include broken links

### Column 4: Contact Info

✅ **Do:**
- Include physical location
- Provide phone number
- Include email address
- Make links clickable (tel:, mailto:)
- Use international format for phone

❌ **Don't:**
- Use generic email (noreply@)
- Forget country code for phone
- Include too many contact options
- Make contact info plain text only
- Use personal emails

---

## Common Patterns

### Pattern 1: Adding a New Link Column

```tsx
<div>
  <h4 style={{ 
    fontFamily: 'var(--font-family-lora)', 
    fontSize: 'var(--text-base)', 
    fontWeight: 'var(--font-weight-semibold)', 
    marginBottom: '1rem' 
  }}>
    Column Heading
  </h4>
  <ul className="space-y-2">
    <li>
      <button 
        onClick={() => handleNavigate('page-id')}
        className="text-muted-foreground hover:text-foreground transition-colors text-left"
        style={{ 
          fontFamily: 'var(--font-family-noto-sans)', 
          fontSize: 'var(--text-base)' 
        }}
      >
        Link Label
      </button>
    </li>
  </ul>
</div>
```

### Pattern 2: Adding Social Links

```tsx
<div>
  <h4>Follow Us</h4>
  <div className="flex gap-4 mt-4">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <FacebookIcon className="w-6 h-6" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <TwitterIcon className="w-6 h-6" />
    </a>
  </div>
</div>
```

### Pattern 3: Newsletter Signup

```tsx
<div>
  <h4>Newsletter</h4>
  <p className="text-muted-foreground mb-4">
    Subscribe for travel inspiration
  </p>
  <form className="flex gap-2">
    <input 
      type="email" 
      placeholder="Your email"
      className="flex-1 px-3 py-2 rounded-md border"
    />
    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
      Subscribe
    </button>
  </form>
</div>
```

---

## Responsive Behavior

### Desktop (≥768px)

- 4 columns side-by-side
- Equal column widths
- Footer bottom: row layout (space-between)

### Tablet (768px - 1023px)

- 2 columns × 2 rows
- Maintains grid structure
- Footer bottom: row layout

### Mobile (<768px)

- Single column (stacked)
- Full width links/text
- Footer bottom: column layout (centered)

---

## Testing Checklist

### Desktop

- [ ] 4 columns display side-by-side
- [ ] All links are clickable
- [ ] Links navigate to correct pages
- [ ] Hover states work
- [ ] Phone link opens dialer
- [ ] Email link opens mail client
- [ ] Template browser link scrolls to top
- [ ] Copyright text displays
- [ ] Spacing is consistent

### Mobile

- [ ] Columns stack vertically
- [ ] Links are full width
- [ ] Tap targets are 44px+
- [ ] All links work
- [ ] Text is readable
- [ ] Footer bottom centers
- [ ] No horizontal scroll

### Accessibility

- [ ] Tab order is logical
- [ ] Focus visible on all links
- [ ] Screen reader announces links
- [ ] Semantic footer landmark
- [ ] Headings create hierarchy
- [ ] Lists markup correct
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works

---

## WordPress Implementation Notes

When implementing in WordPress:

1. **Footer Template Part:** Create `parts/footer.html`
2. **Columns Block:** Use `core/columns` for layout
3. **Navigation Blocks:** Use `core/navigation` for menus
4. **Contact Info:** Use `core/paragraph` or custom block

**Footer Structure:**

```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<footer>
  <!-- wp:columns {"align":"wide"} -->
  <div class="wp-block-columns">
    <!-- Column 1: Company Info -->
    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:heading -->
      <h3>Company Name</h3>
      <!-- wp:paragraph -->
      <p>Description</p>
    </div>
    
    <!-- Column 2: Explore Links -->
    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:heading -->
      <h4>Explore</h4>
      <!-- wp:navigation /-->
    </div>
    
    <!-- Columns 3 & 4... -->
  </div>
  
  <!-- Footer Bottom -->
  <!-- wp:group -->
  <div class="footer-bottom">
    <!-- wp:paragraph -->
    <p>Copyright text</p>
  </div>
</footer>
```

---

## Related Documentation

- [Header Component](Header.md)
- [PageLayout Component](PageLayout.md)
- [Container Component](Container.md)
- [Navigation Links Pattern](/guidelines/patterns/navigation-links.md)
- [Accessibility Guidelines](/guidelines/accessibility-testing.md)

---

**Last Updated:** December 25, 2024  
**Version:** V3 — WordPress-Native Alignment
