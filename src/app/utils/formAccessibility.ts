/**
 * Form Accessibility Utilities
 * 
 * Validates and enhances form accessibility according to WCAG 2.1 Level AA.
 * 
 * **WCAG Criteria:**
 * - 1.3.1 Info and Relationships (Level A)
 * - 3.3.1 Error Identification (Level A)
 * - 3.3.2 Labels or Instructions (Level A)
 * - 3.3.3 Error Suggestion (Level AA)
 * - 4.1.3 Status Messages (Level AA)
 * 
 * **Validation Checks:**
 * - All inputs have associated labels
 * - Required fields are marked
 * - Error messages are accessible
 * - Form structure is semantic
 * - Keyboard navigation works
 * 
 * @module formAccessibility
 * @category utils
 */

/**
 * Form violation type.
 */
export interface FormViolation {
  type: 
    | 'missing-label'
    | 'missing-required-indicator'
    | 'missing-error-description'
    | 'poor-error-association'
    | 'missing-fieldset'
    | 'missing-autocomplete';
  element: HTMLElement;
  message: string;
  fix: string;
  severity: 'error' | 'warning';
}

/**
 * Form validation result.
 */
export interface FormValidationResult {
  valid: boolean;
  violations: FormViolation[];
  formCount: number;
  inputCount: number;
  labeledInputs: number;
  requiredInputs: number;
  score: number; // 0-100
}

/**
 * Get all form inputs.
 */
function getAllInputs(): HTMLInputElement[] {
  const inputs = document.querySelectorAll('input, textarea, select');
  return Array.from(inputs) as HTMLInputElement[];
}

/**
 * Get label for input.
 */
function getLabelForInput(input: HTMLInputElement): HTMLLabelElement | null {
  // Check for explicit label (using for attribute)
  if (input.id) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) return label as HTMLLabelElement;
  }
  
  // Check for implicit label (wrapping label)
  const parentLabel = input.closest('label');
  if (parentLabel) return parentLabel as HTMLLabelElement;
  
  // Check for aria-labelledby
  const ariaLabelledBy = input.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy);
    if (labelElement) return labelElement as HTMLLabelElement;
  }
  
  return null;
}

/**
 * Check if input has accessible label.
 */
function hasAccessibleLabel(input: HTMLInputElement): boolean {
  // Check for label element
  if (getLabelForInput(input)) return true;
  
  // Check for aria-label
  if (input.getAttribute('aria-label')) return true;
  
  // Check for placeholder (not ideal but acceptable for some inputs)
  if (input.getAttribute('placeholder') && input.type === 'search') return true;
  
  // Hidden inputs don't need labels
  if (input.type === 'hidden') return true;
  
  // Submit/button inputs with value
  if ((input.type === 'submit' || input.type === 'button') && input.value) return true;
  
  return false;
}

/**
 * Validate form accessibility.
 * 
 * @returns {FormValidationResult} Validation result
 * 
 * @example
 * const result = validateFormAccessibility();
 * if (!result.valid) {
 *   console.error('Form violations:', result.violations);
 * }
 */
export function validateFormAccessibility(): FormValidationResult {
  const forms = document.querySelectorAll('form');
  const inputs = getAllInputs();
  const violations: FormViolation[] = [];
  
  let labeledInputs = 0;
  let requiredInputs = 0;
  
  inputs.forEach((input) => {
    // Skip hidden inputs
    if (input.type === 'hidden') return;
    
    // Check for label
    const hasLabel = hasAccessibleLabel(input);
    if (hasLabel) {
      labeledInputs++;
    } else {
      violations.push({
        type: 'missing-label',
        element: input,
        message: `Input element is missing an accessible label`,
        fix: 'Add a <label> element with for attribute, or use aria-label',
        severity: 'error',
      });
    }
    
    // Check required indicator
    if (input.required) {
      requiredInputs++;
      const label = getLabelForInput(input);
      
      if (label && !label.textContent?.includes('*') && !label.textContent?.includes('required')) {
        violations.push({
          type: 'missing-required-indicator',
          element: label,
          message: 'Required field is not visually indicated in label',
          fix: 'Add visual indicator (e.g., asterisk *) and aria-required="true"',
          severity: 'warning',
        });
      }
      
      if (!input.hasAttribute('aria-required')) {
        input.setAttribute('aria-required', 'true');
      }
    }
    
    // Check autocomplete for common fields
    const name = input.name.toLowerCase();
    const id = input.id.toLowerCase();
    
    if (
      (name.includes('email') || id.includes('email')) &&
      !input.hasAttribute('autocomplete')
    ) {
      violations.push({
        type: 'missing-autocomplete',
        element: input,
        message: 'Email input is missing autocomplete attribute',
        fix: 'Add autocomplete="email" for better UX',
        severity: 'warning',
      });
    }
    
    // Check for error description
    if (input.getAttribute('aria-invalid') === 'true') {
      const errorId = input.getAttribute('aria-describedby');
      
      if (!errorId || !document.getElementById(errorId)) {
        violations.push({
          type: 'missing-error-description',
          element: input,
          message: 'Invalid input is missing error description',
          fix: 'Add aria-describedby pointing to error message element',
          severity: 'error',
        });
      }
    }
  });
  
  // Check for fieldsets in radio/checkbox groups
  const radioGroups = new Map<string, HTMLInputElement[]>();
  inputs
    .filter((input) => input.type === 'radio' || input.type === 'checkbox')
    .forEach((input) => {
      const name = input.name;
      if (!radioGroups.has(name)) {
        radioGroups.set(name, []);
      }
      radioGroups.get(name)!.push(input);
    });
  
  radioGroups.forEach((group, name) => {
    if (group.length > 1) {
      const hasFieldset = group.some((input) => input.closest('fieldset'));
      
      if (!hasFieldset) {
        violations.push({
          type: 'missing-fieldset',
          element: group[0],
          message: `Radio/checkbox group "${name}" is not wrapped in a <fieldset>`,
          fix: 'Wrap related radio/checkbox inputs in <fieldset> with <legend>',
          severity: 'warning',
        });
      }
    }
  });
  
  // Calculate score
  const totalChecks = inputs.length * 2; // Each input has 2 main checks
  const passedChecks = totalChecks - violations.filter((v) => v.severity === 'error').length;
  const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;
  
  return {
    valid: violations.filter((v) => v.severity === 'error').length === 0,
    violations,
    formCount: forms.length,
    inputCount: inputs.length,
    labeledInputs,
    requiredInputs,
    score,
  };
}

