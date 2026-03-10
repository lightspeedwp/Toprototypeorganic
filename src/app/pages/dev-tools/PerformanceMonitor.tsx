/**
 * Performance Monitor Page
 * 
 * Real-time performance monitoring dashboard for all components.
 * Shows render times, re-renders, and performance insights.
 * 
 * @module PerformanceMonitor
 * @category dev-tools
 */

import { useState, useEffect } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { 
  getAllPerformanceMetrics,
  clearAllPerformanceMetrics,
  getPerformanceInsights,
  getPerformanceRating,
  PERFORMANCE_THRESHOLDS,
} from "../../utils/performanceProfiler";
import {
  Pulse as Activity,
  ArrowsClockwise as RefreshCw,
  Trash as Trash2,
  TrendUp as TrendingUp,
  TrendDown as TrendingDown,
  Lightning as Zap,
} from "@phosphor-icons/react";

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState(getAllPerformanceMetrics());
  const [insights, setInsights] = useState(getPerformanceInsights());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh every 2 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMetrics(getAllPerformanceMetrics());
      setInsights(getPerformanceInsights());
    }, 2000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefresh = () => {
    setMetrics(getAllPerformanceMetrics());
    setInsights(getPerformanceInsights());
  };

  const handleClear = () => {
    if (confirm('Clear all performance metrics?')) {
      clearAllPerformanceMetrics();
      setMetrics([]);
      setInsights(getPerformanceInsights());
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-primary';
    if (score >= 70) return 'text-muted-foreground';
    return 'text-destructive';
  };

  const getSeverityColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
      case 'good':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'acceptable':
        return 'bg-muted text-foreground border-border';
      case 'slow':
      case 'critical':
        return 'wp-bg-destructive-light wp-border-destructive-soft';
      default:
        return 'bg-muted text-foreground border-border';
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Performance Monitor" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-8 h-8 text-primary" />
                <h1>Performance Monitor</h1>
              </div>
              <p className="text-muted-foreground">
                Real-time component performance tracking and optimization insights
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>

              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Auto-refresh</span>
              </label>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        {/* Performance Score */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg border border-border mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2">Performance Score</h2>
              <p className={`font-serif text-fluid-6xl ${getScoreColor(insights.score)}`}>
                {insights.score}
                <span className="font-serif text-fluid-3xl text-muted-foreground">/100</span>
              </p>
              <p className="text-muted-foreground mt-2">{insights.summary}</p>
            </div>

            <div className="text-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Components</div>
                  <div className="font-serif text-fluid-2xl">{insights.totalComponents}</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Avg Time</div>
                  <div className="font-serif text-fluid-2xl">
                    {insights.averageRenderTime?.toFixed(1) || 0}
                    <span className="text-sm text-muted-foreground">ms</span>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Slow</div>
                  <div className="font-serif text-fluid-2xl text-destructive">
                    {insights.slowComponents || 0}
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Critical</div>
                  <div className="font-serif text-fluid-2xl text-destructive">
                    {insights.criticalComponents || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        {insights.recommendations.length > 0 && (
          <div className="bg-accent text-accent-foreground p-6 rounded-lg mb-8">
            <h3 className="mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Optimization Recommendations
            </h3>
            <ul className="space-y-2">
              {insights.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Performance Thresholds Reference */}
        <div className="bg-card p-6 rounded-lg border border-border mb-8">
          <h3 className="mb-4">Performance Thresholds</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">🚀</div>
              <div className="text-sm font-medium">Excellent</div>
              <div className="text-xs text-muted-foreground">
                &lt; {PERFORMANCE_THRESHOLDS.excellent}ms
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-sm font-medium">Good</div>
              <div className="text-xs text-muted-foreground">
                &lt; {PERFORMANCE_THRESHOLDS.good}ms
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">⚠️</div>
              <div className="text-sm font-medium">Acceptable</div>
              <div className="text-xs text-muted-foreground">
                &lt; {PERFORMANCE_THRESHOLDS.acceptable}ms
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🐢</div>
              <div className="text-sm font-medium">Slow</div>
              <div className="text-xs text-muted-foreground">
                &lt; {PERFORMANCE_THRESHOLDS.slow}ms
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🔴</div>
              <div className="text-sm font-medium">Critical</div>
              <div className="text-xs text-muted-foreground">
                &gt; {PERFORMANCE_THRESHOLDS.critical}ms
              </div>
            </div>
          </div>
        </div>

        {/* Component Metrics */}
        {metrics.length === 0 ? (
          <div className="bg-muted p-12 rounded-lg text-center">
            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="mb-2">No Performance Data Yet</h3>
            <p className="text-muted-foreground">
              Navigate through the app to collect performance metrics.
              Components using <code className="text-sm bg-background px-2 py-1 rounded">usePerformanceProfiler</code> will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="mb-6">Component Metrics</h2>
            
            {metrics.map((metric) => {
              const rating = getPerformanceRating(metric.averageRenderTime);
              
              return (
                <div
                  key={metric.componentName}
                  className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3>{metric.componentName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm border ${getSeverityColor(rating.rating)}`}>
                          {rating.emoji} {rating.rating}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground mb-1">Renders</div>
                          <div className="font-semibold">{metric.renderCount}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Average</div>
                          <div className="font-semibold">
                            {metric.averageRenderTime.toFixed(2)}ms
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Fastest</div>
                          <div className="font-semibold text-primary">
                            {metric.fastestRender.toFixed(2)}ms
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Slowest</div>
                          <div className="font-semibold text-destructive">
                            {metric.slowestRender.toFixed(2)}ms
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Last</div>
                          <div className="font-semibold">
                            {metric.lastRenderTime.toFixed(2)}ms
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Total</div>
                          <div className="font-semibold">
                            {metric.totalRenderTime.toFixed(0)}ms
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {metric.averageRenderTime < metric.lastRenderTime && (
                        <div className="flex items-center gap-1 text-destructive text-sm">
                          <TrendingUp className="w-4 h-4" />
                          Slower
                        </div>
                      )}
                      {metric.averageRenderTime > metric.lastRenderTime && (
                        <div className="flex items-center gap-1 text-primary text-sm">
                          <TrendingDown className="w-4 h-4" />
                          Faster
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Performance bar */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">Performance Range</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      {/* Gradient from green to red */}
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-muted-foreground to-destructive"
                        style={{
                          width: `${Math.min((metric.slowestRender / PERFORMANCE_THRESHOLDS.critical) * 100, 100)}%`
                        }}
                      />
                      {/* Current average marker */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-foreground"
                        style={{
                          left: `${Math.min((metric.averageRenderTime / PERFORMANCE_THRESHOLDS.critical) * 100, 100)}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0ms</span>
                      <span>{PERFORMANCE_THRESHOLDS.critical}ms</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Usage Instructions */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg mt-8">
          <h3 className="mb-4">How to Use Performance Profiler</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">In Your Components:</h4>
              <pre className="bg-background/20 p-3 rounded overflow-x-auto">
{`import { usePerformanceProfiler } from "../utils/performanceProfiler";

function MyComponent() {
  const { metrics, rating } = usePerformanceProfiler('MyComponent');
  
  return <div>Content</div>;
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tips for Optimization:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use React.memo() for components that re-render frequently</li>
                <li>Use useMemo() and useCallback() to prevent unnecessary recalculations</li>
                <li>Split large components into smaller ones</li>
                <li>Lazy load components that aren't immediately visible</li>
                <li>Avoid inline object/function creation in render</li>
                <li>Use production build for accurate measurements</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}