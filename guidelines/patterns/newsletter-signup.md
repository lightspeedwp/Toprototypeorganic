# Newsletter Signup Pattern

**Category:** Utility  
**WordPress Equivalent:** Group block + Form blocks  
**Section Styles:** `section-newsletter-default`, `section-newsletter-sidebar`  
**Status:** ✅ Documented

---

## Overview

The Newsletter Signup pattern provides an email capture form to encourage visitors to subscribe to updates, travel tips, and special offers. This pattern is designed to be highly visible and conversion-focused, using the accent color to draw attention.

**Primary Use Cases:**
- Homepage footer area (capture leads before exit)
- Blog archive page (content marketing funnel)
- About page footer (engagement after learning about company)
- After-content placement (engaged readers)

**Design Philosophy:**
- Clear value proposition (what subscribers get)
- Minimal friction (email only, no required fields)
- Privacy-conscious (explicit privacy policy reference)
- Accessible (keyboard navigation, screen reader friendly)

---

## WordPress Block Structure

### Group Block Wrapper

```
Group {
  className: "section-newsletter-default" | "section-newsletter-sidebar"
  tagName: "section"
  ariaLabel: "Newsletter signup"
  
  Inner Blocks:
    └── Container { maxWidth: "md" | "sm", align: "center" | "left" }
          ├── HeadingBlock { level: 2, text: "Stay Inspired" }
          ├── ParagraphBlock { text: "Get travel tips, destination guides, and exclusive offers..." }
          ├── Form
          │   ├── Input { 
          │   │     type: "email", 
          │   │     name: "email",
          │   │     placeholder: "your@email.com",
          │   │     required: true,
          │   │     ariaLabel: "Email address"
          │   │   }
          │   └── Button { 
          │         variant: "accent", 
          │         type: "submit",
          │         text: "Subscribe" 
          │       }
          └── ParagraphBlock { 
                className: "text-xs text-center",
                text: "We respect your privacy. Unsubscribe at any time." 
              }
}
```

### Inner Blocks Composition

**Block Hierarchy:**
1. **HeadingBlock (h2)** - Section title ("Stay Inspired", "Get Updates", etc.)
2. **ParagraphBlock** - Value proposition (benefits of subscribing)
3. **Form Element**
   - Input (email) - Email address field
   - Button (submit) - Subscribe action
4. **ParagraphBlock (small)** - Privacy reassurance text

**Block Nesting Rules:**
- ✅ Must be wrapped in Group block
- ✅ Container provides width constraint
- ✅ Form contains Input + Button only
- ❌ No additional inner blocks allowed in Form
- ❌ No nested forms

---

## Section Styles

### Primary Variant: `section-newsletter-default`

**Purpose:** High-visibility newsletter signup for homepage, blog archive

**Styling:**
```css
.section-newsletter-default {
  background: var(--accent);                    /* Accent background */
  color: var(--accent-foreground);              /* White text on accent */
  padding: var(--spacing-section-md);           /* 48-96px vertical */
  text-align: center;
}

.section-newsletter-default .container {
  max-width: 640px;                             /* Medium container */
  margin: 0 auto;
}

.section-newsletter-default input {
  background: var(--input-background);          /* White input */
  color: var(--foreground);                     /* Dark text */
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
}

.section-newsletter-default button {
  background: var(--accent-foreground);         /* White button on accent bg */
  color: var(--accent);                         /* Accent text on white bg */
  font-weight: var(--font-weight-medium);
}
```

**Background:** `bg-accent` → `var(--accent)` (Amber: rgba(247, 174, 0, 1))  
**Text Color:** `text-accent-foreground` → `var(--accent-foreground)` (White)  
**Padding:** `py-16 md:py-20` (64-80px vertical)  
**Alignment:** Center  
**Container:** Max-width `md` (640px)

**Visual Characteristics:**
- High contrast (amber background, white text)
- Centered layout
- Large, inviting form
- Button inverts colors for visual hierarchy

---

### Alternate Variant: `section-newsletter-sidebar`

**Purpose:** Subtle, inline newsletter signup for blog posts, sidebar placement

**Styling:**
```css
.section-newsletter-sidebar {
  background: var(--secondary);                 /* Secondary background */
  color: var(--secondary-foreground);           /* Dark text on secondary */
  padding: var(--spacing-element-lg);           /* 24-48px vertical */
  text-align: left;
  border-radius: var(--radius-lg);
}

.section-newsletter-sidebar .container {
  max-width: 480px;                             /* Small container */
}
```

**Background:** `bg-secondary` → `var(--secondary)` (Beige: rgba(172, 159, 124, 1))  
**Text Color:** `text-secondary-foreground` → `var(--secondary-foreground)` (Dark)  
**Padding:** `py-8 md:py-12` (32-48px vertical)  
**Alignment:** Left  
**Container:** Max-width `sm` (480px)  
**Border Radius:** `rounded-lg` → `var(--radius-lg)` (6px)

