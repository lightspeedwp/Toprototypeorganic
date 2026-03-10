/**
 * Visual Regression Tester Page
 * 
 * Interactive tool for creating and comparing component snapshots.
 * Detects visual changes to prevent unintended style regressions.
 * 
 * @module VisualRegressionTester
 * @category dev-tools
 */

import { useState, useRef } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import {
  createSnapshot,
  compareSnapshots,
  saveSnapshot,
  loadSnapshot,
  getAllSnapshots,
  clearAllSnapshots,
  type ComponentSnapshot,
  type SnapshotComparison,
} from "../../utils/visualRegressionTester";
import { Camera, GitDiff as GitCompare, Trash as Trash2, DownloadSimple as Download, CheckCircle as CircleCheck, Warning as AlertTriangle } from "@phosphor-icons/react";

export default function VisualRegressionTester() {
  const [snapshots, setSnapshots] = useState<ComponentSnapshot[]>(getAllSnapshots());
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [componentName, setComponentName] = useState('');
  const [comparison, setComparison] = useState<SnapshotComparison | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCapture = () => {
    if (!componentName) {
      alert('Please enter a component name');
      return;
    }

    setIsCapturing(true);

    setTimeout(() => {
      const element = previewRef.current;
      if (!element) {
        alert('No element to capture');
        setIsCapturing(false);
        return;
      }

      const snapshot = createSnapshot(element, componentName);
      saveSnapshot(snapshot);
      setSnapshots(getAllSnapshots());
      setIsCapturing(false);
      alert(`Snapshot created for ${componentName}`);
    }, 100);
  };

  const handleCompare = (snapshotName: string) => {
    const oldSnapshot = loadSnapshot(snapshotName);
    if (!oldSnapshot) {
      alert('Snapshot not found');
      return;
    }

    const element = previewRef.current;
    if (!element) {
      alert('No element to compare');
      return;
    }

    const newSnapshot = createSnapshot(element, snapshotName);
    const result = compareSnapshots(oldSnapshot, newSnapshot);
    setComparison(result);
  };

  const handleClearAll = () => {
    if (confirm('Clear all snapshots? This cannot be undone.')) {
      clearAllSnapshots();
      setSnapshots([]);
      setComparison(null);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'major':
        return 'text-destructive';
      case 'moderate':
        return 'text-muted-foreground';
      case 'minor':
        return 'text-primary';
      default:
        return 'text-foreground';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'major':
        return 'bg-destructive/10 border-destructive/20';
      case 'moderate':
        return 'bg-muted border-border';
      case 'minor':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Visual Regression Tester" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Camera className="w-8 h-8 text-primary" />
                <h1>Visual Regression Tester</h1>
              </div>
              <p className="text-muted-foreground">
                Capture component snapshots and detect visual changes
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCapture}
                disabled={isCapturing}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
                {isCapturing ? 'Capturing...' : 'Capture Snapshot'}
              </button>

              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Capture Section */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="mb-4">Capture Snapshot</h2>

              <div className="mb-4">
                <label htmlFor="componentName" className="block text-sm mb-2">
                  Component Name
                </label>
                <input
                  id="componentName"
                  type="text"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="e.g., Button, Card, Hero"
                />
              </div>

              <div className="bg-muted p-6 rounded-lg border border-border min-h-[200px]" ref={previewRef}>
                <h3 className="mb-4">Preview Component</h3>
                <p className="text-muted-foreground mb-4">
                  This is a sample component that will be captured.
                </p>
                
                {/* Sample component for demonstration */}
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4>Sample Card</h4>
                  <p className="text-muted-foreground mt-2">
                    This card demonstrates the visual regression testing capabilities.
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                    Sample Button
                  </button>
                </div>
              </div>

              <div className="mt-4 p-3 bg-accent text-accent-foreground rounded text-sm">
                <strong>How it works:</strong> Snapshots capture all styles, layout, colors, 
                and typography of a component. Compare snapshots to detect unintended visual changes.
              </div>
            </div>

            {/* Saved Snapshots */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="mb-4">Saved Snapshots ({snapshots.length})</h2>

              {snapshots.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Camera className="w-8 h-8 mx-auto mb-2" />
                  <p>No snapshots yet</p>
                  <p className="text-sm">Create your first snapshot to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {snapshots.map((snapshot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border hover:border-primary/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium">{snapshot.componentName}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(snapshot.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => handleCompare(snapshot.componentName)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
                      >
                        <GitCompare className="w-4 h-4" />
                        Compare
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Comparison Results */}
          <div>
            {comparison ? (
              <div className="space-y-6">
                {/* Summary */}
                <div className={`p-6 rounded-lg border ${getSeverityBg(comparison.severity)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="mb-1">{comparison.componentName}</h2>
                      <p className={`text-sm ${getSeverityColor(comparison.severity)}`}>
                        {comparison.summary}
                      </p>
                    </div>
                    {comparison.hasChanges ? (
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    ) : (
                      <CircleCheck className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Changes</div>
                      <div className="font-serif text-fluid-2xl">{comparison.changeCount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Severity</div>
                      <div className={`font-serif text-fluid-2xl capitalize ${getSeverityColor(comparison.severity)}`}>
                        {comparison.severity}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Status</div>
                      <div className={`font-serif text-fluid-2xl ${comparison.hasChanges ? 'text-destructive' : 'text-primary'}`}>
                        {comparison.hasChanges ? 'Changed' : 'OK'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Changes Detail */}
                {comparison.changes.length > 0 && (
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="mb-4">Detected Changes ({comparison.changes.length})</h3>

                    <div className="space-y-4">
                      {comparison.changes.map((change, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-muted border border-border"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium capitalize">{change.category}</div>
                              <div className="text-sm text-muted-foreground">{change.property}</div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${
                              change.severity === 'major' ? 'wp-bg-destructive-light' :
                              change.severity === 'moderate' ? 'bg-muted text-foreground' :
                              'wp-badge-primary-sm'
                            }`}>
                              {change.severity}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Old Value</div>
                              <code className="text-xs bg-background px-2 py-1 rounded">
                                {String(change.oldValue)}
                              </code>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">New Value</div>
                              <code className="text-xs bg-background px-2 py-1 rounded">
                                {String(change.newValue)}
                              </code>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            <strong>Impact:</strong> {change.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-muted p-12 rounded-lg text-center h-full flex flex-col items-center justify-center">
                <GitCompare className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="mb-2">No Comparison Yet</h3>
                <p className="text-muted-foreground">
                  Create a snapshot, then click "Compare" to detect visual changes.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg mt-8">
          <h3 className="mb-4">About Visual Regression Testing</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">What Gets Captured</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Computed styles (colors, fonts, spacing)</li>
                <li>Layout metrics (width, height, position)</li>
                <li>Color palette (all colors used)</li>
                <li>Typography (fonts, sizes, weights)</li>
                <li>Accessibility attributes</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Change Detection</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Style changes (colors, fonts, borders)</li>
                <li>Layout shifts (size, position)</li>
                <li>Color variations</li>
                <li>Typography changes</li>
                <li>Accessibility regressions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Severity Levels</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Major:</strong> Significant visual changes</li>
                <li><strong>Moderate:</strong> Noticeable changes</li>
                <li><strong>Minor:</strong> Small variations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Capture snapshots after each major change</li>
                <li>Compare before deploying to production</li>
                <li>Review all detected changes carefully</li>
                <li>Update snapshots when intentional</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}