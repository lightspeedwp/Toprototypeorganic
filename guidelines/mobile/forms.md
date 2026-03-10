# Mobile Form Guidelines

## Purpose

This document defines **mobile form design patterns** for the LightSpeed Tour Operator plugin prototype to ensure usable, accessible forms on mobile devices.

---

## Core Mobile Form Principles

### 1. Minimum Input Size

**CRITICAL:** All form inputs must be **at least 44px tall** to meet touch target requirements and must use **16px font size minimum** to prevent iOS auto-zoom.

---

### 2. Input Font Size Rule

**NEVER use font sizes below 16px in form inputs:**

```typescript
// ✅ Good - 16px+ font size
<input
  type="text"
  className="px-3 py-2 border border-border rounded-md"
  placeholder="Your name"
/>

// ❌ Bad - triggers iOS zoom
<input
  type="text"
  className="text-sm px-3 py-2" // 14px triggers zoom
  placeholder="Your name"
/>
```

---

### 3. Touch Target Size

Minimum touch target: **44px × 44px**

```typescript
<input
  type="text"
  className="px-3 py-3 border border-border rounded-md" // 44px tall
  placeholder="Email"
/>
```

---

## Input Patterns

### Text Input

```typescript
<div className="space-y-2">
  <label htmlFor="name" className="block">
    Full Name
  </label>
  <input
    id="name"
    type="text"
    className="w-full px-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring focus:border-ring"
    placeholder="John Doe"
  />
</div>
```

---

### Email Input

Use `type="email"` for mobile keyboard:

```typescript
<div className="space-y-2">
  <label htmlFor="email" className="block">
    Email Address
  </label>
  <input
    id="email"
    type="email" // Shows @ key on mobile
    inputMode="email"
    autoComplete="email"
    className="w-full px-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring"
    placeholder="you@example.com"
  />
</div>
```

---

### Telephone Input

Use `type="tel"` for numeric keyboard:

```typescript
<div className="space-y-2">
  <label htmlFor="phone" className="block">
    Phone Number
  </label>
  <input
    id="phone"
    type="tel" // Shows numeric keyboard
    inputMode="tel"
    autoComplete="tel"
    className="w-full px-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring"
    placeholder="+1 (555) 123-4567"
  />
</div>
```

---

### Number Input

Use `inputMode="numeric"` for better mobile experience:

```typescript
<div className="space-y-2">
  <label htmlFor="travelers" className="block">
    Number of Travelers
  </label>
  <input
    id="travelers"
    type="number"
    inputMode="numeric" // Numeric keyboard
    min="1"
    max="20"
    className="w-full px-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring"
    placeholder="2"
  />
</div>
```

---

### Date Input

Use native date picker on mobile:

```typescript
<div className="space-y-2">
  <label htmlFor="travel-date" className="block">
    Preferred Travel Date
  </label>
  <input
    id="travel-date"
    type="date"
    className="w-full px-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring"
  />
</div>
```

---

### Select Dropdown

```typescript
<div className="space-y-2">
  <label htmlFor="travel-style" className="block">
    Travel Style
  </label>
  <select
    id="travel-style"
    className="w-full px-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring"
  >
    <option value="">Select a style</option>
    <option value="adventure">Adventure</option>
    <option value="cultural">Cultural</option>
    <option value="family">Family</option>
    <option value="luxury">Luxury</option>
  </select>
</div>
```

---

### Textarea

```typescript
<div className="space-y-2">
  <label htmlFor="message" className="block">
    Message
  </label>
  <textarea
    id="message"
    rows={4}
    className="w-full px-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring resize-none"
    placeholder="Tell us about your ideal trip..."
  />
</div>
```

---

### Checkbox

```typescript
<div className="flex items-start gap-3">
  <input
    id="newsletter"
    type="checkbox"
    className="w-5 h-5 mt-0.5 border-border rounded focus:ring-2 focus:ring-ring"
  />
  <label htmlFor="newsletter" className="flex-1">
    Subscribe to our newsletter for travel tips and exclusive offers
  </label>
</div>
```

---

### Radio Buttons

```typescript
<fieldset className="space-y-3">
  <legend className="font-medium mb-3">Accommodation Preference</legend>
  
  <div className="flex items-center gap-3">
    <input
      id="hotel"
      type="radio"
      name="accommodation"
      value="hotel"
      className="w-5 h-5 border-border focus:ring-2 focus:ring-ring"
    />
    <label htmlFor="hotel" className="flex-1">Hotel</label>
  </div>
  
  <div className="flex items-center gap-3">
    <input
      id="resort"
      type="radio"
      name="accommodation"
      value="resort"
      className="w-5 h-5 border-border focus:ring-2 focus:ring-ring"
    />
    <label htmlFor="resort" className="flex-1">Resort</label>
  </div>
  
  <div className="flex items-center gap-3">
    <input
      id="camping"
      type="radio"
      name="accommodation"
      value="camping"
      className="w-5 h-5 border-border focus:ring-2 focus:ring-ring"
    />
    <label htmlFor="camping" className="flex-1">Camping</label>
  </div>
</fieldset>
```

---

## Input Keyboard Types

### inputMode Attribute

Use `inputMode` to show the correct keyboard:

| Input Type | inputMode | Keyboard Shown |
|------------|-----------|----------------|
| Email | `email` | @ key, .com |
| Phone | `tel` | Numeric keypad |
| Number | `numeric` | Numeric keypad |
| URL | `url` | .com, / keys |
| Search | `search` | Go/Search button |
| Text | `text` | Full keyboard |

**Example:**
```typescript
<input type="email" inputMode="email" />
<input type="tel" inputMode="tel" />
<input type="number" inputMode="numeric" />
<input type="url" inputMode="url" />
```

---

## AutoComplete Attributes

### Common AutoComplete Values

```typescript
// Name
<input type="text" autoComplete="name" />
<input type="text" autoComplete="given-name" />
<input type="text" autoComplete="family-name" />

// Email
<input type="email" autoComplete="email" />

// Phone
<input type="tel" autoComplete="tel" />

// Address
<input type="text" autoComplete="street-address" />
<input type="text" autoComplete="postal-code" />
<input type="text" autoComplete="country" />

// Credit Card
<input type="text" autoComplete="cc-number" />
<input type="text" autoComplete="cc-exp" />
<input type="text" autoComplete="cc-csc" />
```

---

## Form Validation

### Inline Validation

Show errors immediately on blur:

```typescript
import { useState } from 'react';

function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="email" className="block">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => validateEmail(e.target.value)}
        className={`w-full px-3 py-3 border rounded-md ${
          error ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-ring'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <p id="email-error" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
```

---

### Required Field Indicator

```typescript
<label htmlFor="email" className="block">
  Email Address <span className="text-destructive">*</span>
</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
  className="w-full px-3 py-3 border border-border rounded-md"
/>
```

---

### Success State

```typescript
<div className="space-y-2">
  <label htmlFor="email" className="block">
    Email Address
  </label>
  <div className="relative">
    <input
      id="email"
      type="email"
      className="w-full px-3 py-3 pr-10 border border-primary rounded-md"
    />
    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
  </div>
  <p className="text-sm text-primary">Email verified</p>
</div>
```

---

## Complete Mobile Form Example

### Contact Form

```typescript
import { useState } from 'react';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block font-medium">
          Full Name <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          className="w-full px-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring focus:border-ring"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block font-medium">
          Email Address <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            id="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            className="w-full pl-10 pr-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring focus:border-ring"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block font-medium">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="w-full pl-10 pr-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring focus:border-ring"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block font-medium">
          Message <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <textarea
            id="message"
            required
            rows={4}
            className="w-full pl-10 pr-3 py-3 border border-border rounded-md bg-input-background focus:ring-2 focus:ring-ring focus:border-ring resize-none"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <Send className="w-5 h-5" />
        <span>Send Message</span>
      </button>
    </form>
  );
}
```

---

## Mobile Form Best Practices

### 1. One Column Layout

**Always use single column on mobile:**

```typescript
// ✅ Good - single column
<form className="space-y-6">
  <div>
    <input type="text" placeholder="First Name" />
  </div>
  <div>
    <input type="text" placeholder="Last Name" />
  </div>
</form>

// ❌ Bad - side-by-side on mobile
<form>
  <div className="grid grid-cols-2 gap-4">
    <input type="text" placeholder="First Name" />
    <input type="text" placeholder="Last Name" />
  </div>
</form>
```

---

### 2. Large Touch Targets

**Minimum 44px height:**

```typescript
<input
  type="text"
  className="px-3 py-3" // At least 44px tall
  placeholder="Name"
/>
```

---

### 3. Clear Labels

**Always visible labels (not placeholder-only):**

```typescript
// ✅ Good
<label htmlFor="email">Email</label>
<input id="email" type="email" placeholder="you@example.com" />

// ❌ Bad
<input type="email" placeholder="Email" /> {/* No label */}
```

---

### 4. Appropriate Keyboards

**Use correct input types:**

```typescript
<input type="email" inputMode="email" /> // Email keyboard
<input type="tel" inputMode="tel" />     // Phone keyboard
<input type="number" inputMode="numeric" /> // Number keyboard
```

---

### 5. AutoComplete

**Enable autofill:**

```typescript
<input type="email" autoComplete="email" />
<input type="tel" autoComplete="tel" />
<input type="text" autoComplete="name" />
```

---

### 6. Inline Validation

**Show errors immediately:**

```typescript
<input
  onBlur={(e) => validateField(e.target.value)}
  aria-invalid={hasError}
/>
{hasError && <p className="text-destructive text-sm">{errorMessage}</p>}
```

---

## Accessibility Requirements

### 1. Labels

All inputs must have associated labels:

```typescript
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
```

---

### 2. Error Messages

Error messages must be programmatically associated:

```typescript
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && <p id="email-error">{errorMessage}</p>}
```

---

### 3. Required Fields

Indicate required fields:

```typescript
<input required aria-required="true" />
```

---

## Testing Checklist

- [ ] All inputs are 44px+ tall
- [ ] All inputs use 16px+ font size
- [ ] Correct keyboard types are shown
- [ ] AutoComplete is enabled
- [ ] Labels are always visible
- [ ] Validation messages are clear
- [ ] Error states are accessible
- [ ] Forms work on iOS and Android
- [ ] Touch targets are adequate
- [ ] Forms don't trigger zoom

---

## Related Documentation

- [mobile/typography.md](typography.md) - Font sizing rules
- [mobile/touch-targets.md](touch-targets.md) - Touch target requirements
- [design-tokens/spacing.md](../design-tokens/spacing.md) - Form spacing