**Visual Characteristics:**
- Subtle, non-intrusive
- Left-aligned for readability
- Smaller, compact form
- Rounded corners for card-like appearance

---

## Design Token Usage

### Typography

**Heading (H2):**
- Element: `<h2>`
- Font family: `var(--font-family-lora)` (Lora, serif) - AUTOMATIC
- Font size: `var(--text-4xl)` - clamp(1.875rem, 3vw + 0.5rem, 3rem) - AUTOMATIC
- Font weight: `var(--font-weight-semibold)` (600) - AUTOMATIC
- Line height: `var(--leading-tight)` (1.2) - AUTOMATIC
- Letter spacing: `var(--tracking-tight)` (-0.025em) - AUTOMATIC
- ❌ NO Tailwind classes needed (text-4xl, font-semibold) - uses semantic HTML

**Description Paragraph:**
- Element: `<p>`
- Font family: `var(--font-family-noto-sans)` (Noto Sans, sans-serif) - AUTOMATIC
- Font size: `var(--text-base)` - clamp(1rem, 0.5vw + 0.875rem, 1.125rem) - AUTOMATIC
- Font weight: `var(--font-weight-normal)` (400) - AUTOMATIC
- Line height: `var(--leading-normal)` (1.5) - AUTOMATIC
- ❌ NO Tailwind classes needed - uses semantic HTML

**Privacy Note (Small):**
- Element: `<p className="text-xs">`
- Font size: `var(--text-xs)` - clamp(0.75rem, 0.25vw + 0.6875rem, 0.875rem)
- ✅ ONLY exception: `text-xs` class for intentional size override

**Input Field:**
- Font family: `var(--font-family-noto-sans)` - AUTOMATIC via semantic HTML
- Font size: `var(--text-base)` - AUTOMATIC
- Font weight: `var(--font-weight-normal)` - AUTOMATIC

**Button:**
- Font family: `var(--font-family-noto-sans)` - AUTOMATIC via semantic HTML
- Font size: `var(--text-base)` - AUTOMATIC
- Font weight: `var(--font-weight-medium)` (500) - AUTOMATIC

---

### Colors

**Default Variant:**
- Background: `bg-accent` → `var(--accent)` - rgba(247, 174, 0, 1)
- Text: `text-accent-foreground` → `var(--accent-foreground)` - rgba(255, 255, 255, 1)
- Input background: `bg-input` → `var(--input-background)` - rgba(255, 255, 255, 1)
- Input text: `text-foreground` → `var(--foreground)` - rgba(9, 9, 9, 1)
- Input border: `border-border` → `var(--border)` - rgba(117, 117, 117, 1)
- Button background: `bg-accent-foreground` → `var(--accent-foreground)` - rgba(255, 255, 255, 1)
- Button text: `text-accent` → `var(--accent)` - rgba(247, 174, 0, 1)
- Focus ring: `ring-ring` → `var(--ring)` - rgba(0, 71, 208, 1)

**Sidebar Variant:**
- Background: `bg-secondary` → `var(--secondary)` - rgba(172, 159, 124, 1)
- Text: `text-secondary-foreground` → `var(--secondary-foreground)` - rgba(9, 9, 9, 1)
- Input: Same as default
- Button: `bg-primary`, `text-primary-foreground`

**WCAG Compliance:**
- ✅ Accent on accent-foreground: 4.5:1+ (AA compliant)
- ✅ Input text on white: 21:1 (AAA compliant)
- ✅ Secondary on secondary-foreground: 4.5:1+ (AA compliant)

---

### Spacing

**Section Padding:**
- Default: `py-16 md:py-20` (64-80px vertical)
  - Mobile: 64px
  - Desktop: 80px
- Sidebar: `py-8 md:py-12` (32-48px vertical)
  - Mobile: 32px
  - Desktop: 48px

**Element Spacing:**
- Heading to description: `mb-4` (16px)
- Description to form: `mb-6` (24px)
- Form fields gap: `gap-4` (16px)
- Form to privacy note: `mt-4` (16px)

**Container Padding:**
- Horizontal: `px-4 md:px-6` (16-24px)

**Form Layout:**
- Flex direction: `flex-col md:flex-row` (stacked mobile, inline desktop)
- Gap: `gap-4` (16px between input and button)

---

### Borders & Radius

**Input Field:**
- Border: `border border-border` → `1px solid var(--border)`
- Border radius: `rounded-md` → `var(--radius-md)` (4px)

**Button:**
- Border radius: `rounded-md` → `var(--radius-md)` (4px)

**Sidebar Variant Container:**
- Border radius: `rounded-lg` → `var(--radius-lg)` (6px)

