# Call-to-Action (CTA) Pattern Guidelines

**Version:** V3 — WordPress-Native Alignment

This document defines **call-to-action (CTA) patterns** for the LightSpeed Tour Operator plugin prototype.

---

## Purpose

CTA patterns provide **clear next steps** for users, guiding them toward inquiry, booking, or further engagement.

---

## Core Principles

1. **Clear action** - Obvious what will happen
2. **Visual prominence** - Stands out from surrounding content
3. **Single focus** - One primary action per CTA block
4. **Accessible** - Keyboard navigable, high contrast
5. **Context-appropriate** - Matches user intent

---

## CTA Pattern Types

### 1. Primary CTA Block (Inquiry/Booking)
### 2. Secondary CTA (Learn More)
### 3. Newsletter Signup
### 4. Contact CTA
### 5. Inline CTA

---

## 1. Primary CTA Block (Inquiry/Booking)

**Used on:** Tour detail, destination detail, accommodation detail

```typescript
<section className="py-12 md:py-16 bg-primary text-primary-foreground">
  <Container>
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-[32px] md:text-[40px] font-semibold mb-4">
        Ready to Start Your Adventure?
      </h2>
      <p className="text-lg md:text-xl mb-8 opacity-90">
        Get in touch with our travel experts to plan your perfect Iceland experience
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/contact"
          className="px-8 py-4 bg-background text-foreground rounded-md font-medium hover:bg-background/90 transition-colors"
        >
          Request a Quote
        </a>
        <a
          href="tel:+1234567890"
          className="px-8 py-4 border-2 border-background text-background rounded-md font-medium hover:bg-background/10 transition-colors"
        >
          Call Us Now
        </a>
      </div>
    </div>
  </Container>
</section>
```

**Properties:**
- Full-width background (primary color)
- Centered content
- Max width for readability
- Primary + secondary action
- High contrast

---

## 2. Secondary CTA (Learn More)

**Used on:** Archive pages, blog posts

```typescript
<section className="py-12 md:py-16 bg-muted">
  <Container>
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-[28px] md:text-[32px] font-semibold mb-4">
        Discover More Destinations
      </h2>
      <p className="text-muted-foreground mb-6">
        Explore our full collection of African safari and adventure tours
      </p>
      <a
        href="/destinations"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <span>View All Destinations</span>
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  </Container>
</section>
```

**Properties:**
- Muted background
- Single primary button
- Arrow icon for direction
- Less prominent than primary CTA

---

## 3. Newsletter Signup CTA

**Used on:** Blog pages, footer areas

```typescript
<section className="py-12 md:py-16 bg-card border-y border-border">
  <Container>
    <div className="max-w-2xl mx-auto text-center">
      <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
      <h2 className="text-[28px] md:text-[32px] font-semibold mb-4">
        Get Travel Tips & Inspiration
      </h2>
      <p className="text-muted-foreground mb-6">
        Subscribe to our newsletter for exclusive offers and destination guides
      </p>
      
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          required
          className="flex-1 px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>

      <p className="text-xs text-muted-foreground mt-4">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  </Container>
</section>
```

**Properties:**
- Icon for visual interest
- Inline form
- Privacy statement
- Single input + button

---

## 4. Contact CTA

**Used on:** About page, FAQ page

```typescript
<section className="py-12 md:py-16 bg-background">
  <Container>
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-[28px] md:text-[32px] font-semibold mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our travel experts are here to help you plan the perfect trip. 
            Get in touch today.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+1234567890" className="hover:text-primary">
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:hello@example.com" className="hover:text-primary">
                hello@example.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span>Mon-Fri: 9am-6pm EST</span>
            </li>
          </ul>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Send Us a Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full px-3 py-2 border border-border rounded-md"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              className="w-full px-3 py-2 border border-border rounded-md"
            />
            <textarea
              placeholder="Your message"
              rows={4}
              required
              className="w-full px-3 py-2 border border-border rounded-md resize-none"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </Container>
</section>
```

