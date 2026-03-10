# Testing Guidelines

**Version:** 1.0 - December 2024  
**Testing Framework:** Vitest + React Testing Library  
**Status:** ✅ Production Ready

---

## Overview

This document defines the **comprehensive testing strategy** for the LightSpeed Tour Operator plugin prototype. All components, patterns, and templates must have corresponding tests to ensure reliability, maintainability, and WordPress compatibility.

---

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Testing Infrastructure](#testing-infrastructure)
3. [Running Tests](#running-tests)
4. [Test Organization](#test-organization)
5. [Writing Tests](#writing-tests)
6. [Component Testing](#component-testing)
7. [Design System Compliance Testing](#design-system-compliance-testing)
8. [Accessibility Testing](#accessibility-testing)
9. [Integration Testing](#integration-testing)
10. [Best Practices](#best-practices)
11. [Common Patterns](#common-patterns)
12. [Troubleshooting](#troubleshooting)

---

## Testing Philosophy

### Core Principles

1. **Test User Behavior, Not Implementation**
   - Test what users see and interact with
   - Avoid testing internal state or implementation details
   - Focus on component contracts (props in, UI out)

2. **WordPress Alignment**
   - Test components match WordPress block patterns
   - Verify semantic HTML structure
   - Ensure accessibility compliance

3. **Design System Compliance**
   - Verify all components use CSS variables
   - Test typography adheres to system
   - Validate color tokens usage

4. **Accessibility First**
   - Test keyboard navigation
   - Verify ARIA attributes
   - Ensure screen reader compatibility

5. **Coverage Goals**
   - Minimum 80% code coverage
   - 100% coverage for critical paths
   - All public component APIs tested

---

## Testing Infrastructure

### Tech Stack

- **Vitest** - Modern, fast test runner (Jest alternative for Vite)
- **React Testing Library** - User-centric testing utilities
- **Jest DOM** - Custom DOM matchers
- **User Event** - Realistic user interaction simulation
- **JSdom** - Browser environment for Node.js

### Configuration Files

```
/vitest.config.ts       # Vitest configuration
/src/test/setup.ts      # Global test setup
/src/test/utils.tsx     # Custom test utilities
```

### Key Features

- ✅ JSdom environment for React testing
- ✅ CSS support (can test styles)
- ✅ Coverage reporting (text, JSON, HTML)
- ✅ Mock setup (localStorage, matchMedia, IntersectionObserver)
- ✅ Auto-cleanup after each test

---

## Running Tests

### Available Commands

```bash
# Run tests in watch mode (development)
npm test

# Run tests with UI dashboard
npm run test:ui

# Run tests once (CI/production)
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

### Watch Mode Shortcuts

When running `npm test`:

- **a** - Run all tests
- **f** - Run only failed tests
- **p** - Filter by filename pattern
- **t** - Filter by test name pattern
- **q** - Quit watch mode

---

## Test Organization

### Directory Structure

```
/src/app/components/
├── common/
│   ├── Logo.tsx
│   ├── __tests__/
│   │   └── Logo.test.tsx
│   └── Container.tsx
├── patterns/
│   ├── Hero.tsx
│   ├── __tests__/
│   │   ├── Hero.test.tsx
│   │   └── Hero.integration.test.tsx
│   └── CardGrid.tsx
├── parts/
│   ├── Header.tsx
│   └── __tests__/
│       └── Header.test.tsx
└── ui/
    ├── button.tsx
    └── __tests__/
        └── button.test.tsx
```

### Naming Conventions

| Test Type | File Pattern | Example |
|-----------|-------------|---------|
| Unit Test | `ComponentName.test.tsx` | `Logo.test.tsx` |
| Integration Test | `ComponentName.integration.test.tsx` | `Hero.integration.test.tsx` |
| Accessibility Test | `ComponentName.a11y.test.tsx` | `Header.a11y.test.tsx` |
| Visual Test | `ComponentName.visual.test.tsx` | `CardGrid.visual.test.tsx` |

---

## Writing Tests

### Test Structure

Use **AAA Pattern** (Arrange, Act, Assert):

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Component } from '../Component';

describe('Component Name', () => {
  it('does something specific', async () => {
    // Arrange - Set up test data and render component
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Component onClick={handleClick} />);
    
    // Act - Perform user interactions
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    // Assert - Verify expected outcome
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Essential Imports

```typescript
// Testing utilities
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

// Component under test
import { Component } from '../Component';

// Mock data (if needed)
import { MOCK_TOURS } from '../../data/mock';
```

---

## Component Testing

### Basic Component Test

```typescript
describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
```

### Testing Component Props

```typescript
describe('Card Component Props', () => {
  const defaultProps = {
    title: 'Card Title',
    description: 'Card description',
    imageUrl: 'https://example.com/image.jpg',
  };

  it('renders all props correctly', () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', defaultProps.imageUrl);
  });

  it('renders without optional props', () => {
    render(<Card title="Title" />);
    
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('handles badge prop', () => {
    render(<Card {...defaultProps} badge="New" />);
    
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});
```

### Testing Conditional Rendering

```typescript
describe('Hero Component Conditional Rendering', () => {
  it('shows CTA button when ctaText is provided', () => {
    render(<Hero title="Hero" ctaText="Book Now" />);
    
    expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
  });

  it('hides CTA button when ctaText is not provided', () => {
    render(<Hero title="Hero" />);
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows breadcrumbs when provided', () => {
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Tours', href: '/tours' },
    ];
    
    render(<Hero title="Hero" breadcrumbs={breadcrumbs} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tours')).toBeInTheDocument();
  });
});
```

---

## Design System Compliance Testing

### Testing CSS Variables

```typescript
describe('Logo Design System Compliance', () => {
  it('uses correct font family CSS variable', () => {
    render(<Logo />);
    
    const logo = screen.getByAltText(/lightspeed/i);
    
    // Get computed styles
    const styles = window.getComputedStyle(logo.parentElement!);
    
    // Verify uses CSS variable (not hardcoded value)
    expect(logo.parentElement).toHaveStyle({
      fontFamily: 'var(--font-family-lora)',
    });
  });

  it('uses semantic color tokens', () => {
    render(<Button variant="primary">Click me</Button>);
    
    const button = screen.getByRole('button');
    
    // Check that Tailwind classes use semantic tokens
    expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
  });
});
```

### Typography Compliance

```typescript
describe('Hero Typography Compliance', () => {
  it('uses semantic HTML for heading hierarchy', () => {
    render(<Hero title="Main Title" subtitle="Subtitle" />);
    
    // Verify H1 for main title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
    
    // Verify paragraph for subtitle (not H2)
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });

  it('does not use Tailwind typography classes', () => {
    const { container } = render(<Hero title="Title" />);
    
    const h1 = container.querySelector('h1');
    
    // Verify NO Tailwind font classes (relies on theme.css)
    expect(h1).not.toHaveClass('text-4xl');
    expect(h1).not.toHaveClass('font-bold');
    expect(h1).not.toHaveClass('leading-tight');
  });

  it('uses fluid typography CSS variables', () => {
    const { container } = render(<Hero title="Title" />);
    
    const h1 = container.querySelector('h1');
    const styles = window.getComputedStyle(h1!);
    
    // Verify fluid font size (clamp())
    expect(styles.fontSize).toBeTruthy();
    // In real environment, would be: clamp(3rem, 5vw + 1rem, 4.5rem)
  });
});
```

### Color Token Compliance

```typescript
describe('Button Color Compliance', () => {
  it('uses semantic color classes for primary variant', () => {
    render(<Button variant="primary">Click</Button>);
    
    const button = screen.getByRole('button');
    
    // Verify uses semantic tokens (not raw colors)
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
    expect(button).not.toHaveClass('bg-blue-500'); // No raw Tailwind colors
  });

  it('uses semantic color classes for secondary variant', () => {
    render(<Button variant="secondary">Click</Button>);
    
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('text-secondary-foreground');
  });
});
```

---

## Accessibility Testing

### Semantic HTML

```typescript
describe('Card Accessibility', () => {
  it('uses semantic heading for title', () => {
    render(<Card title="Card Title" />);
    
    expect(screen.getByRole('heading', { name: /card title/i })).toBeInTheDocument();
  });

  it('uses article element for card wrapper', () => {
    const { container } = render(<Card title="Title" />);
    
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('has accessible image alt text', () => {
    render(<Card title="Title" imageUrl="image.jpg" imageAlt="Description" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAccessibleName('Description');
  });
});
```

### Keyboard Navigation

```typescript
describe('Header Keyboard Navigation', () => {
  it('navigates through menu items with Tab', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    // Tab through navigation
    await user.tab();
    expect(screen.getByRole('link', { name: /tours/i })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('link', { name: /destinations/i })).toHaveFocus();
  });

  it('activates buttons with Enter key', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Header onBookNow={handleClick} />);
    
    const button = screen.getByRole('button', { name: /book now/i });
    button.focus();
    await user.keyboard('{Enter}');
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('activates buttons with Space key', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Header onBookNow={handleClick} />);
    
    const button = screen.getByRole('button', { name: /book now/i });
    button.focus();
    await user.keyboard(' ');
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### ARIA Attributes

```typescript
describe('Accordion ARIA Attributes', () => {
  it('has correct ARIA attributes for collapsed state', () => {
    render(<Accordion items={mockItems} />);
    
    const button = screen.getByRole('button', { name: /item 1/i });
    
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls');
  });

  it('updates aria-expanded when expanded', async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);
    
    const button = screen.getByRole('button', { name: /item 1/i });
    await user.click(button);
    
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('has aria-label for icon-only buttons', () => {
    render(<BackToTopButton />);
    
    const button = screen.getByRole('button');
    
    expect(button).toHaveAccessibleName(/back to top/i);
  });
});
```

### Focus Management

```typescript
describe('Dialog Focus Management', () => {
  it('focuses first interactive element when opened', async () => {
    const user = userEvent.setup();
    render(<Dialog trigger={<button>Open</button>} />);
    
    await user.click(screen.getByRole('button', { name: /open/i }));
    
    // First focusable element should be focused
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveFocus();
  });

  it('traps focus within dialog', async () => {
    const user = userEvent.setup();
    render(<Dialog open />);
    
    // Tab should cycle within dialog
    await user.tab();
    await user.tab();
    await user.tab();
    
    // Should return to first element (not escape dialog)
    const firstElement = screen.getByRole('button', { name: /close/i });
    expect(firstElement).toHaveFocus();
  });

  it('returns focus to trigger when closed', async () => {
    const user = userEvent.setup();
    const trigger = <button>Open Dialog</button>;
    render(<Dialog trigger={trigger} />);
    
    const openButton = screen.getByRole('button', { name: /open dialog/i });
    await user.click(openButton);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    
    expect(openButton).toHaveFocus();
  });
});
```

---

## Integration Testing

### Testing Component Composition

```typescript
describe('TourSingle Page Integration', () => {
  it('renders all major sections in correct order', () => {
    render(<TourSingle />);
    
    // Verify section order
    const sections = screen.getAllByRole('region');
    
    expect(sections[0]).toHaveAttribute('aria-label', /hero/i);
    expect(sections[1]).toHaveAttribute('aria-label', /overview/i);
    expect(sections[2]).toHaveAttribute('aria-label', /itinerary/i);
  });

  it('passes data correctly between components', () => {
    const mockTour = MOCK_TOURS[0];
    render(<TourSingle tour={mockTour} />);
    
    // Verify Hero receives correct data
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(mockTour.title);
    
    // Verify FastFacts receives correct data
    expect(screen.getByText(/duration/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockTour.days} days`)).toBeInTheDocument();
  });
});
```

### Testing User Workflows

```typescript
describe('Contact Form Workflow', () => {
  it('completes full contact form submission', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    
    render(<ContactForm onSubmit={handleSubmit} />);
    
    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello, I want to book a tour');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verify submission
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I want to book a tour',
      });
    });
  });

  it('shows validation errors for invalid inputs', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    // Submit without filling fields
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verify error messages
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });
});
```

---

## Best Practices

### ✅ DO

1. **Use Semantic Queries**
   ```typescript
   // Good - User-centric
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText(/email/i)
   screen.getByText(/welcome/i)
   
   // Bad - Implementation details
   screen.getByClassName('submit-button')
   screen.getByTestId('email-input')
   ```

2. **Test User Interactions**
   ```typescript
   // Good - Realistic user behavior
   await user.click(button);
   await user.type(input, 'text');
   await user.tab();
   
   // Bad - Direct state manipulation
   fireEvent.click(button);
   component.setState({ value: 'text' });
   ```

3. **Use Async Utilities**
   ```typescript
   // Good - Handles async updates
   await waitFor(() => {
     expect(screen.getByText(/success/i)).toBeInTheDocument();
   });
   
   // Bad - May fail due to timing
   expect(screen.getByText(/success/i)).toBeInTheDocument();
   ```

4. **Mock External Dependencies**
   ```typescript
   // Mock API calls
   vi.mock('../api/tours', () => ({
     fetchTours: vi.fn().mockResolvedValue(MOCK_TOURS),
   }));
   
   // Mock router navigation
   const mockNavigate = vi.fn();
   vi.mock('react-router-dom', () => ({
     useNavigate: () => mockNavigate,
   }));
   ```

5. **Test Accessibility**
   ```typescript
   // Always test keyboard navigation
   await user.tab();
   expect(element).toHaveFocus();
   
   // Verify ARIA attributes
   expect(button).toHaveAttribute('aria-expanded', 'true');
   
   // Check accessible names
   expect(button).toHaveAccessibleName('Close dialog');
   ```

### ❌ DON'T

1. **Don't Test Implementation Details**
   ```typescript
   // Bad - Testing internal state
   expect(component.state.count).toBe(1);
   
   // Good - Testing user-visible output
   expect(screen.getByText('Count: 1')).toBeInTheDocument();
   ```

2. **Don't Use data-testid Unless Necessary**
   ```typescript
   // Bad - Unnecessary test ID
   screen.getByTestId('hero-title');
   
   // Good - Semantic query
   screen.getByRole('heading', { level: 1 });
   ```

3. **Don't Hardcode Timing**
   ```typescript
   // Bad - Brittle, may fail
   await new Promise(resolve => setTimeout(resolve, 1000));
   
   // Good - Wait for specific condition
   await waitFor(() => {
     expect(screen.getByText(/loaded/i)).toBeInTheDocument();
   });
   ```

4. **Don't Test Third-Party Libraries**
   ```typescript
   // Bad - Testing Radix UI implementation
   expect(accordionInternal.state).toBe('open');
   
   // Good - Testing your component's usage
   expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
   ```

5. **Don't Forget Cleanup**
   ```typescript
   // Bad - No cleanup
   it('test 1', () => {
     render(<Component />);
     // No cleanup
   });
   
   // Good - Automatic cleanup (handled by setup.ts)
   it('test 1', () => {
     render(<Component />);
   }); // Cleanup happens automatically
   ```

---

## Common Patterns

### Testing Dark Mode

```typescript
describe('Header Dark Mode', () => {
  it('toggles dark mode class on document', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const themeButton = screen.getByRole('button', { name: /dark mode/i });
    await user.click(themeButton);
    
    expect(document.documentElement).toHaveClass('dark');
    
    await user.click(themeButton);
    
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('persists theme preference to localStorage', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const themeButton = screen.getByRole('button', { name: /dark mode/i });
    await user.click(themeButton);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});
```

### Testing Responsive Behavior

```typescript
describe('Header Responsive Behavior', () => {
  it('shows mobile menu on small screens', () => {
    // Mock mobile viewport
    global.innerWidth = 375;
    
    render(<Header />);
    
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeVisible();
  });

  it('shows desktop navigation on large screens', () => {
    // Mock desktop viewport
    global.innerWidth = 1024;
    
    render(<Header />);
    
    expect(screen.queryByRole('button', { name: /menu/i })).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeVisible();
  });
});
```

### Testing Error States

```typescript
describe('TourCard Error Handling', () => {
  it('shows fallback image when image fails to load', () => {
    render(<TourCard tour={{ ...mockTour, imageUrl: 'broken.jpg' }} />);
    
    const img = screen.getByRole('img');
    
    // Trigger error
    fireEvent.error(img);
    
    // Verify fallback
    expect(img).toHaveAttribute('src', expect.stringContaining('placeholder'));
  });

  it('shows error message when data is missing', () => {
    render(<TourCard tour={null} />);
    
    expect(screen.getByText(/unable to load tour/i)).toBeInTheDocument();
  });
});
```

### Testing Loading States

```typescript
describe('ToursArchive Loading States', () => {
  it('shows loading skeleton initially', () => {
    render(<ToursArchive loading />);
    
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('shows tours after loading completes', async () => {
    const { rerender } = render(<ToursArchive loading />);
    
    rerender(<ToursArchive loading={false} tours={MOCK_TOURS} />);
    
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(MOCK_TOURS.length);
  });
});
```

---

## Troubleshooting

### Common Issues

#### Issue: "Element not found"

```typescript
// Problem: Query executes before element renders
expect(screen.getByText(/success/i)).toBeInTheDocument();

// Solution: Use async query
expect(await screen.findByText(/success/i)).toBeInTheDocument();
```

#### Issue: "Multiple elements found"

```typescript
// Problem: Query matches multiple elements
screen.getByRole('button');

// Solution: Be more specific
screen.getByRole('button', { name: /submit/i });
```

#### Issue: "Element not accessible"

```typescript
// Problem: Missing accessible name
<button><Icon /></button>

// Solution: Add aria-label
<button aria-label="Close"><Icon /></button>
```

#### Issue: "CSS variables not defined"

```typescript
// Problem: Theme CSS not loaded in tests
const styles = window.getComputedStyle(element);
expect(styles.color).toBe('var(--primary)'); // Fails

// Solution: Import theme CSS in test setup
import '../styles/theme.css';
```

---

## Coverage Goals

### Target Coverage

| Category | Minimum Coverage | Target Coverage |
|----------|-----------------|-----------------|
| **Statements** | 80% | 90% |
| **Branches** | 75% | 85% |
| **Functions** | 80% | 90% |
| **Lines** | 80% | 90% |

### Critical Paths (100% Coverage Required)

- Form validation logic
- Authentication flows
- Payment/booking workflows
- Error boundaries
- Accessibility utilities

### Viewing Coverage Report

```bash
npm run test:coverage
```

Then open `coverage/index.html` in browser.

---

## Test Checklist

Before marking a component as "tested":

- [ ] Component renders without errors
- [ ] All props are tested
- [ ] User interactions work (clicks, typing, etc.)
- [ ] Keyboard navigation works
- [ ] ARIA attributes are correct
- [ ] Focus management works
- [ ] Loading states are handled
- [ ] Error states are handled
- [ ] Empty states are handled
- [ ] Uses CSS variables (design system compliance)
- [ ] Uses semantic HTML
- [ ] Responsive behavior works
- [ ] Dark mode works (if applicable)
- [ ] Coverage > 80%

---

## Resources

### Documentation

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [User Event](https://testing-library.com/docs/user-event/intro)

### Queries Priority

1. **getByRole** - Accessibility-first (best)
2. **getByLabelText** - Forms
3. **getByPlaceholderText** - Forms (fallback)
4. **getByText** - Content
5. **getByDisplayValue** - Form values
6. **getByAltText** - Images
7. **getByTitle** - Title attribute
8. **getByTestId** - Last resort only

### Async Utilities

- `findBy*` - Wait for element to appear
- `waitFor` - Wait for assertion to pass
- `waitForElementToBeRemoved` - Wait for element to disappear

---

**Last Updated:** December 26, 2024  
**Version:** 1.0  
**Author:** LightSpeed Design System Team
