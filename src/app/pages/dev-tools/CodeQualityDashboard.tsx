/**
 * Code Quality Dashboard
 * 
 * Interactive dashboard for analyzing component code quality.
 * Shows complexity metrics, maintainability scores, and improvement suggestions.
 * 
 * @module CodeQualityDashboard
 * @category dev-tools
 */

import { useState } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { analyzeComponentQuality, type CodeQualityMetrics, type CodeQualityIssue } from "../../utils/codeQualityAnalyzer";
import { Code as Code2, TrendUp as TrendingUp, WarningCircle as AlertCircle, CheckCircle as CircleCheck, Info, XCircle as CircleX } from "@phosphor-icons/react";

// Sample component code for demo
const SAMPLE_CODE = `import { cn } from "../../lib/utils";

interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional CSS class */
  className?: string;
  /** Make card interactive */
  interactive?: boolean;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Card component for content containers.
 * 
 * @component
 * @category common
 */
export function Card({ 
  children, 
  className, 
  interactive = false,
  onClick 
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm",
        interactive && "cursor-pointer hover:shadow-md transition-shadow",
        className
      )}
      onClick={interactive ? onClick : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
    >
      {children}
    </div>
  );
}`;

export default function CodeQualityDashboard() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [metrics, setMetrics] = useState<CodeQualityMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result = analyzeComponentQuality('Card', code);
      setMetrics(result);
      setIsAnalyzing(false);
    }, 500);
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'text-primary';
    if (grade === 'B') return 'text-muted-foreground';
    return 'text-destructive';
  };

  const getGradeBg = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'bg-primary/10 border-primary/20';
    if (grade === 'B') return 'bg-muted border-border';
    return 'bg-destructive/10 border-destructive/20';
  };

  const getSeverityIcon = (severity: CodeQualityIssue['severity']) => {
    switch (severity) {
      case 'critical':
        return <CircleX className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'info':
        return <Info className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getComplexityRating = (complexity: number) => {
    if (complexity <= 5) return { text: 'Low', color: 'text-primary' };
    if (complexity <= 10) return { text: 'Moderate', color: 'text-muted-foreground' };
    if (complexity <= 20) return { text: 'High', color: 'text-destructive' };
    return { text: 'Very High', color: 'text-destructive' };
  };

  const getMaintainabilityRating = (index: number) => {
    if (index >= 80) return { text: 'Excellent', color: 'text-primary' };
    if (index >= 65) return { text: 'Good', color: 'text-muted-foreground' };
    if (index >= 50) return { text: 'Fair', color: 'text-destructive' };
    return { text: 'Poor', color: 'text-destructive' };
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Code Quality Dashboard" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-fluid-sm">
            <div className="flex flex-col gap-element-sm">
              <div className="wp-page-header__icon-container w-14 h-14 flex items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                <Code2 className="w-7 h-7" />
              </div>
              <h1>Code Quality Dashboard</h1>
              <p className="text-muted-foreground">
                Analyze component complexity, maintainability, and code quality metrics
              </p>
            </div>

            <button
              onClick={analyzeCode}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 w-full md:w-auto md:shrink-0"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Input */}
          <div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="pb-4">Component Code</h2>
              <p className="text-sm text-muted-foreground pb-4">
                Paste your React component code below to analyze its quality.
              </p>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Paste component code here..."
              />

              <div className="pt-4 p-3 bg-accent text-accent-foreground rounded text-sm">
                <strong>Tip:</strong> For best results, paste a complete component including imports, 
                TypeScript interfaces, and JSDoc comments.
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            {metrics ? (
              <div className="flex flex-col gap-6">
                {/* Overall Grade */}
                <div className={`p-8 rounded-lg border ${getGradeBg(metrics.qualityGrade)}`}>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground pb-2">Quality Grade</div>
                    <div className={`font-serif text-fluid-6xl ${getGradeColor(metrics.qualityGrade)}`}>
                      {metrics.qualityGrade}
                    </div>
                    <div className="text-sm text-muted-foreground pt-2">
                      {metrics.componentName}
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground pb-1">Lines of Code</div>
                    <div className="font-serif text-fluid-2xl">{metrics.linesOfCode}</div>
                  </div>

                  <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground pb-1">Complexity</div>
                    <div className={`font-serif text-fluid-2xl ${getComplexityRating(metrics.cyclomaticComplexity).color}`}>
                      {metrics.cyclomaticComplexity}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getComplexityRating(metrics.cyclomaticComplexity).text}
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground pb-1">Maintainability</div>
                    <div className={`font-serif text-fluid-2xl ${getMaintainabilityRating(metrics.maintainabilityIndex).color}`}>
                      {metrics.maintainabilityIndex.toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getMaintainabilityRating(metrics.maintainabilityIndex).text}
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground pb-1">Nesting</div>
                    <div className="font-serif text-fluid-2xl">{metrics.nestingDepth}</div>
                    <div className="text-xs text-muted-foreground">levels deep</div>
                  </div>
                </div>

                {/* Component Details */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="pb-4">Component Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Props:</span>
                      <span className="pl-2 font-semibold">{metrics.numberOfProps}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hooks:</span>
                      <span className="pl-2 font-semibold">{metrics.numberOfHooks}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">States:</span>
                      <span className="pl-2 font-semibold">{metrics.numberOfStates}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Effects:</span>
                      <span className="pl-2 font-semibold">{metrics.numberOfEffects}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">TypeScript:</span>
                      <span className="pl-2">
                        {metrics.hasTypeScript ? (
                          <span className="text-primary">✅ Yes</span>
                        ) : (
                          <span className="text-destructive">❌ No</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Issues */}
                {metrics.issues.length > 0 && (
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="pb-4">
                      Issues Found ({metrics.issues.length})
                    </h3>

                    <div className="flex flex-col gap-3">
                      {metrics.issues.map((issue, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-muted border border-border"
                        >
                          <div className="flex items-start gap-3">
                            {getSeverityIcon(issue.severity)}
                            <div className="flex-1">
                              <div className="font-medium pb-1">{issue.message}</div>
                              <div className="text-sm text-muted-foreground pb-2">
                                Category: {issue.category}
                              </div>
                              <div className="text-sm bg-primary/10 text-primary p-2 rounded">
                                <strong>Fix:</strong> {issue.suggestion}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {metrics.suggestions.length > 0 && (
                  <div className="bg-accent text-accent-foreground p-6 rounded-lg">
                    <h3 className="pb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Improvement Suggestions
                    </h3>

                    <ul className="flex flex-col gap-2 text-sm">
                      {metrics.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-muted p-12 rounded-lg text-center h-full flex flex-col items-center justify-center">
                <Code2 className="w-12 h-12 text-muted-foreground pb-4" />
                <h3 className="pb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground pb-6">
                  Paste your component code on the left and click "Analyze Code" to get detailed quality metrics.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg pt-8">
          <h3 className="pb-4">About Code Quality Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium pb-2">Cyclomatic Complexity</h4>
              <p className="pb-2">
                Measures the number of linearly independent paths through code.
              </p>
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>1-5: Low (simple)</li>
                <li>6-10: Moderate</li>
                <li>11-20: High (complex)</li>
                <li>21+: Very high (refactor recommended)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium pb-2">Maintainability Index</h4>
              <p className="pb-2">
                Indicates how easy code is to maintain (0-100 scale).
              </p>
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>80-100: Excellent maintainability</li>
                <li>65-79: Good maintainability</li>
                <li>50-64: Fair (needs attention)</li>
                <li>0-49: Poor (refactor required)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium pb-2">Best Practices</h4>
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>Keep components under 200 lines</li>
                <li>Limit props to 6-8 maximum</li>
                <li>Extract complex logic into hooks</li>
                <li>Use TypeScript for type safety</li>
                <li>Keep nesting depth under 4 levels</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium pb-2">Quality Grades</h4>
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>A+/A: Excellent code quality</li>
                <li>B: Good, minor improvements possible</li>
                <li>C: Acceptable, needs attention</li>
                <li>D: Poor, refactoring recommended</li>
                <li>F: Critical, immediate refactor required</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}