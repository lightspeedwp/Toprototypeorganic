# Quick Start Guide: WordPress CSS Classes

**Created:** February 24, 2026  
**Purpose:** Quick reference for using WordPress BEM classes in React components  
**Status:** Ready to use (requires dev server restart + CSS import)

---

## 🚀 Getting Started

### Step 1: Enable CSS Imports

1. **Restart dev server** (required to clear build cache)
2. **Uncomment CSS imports** in `/src/styles/global.css`:

```css
/* Change from: */
/* @import './parts/header.css'; */

/* To: */
@import './parts/header.css';
```

Uncomment all template part and template imports.

### Step 2: Apply WordPress Classes

Replace Tailwind classes with WordPress BEM classes in your React components.

---

## 📋 Template Quick Reference

### **HomePage** (`/src/app/pages/HomePage.tsx`)

#### Before (Tailwind):
```tsx
<main className="min-h-screen">
  <section className="py-16 bg-muted">
    <h2 className="text-4xl font-semibold mb-4">Featured Tours</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cards */}
    </div>
  </section>
</main>
```

#### After (WordPress):
```tsx
<main className="wp-template-home">
  <section className="wp-template-home__tours">
    <Container>
      <div className="wp-template-home__section-header">
        <h2 className="wp-template-home__section-title">Featured Tours</h2>
      </div>
      <div className="wp-template-home__tours-grid">
        {/* Cards */}
      </div>
    </Container>
  </section>
</main>
```

**CSS File:** `/src/styles/templates/home.css`  
**Classes:** 50+ available

---

### **Generic Archive** (Destinations, Accommodation, Blog, etc.)

#### Before (Tailwind):
```tsx
<main className="min-h-screen">
  <section className="py-16 bg-muted text-center">
    <h1 className="text-5xl font-bold">Destinations</h1>
  </section>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Cards */}
  </div>
</main>
```

#### After (WordPress):
```tsx
<main className="wp-template-archive wp-template-archive-destinations">
  <section className="wp-template-archive__hero">
    <Container>
      <div className="wp-template-archive__hero-content">
        <h1 className="wp-template-archive__title">Destinations</h1>
      </div>
    </Container>
  </section>
  <section className="wp-template-archive__content">
    <Container>
      <div className="wp-template-archive__grid wp-template-archive__grid--cols-4">
        {/* Cards */}
      </div>
    </Container>
  </section>
</main>
```

**CSS File:** `/src/styles/templates/archive.css`  
**Classes:** 40+ available  
**Reuses for:** Destinations, Accommodation, Blog, Reviews, Specials, Team

---

### **ToursArchive** (Specific)

#### Before (Tailwind):
```tsx
<main>
  <div className="flex items-center justify-between py-4">
    <p className="text-muted-foreground text-sm">Showing {count} tours</p>
  </div>
</main>
```

#### After (WordPress):
```tsx
<main className="wp-template-archive-tours">
  <Container>
    <div className="wp-template-archive-tours__results-header">
      <p className="wp-template-archive-tours__results-count">
        Showing {count} tours
      </p>
    </div>
  </Container>
</main>
```

**CSS File:** `/src/styles/templates/archive-tours.css`  
**Classes:** 20+ available

---

### **Generic Single** (Destination, Accommodation, Blog, etc.)

#### Before (Tailwind):
```tsx
<main className="min-h-screen">
  <div className="min-h-[50vh] bg-cover">
    <h1 className="text-5xl font-bold text-white">Title</h1>
  </div>
  <article className="prose lg:prose-lg">
    {/* Content */}
  </article>
</main>
```

#### After (WordPress):
```tsx
<main className="wp-template-single wp-template-single-destination">
  <section className="wp-template-single__hero">
    <div className="wp-template-single__hero-overlay" />
    <Container>
      <div className="wp-template-single__hero-content">
        <h1 className="wp-template-single__title">Title</h1>
      </div>
    </Container>
  </section>
  <section className="wp-template-single__content">
    <Container>
      <div className="wp-template-single__layout">
        <article className="wp-template-single__article">
          {/* Content */}
        </article>
      </div>
    </Container>
  </section>
</main>
```

