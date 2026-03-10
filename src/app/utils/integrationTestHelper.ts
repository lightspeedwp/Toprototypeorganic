/**
 * Integration Test Helper
 * 
 * Utilities for integration testing across multiple components.
 * Provides user flow simulation, API mocking, and end-to-end test helpers.
 * 
 * @module integrationTestHelper
 * @category utils
 */

import { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * User flow test configuration.
 */
export interface UserFlowConfig {
  name: string;
  steps: UserFlowStep[];
  expectedOutcome: string;
  timeout?: number;
}

/**
 * Individual user flow step.
 */
export interface UserFlowStep {
  action: 'click' | 'type' | 'wait' | 'navigate' | 'scroll' | 'hover' | 'focus';
  selector?: string;
  value?: string;
  delay?: number;
  assertion?: () => void | Promise<void>;
  description: string;
}

/**
 * Integration test result.
 */
export interface IntegrationTestResult {
  testName: string;
  passed: boolean;
  duration: number;
  stepsCompleted: number;
  totalSteps: number;
  errors: TestError[];
  warnings: string[];
  performance: PerformanceMetrics;
}

/**
 * Test error information.
 */
export interface TestError {
  step: number;
  message: string;
  stack?: string;
  screenshot?: string;
}

/**
 * Performance metrics for integration test.
 */
export interface PerformanceMetrics {
  totalTime: number;
  stepTimes: number[];
  averageStepTime: number;
  slowestStep: { step: number; time: number };
  renderTime: number;
}

/**
 * Mock API response configuration.
 */
export interface MockAPIConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  response: any;
  status?: number;
  delay?: number;
  headers?: Record<string, string>;
}

/**
 * Component integration test suite.
 */
export interface IntegrationTestSuite {
  name: string;
  components: ReactElement[];
  flows: UserFlowConfig[];
  mocks?: MockAPIConfig[];
  setup?: () => void | Promise<void>;
  teardown?: () => void | Promise<void>;
}

/**
 * Simulate user clicking an element.
 */
export async function simulateClick(
  container: HTMLElement,
  selector: string,
  description: string = ''
): Promise<void> {
  const element = container.querySelector(selector);
  
  if (!element) {
    throw new Error(`Element not found: ${selector}${description ? ` (${description})` : ''}`);
  }
  
  if (element instanceof HTMLElement) {
    element.click();
  } else {
    throw new Error(`Element is not clickable: ${selector}`);
  }
  
  // Wait for potential state updates
  await wait(100);
}

/**
 * Simulate user typing into an input.
 */
export async function simulateType(
  container: HTMLElement,
  selector: string,
  value: string,
  description: string = ''
): Promise<void> {
  const element = container.querySelector(selector);
  
  if (!element) {
    throw new Error(`Element not found: ${selector}${description ? ` (${description})` : ''}`);
  }
  
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    // Clear existing value
    element.value = '';
    
    // Type character by character to simulate real user input
    for (const char of value) {
      element.value += char;
      
      // Dispatch input event for each character
      const inputEvent = new Event('input', { bubbles: true });
      element.dispatchEvent(inputEvent);
      
      await wait(50); // Simulate typing speed
    }
    
    // Dispatch change event after typing
    const changeEvent = new Event('change', { bubbles: true });
    element.dispatchEvent(changeEvent);
  } else {
    throw new Error(`Element is not an input: ${selector}`);
  }
  
  await wait(100);
}

/**
 * Simulate user scrolling to an element.
 */
export async function simulateScroll(
  container: HTMLElement,
  selector: string,
  description: string = ''
): Promise<void> {
  const element = container.querySelector(selector);
  
  if (!element) {
    throw new Error(`Element not found: ${selector}${description ? ` (${description})` : ''}`);
  }
  
  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  
  await wait(500); // Wait for scroll animation
}

/**
 * Simulate user hovering over an element.
 */
