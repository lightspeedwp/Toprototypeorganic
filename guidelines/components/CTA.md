# Call-to-Action (CTA) Pattern Guidelines

**Component:** `CTA`  
**Location:** `/src/app/components/patterns/CTA.tsx`  
**WordPress Equivalent:** Custom pattern (`cta/*`)  
**Category:** Conversion Patterns

---

## Purpose

The CTA (Call-to-Action) pattern is a prominent section designed to drive user conversion by encouraging specific actions.

**Use for:**
- Newsletter signups
- Tour booking prompts
- Contact requests
- Download guides
- Next step encouragement
- Page conversion goals

**Don't use for:**
- Primary navigation (use Header)
- In-content links (use inline links)
- Every section (overuse reduces effectiveness)

---

## WordPress Mapping

```html
<!-- WordPress Pattern (patterns/cta/cta-newsletter.php) -->
<!-- wp:group {"className":"cta-pattern","backgroundColor":"primary"} -->
<div class="cta-pattern has-primary-background-color">
  
  <!-- wp:heading {"level":2,"textAlign":"center"} -->
  <h2 class="has-text-align-center">Subscribe to Our Newsletter</h2>
  <!-- /wp:heading -->
  
  <!-- wp:paragraph {"align":"center"} -->
  <p class="has-text-align-center">Get exclusive travel deals delivered to your inbox</p>
  <!-- /wp:paragraph -->
  
  <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
  <div class="wp-block-buttons">
    <!-- wp:button -->
    <a class="wp-block-button__link" href="/newsletter">Subscribe Now</a>
    <!-- /wp:button -->
  </div>
  <!-- /wp:buttons -->
  
</div>
<!-- /wp:group -->
```

**React Equivalent:**

```tsx
<CTA
  variant="primary"
  title="Subscribe to Our Newsletter"
  description="Get exclusive travel deals delivered to your inbox"
  primaryAction={{
    label: "Subscribe Now",
    href: "/newsletter",
  }}
/>
```

---

## Component API

### Props

```typescript
interface CTAProps {
  /** CTA title (H2) */
  title: string;
  
  /** Supporting description */
  description?: string;
  
  /** Primary call-to-action */
  primaryAction: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  
  /** Secondary call-to-action (optional) */
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  
  /** CTA variant */
  variant?: "primary" | "secondary" | "accent" | "minimal" | "image";
  
  /** Content alignment */
  alignment?: "left" | "center" | "right";
  
  /** Background image (for image variant) */
  backgroundImage?: string;
  
  /** Icon */
  icon?: React.ReactNode;
  
  /** Additional CSS classes */
  className?: string;
}
```

---

## CTA Variants

### 1. Primary CTA
**Use for:** Main conversion goals (newsletter, contact, booking)

**Features:**
- Primary background color
- White text
- Centered content
- High contrast

**Example:**
```tsx
<CTA
  variant="primary"
  title="Ready to Start Your Adventure?"
  description="Book your dream tour today and create memories that last a lifetime"
  primaryAction={{
    label: "View All Tours",
    href: "/tours",
  }}
  secondaryAction={{
    label: "Contact Us",
    href: "/contact",
  }}
  alignment="center"
/>
```

### 2. Secondary CTA
**Use for:** Supporting actions, alternative paths

**Features:**
- Muted background
- Foreground text
- Subtle presence
- Less prominent

**Example:**
```tsx
<CTA
  variant="secondary"
  title="Need Help Planning Your Trip?"
  description="Our travel experts are here to assist you"
  primaryAction={{
    label: "Contact Our Team",
    href: "/contact",
  }}
  alignment="left"
/>
```

### 3. Accent CTA
**Use for:** Special promotions, urgent actions

**Features:**
- Accent color background
- High energy
- Attention-grabbing
- Limited use

**Example:**
```tsx
<CTA
  variant="accent"
  title="Limited Time Offer!"
  description="Save 20% on all Iceland tours this month"
  primaryAction={{
    label: "View Deals",
    href: "/specials",
  }}
  alignment="center"
/>
```

### 4. Minimal CTA
**Use for:** Subtle prompts, secondary conversions

**Features:**
- No background
- Border only
- Inline with content
- Low visual weight

**Example:**
```tsx
<CTA
  variant="minimal"
  title="Looking for Something Specific?"
  description="Tell us about your dream trip and we'll create a custom itinerary"
  primaryAction={{
    label: "Request Custom Tour",
    href: "/custom-tours",
  }}
  alignment="left"
/>
```

### 5. Image CTA
**Use for:** Emotional appeal, destination-specific CTAs

**Features:**
- Background image
- Dark overlay
- White text
- Visual impact

