# Testing Guidelines

**Version:** 1.0  
**Last Updated:** December 26, 2024  
**Testing Framework:** Vitest + React Testing Library

This document defines the testing standards and practices for the LightSpeed Tour Operator WordPress plugin prototype.

---

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Test Structure](#test-structure)
3. [Testing Standards](#testing-standards)
4. [Component Testing](#component-testing)
5. [Hook Testing](#hook-testing)
6. [Utility Testing](#utility-testing)
7. [Integration Testing](#integration-testing)
8. [Accessibility Testing](#accessibility-testing)
9. [Running Tests](#running-tests)
10. [Best Practices](#best-practices)
11. [Common Patterns](#common-patterns)
12. [Troubleshooting](#troubleshooting)

---

## Testing Philosophy

### Core Principles

1. **Test behavior, not implementation** - Focus on what users see and interact with
2. **Accessibility first** - Use accessible queries (getByRole, getByLabelText)
3. **Realistic testing** - Simulate real user interactions
4. **Maintainability** - Write tests that survive refactoring
5. **Coverage goals** - Aim for 80%+ coverage on critical paths

### What to Test

✅ **DO Test:**
- User interactions (clicks, form submissions, navigation)
- Rendered output (text, images, accessibility)
- Component state changes
- Error handling
- Edge cases
- Accessibility compliance

❌ **DON'T Test:**
- Implementation details (internal state, method names)
- Third-party libraries
- CSS styling (except for critical functional styles)
- Trivial components with no logic

---

## Test Structure

### File Naming Convention

```
ComponentName.tsx          → ComponentName.test.tsx
useSomeHook.ts            → useSomeHook.test.ts
utilityFunction.ts        → utilityFunction.test.ts
```

### Test File Location

Tests should be colocated with the code they test:

```
src/
├── app/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   ├── patterns/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.test.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-mobile.test.ts
│   └── lib/
│       ├── utils.ts
│       └── utils.test.ts
```

### Test File Structure

```typescript
/**
 * Tests for ComponentName component.
 * 
 * @module ComponentName.test
 * @category tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Setup and teardown
  beforeEach(() => {
    // Reset mocks, clear state
  });

  // Group related tests
  describe('Rendering', () => {
    it('should render with default props', () => {
      // Test implementation
    });

    it('should render with custom props', () => {
      // Test implementation
    });
  });

  describe('User Interactions', () => {
    it('should handle click events', async () => {
      // Test implementation
    });

    it('should update state on user input', async () => {
      // Test implementation
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      // Test implementation
    });

    it('should be keyboard navigable', async () => {
      // Test implementation
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing data gracefully', () => {
      // Test implementation
    });

    it('should handle error states', () => {
      // Test implementation
    });
  });
});
```

---

## Testing Standards

### Query Priority (React Testing Library)

Use queries in this priority order:

1. **Accessible queries** (preferred):
   - `getByRole` - Primary choice for interactive elements
   - `getByLabelText` - Forms and inputs
   - `getByPlaceholderText` - Form inputs
   - `getByText` - Non-interactive text
   - `getByDisplayValue` - Form elements with values

2. **Semantic queries**:
   - `getByAltText` - Images
   - `getByTitle` - Title attributes

3. **Test IDs** (last resort):
   - `getByTestId` - Only when no accessible query works

### Query Variants

- **getBy...** - Throws error if not found (use for assertions)
- **queryBy...** - Returns null if not found (use for negative assertions)
- **findBy...** - Returns promise, waits for element (use for async)

### Assertion Standards

```typescript
// ✅ Good - Specific assertions
expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome');

// ❌ Bad - Generic assertions
expect(screen.getByTestId('submit-btn')).toBeTruthy();
expect(document.querySelector('.title')).not.toBeNull();
```

---

## Component Testing

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click Me</Button>);
    
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('should apply variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    
    const button = screen.getByRole('button', { name: 'Primary' });
    expect(button).toHaveClass('bg-primary');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });
});
```

### Testing User Interactions

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter - User Interactions', () => {
  it('should increment count on button click', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const button = screen.getByRole('button', { name: /increment/i });
    const count = screen.getByText(/count: 0/i);
    
    await user.click(button);
    
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  it('should call onSubmit callback with form data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);
    
    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    
    // Submit
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
});
```

### Testing Async Components

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ToursList } from './ToursList';

describe('ToursList - Async Data', () => {
  it('should show loading state initially', () => {
    render(<ToursList />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display tours after loading', async () => {
    render(<ToursList />);
    
    // Wait for tours to appear
    await waitFor(() => {
      expect(screen.getByText(/Iceland Explorer/i)).toBeInTheDocument();
    });
    
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('should handle errors gracefully', async () => {
    // Mock API error
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));
    
    render(<ToursList />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading tours/i)).toBeInTheDocument();
    });
  });
});
```

### Testing Components with Context

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

describe('ThemeSwitcher - Context', () => {
  const renderWithTheme = (initialTheme = 'light') => {
    return render(
      <ThemeProvider initialTheme={initialTheme}>
        <ThemeSwitcher />
      </ThemeProvider>
    );
  };

  it('should display current theme', () => {
    renderWithTheme('dark');
    
    expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
  });

  it('should toggle theme on click', async () => {
    const user = userEvent.setup();
    renderWithTheme('light');
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    
    expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
  });
});
```

---

## Hook Testing

### Basic Hook Test

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter(0));
    
    expect(result.current.count).toBe(0);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should reset count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});
```

### Testing Hooks with Dependencies

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should persist value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(localStorage.getItem('key')).toBe(JSON.stringify('updated'));
  });

  it('should sync across multiple instances', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('key', 'value1'));
    const { result: result2 } = renderHook(() => useLocalStorage('key', 'value2'));
    
    act(() => {
      result1.current[1]('shared');
    });
    
    expect(result2.current[0]).toBe('shared');
  });
});
```

---

## Utility Testing

### Pure Function Tests

```typescript
import { describe, it, expect } from 'vitest';
import { formatPrice, truncateText, cn } from './utils';

describe('Utils - formatPrice', () => {
  it('should format numbers as currency', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
    expect(formatPrice(50.5)).toBe('$50.50');
  });

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('should handle negative numbers', () => {
    expect(formatPrice(-100)).toBe('-$100.00');
  });
});

describe('Utils - truncateText', () => {
  it('should truncate long text', () => {
    const text = 'This is a very long text that needs truncation';
    expect(truncateText(text, 20)).toBe('This is a very long...');
  });

  it('should not truncate short text', () => {
    const text = 'Short text';
    expect(truncateText(text, 20)).toBe('Short text');
  });
});

describe('Utils - cn (className utility)', () => {
  it('should merge class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'active', false && 'hidden')).toBe('base active');
  });

  it('should handle tailwind-merge conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4'); // tailwind-merge dedupes
  });
});
```

---

## Integration Testing

### Multi-Component Integration

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App - Integration', () => {
  it('should navigate between pages', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Click on Tours navigation
    const toursLink = screen.getByRole('link', { name: /tours/i });
    await user.click(toursLink);
    
    // Verify tours page is displayed
    expect(screen.getByRole('heading', { name: /tours/i })).toBeInTheDocument();
    
    // Click on a tour card
    const tourCard = screen.getByRole('button', { name: /iceland explorer/i });
    await user.click(tourCard);
    
    // Verify tour detail page is displayed
    expect(screen.getByRole('heading', { name: /iceland explorer/i })).toBeInTheDocument();
  });

  it('should maintain theme preference across pages', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Toggle theme to dark
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(themeButton);
    
    // Navigate to another page
    await user.click(screen.getByRole('link', { name: /about/i }));
    
    // Verify dark theme is still active
    expect(document.documentElement).toHaveClass('dark');
  });
});
```

---

## Accessibility Testing

### ARIA and Semantic HTML

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Header } from './Header';

expect.extend(toHaveNoViolations);

describe('Header - Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    render(<Header />);
    
    // Should have one h1
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it('should have keyboard-accessible navigation', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    // Tab through navigation
    await user.tab();
    expect(screen.getByRole('link', { name: /tours/i })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('link', { name: /destinations/i })).toHaveFocus();
  });

  it('should have proper ARIA labels for icon buttons', () => {
    render(<Header />);
    
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeButton).toHaveAttribute('aria-label');
  });

  it('should announce state changes to screen readers', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    // Check for live region announcement
    expect(screen.getByRole('status')).toHaveTextContent(/form submitted/i);
  });
});
```

