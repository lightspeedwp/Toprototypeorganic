# How to Migrate Existing Components to Design System

**Step-by-step guide for updating components to use CSS variables.**

---

## 🎯 Overview

This guide shows you how to take an existing component with hardcoded values and migrate it to use CSS variables from the design system.

---

## 📋 Migration Checklist

For each component:

- [ ] Remove all hardcoded colors
- [ ] Remove all inline styles
- [ ] Remove all `dark:` classes
- [ ] Ensure only defined fonts are used
- [ ] Create external CSS file with BEM naming
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Test customization by editing CSS variables

---

## 🔍 Example 1: Simple Button Migration

### ❌ Before (Non-Compliant)

```tsx
// OldButton.tsx
export function OldButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#4a7311',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '6px',
        border: 'none',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
      className="hover:opacity-80 dark:bg-green-700"
    >
      {children}
    </button>
  );
}
```

**Problems:**
- ❌ Hardcoded color `#4a7311`
- ❌ Hardcoded color `white`
- ❌ Inline styles
- ❌ Hardcoded font `Arial`
- ❌ `dark:` class
- ❌ No BEM naming

---

### ✅ After (Compliant)

```tsx
// Button.tsx
import { cn } from "../../lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function Button({ 
  children, 
  onClick, 
  variant = "primary",
  size = "default",
  className 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "button",
        `button--${variant}`,
        `button--${size}`,
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
```

```css
/* button.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: opacity 200ms ease;
}

.button:hover {
  opacity: 0.9;
}

.button--secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.button--outline {
  background-color: transparent;
  color: var(--primary);
  border: 2px solid var(--border);
}

.button--sm {
  padding: 0.5rem 1rem;
  font-size: var(--text-sm);
}

.button--lg {
  padding: 1rem 2rem;
  font-size: var(--text-lg);
}
```

**Import in global.css:**
```css
@import './components/button.css';
```

**Benefits:**
- ✅ All colors from CSS variables
- ✅ No inline styles
- ✅ No `dark:` classes (automatic via CSS variables)
- ✅ Uses defined font (Noto Sans)
- ✅ BEM naming convention
- ✅ Variants for flexibility
- ✅ User can customize by editing CSS

---

## 🔍 Example 2: Card Component Migration

### ❌ Before (Non-Compliant)

```tsx
// OldCard.tsx
export function OldCard({ title, description, image }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
      className="dark:bg-gray-800 dark:border-gray-700"
    >
      <img 
        src={image} 
        alt={title}
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '16px'
        }}
      />
      <h3 
        style={{ 
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '8px',
          fontFamily: 'Georgia, serif'
        }}
        className="dark:text-white"
      >
        {title}
      </h3>
      <p 
        style={{ 
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.5'
        }}
        className="dark:text-gray-300"
      >
        {description}
      </p>
    </div>
  );
}
```

**Problems:**
- ❌ Hardcoded colors everywhere
- ❌ All inline styles
- ❌ Multiple `dark:` classes
- ❌ Hardcoded font `Georgia`
- ❌ No BEM naming
- ❌ Not customizable

---

### ✅ After (Compliant)

```tsx
// Card.tsx
import { cn } from "../../lib/utils";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  className?: string;
}

export function Card({ title, description, image, className }: CardProps) {
  return (
    <article className={cn("wp-pattern-card", className)}>
      {image && (
        <img 
          src={image} 
          alt={title}
          className="wp-pattern-card__image"
        />
      )}
      <div className="wp-pattern-card__content">
        <h3 className="wp-pattern-card__title">{title}</h3>
        <p className="wp-pattern-card__description">{description}</p>
      </div>
    </article>
  );
}

export default Card;
```

```css
/* card.css */
.wp-pattern-card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--elevation-sm);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.wp-pattern-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--elevation-md);
}

.wp-pattern-card__image {
  width: 100%;
  height: 12.5rem;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}

.wp-pattern-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.wp-pattern-card__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--card-foreground);
  line-height: var(--leading-tight);
}

.wp-pattern-card__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  color: var(--muted-foreground);
  line-height: var(--leading-normal);
}

@media (prefers-reduced-motion: reduce) {
  .wp-pattern-card {
    transition: none;
  }
  
  .wp-pattern-card:hover {
    transform: none;
  }
}
```

