/**
 * Analytics Tracker
 * 
 * Comprehensive user behavior and application analytics tracking.
 * Provides insights into user interactions, performance, and conversion funnels.
 * 
 * @module analyticsTracker
 * @category utils
 */

/**
 * Analytics event.
 */
export interface AnalyticsEvent {
  name: string;
  category: 'navigation' | 'interaction' | 'conversion' | 'error' | 'performance';
  properties: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

/**
 * User session information.
 */
export interface UserSession {
  sessionId: string;
  startTime: number;
  lastActiveTime: number;
  pageViews: number;
  events: AnalyticsEvent[];
  device: DeviceInfo;
  referrer?: string;
}

/**
 * Device information.
 */
export interface DeviceInfo {
  userAgent: string;
  platform: string;
  screenWidth: number;
  screenHeight: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Conversion funnel step.
 */
export interface FunnelStep {
  name: string;
  completed: boolean;
  timestamp?: number;
  timeToComplete?: number;
}

/**
 * Conversion funnel tracking.
 */
export interface ConversionFunnel {
  name: string;
  steps: FunnelStep[];
  startTime: number;
  completionTime?: number;
  conversionRate: number;
}

/**
 * Analytics summary report.
 */
export interface AnalyticsSummary {
  totalEvents: number;
  uniqueSessions: number;
  averageSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  topEvents: Array<{ event: string; count: number }>;
  deviceBreakdown: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  conversionFunnels: ConversionFunnel[];
}

/**
 * Get or create session ID.
 */
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
    sessionStorage.setItem('analytics_session_start', Date.now().toString());
  }
  
  return sessionId;
}

/**
 * Get device information.
 */
function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  
  const isMobile = /iPhone|iPod|Android.*Mobile/i.test(ua) || screenWidth < 768;
  const isTablet = /iPad|Android/i.test(ua) && screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = !isMobile && !isTablet;
  
  return {
    userAgent: ua,
    platform: navigator.platform,
    screenWidth,
    screenHeight,
    isMobile,
    isTablet,
    isDesktop,
  };
}

/**
 * Get current user session.
 */
function getCurrentSession(): UserSession {
  const sessionId = getSessionId();
  const sessionData = sessionStorage.getItem('analytics_session_data');
  
  if (sessionData) {
    return JSON.parse(sessionData);
  }
  
  const newSession: UserSession = {
    sessionId,
    startTime: parseInt(sessionStorage.getItem('analytics_session_start') || Date.now().toString()),
    lastActiveTime: Date.now(),
    pageViews: 0,
    events: [],
    device: getDeviceInfo(),
    referrer: document.referrer,
  };
  
  sessionStorage.setItem('analytics_session_data', JSON.stringify(newSession));
  return newSession;
}

/**
 * Update session data.
 */
function updateSession(session: UserSession): void {
  session.lastActiveTime = Date.now();
  sessionStorage.setItem('analytics_session_data', JSON.stringify(session));
}

/**
 * Track analytics event.
 * 
 * @param name - Event name
 * @param category - Event category
 * @param properties - Event properties
 * @param userId - Optional user ID
 * 
 * @example
 * ```tsx
 * // Track page view
 * trackEvent('page_view', 'navigation', {
 *   page: '/tours',
 *   title: 'Tours Archive',
 * });
 * 
 * // Track button click
 * trackEvent('cta_click', 'interaction', {
 *   button: 'Book Now',
 *   destination: '/contact',
 * });
 * 
 * // Track conversion
 * trackEvent('form_submit', 'conversion', {
 *   form: 'contact',
 *   success: true,
 * });
 * ```
 */