### Keyboard Navigation

```typescript
describe('Modal - Keyboard Navigation', () => {
  it('should trap focus within modal', async () => {
    const user = userEvent.setup();
    render(<Modal isOpen={true} />);
    
    const firstButton = screen.getByRole('button', { name: /close/i });
    const lastButton = screen.getByRole('button', { name: /submit/i });
    
    // Tab forward through modal
    await user.tab();
    expect(firstButton).toHaveFocus();
    
    await user.tab();
    expect(lastButton).toHaveFocus();
    
    // Tab past last element should cycle to first
    await user.tab();
    expect(firstButton).toHaveFocus();
    
    // Shift+Tab should go backward
    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(lastButton).toHaveFocus();
  });

  it('should close on Escape key', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose} />);
    
    await user.keyboard('{Escape}');
    
    expect(onClose).toHaveBeenCalled();
  });
});
```

---

## Running Tests

### Package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

### Run Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui

# Run specific test file
pnpm test Button.test.tsx

# Run tests matching pattern
pnpm test --grep="User Interactions"
```

---

## Best Practices

### DO:

✅ **Use semantic queries**
```typescript
screen.getByRole('button', { name: 'Submit' })
screen.getByLabelText('Email Address')
```

✅ **Test user behavior**
```typescript
await user.click(button);
await user.type(input, 'text');
```

✅ **Use async utilities**
```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

