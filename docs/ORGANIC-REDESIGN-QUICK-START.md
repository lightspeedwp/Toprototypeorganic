# 🌿 Organic Redesign Quick Start Guide

**TL;DR:** Use CSS variables, progressive gradient sections, organic shapes, and handwritten fonts sparingly.

---

## 🚀 Getting Started

### View the Demo

Visit `/organic-demo` to see the complete implementation of the organic redesign:

```
http://localhost:5173/organic-demo
```

This demo page showcases:
- ✅ Progressive color gradient (Savanna Sunset → Acacia & Clay → Minimal Earth)
- ✅ Texture overlays (Rich → Light → Micro)
- ✅ Organic shapes (blobs, pebbles, increased radius)
- ✅ Handwritten accent fonts (used sparingly)
- ✅ Warm Night dark mode

---

## 📋 Essential CSS Variables

### Fonts

```css
--font-family-lora:      /* Headings (serif) */
--font-family-noto-sans: /* Body text (sans-serif) */
--font-family-caveat:    /* Accent text (handwritten) ⚠️ USE SPARINGLY */
--font-family-shadows:   /* Decorative (handwritten) ⚠️ VERY SPARINGLY */
```

### Progressive Gradient Colors

#### TOP Sections (Savanna Sunset)
```css
--organic-sunset-bg-primary:     #F5F1E8  /* Warm cream */
--organic-sunset-bg-secondary:   #EDE7DC  /* Light sand */
--organic-sunset-primary:        #C87941  /* Amber */
--organic-sunset-accent:         #7A9B76  /* Sage green */
--organic-sunset-text:           #3D3331  /* Warm brown */
```

#### MIDDLE Sections (Acacia & Clay)
```css
--organic-clay-bg-primary:       #F0EDE3  /* Soft beige */
--organic-clay-bg-secondary:     #E8E3D6  /* Warm beige */
--organic-clay-primary:          #6E8550  /* Botanical green */
--organic-clay-accent:           #B8704F  /* Clay/rust */
--organic-clay-text:             #2C2824  /* Dark grey */
```

#### BOTTOM Sections (Minimal Earth)
```css
--organic-earth-bg-primary:      #FAF8F3  /* Warm linen */
--organic-earth-bg-secondary:    #F2EFE8  /* Off-white */
--organic-earth-primary:         #848B6F  /* Muted olive */
--organic-earth-accent:          #D89975  /* Soft terracotta */
--organic-earth-text:            #2A2722  /* Deep black */
```

### Textures

```css
--texture-paper-rich:    /* Level 3 - Hero sections (20-30% opacity) */
--texture-linen-light:   /* Level 2 - Content sections (10-20% opacity) */
--texture-grain-micro:   /* Level 1 - Footer sections (5-10% opacity) */
```

### Organic Shapes

```css
--organic-radius-sm:     4px   /* Small elements */
--organic-radius-md:     8px   /* Cards */
--organic-radius-lg:     12px  /* Large cards */
--organic-radius-xl:     16px  /* Features */
--organic-radius-2xl:    20px  /* Hero elements */

--organic-radius-blob-sm:   /* Small blob shapes */
--organic-radius-blob-md:   /* Medium blob shapes */
--organic-radius-blob-lg:   /* Large blob shapes */
--organic-radius-pebble:    /* Pebble button shapes */
```

---

## 🎨 Utility Classes

### Section Backgrounds (Progressive Gradient)

```tsx
// TOP (Hero, first impression)
<section className="organic-section-top">

// TOP (Alternate)
<section className="organic-section-top-alt">

// MIDDLE (Main content)
<section className="organic-section-middle">

// MIDDLE (Alternate)
<section className="organic-section-middle-alt">

// BOTTOM (Footer, conclusion)
<section className="organic-section-bottom">

// BOTTOM (Alternate)
<section className="organic-section-bottom-alt">
```

**Automatic Features:**
- ✅ Background color from palette
- ✅ Text color (high contrast)
- ✅ Texture overlay (progressive levels)
- ✅ Dark mode support

### Organic Shapes

```tsx
// Standard organic radius
<div className="organic-radius-sm">    {/* 4px */}
<div className="organic-radius-md">    {/* 8px */}
<div className="organic-radius-lg">    {/* 12px */}
<div className="organic-radius-xl">    {/* 16px */}
<div className="organic-radius-2xl">   {/* 20px */}

// Blob shapes (hero backgrounds, featured cards)
<div className="organic-blob-sm">
<div className="organic-blob-md">
<div className="organic-blob-lg">

// Pebble shape (CTA buttons)
<button className="organic-pebble">
```

---

## 💡 Usage Examples

### Hero Section (TOP)

```tsx
<section className="organic-section-top py-section-xl">
  <Container>
    <h1 className="text-fluid-6xl mb-4">
      Discover Wild Africa
    </h1>
    <p className="text-fluid-xl mb-8">
      Your safari adventure awaits.
    </p>
    <button className="organic-pebble px-8 py-4 bg-primary text-primary-foreground">
      Explore Tours
    </button>
  </Container>
</section>
```

### Content Section (MIDDLE)

