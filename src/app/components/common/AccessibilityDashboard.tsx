/**
 * Accessibility Dashboard Component
 * 
 * Visual dashboard for viewing accessibility audit results.
 * Displays comprehensive accessibility metrics and issues.
 * 
 * **Features:**
 * - Overall accessibility score
 * - Color contrast results
 * - Keyboard navigation results
 * - Screen reader compatibility results
 * - Detailed issue lists
 * - Quick fix recommendations
 * - Export report functionality
 * 
 * **Usage:**
 * - Only shown in development mode
 * - Toggle with keyboard shortcut (Ctrl+Alt+A)
 * - Floating button to open dashboard
 * 
 * @module AccessibilityDashboard
 * @category components/common
 */

import { useState, useEffect } from "react";
import { X, DownloadSimple as Download, ArrowsClockwise as RefreshCw, Check, Warning as AlertTriangle, XCircle as CircleX } from "@phosphor-icons/react";
import { runAccessibilityAudit } from "../../utils/accessibilityAuditor";
import { runKeyboardNavigationTest } from "../../utils/keyboardNavigationTester";
import { runScreenReaderCheck } from "../../utils/screenReaderChecker";
import { cn } from "../../lib/utils";

/**
 * Accessibility Dashboard Component.
 * 
 * Visual interface for accessibility audit results.
 * 
 * @component
 * @category common
 */
