# CSS Variables - Complete Reference

**Quick reference for all available CSS variables.**

---

## 🎨 Colors

### **Primary Colors**

```css
var(--primary)              /* Main brand color */
var(--primary-foreground)   /* Text on primary background */

var(--secondary)            /* Secondary brand color */
var(--secondary-foreground) /* Text on secondary background */

var(--accent)               /* Accent color for highlights */
var(--accent-foreground)    /* Text on accent background */
```

**Usage:**
```tsx
<div className="bg-primary text-primary-foreground">
<button className="bg-secondary text-secondary-foreground">
```

---

### **Background Colors**

```css
var(--background)           /* Page background */
var(--foreground)           /* Main text color */

var(--card)                 /* Card background */
var(--card-foreground)      /* Card text color */

var(--popover)              /* Popover background */
var(--popover-foreground)   /* Popover text color */

var(--muted)                /* Muted background */
var(--muted-foreground)     /* Muted text color */
```

**Usage:**
```tsx
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-muted text-muted-foreground">
```

---

### **Border & Input Colors**

```css
var(--border)               /* Default border color */
var(--input)                /* Input border color */
var(--ring)                 /* Focus ring color */
```

**Usage:**
```tsx
<div className="border border-border">
<input className="border-input focus:ring-ring">
```

---

### **Semantic Colors**

```css
var(--success)              /* Success state background */
var(--success-foreground)   /* Success state text */

var(--warning)              /* Warning state background */
var(--warning-foreground)   /* Warning state text */

var(--destructive)          /* Error/destructive background */
var(--destructive-foreground) /* Error text */

var(--info)                 /* Info state background */
var(--info-foreground)      /* Info state text */
```

**Usage:**
```tsx
<div className="bg-success text-success-foreground">
<div className="bg-warning text-warning-foreground">
<div className="bg-destructive text-destructive-foreground">
<div className="bg-info text-info-foreground">
```

---

## 🔤 Typography

### **Font Families**

```css
var(--font-family-lora)      /* Lora - Serif for headings */
var(--font-family-noto-sans) /* Noto Sans - Sans-serif for body */
var(--font-family-mono)      /* Courier New - Monospace for code */
```

**Tailwind Shortcuts:**
```tsx
<h1 className="font-serif">   {/* Uses Lora */}
<p className="font-sans">     {/* Uses Noto Sans */}
<code className="font-mono">  {/* Uses Courier New */}
```

**In CSS:**
```css
.heading {
  font-family: var(--font-family-lora);
}

.body-text {
  font-family: var(--font-family-noto-sans);
}

.code {
  font-family: var(--font-family-mono);
}
```

---

### **Font Sizes**

```css
var(--text-xs)    /* 12px / 0.75rem */
var(--text-sm)    /* 14px / 0.875rem */
var(--text-base)  /* 16px / 1rem */
var(--text-lg)    /* 18px / 1.125rem */
var(--text-xl)    /* 20px / 1.25rem */
var(--text-2xl)   /* 24px / 1.5rem */
var(--text-3xl)   /* 30px / 1.875rem */
var(--text-4xl)   /* 36px / 2.25rem */
var(--text-5xl)   /* 48px / 3rem */
var(--text-6xl)   /* 60px / 3.75rem */
```

**Usage:**
```css
.small-text { font-size: var(--text-sm); }
.body-text { font-size: var(--text-base); }
.heading { font-size: var(--text-4xl); }
```

**Semantic HTML (auto-sized):**
```tsx
<h1>  {/* Auto: 60px / text-6xl */}
<h2>  {/* Auto: 36px / text-4xl */}
<h3>  {/* Auto: 30px / text-3xl */}
<h4>  {/* Auto: 24px / text-2xl */}
<h5>  {/* Auto: 20px / text-xl */}
<h6>  {/* Auto: 18px / text-lg */}
<p>   {/* Auto: 16px / text-base */}
```

---

### **Font Weights**

```css
var(--font-weight-normal)    /* 400 */
var(--font-weight-medium)    /* 500 */
var(--font-weight-semibold)  /* 600 */
var(--font-weight-bold)      /* 700 */
```