**Benefits:**
- ✅ All colors from CSS variables
- ✅ External CSS with BEM naming
- ✅ No `dark:` classes needed
- ✅ Uses defined fonts (Lora, Noto Sans)
- ✅ Semantic HTML (`article`, `h3`, `p`)
- ✅ Accessible (reduced motion support)
- ✅ User can customize by editing CSS

---

## 🔍 Example 3: Hero Section Migration

### ❌ Before (Non-Compliant)

```tsx
// OldHero.tsx
export function OldHero({ title, subtitle, cta }) {
  return (
    <div 
      style={{
        backgroundColor: '#4a7311',
        padding: '80px 20px',
        textAlign: 'center'
      }}
      className="dark:bg-green-900"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif'
          }}
        >
          {title}
        </h1>
        <p 
          style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '32px',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          {subtitle}
        </p>
        <button
          style={{
            backgroundColor: 'white',
            color: '#4a7311',
            padding: '16px 32px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          className="hover:opacity-90"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
```

---

### ✅ After (Compliant)

```tsx
// Hero.tsx
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  onCtaClick?: () => void;
  className?: string;
}

export function Hero({ 
  title, 
  subtitle, 
  cta, 
  onCtaClick,
  className 
}: HeroProps) {
  return (
    <section className={cn("wp-pattern-hero", className)}>
      <Container>
        <div className="wp-pattern-hero__content">
          <h1 className="wp-pattern-hero__title">{title}</h1>
          <p className="wp-pattern-hero__subtitle">{subtitle}</p>
          <button 
            className="wp-pattern-hero__cta"
            onClick={onCtaClick}
          >
            {cta}
          </button>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
```

```css
/* hero.css */
.wp-pattern-hero {
  padding-top: var(--spacing-section-lg);
  padding-bottom: var(--spacing-section-lg);
  background-color: var(--primary);
  color: var(--primary-foreground);
  text-align: center;
}

.wp-pattern-hero__content {
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
}

.wp-pattern-hero__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-foreground);
  line-height: var(--leading-tight);
  margin-bottom: 1rem;
}

.wp-pattern-hero__subtitle {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-xl);
  color: var(--primary-foreground);
  opacity: 0.9;
  line-height: var(--leading-normal);
  margin-bottom: 2rem;
}

.wp-pattern-hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: var(--background);
  color: var(--primary);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: opacity 200ms ease;
}

.wp-pattern-hero__cta:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .wp-pattern-hero__title {
    font-size: var(--text-4xl);
  }
  
  .wp-pattern-hero__subtitle {
    font-size: var(--text-lg);
  }
}
```

---

## 🛠️ Migration Process

### Step 1: Identify Issues

Run the audit script:

```bash
./scripts/audit-design-system.sh
```

Or manually search:

```bash
# Find hardcoded colors
grep -rn "#[0-9a-fA-F]\{6\}" src/app/components/MyComponent.tsx

# Find inline styles
grep -rn "style={{" src/app/components/MyComponent.tsx

# Find dark: classes
grep -rn "dark:" src/app/components/MyComponent.tsx
```

---

### Step 2: Create CSS File

1. Create `/src/styles/{category}/{component-name}.css`
2. Add BEM classes
3. Use CSS variables for all values

```css
/* Template */
.wp-{category}-{component} {
  /* Use CSS variables */
  background-color: var(--card);
  color: var(--card-foreground);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
}

.wp-{category}-{component}__element {
  /* Element styling */
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
}

.wp-{category}-{component}--modifier {
  /* Modifier styling */
  background-color: var(--primary);
}
```

---

### Step 3: Update React Component

1. Remove all inline styles
2. Remove all `dark:` classes
3. Replace with BEM class names
4. Add TypeScript interfaces
5. Add semantic HTML

```tsx
// Template
import { cn } from "../../lib/utils";

interface MyComponentProps {
  // Props
}

export function MyComponent({ ...props }: MyComponentProps) {
  return (
    <div className={cn(
      "wp-pattern-my-component",
      props.variant && `wp-pattern-my-component--${props.variant}`,
      props.className
    )}>
      {/* Content */}
    </div>
  );
}

export default MyComponent;
```

---

### Step 4: Import CSS

