# Call-to-Action (CTA) Pattern Guidelines

**Version:** V4 — React Router Integration + Dark Mode  
**Last Updated:** December 25, 2024  
**Component:** `/src/app/components/patterns/CTA.tsx`  
**WordPress Mapping:** Block pattern for call-to-action sections

---

## Overview

The CTA (Call-to-Action) pattern component provides prominent, accessible action sections that guide users toward inquiry, booking, or further engagement. It supports both single and dual-action layouts with automatic React Router integration for internal links.

---

## Component Interface

```typescript
interface CTAProps {
  title: string;                  // Main heading text
  description?: string;           // Optional supporting text
  primaryAction: {
    label: string;                // Button text
    href: string;                 // Link destination
  };
  secondaryAction?: {
    label: string;                // Button text (optional)
    href: string;                 // Link destination
  };
  className?: string;             // Optional custom classes
}
```

---

## Core Principles

1. **Clear action** - Obvious what will happen when clicked
2. **Visual prominence** - Stands out from surrounding content
3. **Single focus** - One primary action per CTA block
4. **Accessible** - Keyboard navigable, high contrast, focus states
5. **Context-appropriate** - Matches user intent at that point in journey
6. **Smart routing** - Automatic React Router integration for internal links

---

## Usage

### Single Action CTA

```typescript
import { CTA } from "../components/patterns/CTA";

<CTA
  title="Ready to Start Your Adventure?"
  description="Contact our safari specialists to plan your perfect African journey"
  primaryAction={{ label: "Contact Us", href: "/contact" }}
/>
```

### Dual Action CTA

```typescript
<CTA
  title="Ready to Plan Your Safari?"
  description="Contact our experienced team to start designing your perfect African adventure"
  primaryAction={{ label: "Get in Touch", href: "/contact" }}
  secondaryAction={{ label: "View Tours", href: "/tours" }}
/>
```

### External/Special Links

```typescript
// Phone link
<CTA
  title="Prefer to Speak Directly?"
  description="Call us now and speak with one of our safari specialists"
  primaryAction={{ label: "Call +27 21 123 4567", href: "tel:+27211234567" }}
  secondaryAction={{ label: "Email Us", href: "mailto:info@touroperator.com" }}
/>
```

---

## React Router Integration

### Automatic Link Detection

The CTA component automatically determines whether to use React Router `<Link>` or standard `<a>` tags:

```typescript
const isInternalRoute = (href: string) => href.startsWith('/') && !href.startsWith('//');
```

**Internal Routes (use React Router):**
- `/tours` → `<Link to="/tours">`
- `/contact` → `<Link to="/contact">`
- `/about` → `<Link to="/about">`

**External/Special Links (use anchor tags):**
- `#section` → `<a href="#section">`
- `tel:+1234567890` → `<a href="tel:...">`
- `mailto:email@example.com` → `<a href="mailto:...">`
- `https://external.com` → `<a href="https://...">`

### Why This Matters

**React Router Benefits:**
- ✅ Instant client-side navigation (no page reload)
- ✅ Maintains application state
- ✅ Smooth transitions
- ✅ Better performance
- ✅ Better UX

**Anchor Tag Use Cases:**
- ✅ Phone numbers (mobile click-to-call)
- ✅ Email addresses (opens email client)
- ✅ External websites
- ✅ Same-page hash links
- ✅ File downloads

---

## WordPress Alignment

### Block Pattern Equivalent

This component maps to a WordPress block pattern composed of:
- Group block (section wrapper with background color)
- Heading block (title)
- Paragraph block (description)
- Buttons block (primary and secondary actions)

### Template Hierarchy

Can be used in any template at the end of content:
- Single post type pages (Tour, Destination, Accommodation)
- Archive pages (Tours, Destinations, Blog)
- Taxonomy pages (Travel Styles)
- Utility pages (About, Contact, FAQ, Team)

---

## Design System Compliance

### Colors

**Light Mode:**
- Section background: `bg-primary/5` (green with 5% opacity)
- Primary button background: `bg-primary` (rgba(74, 115, 17, 1))
- Primary button text: `text-primary-foreground` (white)
- Secondary button background: `bg-background` (white)
- Secondary button border: `border-border` (gray)
- Title: `text-foreground` (black)
- Description: `text-muted-foreground` (gray)

**Dark Mode:**
- Section background: `dark:bg-primary/10` (green with 10% opacity)
- Primary button background: `bg-primary` (same green, good contrast)
- Primary button text: `text-primary-foreground` (white)
- Secondary button background: `bg-background` (dark gray)
- Secondary button border: `border-border` (lighter gray)
- Title: `text-foreground` (white)
- Description: `text-muted-foreground` (light gray)

### Typography

