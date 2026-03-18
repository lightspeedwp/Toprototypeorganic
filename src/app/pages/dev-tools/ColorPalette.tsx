/**
 * Color Palette — Developer Tool
 *
 * Interactive viewer for all semantic CSS color variables.
 * Shows swatches with computed hex values, copy-to-clipboard,
 * and light/dark mode comparison.
 *
 * @module ColorPalette
 * @category dev-tools
 */

import { useState, useEffect, useCallback } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import {
  Palette,
  Copy,
  Check,
  SunDim,
  Moon,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Color token definitions                                            */
/* ------------------------------------------------------------------ */

interface ColorToken {
  name: string;
  variable: string;
  description: string;
}

interface ColorGroup {
  title: string;
  description: string;
  tokens: ColorToken[];
}

const COLOR_GROUPS: ColorGroup[] = [
  {
    title: "Base Surfaces",
    description: "Page background and default text colours.",
    tokens: [
      { name: "Background", variable: "--background", description: "Page / app background" },
      { name: "Foreground", variable: "--foreground", description: "Default text colour" },
      { name: "Card", variable: "--card", description: "Card / panel background" },
      { name: "Card Foreground", variable: "--card-foreground", description: "Card text colour" },
      { name: "Popover", variable: "--popover", description: "Popover / tooltip background" },
      { name: "Popover Foreground", variable: "--popover-foreground", description: "Popover text" },
    ],
  },
  {
    title: "Brand Colours",
    description: "Primary, secondary, and accent brand palette.",
    tokens: [
      { name: "Primary", variable: "--primary", description: "Olive green brand primary" },
      { name: "Primary Foreground", variable: "--primary-foreground", description: "Text on primary" },
      { name: "Secondary", variable: "--secondary", description: "Dark warm beige secondary" },
      { name: "Secondary Foreground", variable: "--secondary-foreground", description: "Text on secondary" },
      { name: "Accent", variable: "--accent", description: "Amber / gold accent" },
      { name: "Accent Foreground", variable: "--accent-foreground", description: "Text on accent" },
    ],
  },
  {
    title: "Muted & Borders",
    description: "De-emphasised surfaces, input fields, and border styles.",
    tokens: [
      { name: "Muted", variable: "--muted", description: "Light grey surface" },
      { name: "Muted Foreground", variable: "--muted-foreground", description: "Secondary text" },
      { name: "Border", variable: "--border", description: "Default border colour" },
      { name: "Border Subtle", variable: "--border-subtle", description: "Softer divider" },
      { name: "Input", variable: "--input", description: "Input field background" },
      { name: "Ring", variable: "--ring", description: "Focus ring colour" },
    ],
  },
  {
    title: "Semantic States",
    description: "Success, warning, error, and information states.",
    tokens: [
      { name: "Destructive", variable: "--destructive", description: "Error / danger" },
      { name: "Destructive Foreground", variable: "--destructive-foreground", description: "Text on destructive" },
      { name: "Success", variable: "--success", description: "Success state" },
      { name: "Success Foreground", variable: "--success-foreground", description: "Text on success" },
      { name: "Warning", variable: "--warning", description: "Warning state" },
      { name: "Warning Foreground", variable: "--warning-foreground", description: "Text on warning" },
      { name: "Info", variable: "--info", description: "Informational" },
      { name: "Info Foreground", variable: "--info-foreground", description: "Text on info" },
    ],
  },
  {
    title: "Brand Raw Palette",
    description: "Raw brand colour ramps (green, amber, beige).",
    tokens: [
      { name: "Green 900", variable: "--color-brand-green-900", description: "Deepest green" },
      { name: "Green 700", variable: "--color-brand-green-700", description: "Dark green" },
      { name: "Green 500", variable: "--color-brand-green-500", description: "Base brand green" },
      { name: "Green 300", variable: "--color-brand-green-300", description: "Light green" },
      { name: "Green 100", variable: "--color-brand-green-100", description: "Lightest green" },
      { name: "Amber 900", variable: "--color-brand-amber-900", description: "Deepest amber" },
      { name: "Amber 700", variable: "--color-brand-amber-700", description: "Dark amber" },
      { name: "Amber 500", variable: "--color-brand-amber-500", description: "Base brand amber" },
      { name: "Amber 300", variable: "--color-brand-amber-300", description: "Light amber" },
      { name: "Amber 100", variable: "--color-brand-amber-100", description: "Lightest amber" },
      { name: "Beige 900", variable: "--color-brand-beige-900", description: "Deepest beige" },
      { name: "Beige 700", variable: "--color-brand-beige-700", description: "Dark beige" },
      { name: "Beige 500", variable: "--color-brand-beige-500", description: "Base beige" },
      { name: "Beige 300", variable: "--color-brand-beige-300", description: "Light beige" },
      { name: "Beige 100", variable: "--color-brand-beige-100", description: "Lightest beige" },
    ],
  },
  {
    title: "Chart Colours",
    description: "Data visualisation palette for charts and graphs.",
    tokens: [
      { name: "Chart 1", variable: "--chart-1", description: "Olive green" },
      { name: "Chart 2", variable: "--chart-2", description: "Dark amber" },
      { name: "Chart 3", variable: "--chart-3", description: "Dark beige" },
      { name: "Chart 4", variable: "--chart-4", description: "Very dark brown" },
      { name: "Chart 5", variable: "--chart-5", description: "Dark grey" },
    ],
  },
  {
    title: "Sidebar / Navigation",
    description: "Sidebar navigation colour tokens.",
    tokens: [
      { name: "Sidebar", variable: "--sidebar", description: "Sidebar background" },
      { name: "Sidebar Foreground", variable: "--sidebar-foreground", description: "Sidebar text" },
      { name: "Sidebar Primary", variable: "--sidebar-primary", description: "Sidebar primary accent" },
      { name: "Sidebar Border", variable: "--sidebar-border", description: "Sidebar border" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getComputedColor(variable: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return raw || "N/A";
}

function rgbToHex(color: string): string {
  // If it's already a hex, return as-is
  if (color.startsWith("#")) return color;

  // Try parsing rgb(r, g, b)
  const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    const r = parseInt(match[1]).toString(16).padStart(2, "0");
    const g = parseInt(match[2]).toString(16).padStart(2, "0");
    const b = parseInt(match[3]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`.toUpperCase();
  }
  return color;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ColorPalette() {
  const [copiedVar, setCopiedVar] = useState<string | null>(null);
  const [computedColors, setComputedColors] = useState<Record<string, string>>({});
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const refreshColors = useCallback(() => {
    const colors: Record<string, string> = {};
    COLOR_GROUPS.forEach((group) => {
      group.tokens.forEach((token) => {
        colors[token.variable] = getComputedColor(token.variable);
      });
    });
    setComputedColors(colors);
  }, []);

  useEffect(() => {
    refreshColors();
    // Re-compute when theme changes
    const observer = new MutationObserver(refreshColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, [refreshColors]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVar(text);
    setTimeout(() => setCopiedVar(null), 1500);
  };

  const totalTokens = COLOR_GROUPS.reduce((s, g) => s + g.tokens.length, 0);
  const visibleGroups = selectedGroup ? COLOR_GROUPS.filter((g) => g.title === selectedGroup) : COLOR_GROUPS;

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Color Palette" />

      {/* Hero */}
      <section className="wp-devtool__hero">
        <Container>
          <div className="wp-devtool__hero-inner">
            <div className="wp-devtool__hero-badge">
              <Palette className="w-4 h-4" />
              Color Palette
            </div>
            <h1>Color Palette Viewer</h1>
            <p className="wp-devtool__hero-description">
              Interactive reference of all {totalTokens} semantic colour tokens.
              Computed values update live when switching between light and dark mode.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="wp-devtool__section">
        <Container>
          <div className="wp-devtool__stats">
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">{totalTokens}</span>
              <span className="wp-devtool__stat-label">Colour Tokens</span>
            </div>
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">{COLOR_GROUPS.length}</span>
              <span className="wp-devtool__stat-label">Groups</span>
            </div>
            <div className="wp-devtool__stat-card">
              <div className="flex items-center" style={{ gap: "var(--spacing-element-xs)" }}>
                <SunDim className="w-5 h-5" style={{ color: "var(--accent)" }} />
                <Moon className="w-5 h-5" style={{ color: "var(--primary)" }} />
              </div>
              <span className="wp-devtool__stat-label">Live Mode Aware</span>
            </div>
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">AAA</span>
              <span className="wp-devtool__stat-label">Target Contrast</span>
            </div>
          </div>

          {/* Group filter */}
          <div className="wp-devtool__tab-bar">
            <button
              className={`wp-devtool__tab ${!selectedGroup ? "wp-devtool__tab--active" : ""}`}
              onClick={() => setSelectedGroup(null)}
            >
              All Groups
            </button>
            {COLOR_GROUPS.map((g) => (
              <button
                key={g.title}
                className={`wp-devtool__tab ${selectedGroup === g.title ? "wp-devtool__tab--active" : ""}`}
                onClick={() => setSelectedGroup(selectedGroup === g.title ? null : g.title)}
              >
                {g.title}
              </button>
            ))}
          </div>

          {/* Colour groups */}
          <div className="flex flex-col" style={{ gap: "var(--spacing-gap-lg)" }}>
            {visibleGroups.map((group) => (
              <div key={group.title}>
                <div className="wp-devtool__section-header">
                  <h2>{group.title}</h2>
                  <p style={{ color: "var(--muted-foreground)" }}>{group.description}</p>
                </div>

                <div className="wp-devtool__color-grid">
                  {group.tokens.map((token) => {
                    const computed = computedColors[token.variable] || "";
                    const hex = rgbToHex(computed);
                    const isCopied = copiedVar === `var(${token.variable})`;

                    return (
                      <div
                        key={token.variable}
                        className="wp-devtool__color-card"
                        onClick={() => copyToClipboard(`var(${token.variable})`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && copyToClipboard(`var(${token.variable})`)}
                        aria-label={`Copy ${token.variable}`}
                      >
                        <div
                          className="wp-devtool__color-swatch"
                          style={{ backgroundColor: `var(${token.variable})` }}
                        />
                        <div className="wp-devtool__color-info">
                          <span className="wp-devtool__color-name">{token.name}</span>
                          <span className="wp-devtool__color-var">{token.variable}</span>
                          <div className="flex items-center justify-between">
                            <span className="wp-devtool__color-hex">{hex}</span>
                            <button
                              className={`wp-devtool__copy-btn ${isCopied ? "wp-devtool__copy-btn--copied" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(`var(${token.variable})`);
                              }}
                              aria-label={`Copy ${token.variable}`}
                            >
                              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {isCopied ? "Copied" : "Copy"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