export function AccessibilityDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [auditResults, setAuditResults] = useState<any>(null);
  const [keyboardResults, setKeyboardResults] = useState<any>(null);
  const [screenReaderResults, setScreenReaderResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "contrast" | "keyboard" | "screen-reader">("overview");

  // Run audits
  const runAudits = () => {
    console.log("🔍 Running all accessibility audits...");
    setAuditResults(runAccessibilityAudit());
    setKeyboardResults(runKeyboardNavigationTest());
    setScreenReaderResults(runScreenReaderCheck());
  };

  // Run on mount
  useEffect(() => {
    runAudits();
  }, []);

  // Keyboard shortcut (Ctrl+Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "a") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Calculate overall score
  const overallScore = auditResults && keyboardResults && screenReaderResults
    ? Math.round((auditResults.score + keyboardResults.score + screenReaderResults.score) / 3)
    : 0;

  // Export report
  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      overallScore,
      accessibility: auditResults,
      keyboard: keyboardResults,
      screenReader: screenReaderResults,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `accessibility-report-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      {/* Dashboard Modal — open via Ctrl+Alt+A or DevTools page launcher */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-sm w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-border">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-fluid-2xl mb-0">Accessibility Dashboard</h2>
                <p className="text-sm text-muted-foreground pt-1">
                  Comprehensive accessibility audit results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runAudits}
                  className={cn(
                    "p-2 rounded-lg border border-border",
                    "hover:bg-accent transition-colors"
                  )}
                  aria-label="Refresh audits"
                  title="Refresh audits"
                >
                  <RefreshCw size={20} />
                </button>
                <button
                  onClick={exportReport}
                  className={cn(
                    "p-2 rounded-lg border border-border",
                    "hover:bg-accent transition-colors"
                  )}
                  aria-label="Export report"
                  title="Export report"
                >
                  <Download size={20} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "p-2 rounded-lg border border-border",
                    "hover:bg-accent transition-colors"
                  )}
                  aria-label="Close dashboard"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Overall Score */}
            <div className="p-6 border-b border-border wp-bg-muted-ultralight">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground pb-2">Overall Score</div>
                  <div className="flex items-baseline gap-2">
                    <div className="font-serif text-fluid-5xl">{overallScore}</div>
                    <div className="font-serif text-fluid-2xl text-muted-foreground">/100</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="font-serif text-fluid-2xl">{auditResults?.score || 0}</div>
                    <div className="text-xs text-muted-foreground">Contrast</div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-fluid-2xl">{keyboardResults?.score || 0}</div>
                    <div className="text-xs text-muted-foreground">Keyboard</div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-fluid-2xl">{screenReaderResults?.score || 0}</div>
                    <div className="text-xs text-muted-foreground">Screen Reader</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "contrast", label: "Color Contrast" },
                  { id: "keyboard", label: "Keyboard Nav" },
                  { id: "screen-reader", label: "Screen Reader" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "px-6 py-3 border-b-2 transition-colors",
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent hover:text-primary"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && auditResults && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-fluid-lg pb-3">Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center gap-2 pb-2">
                          <Check className="text-success" size={20} />
                          <span className="text-sm text-muted-foreground">Passed Checks</span>
                        </div>
                        <div className="font-serif text-fluid-2xl">{auditResults.stats.passedChecks}</div>
                      </div>
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center gap-2 pb-2">
                          <AlertTriangle className="text-warning" size={20} />
                          <span className="text-sm text-muted-foreground">Total Issues</span>
                        </div>
                        <div className="font-serif text-fluid-2xl">{auditResults.stats.totalIssues}</div>
                      </div>
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center gap-2 pb-2">
                          <CircleX className="text-destructive" size={20} />
                          <span className="text-sm text-muted-foreground">Critical Issues</span>
                        </div>
                        <div className="font-serif text-fluid-2xl">{auditResults.stats.criticalIssues}</div>
                      </div>
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center gap-2 pb-2">
                          <AlertTriangle className="text-warning" size={20} />
                          <span className="text-sm text-muted-foreground">Warnings</span>
                        </div>
                        <div className="font-serif text-fluid-2xl">{auditResults.stats.warningIssues}</div>
                      </div>
                    </div>
                  </div>

                  {auditResults.recommendations.length > 0 && (
                    <div>
                      <h3 className="text-fluid-lg pb-3">Top Recommendations</h3>
                      <ul className="flex flex-col gap-2">
                        {auditResults.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary pt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Contrast Tab */}
              {activeTab === "contrast" && auditResults && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-fluid-lg pb-3">
                      Color Contrast Issues ({auditResults.contrastIssues.length})
                    </h3>
                    {auditResults.contrastIssues.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {auditResults.contrastIssues.map((issue: any, index: number) => (
                          <div key={index} className="p-4 rounded-lg border border-border bg-card">
                            <div className="flex items-start justify-between pb-2">
                              <div className="font-medium">{issue.element}</div>
                              <div className="text-sm">
                                Ratio: <span className="font-bold">{issue.ratio}:1</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm pb-2">
                              <div>
                                WCAG AA:{" "}
                                <span className={issue.wcagAA ? "text-success" : "text-destructive"}>
                                  {issue.wcagAA ? "✓ Pass" : "✗ Fail"}
                                </span>
                              </div>
                              <div>
                                WCAG AAA:{" "}
                                <span className={issue.wcagAAA ? "text-success" : "text-destructive"}>
                                  {issue.wcagAAA ? "✓ Pass" : "✗ Fail"}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">{issue.recommendation}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center py-8 text-muted-foreground gap-element-sm">
                        <Check className="text-success" size={48} />
                        <p>All color contrast ratios meet WCAG AA standards!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Keyboard Tab */}
              {activeTab === "keyboard" && keyboardResults && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4 pb-6">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground pb-1">Total Focusable</div>
                      <div className="font-serif text-fluid-2xl">{keyboardResults.totalFocusableElements}</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground pb-1">Visible Focusable</div>
                      <div className="font-serif text-fluid-2xl">{keyboardResults.visibleFocusableElements}</div>
                    </div>
                  </div>

                  {keyboardResults.tabOrderIssues.length > 0 && (
                    <div>
                      <h3 className="text-fluid-lg pb-3">Tab Order Issues</h3>
                      <div className="flex flex-col gap-2">
                        {keyboardResults.tabOrderIssues.map((issue: any, index: number) => (
                          <div key={index} className="p-3 rounded-lg border border-border bg-card">
                            <div className="font-medium text-sm">{issue.element}: {issue.issue}</div>
                            <div className="text-sm text-muted-foreground pt-1">{issue.recommendation}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {keyboardResults.missingFocusIndicators.length > 0 && (
                    <div>
                      <h3 className="text-fluid-lg pb-3">Missing Focus Indicators</h3>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(keyboardResults.missingFocusIndicators)).map(
                          (element: any, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 rounded-full bg-muted text-sm"
                            >
                              {element}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {keyboardResults.recommendations.length > 0 && (
                    <div>
                      <h3 className="text-fluid-lg pb-3">Recommendations</h3>
                      <ul className="flex flex-col gap-2">
                        {keyboardResults.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary pt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Screen Reader Tab */}
              {activeTab === "screen-reader" && screenReaderResults && (
                <div className="flex flex-col gap-4">
                  {screenReaderResults.landmarkIssues.length > 0 && (
                    <div>
                      <h3 className="text-fluid-lg pb-3">Landmark Issues</h3>
                      <div className="flex flex-col gap-2">
                        {screenReaderResults.landmarkIssues.map((issue: any, index: number) => (
                          <div key={index} className="p-3 rounded-lg border border-border bg-card">
                            <div className="font-medium text-sm">{issue.issue}</div>
                            <div className="text-sm text-muted-foreground pt-1">{issue.recommendation}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {screenReaderResults.ariaIssues.length > 0 && (
                    <div>
                      <h3 className="text-fluid-lg pb-3">ARIA Issues</h3>
                      <div className="flex flex-col gap-2">
                        {screenReaderResults.ariaIssues.map((issue: any, index: number) => (
                          <div key={index} className="p-3 rounded-lg border border-border bg-card">
                            <div className="font-medium text-sm">{issue.element}: {issue.issue}</div>
                            <div className="text-sm text-muted-foreground pt-1">{issue.recommendation}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {screenReaderResults.contentIssues.length > 0 && (
                    <div>
                      <h3 className="text-fluid-lg pb-3">Content Issues</h3>
                      <div className="flex flex-col gap-2">
                        {screenReaderResults.contentIssues.slice(0, 10).map((issue: any, index: number) => (
                          <div key={index} className="p-3 rounded-lg border border-border bg-card">
                            <div className="font-medium text-sm">{issue.element}: {issue.issue}</div>
                            <div className="text-sm text-muted-foreground pt-1">{issue.recommendation}</div>
                          </div>
                        ))}
                        {screenReaderResults.contentIssues.length > 10 && (
                          <div className="text-sm text-muted-foreground text-center">
                            + {screenReaderResults.contentIssues.length - 10} more issues
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {screenReaderResults.recommendations.length > 0 && (
                    <div>
                      <h3 className="text-fluid-lg pb-3">Recommendations</h3>
                      <ul className="flex flex-col gap-2">
                        {screenReaderResults.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary pt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border wp-bg-muted-ultralight text-center text-sm text-muted-foreground">
              Press <kbd className="px-2 py-1 rounded bg-muted">Ctrl</kbd> +{" "}
              <kbd className="px-2 py-1 rounded bg-muted">Alt</kbd> +{" "}
              <kbd className="px-2 py-1 rounded bg-muted">A</kbd> to toggle dashboard
            </div>
          </div>
        </div>
      )}
    </>
  );
}