/**
 * Grid Overlay — Developer Tool
 *
 * Toggle-able grid overlay for visual debugging. Shows column grids,
 * baseline rhythm, container boundaries, and spacing token references.
 * Helps verify layout alignment against the design system grid.
 *
 * @module GridOverlay
 * @category dev-tools
 */

import { useState } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import {
  GridFour,
  Rows,
  Columns,
  ArrowsOutSimple,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Toggle Switch component                                            */
/* ------------------------------------------------------------------ */

function ToggleSwitch({
  label,
  icon,
  active,
  onToggle,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={`wp-devtool__grid-toggle ${active ? "wp-devtool__grid-toggle--active" : ""}`}
      onClick={onToggle}
      role="switch"
      aria-checked={active}
      aria-label={`Toggle ${label}`}
    >
      {icon}
      <span style={{ flex: 1, fontFamily: "var(--font-family-noto-sans)", fontSize: "var(--text-sm)" }}>{label}</span>
      <div className={`wp-devtool__grid-switch ${active ? "wp-devtool__grid-switch--on" : ""}`}>
        <div className="wp-devtool__grid-switch-thumb" />
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Spacing token reference                                            */
/* ------------------------------------------------------------------ */

interface SpacingRef {
  variable: string;
  label: string;
  category: string;
}

const SPACING_REFS: SpacingRef[] = [
  { variable: "--spacing-section-sm", label: "Section SM", category: "Section" },
  { variable: "--spacing-section-md", label: "Section MD", category: "Section" },
  { variable: "--spacing-section-lg", label: "Section LG", category: "Section" },
  { variable: "--spacing-container-sm", label: "Container SM", category: "Container" },
  { variable: "--spacing-container-md", label: "Container MD", category: "Container" },
  { variable: "--spacing-container-lg", label: "Container LG", category: "Container" },
  { variable: "--spacing-element-xs", label: "Element XS", category: "Element" },
  { variable: "--spacing-element-sm", label: "Element SM", category: "Element" },
  { variable: "--spacing-element-md", label: "Element MD", category: "Element" },
  { variable: "--spacing-element-lg", label: "Element LG", category: "Element" },
  { variable: "--spacing-gap-xs", label: "Gap XS", category: "Gap" },
  { variable: "--spacing-gap-sm", label: "Gap SM", category: "Gap" },
  { variable: "--spacing-gap-md", label: "Gap MD", category: "Gap" },
  { variable: "--spacing-gap-lg", label: "Gap LG", category: "Gap" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GridOverlay() {
  const [showColumns, setShowColumns] = useState(true);
  const [showBaseline, setShowBaseline] = useState(false);
  const [showContainer, setShowContainer] = useState(true);
  const [columnCount, setColumnCount] = useState(12);

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Grid Overlay" />

      {/* Hero */}
      <section className="wp-devtool__hero">
        <Container>
          <div className="wp-devtool__hero-inner">
            <div className="wp-devtool__hero-badge">
              <GridFour className="w-4 h-4" />
              Grid Overlay
            </div>
            <h1>Grid &amp; Layout Debugger</h1>
            <p className="wp-devtool__hero-description">
              Toggle column grids, baseline rhythm, and container boundaries to verify
              layout alignment against the design system.
            </p>
          </div>
        </Container>
      </section>

      {/* Controls */}
      <section className="wp-devtool__section">
        <Container>
          <div className="wp-devtool__section-header">
            <h2>Overlay Controls</h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Toggle individual overlay layers on the demo area below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--spacing-gap-sm)", paddingBottom: "var(--spacing-element-lg)" }}>
            <ToggleSwitch
              label="Column Grid"
              icon={<Columns className="w-4 h-4" />}
              active={showColumns}
              onToggle={() => setShowColumns(!showColumns)}
            />
            <ToggleSwitch
              label="Baseline Rhythm"
              icon={<Rows className="w-4 h-4" />}
              active={showBaseline}
              onToggle={() => setShowBaseline(!showBaseline)}
            />
            <ToggleSwitch
              label="Container Bounds"
              icon={<ArrowsOutSimple className="w-4 h-4" />}
              active={showContainer}
              onToggle={() => setShowContainer(!showContainer)}
            />
          </div>

          {/* Column count selector */}
          <div className="wp-devtool__tab-bar">
            <span style={{ fontFamily: "var(--font-family-noto-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", paddingRight: "var(--spacing-element-xs)" }}>
              Columns:
            </span>
            {[4, 6, 8, 12, 16].map((n) => (
              <button
                key={n}
                className={`wp-devtool__tab ${columnCount === n ? "wp-devtool__tab--active" : ""}`}
                onClick={() => setColumnCount(n)}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Demo area */}
          <div className="wp-devtool__grid-demo">
            {/* Overlays */}
            <div className="wp-devtool__grid-demo-overlay">
              {showColumns && (
                <div
                  className="wp-devtool__grid-demo-columns"
                  style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
                >
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <div key={i} className="wp-devtool__grid-demo-col" />
                  ))}
                </div>
              )}
              {showBaseline && <div className="wp-devtool__grid-demo-baseline" />}
              {showContainer && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderLeft: "2px dashed rgba(var(--accent-rgb), 0.3)",
                    borderRight: "2px dashed rgba(var(--accent-rgb), 0.3)",
                    marginInline: "var(--spacing-container-md)",
                  }}
                />
              )}
            </div>

            {/* Sample content */}
            <div className="wp-devtool__grid-demo-content">
              <div
                style={{
                  padding: "var(--spacing-element-md)",
                  background: "rgba(var(--primary-rgb), 0.06)",
                  borderRadius: "var(--radius-lg)",
                  border: "var(--border-width) solid var(--border)",
                }}
              >
                <h3>Sample Hero Section</h3>
                <p style={{ color: "var(--muted-foreground)" }}>
                  This is a demo content area. Enable the grid overlays above to see how elements align
                  to the column grid and baseline rhythm.
                </p>
              </div>

              <div className="grid grid-cols-3" style={{ gap: "var(--spacing-gap-md)" }}>
                {["Card One", "Card Two", "Card Three"].map((label) => (
                  <div
                    key={label}
                    style={{
                      padding: "var(--spacing-element-md)",
                      background: "var(--muted)",
                      borderRadius: "var(--radius-lg)",
                      border: "var(--border-width) solid var(--border)",
                    }}
                  >
                    <h5>{label}</h5>
                    <p style={{ color: "var(--muted-foreground)", fontSize: "var(--text-sm)" }}>
                      Sample card content to verify grid alignment.
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2" style={{ gap: "var(--spacing-gap-md)" }}>
                {["Left Column", "Right Column"].map((label) => (
                  <div
                    key={label}
                    style={{
                      padding: "var(--spacing-element-lg)",
                      background: "rgba(var(--accent-rgb), 0.04)",
                      borderRadius: "var(--radius-lg)",
                      border: "var(--border-width) solid var(--border)",
                    }}
                  >
                    <h4>{label}</h4>
                    <p style={{ color: "var(--muted-foreground)", fontSize: "var(--text-sm)" }}>
                      Two-column layout section for verifying responsive grid behaviour.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Spacing token reference */}
      <section className="wp-devtool__section wp-devtool__section--alt">
        <Container>
          <div className="wp-devtool__section-header">
            <h2>Spacing Token Reference</h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Live-computed values of all spacing tokens at the current viewport width.
            </p>
          </div>

          <table className="wp-devtool__preview-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Token</th>
                <th>CSS Variable</th>
                <th>Visual</th>
              </tr>
            </thead>
            <tbody>
              {SPACING_REFS.map((ref) => (
                <tr key={ref.variable}>
                  <td style={{ fontFamily: "var(--font-family-noto-sans)", fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>
                    {ref.category}
                  </td>
                  <td style={{ fontFamily: "var(--font-family-noto-sans)", fontSize: "var(--text-sm)" }}>
                    {ref.label}
                  </td>
                  <td style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-xs)", color: "var(--primary)" }}>
                    {ref.variable}
                  </td>
                  <td>
                    <div
                      style={{
                        height: "0.75rem",
                        width: `var(${ref.variable})`,
                        backgroundColor: "rgba(var(--primary-rgb), 0.2)",
                        borderRadius: "var(--radius-sm)",
                        border: "var(--border-width) solid rgba(var(--primary-rgb), 0.3)",
                        maxWidth: "100%",
                      }}
                      aria-label={`Visual representation of ${ref.variable}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </section>

      {/* Legend */}
      <section className="wp-devtool__section">
        <Container>
          <div className="wp-devtool__section-header">
            <h2>Overlay Legend</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--spacing-gap-sm)" }}>
            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon" style={{ backgroundColor: "rgba(var(--primary-rgb), 0.06)" }}>
                <Columns className="w-5 h-5" />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value" style={{ fontSize: "var(--text-sm)" }}>Column Grid</span>
                <span className="wp-devtool__viewport-label">Green dashed lines showing column boundaries</span>
              </div>
            </div>

            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon" style={{ backgroundColor: "rgba(var(--accent-rgb), 0.1)" }}>
                <Rows className="w-5 h-5" style={{ color: "var(--accent)" }} />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value" style={{ fontSize: "var(--text-sm)" }}>Baseline</span>
                <span className="wp-devtool__viewport-label">Horizontal lines at 1.5rem intervals (24px base)</span>
              </div>
            </div>

            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon" style={{ backgroundColor: "rgba(var(--accent-rgb), 0.1)" }}>
                <ArrowsOutSimple className="w-5 h-5" style={{ color: "var(--accent)" }} />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value" style={{ fontSize: "var(--text-sm)" }}>Container</span>
                <span className="wp-devtool__viewport-label">Amber dashed borders showing container padding</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
