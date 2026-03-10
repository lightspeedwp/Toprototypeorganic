# Component Testing Guidelines

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Purpose:** Establish testing standards for React components in the LightSpeed Tour Operator prototype

---

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Test Coverage Requirements](#test-coverage-requirements)
3. [Testing Tools](#testing-tools)
4. [Component Testing Standards](#component-testing-standards)
5. [Accessibility Testing](#accessibility-testing)
6. [Test File Structure](#test-file-structure)
7. [Writing Effective Tests](#writing-effective-tests)
8. [Examples](#examples)

---

## Testing Philosophy

### Core Principles

1. **Test Behavior, Not Implementation**
   - Test what users see and interact with
   - Avoid testing internal state or implementation details
   - Focus on user outcomes

2. **Write Tests Users Can Understand**
   - Test names should describe user actions
   - Use accessible queries (getByRole, getByLabelText)
   - Follow user workflows

3. **Maintain High Coverage**
   - Aim for 100% test coverage
   - Every component must have tests
   - Every user interaction must be tested

4. **Accessibility First**
   - Test with screen readers in mind
   - Verify ARIA attributes
   - Ensure keyboard navigation works

---

## Test Coverage Requirements

### Minimum Coverage Targets

| Metric | Target | Critical |
|--------|--------|----------|
| **Overall Coverage** | 100% | 95%+ |
| **Branch Coverage** | 100% | 90%+ |
| **Function Coverage** | 100% | 95%+ |
| **Line Coverage** | 100% | 95%+ |

### What to Test

#### ✅ Required Tests

**Rendering:**
- Component renders without crashing
- Default props render correctly
- All variants render correctly
- Conditional rendering based on props

**Interactions:**
- Button clicks work
- Form submissions work
- Input changes work
- Keyboard navigation works
- Focus management works

**State Changes:**
- State updates correctly
- Callbacks fire with correct arguments
- Error states display correctly
- Loading states display correctly

**Accessibility:**
- ARIA attributes present and correct
- Keyboard navigation works
- Focus trapping works (for modals)
- Screen reader announcements work

**Design System:**
- CSS classes applied correctly
- Dark mode works
- Responsive behavior works

#### ❌ What NOT to Test

- Implementation details (internal state)
- Third-party library internals
- CSS styling (use visual regression testing)
- WordPress mapping (that's documentation)

---

## Testing Tools

### Required Tools

```json
{
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "@testing-library/user-event": "^14.0.0",
  "vitest": "^1.0.0",
  "@vitest/ui": "^1.0.0",
  "jsdom": "^23.0.0"
}
```

### Testing Library Setup

```typescript
// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { NavigationProvider } from '../contexts/NavigationContext';

interface CustomRenderOptions extends RenderOptions {
  // Add custom options here
}

function customRender(
  ui: React.ReactElement,
  options?: CustomRenderOptions
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <NavigationProvider>
        {children}
      </NavigationProvider>
    ),
    ...options,
  });
}

export * from '@testing-library/react';
export { customRender as render };
```

---

## Component Testing Standards

### 1. Pattern Component Tests

**Required Test Suites:**

```typescript
describe('PatternName', () => {
  describe('Rendering', () => {
    it('renders without crashing');
    it('renders with default props');
    it('renders all variants');
    it('renders with optional props');
  });

  describe('Interactions', () => {
    it('handles user interactions');
    it('calls callbacks with correct arguments');
    it('updates state correctly');
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes');
    it('supports keyboard navigation');
    it('manages focus correctly');
    it('has accessible labels');
  });

  describe('Edge Cases', () => {
    it('handles empty data');
    it('handles loading states');
    it('handles error states');
  });
});
```

### 2. Block Component Tests

**Required Test Suites:**

```typescript
describe('BlockName', () => {
  describe('Rendering', () => {
    it('renders children correctly');
    it('applies className correctly');
    it('renders semantic HTML');
  });

  describe('Design System', () => {
    it('uses CSS variables');
    it('supports dark mode');
    it('applies correct typography');
  });

  describe('Accessibility', () => {
    it('has correct semantic element');
    it('has proper heading hierarchy');
  });
});
```

### 3. Page Component Tests

**Required Test Suites:**

```typescript
describe('PageName', () => {
  describe('Rendering', () => {
    it('renders all required patterns');
    it('follows correct pattern order');
    it('wraps patterns in GroupBlocks');
  });

  describe('Navigation', () => {
    it('navigates correctly on clicks');
    it('passes correct IDs to navigation');
  });

  describe('Data Integration', () => {
    it('renders mock data correctly');
    it('handles empty data');
  });
});
```

---

## Accessibility Testing

### Required Accessibility Tests

#### 1. **ARIA Attributes**

```typescript
it('has correct ARIA attributes', () => {
  render(<Component />);
  
  const button = screen.getByRole('button', { name: /submit/i });
  expect(button).toHaveAttribute('aria-label', 'Submit form');
});
```

#### 2. **Keyboard Navigation**

```typescript
it('supports keyboard navigation', async () => {
  const user = userEvent.setup();
  render(<Component />);
  
  const firstButton = screen.getByRole('button', { name: /first/i });
  const secondButton = screen.getByRole('button', { name: /second/i });
  
  await user.tab();
  expect(firstButton).toHaveFocus();
  
  await user.tab();
  expect(secondButton).toHaveFocus();
});
```

#### 3. **Screen Reader Announcements**

```typescript
it('announces state changes to screen readers', async () => {
  const user = userEvent.setup();
  render(<Component />);
  
  const status = screen.getByRole('status');
  expect(status).toHaveAttribute('aria-live', 'polite');
  
  await user.click(screen.getByRole('button'));
  expect(status).toHaveTextContent('Success');
});
```

#### 4. **Form Accessibility**

```typescript
it('has accessible form labels', () => {
  render(<ContactForm />);
  
  const nameInput = screen.getByLabelText(/name/i);
  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toHaveAttribute('id');
  
  const label = screen.getByText(/name/i);
  expect(label).toHaveAttribute('for', nameInput.id);
});

it('announces form errors', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  const errorMessage = screen.getByRole('alert');
  expect(errorMessage).toHaveTextContent('Name is required');
  
  const nameInput = screen.getByLabelText(/name/i);
  expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  expect(nameInput).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
});
```

---

## Test File Structure

### Directory Structure

```
src/app/
├── components/
│   ├── blocks/
│   │   ├── core/
│   │   │   ├── HeadingBlock.tsx
│   │   │   └── HeadingBlock.test.tsx
│   │   └── design/
│   │       ├── GroupBlock.tsx
│   │       └── GroupBlock.test.tsx
│   ├── patterns/
│   │   ├── ContactFormPattern.tsx
│   │   └── ContactFormPattern.test.tsx
│   └── common/
│       ├── Container.tsx
│       └── Container.test.tsx
├── pages/
│   ├── HomePage.tsx
│   └── HomePage.test.tsx
└── __tests__/
    ├── test-utils.tsx
    └── setup.ts
```

### Test File Template

```typescript
/**
 * @fileoverview Tests for ComponentName
 * @module ComponentName.test
 * @category testing
 */

import { render, screen } from '../__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Default props for testing
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ComponentName {...defaultProps} />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<ComponentName {...defaultProps} className="custom-class" />);
      const element = screen.getByText('Test Title').closest('div');
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<ComponentName {...defaultProps} onClick={handleClick} />);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<ComponentName {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<ComponentName {...defaultProps} />);
      
      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty data gracefully', () => {
      render(<ComponentName title="" description="" />);
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });

    it('displays loading state', () => {
      render(<ComponentName {...defaultProps} isLoading />);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('displays error state', () => {
      render(<ComponentName {...defaultProps} error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });
});
```

---

## Writing Effective Tests

### Best Practices

#### 1. **Use Accessible Queries**

✅ **Good - Query by Role:**
```typescript
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('heading', { level: 1 });
```

❌ **Bad - Query by Class/ID:**
```typescript
container.querySelector('.submit-button');
screen.getByTestId('submit-btn');
```

#### 2. **Test User Workflows**

✅ **Good - Test Complete Flow:**
```typescript
it('allows user to submit contact form', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  
  render(<ContactForm onSubmit={onSubmit} />);
  
  // Fill form
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello world');
  
  // Submit
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Verify
  expect(onSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello world',
  });
});
```

❌ **Bad - Test Implementation:**
```typescript
it('updates state on input change', () => {
  const { rerender } = render(<ContactForm />);
  // Don't test internal state
});
```

#### 3. **Use Descriptive Test Names**

✅ **Good:**
```typescript
it('displays error message when email is invalid');
it('disables submit button while form is submitting');
it('shows success message after successful submission');
```

❌ **Bad:**
```typescript
it('works');
it('test 1');
it('handles change');
```

#### 4. **Test Edge Cases**

```typescript
describe('Edge Cases', () => {
  it('handles very long input text', async () => {
    const longText = 'a'.repeat(1000);
    const user = userEvent.setup();
    
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/message/i), longText);
    
    expect(screen.getByLabelText(/message/i)).toHaveValue(longText);
  });

  it('handles special characters in input', async () => {
    const specialChars = '<script>alert("xss")</script>';
    const user = userEvent.setup();
    
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/message/i), specialChars);
    
    // Should not execute script
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('handles rapid clicks', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    
    render(<ContactForm onSubmit={onSubmit} />);
    
    // Click multiple times rapidly
    const button = screen.getByRole('button', { name: /submit/i });
    await user.click(button);
    await user.click(button);
    await user.click(button);
    
    // Should only submit once
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
```

---

## Examples

### Example 1: Contact Form Pattern Test

```typescript
/**
 * @fileoverview Tests for ContactFormPattern
 */

import { render, screen, waitFor } from '../__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import { ContactFormPattern } from './ContactFormPattern';

describe('ContactFormPattern', () => {
  const defaultProps = {
    title: 'Contact Us',
    description: 'Send us a message',
  };

  describe('Rendering', () => {
    it('renders form with all fields', () => {
      render(<ContactFormPattern {...defaultProps} />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders phone field when showPhoneField is true', () => {
      render(<ContactFormPattern {...defaultProps} showPhoneField />);
      
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    });

    it('hides phone field when showPhoneField is false', () => {
      render(<ContactFormPattern {...defaultProps} showPhoneField={false} />);
      
      expect(screen.queryByLabelText(/phone/i)).not.toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('shows error when name is empty', async () => {
      const user = userEvent.setup();
      render(<ContactFormPattern {...defaultProps} />);
      
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    it('shows error when email is invalid', async () => {
      const user = userEvent.setup();
      render(<ContactFormPattern {...defaultProps} />);
      
      await user.type(screen.getByLabelText(/email/i), 'invalid-email');
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });

    it('clears error when user starts typing', async () => {
      const user = userEvent.setup();
      render(<ContactFormPattern {...defaultProps} />);
      
      // Trigger error
      await user.click(screen.getByRole('button', { name: /submit/i }));
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      
      // Start typing
      await user.type(screen.getByLabelText(/name/i), 'John');
      
      // Error should be cleared
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form data', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockResolvedValue(undefined);
      
      render(<ContactFormPattern {...defaultProps} onSubmit={onSubmit} />);
      
      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.selectOptions(screen.getByLabelText(/subject/i), 'general');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      // Submit
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '',
          subject: 'general',
          message: 'Test message',
        });
      });
    });

    it('shows loading state while submitting', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 1000)));
      
      render(<ContactFormPattern {...defaultProps} onSubmit={onSubmit} />);
      
      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.selectOptions(screen.getByLabelText(/subject/i), 'general');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      // Submit
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      // Should show loading
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
      
      // Button should be disabled
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    });

    it('shows success message after successful submission', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockResolvedValue(undefined);
      
      render(<ContactFormPattern {...defaultProps} />);
      
      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.selectOptions(screen.getByLabelText(/subject/i), 'general');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      // Should show success message
      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      });
    });

    it('shows error message on submission failure', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockRejectedValue(new Error('Network error'));
      
      render(<ContactFormPattern {...defaultProps} />);
      
      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.selectOptions(screen.getByLabelText(/subject/i), 'general');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has accessible form labels', () => {
      render(<ContactFormPattern {...defaultProps} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveAttribute('id');
      
      const label = screen.getByText(/name/i).closest('label');
      expect(label).toHaveAttribute('for', nameInput.id);
    });

    it('announces errors to screen readers', async () => {
      const user = userEvent.setup();
      render(<ContactFormPattern {...defaultProps} />);
      
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      const nameError = screen.getByText(/name is required/i);
      expect(nameError).toHaveAttribute('id');
      
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveAttribute('aria-describedby', expect.stringContaining(nameError.id));
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<ContactFormPattern {...defaultProps} />);
      
      // Tab through form fields
      await user.tab();
      expect(screen.getByLabelText(/name/i)).toHaveFocus();
      
      await user.tab();
      expect(screen.getByLabelText(/email/i)).toHaveFocus();
      
      await user.tab();
      expect(screen.getByLabelText(/subject/i)).toHaveFocus();
      
      await user.tab();
      expect(screen.getByLabelText(/message/i)).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('button', { name: /submit/i })).toHaveFocus();
    });
  });
});
```

---

## Coverage Reporting

### Running Tests with Coverage

```bash
# Run all tests with coverage
npm run test:coverage

# Run specific test file
npm run test ContactFormPattern.test.tsx

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### Coverage Reports

Coverage reports are generated in `/coverage/` directory:

```
coverage/
├── index.html          # HTML coverage report
├── lcov.info          # LCOV format for CI
└── coverage-final.json # JSON format
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true
```

---

## Maintenance

### Regular Updates

1. **Weekly:** Review and update tests for new features
2. **Monthly:** Review coverage reports and fill gaps
3. **Quarterly:** Audit accessibility tests
4. **Annually:** Update testing tools and dependencies

### Test Debt Management

- Flag tests that need updating with `// TODO: Update test`
- Create issues for missing test coverage
- Prioritize high-risk areas for testing

---

**Last Updated:** December 27, 2024  
**Next Review:** January 27, 2025  
**Maintained By:** Development Team
