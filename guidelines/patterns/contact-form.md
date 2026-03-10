# Contact Form Pattern Guidelines

**Component:** `ContactFormPattern`  
**File:** `/src/app/components/patterns/ContactFormPattern.tsx`  
**Category:** Utility Pattern  
**WordPress Equivalent:** Contact Form 7, Gravity Forms block  
**Pattern Slug:** `lightspeed/contact-form`

---

## Overview

The Contact Form Pattern provides a comprehensive, accessible contact form with client-side validation, loading states, and success/error feedback. Designed for ContactPage and modal implementations.

### When to Use

- ✅ Contact pages
- ✅ Inquiry forms
- ✅ Booking request forms
- ✅ General communication forms
- ✅ Newsletter signup with extended fields

### When NOT to Use

- ❌ Simple newsletter signup (use `NewsletterSignupPattern`)
- ❌ Search forms (use `SearchFilterPattern`)
- ❌ Multi-step forms (requires custom implementation)
- ❌ File upload forms (not supported)

---

## Component API

### Props Interface

```typescript
interface ContactFormPatternProps {
  /** Form heading @default "Send Us a Message" */
  title?: string;
  
  /** Form description @default "Fill out the form..." */
  description?: string;
  
  /** Form submission handler */
  onSubmit?: (data: ContactFormData) => Promise<void>;
  
  /** Show phone field @default true */
  showPhoneField?: boolean;
  
  /** Success message @default "Thank you! Your message..." */
  successMessage?: string;
  
  /** Error message @default "Oops! Something went wrong..." */
  errorMessage?: string;
  
  /** Visual variant @default "default" */
  variant?: "default" | "compact";
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
```

### Default Behavior

**Fields:**
- Name: Required, min 1 character
- Email: Required, valid email format
- Phone: Optional (if showPhoneField=true), validated format
- Subject: Required dropdown (6 options)
- Message: Required, min 10 characters

**Validation:**
- Triggers on blur and on submit
- Errors clear when user starts typing
- First error field gets focus on validation failure

**Submission:**
- Disables form during submission
- Shows loading spinner
- Displays success/error message
- Resets form on success

---

## Usage Examples

### Basic Usage

```tsx
import { ContactFormPattern } from "../components/patterns/ContactFormPattern";

<ContactFormPattern
  title="Get In Touch"
  description="Send us a message and we'll respond within 24 hours"
/>
```

### With Custom Submit Handler

```tsx
<ContactFormPattern
  title="Contact Our Team"
  description="We're here to help with your safari planning"
  onSubmit={async (data) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
  }}
  showPhoneField={true}
/>
```

### Compact Variant

```tsx
<ContactFormPattern
  variant="compact"
  showPhoneField={false}
  title="Quick Contact"
  description="Brief message or question"
/>
```

### Custom Messages

```tsx
<ContactFormPattern
  successMessage="Thanks! We'll be in touch within 1 business day."
  errorMessage="Unable to send. Please email us directly at info@example.com"
/>
```

---

## Form Fields

### 1. Name Field

**Type:** Text input  
**Required:** Yes  
**Validation:** Min 1 character (trimmed)  
**Error Messages:**
- "Name is required" (empty)

**Accessibility:**
- Label: "Full Name *"
- Icon: User (decorative)
- Error: aria-invalid="true", aria-describedby="name-error"

### 2. Email Field

**Type:** Email input  
**Required:** Yes  
**Validation:** Valid email format (RFC 5322 simplified)  
**Error Messages:**
- "Email is required" (empty)
- "Please enter a valid email address" (invalid format)

**Accessibility:**
- Label: "Email Address *"
- Icon: Mail (decorative)
- Error: aria-invalid="true", aria-describedby="email-error"

### 3. Phone Field

**Type:** Tel input  
**Required:** No (optional)  
**Shown:** When `showPhoneField={true}`  
**Validation:** Digits, spaces, hyphens, plus, parentheses  
**Error Messages:**
- "Please enter a valid phone number" (invalid format)

**Accessibility:**
- Label: "Phone Number (Optional)"
- Icon: Phone (decorative)
- Error: aria-invalid="true", aria-describedby="phone-error"

### 4. Subject Field

**Type:** Select dropdown  
**Required:** Yes  
**Options:**
1. "Select a subject..." (placeholder)
2. "General Inquiry"
3. "Tour Booking"
4. "Accommodation Query"
5. "Special Offers"
6. "Feedback"
7. "Other"

**Error Messages:**
- "Subject is required" (empty)

**Accessibility:**
- Label: "Subject *"
- Error: aria-invalid="true", aria-describedby="subject-error"

### 5. Message Field

