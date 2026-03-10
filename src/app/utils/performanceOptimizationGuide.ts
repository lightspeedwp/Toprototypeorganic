/**
 * Performance Optimization Guide
 * 
 * Comprehensive performance optimization strategies and best practices
 * for the Tour Operator application.
 * 
 * @module performanceOptimizationGuide
 * @category utils
 */

/**
 * Performance optimization checklist.
 */
export interface PerformanceChecklist {
  images: ChecklistItem[];
  code: ChecklistItem[];
  rendering: ChecklistItem[];
  network: ChecklistItem[];
  caching: ChecklistItem[];
}

/**
 * Checklist item.
 */
export interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  completed: boolean;
  impact: string;
  effort: string;
  implementation?: string;
}

/**
 * Performance budget.
 */
export interface PerformanceBudget {
  firstContentfulPaint: number; // ms
  largestContentfulPaint: number; // ms
  timeToInteractive: number; // ms
  totalBundleSize: number; // bytes
  imageSize: number; // bytes per image
  apiResponseTime: number; // ms
}

/**
 * Get performance optimization checklist.
 * 
 * @returns Complete checklist
 * 
 * @example
 * ```tsx
 * const checklist = getPerformanceChecklist();
 * checklist.images.forEach(item => {
 *   console.log(`${item.name}: ${item.completed ? '✅' : '❌'}`);
 * });
 * ```
 */