**Example:**
```tsx
<CTA
  variant="image"
  title="Discover Iceland's Northern Lights"
  description="Experience nature's most spectacular light show"
  backgroundImage="/cta/northern-lights.jpg"
  primaryAction={{
    label: "Explore Iceland Tours",
    href: "/tours?destination=iceland",
  }}
  alignment="center"
/>
```

---

## Styling

### CSS Variables (from theme.css)

```css
/* Primary CTA */
.cta-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: var(--spacing-section-md) var(--spacing-section-sm);
}

/* Secondary CTA */
.cta-secondary {
  background-color: hsl(var(--muted));
  color: hsl(var(--foreground));
}

/* Accent CTA */
.cta-accent {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

/* Minimal CTA */
.cta-minimal {
  border: 2px solid hsl(var(--border));
  background-color: transparent;
}

/* Image CTA */
.cta-image {
  position: relative;
  background-size: cover;
  background-position: center;
}

.cta-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.6)
  );
}
```

### Design Tokens

**Colors:**
- Primary: `bg-primary`, `text-primary-foreground`
- Secondary: `bg-muted`, `text-foreground`
- Accent: `bg-accent`, `text-accent-foreground`
- Minimal: `border-border`, `text-foreground`
- Image overlay: `bg-black/50`

**Spacing:**
- Vertical padding: `py-16` (desktop), `py-12` (mobile)
- Horizontal padding: `px-6` (mobile), `px-8` (desktop)
- Content max-width: `max-w-3xl`
- Title margin: `mb-4`
- Description margin: `mb-8`
- Button gap: `gap-4`

**Typography:**
- Title (H2): Lora, semibold (600), 32-40px
- Description: Noto Sans, normal (400), 18px
- Buttons: Noto Sans, medium (500), 16px

**Border Radius:**
- Container: `rounded-lg` (6px) or none for full-width
- Buttons: `rounded-lg` (6px)

---

## Content Guidelines

### Title

**DO:**
- Keep under 60 characters
- Use action-oriented language
- Be specific and clear
- Match user intent

**Examples:**
- ✅ "Ready to Book Your Iceland Adventure?"
- ✅ "Join 10,000+ Happy Travelers"
- ✅ "Subscribe for Exclusive Travel Deals"
- ❌ "Click Here" (too vague)
- ❌ "Our Very Long Newsletter Subscription Section Title" (too long)

### Description

**DO:**
- Support the title
- Provide value proposition
- Keep under 120 characters
- Be concise

**Examples:**
- ✅ "Get expert travel tips and exclusive discounts delivered weekly"
- ✅ "Browse 100+ hand-picked tours across 30+ destinations"
- ❌ "Lorem ipsum dolor sit amet..." (not real content)

### Primary Action

**DO:**
- Use strong action verbs
- Be specific
- Create urgency (when appropriate)
- Keep under 3 words

**Examples:**
- ✅ "Book Now"
- ✅ "View Tours"
- ✅ "Subscribe Today"
- ✅ "Get Started"
- ❌ "Click Here to View Our Tours" (too long)

---

## Placement Guidelines

### Page Placement

**Top of Page:**
- ❌ Don't use (hero serves this purpose)

**Middle of Page:**
- ✅ After 2-3 sections
- ✅ Natural break in content
- ✅ Context established

**Bottom of Page:**
- ✅ Final conversion opportunity
- ✅ After user has scrolled all content
- ✅ Before footer

### Frequency

**Single Page:**
- Maximum 2 CTAs per page
- Different variants/purposes
- Strategic placement

**Multi-Step:**
- CTA at each decision point
- Progressive disclosure
- Contextual relevance

---

## Accessibility

### WCAG 2.1 AA Compliance

**Heading Hierarchy:**
- CTA title should be H2 (or appropriate level)
- Maintain logical heading order
- Don't skip heading levels

**Color Contrast:**
- Text on background: 4.5:1 minimum
- Button contrast: 4.5:1 minimum
- Image variant: ensure overlay provides sufficient contrast

**Semantic HTML:**
```tsx
<section className="cta-pattern" aria-label="Call to action">
  <div className="cta-content">
    <h2>{title}</h2>
    {description && <p>{description}</p>}
    <div className="cta-actions">
      <a href={primaryAction.href} className="button-primary">
        {primaryAction.label}
      </a>
    </div>
  </div>
</section>
```

**Keyboard Navigation:**
- All buttons keyboard accessible
- Focus states visible
- Logical tab order

**Screen Reader:**
- `aria-label="Call to action"` on container
- Descriptive button text (no "Click here")
- Image variant: decorative background (aria-hidden)

---

## Common Patterns

### Newsletter CTA

```tsx
<CTA
  variant="primary"
  title="Stay in the Loop"
  description="Get travel inspiration, exclusive deals, and destination guides"
  primaryAction={{
    label: "Subscribe Now",
    href: "/newsletter",
  }}
  alignment="center"
  icon={<Mail size={32} />}
/>
```

