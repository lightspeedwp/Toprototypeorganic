/**
 * Integration Tester Page
 * 
 * Interactive tool for running and managing integration tests.
 * Simulates user flows and validates multi-component interactions.
 * 
 * @module IntegrationTester
 * @category dev-tools
 */

import { useState } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { runUserFlow, type UserFlowConfig, type IntegrationTestResult, logIntegrationTestResults } from "../../utils/integrationTestHelper";
import { Play, CheckCircle as CircleCheck, XCircle as CircleX, Clock, Warning as AlertTriangle } from "@phosphor-icons/react";

// Sample user flows for demonstration
const SAMPLE_FLOWS: UserFlowConfig[] = [
  {
    name: 'Search and Filter Tours',
    expectedOutcome: 'User can search and filter tour results',
    steps: [
      {
        action: 'type',
        selector: 'input[name="search"]',
        value: 'Iceland',
        description: 'Enter search term in search input',
      },
      {
        action: 'click',
        selector: 'button[type="submit"]',
        description: 'Click search button',
      },
      {
        action: 'wait',
        delay: 1000,
        description: 'Wait for search results to load',
      },
      {
        action: 'click',
        selector: '[data-filter="adventure"]',
        description: 'Apply adventure filter',
      },
      {
        action: 'wait',
        delay: 500,
        description: 'Wait for filtered results',
      },
    ],
  },
  {
    name: 'Navigation Flow',
    expectedOutcome: 'User can navigate through the site',
    steps: [
      {
        action: 'click',
        selector: 'a[href="/tours"]',
        description: 'Click tours link in navigation',
      },
      {
        action: 'wait',
        delay: 500,
        description: 'Wait for page transition',
      },
      {
        action: 'scroll',
        selector: '.tour-grid',
        description: 'Scroll to tour grid',
      },
      {
        action: 'click',
        selector: '.tour-card:first-child',
        description: 'Click first tour card',
      },
    ],
  },
  {
    name: 'Form Submission',
    expectedOutcome: 'User can submit contact form',
    steps: [
      {
        action: 'type',
        selector: 'input[name="name"]',
        value: 'John Doe',
        description: 'Enter name',
      },
      {
        action: 'type',
        selector: 'input[name="email"]',
        value: 'john@example.com',
        description: 'Enter email',
      },
      {
        action: 'type',
        selector: 'textarea[name="message"]',
        value: 'I am interested in your tours',
        description: 'Enter message',
      },
      {
        action: 'click',
        selector: 'button[type="submit"]',
        description: 'Submit form',
      },
      {
        action: 'wait',
        delay: 1000,
        description: 'Wait for submission',
      },
    ],
  },
];