**CSS File:** `/src/styles/templates/single.css`  
**Classes:** 45+ available  
**Reuses for:** Destination, Accommodation, Blog, Review, Team

---

### **AboutPage**

#### Before (Tailwind):
```tsx
<main>
  <section className="py-16 bg-muted text-center">
    <h1 className="text-5xl font-bold">About Us</h1>
  </section>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Values */}
  </div>
</main>
```

#### After (WordPress):
```tsx
<main className="wp-template-page-about">
  <section className="wp-template-page-about__hero">
    <Container>
      <h1 className="wp-template-page-about__title">About Us</h1>
    </Container>
  </section>
  <section className="wp-template-page-about__values">
    <Container>
      <h2 className="wp-template-page-about__values-title">Our Values</h2>
      <div className="wp-template-page-about__values-grid">
        {/* Values */}
      </div>
    </Container>
  </section>
</main>
```

**CSS File:** `/src/styles/templates/page-about.css`  
**Classes:** 40+ available

---

### **ContactPage**

#### Before (Tailwind):
```tsx
<main>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <form className="bg-card border rounded-lg p-6">
      <input className="w-full p-3 border rounded" />
    </form>
  </div>
</main>
```

#### After (WordPress):
```tsx
<main className="wp-template-page-contact">
  <section className="wp-template-page-contact__content">
    <Container>
      <div className="wp-template-page-contact__layout">
        <div className="wp-template-page-contact__form-wrapper">
          <form className="wp-template-page-contact__form">
            <input className="wp-template-page-contact__form-input" />
          </form>
        </div>
      </div>
    </Container>
  </section>
</main>
```

**CSS File:** `/src/styles/templates/page-contact.css`  
**Classes:** 50+ available

---

### **FAQPage**

#### Before (Tailwind):
```tsx
<main>
  <div className="max-w-3xl mx-auto">
    <input className="w-full p-3 border rounded" placeholder="Search..." />
  </div>
  <div className="space-y-4">
    {/* Accordion items */}
  </div>
</main>
```

#### After (WordPress):
```tsx
<main className="wp-template-page-faq">
  <section className="wp-template-page-faq__hero">
    <Container>
      <div className="wp-template-page-faq__search">
        <input 
          className="wp-template-page-faq__search-input" 
          placeholder="Search FAQs..."
        />
      </div>
    </Container>
  </section>
  <section className="wp-template-page-faq__content">
    <Container>
      <div className="wp-template-page-faq__accordion">
        {/* Accordion items */}
      </div>
    </Container>
  </section>
</main>
```

**CSS File:** `/src/styles/templates/page-faq.css`  
**Classes:** 50+ available

---

### **Generic Utility** (Privacy, Terms, Sitemap, etc.)

#### Before (Tailwind):
```tsx
<main>
  <h1 className="text-5xl font-bold text-center">Privacy Policy</h1>
  <article className="prose lg:prose-lg max-w-4xl mx-auto">
    <h2>Section 1</h2>
    <p>Content...</p>
  </article>
</main>
```

#### After (WordPress):
```tsx
<main className="wp-template-page-utility wp-template-page-privacy">
  <section className="wp-template-page-utility__hero">
    <Container>
      <h1 className="wp-template-page-utility__title">Privacy Policy</h1>
    </Container>
  </section>
  <section className="wp-template-page-utility__content">
    <Container>
      <div className="wp-template-page-utility__wrapper">
        <article className="wp-template-page-utility__prose">
          <h2>Section 1</h2>
          <p>Content...</p>
        </article>
      </div>
    </Container>
  </section>
</main>
```

**CSS File:** `/src/styles/templates/page-utility.css`  
**Classes:** 50+ available  
**Reuses for:** Privacy, Terms, Sitemap, Why Book With Us, Newsletter, Travel Insurance, etc.

