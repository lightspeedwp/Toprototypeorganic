/**
 * Code Quality Analyzer
 * 
 * Analyzes React components for code quality, complexity, and maintainability.
 * Provides actionable insights for improving code structure.
 * 
 * @module codeQualityAnalyzer
 * @category utils
 */

/**
 * Code quality metrics for a component.
 */
export interface CodeQualityMetrics {
  componentName: string;
  linesOfCode: number;
  cyclomaticComplexity: number;
  maintainabilityIndex: number;
  cognitiveComplexity: number;
  numberOfProps: number;
  numberOfHooks: number;
  numberOfEffects: number;
  numberOfStates: number;
  nestingDepth: number;
  hasTypeScript: boolean;
  hasPropTypes: boolean;
  hasTests: boolean;
  hasDocumentation: boolean;
  designTokenCompliance: number;
  accessibilityScore: number;
  performanceScore: number;
  qualityGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  issues: CodeQualityIssue[];
  suggestions: string[];
  timestamp: number;
}

/**
 * Code quality issue.
 */
export interface CodeQualityIssue {
  severity: 'critical' | 'warning' | 'info';
  category: 'complexity' | 'maintainability' | 'performance' | 'accessibility' | 'best-practices';
  message: string;
  line?: number;
  suggestion: string;
}

/**
 * Component analysis configuration.
 */
export interface AnalysisConfig {
  includeComplexity?: boolean;
  includePerformance?: boolean;
  includeAccessibility?: boolean;
  includeDesignTokens?: boolean;
  strictMode?: boolean;
}

/**
 * Calculate cyclomatic complexity from code.
 * Counts decision points (if, for, while, case, &&, ||, ?, catch).
 */