✅ **Clean up side effects**
```typescript
afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});
```

✅ **Test accessibility**
```typescript
expect(button).toHaveAttribute('aria-label', 'Close');
```

### DON'T:

❌ **Don't test implementation details**
```typescript
// Bad
expect(component.state.count).toBe(1);

// Good
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

❌ **Don't use querySelector**
```typescript
// Bad
document.querySelector('.button');

// Good
screen.getByRole('button');
```

❌ **Don't test third-party libraries**
```typescript
// Bad - testing React Router
it('should render Router', () => {
  expect(Router).toBeDefined();
});
```

❌ **Don't forget to await async operations**
```typescript
// Bad
user.click(button);
expect(screen.getByText('Clicked')).toBeInTheDocument();

// Good
await user.click(button);
expect(screen.getByText('Clicked')).toBeInTheDocument();
```

---

## Common Patterns

### Mock Data

Create reusable mock data in `/src/test/mocks/`:

```typescript
// /src/test/mocks/tourData.ts
export const mockTours = [
  {
    id: '1',
    title: 'Iceland Explorer',
    price: 2500,
    duration: 7,
  },
  {
    id: '2',
    title: 'Safari Adventure',
    price: 3500,
    duration: 10,
  },
];
```

### Test Helpers

Create reusable test utilities in `/src/test/helpers/`:

```typescript
// /src/test/helpers/renderWithProviders.tsx
export function renderWithProviders(ui: React.ReactElement, options = {}) {
  return render(
    <ThemeProvider>
      <Router>
        {ui}
      </Router>
    </ThemeProvider>,
    options
  );
}
```

### Custom Matchers

```typescript
// /src/test/matchers/customMatchers.ts
expect.extend({
  toHaveTextTrimmed(received: HTMLElement, expected: string) {
    const text = received.textContent?.trim();
    const pass = text === expected;
    
    return {
      pass,
      message: () => `Expected "${text}" to equal "${expected}"`,
    };
  },
});
```

---

## Troubleshooting

### Common Issues

**Issue:** `Cannot find module` errors  
**Solution:** Check import paths and ensure files exist

**Issue:** Tests timeout  
**Solution:** Increase timeout in `vitest.config.ts` or use `waitFor` with longer timeout

**Issue:** `act()` warnings  
**Solution:** Wrap state updates in `await user.click()` or `act()`

**Issue:** Tests fail in CI but pass locally  
**Solution:** Check for timing issues, add `waitFor`, mock Date/timers

**Issue:** `localStorage is not defined`  
**Solution:** Ensure `setup.ts` is configured in `vitest.config.ts`

### Debug Tips

```typescript
// Print rendered output
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));

// Log all queries
screen.logTestingPlaygroundURL();

// Add delays to see what's happening
await new Promise(resolve => setTimeout(resolve, 1000));
```

---

## Coverage Goals

### Target Coverage

- **Critical paths**: 90%+
- **Components**: 80%+
- **Utilities**: 90%+
- **Hooks**: 85%+

### Coverage Reports

Generate coverage report:

```bash
pnpm test:coverage
```

View coverage report in your browser:

```
open coverage/index.html
```

---

## References

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [User Event](https://testing-library.com/docs/user-event/intro)

---

**Last Updated:** December 26, 2024  
**Maintained By:** Development Team  
**Questions?** See `/guidelines/testing/` for component-specific examples