**Title:**
- Uses semantic `<h2>` tag
- Font family: `var(--font-family-lora)` (Lora, serif)
- Font size: `var(--text-2xl)` (36px)
- Font weight: `var(--font-weight-semibold)` (600)
- Color: `text-foreground`

**Description:**
- Font family: `var(--font-family-noto-sans)` (Noto Sans, sans-serif)
- Font size: `var(--text-lg)` (20px)
- Line height: 1.75
- Color: `text-muted-foreground`

**Button Text:**
- Font family: `var(--font-family-noto-sans)`
- Font size: `var(--text-base)` (16px)
- Font weight: `var(--font-weight-medium)` (500)

### Spacing

```css
Section: py-16            /* 64px vertical padding */
Container: max-w-3xl      /* 768px max width */
Container: mx-auto        /* Centered */
Container: text-center    /* Centered text */

Title: mb-4               /* 16px bottom margin */
Description: mb-8         /* 32px bottom margin */

Button container: gap-4   /* 16px gap between buttons */
Buttons: h-12             /* 48px height */
Buttons: px-8             /* 32px horizontal padding */
```

### Layout

**Mobile (< 640px):**
- Buttons stack vertically (`flex-col`)
- Full width buttons
- 16px gap between

**Desktop (≥ 640px):**
- Buttons side by side (`sm:flex-row`)
- Buttons maintain natural width
- Centered horizontally
- 16px gap between

---

## Accessibility

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- ✅ All buttons keyboard accessible
- ✅ Tab to navigate
- ✅ Enter/Space to activate
- ✅ Proper focus order

**Focus States:**
- ✅ Visible focus ring: `focus-visible:ring-2`
- ✅ Ring color: `ring-ring`
- ✅ Outline hidden: `focus-visible:outline-none`
- ✅ Meets 3:1 contrast ratio

**Touch Targets:**
- ✅ Minimum height: 48px (h-12)
- ✅ Comfortable padding: 32px horizontal
- ✅ Proper spacing: 16px between buttons
- ✅ Easy to tap on mobile

**Color Contrast:**

**Light Mode:**
- Primary button text on background: 5.2:1 ✅ (AA)
- Secondary button text on background: 12.7:1 ✅ (AAA)
- Title on background: 12.7:1 ✅ (AAA)
- Description: 4.8:1 ✅ (AA)

**Dark Mode:**
- Primary button text on background: 5.2:1 ✅ (AA)
- Secondary button text on background: 11.4:1 ✅ (AAA)
- Title on background: 11.4:1 ✅ (AAA)
- Description: 4.6:1 ✅ (AA)

---

## Common Use Cases

### 1. Tour Archive End CTA

**File:** `/src/app/pages/ToursArchive.tsx`

```typescript
<CTA
  title="Ready to Start Your Adventure?"
  description="Contact our safari specialists to plan your perfect African journey"
  primaryAction={{ label: "Contact Us", href: "/contact" }}
/>
```

**Context:** End of tour listing, encourages contact.

---

### 2. Tour Single Detail CTA

**File:** `/src/app/pages/TourSingle.tsx`

```typescript
<CTA
  title="Ready to Book This Tour?"
  description="Contact us to check availability and customize this itinerary to your preferences"
  primaryAction={{ label: "Enquire About This Tour", href: "/contact" }}
/>
```

**Context:** End of tour details, specific to that tour.

---

### 3. About Page Dual Action

**File:** `/src/app/pages/AboutPage.tsx`

```typescript
<CTA
  title="Ready to Plan Your Safari?"
  description="Contact our experienced team to start designing your perfect African adventure"
  primaryAction={{ label: "Get in Touch", href: "/contact" }}
  secondaryAction={{ label: "View Tours", href: "/tours" }}
/>
```

**Context:** End of about page, offers two clear paths forward.

---

### 4. Contact Page Phone/Email

**File:** `/src/app/pages/ContactPage.tsx`

```typescript
<CTA
  title="Prefer to Speak Directly?"
  description="Call us now and speak with one of our safari specialists"
  primaryAction={{ label: "Call +27 21 123 4567", href: "tel:+27211234567" }}
  secondaryAction={{ label: "Email Us", href: "mailto:info@touroperator.com" }}
/>
```

**Context:** End of contact page, provides direct communication options.

---

### 5. FAQ Page Support

**File:** `/src/app/pages/FAQPage.tsx`

```typescript
<CTA
  title="Still Have Questions?"
  description="Our team is here to help. Get in touch and we'll provide personalized answers for your safari plans."
  primaryAction={{ label: "Contact Us", href: "/contact" }}
/>
```

**Context:** After FAQ content, offers human support.

---

### 6. Destination Single CTA

**File:** `/src/app/pages/DestinationSingle.tsx`

