/**
 * Bundle Size Analyzer
 * 
 * Analyzes component bundle sizes and identifies optimization opportunities.
 * Tracks dependencies, calculates sizes, and suggests improvements.
 * 
 * @module bundleSizeAnalyzer
 * @category utils
 */

/**
 * Bundle size analysis result.
 */
export interface BundleSizeAnalysis {
  componentName: string;
  estimatedSize: number;
  dependencies: DependencyInfo[];
  totalDependencies: number;
  suggestions: SizeOptimization[];
  riskLevel: 'low' | 'medium' | 'high';
  score: number;
  breakdown: SizeBreakdown;
  timestamp: number;
}

/**
 * Dependency information.
 */
export interface DependencyInfo {
  name: string;
  type: 'internal' | 'external' | 'react' | 'ui-library';
  estimatedSize: number;
  isTreeShakeable: boolean;
  usageCount: number;
}

/**
 * Size optimization suggestion.
 */
export interface SizeOptimization {
  type: 'code-split' | 'lazy-load' | 'tree-shake' | 'replace' | 'remove';
  severity: 'critical' | 'high' | 'medium' | 'low';
  target: string;
  currentSize: number;
  potentialSavings: number;
  description: string;
  implementation: string;
}

/**
 * Bundle size breakdown.
 */
export interface SizeBreakdown {
  code: number;
  dependencies: number;
  styles: number;
  assets: number;
  total: number;
}

/**
 * Known library sizes (approximate, in KB).
 */
const LIBRARY_SIZES: Record<string, number> = {
  // React ecosystem
  'react': 42,
  'react-dom': 130,
  'react-router-dom': 50,
  
  // UI libraries
  '@phosphor-icons/react': 15, // per icon ~1KB
  '@radix-ui/react-dialog': 20,
  '@radix-ui/react-dropdown-menu': 25,
  '@radix-ui/react-accordion': 18,
  '@radix-ui/react-tabs': 15,
  
  // Utilities
  'clsx': 1,
  'tailwind-merge': 8,
  'date-fns': 70, // Full library, can be tree-shaken
  
  // Charts
  'recharts': 250,
  'chart.js': 180,
  
  // Forms
  'react-hook-form': 40,
  'zod': 50,
  
  // Animation
  'framer-motion': 60,
  'motion/react': 60,
  
  // Carousel
  'react-slick': 35,
  'swiper': 120,
  
  // Other
  '@testing-library/react': 0, // Dev dependency
  'jest': 0, // Dev dependency
};

/**
 * Estimate size of a code string (approximate).
 */
function estimateCodeSize(code: string): number {
  // Remove comments
  const withoutComments = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  
  // Remove whitespace
  const minified = withoutComments.replace(/\s+/g, ' ').trim();
  
  // Estimate gzipped size (roughly 30% of minified)
  const minifiedSize = new Blob([minified]).size;
  const gzippedSize = Math.round(minifiedSize * 0.3);
  
  // Convert to KB
  return Math.round(gzippedSize / 1024 * 100) / 100;
}

/**
 * Extract imports from code.
 */
function extractImports(code: string): string[] {
  const imports: string[] = [];
  const importPattern = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
  
  let match;
  while ((match = importPattern.exec(code)) !== null) {
    imports.push(match[1]);
  }
  
  return imports;
}

/**
 * Categorize dependency.
 */
function categorizeDependency(importPath: string): DependencyInfo['type'] {
  if (importPath.startsWith('.')) {
    return 'internal';
  }
  if (importPath.startsWith('react')) {
    return 'react';
  }
  if (importPath.includes('ui/') || importPath.includes('@radix-ui')) {
    return 'ui-library';
  }
  return 'external';
}

/**
 * Estimate dependency size.
 */
function estimateDependencySize(importPath: string): number {
  // Extract package name
  const packageName = importPath.startsWith('@') 
    ? importPath.split('/').slice(0, 2).join('/')
    : importPath.split('/')[0];
  
  // Check known sizes
  if (LIBRARY_SIZES[packageName]) {
    return LIBRARY_SIZES[packageName];
  }
  
  // Special handling for Lucide icons (each ~1KB)
  if (packageName === '@phosphor-icons/react') {
    return 1;
  }
  
  // Default estimates by type
  if (importPath.startsWith('.')) {
    return 2; // Internal components
  }
  if (importPath.includes('ui/')) {
    return 5; // UI components
  }
  
  // Unknown external package
  return 10;
}