function calculateCyclomaticComplexity(code: string): number {
  let complexity = 1; // Base complexity
  
  // Decision points
  const patterns = [
    /\bif\s*\(/g,           // if statements
    /\bfor\s*\(/g,          // for loops
    /\bwhile\s*\(/g,        // while loops
    /\bcase\s+/g,           // switch cases
    /\bcatch\s*\(/g,        // catch blocks
    /\?\s*[^:]*:/g,         // ternary operators
    /&&/g,                  // logical AND
    /\|\|/g,                // logical OR
  ];
  
  patterns.forEach(pattern => {
    const matches = code.match(pattern);
    if (matches) {
      complexity += matches.length;
    }
  });
  
  return complexity;
}

/**
 * Calculate cognitive complexity (how hard code is to understand).
 * Considers nesting and structural complexity.
 */
function calculateCognitiveComplexity(code: string): number {
  let complexity = 0;
  let nestingLevel = 0;
  
  // Split into lines for analysis
  const lines = code.split('\n');
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    // Increase nesting for blocks
    if (trimmed.includes('{')) {
      nestingLevel++;
    }
    if (trimmed.includes('}')) {
      nestingLevel = Math.max(0, nestingLevel - 1);
    }
    
    // Add complexity for control structures (weighted by nesting)
    if (/\b(if|for|while|switch)\s*\(/.test(trimmed)) {
      complexity += (1 + nestingLevel);
    }
    
    // Add complexity for boolean operators in conditions
    if (/&&|\|\|/.test(trimmed)) {
      complexity += 1;
    }
    
    // Add complexity for nested functions
    if (/function\s+\w+/.test(trimmed) || /=>\s*{/.test(trimmed)) {
      if (nestingLevel > 1) {
        complexity += nestingLevel;
      }
    }
  });
  
  return complexity;
}

/**
 * Calculate maintainability index (0-100 scale).
 * Based on Halstead Volume, Cyclomatic Complexity, and Lines of Code.
 */
function calculateMaintainabilityIndex(
  linesOfCode: number,
  cyclomaticComplexity: number,
  halsteadVolume: number
): number {
  // Simplified maintainability index formula
  // MI = 171 - 5.2 * ln(HV) - 0.23 * CC - 16.2 * ln(LOC)
  
  const mi = Math.max(
    0,
    171 -
      5.2 * Math.log(halsteadVolume) -
      0.23 * cyclomaticComplexity -
      16.2 * Math.log(linesOfCode)
  );
  
  // Normalize to 0-100
  return Math.min(100, Math.max(0, mi));
}

/**
 * Calculate Halstead volume (simplified).
 * Measures code size and vocabulary.
 */
function calculateHalsteadVolume(code: string): number {
  // Count unique operators and operands
  const operators = code.match(/[+\-*/%=<>!&|^~?:]/g) || [];
  const operands = code.match(/\b\w+\b/g) || [];
  
  const uniqueOperators = new Set(operators).size;
  const uniqueOperands = new Set(operands).size;
  const totalOperators = operators.length;
  const totalOperands = operands.length;
  
  const vocabulary = uniqueOperators + uniqueOperands;
  const length = totalOperators + totalOperands;
  
  // Volume = Length * log2(Vocabulary)
  return length * Math.log2(Math.max(vocabulary, 1));
}

/**
 * Analyze maximum nesting depth.
 */
function analyzeNestingDepth(code: string): number {
  let maxDepth = 0;
  let currentDepth = 0;
  
  for (const char of code) {
    if (char === '{') {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    } else if (char === '}') {
      currentDepth = Math.max(0, currentDepth - 1);
    }
  }
  
  return maxDepth;
}

/**
 * Count React hooks usage.
 */
function countHooks(code: string): {
  total: number;
  effects: number;
  states: number;
  hooks: string[];
} {
  const hookPatterns = [
    /use[A-Z]\w+/g, // All hooks
  ];
  
  const allHooks: string[] = [];
  hookPatterns.forEach(pattern => {
    const matches = code.match(pattern);
    if (matches) {
      allHooks.push(...matches);
    }
  });
  
  const uniqueHooks = [...new Set(allHooks)];
  const effects = (code.match(/useEffect/g) || []).length;
  const states = (code.match(/useState/g) || []).length;
  
  return {
    total: uniqueHooks.length,
    effects,
    states,
    hooks: uniqueHooks,
  };
}

/**
 * Count component props.
 */
function countProps(code: string): number {
  // Look for interface/type definitions
  const interfaceMatch = code.match(/interface\s+\w+Props\s*{([^}]+)}/);
  const typeMatch = code.match(/type\s+\w+Props\s*=\s*{([^}]+)}/);
  
  const propsBlock = interfaceMatch?.[1] || typeMatch?.[1] || '';
  
  // Count prop definitions (lines with colons, excluding comments)
  const propLines = propsBlock
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return trimmed && trimmed.includes(':') && !trimmed.startsWith('//') && !trimmed.startsWith('/*');
    });
  
  return propLines.length;
}

/**
 * Check for TypeScript usage.
 */
function hasTypeScript(code: string): boolean {
  return /:\s*(string|number|boolean|any|unknown|never|void|object|React\.\w+)/.test(code) ||
    /interface\s+\w+/.test(code) ||
    /type\s+\w+\s*=/.test(code);
}

/**
 * Check for PropTypes usage.
 */
function hasPropTypes(code: string): boolean {
  return /PropTypes\./g.test(code) || /\.propTypes\s*=/.test(code);
}

/**
 * Detect code quality issues.
 */
