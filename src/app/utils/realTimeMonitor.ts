/**
 * Real-Time Monitor
 * 
 * Live monitoring of application health, performance, and user activity.
 * Provides real-time insights and alerts for critical issues.
 * 
 * @module realTimeMonitor
 * @category utils
 */

/**
 * Real-time metric.
 */
export interface RealtimeMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  status: 'healthy' | 'warning' | 'critical';
  threshold?: {
    warning: number;
    critical: number;
  };
}

/**
 * System health status.
 */
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  metrics: RealtimeMetric[];
  issues: string[];
  uptime: number;
  lastCheck: number;
}

/**
 * Real-time alert.
 */
export interface RealtimeAlert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: number;
  acknowledged: boolean;
  resolved: boolean;
}

/**
 * Performance snapshot.
 */
export interface PerformanceSnapshot {
  timestamp: number;
  fps: number;
  memory: number;
  dom: number;
  network: number;
  score: number;
}

/**
 * Monitor configuration.
 */
export interface MonitorConfig {
  interval: number; // ms
  enableAlerts: boolean;
  thresholds: {
    fps: { warning: number; critical: number };
    memory: { warning: number; critical: number };
    domNodes: { warning: number; critical: number };
    errorRate: { warning: number; critical: number };
  };
}

const DEFAULT_CONFIG: MonitorConfig = {
  interval: 5000, // 5 seconds
  enableAlerts: true,
  thresholds: {
    fps: { warning: 30, critical: 15 },
    memory: { warning: 100, critical: 150 }, // MB
    domNodes: { warning: 1500, critical: 2000 },
    errorRate: { warning: 5, critical: 10 }, // errors per minute
  },
};

let monitorInterval: NodeJS.Timeout | null = null;
let performanceHistory: PerformanceSnapshot[] = [];
let alerts: RealtimeAlert[] = [];
let startTime = Date.now();
let config = { ...DEFAULT_CONFIG };

/**
 * Calculate current FPS.
 */
function calculateFPS(): Promise<number> {
  return new Promise((resolve) => {
    let lastTime = performance.now();
    let frames = 0;
    
    function countFrame(currentTime: number) {
      frames++;
      const delta = currentTime - lastTime;
      
      if (delta >= 1000) {
        const fps = Math.round((frames * 1000) / delta);
        resolve(fps);
      } else {
        requestAnimationFrame(countFrame);
      }
    }
    
    requestAnimationFrame(countFrame);
  });
}

/**
 * Get memory usage.
 */
function getMemoryUsage(): number {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
  }
  return 0;
}

/**
 * Get DOM node count.
 */
function getDOMNodeCount(): number {
  return document.querySelectorAll('*').length;
}

/**
 * Get network status.
 */
function getNetworkStatus(): number {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType) {
      const types: Record<string, number> = {
        'slow-2g': 1,
        '2g': 2,
        '3g': 3,
        '4g': 4,
        '5g': 5,
      };
      return types[connection.effectiveType] || 0;
    }
  }
  return 0;
}

/**
 * Calculate performance score.
 */