### Contact CTA

```tsx
<CTA
  variant="secondary"
  title="Have Questions?"
  description="Our travel experts are here to help you plan the perfect trip"
  primaryAction={{
    label: "Contact Us",
    href: "/contact",
  }}
  secondaryAction={{
    label: "View FAQ",
    href: "/faq",
  }}
  alignment="left"
/>
```

### Booking CTA

```tsx
<CTA
  variant="accent"
  title="Ready to Book?"
  description="Secure your spot on this unforgettable adventure"
  primaryAction={{
    label: "Book This Tour",
    href: `/tours/${tour.slug}/book`,
  }}
  secondaryAction={{
    label: "Ask a Question",
    href: "/contact",
  }}
  alignment="center"
/>
```

### Download CTA

```tsx
<CTA
  variant="minimal"
  title="Download Our Complete Guide"
  description="Everything you need to know about planning your Iceland adventure"
  primaryAction={{
    label: "Download PDF",
    onClick: () => downloadPDF('/guides/iceland.pdf'),
  }}
  alignment="left"
  icon={<Download size={24} />}
/>
```

### Destination CTA

```tsx
<CTA
  variant="image"
  title="Experience the Magic of Iceland"
  description="From glaciers to geysers, discover nature's wonders"
  backgroundImage="/cta/iceland.jpg"
  primaryAction={{
    label: "Explore Iceland Tours",
    href: "/tours?destination=iceland",
  }}
  alignment="center"
/>
```

---

## Mobile Considerations

### Responsive Design

**Desktop (lg):**
- Full-width or constrained container
- Side-by-side buttons
- Ample padding

**Tablet (md):**
- Constrained width
- Side-by-side buttons (if space)
- Moderate padding

**Mobile (sm):**
- Full-width
- Stacked buttons
- Compact padding
- Larger touch targets

### Touch Targets

**All CTA buttons:**
- Minimum 44x44px
- Generous padding: `px-8 py-3`
- Clear tap states
- Sufficient spacing between buttons

---

## Performance

### Background Images

```tsx
// Optimize background images for CTA
<div 
  className="cta-image"
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Use lazy loading for below-fold CTAs */}
  <img 
    src={backgroundImage} 
    alt="" 
    loading="lazy" 
    className="absolute inset-0 object-cover"
    aria-hidden="true"
  />
</div>
```

---

## Testing Checklist

- [ ] Title displays correctly (H2)
- [ ] Description shows (if provided)
- [ ] Primary action works
- [ ] Secondary action works (if present)
- [ ] Background image loads (image variant)
- [ ] Text contrast meets WCAG AA
- [ ] Variant styling correct
- [ ] Alignment correct (left/center/right)
- [ ] Responsive on all screen sizes
- [ ] Mobile: buttons stack vertically
- [ ] Touch targets minimum 44x44px
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces correctly
- [ ] No more than 2 CTAs per page

---

## Related Components

- **Hero** - Page header CTA
- **NewsletterSignup** - Email subscription form
- **ContactForm** - Contact form
- **Button** - Action buttons
- **Container** - Content width constraint

---

## WordPress Block Theme Alignment

### Pattern Registration

```php
// WordPress: patterns/cta/cta-newsletter.php
<?php
/**
 * Title: Newsletter CTA
 * Slug: tour-operator/cta-newsletter
 * Categories: call-to-action
 */
?>

<!-- wp:group {"className":"cta-pattern","backgroundColor":"primary","textColor":"primary-foreground","layout":{"type":"constrained"}} -->
<div class="cta-pattern has-primary-background-color has-primary-foreground-color">
  
  <!-- wp:heading {"level":2,"textAlign":"center"} -->
  <h2 class="has-text-align-center">Subscribe to Our Newsletter</h2>
  <!-- /wp:heading -->
  
  <!-- wp:paragraph {"align":"center"} -->
  <p class="has-text-align-center">Get exclusive travel deals and inspiration</p>
  <!-- /wp:paragraph -->
  
  <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
  <div class="wp-block-buttons">
    <!-- wp:button {"backgroundColor":"background","textColor":"foreground"} -->
    <div class="wp-block-button">
      <a class="wp-block-button__link" href="/newsletter">Subscribe Now</a>
    </div>
    <!-- /wp:button -->
  </div>
  <!-- /wp:buttons -->
  
</div>
<!-- /wp:group -->
```

---

## Implementation Notes

**Component Location:**
- File: `/src/app/components/patterns/CTA.tsx`
- Pattern component (not a block)
- Conversion-focused

**Usage Frequency:**
- Maximum 2 per page
- Strategic placement
- Varied purposes

**Styling:**
- Uses design tokens from `/src/styles/theme.css`
- Variant-based theming
- No hardcoded colors

---

This pattern drives user action and conversion throughout the site when used strategically.