export function getPerformanceChecklist(): PerformanceChecklist {
  return {
    images: [
      {
        id: 'img-1',
        name: 'Use WebP/AVIF formats',
        description: 'Convert images to modern formats for 30-50% size reduction',
        priority: 'high',
        completed: false,
        impact: '30-50% size reduction',
        effort: '2-3 hours',
        implementation: `
import { getOptimalImageFormat, getOptimizedImageUrl } from "../utils/imageOptimization";

const format = getOptimalImageFormat();
const url = getOptimizedImageUrl('/images/hero.jpg', { format, quality: 80 });
        `,
      },
      {
        id: 'img-2',
        name: 'Implement lazy loading',
        description: 'Lazy load images below the fold',
        priority: 'critical',
        completed: false,
        impact: '50-70% faster initial load',
        effort: '1 hour',
        implementation: `
import { lazyLoadImages } from "../utils/imageOptimization";

// Lazy load all images with data-src attribute
lazyLoadImages('img[data-src]', {
  rootMargin: '50px',
  threshold: 0.1,
});
        `,
      },
      {
        id: 'img-3',
        name: 'Add responsive images',
        description: 'Serve different sizes based on viewport',
        priority: 'high',
        completed: false,
        impact: '40-60% bandwidth savings',
        effort: '2-3 hours',
        implementation: `
import { generateSrcSet, getResponsiveBreakpoints } from "../utils/imageOptimization";

const breakpoints = getResponsiveBreakpoints();
const srcset = generateSrcSet('/images/hero.jpg', breakpoints);

<img src="/images/hero.jpg" srcSet={srcset} sizes="100vw" />
        `,
      },
      {
        id: 'img-4',
        name: 'Preload critical images',
        description: 'Preload above-the-fold images',
        priority: 'medium',
        completed: false,
        impact: '20-30% faster LCP',
        effort: '30 minutes',
        implementation: `
import { preloadImages } from "../utils/imageOptimization";

preloadImages(['/images/hero.jpg', '/images/logo.png'], {
  as: 'image',
  fetchPriority: 'high',
});
        `,
      },
      {
        id: 'img-5',
        name: 'Add blur placeholders',
        description: 'Show placeholder while loading',
        priority: 'low',
        completed: false,
        impact: 'Better perceived performance',
        effort: '1 hour',
        implementation: `
import { createBlurPlaceholder } from "../utils/imageOptimization";

const placeholder = createBlurPlaceholder(1920, 1080, '#e5e7eb');
<img src={image} style={{ backgroundImage: \`url(\${placeholder})\` }} />
        `,
      },
    ],

    code: [
      {
        id: 'code-1',
        name: 'Implement code splitting',
        description: 'Split routes and heavy components',
        priority: 'critical',
        completed: false,
        impact: '40-60% smaller initial bundle',
        effort: '3-4 hours',
        implementation: `
import { lazyWithRetry } from "../utils/codeSplitting";

const ToursPage = lazyWithRetry(
  () => import('./pages/ToursPage'),
  { retries: 3, delay: 1000 }
);

<Suspense fallback={<Loading />}>
  <ToursPage />
</Suspense>
        `,
      },
      {
        id: 'code-2',
        name: 'Prefetch on hover',
        description: 'Preload routes when hovering links',
        priority: 'high',
        completed: false,
        impact: 'Instant page transitions',
        effort: '1 hour',
        implementation: `
import { prefetchOnHover } from "../utils/codeSplitting";

const handleHover = prefetchOnHover(
  () => import('./pages/TourDetail'),
  300
);

<Link to="/tours/1" onMouseEnter={handleHover}>View Tour</Link>
        `,
      },
      {
        id: 'code-3',
        name: 'Split vendor bundles',
        description: 'Separate vendor code for better caching',
        priority: 'high',
        completed: false,
        impact: '30-40% better caching',
        effort: '1-2 hours',
        implementation: `
// In vite.config.ts or webpack config
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom'],
        ui: ['@phosphor-icons/react', '@radix-ui'],
      },
    },
  },
}
        `,
      },
      {
        id: 'code-4',
        name: 'Tree shaking',
        description: 'Remove unused code',
        priority: 'medium',
        completed: false,
        impact: '10-20% smaller bundle',
        effort: '2 hours',
        implementation: `
// Import only what you need
import { MapPin } from '@phosphor-icons/react'; // Good
// import * as Icons from '@phosphor-icons/react'; // Bad

// Use ES modules
import { formatDate } from './utils'; // Good
// const utils = require('./utils'); // Bad
        `,
      },
      {
        id: 'code-5',
        name: 'Minify and compress',
        description: 'Enable Gzip/Brotli compression',
        priority: 'critical',
        completed: false,
        impact: '60-80% size reduction',
        effort: '30 minutes',
        implementation: `
// Enable in server configuration
// Nginx:
gzip on;
gzip_types text/plain text/css application/json application/javascript;

// Vite automatically minifies in production
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
}
        `,
      },
    ],

    rendering: [
      {
        id: 'render-1',
        name: 'Use React.memo',
        description: 'Memoize expensive components',
        priority: 'high',
        completed: false,
        impact: '30-50% fewer re-renders',
        effort: '1-2 hours',
        implementation: `
import { memo } from 'react';

export const TourCard = memo(({ tour }) => {
  return <div>...</div>;
});
        `,
      },
      {
        id: 'render-2',
        name: 'Virtualize long lists',
        description: 'Render only visible items',
        priority: 'high',
        completed: false,
        impact: '80-90% faster rendering',
        effort: '2-3 hours',
        implementation: `
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: tours.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 200,
});
        `,
      },
      {
        id: 'render-3',
        name: 'Debounce user input',
        description: 'Reduce re-renders on input',
        priority: 'medium',
        completed: false,
        impact: '50-70% fewer updates',
        effort: '30 minutes',
        implementation: `
import { useDebouncedCallback } from 'use-debounce';

const handleSearch = useDebouncedCallback((value) => {
  setSearchTerm(value);
}, 300);
        `,
      },
      {
        id: 'render-4',
        name: 'Use CSS animations',
        description: 'Prefer CSS over JS animations',
        priority: 'medium',
        completed: false,
        impact: '20-40% smoother animations',
        effort: '1 hour',
        implementation: `
/* CSS transitions instead of JS */
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
}
        `,
      },
    ],

    network: [
      {
        id: 'network-1',
        name: 'Implement service worker',
        description: 'Cache assets for offline access',
        priority: 'high',
        completed: false,
        impact: 'Instant repeat visits',
        effort: '3-4 hours',
        implementation: `
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
        `,
      },
      {
        id: 'network-2',
        name: 'Use HTTP/2',
        description: 'Enable multiplexing',
        priority: 'high',
        completed: false,
        impact: '30-50% faster loading',
        effort: 'Server configuration',
      },
      {
        id: 'network-3',
        name: 'Add CDN',
        description: 'Serve static assets from CDN',
        priority: 'high',
        completed: false,
        impact: '40-60% faster global access',
        effort: '1-2 hours',
      },
      {
        id: 'network-4',
        name: 'Implement prefetching',
        description: 'Prefetch likely next pages',
        priority: 'medium',
        completed: false,
        impact: 'Instant page transitions',
        effort: '1 hour',
        implementation: `
import { prefetchOnIdle } from "../utils/codeSplitting";

prefetchOnIdle([
  () => import('./pages/ToursPage'),
  () => import('./pages/DestinationsPage'),
]);
        `,
      },
    ],

    caching: [
      {
        id: 'cache-1',
        name: 'Set cache headers',
        description: 'Configure optimal cache headers',
        priority: 'critical',
        completed: false,
        impact: '90%+ cache hit rate',
        effort: '1 hour',
        implementation: `
// Static assets: 1 year
Cache-Control: public, max-age=31536000, immutable

// API responses: 5 minutes
Cache-Control: public, max-age=300, stale-while-revalidate=60

// HTML: no cache
Cache-Control: no-cache, must-revalidate
        `,
      },
      {
        id: 'cache-2',
        name: 'Use localStorage',
        description: 'Cache frequently accessed data',
        priority: 'medium',
        completed: false,
        impact: 'Instant data access',
        effort: '1 hour',
        implementation: `
// Cache tour data
localStorage.setItem('tours', JSON.stringify(tours));

// Retrieve with expiry
const cached = getCachedData('tours', 5 * 60 * 1000); // 5 min TTL
        `,
      },
      {
        id: 'cache-3',
        name: 'Implement React Query',
        description: 'Automatic caching and refetching',
        priority: 'high',
        completed: false,
        impact: '50-70% fewer API calls',
        effort: '2-3 hours',
        implementation: `
import { useQuery } from '@tanstack/react-query';

const { data: tours } = useQuery({
  queryKey: ['tours'],
  queryFn: fetchTours,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
        `,
      },
    ],
  };
}

