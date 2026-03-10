/**
 * Analytics Dashboard
 * 
 * Comprehensive analytics and monitoring interface.
 * Real-time insights into user behavior, performance, and system health.
 * 
 * @module AnalyticsDashboard
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { useState, useEffect } from "react";
import {
  getAnalyticsSummary,
  exportAnalytics,
  clearAnalytics,
  trackEvent,
  type AnalyticsSummary,
} from "../../utils/analyticsTracker";
import {
  getCurrentHealth,
  getPerformanceHistory,
  getAlerts,
  startMonitoring,
  stopMonitoring,
  acknowledgeAlert,
  resolveAlert,
  type SystemHealth,
  type PerformanceSnapshot,
} from "../../utils/realTimeMonitor";
import { 
  ChartBar as BarChart3, 
  TrendUp as TrendingUp, 
  Users, 
  Monitor, 
  DownloadSimple as Download,
  Trash as Trash2,
  Pulse as Activity,
  WarningCircle as AlertCircle,
  CheckCircle as CircleCheck,
  XCircle as CircleX,
} from "@phosphor-icons/react";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [history, setHistory] = useState<PerformanceSnapshot[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Load initial data
    loadAnalytics();
    
    // Track page view
    trackEvent('analytics_dashboard_view', 'navigation', {
      page: '/dev-tools/analytics-dashboard',
    });

    return () => {
      // Cleanup monitoring on unmount
      stopMonitoring();
    };
  }, []);

  const loadAnalytics = async () => {
    const summary = getAnalyticsSummary();
    setAnalytics(summary);
    
    const currentHealth = await getCurrentHealth();
    setHealth(currentHealth);
    
    const performanceHistory = getPerformanceHistory(20);
    setHistory(performanceHistory);
  };

  const handleStartMonitoring = () => {
    startMonitoring({ interval: 5000 });
    setIsMonitoring(true);
    
    // Update every 5 seconds
    const interval = setInterval(async () => {
      const currentHealth = await getCurrentHealth();
      setHealth(currentHealth);
      
      const performanceHistory = getPerformanceHistory(20);
      setHistory(performanceHistory);
    }, 5000);

    return () => clearInterval(interval);
  };

  const handleStopMonitoring = () => {
    stopMonitoring();
    setIsMonitoring(false);
  };

  const handleExport = () => {
    const data = exportAnalytics();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all analytics data?')) {
      clearAnalytics();
      loadAnalytics();
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'healthy' || status === 'pass') return 'text-primary';
    if (status === 'degraded' || status === 'warning') return 'text-muted-foreground';
    return 'text-destructive';
  };

  const getStatusBg = (status: string) => {
    if (status === 'healthy' || status === 'pass') return 'bg-primary/10 border-primary/20';
    if (status === 'degraded' || status === 'warning') return 'bg-muted border-border';
    return 'bg-destructive/10 border-destructive/20';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'healthy' || status === 'pass') return <CircleCheck className="w-5 h-5 text-primary" />;
    if (status === 'degraded' || status === 'warning') return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    return <CircleX className="w-5 h-5 text-destructive" />;
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Analytics Dashboard" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-8 h-8 text-primary" />
                <h1>Analytics Dashboard</h1>
              </div>
              <p className="text-muted-foreground">
                Real-time insights into user behavior, performance, and system health
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isMonitoring ? (
                <button
                  onClick={handleStartMonitoring}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Start Monitoring
                </button>
              ) : (
                <button
                  onClick={handleStopMonitoring}
                  className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                >
                  Stop Monitoring
                </button>
              )}
              
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleClear}
                className="px-4 py-2 rounded-lg border border-border hover:bg-destructive/10 hover:border-destructive/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <div className="space-y-8">
          {/* Analytics Overview */}
          {analytics && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h3>Total Events</h3>
                  </div>
                  <div className="font-serif text-fluid-3xl">{analytics.totalEvents}</div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h3>Sessions</h3>
                  </div>
                  <div className="font-serif text-fluid-3xl">{analytics.uniqueSessions}</div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3>Avg Duration</h3>
                  </div>
                  <div className="font-serif text-fluid-3xl">
                    {(analytics.averageSessionDuration / 1000 / 60).toFixed(1)}m
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Monitor className="w-5 h-5 text-primary" />
                    <h3>Top Device</h3>
                  </div>
                  <div className="font-serif text-fluid-2xl">
                    {analytics.deviceBreakdown.desktop > analytics.deviceBreakdown.mobile 
                      ? 'Desktop'
                      : analytics.deviceBreakdown.mobile > analytics.deviceBreakdown.tablet
                      ? 'Mobile'
                      : 'Tablet'}
                  </div>
                </div>
              </div>

              {/* Top Pages */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="mb-4">Top Pages</h2>
                
                {analytics.topPages.length > 0 ? (
                  <div className="space-y-3">
                    {analytics.topPages.map((page, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground font-mono">
                            {idx + 1}.
                          </span>
                          <span className="font-mono text-sm">{page.page}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{
                                width: `${(page.views / analytics.topPages[0].views) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold w-12 text-right">
                            {page.views}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No page views yet</p>
                )}
              </div>

              {/* Device Breakdown */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="mb-4">Device Breakdown</h2>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-serif text-fluid-3xl mb-1">{analytics.deviceBreakdown.mobile}</div>
                    <div className="text-sm text-muted-foreground">Mobile</div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-fluid-3xl mb-1">{analytics.deviceBreakdown.tablet}</div>
                    <div className="text-sm text-muted-foreground">Tablet</div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-fluid-3xl mb-1">{analytics.deviceBreakdown.desktop}</div>
                    <div className="text-sm text-muted-foreground">Desktop</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* System Health */}
          {health && (
            <div className={`p-6 rounded-lg border ${getStatusBg(health.status)}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {getStatusIcon(health.status)}
                  <h2>System Health: {health.status.toUpperCase()}</h2>
                </div>
                <span className="text-sm text-muted-foreground">
                  Uptime: {(health.uptime / 1000 / 60).toFixed(1)} minutes
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {health.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-background/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.name}</span>
                      {getStatusIcon(metric.status)}
                    </div>
                    <div className="font-serif text-fluid-2xl mb-1">
                      {metric.value}{metric.unit}
                    </div>
                    {metric.threshold && (
                      <div className="text-xs text-muted-foreground">
                        Warning: {metric.threshold.warning}{metric.unit}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {health.issues.length > 0 && (
                <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
                  <h4 className="font-medium mb-2 text-destructive">Issues Detected</h4>
                  <ul className="space-y-1">
                    {health.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm">• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Performance History */}
          {history.length > 0 && (
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="mb-4">Performance History</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Avg FPS</div>
                  <div className="font-serif text-fluid-2xl">
                    {(history.reduce((sum, s) => sum + s.fps, 0) / history.length).toFixed(1)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Avg Memory</div>
                  <div className="font-serif text-fluid-2xl">
                    {(history.reduce((sum, s) => sum + s.memory, 0) / history.length).toFixed(1)}MB
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Avg DOM</div>
                  <div className="font-serif text-fluid-2xl">
                    {Math.round(history.reduce((sum, s) => sum + s.dom, 0) / history.length)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Avg Score</div>
                  <div className="font-serif text-fluid-2xl">
                    {Math.round(history.reduce((sum, s) => sum + s.score, 0) / history.length)}
                  </div>
                </div>
              </div>

              <div className="h-32 bg-muted rounded-lg flex items-end justify-between gap-1 p-4">
                {history.map((snapshot, idx) => (
                  <div
                    key={idx}
                    className="bg-primary rounded-t flex-1"
                    style={{
                      height: `${snapshot.score}%`,
                      opacity: 0.5 + (idx / history.length) * 0.5,
                    }}
                    title={`Score: ${snapshot.score}, FPS: ${snapshot.fps}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg mt-8">
          <h3 className="mb-4">About Analytics Dashboard</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">What Gets Tracked</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Page views and navigation</li>
                <li>User interactions</li>
                <li>Conversion events</li>
                <li>System performance</li>
                <li>Real-time health metrics</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Real-time monitoring</li>
                <li>Performance tracking</li>
                <li>Device analytics</li>
                <li>Export data (JSON)</li>
                <li>Historical trends</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Monitor regularly during development</li>
                <li>Track key user journeys</li>
                <li>Export data before major changes</li>
                <li>Address performance warnings quickly</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Privacy</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>All data stored locally (browser)</li>
                <li>No external tracking services</li>
                <li>No personal information collected</li>
                <li>Clear data anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}