```typescript
<CTA
  title="Plan Your Visit"
  description={`Let our destination specialists help you create the perfect ${destination.title} experience`}
  primaryAction={{ label: "Contact Our Team", href: "/contact" }}
/>
```

**Context:** End of destination details, personalized with destination name.

---

### 7. Taxonomy Archive CTA

**File:** `/src/app/pages/TaxonomyArchive.tsx`

```typescript
<CTA
  title={`Create Your ${travelStyle.name} Adventure`}
  description="Our specialists can customize any tour to match your preferences and travel style"
  primaryAction={{ label: "Speak to a Specialist", href: "/contact" }}
/>
```

**Context:** End of travel style tours, personalized with travel style.

---

### 8. Team Archive Dual Action

**File:** `/src/app/pages/TeamArchive.tsx`

```typescript
<CTA
  title="Start Planning Your Safari"
  description="Connect with one of our specialists to discuss your African adventure"
  primaryAction={{ label: "Contact Us", href: "/contact" }}
  secondaryAction={{ label: "View Tours", href: "/tours" }}
/>
```

**Context:** After team introductions, offers contact or browse options.

---

## Dark Mode Implementation

### Section Background Strategy

```typescript
className="py-16 bg-primary/5 dark:bg-primary/10"
```

**Rationale:**
- Light mode: 5% opacity provides subtle tint without overwhelming
- Dark mode: 10% opacity ensures section is visible against dark background
- Primary color maintains brand consistency
- Subtle enough not to compete with buttons

### Primary Button Strategy

```typescript
className="bg-primary text-primary-foreground hover:bg-primary/90"
```