**Properties:**
- Two-column layout
- Contact info + form
- Icons for visual hierarchy
- Full-width form fields

---

## 5. Inline CTA

**Used within:** Editorial content, blog posts

```typescript
<div className="my-8 p-6 bg-primary/10 border-2 border-primary rounded-lg">
  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
    <div className="flex-1">
      <h3 className="font-semibold text-primary mb-2">
        Interested in This Tour?
      </h3>
      <p className="text-sm">
        Contact us for availability, pricing, and custom itinerary options
      </p>
    </div>
    <a
      href="/contact"
      className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
    >
      Get in Touch
    </a>
  </div>
</div>
```

**Properties:**
- Highlighted background
- Inline with content
- Horizontal layout (desktop)
- Less prominent than full-width CTAs

---

## Button Styles

### Primary Button

```typescript
<button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
  Primary Action
</button>
```

---

### Secondary Button (Outline)

```typescript
<button className="px-6 py-3 border-2 border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-colors">
  Secondary Action
</button>
```

---

### Ghost Button

```typescript
<button className="px-6 py-3 text-primary rounded-md font-medium hover:bg-primary/10 transition-colors">
  Tertiary Action
</button>
```

---

### Button with Icon

```typescript
<button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
  <span>View Details</span>
  <ArrowRight className="w-5 h-5" />
</button>
```

---

## CTA Positioning

### Bottom of Page

**Best practice:** Place primary CTA at the end of detail pages

```typescript
{/* Content sections */}
<Hero />
<EditorialContent />
<MetaBlock />
<RelatedContent />

{/* CTA at bottom */}
<PrimaryCTA />
```

---

### Between Sections

Use secondary CTAs to break up long content:

```typescript
<EditorialSection />
<InlineCTA />
<EditorialSection />
```

---

### Archive Pages

Place after card grid:

```typescript
<Hero />
<FilterBar />
<CardGrid />
<SecondaryCTA />  {/* Encourage exploration */}
```

---

## Spacing Rules

### Section Padding

```typescript
<section className="py-12 md:py-16">
  {/* CTA content */}
</section>
```

---

### Internal Spacing

```typescript
<div className="max-w-3xl mx-auto text-center">
  <h2 className="mb-4">Title</h2>         {/* 16px below */}
  <p className="mb-8">Description</p>      {/* 32px below */}
  <button>Action</button>
</div>
```

---

### Button Group Spacing

```typescript
<div className="flex gap-4">
  <button>Primary</button>
  <button>Secondary</button>
</div>
```

---

## Accessibility Requirements

### Focus States

```typescript
<button className="focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md">
  Action
</button>
```

---

### Descriptive Text

**✅ Good:**
```typescript
<button>Request a Quote for Iceland Explorer Tour</button>
```

**❌ Bad:**
```typescript
<button>Click Here</button>
```

---

### Form Labels

```typescript
<label htmlFor="email" className="sr-only">
  Email Address
</label>
<input
  id="email"
  type="email"
  placeholder="Your email"
  aria-label="Email address for newsletter"
/>
```

---

## Responsive Behavior

### Mobile: Stack Buttons

```typescript
<div className="flex flex-col sm:flex-row gap-4">
  <button className="w-full sm:w-auto">Primary</button>
  <button className="w-full sm:w-auto">Secondary</button>
</div>
```

---

### Mobile: Full-Width Forms

```typescript
<form className="flex flex-col sm:flex-row gap-3">
  <input className="flex-1" />
  <button className="whitespace-nowrap">Submit</button>
</form>
```

---

## Dark Mode Adaptation

CTAs automatically adapt to dark mode:

```typescript
bg-primary               // Same in both modes
text-primary-foreground  // Same in both modes
bg-muted                 // Adapts automatically
border-border            // Adapts automatically
```

---