function detectIssues(
  metrics: Partial<CodeQualityMetrics>
): CodeQualityIssue[] {
  const issues: CodeQualityIssue[] = [];
  
  // Complexity issues
  if (metrics.cyclomaticComplexity && metrics.cyclomaticComplexity > 20) {
    issues.push({
      severity: 'critical',
      category: 'complexity',
      message: `High cyclomatic complexity (${metrics.cyclomaticComplexity})`,
      suggestion: 'Break component into smaller functions or sub-components. Extract complex logic into custom hooks.',
    });
  } else if (metrics.cyclomaticComplexity && metrics.cyclomaticComplexity > 10) {
    issues.push({
      severity: 'warning',
      category: 'complexity',
      message: `Moderate cyclomatic complexity (${metrics.cyclomaticComplexity})`,
      suggestion: 'Consider simplifying conditional logic or extracting functions.',
    });
  }
  
  if (metrics.cognitiveComplexity && metrics.cognitiveComplexity > 15) {
    issues.push({
      severity: 'warning',
      category: 'complexity',
      message: `High cognitive complexity (${metrics.cognitiveComplexity})`,
      suggestion: 'Reduce nesting depth. Use early returns and guard clauses.',
    });
  }
  
  if (metrics.nestingDepth && metrics.nestingDepth > 5) {
    issues.push({
      severity: 'warning',
      category: 'complexity',
      message: `Deep nesting detected (${metrics.nestingDepth} levels)`,
      suggestion: 'Flatten nested structures. Extract nested logic into separate functions.',
    });
  }
  
  // Lines of code
  if (metrics.linesOfCode && metrics.linesOfCode > 300) {
    issues.push({
      severity: 'critical',
      category: 'maintainability',
      message: `Component is too large (${metrics.linesOfCode} lines)`,
      suggestion: 'Split into multiple smaller components. A component should ideally be < 200 lines.',
    });
  } else if (metrics.linesOfCode && metrics.linesOfCode > 200) {
    issues.push({
      severity: 'warning',
      category: 'maintainability',
      message: `Component is getting large (${metrics.linesOfCode} lines)`,
      suggestion: 'Consider splitting into smaller components for better maintainability.',
    });
  }
  
  // Props count
  if (metrics.numberOfProps && metrics.numberOfProps > 10) {
    issues.push({
      severity: 'warning',
      category: 'best-practices',
      message: `Too many props (${metrics.numberOfProps})`,
      suggestion: 'Group related props into objects or use composition pattern.',
    });
  }
  
  // Hooks count
  if (metrics.numberOfHooks && metrics.numberOfHooks > 8) {
    issues.push({
      severity: 'warning',
      category: 'maintainability',
      message: `Many hooks used (${metrics.numberOfHooks})`,
      suggestion: 'Consider extracting hooks into custom hooks for reusability.',
    });
  }
  
  // Effects count
  if (metrics.numberOfEffects && metrics.numberOfEffects > 5) {
    issues.push({
      severity: 'warning',
      category: 'performance',
      message: `Many useEffect hooks (${metrics.numberOfEffects})`,
      suggestion: 'Consolidate related effects or extract into custom hooks.',
    });
  }
  
  // TypeScript
  if (!metrics.hasTypeScript && !metrics.hasPropTypes) {
    issues.push({
      severity: 'warning',
      category: 'best-practices',
      message: 'No type definitions found',
      suggestion: 'Add TypeScript interfaces or PropTypes for better type safety.',
    });
  }
  
  // Maintainability
  if (metrics.maintainabilityIndex && metrics.maintainabilityIndex < 50) {
    issues.push({
      severity: 'critical',
      category: 'maintainability',
      message: 'Low maintainability index',
      suggestion: 'Refactor to reduce complexity and improve code structure.',
    });
  }
  
  return issues;
}

/**
 * Generate improvement suggestions based on metrics.
 */
function generateSuggestions(metrics: CodeQualityMetrics): string[] {
  const suggestions: string[] = [];
  
  // Performance suggestions
  if (metrics.numberOfEffects > 3) {
    suggestions.push('📊 Consider using useMemo() or useCallback() to prevent unnecessary re-renders');
  }
  
  if (metrics.linesOfCode > 150) {
    suggestions.push('🔧 Extract reusable logic into custom hooks');
    suggestions.push('📦 Split component into smaller, focused components');
  }
  
  if (metrics.cyclomaticComplexity > 8) {
    suggestions.push('🎯 Use guard clauses and early returns to reduce complexity');
    suggestions.push('🔀 Extract conditional logic into separate functions');
  }
  
  if (metrics.numberOfProps > 6) {
    suggestions.push('🎨 Use composition pattern instead of prop drilling');
    suggestions.push('📋 Group related props into configuration objects');
  }
  
  if (!metrics.hasTests) {
    suggestions.push('✅ Add unit tests for better code quality and confidence');
  }
  
  if (!metrics.hasDocumentation) {
    suggestions.push('📝 Add JSDoc comments for better documentation');
  }
  
  if (metrics.nestingDepth > 3) {
    suggestions.push('🔄 Flatten nested structures using array methods or helper functions');
  }
  
  // Best practices
  suggestions.push('🚀 Use React.memo() for expensive components');
  suggestions.push('♿ Ensure WCAG 2.1 AA accessibility compliance');
  suggestions.push('🎨 Use semantic HTML and design tokens');
  
  return suggestions.slice(0, 5); // Return top 5
}

