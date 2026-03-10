/**
 * Heading Hierarchy Validator
 * 
 * Validates that heading elements (h1-h6) follow proper hierarchy
 * as required by WCAG 2.1 Level A.
 * 
 * **WCAG Criteria:**
 * - 1.3.1 Info and Relationships (Level A)
 * - 2.4.6 Headings and Labels (Level AA)
 * 
 * **Validation Rules:**
 * - Exactly one h1 per page
 * - No skipped levels (h1 -> h3 is invalid)
 * - Proper nesting depth
 * - Logical content structure
 * 
 * @module headingValidator
 * @category utils
 */

/**
 * Heading violation type.
 */
export interface HeadingViolation {
  type: 'missing-h1' | 'multiple-h1' | 'skipped-level' | 'improper-nesting';
  level: number;
  element: HTMLHeadingElement;
  message: string;
  fix: string;
}

/**
 * Heading validation result.
 */
export interface HeadingValidationResult {
  valid: boolean;
  violations: HeadingViolation[];
  headingCount: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  headingTree: HeadingNode[];
}

/**
 * Heading tree node.
 */
export interface HeadingNode {
  level: number;
  text: string;
  element: HTMLHeadingElement;
  children: HeadingNode[];
}

/**
 * Get all heading elements from the document.
 */
function getAllHeadings(): HTMLHeadingElement[] {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  return Array.from(headings) as HTMLHeadingElement[];
}

/**
 * Get heading level from element.
 */
function getHeadingLevel(heading: HTMLHeadingElement): number {
  return parseInt(heading.tagName.substring(1), 10);
}

/**
 * Build heading tree structure.
 */
function buildHeadingTree(headings: HTMLHeadingElement[]): HeadingNode[] {
  const tree: HeadingNode[] = [];
  const stack: HeadingNode[] = [];
  
  headings.forEach((heading) => {
    const level = getHeadingLevel(heading);
    const node: HeadingNode = {
      level,
      text: heading.textContent || '',
      element: heading,
      children: [],
    };
    
    // Find parent node
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      tree.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    
    stack.push(node);
  });
  
  return tree;
}

/**
 * Validate heading hierarchy.
 * 
 * @returns {HeadingValidationResult} Validation result
 * 
 * @example
 * const result = validateHeadingHierarchy();
 * if (!result.valid) {
 *   console.error('Heading violations:', result.violations);
 * }
 */
export function validateHeadingHierarchy(): HeadingValidationResult {
  const headings = getAllHeadings();
  const violations: HeadingViolation[] = [];
  
  // Count headings by level
  const headingCount = {
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
  };
  
  headings.forEach((heading) => {
    const level = getHeadingLevel(heading);
    headingCount[`h${level}` as keyof typeof headingCount]++;
  });
  
  // Check for missing h1
  if (headingCount.h1 === 0) {
    violations.push({
      type: 'missing-h1',
      level: 1,
      element: headings[0] || document.createElement('h1'),
      message: 'Page is missing an h1 heading',
      fix: 'Add exactly one h1 heading to the page',
    });
  }
  
  // Check for multiple h1s
  if (headingCount.h1 > 1) {
    const h1Elements = headings.filter((h) => getHeadingLevel(h) === 1);
    h1Elements.slice(1).forEach((h1) => {
      violations.push({
        type: 'multiple-h1',
        level: 1,
        element: h1,
        message: `Multiple h1 headings found. Page should have exactly one h1.`,
        fix: 'Change additional h1 elements to h2 or lower',
      });
    });
  }
  
  // Check for skipped levels
  let previousLevel = 0;
  headings.forEach((heading, index) => {
    const level = getHeadingLevel(heading);
    
    if (previousLevel > 0 && level > previousLevel + 1) {
      violations.push({
        type: 'skipped-level',
        level,
        element: heading,
        message: `Heading level ${level} follows h${previousLevel}. Levels should not be skipped.`,
        fix: `Change this h${level} to h${previousLevel + 1} or ensure proper heading hierarchy`,
      });
    }
    
    previousLevel = level;
  });
  
  // Build heading tree
  const headingTree = buildHeadingTree(headings);
  
  return {
    valid: violations.length === 0,
    violations,
    headingCount,
    headingTree,
  };
}

/**
 * Log heading validation report to console.
 * 
 * @example
 * logHeadingReport();
 */
export function logHeadingReport(): void {
  const result = validateHeadingHierarchy();
  
  console.group('📋 Heading Hierarchy Validation Report');
  
  if (result.valid) {
    console.log('%c✅ PASS - Heading hierarchy is valid!', 'color: #66BB6A; font-weight: bold;');
  } else {
    console.log(
      `%c❌ FAIL - Found ${result.violations.length} heading violation(s)`,
      'color: #F44336; font-weight: bold;'
    );
  }
  
  console.log('\n📊 Heading Count:');
  console.table(result.headingCount);
  
  if (result.violations.length > 0) {
    console.log('\n⚠️ Violations:');
    result.violations.forEach((violation, index) => {
      console.group(`${index + 1}. ${violation.type}`);
      console.log('Message:', violation.message);
      console.log('Element:', violation.element);
      console.log('Text:', violation.element.textContent);
      console.log('Fix:', violation.fix);
      console.groupEnd();
    });
  }
  
  console.log('\n🌳 Heading Tree:');
  console.log(formatHeadingTree(result.headingTree));
  
  console.groupEnd();
}

/**
 * Format heading tree for display.
 */
function formatHeadingTree(nodes: HeadingNode[], indent = 0): string {
  let output = '';
  
  nodes.forEach((node) => {
    const prefix = '  '.repeat(indent);
    output += `${prefix}h${node.level}: ${node.text}\n`;
    
    if (node.children.length > 0) {
      output += formatHeadingTree(node.children, indent + 1);
    }
  });
  
  return output;
}

/**
 * Highlight heading violations in the DOM.
 * 
 * @param {boolean} enable - Whether to enable highlighting
 * 
 * @example
 * highlightHeadingViolations(true);  // Show violations
 * highlightHeadingViolations(false); // Hide violations
 */
export function highlightHeadingViolations(enable: boolean): void {
  const result = validateHeadingHierarchy();
  
  if (enable) {
    result.violations.forEach((violation) => {
      violation.element.style.outline = '3px solid #F44336';
      violation.element.style.outlineOffset = '2px';
      violation.element.setAttribute('data-heading-violation', violation.message);
    });
  } else {
    const headings = getAllHeadings();
    headings.forEach((heading) => {
      heading.style.outline = '';
      heading.style.outlineOffset = '';
      heading.removeAttribute('data-heading-violation');
    });
  }
}

/**
 * Auto-run heading validation in development mode.
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run validation after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(logHeadingReport, 2000);
    });
  } else {
    setTimeout(logHeadingReport, 2000);
  }
}
