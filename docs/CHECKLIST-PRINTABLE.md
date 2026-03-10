# ✅ UI GENERATION CHECKLIST (PRINT THIS!)

**Keep this visible while coding!**

---

## 🎨 COLORS

```
✅ Use: bg-background, bg-primary, bg-card, bg-success, etc.
✅ Use: text-foreground, text-primary-foreground, etc.
✅ Use: border-border, shadow-sm, etc.

❌ Never: #FFFFFF, rgb(255,255,255), white, bg-green-600
❌ Never: dark:bg-slate-900, dark:text-white
```

---

## ✍️ FONTS (ONLY 3!)

```
✅ Use: font-serif    (→ Lora)
✅ Use: font-sans     (→ Noto Sans)
✅ Use: font-mono     (→ Courier New)

❌ Never: Arial, Helvetica, Georgia, Times, Verdana
❌ Never: font-['Arial'], fontFamily: 'Helvetica'
```

---

## 📐 SPACING

```
✅ Use: p-4, px-6, py-8, gap-4, space-y-6
✅ Use: var(--spacing-section-md), var(--spacing-gap-lg)

❌ Never: padding: 24px, margin: 16px
❌ Never: style={{ padding: '24px' }}
```

---

## 🎨 STYLING

```
✅ Create: /src/styles/patterns/mycomponent.css
✅ Use: BEM naming (.wp-pattern-mycomponent)
✅ Use: All CSS variables (var(--*))
✅ Import: @import './patterns/mycomponent.css'; in index.css

❌ Never: Inline styles (style={{}})
❌ Never: All styling in React component
```

---

## 🌓 DARK MODE

```
✅ Use: Single set of classes (auto-switches!)
✅ Use: bg-background (white in light, dark in dark mode)

❌ Never: dark:bg-slate-900
❌ Never: Separate dark mode styling
```

---

## ✅ BEFORE SUBMITTING

```
[ ] No # hex colors
[ ] No rgb() colors  
[ ] No color names (white, black, green)
[ ] No inline styles
[ ] No dark: classes
[ ] Only Lora, Noto Sans, Courier New
[ ] External CSS created
[ ] CSS imported in index.css
[ ] Works in light mode
[ ] Works in dark mode
```

---

## 🎯 THE ONE QUESTION

**"Can users customize this by editing CSS variables?"**

```
✅ YES → Ship it!
❌ NO  → Fix it!
```

---

## 📋 QUICK EXAMPLES

**Button:**
```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-sans">
  Click
</button>
```

**Card:**
```tsx
<div className="bg-card text-card-foreground border border-border rounded-lg p-6">
  Content
</div>
```

**Heading:**
```tsx
<h2 className="font-serif text-4xl">Title</h2>
```

**Text:**
```tsx
<p className="font-sans text-base">Body text</p>
```

**Alert:**
```tsx
<div className="bg-success text-success-foreground p-4 rounded-md">
  Success!
</div>
```

---

## 🚨 REMEMBER

**If you hardcode it, users can't customize it!**

**Use CSS variables for EVERYTHING!**

---

**Print this and keep it visible! 📌**