**Focus States:**
- Focus ring: `ring-2 ring-ring ring-offset-2`
- Ring color: `var(--ring)` (Blue)
- Ring width: 2px
- Ring offset: 2px

---

## Props Interface

```typescript
interface NewsletterSignupPatternProps {
  /** Section heading text */
  title?: string;
  
  /** Value proposition / benefit description */
  description?: string;
  
  /** Submit button text */
  buttonText?: string;
  
  /** Privacy policy note (small text) */
  privacyNote?: string;
  
  /** Visual variant */
  variant?: 'default' | 'sidebar';
  
  /** Form submission handler */
  onSubmit?: (email: string) => void | Promise<void>;
  
  /** Loading state during submission */
  isLoading?: boolean;
  
  /** Success message after submission */
  successMessage?: string;
  
  /** Error message on failure */
  errorMessage?: string;
}
```

---

## Usage Examples

### Basic Usage (Default Variant)

```typescript
<NewsletterSignupPattern
  title="Stay Inspired"
  description="Get travel tips, destination guides, and exclusive offers delivered to your inbox."
  buttonText="Subscribe"
  variant="default"
/>
```

### Sidebar Variant

```typescript
<NewsletterSignupPattern
  title="Get Updates"
  description="Never miss a new destination guide or travel tip."
  buttonText="Sign Up"
  variant="sidebar"
/>
```

### With Form Handling

```typescript
<NewsletterSignupPattern
  title="Join Our Community"
  description="5,000+ travelers already receive our weekly newsletter."
  onSubmit={async (email) => {
    await subscribeToNewsletter(email);
  }}
  isLoading={isSubmitting}
  successMessage="Thanks! Check your email to confirm."
  variant="default"
/>
```

### In Template Context (HomePage)

```typescript
import { GroupBlock } from "../components/blocks/design/GroupBlock";
import { NewsletterSignupPattern } from "../components/patterns/NewsletterSignupPattern";

// In HomePage.tsx
export function HomePage() {
  return (
    <>
      {/* Other sections */}
      
      <GroupBlock className="section-newsletter-default">
        <NewsletterSignupPattern
          title="Stay Inspired"
          description="Get travel tips, destination guides, and exclusive offers delivered to your inbox."
          variant="default"
        />
      </GroupBlock>
      
      {/* CTA section */}
    </>
  );
}
```

### In Template Context (BlogArchive)

```typescript
// In BlogArchive.tsx
export function BlogArchive() {
  return (
    <>
      {/* Posts grid */}
      
      <GroupBlock className="section-newsletter-sidebar">
        <NewsletterSignupPattern
          title="Get Updates"
          description="Never miss a new post."
          variant="sidebar"
        />
      </GroupBlock>
    </>
  );
}
```

---

## Accessibility Requirements

### Semantic HTML
- [ ] `<section>` element with `aria-label="Newsletter signup"`
- [ ] `<h2>` for section title (proper heading hierarchy)
- [ ] `<form>` element with proper submit handling
- [ ] `<input type="email">` with `name="email"` and `required` attribute
- [ ] `<button type="submit">` for form submission

### ARIA Labels
- [ ] Input has `aria-label="Email address"` or associated `<label>`
- [ ] Form has `aria-describedby` linking to privacy note
- [ ] Loading state: `aria-busy="true"` on form during submission
- [ ] Success/error messages: `role="status"` for screen reader announcements

### Keyboard Navigation
- [ ] Tab order: heading → input → button → privacy note links
- [ ] Enter key submits form
- [ ] Escape key clears input (optional)
- [ ] Focus visible on all interactive elements

### Focus States
- [ ] Input: `ring-2 ring-ring ring-offset-2` on focus
- [ ] Button: `ring-2 ring-ring ring-offset-2` on focus
- [ ] Focus ring color: `var(--ring)` (Blue, high contrast)

### Color Independence
- [ ] Information not conveyed by color alone
- [ ] Error states use icon + text (not just red border)
- [ ] Success states use icon + text (not just green checkmark)

### Screen Reader Announcements
- [ ] Success message: Announced via `role="status"` or `aria-live="polite"`
- [ ] Error message: Announced via `role="alert"` or `aria-live="assertive"`
- [ ] Loading state: Announced via `aria-busy` attribute

### Touch Targets (Mobile)
- [ ] Input height: Minimum 44px (tap target size)
- [ ] Button height: Minimum 44px (tap target size)
- [ ] Spacing between input and button: Minimum 8px

---

## Form Validation

### Client-Side Validation

```typescript
// HTML5 validation
<input 
  type="email" 
  name="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>

// Error message
{hasError && (
  <p id="email-error" className="text-destructive text-sm mt-1">
    Please enter a valid email address.
  </p>
)}
```

### Validation States

