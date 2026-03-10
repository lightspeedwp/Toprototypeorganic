# Hero Pattern Guidelines

**Version:** V3 — WordPress-Native Alignment

This document defines **hero pattern variations** for the LightSpeed Tour Operator plugin prototype.

---

## Purpose

Hero patterns provide **content-led introductions** to pages. They are **not decorative** — they communicate primary page content and provide clear next actions.

---

## Core Principles

1. **Content-first** - Hero communicates page purpose immediately
2. **Clear hierarchy** - H1 title, supporting text, primary CTA
3. **Consistent structure** - Same pattern across content types
4. **Accessible** - Single H1, logical tab order
5. **Responsive** - Adapts from mobile to desktop

---

## Hero Pattern Structure

```
Hero
├── Background (optional image/color)
├── Container
│   ├── Heading (H1)
│   ├── Description (paragraph)
│   ├── Meta (optional - location, date, etc.)
│   └── CTA (optional - primary action)
```

---

## Standard Hero (Content Hub)

**Used on:** Tours Archive, Destinations Archive, Accommodation Archive

```typescript
<section className="relative py-12 md:py-20 bg-muted">
  <Container>
    <div className="max-w-3xl">
      <h1 className="text-[36px] md:text-[60px] font-semibold mb-4">
        Explore Our Tours
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-6">
        Discover unforgettable journeys across Africa's most spectacular destinations
      </p>
    </div>
  </Container>
</section>
```

**Properties:**
- Background: Muted color (no image for archives)
- H1: 36px mobile, 60px desktop
- Description: 18px mobile, 20px desktop
- No CTA on archive heroes

---

## Detail Hero (Single Content)

**Used on:** Tour Single, Destination Single, Accommodation Single

```typescript
<section className="relative py-12 md:py-20 bg-muted">
  <Container>
    <div className="max-w-3xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <a href="/tours">Tours</a>
        <ChevronRight className="w-4 h-4" />
        <span>Iceland Explorer</span>
      </nav>

      {/* Title */}
      <h1 className="text-[36px] md:text-[60px] font-semibold mb-4">
        Iceland Explorer
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-muted-foreground mb-6">
        8-day journey through the land of fire and ice
      </p>

      {/* Quick Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>8 days / 7 nights</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>Iceland</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>12-16 people</span>
        </div>
      </div>
    </div>
  </Container>
</section>
```

**Properties:**
- Includes breadcrumbs
- Includes quick meta facts
- No primary CTA (CTA block appears later)

---

## Minimal Hero (Utility Pages)

**Used on:** About, Contact, FAQ

```typescript
<section className="py-12 md:py-20 bg-background">
  <Container>
    <div className="max-w-3xl">
      <h1 className="text-[36px] md:text-[60px] font-semibold mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground">
        Find answers to common questions about our tours and services
      </p>
    </div>
  </Container>
</section>
```

**Properties:**
- No background color
- No meta
- No CTA
- Title + description only

---

## Taxonomy Hero (Archive Header)

**Used on:** Travel Style Archive, Category Archive, Accommodation Type

```typescript
<section className="py-12 md:py-20 bg-muted">
  <Container>
    <div className="max-w-3xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <a href="/tours">Tours</a>
        <ChevronRight className="w-4 h-4" />
        <a href="/travel-styles">Travel Styles</a>
        <ChevronRight className="w-4 h-4" />
        <span>Adventure</span>
      </nav>

      {/* Title */}
      <h1 className="text-[36px] md:text-[60px] font-semibold mb-4">
        Adventure Tours
      </h1>

      {/* Description (taxonomy description) */}
      <p className="text-lg md:text-xl text-muted-foreground mb-6">
        For thrill-seekers and outdoor enthusiasts seeking active experiences
      </p>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        24 tours available
      </p>
    </div>
  </Container>
</section>
```

**Properties:**
- Includes breadcrumbs
- Includes taxonomy description
- Includes item count
- No CTA

---

## Component Requirements

### Breadcrumbs

```typescript
<nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
  <a href="/" className="hover:text-foreground">Home</a>
  <ChevronRight className="w-4 h-4" aria-hidden="true" />
  <a href="/tours" className="hover:text-foreground">Tours</a>
  <ChevronRight className="w-4 h-4" aria-hidden="true" />
  <span className="text-foreground" aria-current="page">Iceland Explorer</span>
</nav>
```

**Rules:**
- Use semantic `<nav>` element
- Include `aria-label="Breadcrumb"`
- Last item uses `aria-current="page"`
- Icons are `aria-hidden="true"`

---

### Quick Meta

```typescript
<div className="flex flex-wrap items-center gap-4 text-sm">
  <div className="flex items-center gap-2">
    <Calendar className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
    <span>8 days / 7 nights</span>
  </div>
  <div className="flex items-center gap-2">
    <MapPin className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
    <span>Iceland</span>
  </div>
</div>
```

