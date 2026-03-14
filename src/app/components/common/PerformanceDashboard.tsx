/**
 * Performance Dashboard Component
 * 
 * Visual dashboard for viewing performance metrics and optimization insights.
 * 
 * **Features:**
 * - Core Web Vitals display
 * - Bundle size analysis
 * - Lighthouse scores
 * - Performance recommendations
 * - Real-time monitoring
 * 
 * @module PerformanceDashboard
 * @category components/common
 */

import { useState, useEffect } from "react";
import { X, ArrowsClockwise as RefreshCw, DownloadSimple as Download, TrendUp as TrendingUp, Lightning as Zap, Package } from "@phosphor-icons/react";
import { runBundleAnalysis } from "../../utils/bundleAnalyzer";
import { runLighthouseAudit } from "../../utils/lighthouseAudit";
import { cn } from "../../lib/utils";

/**
 * Performance Dashboard Component.
 * 
 * Displays comprehensive performance metrics in a visual interface.
 * 
 * @component
 * @category common
 */
export function PerformanceDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [bundleData, setBundleData] = useState<any>(null);
  const [lighthouseData, setLighthouseData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "bundle" | "lighthouse">("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Run audits
  const runAudits = async () => {
    setIsLoading(true);
    console.log("🔍 Running performance audits...");
    
    try {
      const bundle = await runBundleAnalysis();
      const lighthouse = runLighthouseAudit();
      
      setBundleData(bundle);
      setLighthouseData(lighthouse);
    } catch (error) {
      console.error("Error running audits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    if (isOpen && !bundleData && !lighthouseData) {
      runAudits();
    }
  }, [isOpen]);

  // Keyboard shortcut (Ctrl+Alt+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "p") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Export report
  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      bundle: bundleData,
      lighthouse: lighthouseData,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Format bytes
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  // Get score color
  const getScoreColor = (score: number): string => {
    if (score >= 90) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      {/* Dashboard Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-sm w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-border">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-fluid-2xl mb-0">Performance Dashboard</h2>
                <p className="text-sm text-muted-foreground pt-1">
                  Monitor performance metrics and optimize your site
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runAudits}
                  disabled={isLoading}
                  className={cn(
                    "p-2 rounded-lg border border-border",
                    "hover:bg-accent transition-colors",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  aria-label="Refresh audits"
                  title="Refresh audits"
                >
                  <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
                </button>
                <button
                  onClick={exportReport}
                  disabled={!bundleData && !lighthouseData}
                  className={cn(
                    "p-2 rounded-lg border border-border",
                    "hover:bg-accent transition-colors",
                    (!bundleData && !lighthouseData) && "opacity-50 cursor-not-allowed"
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

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex">
                {[
                  { id: "overview", label: "Overview", icon: TrendingUp },
                  { id: "bundle", label: "Bundle Size", icon: Package },
                  { id: "lighthouse", label: "Lighthouse", icon: Zap },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 border-b-2 transition-colors",
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent hover:text-primary"
                    )}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-section-sm">
                  <div className="flex flex-col items-center text-center gap-element-md">
                    <RefreshCw size={48} className="animate-spin text-primary" />
                    <p className="text-muted-foreground">Running performance audits...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-fluid-lg pb-4">Quick Stats</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {bundleData && (
                            <>
                              <div className="p-4 rounded-lg border border-border bg-card">
                                <div className="text-sm text-muted-foreground pb-1">Bundle Size</div>
                                <div className="font-serif text-fluid-2xl">{formatBytes(bundleData.totalSize)}</div>
                              </div>
                              <div className="p-4 rounded-lg border border-border bg-card">
                                <div className="text-sm text-muted-foreground pb-1">Scripts</div>
                                <div className="font-serif text-fluid-2xl">{bundleData.scriptCount}</div>
                              </div>
                            </>
                          )}
                          {lighthouseData && (
                            <>
                              <div className="p-4 rounded-lg border border-border bg-card">
                                <div className="text-sm text-muted-foreground pb-1">Performance</div>
                                <div className={cn("font-serif text-fluid-2xl", getScoreColor(lighthouseData.performance.score))}>
                                  {lighthouseData.performance.score}
                                </div>
                              </div>
                              <div className="p-4 rounded-lg border border-border bg-card">
                                <div className="text-sm text-muted-foreground pb-1">Accessibility</div>
                                <div className={cn("font-serif text-fluid-2xl", getScoreColor(lighthouseData.accessibility.score))}>
                                  {lighthouseData.accessibility.score}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {lighthouseData && (
                        <div>
                          <h3 className="text-fluid-lg pb-4">Lighthouse Scores</h3>
                          <div className="flex flex-col gap-3">
                            {[
                              { label: "Performance", data: lighthouseData.performance },
                              { label: "Accessibility", data: lighthouseData.accessibility },
                              { label: "Best Practices", data: lighthouseData.bestPractices },
                              { label: "SEO", data: lighthouseData.seo },
                            ].map((category) => (
                              <div key={category.label} className="p-4 rounded-lg border border-border bg-card">
                                <div className="flex items-center justify-between pb-2">
                                  <span className="font-medium">{category.label}</span>
                                  <span className={cn("font-serif text-fluid-2xl", getScoreColor(category.data.score))}>
                                    {category.data.score}
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  ✅ {category.data.passed} passed • ❌ {category.data.failed} failed
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bundle Tab */}
                  {activeTab === "bundle" && bundleData && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-fluid-lg pb-4">Bundle Analysis</h3>
                        <div className="grid grid-cols-2 gap-4 pb-6">
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground pb-1">Total Size</div>
                            <div className="font-serif text-fluid-2xl">{formatBytes(bundleData.totalSize)}</div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground pb-1">Script Count</div>
                            <div className="font-serif text-fluid-2xl">{bundleData.scriptCount}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-fluid-lg pb-3">Largest Scripts</h3>
                        <div className="flex flex-col gap-2">
                          {bundleData.scripts.slice(0, 10).map((script: any, index: number) => (
                            <div key={index} className="p-3 rounded-lg border border-border bg-card">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate">
                                    {script.url.split("/").pop()}
                                  </div>
                                  <div className="text-xs text-muted-foreground truncate">
                                    {script.url}
                                  </div>
                                </div>
                                <div className="pl-4 text-right">
                                  <div className="font-bold">{formatBytes(script.size)}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {script.async && "async "}
                                    {script.defer && "defer "}
                                    {script.module && "module"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {bundleData.recommendations.length > 0 && (
                        <div>
                          <h3 className="text-fluid-lg pb-3">Recommendations</h3>
                          <ul className="flex flex-col gap-2">
                            {bundleData.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-primary pt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Lighthouse Tab */}
                  {activeTab === "lighthouse" && lighthouseData && (
                    <div className="flex flex-col gap-6">
                      {[
                        { label: "Performance", data: lighthouseData.performance },
                        { label: "Accessibility", data: lighthouseData.accessibility },
                        { label: "Best Practices", data: lighthouseData.bestPractices },
                        { label: "SEO", data: lighthouseData.seo },
                        { label: "PWA", data: lighthouseData.pwa },
                      ].map((category) => (
                        <div key={category.label}>
                          <div className="flex items-center justify-between pb-3">
                            <h3 className="text-lg font-semibold">{category.label}</h3>
                            <span className={cn("font-serif text-fluid-3xl", getScoreColor(category.data.score))}>
                              {category.data.score}
                            </span>
                          </div>
                          
                          <div className="pb-4 text-sm text-muted-foreground">
                            ✅ {category.data.passed} passed • ❌ {category.data.failed} failed
                          </div>

                          {category.data.issues.length > 0 && (
                            <div className="flex flex-col gap-2">
                              <div className="font-medium text-sm">Issues:</div>
                              {category.data.issues.map((issue: string, index: number) => (
                                <div key={index} className="p-3 rounded-lg border border-border bg-card text-sm">
                                  • {issue}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border wp-bg-muted-ultralight text-center text-sm text-muted-foreground">
              Press <kbd className="px-2 py-1 rounded bg-muted">Ctrl</kbd> +{" "}
              <kbd className="px-2 py-1 rounded bg-muted">Alt</kbd> +{" "}
              <kbd className="px-2 py-1 rounded bg-muted">P</kbd> to toggle dashboard
            </div>
          </div>
        </div>
      )}
    </>
  );
}