Add to `/src/styles/global.css`:

```css
@import './patterns/my-component.css';
```

---

### Step 5: Test

1. **Visual Test:**
   - [ ] Light mode looks correct
   - [ ] Dark mode looks correct
   - [ ] Responsive on mobile, tablet, desktop

2. **Customization Test:**
   - [ ] Edit `--primary` in theme-light.css
   - [ ] Component updates automatically
   - [ ] Change other variables
   - [ ] Verify updates work

3. **Accessibility Test:**
   - [ ] Keyboard navigation works
   - [ ] Focus states visible
   - [ ] Screen reader compatible

---

## 📊 Common Patterns

### Color Mapping

| Old (Hardcoded) | New (CSS Variable) |
|----------------|-------------------|
| `#4a7311` | `var(--primary)` |
| `white` | `var(--primary-foreground)` |
| `#f3f4f6` | `var(--muted)` |
| `#1f2937` | `var(--foreground)` |
| `#6b7280` | `var(--muted-foreground)` |

---

### Font Mapping

| Old (Hardcoded) | New (CSS Variable) |
|----------------|-------------------|
| `Arial`, `Helvetica` | `var(--font-family-noto-sans)` |
| `Georgia`, `Times` | `var(--font-family-lora)` |
| `Courier`, `monospace` | `var(--font-family-mono)` |

---

### Spacing Mapping

| Old (Hardcoded) | New (CSS Variable or Tailwind) |
|----------------|-------------------------------|
| `padding: '20px'` | `padding: 1.25rem` or `p-5` |
| `margin: '16px'` | `margin: 1rem` or `m-4` |
| `gap: '12px'` | `gap: 0.75rem` or `gap-3` |

---

## 🎯 Migration Checklist by Component Type

### Buttons
- [ ] Background color → `var(--primary)`
- [ ] Text color → `var(--primary-foreground)`
- [ ] Font → `var(--font-family-noto-sans)`
- [ ] Border radius → `var(--radius-md)`
- [ ] Hover state uses opacity or CSS variable

### Cards
- [ ] Background → `var(--card)`
- [ ] Text → `var(--card-foreground)`
- [ ] Border → `var(--border)`
- [ ] Border radius → `var(--radius-lg)`
- [ ] Shadow → `var(--elevation-sm)`

### Headings
- [ ] Font → `var(--font-family-lora)`
- [ ] Weight → `var(--font-weight-semibold)` or `bold`
- [ ] Color → `var(--foreground)` or semantic
- [ ] Use semantic HTML (`h1`, `h2`, etc.)

### Body Text
- [ ] Font → `var(--font-family-noto-sans)`
- [ ] Weight → `var(--font-weight-normal)`
- [ ] Color → `var(--foreground)` or `var(--muted-foreground)`
- [ ] Line height → `var(--leading-normal)`

---

## 🚀 Quick Migration Script

Save as `/scripts/migrate-component.sh`:

```bash
#!/bin/bash

COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: ./migrate-component.sh MyComponent"
  exit 1
fi

echo "Migrating $COMPONENT_NAME..."
echo ""

# Check current violations
echo "Current violations:"
grep -n "style={{" "src/app/components/**/$COMPONENT_NAME.tsx" 2>/dev/null
grep -n "dark:" "src/app/components/**/$COMPONENT_NAME.tsx" 2>/dev/null
grep -n "#[0-9a-fA-F]\{6\}" "src/app/components/**/$COMPONENT_NAME.tsx" 2>/dev/null

echo ""
echo "✅ Next steps:"
echo "1. Create CSS file: src/styles/patterns/${COMPONENT_NAME,,}.css"
echo "2. Move all styles to CSS file using CSS variables"
echo "3. Update component to use BEM classes"
echo "4. Import CSS in global.css"
echo "5. Test in light and dark mode"
```

---

## 📚 Resources

- **Component Guide:** `/docs/NEW-COMPONENT-GUIDE.md`
- **Token Reference:** `/docs/DESIGN-TOKENS-REFERENCE.md`
- **Compliance Checklist:** `/docs/DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md`
- **Quick Reference:** `/docs/QUICK-REFERENCE.md`

---

**Remember:** Every hardcoded value prevents user customization. Use CSS variables for everything! 🎨