export function trackEvent(
  name: string,
  category: AnalyticsEvent['category'],
  properties: Record<string, any> = {},
  userId?: string
): void {
  const session = getCurrentSession();
  
  const event: AnalyticsEvent = {
    name,
    category,
    properties,
    timestamp: Date.now(),
    sessionId: session.sessionId,
    userId,
  };
  
  session.events.push(event);
  updateSession(session);
  
  // Store in localStorage for persistence
  const allEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  allEvents.push(event);
  
  // Keep last 1000 events
  if (allEvents.length > 1000) {
    allEvents.shift();
  }
  
  localStorage.setItem('analytics_events', JSON.stringify(allEvents));
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', { name, category, properties });
  }
}

/**
 * Track page view.
 * 
 * @param page - Page path
 * @param title - Page title
 * 
 * @example
 * ```tsx
 * trackPageView('/tours/iceland', 'Iceland Adventure Tour');
 * ```
 */
export function trackPageView(page: string, title?: string): void {
  const session = getCurrentSession();
  session.pageViews++;
  updateSession(session);
  
  trackEvent('page_view', 'navigation', {
    page,
    title: title || document.title,
    referrer: document.referrer,
  });
}

/**
 * Track user interaction.
 * 
 * @param action - Action name
 * @param element - Element identifier
 * @param value - Optional value
 * 
 * @example
 * ```tsx
 * trackInteraction('click', 'tour_card', 'Iceland Tour');
 * trackInteraction('scroll', 'hero_section', 50);
 * ```
 */
export function trackInteraction(
  action: string,
  element: string,
  value?: any
): void {
  trackEvent('interaction', 'interaction', {
    action,
    element,
    value,
  });
}

/**
 * Track conversion event.
 * 
 * @param name - Conversion name
 * @param value - Conversion value
 * @param metadata - Additional metadata
 * 
 * @example
 * ```tsx
 * trackConversion('booking_completed', 2500, {
 *   tour: 'Iceland Adventure',
 *   duration: '7 days',
 * });
 * ```
 */
export function trackConversion(
  name: string,
  value?: number,
  metadata?: Record<string, any>
): void {
  trackEvent(name, 'conversion', {
    value,
    ...metadata,
  });
}

/**
 * Track error.
 * 
 * @param error - Error object or message
 * @param context - Error context
 * 
 * @example
 * ```tsx
 * try {
 *   // code that might fail
 * } catch (error) {
 *   trackError(error, { component: 'BookingForm' });
 * }
 * ```
 */
export function trackError(error: Error | string, context?: Record<string, any>): void {
  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;
  
  trackEvent('error', 'error', {
    message: errorMessage,
    stack: errorStack,
    ...context,
  });
}

/**
 * Track performance metric.
 * 
 * @param metric - Metric name
 * @param value - Metric value
 * @param unit - Metric unit
 * 
 * @example
 * ```tsx
 * trackPerformance('page_load', 1234, 'ms');
 * trackPerformance('bundle_size', 250, 'kb');
 * ```
 */
export function trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
  trackEvent('performance', 'performance', {
    metric,
    value,
    unit,
  });
}

/**
 * Start tracking conversion funnel.
 * 
 * @param funnelName - Funnel name
 * @param steps - Funnel steps
 * @returns Funnel tracking object
 * 
 * @example
 * ```tsx
 * const bookingFunnel = startFunnel('booking_flow', [
 *   'view_tour',
 *   'select_dates',
 *   'enter_details',
 *   'payment',
 *   'confirmation',
 * ]);
 * 
 * // Mark steps as completed
 * bookingFunnel.complete('view_tour');
 * bookingFunnel.complete('select_dates');
 * ```
 */