/**
 * Check if dependency is tree-shakeable.
 */
function isTreeShakeable(importPath: string): boolean {
  // Internal imports are tree-shakeable
  if (importPath.startsWith('.')) {
    return true;
  }
  
  // Known tree-shakeable libraries
  const treeShakeableLibs = [
    '@phosphor-icons/react',
    'date-fns',
    'lodash-es',
    '@radix-ui',
  ];
  
  return treeShakeableLibs.some(lib => importPath.includes(lib));
}

/**
 * Analyze component dependencies.
 */
function analyzeDependencies(code: string): DependencyInfo[] {
  const imports = extractImports(code);
  const dependencyMap = new Map<string, DependencyInfo>();
  
  imports.forEach(importPath => {
    const existing = dependencyMap.get(importPath);
    
    if (existing) {
      existing.usageCount++;
    } else {
      dependencyMap.set(importPath, {
        name: importPath,
        type: categorizeDependency(importPath),
        estimatedSize: estimateDependencySize(importPath),
        isTreeShakeable: isTreeShakeable(importPath),
        usageCount: 1,
      });
    }
  });
  
  return Array.from(dependencyMap.values());
}

/**
 * Generate size optimization suggestions.
 */
function generateOptimizations(
  analysis: Omit<BundleSizeAnalysis, 'suggestions' | 'riskLevel' | 'score'>
): SizeOptimization[] {
  const suggestions: SizeOptimization[] = [];
  
  // Check for large dependencies
  analysis.dependencies.forEach(dep => {
    if (dep.estimatedSize > 50 && dep.type === 'external') {
      suggestions.push({
        type: 'replace',
        severity: 'high',
        target: dep.name,
        currentSize: dep.estimatedSize,
        potentialSavings: dep.estimatedSize * 0.5,
        description: `Large dependency detected: ${dep.name} (~${dep.estimatedSize}KB)`,
        implementation: `Consider lighter alternatives or lazy loading this dependency`,
      });
    }
  });
  
  // Check for heavy UI libraries
  const heavyUILibs = analysis.dependencies.filter(
    dep => dep.type === 'ui-library' && dep.estimatedSize > 20
  );
  
  if (heavyUILibs.length > 3) {
    const totalUISize = heavyUILibs.reduce((sum, dep) => sum + dep.estimatedSize, 0);
    suggestions.push({
      type: 'code-split',
      severity: 'medium',
      target: 'UI Libraries',
      currentSize: totalUISize,
      potentialSavings: totalUISize * 0.4,
      description: `Multiple heavy UI libraries (${heavyUILibs.length} found, ~${totalUISize}KB)`,
      implementation: 'Use code splitting or lazy loading for UI-heavy components',
    });
  }
  
  // Check for non-tree-shakeable dependencies
  const nonTreeShakeable = analysis.dependencies.filter(dep => !dep.isTreeShakeable && dep.type === 'external');
  
  if (nonTreeShakeable.length > 0) {
    nonTreeShakeable.forEach(dep => {
      suggestions.push({
        type: 'tree-shake',
        severity: 'medium',
        target: dep.name,
        currentSize: dep.estimatedSize,
        potentialSavings: dep.estimatedSize * 0.3,
        description: `Non-tree-shakeable import: ${dep.name}`,
        implementation: 'Use named imports instead of default imports where possible',
      });
    });
  }
  
  // Check overall bundle size
  if (analysis.breakdown.total > 200) {
    suggestions.push({
      type: 'code-split',
      severity: 'critical',
      target: 'Component',
      currentSize: analysis.breakdown.total,
      potentialSavings: analysis.breakdown.total * 0.5,
      description: `Large component bundle (~${analysis.breakdown.total}KB)`,
      implementation: 'Split into smaller components and use lazy loading with React.lazy()',
    });
  }
  
  // Check for lazy loading opportunities
  const externalDeps = analysis.dependencies.filter(dep => dep.type === 'external');
  if (externalDeps.length > 5) {
    const totalExternal = externalDeps.reduce((sum, dep) => sum + dep.estimatedSize, 0);
    suggestions.push({
      type: 'lazy-load',
      severity: 'medium',
      target: 'External Dependencies',
      currentSize: totalExternal,
      potentialSavings: totalExternal * 0.6,
      description: `Many external dependencies (${externalDeps.length} found)`,
      implementation: 'Use dynamic imports for non-critical functionality',
    });
  }
  
  return suggestions.sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}