**Usage:**
```css
.normal-text { font-weight: var(--font-weight-normal); }
.medium-text { font-weight: var(--font-weight-medium); }
.semibold-text { font-weight: var(--font-weight-semibold); }
.bold-text { font-weight: var(--font-weight-bold); }
```

**Semantic HTML (auto-weight):**
```tsx
<h1>  {/* Auto: Bold (700) */}
<h2>  {/* Auto: Semibold (600) */}
<h3>  {/* Auto: Semibold (600) */}
<h4>  {/* Auto: Medium (500) */}
<h5>  {/* Auto: Medium (500) */}
<h6>  {/* Auto: Medium (500) */}
<p>   {/* Auto: Normal (400) */}
```

---

### **Line Heights**

```css
var(--leading-none)      /* 1 */
var(--leading-tight)     /* 1.25 */
var(--leading-snug)      /* 1.375 */
var(--leading-normal)    /* 1.5 */
var(--leading-relaxed)   /* 1.625 */
var(--leading-loose)     /* 2 */
```

**Usage:**
```css
.tight-spacing { line-height: var(--leading-tight); }
.normal-spacing { line-height: var(--leading-normal); }
```

---

### **Letter Spacing**

```css
var(--tracking-tighter)  /* -0.05em */
var(--tracking-tight)    /* -0.025em */
var(--tracking-normal)   /* 0em */
var(--tracking-wide)     /* 0.025em */
var(--tracking-wider)    /* 0.05em */
var(--tracking-widest)   /* 0.1em */
```

**Usage:**
```css
.tight-letters { letter-spacing: var(--tracking-tight); }
.wide-letters { letter-spacing: var(--tracking-wide); }
```

---

## 📐 Spacing

### **Section Spacing (Fluid)**

```css
var(--spacing-section-sm)  /* clamp(2rem, 4vw, 3rem) */
var(--spacing-section-md)  /* clamp(3rem, 6vw, 5rem) */
var(--spacing-section-lg)  /* clamp(4rem, 8vw, 6rem) */
```

**Usage:**
```css
.section {
  padding-top: var(--spacing-section-md);
  padding-bottom: var(--spacing-section-md);
}
```

---

### **Gap Spacing (Fluid)**

```css
var(--spacing-gap-sm)  /* clamp(0.75rem, 2vw, 1rem) */
var(--spacing-gap-md)  /* clamp(1rem, 3vw, 1.5rem) */
var(--spacing-gap-lg)  /* clamp(1.5rem, 4vw, 2rem) */
```

**Usage:**
```css
.grid {
  gap: var(--spacing-gap-lg);
}

.flex-container {
  gap: var(--spacing-gap-md);
}
```

---

### **Container Padding (Responsive)**

```css
var(--spacing-container-sm)  /* clamp(1rem, 5vw, 1.5rem) */
```

**Usage:**
```css
.container {
  padding-left: var(--spacing-container-sm);
  padding-right: var(--spacing-container-sm);
}
```

---

### **Tailwind Spacing Scale (Fixed)**

Use Tailwind classes for fixed spacing:

```tsx
<div className="p-4">     {/* 16px padding */}
<div className="p-6">     {/* 24px padding */}
<div className="p-8">     {/* 32px padding */}
<div className="py-12">   {/* 48px vertical padding */}
<div className="gap-6">   {/* 24px gap */}
<div className="mb-8">    {/* 32px margin-bottom */}
```

**Scale:**
- `1` = 4px / 0.25rem
- `2` = 8px / 0.5rem
- `3` = 12px / 0.75rem
- `4` = 16px / 1rem
- `5` = 20px / 1.25rem
- `6` = 24px / 1.5rem
- `8` = 32px / 2rem
- `10` = 40px / 2.5rem
- `12` = 48px / 3rem
- `16` = 64px / 4rem
- `20` = 80px / 5rem
- `24` = 96px / 6rem

---

## 🎭 Border Radius