/**
 * Calculate overall quality grade.
 */
function calculateQualityGrade(metrics: CodeQualityMetrics): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
  let score = 100;
  
  // Deduct points for issues
  const criticalIssues = metrics.issues.filter(i => i.severity === 'critical').length;
  const warningIssues = metrics.issues.filter(i => i.severity === 'warning').length;
  
  score -= criticalIssues * 15;
  score -= warningIssues * 5;
  
  // Deduct for complexity
  if (metrics.cyclomaticComplexity > 20) score -= 20;
  else if (metrics.cyclomaticComplexity > 10) score -= 10;
  
  if (metrics.cognitiveComplexity > 15) score -= 10;
  else if (metrics.cognitiveComplexity > 10) score -= 5;
  
  // Deduct for size
  if (metrics.linesOfCode > 300) score -= 15;
  else if (metrics.linesOfCode > 200) score -= 5;
  
  // Bonus for best practices
  if (metrics.hasTypeScript) score += 5;
  if (metrics.hasTests) score += 10;
  if (metrics.hasDocumentation) score += 5;
  
  // Grade thresholds
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

/**
 * Analyze component code quality.
 * 
 * @param componentName - Name of the component
 * @param code - Component source code
 * @param config - Analysis configuration
 * @returns Code quality metrics and suggestions
 * 
 * @example
 * ```tsx
 * const metrics = analyzeComponentQuality('MyComponent', sourceCode);
 * console.log(`Grade: ${metrics.qualityGrade}`);
 * console.log(`Complexity: ${metrics.cyclomaticComplexity}`);
 * ```
 */
