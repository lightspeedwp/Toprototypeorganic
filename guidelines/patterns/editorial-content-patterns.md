# Editorial Content Pattern Guidelines

**Version:** V3 — WordPress-Native Alignment

This document defines **editorial content patterns** for long-form text in the LightSpeed Tour Operator plugin prototype.

---

## Purpose

Editorial content patterns provide **structured, readable long-form content** for tour descriptions, destination guides, blog posts, and informational pages.

---

## Core Principles

1. **Semantic HTML** - Use proper heading hierarchy
2. **Readability first** - Optimal line length and spacing
3. **Typography from theme** - All styling from CSS variables
4. **Responsive** - Adapts to screen size
5. **Accessible** - Proper contrast and structure

---

## Editorial Content Structure

```
Editorial Section
├── Container
│   ├── Content wrapper (max-width)
│   │   ├── Heading (H2)
│   │   ├── Paragraphs
│   │   ├── Lists
│   │   ├── Blockquotes
│   │   └── Images (optional)
```

---

## Standard Editorial Block

**Used on:** Tour details, destination guides, about pages

```typescript
<section className="py-12 md:py-16">
  <Container>
    <article className="max-w-3xl mx-auto">
      <h2 className="mb-6">About This Tour</h2>
      
      <div className="space-y-4">
        <p>
          Experience the breathtaking beauty of Iceland on this 8-day journey through 
          the land of fire and ice. From the vibrant capital of Reykjavik to the 
          stunning natural wonders of the Golden Circle, this tour offers an 
          unforgettable adventure.
        </p>

        <p>
          Witness the power of Gullfoss waterfall, walk between continents at 
          Þingvellir National Park, and relax in the geothermal waters of the Blue 
          Lagoon. Each day brings new discoveries and incredible landscapes.
        </p>

        <h3 className="mt-8 mb-4">What Makes This Tour Special</h3>

        <ul className="space-y-2 ml-6">
          <li>Small group sizes (maximum 16 people)</li>
          <li>Expert local guides with extensive knowledge</li>
          <li>Carefully selected accommodations</li>
          <li>Flexible itinerary with free time to explore</li>
        </ul>

        <p>
          Whether you're seeking adventure, natural beauty, or cultural immersion, 
          this tour delivers an authentic Icelandic experience you'll treasure forever.
        </p>
      </div>
    </article>
  </Container>
</section>
```

**Properties:**
- Max width: 768px (48rem) for readability
- Centered with `mx-auto`
- Space between paragraphs: 16px
- Automatic typography from theme.css

---

## Typography Hierarchy

### Headings

**DO NOT override font sizes** - use semantic HTML:

```typescript
<h2>Section Title</h2>           // 32px, Lora, 600
<h3>Subsection Title</h3>        // 20px, Lora, 600
<h4>Minor Heading</h4>           // 16px, Lora, 600
```

**Spacing:**
```typescript
<h2 className="mb-6">Title</h2>          // 24px below H2
<h3 className="mt-8 mb-4">Subtitle</h3>  // 32px above, 16px below H3
```

---

### Paragraphs

```typescript
<div className="space-y-4">
  <p>First paragraph with automatic 16px font, Noto Sans, normal weight.</p>
  <p>Second paragraph. Space between paragraphs is 16px.</p>
</div>
```

**Properties:**
- Font: Noto Sans (inherited)
- Size: 16px (inherited)
- Line height: 1.5 (inherited)
- Spacing: 16px between paragraphs

---

### Lists

**Unordered:**
```typescript
<ul className="space-y-2 ml-6">
  <li>List item one</li>
  <li>List item two</li>
  <li>List item three</li>
</ul>
```

**Ordered:**
```typescript
<ol className="space-y-2 ml-6">
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

**Properties:**
- Indent: 24px (`ml-6`)
- Spacing: 8px between items (`space-y-2`)
- Markers: Browser default bullets/numbers

---

### Blockquotes

```typescript
<blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
  "This was the trip of a lifetime. Every moment was perfectly planned and 
  the guides were exceptional." — Sarah M., London
</blockquote>
```

**Properties:**
- Left border: 4px, primary color
- Padding left: 16px
- Italic text
- Muted color
- Vertical margin: 24px

---

### Links

```typescript
<p>
  For more information, visit our <a href="/faq" className="text-primary underline hover:text-primary/80">FAQ page</a>.
</p>
```

**Properties:**
- Color: Primary
- Underline: Always visible
- Hover: Slightly darker
- Visited: No special styling

---

## Content Sections

### Introduction Section

```typescript
<section className="py-12 md:py-16 bg-muted/30">
  <Container>
    <article className="max-w-3xl mx-auto">
      <h2 className="mb-6">Tour Overview</h2>
      <div className="space-y-4 text-lg">
        <p>
          Large, readable introduction text that sets the context for the content below.
        </p>
      </div>
    </article>
  </Container>