---

## 🎨 Template Parts Reference

### **Header**

#### Before (Tailwind):
```tsx
<header className="sticky top-0 z-50 bg-background border-b">
  <nav className="flex items-center justify-between py-4">
    <Logo />
  </nav>
</header>
```

#### After (WordPress):
```tsx
<header className="wp-part-header">
  <Container>
    <nav className="wp-part-header__nav">
      <div className="wp-part-header__logo">
        <Logo />
      </div>
      <div className="wp-part-header__menu">
        {/* Menu items */}
      </div>
    </nav>
  </Container>
</header>
```

**CSS File:** `/src/styles/parts/header.css`  
**Classes:** 40+ available

---

### **Footer**

#### Before (Tailwind):
```tsx
<footer className="bg-muted border-t">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
    {/* Footer columns */}
  </div>
</footer>
```

#### After (WordPress):
```tsx
<footer className="wp-part-footer">
  <Container>
    <div className="wp-part-footer__grid">
      <div className="wp-part-footer__column">
        {/* Column content */}
      </div>
    </div>
  </Container>
</footer>
```

**CSS File:** `/src/styles/parts/footer.css`  
**Classes:** 30+ available

---

### **Mobile Menu**

#### Before (Tailwind):
```tsx
<div className="fixed inset-0 z-50 bg-background">
  <nav className="flex flex-col p-6">
    <button className="text-lg py-3">Home</button>
  </nav>
</div>
```

#### After (WordPress):
```tsx
<div className="wp-pattern-mobile-menu">
  <div className="wp-pattern-mobile-menu__overlay" />
  <div className="wp-pattern-mobile-menu__panel">
    <nav className="wp-pattern-mobile-menu__nav">
      <button className="wp-pattern-mobile-menu__item">Home</button>
    </nav>
  </div>
</div>
```

**CSS File:** `/src/styles/patterns/mobile-menu.css`  
**Classes:** 25+ available

---

## 🔄 Generic Template Usage Pattern

All generic templates follow the same usage pattern:

```tsx
// 1. Apply base class + specific variant
<main className="wp-template-[base] wp-template-[specific]">
  
  // 2. Use base class for all child elements
  <section className="wp-template-[base]__hero">
    
    // 3. Optionally add specific modifiers
    <div className="wp-template-[base]__grid wp-template-[base]__grid--cols-4">
      
    </div>
  </section>
</main>
```

### Examples:

**Archive (Destinations):**
```tsx
<main className="wp-template-archive wp-template-archive-destinations">
  <section className="wp-template-archive__hero">
    {/* Uses archive.css styles */}
  </section>
</main>
```

**Single (Blog):**
```tsx
<main className="wp-template-single wp-template-single-blog">
  <section className="wp-template-single__hero">
    {/* Uses single.css styles */}
  </section>
</main>
```

**Utility (Privacy):**
```tsx
<main className="wp-template-page-utility wp-template-page-privacy">
  <section className="wp-template-page-utility__hero">
    {/* Uses page-utility.css styles */}
  </section>
</main>
```

---

## ✅ Design System Compliance Checklist

When migrating, ensure:

### ❌ Never Use:
- Hardcoded colors (`bg-white`, `text-black`, `border-gray-200`)
- Hardcoded spacing (`p-4`, `mt-8`, `gap-6` - unless intentional override)
- Hardcoded typography (`text-2xl`, `font-bold`, `leading-tight`)
- Hardcoded sizes (`w-64`, `h-48`)

### ✅ Always Use:
- Semantic color classes (`bg-primary`, `text-muted-foreground`, `border-border`)
- CSS variable spacing (defined in CSS file)
- Semantic HTML elements (`<h2>`, `<p>` - they have automatic styling)
- WordPress BEM classes

### Example Migration:

**❌ Before (Tailwind):**
```tsx
<div className="bg-white text-gray-900 p-6 rounded-lg border border-gray-200">
  <h2 className="text-2xl font-bold mb-4">Title</h2>
  <p className="text-gray-600 leading-relaxed">Content</p>
</div>
```