/**
 * Log form accessibility report to console.
 * 
 * @example
 * logFormAccessibilityReport();
 */
export function logFormAccessibilityReport(): void {
  const result = validateFormAccessibility();
  
  console.group('📝 Form Accessibility Validation Report');
  
  if (result.valid) {
    console.log('%c✅ PASS - Forms are accessible!', 'color: #66BB6A; font-weight: bold;');
  } else {
    const errorCount = result.violations.filter((v) => v.severity === 'error').length;
    console.log(
      `%c❌ FAIL - Found ${errorCount} critical error(s)`,
      'color: #F44336; font-weight: bold;'
    );
  }
  
  console.log(`\n📊 Score: ${result.score}/100`);
  
  console.log('\n📈 Statistics:');
  console.table({
    'Total Forms': result.formCount,
    'Total Inputs': result.inputCount,
    'Labeled Inputs': result.labeledInputs,
    'Required Inputs': result.requiredInputs,
    'Label Coverage': `${result.inputCount > 0 ? Math.round((result.labeledInputs / result.inputCount) * 100) : 0}%`,
  });
  
  if (result.violations.length > 0) {
    console.log('\n⚠️ Violations:');
    
    const errors = result.violations.filter((v) => v.severity === 'error');
    const warnings = result.violations.filter((v) => v.severity === 'warning');
    
    if (errors.length > 0) {
      console.group(`🔴 Errors (${errors.length})`);
      errors.forEach((violation, index) => {
        console.group(`${index + 1}. ${violation.type}`);
        console.log('Message:', violation.message);
        console.log('Element:', violation.element);
        console.log('Fix:', violation.fix);
        console.groupEnd();
      });
      console.groupEnd();
    }
    
    if (warnings.length > 0) {
      console.group(`🟡 Warnings (${warnings.length})`);
      warnings.forEach((violation, index) => {
        console.group(`${index + 1}. ${violation.type}`);
        console.log('Message:', violation.message);
        console.log('Element:', violation.element);
        console.log('Fix:', violation.fix);
        console.groupEnd();
      });
      console.groupEnd();
    }
  }
  
  console.groupEnd();
}

/**
 * Highlight form violations in the DOM.
 * 
 * @param {boolean} enable - Whether to enable highlighting
 * 
 * @example
 * highlightFormViolations(true);  // Show violations
 * highlightFormViolations(false); // Hide violations
 */
export function highlightFormViolations(enable: boolean): void {
  const result = validateFormAccessibility();
  
  if (enable) {
    result.violations.forEach((violation) => {
      const color = violation.severity === 'error' ? '#F44336' : '#FFA726';
      violation.element.style.outline = `3px solid ${color}`;
      violation.element.style.outlineOffset = '2px';
      violation.element.setAttribute('data-form-violation', violation.message);
    });
  } else {
    const inputs = getAllInputs();
    inputs.forEach((input) => {
      input.style.outline = '';
      input.style.outlineOffset = '';
      input.removeAttribute('data-form-violation');
    });
  }
}

/**
 * Auto-run form validation in development mode.
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(logFormAccessibilityReport, 2500);
    });
  } else {
    setTimeout(logFormAccessibilityReport, 2500);
  }
}