</section>
```

**Use `text-lg` for introduction paragraphs** to increase visibility.

---

### Detail Section

```typescript
<section className="py-12 md:py-16">
  <Container>
    <article className="max-w-3xl mx-auto">
      <h2 className="mb-6">Day-by-Day Itinerary</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="mb-3">Day 1: Arrival in Reykjavik</h3>
          <div className="space-y-4">
            <p>
              Arrive at Keflavik International Airport and transfer to your hotel 
              in Reykjavik. Take the afternoon to explore the city at your own pace.
            </p>
            <ul className="space-y-2 ml-6">
              <li>Airport transfer included</li>
              <li>Free time to explore Reykjavik</li>
              <li>Welcome dinner with the group</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="mb-3">Day 2: Golden Circle Tour</h3>
          <div className="space-y-4">
            <p>
              Full-day tour of Iceland's famous Golden Circle, including Þingvellir 
              National Park, Geysir geothermal area, and Gullfoss waterfall.
            </p>
          </div>
        </div>
      </div>
    </article>
  </Container>
</section>
```

**Properties:**
- Sections separated by 32px (`space-y-8`)
- Each day is a subsection with H3
- Mix of paragraphs and lists

---

### Two-Column Layout (Desktop)

```typescript
<section className="py-12 md:py-16">
  <Container>
    <div className="max-w-5xl mx-auto">
      <h2 className="mb-8">What's Included</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-4">Included</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>All accommodations (7 nights)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Daily breakfast and 4 dinners</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>All transportation during tour</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4">Not Included</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <span>International flights</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <span>Travel insurance</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <span>Personal expenses</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Container>
</section>
```

**Properties:**
- 1 column mobile, 2 columns desktop
- Icons for visual clarity
- Balanced layout

---

## Images in Editorial Content

### Inline Image

```typescript
<div className="space-y-4">
  <p>First paragraph of text...</p>

  <figure className="my-8">
    <img
      src="/image.jpg"
      alt="Gullfoss waterfall in winter"
      className="w-full rounded-lg"
      loading="lazy"
      width={1200}
      height={800}
    />
    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
      The magnificent Gullfoss waterfall, one of Iceland's most iconic sights
    </figcaption>
  </figure>

  <p>Continuing text after image...</p>
</div>
```

**Properties:**
- Vertical margin: 32px (`my-8`)
- Full width within content area
- Rounded corners
- Optional caption

---

### Image Gallery

```typescript
<div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4">
  <img
    src="/gallery-1.jpg"
    alt="Gallery image 1"
    className="w-full aspect-square object-cover rounded-lg"
    loading="lazy"
  />
  <img
    src="/gallery-2.jpg"
    alt="Gallery image 2"
    className="w-full aspect-square object-cover rounded-lg"
    loading="lazy"
  />
  <img
    src="/gallery-3.jpg"
    alt="Gallery image 3"
    className="w-full aspect-square object-cover rounded-lg"
    loading="lazy"
  />
</div>
```

---

## Special Content Blocks

### Highlighted Note

```typescript
<div className="my-6 p-4 bg-primary/10 border-l-4 border-primary rounded-r-md">
  <p className="font-medium text-primary mb-2">Important Note</p>
  <p className="text-sm">
    This tour requires a moderate level of fitness. Please ensure you're 
    comfortable with 3-4 hours of walking per day.
  </p>
</div>
```

---

### Info Box

```typescript
<div className="my-6 p-6 bg-muted rounded-lg">
  <h4 className="mb-3">Travel Tips</h4>
  <ul className="space-y-2 text-sm">
    <li>• Pack layers - weather can change quickly</li>
    <li>• Bring waterproof jacket and hiking boots</li>
    <li>• Camera with extra batteries</li>
  </ul>
</div>
```

---

### Warning/Caution

```typescript
<div className="my-6 p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-md">
  <div className="flex gap-3">
    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
    <div>
      <p className="font-medium text-destructive mb-2">Weather Advisory</p>
      <p className="text-sm">
        Winter tours may be affected by weather conditions. Itinerary changes 
        may be necessary for safety.
      </p>
    </div>
  </div>
</div>
```

---

## Content Width Guidelines

### Narrow (Optimal Readability)

```typescript
<div className="max-w-2xl mx-auto">  {/* 672px */}
  {/* Long-form text content */}
</div>
```

**Use for:** Blog posts, tour descriptions, about content

---

### Medium

```typescript
<div className="max-w-3xl mx-auto">  {/* 768px */}
  {/* Mixed content with lists */}
</div>
```

**Use for:** Itineraries, features lists, FAQs

---

### Wide

```typescript
<div className="max-w-5xl mx-auto">  {/* 1024px */}
  {/* Multi-column layouts */}
