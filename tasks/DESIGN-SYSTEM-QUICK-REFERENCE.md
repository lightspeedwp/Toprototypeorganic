# Design System Quick Reference Card

**Use this card when generating ANY UI component**

---

## 🎨 TYPOGRAPHY (ONLY 3 FONTS)

### Font Families
```css
font-serif  → Lora         /* Headings, labels, blockquotes */
font-sans   → Noto Sans    /* Body text, buttons, inputs, UI */
font-mono   → Courier New  /* Code blocks ONLY */
```

### Font Sizes (Fluid - Responsive)
```css
text-6xl  → H1: 48-72px     text-base → Body: 16-18px
text-4xl  → H2: 30-48px     text-sm   → Small: 14-16px
text-3xl  → H3: 24-36px     text-xs   → Tiny: 12-14px
text-2xl  → H4: 20-30px
text-xl   → H5: 18-24px
text-lg   → H6: 16-20px
```

### Font Weights
```css
font-light    → 300         font-semibold → 600 (H2-H3)
font-normal   → 400 (body)  font-bold     → 700 (H1)
font-medium   → 500 (buttons, H4-H6)
```

---

## 🎨 COLORS (Semantic Tokens)

### Backgrounds
```css
bg-background   bg-card         bg-primary
bg-secondary    bg-accent       bg-muted
bg-destructive  bg-success      bg-warning
```

### Text Colors
```css
text-foreground          text-primary
text-secondary           text-accent
text-muted-foreground    text-card-foreground
```

### Borders & Focus
```css
border-border   ring-ring
```

---

## 📏 SPACING

### Section Spacing (Fluid)
```css
py-section-sm  → 32-64px
py-section-md  → 48-96px
py-section-lg  → 64-128px
py-section-xl  → 80-160px
```

### Padding/Margin (Tailwind Scale)
```css
p-4 → 16px    gap-4 → 16px    mb-8 → 32px
p-6 → 24px    gap-6 → 24px    mb-12 → 48px
p-8 → 32px    gap-8 → 32px    mb-16 → 64px
```

---

## 🎯 BORDERS & RADIUS

```css
rounded-sm → 2px    border-border → var(--border)
rounded-md → 4px    shadow-sm     → subtle shadow
rounded-lg → 6px
rounded-xl → 8px
```

---

## ✅ DO

```tsx
// Typography
<h1 className="font-serif text-6xl font-bold">Title</h1>
<p className="font-sans text-base">Body text</p>

// Colors
<div className="bg-primary text-primary-foreground">
<button className="bg-accent text-accent-foreground">

// Spacing
<section className="py-section-md px-4">
<div className="p-6 gap-4 mb-8">

// Borders
<div className="border-border rounded-lg shadow-sm">
```

---

## ❌ DON'T

```tsx
// ❌ Hardcoded fonts
<h1 style={{ fontFamily: "Arial" }}>

// ❌ Hardcoded colors
<div style={{ backgroundColor: "#548235" }}>

// ❌ dark: classes (automatic dark mode)
<div className="bg-white dark:bg-slate-800">

// ❌ Hardcoded spacing
<div style={{ padding: "24px" }}>

// ❌ Inline styles (NEVER)
<button style={{ color: "white" }}>
```

---

## 📝 EXAMPLE COMPONENT

```tsx
<div className="bg-card border-border rounded-lg p-6 shadow-sm">
  <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">
    Card Title
  </h2>
  <p className="font-sans text-base text-muted-foreground mb-6">
    Description text
  </p>
  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium">
    Button
  </button>
</div>
```

---

## 🎯 KEY RULES

1. **ONLY 3 fonts:** Lora, Noto Sans, Courier New
2. **Semantic colors:** Use tokens, not hex codes
3. **No dark: classes:** Dark mode is automatic
4. **No inline styles:** NEVER use style={{ }}
5. **Fluid sizing:** Text and spacing scale responsively
6. **Tailwind first:** Use Tailwind classes that reference CSS vars

---

**Print this card and keep it visible while coding! 📌**
