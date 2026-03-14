/**
 * Shadow & Glow Scale — Developer Tool
 *
 * Visualises every elevation / shadow token defined in theme-light.css.
 * Shows each shadow applied to identical cards so developers can compare
 * the full elevation hierarchy at a glance.
 *
 * @module ShadowScale
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { Stack } from "@phosphor-icons/react";

interface ShadowToken {
  variable: string;
  label: string;
  description: string;
  value: string;
}

const SHADOW_TOKENS: ShadowToken[] = [
  {
    variable: "--elevation-sm",
    label: "Small",
    description: "Subtle lift for cards and inputs",
    value: "0px 1px 2px 0px rgba(0,0,0,0.05)",
  },
  {
    variable: "--elevation-md",
    label: "Medium",
    description: "Standard card elevation",
    value: "0px 4px 6px -1px rgba(0,0,0,0.1)",
  },
  {
    variable: "--elevation-lg",
    label: "Large",
    description: "Popovers and dropdowns",
    value: "0px 10px 15px -3px rgba(0,0,0,0.1)",
  },
  {
    variable: "--elevation-xl",
    label: "Extra Large",
    description: "Modals and dialogs",
    value: "0px 20px 25px -5px rgba(0,0,0,0.1)",
  },
];

export default function ShadowScale() {
  return (
    <>
      <DevToolsBreadcrumbs currentPage="Shadow & Glow Scale" />

      <section className="py-section-sm bg-muted border-b border-border">
        <Container>
          <div className="flex flex-col gap-element-sm">
            <div className="wp-page-header__icon-container w-14 h-14 flex items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary transition-colors hover:bg-primary/20">
              <Stack className="w-7 h-7" />
            </div>
            <h1>Shadow &amp; Glow Scale</h1>
            <p className="text-muted-foreground max-w-3xl">
              The elevation system uses four levels defined as CSS custom properties.
              Each shadow is shown on an identical card for visual comparison.
              Dark mode shadows are automatically adjusted via <code>theme-dark.css</code>.
            </p>
          </div>
        </Container>
      </section>

      {/* Shadow cards */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="pb-8">Elevation Tokens</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SHADOW_TOKENS.map((t) => (
              <div
                key={t.variable}
                className="bg-card border border-border rounded-lg p-6 transition-shadow"
                style={{ boxShadow: `var(${t.variable})` }}
              >
                <span className="inline-block px-2 py-0.5 rounded-sm bg-primary/10 text-primary text-xs pb-3">{t.label}</span>
                <h4 className="pb-2">{t.label} Elevation</h4>
                <p className="text-sm text-muted-foreground pb-4">{t.description}</p>
                <code className="text-xs text-muted-foreground block break-all">{t.variable}</code>
                <p className="text-xs text-muted-foreground pt-1 mb-0 break-all">{t.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive comparison */}
      <section className="py-section-sm bg-muted">
        <Container>
          <h2 className="pb-8">Side-by-Side Comparison</h2>
          <p className="text-muted-foreground pb-8">Hover each card to see the next elevation level applied on hover.</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SHADOW_TOKENS.map((t, idx) => {
              const hoverShadow = SHADOW_TOKENS[Math.min(idx + 1, SHADOW_TOKENS.length - 1)];
              return (
                <div
                  key={t.variable}
                  className="group bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary/50 cursor-pointer"
                  style={{ boxShadow: `var(${t.variable})` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `var(${hoverShadow.variable})`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `var(${t.variable})`;
                  }}
                >
                  <p className="text-sm pb-1">Rest: <code className="text-xs">{t.label}</code></p>
                  <p className="text-sm text-muted-foreground mb-0">
                    Hover: <code className="text-xs">{hoverShadow.label}</code>
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Usage guidance */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="pb-6">Usage Guidance</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-border rounded-lg bg-card p-6">
              <h4 className="pb-3">When to Use</h4>
              <ul className="text-sm text-muted-foreground">
                <li><strong>sm</strong> — Default cards, input fields, subtle grouping</li>
                <li><strong>md</strong> — Hover states on cards, active selection</li>
                <li><strong>lg</strong> — Popovers, dropdowns, floating toolbars</li>
                <li><strong>xl</strong> — Modals, dialogs, full-screen overlays</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg bg-card p-6">
              <h4 className="pb-3">CSS Usage</h4>
              <pre><code>{`.card {\n  box-shadow: var(--elevation-sm);\n}\n.card:hover {\n  box-shadow: var(--elevation-md);\n}\n\n/* Tailwind (mapped) */\n<div className="shadow-sm" />`}</code></pre>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}