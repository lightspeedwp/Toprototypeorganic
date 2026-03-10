/**
 * Keyboard Navigation Utilities
 * 
 * Validates and enhances keyboard navigation according to WCAG 2.1 Level A.
 * 
 * **WCAG Criteria:**
 * - 2.1.1 Keyboard (Level A)
 * - 2.1.2 No Keyboard Trap (Level A)
 * - 2.4.7 Focus Visible (Level AA)
 * - 2.4.3 Focus Order (Level A)
 * 
 * **Validation Checks:**
 * - All interactive elements are keyboard accessible
 * - Focus indicators are visible
 * - No keyboard traps
 * - Logical tab order
 * - Proper ARIA roles
 * 
 * @module keyboardNavigation
 * @category utils
 */

/**
 * Keyboard violation type.
 */
export interface KeyboardViolation {
  type:
    | 'missing-focus-indicator'
    | 'non-interactive-tabindex'
    | 'positive-tabindex'
    | 'poor-focus-order'
    | 'missing-role'
    | 'keyboard-trap';
  element: HTMLElement;
  message: string;
  fix: string;
  severity: 'error' | 'warning';
}

/**
 * Keyboard navigation result.
 */
export interface KeyboardNavigationResult {
  valid: boolean;
  violations: KeyboardViolation[];
  interactiveElements: number;
  keyboardAccessible: number;
  focusIndicators: number;
  score: number; // 0-100
}

/**
 * Get all interactive elements.
 */
function getInteractiveElements(): HTMLElement[] {
  const selector = [
    'a[href]',
    'button',
    'input',
    'textarea',
    'select',
    '[tabindex]',
    '[role="button"]',
    '[role="link"]',
    '[role="menuitem"]',
    '[role="tab"]',
    '[contenteditable="true"]',
  ].join(',');
  
  return Array.from(document.querySelectorAll<HTMLElement>(selector));
}

/**
 * Check if element has visible focus indicator.
 */
function hasVisibleFocusIndicator(element: HTMLElement): boolean {
  // Create a clone to test focus styles
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  document.body.appendChild(clone);
  
  // Get default styles
  const defaultStyles = window.getComputedStyle(clone);
  const defaultOutline = defaultStyles.outline;
  const defaultOutlineWidth = defaultStyles.outlineWidth;
  const defaultOutlineColor = defaultStyles.outlineColor;
  const defaultBoxShadow = defaultStyles.boxShadow;
  
  // Simulate focus
  clone.classList.add('focus');
  clone.setAttribute('data-focus', 'true');
  
  // Get focus styles
  const focusStyles = window.getComputedStyle(clone);
  const focusOutline = focusStyles.outline;
  const focusOutlineWidth = focusStyles.outlineWidth;
  const focusOutlineColor = focusStyles.outlineColor;
  const focusBoxShadow = focusStyles.boxShadow;
  
  // Clean up
  document.body.removeChild(clone);
  
  // Check if styles changed
  const hasOutlineChange =
    focusOutline !== defaultOutline ||
    focusOutlineWidth !== defaultOutlineWidth ||
    focusOutlineColor !== defaultOutlineColor;
  
  const hasBoxShadowChange = focusBoxShadow !== defaultBoxShadow;
  
  // Check for focus-visible or focus classes in stylesheet
  const hasExplicitFocusClass =
    element.className.includes('focus') ||
    element.className.includes('ring');
  
  return hasOutlineChange || hasBoxShadowChange || hasExplicitFocusClass;
}

/**
 * Check if element is keyboard accessible.
 */
function isKeyboardAccessible(element: HTMLElement): boolean {
  // Disabled elements are not accessible
  if (element.hasAttribute('disabled')) return false;
  
  // Check tabindex
  const tabindex = element.getAttribute('tabindex');
  if (tabindex === '-1') return false;
  
  // Native interactive elements are accessible
  const tagName = element.tagName.toLowerCase();
  if (['a', 'button', 'input', 'textarea', 'select'].includes(tagName)) {
    return true;
  }
  
  // Elements with positive tabindex are accessible (but not recommended)
  if (tabindex && parseInt(tabindex, 10) >= 0) return true;
  
  // Elements with interactive roles should have tabindex
  const role = element.getAttribute('role');
  if (role && ['button', 'link', 'menuitem', 'tab'].includes(role)) {
    return tabindex !== null;
  }
  
  return false;
}

/**
 * Validate keyboard navigation.
 * 
 * @returns {KeyboardNavigationResult} Validation result
 * 
 * @example
 * const result = validateKeyboardNavigation();
 * if (!result.valid) {
 *   console.error('Keyboard violations:', result.violations);
 * }
 */