export async function simulateHover(
  container: HTMLElement,
  selector: string,
  description: string = ''
): Promise<void> {
  const element = container.querySelector(selector);
  
  if (!element) {
    throw new Error(`Element not found: ${selector}${description ? ` (${description})` : ''}`);
  }
  
  const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
  element.dispatchEvent(mouseEnterEvent);
  
  await wait(100);
}

/**
 * Simulate user focusing an element.
 */
export async function simulateFocus(
  container: HTMLElement,
  selector: string,
  description: string = ''
): Promise<void> {
  const element = container.querySelector(selector);
  
  if (!element) {
    throw new Error(`Element not found: ${selector}${description ? ` (${description})` : ''}`);
  }
  
  if (element instanceof HTMLElement) {
    element.focus();
  }
  
  await wait(100);
}

/**
 * Wait for a specified duration.
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wait for an element to appear.
 */
export async function waitForElement(
  container: HTMLElement,
  selector: string,
  timeout: number = 5000
): Promise<HTMLElement> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const element = container.querySelector(selector);
    if (element) {
      return element as HTMLElement;
    }
    await wait(100);
  }
  
  throw new Error(`Element not found within timeout: ${selector}`);
}

/**
 * Wait for an element to disappear.
 */
export async function waitForElementToDisappear(
  container: HTMLElement,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const element = container.querySelector(selector);
    if (!element) {
      return;
    }
    await wait(100);
  }
  
  throw new Error(`Element did not disappear within timeout: ${selector}`);
}

/**
 * Mock fetch API.
 */
export function mockFetch(configs: MockAPIConfig[]): void {
  const originalFetch = global.fetch;
  
  (global as any)._originalFetch = originalFetch;
  
  global.fetch = function(url: string | URL | Request, options?: RequestInit) {
    const urlStr = typeof url === 'string' ? url : url instanceof URL ? url.toString() : url.url;
    const method = options?.method || 'GET';
    
    // Find matching mock
    const mock = configs.find(c => 
      urlStr.includes(c.url) && c.method === method
    );
    
    if (mock) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(new Response(JSON.stringify(mock.response), {
            status: mock.status || 200,
            headers: new Headers(mock.headers || {}),
          }));
        }, mock.delay || 0);
      });
    }
    
    // Call original fetch if no mock found
    return originalFetch(url, options);
  };
}

/**
 * Restore original fetch.
 */
export function restoreFetch(): void {
  if ((global as any)._originalFetch) {
    global.fetch = (global as any)._originalFetch;
    delete (global as any)._originalFetch;
  }
}

/**
 * Run a user flow test.
 * 
 * @param component - Component to test
 * @param flow - User flow configuration
 * @returns Integration test result
 * 
 * @example
 * ```tsx
 * const flow: UserFlowConfig = {
 *   name: 'Search for tours',
 *   steps: [
 *     {
 *       action: 'type',
 *       selector: 'input[name="search"]',
 *       value: 'Iceland',
 *       description: 'Enter search term',
 *     },
 *     {
 *       action: 'click',
 *       selector: 'button[type="submit"]',
 *       description: 'Click search button',
 *     },
 *     {
 *       action: 'wait',
 *       delay: 1000,
 *       description: 'Wait for results',
 *     },
 *   ],
 *   expectedOutcome: 'Tours list is filtered',
 * };
 * 
 * const result = await runUserFlow(<ToursPage />, flow);
 * expect(result.passed).toBe(true);
 * ```
 */