</div>
```

**Use for:** Two-column sections, image galleries

---

## Spacing Rules

### Section Spacing

```typescript
<section className="py-12 md:py-16">  {/* Between sections */}
```

---

### Content Spacing

```typescript
<div className="space-y-4">   {/* Between paragraphs: 16px */}
<div className="space-y-6">   {/* Between subsections: 24px */}
<div className="space-y-8">   {/* Between major sections: 32px */}
```

---

### Heading Margins

```typescript
<h2 className="mb-6">          {/* 24px below H2 */}
<h3 className="mt-8 mb-4">     {/* 32px above, 16px below H3 */}
<h4 className="mt-6 mb-3">     {/* 24px above, 12px below H4 */}
```

---

## Accessibility Requirements

### Heading Hierarchy

```typescript
<article>
  <h1>Page Title</h1>              {/* Only in hero */}
  <section>
    <h2>Section Title</h2>         {/* Main sections */}
    <h3>Subsection Title</h3>      {/* Subsections */}
    <h4>Minor Heading</h4>         {/* If needed */}
  </section>
</article>
```

**Never skip heading levels** (e.g., H2 to H4).

---

### Link Purpose

Links must be clear out of context:

**✅ Good:**
```typescript
<a href="/tours">View all Iceland tours</a>
```

**❌ Bad:**
```typescript
<a href="/tours">Click here</a>
```

---

### Image Alt Text

```typescript
<img
  src="/waterfall.jpg"
  alt="Gullfoss waterfall cascading into canyon in winter"
  // Not: alt="waterfall" or alt="image"
/>
```

---

## Dark Mode Adaptation

All editorial content automatically adapts:

```typescript
text-foreground          // Body text
text-muted-foreground    // Less emphasis
bg-muted                 // Background highlights
border-border            // Borders
text-primary             // Links and accents
```

---

## Mobile Optimization

### Font Size Adjustments

```typescript
// Introduction text - reduce slightly on mobile
<p className="text-lg md:text-xl">
  Large intro paragraph
</p>
```

---

### Spacing Reduction

```typescript
// Reduce section padding on mobile
<section className="py-8 md:py-12">
```

---

### Single Column

```typescript
// Stack columns on mobile
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

---

## Complete Example

```typescript
<section className="py-12 md:py-16">
  <Container>
    <article className="max-w-3xl mx-auto">
      {/* Section Title */}
      <h2 className="mb-6">About Iceland</h2>

      {/* Introduction */}
      <div className="space-y-4 text-lg mb-8">
        <p>
          Iceland, the land of fire and ice, offers some of the world's most 
          dramatic and unique landscapes. From active volcanoes and massive 
          glaciers to thundering waterfalls and geothermal hot springs.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <h3 className="mt-8 mb-4">Natural Wonders</h3>
        
        <p>
          The island nation sits on the Mid-Atlantic Ridge, where the North 
          American and Eurasian tectonic plates meet. This unique geology 
          creates an ever-changing landscape of volcanic activity.
        </p>

        <figure className="my-8">
          <img
            src="/iceland-landscape.jpg"
            alt="Volcanic landscape with steam vents"
            className="w-full rounded-lg"
            loading="lazy"
            width={1200}
            height={800}
          />
          <figcaption className="mt-2 text-sm text-muted-foreground text-center">
            Geothermal activity shapes Iceland's dramatic landscape
          </figcaption>
        </figure>

        <h3 className="mt-8 mb-4">Best Time to Visit</h3>

        <p>
          Iceland offers unique experiences year-round, but the best time 
          depends on your interests:
        </p>

        <ul className="space-y-2 ml-6">
          <li>Summer (June-August): Midnight sun, warmest weather</li>
          <li>Winter (November-March): Northern Lights, ice caves</li>
          <li>Spring/Fall: Fewer crowds, shoulder season pricing</li>
        </ul>

        <div className="my-6 p-4 bg-primary/10 border-l-4 border-primary rounded-r-md">
          <p className="font-medium text-primary mb-2">Travel Tip</p>
          <p className="text-sm">
            Book accommodation early for summer visits - Iceland is increasingly 
            popular and hotels fill quickly.
          </p>
        </div>

        <p>
          Whether you visit in summer or winter, Iceland promises unforgettable 
          experiences and memories that will last a lifetime.
        </p>
      </div>
    </article>
  </Container>
</section>
```

---

## Related Documentation

- [patterns/hero-patterns.md](hero-patterns.md) - Hero patterns
- [patterns/meta-patterns.md](meta-patterns.md) - Meta/facts patterns
- [design-tokens/typography.md](../design-tokens/typography.md) - Typography
- [design-tokens/spacing.md](../design-tokens/spacing.md) - Spacing
- [mobile/typography.md](../mobile/typography.md) - Mobile typography