/**
 * Get performance budget.
 * 
 * @returns Recommended budget
 * 
 * @example
 * ```tsx
 * const budget = getPerformanceBudget();
 * console.log(\`LCP budget: \${budget.largestContentfulPaint}ms\`);
 * ```
 */
export function getPerformanceBudget(): PerformanceBudget {
  return {
    firstContentfulPaint: 1800, // 1.8s
    largestContentfulPaint: 2500, // 2.5s
    timeToInteractive: 3800, // 3.8s
    totalBundleSize: 200 * 1024, // 200KB (gzipped)
    imageSize: 100 * 1024, // 100KB per image
    apiResponseTime: 200, // 200ms
  };
}

/**
 * Check if metrics meet budget.
 * 
 * @param metrics - Current metrics
 * @param budget - Performance budget
 * @returns Compliance report
 * 
 * @example
 * ```tsx
 * const compliance = checkBudgetCompliance(metrics, budget);
 * console.log(\`Budget compliance: \${compliance.percentage}%\`);
 * ```
 */
export function checkBudgetCompliance(
  metrics: Partial<PerformanceBudget>,
  budget: PerformanceBudget = getPerformanceBudget()
): {
  passing: boolean;
  violations: string[];
  percentage: number;
} {
  const violations: string[] = [];

  Object.entries(metrics).forEach(([key, value]) => {
    const budgetValue = budget[key as keyof PerformanceBudget];
    
    if (value > budgetValue) {
      violations.push(
        `${key}: ${value} exceeds budget of ${budgetValue}`
      );
    }
  });

  const totalChecks = Object.keys(metrics).length;
  const passingChecks = totalChecks - violations.length;
  const percentage = Math.round((passingChecks / totalChecks) * 100);

  return {
    passing: violations.length === 0,
    violations,
    percentage,
  };
}

/**
 * Get performance optimization priorities.
 * 
 * @param checklist - Current checklist
 * @returns Prioritized items
 * 
 * @example
 * ```tsx
 * const priorities = getOptimizationPriorities(checklist);
 * priorities.forEach(item => {
 *   console.log(\`\${item.priority}: \${item.name}\`);
 * });
 * ```
 */
export function getOptimizationPriorities(
  checklist: PerformanceChecklist
): ChecklistItem[] {
  const allItems: ChecklistItem[] = [
    ...checklist.images,
    ...checklist.code,
    ...checklist.rendering,
    ...checklist.network,
    ...checklist.caching,
  ];

  // Filter incomplete items and sort by priority
  return allItems
    .filter((item) => !item.completed)
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}

/**
 * Performance optimization guide.
 */
export const PERFORMANCE_GUIDE = {
  title: 'Performance Optimization Guide',
  description: 'Complete guide to optimizing Tour Operator application performance',
  
  sections: [
    {
      title: '1. Image Optimization',
      tips: [
        'Use WebP/AVIF formats (30-50% smaller)',
        'Implement lazy loading (50-70% faster initial load)',
        'Add responsive images (40-60% bandwidth savings)',
        'Preload critical images (20-30% faster LCP)',
        'Use blur placeholders (better perceived performance)',
      ],
    },
    {
      title: '2. Code Splitting',
      tips: [
        'Split routes (40-60% smaller initial bundle)',
        'Prefetch on hover (instant page transitions)',
        'Split vendor bundles (30-40% better caching)',
        'Enable tree shaking (10-20% smaller bundle)',
        'Minify and compress (60-80% size reduction)',
      ],
    },
    {
      title: '3. Rendering Optimization',
      tips: [
        'Use React.memo (30-50% fewer re-renders)',
        'Virtualize long lists (80-90% faster rendering)',
        'Debounce user input (50-70% fewer updates)',
        'Use CSS animations (20-40% smoother)',
      ],
    },
    {
      title: '4. Network Optimization',
      tips: [
        'Implement service worker (instant repeat visits)',
        'Use HTTP/2 (30-50% faster loading)',
        'Add CDN (40-60% faster global access)',
        'Implement prefetching (instant transitions)',
      ],
    },
    {
      title: '5. Caching Strategy',
      tips: [
        'Set cache headers (90%+ hit rate)',
        'Use localStorage (instant data access)',
        'Implement React Query (50-70% fewer API calls)',
      ],
    },
  ],
  
  quickWins: [
    'Enable Gzip/Brotli compression (5 min, 60-80% reduction)',
    'Add lazy loading to images (1 hour, 50-70% faster)',
    'Implement code splitting (3-4 hours, 40-60% smaller bundle)',
    'Set proper cache headers (1 hour, 90%+ hit rate)',
  ],
  
  tools: [
    'Lighthouse (Google)',
    'WebPageTest',
    'Chrome DevTools Performance',
    'Bundle Analyzer',
    'Performance Monitor (built-in)',
  ],
};