export async function runUserFlow(
  component: ReactElement,
  flow: UserFlowConfig
): Promise<IntegrationTestResult> {
  const startTime = Date.now();
  const errors: TestError[] = [];
  const warnings: string[] = [];
  const stepTimes: number[] = [];
  let stepsCompleted = 0;
  
  let container: HTMLElement;
  // RenderResult removed — using native DOM render
  
  try {
    // Render component
    const renderStart = Date.now();
    container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(component);
    const renderTime = Date.now() - renderStart;
    
    // Execute each step
    for (let i = 0; i < flow.steps.length; i++) {
      const step = flow.steps[i];
      const stepStart = Date.now();
      
      try {
        switch (step.action) {
          case 'click':
            if (!step.selector) throw new Error('Click action requires selector');
            await simulateClick(container, step.selector, step.description);
            break;
            
          case 'type':
            if (!step.selector || !step.value) {
              throw new Error('Type action requires selector and value');
            }
            await simulateType(container, step.selector, step.value, step.description);
            break;
            
          case 'scroll':
            if (!step.selector) throw new Error('Scroll action requires selector');
            await simulateScroll(container, step.selector, step.description);
            break;
            
          case 'hover':
            if (!step.selector) throw new Error('Hover action requires selector');
            await simulateHover(container, step.selector, step.description);
            break;
            
          case 'focus':
            if (!step.selector) throw new Error('Focus action requires selector');
            await simulateFocus(container, step.selector, step.description);
            break;
            
          case 'wait':
            await wait(step.delay || 1000);
            break;
            
          case 'navigate':
            // Navigation would be handled by router in real app
            warnings.push(`Navigation action not fully supported in test: ${step.description}`);
            break;
        }
        
        // Run assertion if provided
        if (step.assertion) {
          await step.assertion();
        }
        
        stepsCompleted++;
        stepTimes.push(Date.now() - stepStart);
        
      } catch (error) {
        errors.push({
          step: i + 1,
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
        break; // Stop on first error
      }
    }
    
    const totalTime = Date.now() - startTime;
    const averageStepTime = stepTimes.reduce((a, b) => a + b, 0) / stepTimes.length;
    const slowestStepIndex = stepTimes.indexOf(Math.max(...stepTimes));
    
    return {
      testName: flow.name,
      passed: errors.length === 0 && stepsCompleted === flow.steps.length,
      duration: totalTime,
      stepsCompleted,
      totalSteps: flow.steps.length,
      errors,
      warnings,
      performance: {
        totalTime,
        stepTimes,
        averageStepTime,
        slowestStep: {
          step: slowestStepIndex + 1,
          time: stepTimes[slowestStepIndex] || 0,
        },
        renderTime,
      },
    };
    
  } catch (error) {
    errors.push({
      step: 0,
      message: `Setup error: ${error instanceof Error ? error.message : String(error)}`,
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return {
      testName: flow.name,
      passed: false,
      duration: Date.now() - startTime,
      stepsCompleted,
      totalSteps: flow.steps.length,
      errors,
      warnings,
      performance: {
        totalTime: Date.now() - startTime,
        stepTimes,
        averageStepTime: 0,
        slowestStep: { step: 0, time: 0 },
        renderTime: 0,
      },
    };
  }
}

/**
 * Run a complete integration test suite.
 */
export async function runIntegrationTestSuite(
  suite: IntegrationTestSuite
): Promise<IntegrationTestResult[]> {
  const results: IntegrationTestResult[] = [];
  
  try {
    // Setup
    if (suite.setup) {
      await suite.setup();
    }
    
    // Mock APIs if provided
    if (suite.mocks) {
      mockFetch(suite.mocks);
    }
    
    // Run all flows
    for (const flow of suite.flows) {
      const result = await runUserFlow(suite.components[0], flow);
      results.push(result);
    }
    
  } finally {
    // Cleanup
    if (suite.mocks) {
      restoreFetch();
    }
    
    if (suite.teardown) {
      await suite.teardown();
    }
  }
  
  return results;
}

/**
 * Assert element is visible.
 */
export function assertVisible(element: Element | null, message?: string): void {
  if (!element) {
    throw new Error(message || 'Element not found');
  }
  
  const htmlElement = element as HTMLElement;
  const style = window.getComputedStyle(htmlElement);
  
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    throw new Error(message || 'Element is not visible');
  }
}

/**
 * Assert element contains text.
 */
export function assertContainsText(
  element: Element | null,
  text: string,
  message?: string
): void {
  if (!element) {
    throw new Error(message || 'Element not found');
  }
  
  if (!element.textContent?.includes(text)) {
    throw new Error(
      message || `Element does not contain text: "${text}". Found: "${element.textContent}"`
    );
  }
}

/**
 * Assert element has class.
 */
export function assertHasClass(
  element: Element | null,
  className: string,
  message?: string
): void {
  if (!element) {
    throw new Error(message || 'Element not found');
  }
  
  if (!element.classList.contains(className)) {
    throw new Error(
      message || `Element does not have class: "${className}". Classes: ${element.className}`
    );
  }
}

/**
 * Assert element has attribute.
 */
export function assertHasAttribute(
  element: Element | null,
  attribute: string,
  value?: string,
  message?: string
): void {
  if (!element) {
    throw new Error(message || 'Element not found');
  }
  
  if (!element.hasAttribute(attribute)) {
    throw new Error(message || `Element does not have attribute: "${attribute}"`);
  }
  
  if (value !== undefined && element.getAttribute(attribute) !== value) {
    throw new Error(
      message || 
      `Element attribute "${attribute}" has wrong value. Expected: "${value}", Found: "${element.getAttribute(attribute)}"`
    );
  }
}

/**
 * Log integration test results to console.
 */
export function logIntegrationTestResults(results: IntegrationTestResult[]): void {
  console.group('🔗 Integration Test Results');
  
  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = totalTests - passedTests;
  
  console.log(`\nTotal Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} ✅`);
  console.log(`Failed: ${failedTests} ${failedTests > 0 ? '❌' : ''}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  results.forEach(result => {
    console.group(`\n${result.passed ? '✅' : '❌'} ${result.testName}`);
    
    console.log(`Duration: ${result.duration}ms`);
    console.log(`Steps: ${result.stepsCompleted}/${result.totalSteps}`);
    console.log(`Average Step Time: ${result.performance.averageStepTime.toFixed(1)}ms`);
    console.log(`Render Time: ${result.performance.renderTime}ms`);
    
    if (result.errors.length > 0) {
      console.group('\nErrors:');
      result.errors.forEach(error => {
        console.error(`Step ${error.step}: ${error.message}`);
        if (error.stack) {
          console.error(error.stack);
        }
      });
      console.groupEnd();
    }
    
    if (result.warnings.length > 0) {
      console.group('\nWarnings:');
      result.warnings.forEach(warning => console.warn(warning));
      console.groupEnd();
    }
    
    console.groupEnd();
  });
  
  console.groupEnd();
}

/**
 * Generate test report summary.
 */
export function generateTestReport(results: IntegrationTestResult[]): string {
  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = totalTests - passedTests;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  
  let report = `# Integration Test Report\n\n`;
  report += `**Total Tests:** ${totalTests}\n`;
  report += `**Passed:** ${passedTests} ✅\n`;
  report += `**Failed:** ${failedTests} ${failedTests > 0 ? '❌' : ''}\n`;
  report += `**Success Rate:** ${((passedTests / totalTests) * 100).toFixed(1)}%\n`;
  report += `**Total Duration:** ${totalDuration}ms\n\n`;
  
  report += `## Test Results\n\n`;
  
  results.forEach(result => {
    report += `### ${result.passed ? '✅' : '❌'} ${result.testName}\n\n`;
    report += `- **Duration:** ${result.duration}ms\n`;
    report += `- **Steps Completed:** ${result.stepsCompleted}/${result.totalSteps}\n`;
    report += `- **Average Step Time:** ${result.performance.averageStepTime.toFixed(1)}ms\n`;
    
    if (result.errors.length > 0) {
      report += `\n**Errors:**\n`;
      result.errors.forEach(error => {
        report += `- Step ${error.step}: ${error.message}\n`;
      });
    }
    
    report += '\n';
  });
  
  return report;
}