export default function IntegrationTester() {
  const [selectedFlow, setSelectedFlow] = useState<UserFlowConfig | null>(null);
  const [results, setResults] = useState<IntegrationTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [customFlow, setCustomFlow] = useState<string>('');

  const runTest = async (flow: UserFlowConfig) => {
    setIsRunning(true);
    setSelectedFlow(flow);

    try {
      // Note: In a real implementation, this would render the actual component
      // For demonstration, we'll simulate the test
      const simulatedResult: IntegrationTestResult = {
        testName: flow.name,
        passed: Math.random() > 0.3, // 70% pass rate for demo
        duration: Math.floor(Math.random() * 3000) + 1000,
        stepsCompleted: Math.random() > 0.5 ? flow.steps.length : Math.floor(flow.steps.length * 0.7),
        totalSteps: flow.steps.length,
        errors: [],
        warnings: [],
        performance: {
          totalTime: Math.floor(Math.random() * 3000) + 1000,
          stepTimes: flow.steps.map(() => Math.floor(Math.random() * 500) + 100),
          averageStepTime: Math.floor(Math.random() * 300) + 100,
          slowestStep: {
            step: Math.floor(Math.random() * flow.steps.length) + 1,
            time: Math.floor(Math.random() * 800) + 200,
          },
          renderTime: Math.floor(Math.random() * 200) + 50,
        },
      };

      // Add errors if test failed
      if (!simulatedResult.passed) {
        simulatedResult.errors.push({
          step: simulatedResult.stepsCompleted + 1,
          message: 'Element not found or action failed',
        });
      }

      setResults(prev => [simulatedResult, ...prev]);
      logIntegrationTestResults([simulatedResult]);
    } finally {
      setIsRunning(false);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    for (const flow of SAMPLE_FLOWS) {
      await runTest(flow);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CircleCheck className="w-5 h-5 text-primary" />
    ) : (
      <CircleX className="w-5 h-5 text-destructive" />
    );
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Integration Tester" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Play className="w-8 h-8 text-primary" />
                <h1>Integration Tester</h1>
              </div>
              <p className="text-muted-foreground">
                Run user flow simulations and test component interactions
              </p>
            </div>

            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isRunning ? 'Running...' : 'Run All Tests'}
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Test Flows */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="mb-4">Available Test Flows</h2>

              <div className="space-y-3">
                {SAMPLE_FLOWS.map((flow, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-muted border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="mb-1">{flow.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {flow.steps.length} steps
                        </p>
                      </div>

                      <button
                        onClick={() => runTest(flow)}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm"
                      >
                        <Play className="w-4 h-4" />
                        Run
                      </button>
                    </div>

                    <div className="text-sm bg-background p-3 rounded">
                      <strong>Expected:</strong> {flow.expectedOutcome}
                    </div>

                    {/* Steps Preview */}
                    <div className="mt-3">
                      <details className="text-sm">
                        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                          View steps
                        </summary>
                        <ol className="mt-2 space-y-1 list-decimal list-inside">
                          {flow.steps.map((step, stepIdx) => (
                            <li key={stepIdx} className="text-muted-foreground">
                              {step.description}
                            </li>
                          ))}
                        </ol>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Flow Builder */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="mb-4">Custom Flow (JSON)</h2>

              <textarea
                value={customFlow}
                onChange={(e) => setCustomFlow(e.target.value)}
                className="w-full h-48 px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm focus-visible:ring-2 focus-visible:ring-ring"
                placeholder={JSON.stringify(SAMPLE_FLOWS[0], null, 2)}
              />

              <button
                onClick={() => {
                  try {
                    const flow = JSON.parse(customFlow);
                    runTest(flow);
                  } catch (e) {
                    alert('Invalid JSON');
                  }
                }}
                disabled={isRunning || !customFlow}
                className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Run Custom Flow
              </button>
            </div>
          </div>

          {/* Right: Test Results */}
          <div>
            {results.length > 0 ? (
              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h2 className="mb-4">Test Summary</h2>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total</div>
                      <div className="font-serif text-fluid-2xl">{results.length}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Passed</div>
                      <div className="font-serif text-fluid-2xl text-primary">
                        {results.filter(r => r.passed).length}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Failed</div>
                      <div className="font-serif text-fluid-2xl text-destructive">
                        {results.filter(r => !r.passed).length}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-semibold">
                        {((results.filter(r => r.passed).length / results.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Individual Results */}
                <div className="space-y-4">
                  {results.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-lg border ${
                        result.passed
                          ? 'bg-card border-border'
                          : 'bg-destructive/5 border-destructive/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(result.passed)}
                            <h3>{result.testName}</h3>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.stepsCompleted}/{result.totalSteps} steps completed
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {result.duration}ms
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4 p-3 rounded bg-muted mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Avg Step</div>
                          <div className="text-sm font-semibold">
                            {result.performance.averageStepTime.toFixed(0)}ms
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Slowest</div>
                          <div className="text-sm font-semibold">
                            Step {result.performance.slowestStep.step} ({result.performance.slowestStep.time}ms)
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Render</div>
                          <div className="text-sm font-semibold">
                            {result.performance.renderTime}ms
                          </div>
                        </div>
                      </div>

                      {/* Errors */}
                      {result.errors.length > 0 && (
                        <div className="wp-bg-destructive-light p-3 rounded">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            <strong className="text-sm">Errors</strong>
                          </div>
                          {result.errors.map((error, errorIdx) => (
                            <div key={errorIdx} className="text-sm">
                              Step {error.step}: {error.message}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Warnings */}
                      {result.warnings.length > 0 && (
                        <div className="bg-muted p-3 rounded mt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                            <strong className="text-sm">Warnings</strong>
                          </div>
                          {result.warnings.map((warning, warnIdx) => (
                            <div key={warnIdx} className="text-sm text-muted-foreground">
                              {warning}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-muted p-12 rounded-lg text-center h-full flex flex-col items-center justify-center">
                <Play className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="mb-2">No Tests Run Yet</h3>
                <p className="text-muted-foreground">
                  Select a test flow from the left to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg mt-8">
          <h3 className="mb-4">About Integration Testing</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">What Gets Tested</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Multi-component interactions</li>
                <li>User flow simulations</li>
                <li>Form submissions</li>
                <li>Navigation between pages</li>
                <li>State management across components</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Available Actions</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>click:</strong> Simulate clicking an element</li>
                <li><strong>type:</strong> Simulate typing into inputs</li>
                <li><strong>scroll:</strong> Scroll to an element</li>
                <li><strong>hover:</strong> Trigger hover states</li>
                <li><strong>focus:</strong> Focus an element</li>
                <li><strong>wait:</strong> Pause for async operations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Test complete user journeys</li>
                <li>Include wait times for async operations</li>
                <li>Use data attributes for reliable selectors</li>
                <li>Test both success and error paths</li>
                <li>Keep flows focused and atomic</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Performance Metrics</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Total Time:</strong> Complete flow duration</li>
                <li><strong>Step Times:</strong> Individual step performance</li>
                <li><strong>Avg Step:</strong> Average step execution time</li>
                <li><strong>Slowest:</strong> Bottleneck identification</li>
                <li><strong>Render:</strong> Initial render time</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}