/**
 * Calculate risk level based on bundle size.
 */
function calculateRiskLevel(totalSize: number): 'low' | 'medium' | 'high' {
  if (totalSize > 300) return 'high';
  if (totalSize > 150) return 'medium';
  return 'low';
}

/**
 * Calculate optimization score (0-100).
 */
function calculateScore(analysis: BundleSizeAnalysis): number {
  let score = 100;
  
  // Deduct for large bundle
  if (analysis.breakdown.total > 300) score -= 30;
  else if (analysis.breakdown.total > 200) score -= 20;
  else if (analysis.breakdown.total > 100) score -= 10;
  
  // Deduct for many dependencies
  if (analysis.totalDependencies > 20) score -= 15;
  else if (analysis.totalDependencies > 10) score -= 10;
  
  // Deduct for non-tree-shakeable deps
  const nonTreeShakeable = analysis.dependencies.filter(d => !d.isTreeShakeable).length;
  score -= nonTreeShakeable * 5;
  
  // Deduct for critical suggestions
  const criticalSuggestions = analysis.suggestions.filter(s => s.severity === 'critical').length;
  score -= criticalSuggestions * 10;
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Analyze component bundle size.
 * 
 * @param componentName - Name of component
 * @param code - Component source code
 * @returns Bundle size analysis
 * 
 * @example
 * ```tsx
 * const analysis = analyzeBundleSize('MyComponent', sourceCode);
 * 
 * console.log(`Estimated size: ${analysis.estimatedSize}KB`);
 * console.log(`Dependencies: ${analysis.totalDependencies}`);
 * console.log(`Score: ${analysis.score}/100`);
 * 
 * analysis.suggestions.forEach(suggestion => {
 *   console.log(`${suggestion.severity}: ${suggestion.description}`);
 *   console.log(`  Potential savings: ${suggestion.potentialSavings}KB`);
 * });
 * ```
 */
export function analyzeBundleSize(
  componentName: string,
  code: string
): BundleSizeAnalysis {
  // Estimate code size
  const codeSize = estimateCodeSize(code);
  
  // Analyze dependencies
  const dependencies = analyzeDependencies(code);
  const dependenciesSize = dependencies.reduce((sum, dep) => sum + dep.estimatedSize, 0);
  
  // Estimate styles (rough approximation)
  const styleMatches = code.match(/className\s*=\s*{?["'`]/g);
  const stylesSize = styleMatches ? Math.ceil(styleMatches.length * 0.1) : 0;
  
  // Build size breakdown
  const breakdown: SizeBreakdown = {
    code: codeSize,
    dependencies: dependenciesSize,
    styles: stylesSize,
    assets: 0, // Would need file system access
    total: codeSize + dependenciesSize + stylesSize,
  };
  
  // Create partial analysis for optimization generation
  const partialAnalysis: Omit<BundleSizeAnalysis, 'suggestions' | 'riskLevel' | 'score'> = {
    componentName,
    estimatedSize: breakdown.total,
    dependencies,
    totalDependencies: dependencies.length,
    breakdown,
    timestamp: Date.now(),
  };
  
  // Generate optimizations
  const suggestions = generateOptimizations(partialAnalysis);
  
  // Calculate risk and score
  const riskLevel = calculateRiskLevel(breakdown.total);
  
  const analysis: BundleSizeAnalysis = {
    ...partialAnalysis,
    suggestions,
    riskLevel,
    score: 0, // Will be calculated next
  };
  
  analysis.score = calculateScore(analysis);
  
  return analysis;
}

/**
 * Compare bundle sizes across multiple components.
 */
export function compareBundleSizes(
  analyses: BundleSizeAnalysis[]
): {
  largest: BundleSizeAnalysis;
  smallest: BundleSizeAnalysis;
  average: number;
  total: number;
  optimizable: BundleSizeAnalysis[];
} {
  const sorted = [...analyses].sort((a, b) => b.estimatedSize - a.estimatedSize);
  
  const total = analyses.reduce((sum, a) => sum + a.estimatedSize, 0);
  const average = total / analyses.length;
  
  const optimizable = analyses.filter(
    a => a.suggestions.some(s => s.severity === 'critical' || s.severity === 'high')
  );
  
  return {
    largest: sorted[0],
    smallest: sorted[sorted.length - 1],
    average: Math.round(average * 100) / 100,
    total: Math.round(total * 100) / 100,
    optimizable,
  };
}

/**
 * Log bundle size analysis to console.
 */
export function logBundleSizeAnalysis(analysis: BundleSizeAnalysis): void {
  console.group(`📦 Bundle Size Analysis: ${analysis.componentName}`);
  
  const riskColor = analysis.riskLevel === 'high' ? '🔴' : analysis.riskLevel === 'medium' ? '🟡' : '🟢';
  console.log(`\n${riskColor} Risk Level: ${analysis.riskLevel.toUpperCase()}`);
  console.log(`📊 Score: ${analysis.score}/100`);
  console.log(`📏 Estimated Size: ${analysis.estimatedSize}KB`);
  
  console.group('\nSize Breakdown:');
  console.log(`Code: ${analysis.breakdown.code}KB`);
  console.log(`Dependencies: ${analysis.breakdown.dependencies}KB`);
  console.log(`Styles: ${analysis.breakdown.styles}KB`);
  console.log(`Assets: ${analysis.breakdown.assets}KB`);
  console.log(`Total: ${analysis.breakdown.total}KB`);
  console.groupEnd();
  
  console.group(`\nDependencies (${analysis.totalDependencies}):`);
  const byType: Record<string, DependencyInfo[]> = {
    internal: [],
    external: [],
    react: [],
    'ui-library': [],
  };
  
  analysis.dependencies.forEach(dep => byType[dep.type].push(dep));
  
  Object.entries(byType).forEach(([type, deps]) => {
    if (deps.length > 0) {
      console.group(`${type} (${deps.length}):`);
      deps.forEach(dep => {
        console.log(`${dep.name}: ${dep.estimatedSize}KB ${dep.isTreeShakeable ? '✅' : '⚠️ not tree-shakeable'}`);
      });
      console.groupEnd();
    }
  });
  console.groupEnd();
  
  if (analysis.suggestions.length > 0) {
    console.group(`\n💡 Optimization Suggestions (${analysis.suggestions.length}):`);
    
    const bySeverity: Record<string, SizeOptimization[]> = {
      critical: [],
      high: [],
      medium: [],
      low: [],
    };
    
    analysis.suggestions.forEach(s => bySeverity[s.severity].push(s));
    
    Object.entries(bySeverity).forEach(([severity, suggestions]) => {
      if (suggestions.length > 0) {
        console.group(`\n${severity.toUpperCase()} (${suggestions.length}):`);
        suggestions.forEach(s => {
          console.warn(`${s.description}`);
          console.log(`  Potential savings: ${s.potentialSavings}KB`);
          console.log(`  Implementation: ${s.implementation}`);
        });
        console.groupEnd();
      }
    });
    
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Generate bundle size report.
 */
export function generateBundleSizeReport(analyses: BundleSizeAnalysis[]): string {
  const comparison = compareBundleSizes(analyses);
  
  let report = `# Bundle Size Report\n\n`;
  report += `**Total Components:** ${analyses.length}\n`;
  report += `**Total Size:** ${comparison.total}KB\n`;
  report += `**Average Size:** ${comparison.average}KB\n`;
  report += `**Largest:** ${comparison.largest.componentName} (${comparison.largest.estimatedSize}KB)\n`;
  report += `**Smallest:** ${comparison.smallest.componentName} (${comparison.smallest.estimatedSize}KB)\n`;
  report += `**Needs Optimization:** ${comparison.optimizable.length}\n\n`;
  
  report += `## Components by Size\n\n`;
  
  const sorted = [...analyses].sort((a, b) => b.estimatedSize - a.estimatedSize);
  sorted.forEach(analysis => {
    const risk = analysis.riskLevel === 'high' ? '🔴' : analysis.riskLevel === 'medium' ? '🟡' : '🟢';
    report += `### ${risk} ${analysis.componentName} - ${analysis.estimatedSize}KB\n\n`;
    report += `- **Score:** ${analysis.score}/100\n`;
    report += `- **Dependencies:** ${analysis.totalDependencies}\n`;
    report += `- **Code:** ${analysis.breakdown.code}KB\n`;
    report += `- **Dependencies Size:** ${analysis.breakdown.dependencies}KB\n`;
    
    if (analysis.suggestions.length > 0) {
      report += `\n**Suggestions:**\n`;
      analysis.suggestions.slice(0, 3).forEach(s => {
        report += `- ${s.severity.toUpperCase()}: ${s.description} (Save ~${s.potentialSavings}KB)\n`;
      });
    }
    
    report += '\n';
  });
  
  return report;
}