```css
var(--radius-sm)   /* 2px */
var(--radius-md)   /* 4px */
var(--radius-lg)   /* 6px */
var(--radius-xl)   /* 8px */
var(--radius-full) /* 9999px (circle) */
var(--radius)      /* 4px (default) */
```

**Tailwind Shortcuts:**
```tsx
<div className="rounded-sm">   {/* 2px */}
<div className="rounded-md">   {/* 4px */}
<div className="rounded-lg">   {/* 6px */}
<div className="rounded-xl">   {/* 8px */}
<div className="rounded-full"> {/* 9999px */}
```

**In CSS:**
```css
.small-radius { border-radius: var(--radius-sm); }
.medium-radius { border-radius: var(--radius-md); }
.large-radius { border-radius: var(--radius-lg); }
.extra-large-radius { border-radius: var(--radius-xl); }
.circle { border-radius: var(--radius-full); }
```

---

## 🌑 Shadows

```css
var(--elevation-sm)  /* Brutalist solid shadow */
var(--elevation-md)  /* Larger brutalist shadow */
```

**Usage:**
```css
.card {
  box-shadow: var(--elevation-sm);
}

.card:hover {
  box-shadow: var(--elevation-md);
}
```

**Tailwind Shortcuts:**
```tsx
<div className="shadow-sm">  {/* Uses elevation-sm */}
```

---

## 📱 Responsive Breakpoints

Use Tailwind responsive prefixes:

```tsx
<div className="p-4 md:p-6 lg:p-8">
  {/* 16px mobile, 24px tablet, 32px desktop */}
</div>

<div className="text-base md:text-lg lg:text-xl">
  {/* 16px mobile, 18px tablet, 20px desktop */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

**Breakpoints:**
- `sm:` - 640px and up (mobile landscape)
- `md:` - 768px and up (tablet)
- `lg:` - 1024px and up (desktop)
- `xl:` - 1280px and up (large desktop)
- `2xl:` - 1536px and up (extra large)

---

## 🎨 Common Patterns

### **Primary Button**
```tsx
<button className="bg-primary text-primary-foreground rounded-md px-6 py-3">
```

### **Card**
```tsx
<div className="bg-card text-card-foreground border border-border rounded-lg p-6">
```

### **Muted Section**
```tsx
<section className="bg-muted text-muted-foreground py-12">
```

### **Heading**
```tsx
<h2 className="font-serif text-4xl font-semibold">
```

### **Body Text**
```tsx
<p className="font-sans text-base font-normal text-muted-foreground">
```

### **Grid**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
```

---

## 📋 Quick Checks

### **Colors**
- ✅ Always pair background with matching foreground
- ✅ `bg-primary` with `text-primary-foreground`
- ✅ `bg-card` with `text-card-foreground`

### **Typography**
- ✅ Headings use Lora (serif)
- ✅ Body text uses Noto Sans (sans)
- ✅ Code uses Courier New (mono)

### **Spacing**
- ✅ Section padding uses `var(--spacing-section-*)`
- ✅ Grid gaps use `var(--spacing-gap-*)`
- ✅ Fixed spacing uses Tailwind scale

### **Customization**
- ✅ Edit `theme-light.css` for light colors
- ✅ Edit `theme-dark.css` for dark colors
- ✅ Edit `theme.css` for typography/spacing

---

## 🚀 Usage Example

```tsx
import { cn } from "../../lib/utils";

interface MyComponentProps {
  title: string;
  variant?: "default" | "primary";
}

export function MyComponent({ title, variant = "default" }: MyComponentProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 border",
        variant === "default" && "bg-card text-card-foreground border-border",
        variant === "primary" && "bg-primary text-primary-foreground border-primary"
      )}
    >
      <h3 className="font-serif text-2xl font-semibold mb-4">
        {title}
      </h3>
      <p className="font-sans text-base text-muted-foreground">
        Description text
      </p>
    </div>
  );
}
```

```css
/* Or in external CSS */
.my-component {
  padding: 1.5rem;
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.my-component__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 1rem;
}

.my-component__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  color: var(--muted-foreground);
}
```

---

**Print this and keep at your desk!** 📄