**Type:** Textarea  
**Required:** Yes  
**Rows:** 6  
**Validation:** Min 10 characters (trimmed)  
**Error Messages:**
- "Message is required" (empty)
- "Message must be at least 10 characters" (too short)

**Accessibility:**
- Label: "Your Message *"
- Placeholder: "Tell us how we can help you..."
- Error: aria-invalid="true", aria-describedby="message-error"

---

## States

### 1. Default State

- All fields empty
- No errors shown
- Submit button enabled
- No status messages

### 2. Typing State

- User is entering data
- Errors clear when user starts typing
- Real-time validation on blur

### 3. Validation Error State

- One or more fields have errors
- Error messages shown below fields
- Error fields have red border
- Submit button remains enabled
- Focus moves to first error field

### 4. Submitting State

- Form is submitting
- All fields disabled
- Submit button shows "Sending..." with spinner
- Submit button disabled
- No errors shown

### 5. Success State

- Form submitted successfully
- Green success message shown
- Form fields reset to empty
- Success message persists until page navigation
- Submit button re-enabled

### 6. Error State

- Submission failed
- Red error message shown
- Form fields retain values
- User can retry submission
- Submit button re-enabled

---

## Validation Rules

### Client-Side Validation

```typescript
const validationRules = {
  name: {
    required: true,
    minLength: 1,
    errorMessage: "Name is required"
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessages: {
      required: "Email is required",
      invalid: "Please enter a valid email address"
    }
  },
  phone: {
    required: false,
    pattern: /^[\d\s\-\+\(\)]+$/,
    errorMessage: "Please enter a valid phone number"
  },
  subject: {
    required: true,
    errorMessage: "Subject is required"
  },
  message: {
    required: true,
    minLength: 10,
    errorMessages: {
      required: "Message is required",
      minLength: "Message must be at least 10 characters"
    }
  }
};
```

### Validation Timing

- **On Blur:** Validate individual field when user leaves it
- **On Change:** Clear error when user starts typing
- **On Submit:** Validate all fields before submission

### Error Display

- Errors shown below field
- Red text color (`text-destructive`)
- Red border on field (`border-destructive`)
- ARIA announcements for screen readers

---

## Design System Compliance

### Colors

All colors use CSS variables:

```css
/* Backgrounds */
background: var(--background);
background: var(--card);
background: var(--muted);

/* Text */
color: var(--foreground);
color: var(--muted-foreground);
color: var(--destructive); /* errors */
color: var(--primary); /* success */

/* Borders */
border-color: var(--border);
border-color: var(--destructive); /* error state */

/* Focus */
ring-color: var(--ring);
```

### Typography

```css
/* Headings use Lora (serif) */
font-family: var(--font-family-lora);

/* Body text uses Noto Sans */
font-family: var(--font-family-noto-sans);

/* Labels use medium weight */
font-weight: var(--font-weight-medium); /* 500 */

/* Errors use normal weight */
font-weight: var(--font-weight-normal); /* 400 */
```

### Spacing

```css
/* Form field spacing */
margin-bottom: 1.5rem; /* 24px - gap between fields */

/* Input padding */
padding: 0.75rem 1rem; /* 12px 16px */

/* Section spacing */
padding: var(--spacing-section-md);
```

---

## Accessibility

### WCAG 2.1 AA Compliance

✅ **Form Labels:**
- All fields have explicit labels
- Labels use `htmlFor` + `id` association
- Required fields indicated with asterisk

✅ **Error Handling:**
- Errors announced with `aria-live="polite"`
- Error fields have `aria-invalid="true"`
- Error messages connected with `aria-describedby`
- Focus moves to first error on validation failure

✅ **Keyboard Navigation:**
- Full keyboard accessibility with Tab/Shift+Tab
- Enter submits form from any field
- Escape clears focus (browser default)

✅ **Screen Reader Support:**
- Form fields properly labeled
- Required fields announced
- Error messages announced
- Success/error status announced

✅ **Focus Management:**
- Visible focus indicators (ring)
- Logical tab order
- Focus trapped during submission

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move to next field |
| `Shift+Tab` | Move to previous field |
| `Enter` | Submit form (from any field) |
| `Escape` | Clear focus (browser default) |

---

## Mobile Optimization

### Touch Targets

All interactive elements meet minimum touch target size:
- Input fields: 48px height
- Submit button: 48px height
- All targets 44px × 44px minimum

### Input Types

Optimized input types trigger correct mobile keyboards:
- `type="text"` - Standard keyboard
- `type="email"` - Email keyboard (@ key)
- `type="tel"` - Phone keyboard (numeric)

### Responsive Layout