**Invalid State:**
- Border color: `border-destructive` → `var(--destructive)`
- Error text: `text-destructive` → `var(--destructive)`
- Icon: Alert triangle or X icon
- ARIA: `aria-invalid="true"`, `aria-describedby="email-error"`

**Valid State:**
- Border color: `border-primary` → `var(--primary)` (optional)
- Icon: Checkmark icon (optional)
- ARIA: `aria-invalid="false"`

**Loading State:**
- Button: Disabled, spinner icon
- Form: `aria-busy="true"`
- Button text: "Subscribing..." or spinner

**Success State:**
- Replace form with success message
- Icon: Checkmark
- Message: "Thanks! Check your email to confirm."
- Color: `text-primary` → `var(--primary)`

---

## Related Patterns

- [CTA Pattern](./cta-patterns.md) - Similar call-to-action structure
- [Contact Info Pattern](./contact-info.md) - Related contact/engagement patterns
- [Empty State Pattern](./empty-state.md) - Success/error state messaging

---

## Related Blocks

- [HeadingBlock](/guidelines/blocks/core/heading.md) - Section title
- [ParagraphBlock](/guidelines/blocks/core/paragraph.md) - Description and privacy note
- [Group Block](/guidelines/blocks/design/group.md) - Section wrapper
- [Button Block](/guidelines/blocks/design/button.md) - Submit button
- [Container](/guidelines/components/Container.md) - Width constraint

---

## WordPress Template Usage

**Used In:**
- `templates/front-page.html` (Homepage)
- `templates/archive-post.html` (Blog archive)
- `templates/page-about.html` (About page)
- `patterns/newsletter-signup-default.php`
- `patterns/newsletter-signup-sidebar.php`

**Pattern Registration (WordPress):**

```php
<?php
/**
 * Title: Newsletter Signup (Default)
 * Slug: lsx-tour-operator/newsletter-signup-default
 * Categories: call-to-action
 * Keywords: newsletter, email, subscribe, signup
 */
?>

<!-- wp:group {"className":"section-newsletter-default","tagName":"section","ariaLabel":"Newsletter signup"} -->
<section class="wp-block-group section-newsletter-default" aria-label="Newsletter signup">
  
  <!-- wp:group {"className":"container","layout":{"type":"constrained","contentSize":"640px"}} -->
  <div class="wp-block-group container">
    
    <!-- wp:heading {"level":2} -->
    <h2>Stay Inspired</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph -->
    <p>Get travel tips, destination guides, and exclusive offers delivered to your inbox.</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:html -->
    <form class="newsletter-form">
      <input type="email" name="email" placeholder="your@email.com" required aria-label="Email address" />
      <button type="submit" class="wp-block-button__link bg-accent-foreground text-accent">Subscribe</button>
    </form>
    <!-- /wp:html -->
    
    <!-- wp:paragraph {"className":"text-xs text-center"} -->
    <p class="text-xs text-center">We respect your privacy. Unsubscribe at any time.</p>
    <!-- /wp:paragraph -->
    
  </div>
  <!-- /wp:group -->
  
</section>
<!-- /wp:group -->
```

---

## Design System Compliance Checklist

### Typography
- [ ] ✅ Heading uses `<h2>` (no `text-4xl` or `font-semibold` classes)
- [ ] ✅ Paragraphs use `<p>` (no `text-base` class)
- [ ] ✅ Only `text-xs` class used for privacy note (intentional deviation)
- [ ] ✅ Input/button inherit font from semantic HTML

### Colors
- [ ] ✅ Background uses `bg-accent` or `bg-secondary` (semantic tokens)
- [ ] ✅ Text uses `text-accent-foreground` or `text-secondary-foreground`
- [ ] ✅ No hardcoded hex colors (#...)
- [ ] ✅ No hardcoded RGB/RGBA colors

### Spacing
- [ ] ✅ Padding uses `py-16 md:py-20` (Tailwind scale)
- [ ] ✅ Gaps use `gap-4`, `mb-4`, `mt-4` (Tailwind scale)
- [ ] ✅ No arbitrary values (e.g., `py-[47px]`)

### Borders & Radius
- [ ] ✅ Border uses `border-border` (semantic token)
- [ ] ✅ Radius uses `rounded-md` or `rounded-lg` (CSS variables)
- [ ] ✅ Focus ring uses `ring-ring` (semantic token)

### WordPress Alignment
- [ ] ✅ Wrapped in Group block
- [ ] ✅ Section style applied (`section-newsletter-default` or `section-newsletter-sidebar`)
- [ ] ✅ Proper inner block composition
- [ ] ✅ WordPress block pattern registered

### Accessibility
- [ ] ✅ WCAG AA contrast compliance
- [ ] ✅ Keyboard navigable
- [ ] ✅ Screen reader friendly
- [ ] ✅ Touch target sizes (44px minimum)
- [ ] ✅ Focus states visible

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete - Ready for Implementation

