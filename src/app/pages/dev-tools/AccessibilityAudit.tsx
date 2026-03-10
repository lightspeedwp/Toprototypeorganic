/**
 * Accessibility Audit Page
 * 
 * Interactive accessibility auditing tool for WCAG 2.1 compliance.
 * Real-time validation and recommendations.
 * 
 * @module AccessibilityAudit
 * @category dev-tools
 */

import { useState } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { auditAccessibility, logAccessibilityAudit, type A11yAuditResult, type ViolationSeverity } from "../../utils/accessibilityAuditor";
import { Shield, ArrowsClockwise as RefreshCw, CheckCircle as CircleCheck, XCircle as CircleX, Warning as AlertTriangle, Info } from "@phosphor-icons/react";

export default function AccessibilityAudit() {
  const [result, setResult] = useState<A11yAuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [options, setOptions] = useState({
    includeWarnings: true,
    checkColorContrast: true,
    checkKeyboardNav: true,
    checkAria: true,
    checkForms: true,
    checkImages: true,
    checkHeadings: true,
    checkLandmarks: true,
  });

  const runAudit = () => {
    setIsAuditing(true);
    
    // Run audit after a brief delay to show loading state
    setTimeout(() => {
      const auditResult = auditAccessibility(document.body, options);
      setResult(auditResult);
      logAccessibilityAudit(auditResult);
      setIsAuditing(false);
    }, 500);
  };

  const getSeverityIcon = (severity: ViolationSeverity) => {
    switch (severity) {
      case 'critical':
        return <CircleX className="w-5 h-5 text-destructive" />;
      case 'serious':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'moderate':
        return <AlertTriangle className="w-5 h-5 text-muted-foreground" />;
      case 'minor':
        return <Info className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: ViolationSeverity) => {
    switch (severity) {
      case 'critical':
      case 'serious':
        return 'border-destructive bg-destructive/10';
      case 'moderate':
        return 'border-muted-foreground bg-muted';
      case 'minor':
        return 'border-border bg-card';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-primary';
    if (score >= 70) return 'text-muted-foreground';
    return 'text-destructive';
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Accessibility Audit" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-primary" />
                <h1>Accessibility Audit</h1>
              </div>
              <p className="text-muted-foreground">
                WCAG 2.1 Level AA/AAA compliance validation and recommendations
              </p>
            </div>

            <button
              onClick={runAudit}
              disabled={isAuditing}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
              {isAuditing ? 'Auditing...' : 'Run Audit'}
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        {/* Audit Options */}
        <div className="bg-card p-6 rounded-lg border border-border mb-8">
          <h2 className="mb-4">Audit Options</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Results */}
        {result ? (
          <>
            {/* Score Card */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg border border-border mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="mb-2">Accessibility Score</h2>
                  <p className={`font-serif text-fluid-6xl ${getScoreColor(result.score)}`}>
                    {result.score}
                    <span className="font-serif text-fluid-3xl text-muted-foreground">/100</span>
                  </p>
                  <p className="text-muted-foreground mt-2">{result.summary}</p>
                </div>

                <div className="text-right">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-card p-4 rounded-lg border border-border min-w-[200px]">
                      <div className="text-sm text-muted-foreground mb-2">WCAG Compliance</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Level A</span>
                          {result.wcagCompliance.levelA ? (
                            <CircleCheck className="w-5 h-5 text-primary" />
                          ) : (
                            <CircleX className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Level AA</span>
                          {result.wcagCompliance.levelAA ? (
                            <CircleCheck className="w-5 h-5 text-primary" />
                          ) : (
                            <CircleX className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Level AAA</span>
                          {result.wcagCompliance.levelAAA ? (
                            <CircleCheck className="w-5 h-5 text-primary" />
                          ) : (
                            <CircleX className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-4 rounded-lg border border-border">
                      <div className="text-sm text-muted-foreground mb-1">Checks</div>
                      <div className="font-serif text-fluid-2xl">
                        {result.passedChecks}/{result.totalChecks}
                      </div>
                      <div className="text-xs text-muted-foreground">passed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Violations */}
            {result.violations.length > 0 ? (
              <div className="space-y-4">
                <h2 className="mb-6">
                  Violations Found ({result.violations.length})
                </h2>

                {/* Group by severity */}
                {(['critical', 'serious', 'moderate', 'minor'] as ViolationSeverity[]).map((severity) => {
                  const violations = result.violations.filter((v) => v.severity === severity);
                  if (violations.length === 0) return null;

                  return (
                    <div key={severity} className="space-y-3">
                      <h3 className="flex items-center gap-2 capitalize">
                        {getSeverityIcon(severity)}
                        {severity} ({violations.length})
                      </h3>

                      {violations.map((violation, idx) => (
                        <div
                          key={idx}
                          className={`p-6 rounded-lg border ${getSeverityColor(violation.severity)}`}
                        >
                          <div className="flex items-start gap-4">
                            {getSeverityIcon(violation.severity)}
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <h4 className="mb-1">{violation.message}</h4>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="px-2 py-1 rounded bg-background/50">
                                      {violation.criterion}
                                    </span>
                                    <span className="px-2 py-1 rounded bg-background/50">
                                      WCAG {violation.wcagLevel}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-background/50 p-3 rounded mb-3">
                                <div className="text-sm font-medium mb-1">Impact:</div>
                                <p className="text-sm text-muted-foreground">{violation.impact}</p>
                              </div>

                              <div className="bg-primary/10 p-3 rounded">
                                <div className="text-sm font-medium mb-1 text-primary">
                                  How to Fix:
                                </div>
                                <p className="text-sm">{violation.suggestion}</p>
                              </div>

                              {/* Element preview */}
                              <details className="mt-3">
                                <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                                  View element details
                                </summary>
                                <div className="mt-2 p-3 bg-background/50 rounded text-xs">
                                  <div className="mb-1">
                                    <span className="text-muted-foreground">Element: </span>
                                    <code className="text-primary">
                                      {violation.element.tagName.toLowerCase()}
                                    </code>
                                  </div>
                                  {violation.element.className && (
                                    <div className="mb-1">
                                      <span className="text-muted-foreground">Classes: </span>
                                      <code className="text-muted-foreground">
                                        {violation.element.className}
                                      </code>
                                    </div>
                                  )}
                                  {violation.element.id && (
                                    <div>
                                      <span className="text-muted-foreground">ID: </span>
                                      <code className="text-primary">#{violation.element.id}</code>
                                    </div>
                                  )}
                                </div>
                              </details>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-primary/10 border border-primary/20 p-12 rounded-lg text-center">
                <CircleCheck className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="mb-2">Perfect! No Violations Found</h3>
                <p className="text-muted-foreground">
                  Your page meets all checked accessibility standards.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-muted p-12 rounded-lg text-center">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="mb-2">Ready to Audit</h3>
            <p className="text-muted-foreground mb-6">
              Click "Run Audit" to check the current page for accessibility issues.
            </p>
            <button
              onClick={runAudit}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Run Audit Now
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg mt-8">
          <h3 className="mb-4">About WCAG Compliance</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">WCAG Levels:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Level A:</strong> Basic accessibility features (minimum)</li>
                <li><strong>Level AA:</strong> Recommended level for most websites (standard)</li>
                <li><strong>Level AAA:</strong> Enhanced accessibility features (ideal)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">What This Audit Checks:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Color contrast ratios (WCAG 1.4.3)</li>
                <li>Keyboard accessibility (WCAG 2.1.1)</li>
                <li>Focus indicators (WCAG 2.4.7)</li>
                <li>ARIA attributes validity (WCAG 4.1.2)</li>
                <li>Form labels (WCAG 3.3.2)</li>
                <li>Image alt text (WCAG 1.1.1)</li>
                <li>Heading hierarchy (WCAG 2.4.6)</li>
                <li>Landmark regions (WCAG 2.4.1)</li>
                <li>Touch target size (WCAG 2.5.5)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Best Practices:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use semantic HTML elements</li>
                <li>Provide descriptive alt text for images</li>
                <li>Ensure all interactive elements are keyboard accessible</li>
                <li>Maintain logical heading hierarchy</li>
                <li>Use ARIA attributes correctly</li>
                <li>Test with screen readers</li>
                <li>Maintain sufficient color contrast</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}