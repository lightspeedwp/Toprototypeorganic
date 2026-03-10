# Mobile Touch Target Guidelines

## Purpose

This document defines **touch target sizing and spacing requirements** for the LightSpeed Tour Operator plugin prototype to ensure usable, accessible mobile interfaces.

---

## Minimum Touch Target Size

**WCAG 2.1 AAA Requirement:** Minimum 44px × 44px

**Why:** Fingers are not precise - average adult finger pad is 40-50px wide.

---

## Touch Target Sizing Rules

### 1. Minimum Size: 44px × 44px

All interactive elements must be **at least 44px** in both dimensions:

```typescript
// ✅ Good - 44px tall
<button className="px-4 py-3">
  Button Text
</button>

// ❌ Bad - too small
<button className="px-2 py-1">
  Small Button
</button>
```

---

### 2. Recommended Size: 48px × 48px

For better usability, aim for **48px × 48px**:

```typescript
<button className="px-6 py-3">
  Primary Action
</button>
```

---

### 3. Optimal Size: 52px+ × 52px+

Large, important actions should be **52px or larger**:

```typescript
<button className="px-8 py-4 text-lg">
  Book Now
</button>
```

---

## Touch Target Spacing

### 1. Minimum Spacing: 8px

Interactive elements should have **at least 8px** spacing between them:

```typescript
<div className="flex gap-2"> {/* 8px gap */}
  <button className="px-4 py-3">Cancel</button>
  <button className="px-4 py-3">Confirm</button>
</div>
```

---

### 2. Recommended Spacing: 12-16px

For better usability, use **12-16px** spacing:

```typescript
<div className="flex gap-4"> {/* 16px gap */}
  <button className="px-4 py-3">Cancel</button>
  <button className="px-4 py-3">Confirm</button>
</div>
```

---

## Component-Specific Guidelines

### Buttons

**Minimum:** 44px tall
**Recommended:** 48px tall

```typescript
// Default button
<button className="px-4 py-3 rounded-md bg-primary text-primary-foreground">
  Button Text
</button>

// Large button
<button className="px-6 py-4 rounded-md bg-primary text-primary-foreground">
  Large Button
</button>

// Full-width button (mobile)
<button className="w-full px-6 py-3 rounded-md bg-primary text-primary-foreground">
  Full Width Button
</button>
```

---

### Icon-Only Buttons

**Minimum:** 44px × 44px

```typescript
<button className="p-3 rounded-md hover:bg-muted">
  <Menu className="w-5 h-5" />
  <span className="sr-only">Open menu</span>
</button>
```

---

### Links

**Minimum touch area:** 44px × 44px

```typescript
// Text link with padding
<a href="/tours" className="inline-block py-3">
  View All Tours
</a>

// Navigation link
<a href="/about" className="block py-3 px-4">
  About Us
</a>
```

---

### Checkboxes & Radio Buttons

**Minimum:** 44px × 44px touch area

```typescript
<div className="flex items-center gap-3 py-2">
  <input
    id="terms"
    type="checkbox"
    className="w-5 h-5" // Visual size 20px
  />
  <label htmlFor="terms" className="flex-1 py-2"> {/* Touch area extends */}
    I agree to the terms and conditions
  </label>
</div>
```

---

### Form Inputs

**Minimum:** 44px tall

```typescript
<input
  type="text"
  className="w-full px-3 py-3 border border-border rounded-md"
  placeholder="Your name"
/>
```

---

### Navigation Menu Items

**Minimum:** 44px tall

```typescript
<nav className="md:hidden">
  <ul>
    <li>
      <a href="/" className="block py-3 px-4">
        Home
      </a>
    </li>
    <li>
      <a href="/tours" className="block py-3 px-4">
        Tours
      </a>
    </li>
  </ul>
</nav>
```

---

### Tabs

**Minimum:** 44px tall

```typescript
<div className="flex border-b border-border">
  <button className="px-4 py-3 border-b-2 border-primary">
    Overview
  </button>
  <button className="px-4 py-3 border-b-2 border-transparent">
    Itinerary
  </button>
  <button className="px-4 py-3 border-b-2 border-transparent">
    Reviews
  </button>
</div>
```

---

### Accordion Triggers

**Minimum:** 44px tall

```typescript
<button className="flex items-center justify-between w-full py-3 px-4">
  <span>Question Text</span>
  <ChevronDown className="w-5 h-5" />
</button>
```

---

### Card Links

**Entire card clickable:**

```typescript
<a href="/tours/iceland" className="block p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
  <img src="/image.jpg" alt="Tour" className="w-full aspect-video object-cover rounded-md mb-3" />
  <h3 className="font-semibold mb-2">Iceland Explorer</h3>
  <p className="text-sm text-muted-foreground">8 days / 7 nights</p>
</a>
```

---

### Pagination

**Minimum:** 44px × 44px