```tsx
// Stacks on mobile, side-by-side on desktop
<div className="grid md:grid-cols-2 gap-6">
  <NameField />
  <EmailField />
</div>
```

---

## Performance

### Optimization Strategies

1. **Debounced Validation:** Validation debounced to reduce re-renders
2. **Memoization:** Form state memoized to prevent unnecessary updates
3. **Lazy Loading:** Icons lazy loaded on first render
4. **Error Cleanup:** Error messages cleared after 5 seconds

### Bundle Size

- Component: ~8KB (minified)
- Dependencies: Lucide icons (~2KB)
- Total: ~10KB

---

## Security

### Input Sanitization

All inputs sanitized before submission:
- HTML entities escaped automatically (React)
- XSS protection via React's built-in escaping
- No `dangerouslySetInnerHTML` used

### Data Handling

- No sensitive data stored in component state
- Form data cleared after successful submission
- No data persisted to localStorage

### CSRF Protection

Form submissions should include CSRF tokens when integrating with backend:

```tsx
<ContactFormPattern
  onSubmit={async (data) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    
    await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken || '',
      },
      body: JSON.stringify(data),
    });
  }}
/>
```

---

## Conversion Optimization

### Best Practices

1. **Clear Value Proposition:** Use descriptive title and description
2. **Minimize Fields:** Use `showPhoneField={false}` if phone not required
3. **Helpful Placeholder Text:** Guide users on what to enter
4. **Immediate Feedback:** Show errors as user types (after blur)
5. **Success Messaging:** Clear confirmation of submission
6. **Mobile-First:** Optimized for mobile form filling

### A/B Testing Recommendations

Test these variants:
- With/without phone field
- Different success message text
- Compact vs default variant
- Subject dropdown order

---

## WordPress Integration

### Block Pattern Registration

```php
register_block_pattern(
  'lightspeed/contact-form',
  array(
    'title' => __('Contact Form', 'lightspeed'),
    'description' => __('A comprehensive contact form with validation', 'lightspeed'),
    'categories' => array('lightspeed-utility'),
    'content' => '<!-- wp:group {"layout":{"type":"constrained"}} -->
      <div class="wp-block-group">
        <!-- Contact Form 7 or Gravity Forms block -->
      </div>
      <!-- /wp:group -->',
  )
);
```

### Form Handler Integration

Integrate with WordPress form plugins:

**Contact Form 7:**
```php
[contact-form-7 id="123" title="Contact Form"]
```

**Gravity Forms:**
```php
[gravityform id="1" title="false" description="false"]
```

---

## Testing

### Unit Tests

Required test coverage:

```typescript
describe('ContactFormPattern', () => {
  // Rendering tests
  test('renders all form fields');
  test('shows/hides phone field based on prop');
  
  // Validation tests
  test('validates required fields');
  test('validates email format');
  test('validates phone format');
  test('validates message length');
  
  // Interaction tests
  test('submits form with valid data');
  test('prevents submission with invalid data');
  test('clears errors on input change');
  
  // State tests
  test('shows loading state during submission');
  test('shows success message on success');
  test('shows error message on failure');
  
  // Accessibility tests
  test('has accessible labels');
  test('announces errors to screen readers');
  test('supports keyboard navigation');
});
```

### Integration Tests

```typescript
test('full form submission workflow', async () => {
  render(<ContactFormPattern onSubmit={mockSubmit} />);
  
  // Fill form
  await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
  await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
  await userEvent.selectOptions(screen.getByLabelText(/subject/i), 'general');
  await userEvent.type(screen.getByLabelText(/message/i), 'Test message');
  
  // Submit
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  // Verify
  expect(mockSubmit).toHaveBeenCalledWith(expectedData);
});
```

---

## Troubleshooting

### Common Issues

**Issue:** Form submits even with validation errors
**Solution:** Ensure `validateForm()` returns false on errors

**Issue:** Errors don't clear when typing
**Solution:** Call `setErrors()` in `handleChange` function

**Issue:** Success message doesn't show
**Solution:** Ensure `onSubmit` resolves successfully (no throw)

**Issue:** Phone validation fails for valid numbers
**Solution:** Update phone regex to match your format requirements

---

## Related Components

- **NewsletterSignupPattern** - Simpler email-only signup
- **SearchFilterPattern** - Search and filter forms
- **GroupBlock** - Wrapper for section styling

---

## Change Log

### Version 1.0.0 (December 27, 2024)
- Initial release
- Full form validation
- Success/error states
- Accessibility compliant
- Mobile optimized

---

**Last Updated:** December 27, 2024  
**Maintained By:** Development Team  
**Status:** Production Ready
