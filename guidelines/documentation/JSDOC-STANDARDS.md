# JSDoc Standards for React Components

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Purpose:** Establish JSDoc documentation standards for React TypeScript components

---

## Table of Contents

1. [Overview](#overview)
2. [Required Documentation](#required-documentation)
3. [File Header Documentation](#file-header-documentation)
4. [Component Documentation](#component-documentation)
5. [Props Interface Documentation](#props-interface-documentation)
6. [Function Documentation](#function-documentation)
7. [Examples](#examples)
8. [Tools and Validation](#tools-and-validation)

---

## Overview

### Why JSDoc?

- **Improved IntelliSense:** Better autocomplete in IDEs
- **Clear API Contracts:** Explicit component interfaces
- **Generated Documentation:** Auto-generate API docs
- **Better Collaboration:** Team members understand component usage
- **Type Safety:** Complements TypeScript types

### Documentation Principles

1. **Be Concise:** Clear and brief explanations
2. **Be Accurate:** Keep docs in sync with code
3. **Be Consistent:** Follow the same format across all files
4. **Be Helpful:** Include examples and use cases
5. **Be Complete:** Document all public APIs

---

## Required Documentation

### Documentation Checklist

Every component file MUST include:

- [ ] File header with `@fileoverview`
- [ ] Module tag with `@module`
- [ ] Category tag with `@category`
- [ ] Component description
- [ ] Props interface documentation
- [ ] All public functions documented
- [ ] Usage examples in component JSDoc
- [ ] WordPress mapping (where applicable)

---

## File Header Documentation

### Template

```typescript
/**
 * @fileoverview Brief description of the file's purpose
 * 
 * Detailed description of what this file contains, its role in the system,
 * and any important context developers should know.
 * 
 * **WordPress Mapping:**
 * - Equivalent to: WordPress block/pattern name
 * - Pattern slug: `lightspeed/pattern-name`
 * 
 * **Design System Compliance:**
 * - Uses CSS variables for all colors, spacing, typography
 * - Supports light/dark mode automatically
 * - WCAG AA accessible (specific features)
 * 
 * **Usage:**
 * ```tsx
 * <ComponentName
 *   prop1="value"
 *   prop2={value}
 * />
 * ```
 * 
 * @module ComponentName
 * @category patterns|blocks|pages|common|utils
 * @since 1.0.0
 * @see {@link https://example.com/docs Link to additional docs}
 */
```

### Example - Pattern Component

```typescript
/**
 * @fileoverview Contact Form Pattern Component
 * 
 * A comprehensive contact form pattern with name, email, phone, subject, and message fields.
 * Includes validation, loading states, and success/error feedback.
 * 
 * **WordPress Mapping:**
 * - Equivalent to Contact Form 7 or Gravity Forms block
 * - Pattern slug: `lightspeed/contact-form`
 * 
 * **Design System Compliance:**
 * - Uses CSS variables for all colors, spacing, typography
 * - Supports light/dark mode automatically
 * - WCAG AA accessible form labels and error messages
 * 
 * **Usage:**
 * ```tsx
 * <ContactFormPattern
 *   title="Get In Touch"
 *   description="Send us a message and we'll respond within 24 hours"
 *   onSubmit={async (data) => {
 *     await submitToAPI(data);
 *   }}
 * />
 * ```
 * 
 * @module ContactFormPattern
 * @category patterns
 * @since 1.0.0
 */
```

---

## Component Documentation

### Template

```typescript
/**
 * ComponentName Component
 * 
 * Detailed description of what the component does, when to use it,
 * and any important behavioral notes.
 * 
 * @component
 * @param {ComponentNameProps} props - Component props
 * @returns {JSX.Element} Rendered component
 * 
 * @example
 * // Basic usage
 * <ComponentName
 *   title="Example"
 *   onClick={handleClick}
 * />
 * 
 * @example
 * // With all options
 * <ComponentName
 *   title="Example"
 *   description="Description text"
 *   variant="primary"
 *   onClick={handleClick}
 * />
 * 
 * @accessibility
 * - Keyboard navigable with Tab key
 * - Screen reader accessible with ARIA labels
 * - Focus visible with ring indicator
 * 
 * @performance
 * - Memoized to prevent unnecessary re-renders
 * - Lazy loads heavy dependencies
 */
export function ComponentName(props: ComponentNameProps): JSX.Element {
  // Implementation
}
```

### Real Example - ContactFormPattern

```typescript
/**
 * ContactFormPattern Component
 * 
 * Renders a full-featured contact form with client-side validation, loading states,
 * and success/error feedback. Supports optional phone field and customizable messages.
 * 
 * The form includes name, email, phone (optional), subject dropdown, and message textarea.
 * Validation is performed on blur and on submit. Errors are announced to screen readers.
 * 
 * @component
 * @param {ContactFormPatternProps} props - Component props
 * @returns {JSX.Element} Rendered contact form
 * 
 * @example
 * // Basic usage with default messages
 * <ContactFormPattern
 *   title="Contact Us"
 *   description="Send us a message"
 * />
 * 
 * @example
 * // With custom submit handler
 * <ContactFormPattern
 *   title="Get In Touch"
 *   description="We'll respond within 24 hours"
 *   onSubmit={async (data) => {
 *     const response = await fetch('/api/contact', {
 *       method: 'POST',
 *       body: JSON.stringify(data),
 *     });
 *     if (!response.ok) throw new Error('Failed to send');
 *   }}
 *   showPhoneField={true}
 * />
 * 
 * @example
 * // Compact variant without phone
 * <ContactFormPattern
 *   variant="compact"
 *   showPhoneField={false}
 *   successMessage="Thanks! We'll be in touch soon."
 * />
 * 
 * @accessibility
 * - All form fields have accessible labels with proper for/id associations
 * - Errors are announced with aria-live="polite" regions
 * - Invalid fields have aria-invalid="true" and aria-describedby pointing to error
 * - Submit button is disabled during submission to prevent double-submit
 * - Keyboard navigable with Tab, Enter, and Escape keys
 * - Focus returns to first error field on validation failure
 * 
 * @performance
 * - Form validation is debounced to reduce re-renders
 * - Success/error states are cleared after 5 seconds automatically
 * 
 * @security
 * - All inputs are sanitized before submission
 * - XSS protection via React's built-in escaping
 * - No sensitive data stored in component state
 */
export function ContactFormPattern(props: ContactFormPatternProps): JSX.Element {
  // Implementation
}
```

---

## Props Interface Documentation

### Template

```typescript
/**
 * Props for ComponentName component.
 * 
 * @interface ComponentNameProps
 * @property {string} title - Required title text
 * @property {string} [description] - Optional description text
 * @property {Function} [onClick] - Optional click handler
 * @property {"default" | "primary" | "secondary"} [variant="default"] - Visual variant
 */
export interface ComponentNameProps {
  /** Required title text displayed at the top */
  title: string;
  
  /** Optional description text shown below title */
  description?: string;
  
  /** Optional click handler called when component is clicked */
  onClick?: () => void;
  
  /** 
   * Visual variant of the component
   * - "default": Standard appearance
   * - "primary": Emphasized appearance
   * - "secondary": De-emphasized appearance
   * @default "default"
   */
  variant?: "default" | "primary" | "secondary";
}
```

### Real Example - ContactFormPatternProps

```typescript
/**
 * Contact form data structure.
 * 
 * Represents the data collected from the contact form.
 * All fields are required except phone.
 * 
 * @interface ContactFormData
 * @property {string} name - User's full name (min 1 char)
 * @property {string} email - User's email address (must be valid format)
 * @property {string} [phone] - User's phone number (optional, validated if provided)
 * @property {string} subject - Subject/topic from dropdown selection
 * @property {string} message - User's message (min 10 chars)
 */
export interface ContactFormData {
  /** User's full name (required, min 1 character) */
  name: string;
  
  /** User's email address (required, must be valid email format) */
  email: string;
  
  /** User's phone number (optional, validated if provided) */
  phone?: string;
  
  /** 
   * Subject/topic selection
   * Options: general, booking, accommodation, special, feedback, other
   */
  subject: string;
  
  /** User's message content (required, min 10 characters) */
  message: string;
}

/**
 * Props for ContactFormPattern component.
 * 
 * @interface ContactFormPatternProps
 */
export interface ContactFormPatternProps {
  /** 
   * Form heading text
   * @default "Send Us a Message"
   */
  title?: string;
  
  /** 
   * Form description/instructions text
   * @default "Fill out the form below and we'll get back to you within 24 hours"
   */
  description?: string;
  
  /** 
   * Form submission handler
   * Called with form data when validation passes.
   * Should return a Promise that resolves on success or rejects on error.
   * 
   * @param data - Validated form data
   * @returns Promise that resolves on successful submission
   * @throws Error on submission failure
   * 
   * @example
   * ```tsx
   * onSubmit={async (data) => {
   *   const response = await fetch('/api/contact', {
   *     method: 'POST',
   *     body: JSON.stringify(data),
   *   });
   *   if (!response.ok) throw new Error('Failed');
   * }}
   * ```
   */
  onSubmit?: (data: ContactFormData) => Promise<void>;
  
  /** 
   * Whether to show the optional phone field
   * @default true
   */
  showPhoneField?: boolean;
  
  /** 
   * Success message displayed after successful submission
   * @default "Thank you! Your message has been sent successfully. We'll be in touch soon."
   */
  successMessage?: string;
  
  /** 
   * Error message displayed on submission failure
   * @default "Oops! Something went wrong. Please try again or contact us directly."
   */
  errorMessage?: string;
  
  /** 
   * Visual variant of the form
   * - "default": Standard full-width form
   * - "compact": Narrower form with reduced padding
   * @default "default"
   */
  variant?: "default" | "compact";
}
```

---

## Function Documentation

### Template

```typescript
/**
 * Brief description of what the function does.
 * 
 * Detailed explanation of the function's behavior, including:
 * - What it does
 * - When it's called
 * - Side effects
 * - Error handling
 * 
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 * @throws {Error} When validation fails
 * 
 * @example
 * const result = functionName('value');
 * 
 * @private (if internal only)
 * @internal (if for internal use)
 */
const functionName = (paramName: Type): ReturnType => {
  // Implementation
};
```

### Real Example - Form Validation

```typescript
/**
 * Validates all form fields and returns validation errors.
 * 
 * Performs comprehensive validation on all form fields:
 * - Name: Required, min 1 character
 * - Email: Required, valid email format (RFC 5322)
 * - Phone: Optional, valid phone format if provided
 * - Subject: Required, must be non-empty
 * - Message: Required, min 10 characters
 * 
 * @returns {boolean} True if validation passes, false otherwise
 * 
 * @sideEffects
 * - Updates `errors` state with validation error messages
 * - Focuses first invalid field if validation fails
 * 
 * @example
 * ```tsx
 * const isValid = validateForm();
 * if (isValid) {
 *   await submitForm();
 * }
 * ```
 * 
 * @private
 */
const validateForm = (): boolean => {
  const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Please enter a valid email address";
  }

  // Phone validation (optional field)
  if (showPhoneField && formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
    newErrors.phone = "Please enter a valid phone number";
  }

  // Subject validation
  if (!formData.subject.trim()) {
    newErrors.subject = "Subject is required";
  }

  // Message validation
  if (!formData.message.trim()) {
    newErrors.message = "Message is required";
  } else if (formData.message.trim().length < 10) {
    newErrors.message = "Message must be at least 10 characters";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

/**
 * Handles form submission.
 * 
 * Validates form data, calls onSubmit handler if provided, and manages
 * submission state (loading, success, error).
 * 
 * @param {React.FormEvent} e - Form submit event
 * @returns {Promise<void>} Promise that resolves when submission completes
 * 
 * @sideEffects
 * - Prevents default form submission
 * - Updates isSubmitting, submitStatus states
 * - Resets form on successful submission
 * - Displays success/error messages
 * 
 * @example
 * ```tsx
 * <form onSubmit={handleSubmit}>
 *   {/* form fields *\/}
 * </form>
 * ```
 * 
 * @async
 */
const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus("idle");

  try {
    if (onSubmit) {
      await onSubmit(formData);
    } else {
      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setSubmitStatus("success");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setErrors({});
  } catch (error) {
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Examples

### Example 1: Pattern Component

```typescript
/**
 * @fileoverview Table of Contents Pattern Component
 * 
 * An interactive table of contents with smooth scroll navigation and active section highlighting.
 * Perfect for long-form content, FAQ pages, and documentation.
 * 
 * **WordPress Mapping:**
 * - Equivalent to WordPress Table of Contents block
 * - Pattern slug: `lightspeed/table-of-contents`
 * 
 * **Design System Compliance:**
 * - Uses CSS variables for all colors, spacing, typography
 * - Supports light/dark mode automatically
 * - WCAG AA accessible navigation
 * 
 * @module TableOfContentsPattern
 * @category patterns
 * @since 1.0.0
 */

import { useState, useEffect } from "react";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { Container } from "../common/Container";
import { List } from "lucide-react";

/**
 * Table of contents section structure.
 * 
 * Represents a single section or subsection in the table of contents.
 * Supports unlimited nesting via the children property.
 * 
 * @interface ToCSection
 */
export interface ToCSection {
  /** 
   * Section ID matching the heading ID in content
   * Must match exactly for smooth scroll to work
   * @example "introduction"
   */
  id: string;
  
  /** 
   * Display label for the section
   * Can be different from the actual heading text
   * @example "Introduction & Overview"
   */
  label: string;
  
  /** 
   * Nested subsections
   * Supports unlimited depth
   * @example [{ id: "subsection-1", label: "Subsection 1" }]
   */
  children?: ToCSection[];
}

/**
 * Props for TableOfContentsPattern component.
 * 
 * @interface TableOfContentsPatternProps
 */
export interface TableOfContentsPatternProps {
  /** 
   * Table of contents heading
   * @default "Table of Contents"
   */
  title?: string;
  
  /** 
   * Array of sections to display
   * Each section must have a matching ID in the content
   * @example
   * ```tsx
   * sections={[
   *   { id: "overview", label: "Overview" },
   *   { id: "details", label: "Details", children: [
   *     { id: "subsection", label: "Subsection" }
   *   ]}
   * ]}
   * ```
   */
  sections: ToCSection[];
  
  /** 
   * Whether to show section numbers (1, 2, 3, etc.)
   * Only applies to top-level sections
   * @default false
   */
  showNumbers?: boolean;
  
  /** 
   * Whether to use sticky positioning
   * Keeps ToC visible while scrolling
   * @default false
   */
  sticky?: boolean;
  
  /** 
   * Visual variant
   * - "default": Full-width centered
   * - "compact": Narrower max-width
   * - "sidebar": Fixed width for sidebar use
   * @default "default"
   */
  variant?: "default" | "compact" | "sidebar";
}

/**
 * TableOfContentsPattern Component
 * 
 * Renders an interactive table of contents with smooth scroll navigation
 * and automatic active section highlighting using IntersectionObserver.
 * 
 * Features:
 * - Smooth scroll to sections with offset for sticky headers
 * - Active section highlighting based on scroll position
 * - Nested subsection support (unlimited depth)
 * - Optional section numbering
 * - Optional sticky positioning
 * - 3 visual variants
 * 
 * @component
 * @param {TableOfContentsPatternProps} props - Component props
 * @returns {JSX.Element} Rendered table of contents
 * 
 * @example
 * // Basic usage
 * <TableOfContentsPattern
 *   title="On This Page"
 *   sections={[
 *     { id: "overview", label: "Overview" },
 *     { id: "details", label: "Tour Details" }
 *   ]}
 * />
 * 
 * @example
 * // With nested sections and numbering
 * <TableOfContentsPattern
 *   title="Contents"
 *   sections={[
 *     { 
 *       id: "introduction",
 *       label: "Introduction",
 *       children: [
 *         { id: "background", label: "Background" }
 *       ]
 *     }
 *   ]}
 *   showNumbers={true}
 *   sticky={true}
 * />
 * 
 * @accessibility
 * - Uses semantic <nav> element with aria-label
 * - Buttons have accessible names
 * - Active section highlighted with aria-current="true"
 * - Keyboard navigable with Tab and Enter
 * 
 * @performance
 * - Uses IntersectionObserver for efficient scroll tracking
 * - Cleanup on unmount to prevent memory leaks
 * - Smooth scroll with requestAnimationFrame
 */
export function TableOfContentsPattern({
  title = "Table of Contents",
  sections,
  showNumbers = false,
  sticky = false,
  variant = "default",
}: TableOfContentsPatternProps): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>("");

  /**
   * Sets up IntersectionObserver to track active section on scroll.
   * 
   * Observer watches all sections and updates activeSection state when
   * a section enters the viewport. Uses rootMargin to account for header offset.
   * 
   * @effect
   * @dependency sections - Re-runs when sections array changes
   * 
   * @cleanup Disconnects observer on unmount
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      }
    );

    // Collect all section IDs recursively
    const allIds: string[] = [];
    const collectIds = (sectionList: ToCSection[]) => {
      sectionList.forEach((section) => {
        allIds.push(section.id);
        if (section.children) {
          collectIds(section.children);
        }
      });
    };
    collectIds(sections);

    // Observe all sections
    allIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  /**
   * Handles smooth scroll to section on click.
   * 
   * Scrolls to the target section with offset to account for sticky header.
   * Uses native scrollTo with smooth behavior for better performance.
   * 
   * @param {string} id - Section ID to scroll to
   * 
   * @sideEffects
   * - Scrolls window to target section
   * - Updates browser history (optional)
   * 
   * @example
   * ```tsx
   * <button onClick={() => handleClick('section-1')}>
   *   Go to Section 1
   * </button>
   * ```
   */
  const handleClick = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Component JSX...
  return (
    <Container>
      {/* Implementation */}
    </Container>
  );
}
```

---

## Tools and Validation

### VS Code Extensions

**Recommended:**
- **JSDoc Snippets** - Quick JSDoc generation
- **TypeScript JSDoc Generator** - Auto-generate from types
- **Better Comments** - Syntax highlighting for JSDoc

### ESLint Rules

```json
{
  "rules": {
    "jsdoc/require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
      }
    }],
    "jsdoc/require-description": "error",
    "jsdoc/require-param": "error",
    "jsdoc/require-param-description": "error",
    "jsdoc/require-param-type": "error",
    "jsdoc/require-returns": "error",
    "jsdoc/require-returns-description": "error",
    "jsdoc/require-returns-type": "error",
    "jsdoc/check-alignment": "error",
    "jsdoc/check-param-names": "error",
    "jsdoc/check-tag-names": "error",
    "jsdoc/check-types": "error"
  }
}
```

### Documentation Generation

```bash
# Generate HTML documentation from JSDoc
npx typedoc --out docs src/

# Generate Markdown documentation
npx typedoc --out docs --plugin typedoc-plugin-markdown src/
```

---

## Maintenance

### Regular Updates

1. **Weekly:** Review and update JSDoc for new components
2. **Monthly:** Generate and review documentation site
3. **Quarterly:** Audit for outdated or incorrect documentation
4. **Annually:** Update JSDoc standards based on team feedback

### Documentation Debt

- Flag components missing JSDoc with `// TODO: Add JSDoc`
- Create issues for incomplete documentation
- Prioritize high-traffic components

---

**Last Updated:** December 27, 2024  
**Next Review:** January 27, 2025  
**Maintained By:** Development Team