```typescript
<nav className="flex items-center gap-2">
  <button className="p-3 rounded-md border border-border">
    <ChevronLeft className="w-5 h-5" />
    <span className="sr-only">Previous page</span>
  </button>
  
  <button className="px-4 py-3 rounded-md border border-border">
    1
  </button>
  <button className="px-4 py-3 rounded-md bg-primary text-primary-foreground">
    2
  </button>
  <button className="px-4 py-3 rounded-md border border-border">
    3
  </button>
  
  <button className="p-3 rounded-md border border-border">
    <ChevronRight className="w-5 h-5" />
    <span className="sr-only">Next page</span>
  </button>
</nav>
```

---

## Touch Target Patterns

### 1. Button Group

```typescript
<div className="flex gap-3">
  <button className="flex-1 px-4 py-3 border border-border rounded-md">
    Cancel
  </button>
  <button className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-md">
    Confirm
  </button>
</div>
```

---

### 2. Icon + Text Button

```typescript
<button className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-md">
  <Search className="w-5 h-5" />
  <span>Search Tours</span>
</button>
```

---

### 3. Mobile Navigation

```typescript
<nav className="md:hidden">
  <button className="flex items-center gap-2 w-full py-3 px-4 border-b border-border">
    <Menu className="w-5 h-5" />
    <span>Menu</span>
  </button>
</nav>
```

---

### 4. Action List

```typescript
<div className="divide-y divide-border">
  <button className="flex items-center justify-between w-full py-4 px-4">
    <span>Edit Profile</span>
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </button>
  <button className="flex items-center justify-between w-full py-4 px-4">
    <span>Notifications</span>
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </button>
  <button className="flex items-center justify-between w-full py-4 px-4 text-destructive">
    <span>Sign Out</span>
    <ChevronRight className="w-5 h-5" />
  </button>
</div>
```

---

### 5. Filter Chips

```typescript
<div className="flex flex-wrap gap-2">
  <button className="px-4 py-2 rounded-full border border-border hover:bg-muted">
    Adventure
  </button>
  <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground">
    Cultural
  </button>
  <button className="px-4 py-2 rounded-full border border-border hover:bg-muted">
    Family
  </button>
</div>
```

---

## Accessibility Considerations

### 1. Visible Focus States

All touch targets must have visible focus indicators:

```typescript
<button className="px-4 py-3 rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Button
</button>
```

---

### 2. Screen Reader Labels

Icon-only buttons need accessible labels:

```typescript
<button className="p-3" aria-label="Close dialog">
  <X className="w-5 h-5" />
</button>

// Or
<button className="p-3">
  <X className="w-5 h-5" />
  <span className="sr-only">Close dialog</span>
</button>
```

---

### 3. Active States

Provide visual feedback on touch:

```typescript
<button className="px-4 py-3 bg-primary text-primary-foreground active:bg-primary/90 transition-colors">
  Button
</button>
```

---

## Common Touch Target Mistakes

### ❌ Too Small

```typescript
// Bad - only 32px tall
<button className="px-3 py-1 text-sm">
  Too Small
</button>
```

**✅ Fix:**
```typescript
<button className="px-4 py-3">
  Correct Size
</button>
```

---

### ❌ Insufficient Spacing

```typescript
// Bad - buttons touching
<div className="flex">
  <button className="px-4 py-3">Button 1</button>
  <button className="px-4 py-3">Button 2</button>
</div>
```

**✅ Fix:**
```typescript
<div className="flex gap-3">
  <button className="px-4 py-3">Button 1</button>
  <button className="px-4 py-3">Button 2</button>
</div>
```

---

### ❌ Small Icon Buttons

```typescript
// Bad - only 32px
<button className="p-2">
  <X className="w-4 h-4" />
</button>
```

**✅ Fix:**
```typescript
<button className="p-3">
  <X className="w-5 h-5" />
  <span className="sr-only">Close</span>
</button>
```

---

### ❌ Tiny Links

```typescript
// Bad - too small
<a href="/terms" className="text-xs underline">
  Terms & Conditions
</a>
```

**✅ Fix:**
```typescript
<a href="/terms" className="inline-block py-2 underline">
  Terms & Conditions
</a>
```

---

## Testing Touch Targets

### 1. Visual Inspection

Ensure all interactive elements appear large enough.

---

### 2. Browser DevTools

Use Chrome DevTools mobile emulation to test touch targets.

---

### 3. Real Device Testing

Test on actual mobile devices to verify usability.

---

### 4. Accessibility Audit

Use Lighthouse to check touch target sizes.

---

## Touch Target Checklist

- [ ] All buttons are at least 44px tall
- [ ] Icon-only buttons are at least 44px × 44px
- [ ] Links have adequate padding (44px touch area)
- [ ] Form inputs are at least 44px tall
- [ ] Checkboxes/radios have 44px × 44px touch areas
- [ ] Navigation items are at least 44px tall
- [ ] Interactive elements have 8px+ spacing
- [ ] Focus states are visible
- [ ] Active states provide feedback
- [ ] Screen reader labels exist for icon-only buttons

---

## Related Documentation

- [mobile/forms.md](forms.md) - Form input sizing
- [mobile/typography.md](typography.md) - Text sizing for readability
- [mobile/navigation.md](navigation.md) - Mobile navigation patterns
