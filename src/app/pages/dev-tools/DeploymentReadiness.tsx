/**
 * Deployment Readiness Dashboard
 * 
 * Comprehensive pre-deployment validation interface.
 * Checks all critical aspects before production deployment.
 * 
 * @module DeploymentReadiness
 * @category dev-tools
 */

import { useState } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { runDeploymentReadinessCheck, logDeploymentReadinessReport, generateDeploymentChecklist, type DeploymentReadinessReport } from "../../utils/deploymentReadinessChecker";
import { analyzeSEO, logSEOAnalysis, type SEOAnalysisReport } from "../../utils/seoAnalyzer";
import { Rocket, CheckCircle as CircleCheck, XCircle as CircleX, Warning as AlertTriangle, DownloadSimple as Download } from "@phosphor-icons/react";

export default function DeploymentReadiness() {
  const [report, setReport] = useState<DeploymentReadinessReport | null>(null);
  const [seoReport, setSeoReport] = useState<SEOAnalysisReport | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const runChecks = () => {
    setIsChecking(true);

    setTimeout(() => {
      const deploymentReport = runDeploymentReadinessCheck();
      const seo = analyzeSEO();
      
      setReport(deploymentReport);
      setSeoReport(seo);
      
      logDeploymentReadinessReport(deploymentReport);
      logSEOAnalysis(seo);
      
      setIsChecking(false);
    }, 1000);
  };

  const downloadChecklist = () => {
    if (!report) return;
    
    const checklist = generateDeploymentChecklist(report);
    const blob = new Blob([checklist], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deployment-checklist.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    if (status === 'ready') return 'text-primary';
    if (status === 'needs-attention') return 'text-muted-foreground';
    return 'text-destructive';
  };

  const getStatusBg = (status: string) => {
    if (status === 'ready') return 'bg-primary/10 border-primary/20';
    if (status === 'needs-attention') return 'bg-muted border-border';
    return 'bg-destructive/10 border-destructive/20';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'ready') return <CircleCheck className="w-6 h-6 text-primary" />;
    if (status === 'needs-attention') return <AlertTriangle className="w-6 h-6 text-muted-foreground" />;
    return <CircleX className="w-6 h-6 text-destructive" />;
  };

  const getCategoryIcon = (score: number) => {
    if (score >= 90) return <CircleCheck className="w-5 h-5 text-primary" />;
    if (score >= 70) return <AlertTriangle className="w-5 h-5 text-muted-foreground" />;
    return <CircleX className="w-5 h-5 text-destructive" />;
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Deployment Readiness" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="w-8 h-8 text-primary" />
                <h1>Deployment Readiness</h1>
              </div>
              <p className="text-muted-foreground">
                Comprehensive pre-deployment validation and checklist
              </p>
            </div>

            <button
              onClick={runChecks}
              disabled={isChecking}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isChecking ? 'Checking...' : 'Run Deployment Check'}
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        {report && seoReport ? (
          <div className="space-y-8">
            {/* Overall Status */}
            <div className={`p-8 rounded-lg border ${getStatusBg(report.deploymentStatus)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(report.deploymentStatus)}
                  <div>
                    <h2 className="mb-1">
                      {report.deploymentStatus === 'ready' ? 'Ready to Deploy' :
                       report.deploymentStatus === 'needs-attention' ? 'Needs Attention' :
                       'Not Ready to Deploy'}
                    </h2>
                    <p className={`text-sm ${getStatusColor(report.deploymentStatus)}`}>
                      Overall Score: {report.overallScore}/100
                    </p>
                  </div>
                </div>

                <button
                  onClick={downloadChecklist}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Checklist
                </button>
              </div>
            </div>

            {/* Category Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(report.categories).map(([name, category]) => (
                <div key={name} className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="capitalize">{name.replace(/([A-Z])/g, ' $1').trim()}</h3>
                    {getCategoryIcon(category.score)}
                  </div>

                  <div className="font-serif text-fluid-3xl mb-2">{category.score}/100</div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{category.passed} passed</span>
                    <span>{category.failed} failed</span>
                    <span>{category.warnings} warnings</span>
                  </div>
                </div>
              ))}
            </div>

            {/* SEO Score */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2>SEO Analysis</h2>
                <span className={`font-serif text-fluid-3xl ${
                  seoReport.grade === 'A+' || seoReport.grade === 'A' ? 'text-primary' :
                  seoReport.grade === 'B' ? 'text-muted-foreground' :
                  'text-destructive'
                }`}>
                  {seoReport.grade}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {Object.entries(seoReport.categories).map(([name, category]) => (
                  <div key={name} className="text-center">
                    <div className="font-serif text-fluid-2xl mb-1">{category.score}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {name.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Keyword Analysis */}
              <div className="bg-muted p-4 rounded">
                <h4 className="font-medium mb-2">Keyword Analysis</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Primary:</span>
                    <span className="ml-2 font-semibold">
                      {seoReport.keywordAnalysis.primaryKeyword || 'Not detected'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Density:</span>
                    <span className="ml-2 font-semibold">
                      {seoReport.keywordAnalysis.keywordDensity.toFixed(2)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Word Count:</span>
                    <span className="ml-2 font-semibold">
                      {seoReport.competitiveness.wordCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockers */}
            {report.blockers.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <CircleX className="w-5 h-5 text-destructive" />
                  <h3 className="text-destructive">Deployment Blockers ({report.blockers.length})</h3>
                </div>

                <ul className="space-y-2">
                  {report.blockers.map((blocker, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>{blocker}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {report.warnings.length > 0 && (
              <div className="bg-muted p-6 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  <h3>Warnings ({report.warnings.length})</h3>
                </div>

                <ul className="space-y-2 text-sm">
                  {report.warnings.slice(0, 10).map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                  {report.warnings.length > 10 && (
                    <li className="text-muted-foreground italic">
                      ...and {report.warnings.length - 10} more
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {report.recommendations.length > 0 && (
              <div className="bg-accent text-accent-foreground p-6 rounded-lg">
                <h3 className="mb-4">💡 Recommendations</h3>

                <ul className="space-y-2">
                  {report.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SEO Opportunities */}
            {seoReport.opportunities.length > 0 && (
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="mb-4">🚀 SEO Opportunities</h3>

                <div className="space-y-4">
                  {seoReport.opportunities.map((opp, idx) => (
                    <div key={idx} className="bg-muted p-4 rounded">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{opp.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          opp.potentialImpact === 'high' ? 'bg-primary/20 text-primary' :
                          opp.potentialImpact === 'medium' ? 'bg-muted-foreground/20 text-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {opp.potentialImpact} impact
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{opp.description}</p>
                      <p className="text-sm">
                        <strong>Implementation:</strong> {opp.implementation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-muted p-12 rounded-lg text-center">
            <Rocket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="mb-2">Ready to Check Deployment Readiness</h3>
            <p className="text-muted-foreground mb-6">
              Click "Run Deployment Check" to validate all aspects of your application before deployment.
            </p>
            <p className="text-sm text-muted-foreground">
              This will check: code quality, performance, accessibility, security, SEO, and testing status.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg mt-8">
          <h3 className="mb-4">About Deployment Readiness</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">What Gets Checked</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Code quality (no debug statements)</li>
                <li>Performance (bundle size, DOM nodes)</li>
                <li>Accessibility (WCAG compliance)</li>
                <li>Security (HTTPS, secure headers)</li>
                <li>SEO (meta tags, structured data)</li>
                <li>Testing (unit, integration, visual)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Status Levels</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Ready:</strong> All checks passed, safe to deploy</li>
                <li><strong>Needs Attention:</strong> Some warnings, review before deploy</li>
                <li><strong>Not Ready:</strong> Critical blockers, must fix before deploy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Run checks before every deployment</li>
                <li>Fix all critical blockers</li>
                <li>Review and address warnings</li>
                <li>Download checklist for team review</li>
                <li>Maintain 90+ score for production</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">SEO Checklist</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Title 50-60 characters</li>
                <li>Description 150-160 characters</li>
                <li>H1 on every page (only one)</li>
                <li>Alt text on all images</li>
                <li>Open Graph tags for social</li>
                <li>Structured data (JSON-LD)</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}