function calculatePerformanceScore(snapshot: Omit<PerformanceSnapshot, 'score' | 'timestamp'>): number {
  let score = 100;
  
  // FPS impact (0-30 points)
  if (snapshot.fps < 15) score -= 30;
  else if (snapshot.fps < 30) score -= 15;
  else if (snapshot.fps < 60) score -= 5;
  
  // Memory impact (0-30 points)
  if (snapshot.memory > 150) score -= 30;
  else if (snapshot.memory > 100) score -= 15;
  else if (snapshot.memory > 50) score -= 5;
  
  // DOM impact (0-20 points)
  if (snapshot.dom > 2000) score -= 20;
  else if (snapshot.dom > 1500) score -= 10;
  else if (snapshot.dom > 1000) score -= 5;
  
  // Network impact (0-20 points)
  if (snapshot.network === 1) score -= 20;
  else if (snapshot.network === 2) score -= 10;
  else if (snapshot.network === 3) score -= 5;
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Create alert.
 */
function createAlert(
  severity: RealtimeAlert['severity'],
  title: string,
  message: string
): void {
  if (!config.enableAlerts) return;
  
  const alert: RealtimeAlert = {
    id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    severity,
    title,
    message,
    timestamp: Date.now(),
    acknowledged: false,
    resolved: false,
  };
  
  alerts.push(alert);
  
  // Keep last 100 alerts
  if (alerts.length > 100) {
    alerts.shift();
  }
  
  // Log critical alerts
  if (severity === 'critical' || severity === 'error') {
    console.error(`🚨 ${title}: ${message}`);
  } else if (severity === 'warning') {
    console.warn(`⚠️ ${title}: ${message}`);
  }
}

/**
 * Check metric status.
 */
function checkMetricStatus(
  value: number,
  threshold: { warning: number; critical: number },
  higherIsBetter: boolean = false
): RealtimeMetric['status'] {
  if (higherIsBetter) {
    if (value < threshold.critical) return 'critical';
    if (value < threshold.warning) return 'warning';
    return 'healthy';
  } else {
    if (value > threshold.critical) return 'critical';
    if (value > threshold.warning) return 'warning';
    return 'healthy';
  }
}

/**
 * Collect performance snapshot.
 */
async function collectSnapshot(): Promise<PerformanceSnapshot> {
  const fps = await calculateFPS();
  const memory = getMemoryUsage();
  const dom = getDOMNodeCount();
  const network = getNetworkStatus();
  
  const snapshot: PerformanceSnapshot = {
    timestamp: Date.now(),
    fps,
    memory,
    dom,
    network,
    score: 0,
  };
  
  snapshot.score = calculatePerformanceScore(snapshot);
  
  return snapshot;
}

/**
 * Check system health.
 */
async function checkHealth(): Promise<SystemHealth> {
  const snapshot = await collectSnapshot();
  
  // Store snapshot
  performanceHistory.push(snapshot);
  if (performanceHistory.length > 100) {
    performanceHistory.shift();
  }
  
  const metrics: RealtimeMetric[] = [
    {
      name: 'FPS',
      value: snapshot.fps,
      unit: 'fps',
      timestamp: snapshot.timestamp,
      status: checkMetricStatus(snapshot.fps, config.thresholds.fps, true),
      threshold: config.thresholds.fps,
    },
    {
      name: 'Memory',
      value: snapshot.memory,
      unit: 'MB',
      timestamp: snapshot.timestamp,
      status: checkMetricStatus(snapshot.memory, config.thresholds.memory),
      threshold: config.thresholds.memory,
    },
    {
      name: 'DOM Nodes',
      value: snapshot.dom,
      unit: 'nodes',
      timestamp: snapshot.timestamp,
      status: checkMetricStatus(snapshot.dom, config.thresholds.domNodes),
      threshold: config.thresholds.domNodes,
    },
  ];
  
  // Check for issues
  const issues: string[] = [];
  
  metrics.forEach(metric => {
    if (metric.status === 'critical') {
      issues.push(`${metric.name} is critical: ${metric.value}${metric.unit}`);
      createAlert('critical', `Critical: ${metric.name}`, 
        `${metric.name} is at critical level: ${metric.value}${metric.unit}`);
    } else if (metric.status === 'warning') {
      issues.push(`${metric.name} needs attention: ${metric.value}${metric.unit}`);
      createAlert('warning', `Warning: ${metric.name}`, 
        `${metric.name} is above warning threshold: ${metric.value}${metric.unit}`);
    }
  });
  
  // Determine overall status
  let status: SystemHealth['status'] = 'healthy';
  if (metrics.some(m => m.status === 'critical')) {
    status = 'critical';
  } else if (metrics.some(m => m.status === 'warning')) {
    status = 'degraded';
  }
  
  return {
    status,
    metrics,
    issues,
    uptime: Date.now() - startTime,
    lastCheck: Date.now(),
  };
}

/**
 * Start real-time monitoring.
 * 
 * @param customConfig - Optional custom configuration
 * 
 * @example
 * ```tsx
 * startMonitoring({
 *   interval: 10000, // Check every 10 seconds
 *   enableAlerts: true,
 * });
 * ```
 */
export function startMonitoring(customConfig?: Partial<MonitorConfig>): void {
  if (monitorInterval) {
    console.warn('Monitoring already started');
    return;
  }
  
  if (customConfig) {
    config = { ...config, ...customConfig };
  }
  
  console.log('🎯 Real-time monitoring started');
  
  // Initial check
  checkHealth();
  
  // Start interval
  monitorInterval = setInterval(() => {
    checkHealth();
  }, config.interval);
}

/**
 * Stop real-time monitoring.
 * 
 * @example
 * ```tsx
 * stopMonitoring();
 * ```
 */
export function stopMonitoring(): void {
  if (monitorInterval) {
    clearInterval(monitorInterval);
    monitorInterval = null;
    console.log('🛑 Real-time monitoring stopped');
  }
}

/**
 * Get current system health.
 * 
 * @returns System health status
 * 
 * @example
 * ```tsx
 * const health = await getCurrentHealth();
 * console.log(`Status: ${health.status}`);
 * console.log(`Issues: ${health.issues.length}`);
 * ```
 */
export async function getCurrentHealth(): Promise<SystemHealth> {
  return checkHealth();
}

/**
 * Get performance history.
 * 
 * @param limit - Number of snapshots to return
 * @returns Performance snapshots
 * 
 * @example
 * ```tsx
 * const history = getPerformanceHistory(20);
 * console.log(`Average FPS: ${history.reduce((sum, s) => sum + s.fps, 0) / history.length}`);
 * ```
 */
export function getPerformanceHistory(limit?: number): PerformanceSnapshot[] {
  if (limit) {
    return performanceHistory.slice(-limit);
  }
  return [...performanceHistory];
}

/**
 * Get active alerts.
 * 
 * @param includeResolved - Include resolved alerts
 * @returns Active alerts
 * 
 * @example
 * ```tsx
 * const activeAlerts = getAlerts(false);
 * console.log(`Active alerts: ${activeAlerts.length}`);
 * ```
 */
export function getAlerts(includeResolved: boolean = false): RealtimeAlert[] {
  if (includeResolved) {
    return [...alerts];
  }
  return alerts.filter(a => !a.resolved);
}

/**
 * Acknowledge alert.
 * 
 * @param alertId - Alert ID
 * 
 * @example
 * ```tsx
 * acknowledgeAlert('alert_123');
 * ```
 */
export function acknowledgeAlert(alertId: string): void {
  const alert = alerts.find(a => a.id === alertId);
  if (alert) {
    alert.acknowledged = true;
  }
}

/**
 * Resolve alert.
 * 
 * @param alertId - Alert ID
 * 
 * @example
 * ```tsx
 * resolveAlert('alert_123');
 * ```
 */
export function resolveAlert(alertId: string): void {
  const alert = alerts.find(a => a.id === alertId);
  if (alert) {
    alert.resolved = true;
  }
}

/**
 * Clear all alerts.
 * 
 * @example
 * ```tsx
 * clearAlerts();
 * ```
 */
export function clearAlerts(): void {
  alerts = [];
}

/**
 * Log current health status.
 * 
 * @example
 * ```tsx
 * await logHealthStatus();
 * ```
 */
export async function logHealthStatus(): Promise<void> {
  const health = await getCurrentHealth();
  
  console.group('📊 System Health');
  
  const statusIcon = health.status === 'healthy' ? '✅' : 
                     health.status === 'degraded' ? '⚠️' : '❌';
  console.log(`\n${statusIcon} Status: ${health.status.toUpperCase()}`);
  console.log(`⏱️ Uptime: ${(health.uptime / 1000 / 60).toFixed(2)} minutes`);
  
  console.group('\nMetrics:');
  health.metrics.forEach(metric => {
    const icon = metric.status === 'healthy' ? '✅' : 
                 metric.status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${metric.name}: ${metric.value}${metric.unit}`);
  });
  console.groupEnd();
  
  if (health.issues.length > 0) {
    console.group('\n⚠️ Issues:');
    health.issues.forEach(issue => console.warn(issue));
    console.groupEnd();
  }
  
  const activeAlerts = getAlerts(false);
  if (activeAlerts.length > 0) {
    console.group(`\n🚨 Active Alerts (${activeAlerts.length}):`);
    activeAlerts.forEach(alert => {
      console.log(`${alert.severity.toUpperCase()}: ${alert.title}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Generate health report.
 * 
 * @returns Health report as markdown
 * 
 * @example
 * ```tsx
 * const report = await generateHealthReport();
 * console.log(report);
 * ```
 */
export async function generateHealthReport(): Promise<string> {
  const health = await getCurrentHealth();
  const history = getPerformanceHistory(20);
  const activeAlerts = getAlerts(false);
  
  let report = `# System Health Report\n\n`;
  report += `**Generated:** ${new Date().toLocaleString()}\n`;
  report += `**Status:** ${health.status.toUpperCase()}\n`;
  report += `**Uptime:** ${(health.uptime / 1000 / 60).toFixed(2)} minutes\n\n`;
  
  report += `## Current Metrics\n\n`;
  health.metrics.forEach(metric => {
    const icon = metric.status === 'healthy' ? '✅' : 
                 metric.status === 'warning' ? '⚠️' : '❌';
    report += `${icon} **${metric.name}:** ${metric.value}${metric.unit} (${metric.status})\n`;
  });
  
  if (history.length > 0) {
    const avgFPS = history.reduce((sum, s) => sum + s.fps, 0) / history.length;
    const avgMemory = history.reduce((sum, s) => sum + s.memory, 0) / history.length;
    const avgScore = history.reduce((sum, s) => sum + s.score, 0) / history.length;
    
    report += `\n## Performance Averages (Last ${history.length} Snapshots)\n\n`;
    report += `- **Average FPS:** ${avgFPS.toFixed(1)}\n`;
    report += `- **Average Memory:** ${avgMemory.toFixed(1)}MB\n`;
    report += `- **Average Score:** ${avgScore.toFixed(1)}/100\n`;
  }
  
  if (health.issues.length > 0) {
    report += `\n## Issues\n\n`;
    health.issues.forEach(issue => {
      report += `- ${issue}\n`;
    });
  }
  
  if (activeAlerts.length > 0) {
    report += `\n## Active Alerts\n\n`;
    activeAlerts.forEach(alert => {
      report += `- **${alert.severity.toUpperCase()}:** ${alert.title}\n`;
      report += `  ${alert.message}\n`;
    });
  }
  
  return report;
}