**Rationale:**
- Primary green (#4A7311) works well in both modes
- White text has sufficient contrast (5.2:1)
- Hover state (90% opacity) provides clear feedback
- No dark mode variant needed - color works in both

### Secondary Button Strategy

```typescript
className="border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
```

**Rationale:**
- `bg-background`: Adapts to theme (white in light, dark gray in dark)
- `text-foreground`: Adapts to theme (black in light, white in dark)
- `border-border`: Uses theme border color
- Hover state uses accent colors for visual feedback

---

## Button Style Differentiation

### Primary Action
- **Background:** Solid primary color
- **Text:** White (high contrast)
- **Border:** None
- **Visual Weight:** Heavy/prominent
- **Purpose:** Main desired action

### Secondary Action
- **Background:** Matches page background
- **Text:** Matches page foreground
- **Border:** Visible border
- **Visual Weight:** Lighter/supporting
- **Purpose:** Alternative action

This clear visual hierarchy guides users to the primary action while providing alternatives.

---

## Responsive Behavior

### Mobile (< 640px)
```css
flex-col          /* Stack buttons vertically */
gap-4             /* 16px between buttons */
full-width        /* Buttons span full width */
```

### Desktop (≥ 640px)
```css
sm:flex-row       /* Buttons side by side */
gap-4             /* 16px between buttons */
justify-center    /* Center horizontally */
```

### Reasoning

**Mobile:** Stacked buttons are easier to tap and provide better thumb reach.

**Desktop:** Side-by-side layout is more compact and fits better on wide screens.

---

## Content Guidelines

### Title Best Practices

**DO ✅**
- Keep under 60 characters
- Use action-oriented language
- Create urgency or excitement
- Be specific when possible

**Examples:**
- ✅ "Ready to Book This Tour?"
- ✅ "Start Planning Your Safari"
- ✅ "Create Your Adventure Experience"

**DON'T ❌**
- Use generic phrases
- Make it too long
- Be vague about outcome

**Examples:**
- ❌ "Click Here"
- ❌ "Interested in Learning More About Our Services?"
- ❌ "More Information"

---

### Description Best Practices

**DO ✅**
- Keep under 150 characters
- Explain the benefit
- Address user need
- Provide reassurance

**Examples:**
- ✅ "Contact our safari specialists to plan your perfect African journey"
- ✅ "Our team is here to help. Get in touch for personalized answers."

**DON'T ❌**
- Be overly salesy
- Create unnecessary urgency
- Make unrealistic promises

**Examples:**
- ❌ "Limited Time Offer! Book Now!"
- ❌ "The Best Safari Company in the World!"

---

### Button Label Best Practices

**DO ✅**
- Use action verbs
- Be specific
- Keep under 25 characters
- Match user intent

**Examples:**
- ✅ "Contact Us"
- ✅ "View Tours"
- ✅ "Enquire About This Tour"
- ✅ "Speak to a Specialist"

**DON'T ❌**
- Use generic "Click here"
- Be ambiguous
- Use ALL CAPS
- Be overly promotional

**Examples:**
- ❌ "Click Here"
- ❌ "Submit"
- ❌ "BOOK NOW!!!"
- ❌ "Get Your FREE Quote!!!"

---

## Common Issues and Solutions

### Issue 1: Button Not Using React Router

**Problem:**
```typescript
// All links use anchor tags
<a href="/contact">
```

**Solution:**
```typescript
// Component automatically handles this
// Just use correct href format
primaryAction={{ label: "Contact", href: "/contact" }}  // Uses <Link>
primaryAction={{ label: "Call", href: "tel:+123" }}    // Uses <a>
```

---

### Issue 2: Poor Dark Mode Contrast

**Problem:**
```typescript
// Missing dark mode variant
className="bg-primary/5"
```

**Solution:**
```typescript
className="bg-primary/5 dark:bg-primary/10"
```

---

### Issue 3: Secondary Button Not Defined

**Problem:**
```typescript
// Interface doesn't support secondaryAction
<CTA secondaryAction={...} />  // Error!
```

**Solution:**
```typescript
// Updated interface supports optional secondary action
<CTA
  primaryAction={...}
  secondaryAction={...}  // Optional, works now
/>
```

---

### Issue 4: Buttons Not Responsive

**Problem:**
```typescript
// Missing responsive classes
className="flex gap-4"
```

**Solution:**
```typescript
className="flex flex-col sm:flex-row gap-4"
```

---

### Issue 5: Missing Focus States

**Problem:**
```typescript
// No focus indicators
className="bg-primary text-white"
```

**Solution:**
```typescript
className="bg-primary text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
```

---

## Pattern Variations

### 1. Full-Width Primary Color Background

**When to Use:** High-emphasis CTAs on important pages

```typescript
<section className="py-16 bg-primary text-primary-foreground">
  <Container>
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="mb-4">Ready to Start Your Adventure?</h2>
      <p className="mb-8 opacity-90">Contact our specialists today</p>
      <button className="bg-background text-foreground">Contact Us</button>
    </div>
  </Container>
</section>
```

**Notes:**
- Higher visual impact
- Better for conversion-critical pages
- Ensure sufficient contrast for text

---

### 2. Subtle Background (Current Default)

**When to Use:** Most pages, balanced emphasis

```typescript
<CTA
  title="..."
  description="..."
  primaryAction={...}
/>
```

**Notes:**
- Uses `bg-primary/5` for subtle tint
- Less aggressive visually
- Better for content-heavy pages

---

### 3. No Background (Inline CTA)

**When to Use:** Mid-content CTAs, sidebars

```typescript
<div className="py-8 text-center">
  <p className="mb-4 text-muted-foreground">Interested in this tour?</p>
  <button className="bg-primary text-primary-foreground">
    Enquire Now
  </button>
</div>
```

**Notes:**
- Less prominent
- Better for secondary CTAs
- Works within content flow

---

## Testing Guidelines

### Manual Testing Checklist

**Visual:**
- [ ] Title visible in both modes
- [ ] Description readable in both modes
- [ ] Primary button stands out
- [ ] Secondary button visible but secondary
- [ ] Hover states work
- [ ] Focus states visible

**Functional:**
- [ ] Primary button navigates correctly
- [ ] Secondary button navigates correctly (if present)
- [ ] Internal links use React Router (no page reload)
- [ ] External/special links use anchor tags
- [ ] Tel links work on mobile
- [ ] Mailto links open email client

**Responsive:**
- [ ] Buttons stack on mobile
- [ ] Buttons side-by-side on desktop
- [ ] Touch targets adequate (44px+)
- [ ] Text readable at all sizes

**Accessibility:**
- [ ] Keyboard tab to buttons
- [ ] Enter/Space activates
- [ ] Focus indicators visible
- [ ] Screen reader announces correctly
- [ ] Color contrast meets AA

---

## Related Components

- **Hero Pattern:** `/src/app/components/patterns/Hero.tsx` (can include CTAs)
- **Container Component:** `/src/app/components/common/Container.tsx`
- **Button UI Component:** `/src/app/components/ui/button.tsx`

---

## Related Guidelines

- **[Section Styles](/guidelines/patterns/section-styles.md)** - Section background patterns
- **[Navigation Links](/guidelines/patterns/navigation-links.md)** - Link vs button usage
- **[Design System Guide](/guidelines/DESIGN-SYSTEM-GUIDE.md)** - Dark mode implementation

---

## Version History

**v4.0.0** (December 25, 2024)
- Added React Router integration
- Added secondary action support
- Enhanced dark mode support
- Added accessibility guidelines
- Comprehensive examples

**v3.0.0** (Previous)
- WordPress-aligned patterns
- Basic CTA types
- Initial documentation

---

**Component Status:** ✅ Production Ready  
**Dark Mode Support:** ✅ Full Support  
**Accessibility:** ✅ WCAG 2.1 AA Compliant  
**WordPress Aligned:** ✅ Yes  
**React Router:** ✅ Integrated