export function analyzeComponentQuality(
  componentName: string,
  code: string,
  config: AnalysisConfig = {}
): CodeQualityMetrics {
  const {
    includeComplexity = true,
    includePerformance = true,
    includeAccessibility = true,
    includeDesignTokens = true,
    strictMode = false,
  } = config;
  
  // Basic metrics
  const linesOfCode = code.split('\n').length;
  const cyclomaticComplexity = includeComplexity ? calculateCyclomaticComplexity(code) : 0;
  const cognitiveComplexity = includeComplexity ? calculateCognitiveComplexity(code) : 0;
  const nestingDepth = analyzeNestingDepth(code);
  const halsteadVolume = calculateHalsteadVolume(code);
  const maintainabilityIndex = calculateMaintainabilityIndex(
    linesOfCode,
    cyclomaticComplexity,
    halsteadVolume
  );
  
  // React-specific metrics
  const hookMetrics = countHooks(code);
  const numberOfProps = countProps(code);
  
  // Code quality indicators
  const hasTS = hasTypeScript(code);
  const hasPT = hasPropTypes(code);
  const hasTests = /describe\(|it\(|test\(/g.test(code);
  const hasDoc = /\/\*\*[\s\S]*?\*\//.test(code);
  
  // Placeholder scores (would need actual file analysis)
  const designTokenCompliance = includeDesignTokens ? 95 : 100;
  const accessibilityScore = includeAccessibility ? 90 : 100;
  const performanceScore = includePerformance ? 85 : 100;
  
  // Build partial metrics for issue detection
  const partialMetrics: Partial<CodeQualityMetrics> = {
    componentName,
    linesOfCode,
    cyclomaticComplexity,
    cognitiveComplexity,
    nestingDepth,
    numberOfProps,
    numberOfHooks: hookMetrics.total,
    numberOfEffects: hookMetrics.effects,
    numberOfStates: hookMetrics.states,
    hasTypeScript: hasTS,
    hasPropTypes: hasPT,
    hasTests,
    hasDocumentation: hasDoc,
    maintainabilityIndex,
  };
  
  // Detect issues
  const issues = detectIssues(partialMetrics);
  
  // Build complete metrics
  const metrics: CodeQualityMetrics = {
    ...partialMetrics as CodeQualityMetrics,
    designTokenCompliance,
    accessibilityScore,
    performanceScore,
    issues,
    suggestions: [],
    qualityGrade: 'B',
    timestamp: Date.now(),
  };
  
  // Generate suggestions
  metrics.suggestions = generateSuggestions(metrics);
  
  // Calculate grade
  metrics.qualityGrade = calculateQualityGrade(metrics);
  
  return metrics;
}

/**
 * Analyze multiple components and generate report.
 */
export function analyzeProject(components: Map<string, string>): {
  totalComponents: number;
  averageGrade: string;
  averageComplexity: number;
  averageMaintainability: number;
  criticalIssues: number;
  warningIssues: number;
  topIssues: string[];
  componentMetrics: CodeQualityMetrics[];
} {
  const metrics: CodeQualityMetrics[] = [];
  
  components.forEach((code, name) => {
    metrics.push(analyzeComponentQuality(name, code));
  });
  
  const totalComponents = metrics.length;
  const avgComplexity = metrics.reduce((sum, m) => sum + m.cyclomaticComplexity, 0) / totalComponents;
  const avgMaintainability = metrics.reduce((sum, m) => sum + m.maintainabilityIndex, 0) / totalComponents;
  
  const allIssues = metrics.flatMap(m => m.issues);
  const criticalIssues = allIssues.filter(i => i.severity === 'critical').length;
  const warningIssues = allIssues.filter(i => i.severity === 'warning').length;
  
  // Count top issues
  const issueCounts = new Map<string, number>();
  allIssues.forEach(issue => {
    const count = issueCounts.get(issue.message) || 0;
    issueCounts.set(issue.message, count + 1);
  });
  
  const topIssues = Array.from(issueCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([message, count]) => `${message} (${count} occurrences)`);
  
  // Calculate average grade
  const gradeValues = { 'A+': 100, 'A': 90, 'B': 80, 'C': 70, 'D': 60, 'F': 50 };
  const avgGradeValue = metrics.reduce((sum, m) => sum + gradeValues[m.qualityGrade], 0) / totalComponents;
  const averageGrade = avgGradeValue >= 95 ? 'A+' : avgGradeValue >= 85 ? 'A' : avgGradeValue >= 75 ? 'B' : avgGradeValue >= 65 ? 'C' : avgGradeValue >= 55 ? 'D' : 'F';
  
  return {
    totalComponents,
    averageGrade,
    averageComplexity: Math.round(avgComplexity),
    averageMaintainability: Math.round(avgMaintainability),
    criticalIssues,
    warningIssues,
    topIssues,
    componentMetrics: metrics.sort((a, b) => {
      const gradeA = gradeValues[a.qualityGrade];
      const gradeB = gradeValues[b.qualityGrade];
      return gradeA - gradeB; // Sort worst first
    }),
  };
}

/**
 * Log code quality metrics to console.
 */
export function logCodeQualityMetrics(metrics: CodeQualityMetrics) {
  console.group(`📊 Code Quality Analysis: ${metrics.componentName}`);
  
  console.log(`\n🎯 Overall Grade: ${metrics.qualityGrade}`);
  console.log(`📏 Lines of Code: ${metrics.linesOfCode}`);
  console.log(`🔀 Cyclomatic Complexity: ${metrics.cyclomaticComplexity}`);
  console.log(`🧠 Cognitive Complexity: ${metrics.cognitiveComplexity}`);
  console.log(`📊 Maintainability Index: ${metrics.maintainabilityIndex.toFixed(1)}/100`);
  console.log(`🪆 Nesting Depth: ${metrics.nestingDepth}`);
  console.log(`⚛️ Props: ${metrics.numberOfProps}`);
  console.log(`🪝 Hooks: ${metrics.numberOfHooks} (${metrics.numberOfStates} states, ${metrics.numberOfEffects} effects)`);
  console.log(`📘 TypeScript: ${metrics.hasTypeScript ? 'Yes' : 'No'}`);
  console.log(`✅ Tests: ${metrics.hasTests ? 'Yes' : 'No'}`);
  console.log(`📝 Documentation: ${metrics.hasDocumentation ? 'Yes' : 'No'}`);
  
  if (metrics.issues.length > 0) {
    console.group(`\n⚠️ Issues Found (${metrics.issues.length})`);
    
    const critical = metrics.issues.filter(i => i.severity === 'critical');
    const warnings = metrics.issues.filter(i => i.severity === 'warning');
    
    if (critical.length > 0) {
      console.group('🔴 Critical');
      critical.forEach(issue => console.error(`${issue.message}\n  Fix: ${issue.suggestion}`));
      console.groupEnd();
    }
    
    if (warnings.length > 0) {
      console.group('🟡 Warnings');
      warnings.forEach(issue => console.warn(`${issue.message}\n  Fix: ${issue.suggestion}`));
      console.groupEnd();
    }
    
    console.groupEnd();
  }
  
  if (metrics.suggestions.length > 0) {
    console.group('\n💡 Suggestions');
    metrics.suggestions.forEach(suggestion => console.log(suggestion));
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Export metrics as JSON.
 */
export function exportMetrics(metrics: CodeQualityMetrics): string {
  return JSON.stringify(metrics, null, 2);
}

/**
 * Compare two component versions.
 */
export function compareVersions(
  oldMetrics: CodeQualityMetrics,
  newMetrics: CodeQualityMetrics
): {
  improved: boolean;
  changes: {
    grade: { old: string; new: string; improved: boolean };
    complexity: { old: number; new: number; improved: boolean };
    maintainability: { old: number; new: number; improved: boolean };
    linesOfCode: { old: number; new: number; improved: boolean };
  };
  summary: string;
} {
  const gradeValues = { 'A+': 6, 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1 };
  
  const gradeImproved = gradeValues[newMetrics.qualityGrade] > gradeValues[oldMetrics.qualityGrade];
  const complexityImproved = newMetrics.cyclomaticComplexity < oldMetrics.cyclomaticComplexity;
  const maintainabilityImproved = newMetrics.maintainabilityIndex > oldMetrics.maintainabilityIndex;
  const locImproved = newMetrics.linesOfCode < oldMetrics.linesOfCode;
  
  const improvements = [gradeImproved, complexityImproved, maintainabilityImproved, locImproved].filter(Boolean).length;
  const improved = improvements >= 2;
  
  let summary = '';
  if (improved) {
    summary = `✅ Component improved! ${improvements} out of 4 metrics improved.`;
  } else {
    summary = `⚠️ Component may need attention. Only ${improvements} out of 4 metrics improved.`;
  }
  
  return {
    improved,
    changes: {
      grade: {
        old: oldMetrics.qualityGrade,
        new: newMetrics.qualityGrade,
        improved: gradeImproved,
      },
      complexity: {
        old: oldMetrics.cyclomaticComplexity,
        new: newMetrics.cyclomaticComplexity,
        improved: complexityImproved,
      },
      maintainability: {
        old: oldMetrics.maintainabilityIndex,
        new: newMetrics.maintainabilityIndex,
        improved: maintainabilityImproved,
      },
      linesOfCode: {
        old: oldMetrics.linesOfCode,
        new: newMetrics.linesOfCode,
        improved: locImproved,
      },
    },
    summary,
  };
}