export function startFunnel(
  funnelName: string,
  stepNames: string[]
): {
  complete: (stepName: string) => void;
  abandon: () => void;
  getStatus: () => ConversionFunnel;
} {
  const funnel: ConversionFunnel = {
    name: funnelName,
    steps: stepNames.map(name => ({
      name,
      completed: false,
    })),
    startTime: Date.now(),
    conversionRate: 0,
  };
  
  // Store in sessionStorage
  sessionStorage.setItem(`funnel_${funnelName}`, JSON.stringify(funnel));
  
  return {
    complete: (stepName: string) => {
      const currentFunnel = JSON.parse(
        sessionStorage.getItem(`funnel_${funnelName}`) || JSON.stringify(funnel)
      );
      
      const stepIndex = currentFunnel.steps.findIndex((s: FunnelStep) => s.name === stepName);
      if (stepIndex !== -1) {
        const step = currentFunnel.steps[stepIndex];
        step.completed = true;
        step.timestamp = Date.now();
        step.timeToComplete = Date.now() - currentFunnel.startTime;
        
        // Update conversion rate
        const completedSteps = currentFunnel.steps.filter((s: FunnelStep) => s.completed).length;
        currentFunnel.conversionRate = (completedSteps / currentFunnel.steps.length) * 100;
        
        // Check if funnel is complete
        if (completedSteps === currentFunnel.steps.length) {
          currentFunnel.completionTime = Date.now();
          trackConversion(`funnel_completed_${funnelName}`, currentFunnel.completionTime - currentFunnel.startTime, {
            steps: currentFunnel.steps.length,
            duration: currentFunnel.completionTime - currentFunnel.startTime,
          });
        }
        
        sessionStorage.setItem(`funnel_${funnelName}`, JSON.stringify(currentFunnel));
        
        trackEvent(`funnel_step_${stepName}`, 'conversion', {
          funnel: funnelName,
          step: stepName,
          stepIndex,
          timeToComplete: step.timeToComplete,
        });
      }
    },
    
    abandon: () => {
      const currentFunnel = JSON.parse(
        sessionStorage.getItem(`funnel_${funnelName}`) || JSON.stringify(funnel)
      );
      
      trackEvent(`funnel_abandoned_${funnelName}`, 'conversion', {
        funnel: funnelName,
        lastCompletedStep: currentFunnel.steps.findLast((s: FunnelStep) => s.completed)?.name,
        conversionRate: currentFunnel.conversionRate,
      });
      
      sessionStorage.removeItem(`funnel_${funnelName}`);
    },
    
    getStatus: () => {
      return JSON.parse(
        sessionStorage.getItem(`funnel_${funnelName}`) || JSON.stringify(funnel)
      );
    },
  };
}

/**
 * Get analytics summary.
 * 
 * @param timeRange - Time range in milliseconds (default: last 24 hours)
 * @returns Analytics summary
 * 
 * @example
 * ```tsx
 * const summary = getAnalyticsSummary();
 * console.log(`Total Events: ${summary.totalEvents}`);
 * console.log(`Unique Sessions: ${summary.uniqueSessions}`);
 * console.log(`Avg Session Duration: ${summary.averageSessionDuration}ms`);
 * ```
 */