**Rules:**
- Icons are decorative: `aria-hidden="true"`
- Text provides context
- Wraps on mobile
- Max 3-4 items

---

## Typography Rules

### H1 Sizing

```typescript
// Mobile: 36px
// Desktop: 60px
className="text-[36px] md:text-[60px] font-semibold"
```

**Font:** Lora (serif)
**Weight:** 600 (semibold)
**Line height:** Inherited from theme.css

---

### Description Sizing

```typescript
// Mobile: 18px
// Desktop: 20px
className="text-lg md:text-xl text-muted-foreground"
```

**Font:** Noto Sans (sans-serif)
**Weight:** 400 (normal)
**Color:** Muted foreground

---

## Spacing Rules

```typescript
<section className="py-12 md:py-20"> {/* Vertical padding */}
  <Container>
    <div className="max-w-3xl"> {/* Max width for readability */}
      <h1 className="mb-4">Title</h1> {/* 16px below title */}
      <p className="mb-6">Description</p> {/* 24px below description */}
    </div>
  </Container>
</section>
```

**Spacing scale:**
- Section padding: 48px mobile, 80px desktop
- Title margin: 16px bottom
- Description margin: 24px bottom
- Meta spacing: 16px gap between items

---

## Background Rules

### Muted Background

```typescript
<section className="bg-muted">
  {/* Content */}
</section>
```

**When to use:**
- Archive pages
- Taxonomy pages
- Detail pages
- Differentiate from page content

---

### Default Background

```typescript
<section className="bg-background">
  {/* Content */}
</section>
```

**When to use:**
- Utility pages (FAQ, About, Contact)
- Simple content pages
- When hero should blend with page

---

## Accessibility Checklist

- [ ] One H1 per hero
- [ ] H1 is first heading on page
- [ ] Breadcrumbs use semantic nav element
- [ ] Breadcrumbs have aria-label
- [ ] Current page has aria-current="page"
- [ ] Decorative icons have aria-hidden="true"
- [ ] Text has adequate contrast (4.5:1 minimum)
- [ ] All interactive elements keyboard accessible

---

## Dark Mode Behavior

All hero patterns automatically adapt to dark mode:

```typescript
// Automatically adjusts:
bg-muted           // Light: light gray / Dark: dark gray
text-foreground    // Light: near black / Dark: off white
text-muted-foreground  // Light: medium gray / Dark: light gray
```

**No manual dark mode classes needed** - all handled by CSS variables.

---

## Mobile Optimization

### Font Sizes

```typescript
// H1: Reduce from 60px to 36px
text-[36px] md:text-[60px]

// Description: Reduce from 20px to 18px
text-lg md:text-xl
```

---

### Spacing

```typescript
// Reduce vertical padding from 80px to 48px
py-12 md:py-20
```

---

### Meta Items

```typescript
// Stack on very small screens, wrap on larger
flex flex-wrap items-center gap-4
```

---

## Examples from Demo Site

### Tours Archive Hero

```typescript
<section className="py-12 md:py-20 bg-muted">
  <Container>
    <div className="max-w-3xl">
      <h1 className="text-[36px] md:text-[60px] font-semibold mb-4">
        Our Tours
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground">
        Explore our collection of expertly crafted African adventures
      </p>
    </div>
  </Container>
</section>
```

---

### Tour Detail Hero

```typescript
<section className="py-12 md:py-20 bg-muted">
  <Container>
    <div className="max-w-3xl">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
        <a href="/tours">Tours</a>
        <ChevronRight className="w-4 h-4" />
        <span aria-current="page">Tanzania's Top Sights</span>
      </nav>

      <h1 className="text-[36px] md:text-[60px] font-semibold mb-4">
        Tanzania's Top Sights
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground mb-6">
        5-day safari exploring the Serengeti and Ngorongoro Crater
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>5 days / 4 nights</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>Tanzania</span>
        </div>
      </div>
    </div>
  </Container>
</section>
```

---

### FAQ Hero

```typescript
<section className="py-12 md:py-20 bg-background">
  <Container>
    <div className="max-w-3xl">
      <h1 className="text-[36px] md:text-[60px] font-semibold mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground">
        Everything you need to know about booking and traveling with us
      </p>
    </div>
  </Container>
</section>
```

---

## Related Documentation

- [patterns/card-grid-patterns.md](card-grid-patterns.md) - Card grid patterns
- [patterns/editorial-content-patterns.md](editorial-content-patterns.md) - Content patterns
- [components/Container.md](../components/Container.md) - Container component
- [design-tokens/typography.md](../design-tokens/typography.md) - Typography system
- [design-tokens/spacing.md](../design-tokens/spacing.md) - Spacing system