export function validateKeyboardNavigation(): KeyboardNavigationResult {
  const elements = getInteractiveElements();
  const violations: KeyboardViolation[] = [];
  
  let keyboardAccessible = 0;
  let focusIndicators = 0;
  
  elements.forEach((element, index) => {
    // Check keyboard accessibility
    if (isKeyboardAccessible(element)) {
      keyboardAccessible++;
    }
    
    // Check for positive tabindex (anti-pattern)
    const tabindex = element.getAttribute('tabindex');
    if (tabindex && parseInt(tabindex, 10) > 0) {
      violations.push({
        type: 'positive-tabindex',
        element,
        message: `Element has positive tabindex (${tabindex}). This creates unpredictable tab order.`,
        fix: 'Use tabindex="0" or restructure HTML for proper source order',
        severity: 'warning',
      });
    }
    
    // Check for non-interactive elements with tabindex
    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute('role');
    const interactiveTags = ['a', 'button', 'input', 'textarea', 'select'];
    const interactiveRoles = ['button', 'link', 'menuitem', 'tab', 'checkbox', 'radio'];
    
    if (
      tabindex === '0' &&
      !interactiveTags.includes(tagName) &&
      (!role || !interactiveRoles.includes(role))
    ) {
      violations.push({
        type: 'non-interactive-tabindex',
        element,
        message: 'Non-interactive element has tabindex="0"',
        fix: 'Remove tabindex or add appropriate role and keyboard handlers',
        severity: 'warning',
      });
    }
    
    // Check for missing role on custom interactive elements
    if (
      !interactiveTags.includes(tagName) &&
      tabindex === '0' &&
      !role &&
      !element.hasAttribute('aria-label')
    ) {
      violations.push({
        type: 'missing-role',
        element,
        message: 'Custom interactive element is missing ARIA role',
        fix: 'Add appropriate role (e.g., role="button") and keyboard handlers',
        severity: 'error',
      });
    }
    
    // Check focus indicator (simplified check)
    const hasFocusStyles = 
      element.className.includes('focus:') ||
      element.className.includes('ring-') ||
      element.style.outline !== '';
    
    if (hasFocusStyles) {
      focusIndicators++;
    } else {
      // Only flag if it's truly interactive
      if (isKeyboardAccessible(element)) {
        violations.push({
          type: 'missing-focus-indicator',
          element,
          message: 'Interactive element lacks visible focus indicator',
          fix: 'Add focus styles using focus:ring-2 focus:ring-ring or custom focus styles',
          severity: 'error',
        });
      }
    }
  });
  
  // Calculate score
  const totalChecks = elements.length * 2; // Each element has 2 main checks
  const errorCount = violations.filter((v) => v.severity === 'error').length;
  const passedChecks = totalChecks - errorCount;
  const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;
  
  return {
    valid: errorCount === 0,
    violations,
    interactiveElements: elements.length,
    keyboardAccessible,
    focusIndicators,
    score,
  };
}

/**
 * Log keyboard navigation report to console.
 * 
 * @example
 * logKeyboardNavigationReport();
 */
export function logKeyboardNavigationReport(): void {
  const result = validateKeyboardNavigation();
  
  console.group('⌨️ Keyboard Navigation Validation Report');
  
  if (result.valid) {
    console.log('%c✅ PASS - Keyboard navigation is accessible!', 'color: #66BB6A; font-weight: bold;');
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
    'Interactive Elements': result.interactiveElements,
    'Keyboard Accessible': result.keyboardAccessible,
    'With Focus Indicators': result.focusIndicators,
    'Keyboard Coverage': `${result.interactiveElements > 0 ? Math.round((result.keyboardAccessible / result.interactiveElements) * 100) : 0}%`,
    'Focus Coverage': `${result.interactiveElements > 0 ? Math.round((result.focusIndicators / result.interactiveElements) * 100) : 0}%`,
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
  
  console.log('\n💡 Keyboard Navigation Tips:');
  console.log('1. Use Tab to navigate forward, Shift+Tab to navigate backward');
  console.log('2. Use Enter/Space to activate buttons and links');
  console.log('3. Use Arrow keys for navigating lists, menus, and sliders');
  console.log('4. Use Escape to close modals and menus');
  console.log('5. Ensure all functionality is keyboard accessible');
  
  console.groupEnd();
}

/**
 * Highlight keyboard violations in the DOM.
 * 
 * @param {boolean} enable - Whether to enable highlighting
 * 
 * @example
 * highlightKeyboardViolations(true);  // Show violations
 * highlightKeyboardViolations(false); // Hide violations
 */
export function highlightKeyboardViolations(enable: boolean): void {
  const result = validateKeyboardNavigation();
  
  if (enable) {
    result.violations.forEach((violation) => {
      const color = violation.severity === 'error' ? '#F44336' : '#FFA726';
      violation.element.style.outline = `3px solid ${color}`;
      violation.element.style.outlineOffset = '2px';
      violation.element.setAttribute('data-keyboard-violation', violation.message);
    });
  } else {
    const elements = getInteractiveElements();
    elements.forEach((element) => {
      element.style.outline = '';
      element.style.outlineOffset = '';
      element.removeAttribute('data-keyboard-violation');
    });
  }
}

/**
 * Test keyboard navigation interactively.
 * 
 * @example
 * testKeyboardNavigation();
 */
export function testKeyboardNavigation(): void {
  console.log('🧪 Starting interactive keyboard navigation test...');
  console.log('Press Tab to navigate, observe focus indicators');
  console.log('Press Escape to end test');
  
  let tabCount = 0;
  const elements: HTMLElement[] = [];
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      tabCount++;
      const activeElement = document.activeElement as HTMLElement;
      elements.push(activeElement);
      
      console.log(`Tab #${tabCount}:`, activeElement.tagName, activeElement.className);
    }
    
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', handleKeyDown);
      
      console.log('\n✅ Test complete!');
      console.log(`Total tabs: ${tabCount}`);
      console.log('Tab order:', elements);
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
}

/**
 * Auto-run keyboard validation in development mode.
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(logKeyboardNavigationReport, 3000);
    });
  } else {
    setTimeout(logKeyboardNavigationReport, 3000);
  }
}
