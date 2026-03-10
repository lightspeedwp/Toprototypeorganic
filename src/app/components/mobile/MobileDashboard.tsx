/**
 * Mobile Dashboard Component
 * 
 * Visual dashboard for mobile features and performance testing.
 * 
 * **Features:**
 * - Device information display
 * - Touch target validation
 * - Scroll performance metrics
 * - PWA installation status
 * - Network information
 * - Gesture testing sandbox
 * 
 * @module MobileDashboard
 * @category components/mobile
 */

import { useState, useEffect } from "react";
import { X, ArrowsClockwise as RefreshCw, DownloadSimple as Download, DeviceMobile as Smartphone, WifiHigh as Wifi, Lightning as Zap } from "@phosphor-icons/react";
import { runMobilePerformanceTests } from "../../utils/mobilePerformanceTester";
import { isPWA, isOnline, isInstallPromptAvailable, showInstallPrompt } from "../../utils/pwa";
import { cn } from "../../lib/utils";

/**
 * Mobile Dashboard Component.
 * 
 * Displays mobile-specific metrics and testing tools.
 * 
 * @component
 * @category mobile
 */
export function MobileDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"device" | "performance" | "pwa">("device");
  const [isLoading, setIsLoading] = useState(false);
  const [online, setOnline] = useState(true);

  // Check online status
  useEffect(() => {
    setOnline(isOnline());

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Run tests
  const runTests = async () => {
    setIsLoading(true);
    try {
      const results = await runMobilePerformanceTests();
      setTestResults(results);
    } catch (error) {
      console.error("Error running tests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    if (isOpen && !testResults) {
      runTests();
    }
  }, [isOpen]);

  // Keyboard shortcut (Ctrl+Alt+M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "m") {
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
      ...testResults,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mobile-report-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Install PWA
  const handleInstall = async () => {
    const success = await showInstallPrompt();
    if (success) {
      console.log("PWA installed successfully!");
    }
  };

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      {/* Dashboard Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-sm w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="mb-0">Mobile Dashboard</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitor mobile performance and test features
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runTests}
                  disabled={isLoading}
                  className={cn(
                    "p-2 rounded-lg border border-border",
                    "hover:bg-accent transition-colors",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  aria-label="Run tests"
                  title="Run tests"
                >
                  <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
                </button>
                <button
                  onClick={exportReport}
                  disabled={!testResults}
                  className={cn(
                    "p-2 rounded-lg border border-border",
                    "hover:bg-accent transition-colors",
                    !testResults && "opacity-50 cursor-not-allowed"
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

            {/* Online Status Banner */}
            {!online && (
              <div className="px-6 py-3 bg-warning/10 border-b border-warning/20">
                <p className="text-sm text-warning">
                  ⚠️ You are currently offline. Some features may not work.
                </p>
              </div>
            )}

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex">
                {[
                  { id: "device", label: "Device Info", icon: Smartphone },
                  { id: "performance", label: "Performance", icon: Zap },
                  { id: "pwa", label: "PWA", icon: Wifi },
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
                  <div className="text-center">
                    <RefreshCw size={48} className="mx-auto mb-4 animate-spin text-primary" />
                    <p className="text-muted-foreground">Running mobile tests...</p>
                  </div>
                </div>
              ) : testResults ? (
                <>
                  {/* Device Tab */}
                  {activeTab === "device" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Device Information</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Type</div>
                            <div className="font-bold">
                              {testResults.deviceInfo.isMobile
                                ? "Mobile"
                                : testResults.deviceInfo.isTablet
                                ? "Tablet"
                                : "Desktop"}
                            </div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Touch</div>
                            <div className="font-bold">
                              {testResults.deviceInfo.supportsTouch ? "Yes" : "No"}
                            </div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Screen</div>
                            <div className="font-bold">
                              {testResults.deviceInfo.screenWidth}x{testResults.deviceInfo.screenHeight}
                            </div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">DPR</div>
                            <div className="font-bold">{testResults.deviceInfo.devicePixelRatio}x</div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Orientation</div>
                            <div className="font-bold">{testResults.deviceInfo.orientation}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Network Information</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Type</div>
                            <div className="font-bold">{testResults.networkInfo.effectiveType}</div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Downlink</div>
                            <div className="font-bold">{testResults.networkInfo.downlink} Mbps</div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">RTT</div>
                            <div className="font-bold">{testResults.networkInfo.rtt}ms</div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Data Saver</div>
                            <div className="font-bold">
                              {testResults.networkInfo.saveData ? "On" : "Off"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Performance Tab */}
                  {activeTab === "performance" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Touch Target Tests</h3>
                        {testResults.touchTargets.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            ✅ All touch targets meet minimum size requirement (44x44px)
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground mb-4">
                              {testResults.touchTargets.length} touch targets below 44x44px:
                            </p>
                            {testResults.touchTargets.slice(0, 10).map((target: any, index: number) => (
                              <div key={index} className="p-3 rounded-lg border border-border bg-card">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium">{target.element}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {target.width}x{target.height}px
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {target.recommendation}
                                </div>
                              </div>
                            ))}
                            {testResults.touchTargets.length > 10 && (
                              <p className="text-sm text-muted-foreground text-center">
                                + {testResults.touchTargets.length - 10} more issues
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {testResults.scrollPerformance && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Scroll Performance</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg border border-border bg-card">
                              <div className="text-sm text-muted-foreground mb-1">Avg FPS</div>
                              <div className="font-serif text-fluid-2xl">
                                {testResults.scrollPerformance.averageFPS}
                              </div>
                            </div>
                            <div className="p-4 rounded-lg border border-border bg-card">
                              <div className="text-sm text-muted-foreground mb-1">Min FPS</div>
                              <div className="font-serif text-fluid-2xl">
                                {testResults.scrollPerformance.minFPS}
                              </div>
                            </div>
                            <div className="p-4 rounded-lg border border-border bg-card">
                              <div className="text-sm text-muted-foreground mb-1">Max FPS</div>
                              <div className="font-serif text-fluid-2xl">
                                {testResults.scrollPerformance.maxFPS}
                              </div>
                            </div>
                            <div className="p-4 rounded-lg border border-border bg-card">
                              <div className="text-sm text-muted-foreground mb-1">Frame Drops</div>
                              <div className="font-serif text-fluid-2xl">
                                {testResults.scrollPerformance.frameDrops}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {testResults.recommendations.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                          <ul className="space-y-2">
                            {testResults.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* PWA Tab */}
                  {activeTab === "pwa" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">PWA Status</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Running as PWA</div>
                            <div className="font-bold">{isPWA() ? "Yes" : "No"}</div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Online Status</div>
                            <div className="font-bold">{online ? "Online" : "Offline"}</div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Installable</div>
                            <div className="font-bold">
                              {isInstallPromptAvailable() ? "Yes" : "No"}
                            </div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="text-sm text-muted-foreground mb-1">Notifications</div>
                            <div className="font-bold">{Notification?.permission || "Not supported"}</div>
                          </div>
                        </div>
                      </div>

                      {isInstallPromptAvailable() && (
                        <div>
                          <button
                            onClick={handleInstall}
                            className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                          >
                            Install as PWA
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-section-sm text-muted-foreground">
                  <p>Click "Run tests" to start mobile performance testing</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30 text-center text-sm text-muted-foreground">
              Press <kbd className="px-2 py-1 rounded bg-muted">Ctrl</kbd> +{" "}
              <kbd className="px-2 py-1 rounded bg-muted">Alt</kbd> +{" "}
              <kbd className="px-2 py-1 rounded bg-muted">M</kbd> to toggle dashboard
            </div>
          </div>
        </div>
      )}
    </>
  );
}