```tsx
<section className="organic-section-middle py-section-lg">
  <Container>
    <h2
      className="text-fluid-4xl mb-6"
      style={{ fontFamily: 'var(--font-family-caveat)' }}
    >
      Featured Adventures
    </h2>
    
    <div className="grid grid-cols-3 gap-6">
      {tours.map(tour => (
        <div
          key={tour.id}
          className="organic-radius-lg p-6"
          style={{
            backgroundColor: 'var(--organic-clay-bg-secondary)',
            color: 'var(--organic-clay-text)',
          }}
        >
          <h3 className="text-fluid-2xl mb-2">{tour.title}</h3>
          <p className="text-fluid-base mb-4">{tour.excerpt}</p>
          <button className="organic-pebble px-6 py-3 bg-primary text-primary-foreground">
            View Details
          </button>
        </div>
      ))}
    </div>
  </Container>
</section>
```

### Footer Section (BOTTOM)

```tsx
<footer className="organic-section-bottom py-section-lg">
  <Container>
    <div className="organic-radius-xl p-12 text-center bg-organic-earth-bg-secondary">
      <h2
        className="text-fluid-4xl mb-4"
        style={{ fontFamily: 'var(--font-family-caveat)' }}
      >
        Ready for Your Adventure?
      </h2>
      <button className="organic-pebble px-8 py-4 bg-accent text-accent-foreground">
        Start Planning
      </button>
    </div>
    
    {/* Decorative flourish (very sparingly!) */}
    <p
      className="text-center mt-8 text-fluid-sm"
      style={{ fontFamily: 'var(--font-family-shadows)' }}
    >
      Est. 2024
    </p>
  </Container>
</footer>
```

---

## ⚠️ Important Guidelines

### Typography

**DO ✅**
- Use Lora for headings (H1-H6)
- Use Noto Sans for body text and UI elements
- Use Caveat for accent headings (sparingly)
- Use Shadows Into Light for small decorative elements (very sparingly)

**DON'T ❌**
- Don't use handwritten fonts for body text
- Don't use handwritten fonts for navigation
- Don't use handwritten fonts for functional UI elements
- Don't mix multiple handwritten fonts in the same section

### Colors

**DO ✅**
- Always use CSS variables
- Apply progressive gradient (top → middle → bottom)
- Use semantic color tokens
- Test in both light and dark modes

**DON'T ❌**
- Don't hardcode colors
- Don't mix palettes within a section
- Don't use pure black in dark mode (use warm neutrals)

### Shapes

**DO ✅**
- Use organic radius for cards and buttons
- Use blob shapes for hero backgrounds and featured elements
- Use pebble shapes for CTA buttons
- Test responsive behavior

**DON'T ❌**
- Don't apply blob shapes to small UI elements
- Don't overuse organic shapes (creates visual chaos)
- Don't mix standard and organic radius in the same component

### Textures

**DO ✅**
- Use rich texture (Level 3) for hero sections
- Use light texture (Level 2) for main content
- Use micro texture (Level 1) for footer sections
- Let utility classes handle texture application

**DON'T ❌**
- Don't manually apply textures (use utility classes)
- Don't skip textures in hero sections
- Don't use heavy textures in dark mode (automatic via CSS)

---

## 🎯 Progressive Layout Pattern

**Standard page structure:**

```tsx
export default function PageTemplate() {
  return (
    <>
      {/* TOP: Savanna Sunset */}
      <section className="organic-section-top py-section-xl">
        <Hero {...heroProps} />
      </section>

      {/* MIDDLE: Acacia & Clay */}
      <section className="organic-section-middle py-section-lg">
        <Container>
          {/* Main content */}
        </Container>
      </section>

      {/* MIDDLE (ALT): Acacia & Clay */}
      <section className="organic-section-middle-alt py-section-lg">
        <Container>
          {/* Supporting content */}
        </Container>
      </section>

      {/* BOTTOM: Minimal Earth */}
      <footer className="organic-section-bottom py-section-lg">
        <Container>
          {/* Footer CTA + info */}
        </Container>
      </footer>
    </>
  );
}
```

---

## 🌙 Dark Mode (Warm Night)

Dark mode automatically applies when `.dark` class is on the root element.

**Features:**
- ✅ Warm brown/charcoal instead of pure black
- ✅ Earthy accents slightly desaturated
- ✅ Reduced texture opacity for readability
- ✅ Twilight safari aesthetic

**No action required** — CSS variables handle the switching automatically!

---

## 📚 Documentation

**Full implementation guide:**
- `/docs/ORGANIC-REDESIGN-IMPLEMENTATION.md`

**Live demo:**
- `/organic-demo` (http://localhost:5173/organic-demo)

**Related files:**
- `/src/styles/theme-organic.css` — All organic CSS variables
- `/src/styles/fonts.css` — Font imports
- `/src/styles/theme-base.css` — Font family variables

---

## 🔍 Quick Checklist

Before using organic redesign in a new component:

- [ ] Use `.organic-section-*` utility classes for backgrounds
- [ ] Use CSS variables for all colors
- [ ] Use defined fonts only (Lora, Noto Sans, Caveat, Shadows Into Light)
- [ ] Apply organic radius to cards and buttons
- [ ] Use handwritten fonts sparingly (accents only)
- [ ] Test in both light and dark modes
- [ ] Verify progressive gradient (top → middle → bottom)
- [ ] Check responsive behavior

---

**Last Updated:** March 10, 2026  
**Version:** 1.0  
**Demo:** `/organic-demo`