## Performance Considerations

### Avoid Auto-Playing Videos

If using video backgrounds, make them optional:

```typescript
<button onClick={() => setShowVideo(true)}>
  Watch Video
</button>
```

---

### Lazy Load Background Images

```typescript
<section
  className="py-20"
  style={{
    backgroundImage: isVisible ? 'url(/bg.jpg)' : 'none',
    backgroundSize: 'cover'
  }}
>
  {/* CTA content */}
</section>
```

---

## A/B Testing Considerations

### Primary vs Secondary Action

Test button positioning and hierarchy:

```typescript
// Version A: Primary first
<div className="flex gap-4">
  <button className="bg-primary">Request Quote</button>
  <button className="border">Call Us</button>
</div>

// Version B: Reverse order
<div className="flex gap-4">
  <button className="bg-primary">Call Us</button>
  <button className="border">Request Quote</button>
</div>
```

---

### Single vs Multiple CTAs

Test effectiveness of focused vs option-heavy CTAs.

---

## Complete Examples

### Tour Detail Page CTA

```typescript
<section className="py-16 md:py-20 bg-primary text-primary-foreground">
  <Container>
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-[32px] md:text-[40px] font-semibold mb-4">
        Experience Iceland Like Never Before
      </h2>
      <p className="text-lg md:text-xl mb-8 opacity-90">
        Join us on this unforgettable 8-day journey through the land of fire and ice. 
        Limited availability for 2024 departures.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <a
          href="/contact?tour=iceland-explorer"
          className="px-8 py-4 bg-background text-foreground rounded-md font-medium hover:bg-background/90 transition-colors"
        >
          Request Detailed Itinerary
        </a>
        <a
          href="tel:+1234567890"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-background text-background rounded-md font-medium hover:bg-background/10 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>Speak to an Expert</span>
        </a>
      </div>
      <p className="text-sm opacity-75">
        Our travel consultants are available Mon-Fri, 9am-6pm EST
      </p>
    </div>
  </Container>
</section>
```

---

### Blog Archive CTA

```typescript
<section className="py-12 md:py-16 bg-muted">
  <Container>
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-[28px] md:text-[32px] font-semibold mb-4">
        Start Planning Your Next Adventure
      </h2>
      <p className="text-muted-foreground mb-6">
        Browse our collection of expertly crafted tours across Africa
      </p>
      <a
        href="/tours"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <span>Explore All Tours</span>
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  </Container>
</section>
```

---

### FAQ Page CTA

```typescript
<section className="py-12 md:py-16 bg-background">
  <Container>
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-[28px] md:text-[32px] font-semibold mb-4">
        Still Have Questions?
      </h2>
      <p className="text-muted-foreground mb-8">
        Our friendly team is here to help with any questions about our tours, 
        bookings, or travel requirements.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
        <a
          href="/contact"
          className="flex flex-col items-center gap-3 p-6 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <Mail className="w-8 h-8 text-primary" />
          <span className="font-medium">Send a Message</span>
          <span className="text-sm text-muted-foreground">
            We'll reply within 24 hours
          </span>
        </a>
        <a
          href="tel:+1234567890"
          className="flex flex-col items-center gap-3 p-6 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <Phone className="w-8 h-8 text-primary" />
          <span className="font-medium">Call Us Now</span>
          <span className="text-sm text-muted-foreground">
            Mon-Fri: 9am-6pm EST
          </span>
        </a>
      </div>
    </div>
  </Container>
</section>
```

---

## Related Documentation

- [patterns/hero-patterns.md](hero-patterns.md) - Hero patterns
- [patterns/card-grid-patterns.md](card-grid-patterns.md) - Card grids
- [mobile/forms.md](../mobile/forms.md) - Mobile form patterns
- [mobile/touch-targets.md](../mobile/touch-targets.md) - Touch target sizing
- [design-tokens/colors.md](../design-tokens/colors.md) - Color system