**✅ After (WordPress):**
```tsx
<div className="wp-pattern-card">
  <div className="wp-pattern-card__header">
    <h2>Title</h2>  {/* Automatic styling from theme.css */}
  </div>
  <div className="wp-pattern-card__content">
    <p>Content</p>  {/* Automatic styling from theme.css */}
  </div>
</div>
```

---

## 📁 File Locations

### CSS Files
```
/src/styles/
├── parts/
│   ├── header.css
│   ├── footer.css
│   └── mobile-menu.css
├── templates/
│   ├── home.css
│   ├── archive.css              ★ REUSABLE
│   ├── archive-tours.css
│   ├── single.css               ★ REUSABLE
│   ├── single-tour.css
│   ├── page-about.css
│   ├── page-contact.css
│   ├── page-faq.css
│   └── page-utility.css         ★ REUSABLE
└── global.css                   ← Import all CSS here
```

### React Components
```
/src/app/
├── pages/
│   ├── HomePage.tsx
│   ├── ToursArchive.tsx
│   ├── TourSingle.tsx
│   ├── DestinationsArchive.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   └── FAQPage.tsx
└── components/
    └── parts/
        ├── Header.tsx
        ├── Footer.tsx
        └── MobileMenu.tsx
```

---

## 🎯 Quick Migration Workflow

1. **Choose a component** (e.g., HomePage)
2. **Find its CSS file** (e.g., `/src/styles/templates/home.css`)
3. **Review available classes** (50+ BEM classes)
4. **Replace Tailwind with WordPress classes**
5. **Test in browser**
6. **Verify responsive behavior**
7. **Check dark mode**
8. **Validate accessibility**
9. **Move to next component**

---

## 💡 Pro Tips

### Tip 1: Use Container Component
Always wrap sections in `<Container>` for consistent max-width:

```tsx
<section className="wp-template-home__tours">
  <Container>
    {/* Content with max-width */}
  </Container>
</section>
```

### Tip 2: Semantic HTML Gets Auto-Styling
Headings and paragraphs get automatic styling from `theme.css`:

```tsx
{/* No classes needed! */}
<h2>Section Title</h2>  {/* → 32px, Lora, semibold */}
<p>Body text</p>        {/* → 16px, Noto Sans, normal */}
```

### Tip 3: Use BEM Modifiers for Variants
```tsx
{/* Grid with 4 columns */}
<div className="wp-template-archive__grid wp-template-archive__grid--cols-4">
```

### Tip 4: Check Dark Mode
All CSS variables automatically switch in dark mode. No special classes needed!

### Tip 5: Responsive Is Built-In
All grids and layouts are responsive by default. No media query classes needed!

---

## 🐛 Troubleshooting

### CSS Not Loading?
1. Restart dev server
2. Check CSS imports are uncommented in `global.css`
3. Clear browser cache

### Styles Not Applying?
1. Check class name spelling (case-sensitive!)
2. Verify CSS file is imported
3. Inspect element in browser DevTools

### Dark Mode Not Working?
1. Verify using CSS variables (not hardcoded colors)
2. Check `theme.css` is loaded
3. Test theme switcher in header

### Layout Breaking?
1. Ensure Container component is used
2. Check grid class modifiers
3. Test at different breakpoints

---

## 📚 Additional Resources

- **Phase 2 Completion Report:** `/tasks/phase-2-completion-report.md`
- **Session Summary:** `/tasks/session-summary-feb-24-2026.md`
- **Migration Tracker:** `/tasks/tailwind-to-wordpress-migration.md`
- **Design System Guide:** `/guidelines/DESIGN-SYSTEM-GUIDE.md`

---

**Quick Start Version:** 1.0  
**Last Updated:** February 24, 2026  
**Status:** Ready to use (requires dev server restart)  
**Coverage:** 24+ templates, 575+ BEM classes