export function getAnalyticsSummary(timeRange: number = 24 * 60 * 60 * 1000): AnalyticsSummary {
  const allEvents: AnalyticsEvent[] = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  const cutoff = Date.now() - timeRange;
  const recentEvents = allEvents.filter(e => e.timestamp >= cutoff);
  
  // Calculate unique sessions
  const uniqueSessions = new Set(recentEvents.map(e => e.sessionId)).size;
  
  // Calculate average session duration
  const sessionDurations = new Map<string, number>();
  recentEvents.forEach(event => {
    const existing = sessionDurations.get(event.sessionId);
    if (!existing || event.timestamp > existing) {
      sessionDurations.set(event.sessionId, event.timestamp);
    }
  });
  
  let totalDuration = 0;
  sessionDurations.forEach((endTime, sessionId) => {
    const sessionEvents = recentEvents.filter(e => e.sessionId === sessionId);
    if (sessionEvents.length > 0) {
      const startTime = Math.min(...sessionEvents.map(e => e.timestamp));
      totalDuration += endTime - startTime;
    }
  });
  
  const averageSessionDuration = uniqueSessions > 0 ? totalDuration / uniqueSessions : 0;
  
  // Top pages
  const pageViews = recentEvents.filter(e => e.name === 'page_view');
  const pageCounts = new Map<string, number>();
  pageViews.forEach(e => {
    const page = e.properties.page || 'unknown';
    pageCounts.set(page, (pageCounts.get(page) || 0) + 1);
  });
  
  const topPages = Array.from(pageCounts.entries())
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
  
  // Top events
  const eventCounts = new Map<string, number>();
  recentEvents.forEach(e => {
    eventCounts.set(e.name, (eventCounts.get(e.name) || 0) + 1);
  });
  
  const topEvents = Array.from(eventCounts.entries())
    .map(([event, count]) => ({ event, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Device breakdown
  const deviceBreakdown = {
    mobile: 0,
    tablet: 0,
    desktop: 0,
  };
  
  const sessionDevices = new Map<string, DeviceInfo>();
  recentEvents.forEach(event => {
    const session = getCurrentSession();
    if (!sessionDevices.has(event.sessionId)) {
      sessionDevices.set(event.sessionId, session.device);
    }
  });
  
  sessionDevices.forEach(device => {
    if (device.isMobile) deviceBreakdown.mobile++;
    else if (device.isTablet) deviceBreakdown.tablet++;
    else if (device.isDesktop) deviceBreakdown.desktop++;
  });
  
  return {
    totalEvents: recentEvents.length,
    uniqueSessions,
    averageSessionDuration: Math.round(averageSessionDuration),
    topPages,
    topEvents,
    deviceBreakdown,
    conversionFunnels: [],
  };
}

/**
 * Clear analytics data.
 * 
 * @example
 * ```tsx
 * clearAnalytics();
 * ```
 */
export function clearAnalytics(): void {
  localStorage.removeItem('analytics_events');
  sessionStorage.removeItem('analytics_session_id');
  sessionStorage.removeItem('analytics_session_start');
  sessionStorage.removeItem('analytics_session_data');
  
  // Clear all funnels
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('funnel_')) {
      sessionStorage.removeItem(key);
    }
  });
}

/**
 * Export analytics data.
 * 
 * @returns Analytics data as JSON string
 * 
 * @example
 * ```tsx
 * const data = exportAnalytics();
 * // Save to file or send to server
 * ```
 */
export function exportAnalytics(): string {
  const allEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  const summary = getAnalyticsSummary();
  
  return JSON.stringify({
    events: allEvents,
    summary,
    exportedAt: new Date().toISOString(),
  }, null, 2);
}

/**
 * Log analytics summary to console.
 * 
 * @example
 * ```tsx
 * logAnalyticsSummary();
 * ```
 */
export function logAnalyticsSummary(): void {
  const summary = getAnalyticsSummary();
  
  console.group('📊 Analytics Summary (Last 24 Hours)');
  console.log(`Total Events: ${summary.totalEvents}`);
  console.log(`Unique Sessions: ${summary.uniqueSessions}`);
  console.log(`Avg Session Duration: ${(summary.averageSessionDuration / 1000 / 60).toFixed(2)} minutes`);
  
  console.group('\nTop Pages:');
  summary.topPages.forEach((page, i) => {
    console.log(`${i + 1}. ${page.page} (${page.views} views)`);
  });
  console.groupEnd();
  
  console.group('\nTop Events:');
  summary.topEvents.forEach((event, i) => {
    console.log(`${i + 1}. ${event.event} (${event.count} times)`);
  });
  console.groupEnd();
  
  console.group('\nDevice Breakdown:');
  console.log(`Mobile: ${summary.deviceBreakdown.mobile}`);
  console.log(`Tablet: ${summary.deviceBreakdown.tablet}`);
  console.log(`Desktop: ${summary.deviceBreakdown.desktop}`);
  console.groupEnd();
  
  console.groupEnd();
}

// Auto-track page visibility changes
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackEvent('page_hidden', 'navigation', {});
    } else {
      trackEvent('page_visible', 'navigation', {});
    }
  });
}
