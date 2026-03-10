/**
 * Developer Tools Hub (Legacy)
 *
 * Central hub for all development tools — alternative view.
 * The primary DevToolsPage at /dev-tools is now the main entry point.
 * This page is kept as a secondary reference / legacy hub.
 *
 * @module DevToolsHub
 * @category dev-tools
 */

import { useState } from "react";
import { AppLink as Link } from "../../components/common/AppLink";
import { Container } from "../../components/common/Container";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import {
  Palette,
  Pulse as Activity,
  Eye,
  FileText,
  Gauge,
  Shield,
  Rocket,
  ChartBar as BarChart3,
  Play,
  Wrench,
  BookOpen,
  CheckCircle as CircleCheck,
  Code as Code2,
  ArrowRight,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface DevTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  category: string;
  status: "stable" | "beta" | "new";
  features: string[];
}

const DEV_TOOLS: DevTool[] = [
  {
    id: "design-tokens",
    name: "Design Tokens Reference",
    description: "Complete reference of all design system tokens including colors, typography, spacing, and more.",
    icon: Palette,
    path: "/dev-tools/design-tokens",
    category: "design",
    status: "stable",
    features: ["Color palette with dark mode", "Typography scale", "Spacing system", "Border radius presets"],
  },
  {
    id: "design-playground",
    name: "Design System Playground",
    description: "Interactive playground for experimenting with design tokens, components, and themes.",
    icon: Wrench,
    path: "/dev-tools/design-playground",
    category: "design",
    status: "stable",
    features: ["Live token editing", "Component preview", "Theme switching", "Export configurations"],
  },
  {
    id: "performance",
    name: "Performance Monitor",
    description: "Real-time performance monitoring with Core Web Vitals tracking and optimization insights.",
    icon: Gauge,
    path: "/dev-tools/performance",
    category: "performance",
    status: "stable",
    features: ["Core Web Vitals (FCP, LCP, FID, CLS)", "Time to Interactive", "Memory usage", "Recommendations"],
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Comprehensive user behavior analytics and real-time system health monitoring.",
    icon: BarChart3,
    path: "/dev-tools/analytics",
    category: "analytics",
    status: "new",
    features: ["User behavior tracking", "Conversion funnels", "Real-time monitoring", "Device analytics"],
  },
  {
    id: "accessibility",
    name: "Accessibility Audit",
    description: "WCAG 2.1 Level AA and AAA compliance auditing with detailed recommendations.",
    icon: Shield,
    path: "/dev-tools/accessibility-audit",
    category: "testing",
    status: "stable",
    features: ["WCAG AA/AAA compliance", "Contrast checking", "Keyboard navigation", "ARIA validation"],
  },
  {
    id: "code-quality",
    name: "Code Quality Dashboard",
    description: "Analyze code complexity, maintainability, and adherence to best practices.",
    icon: Code2,
    path: "/dev-tools/code-quality",
    category: "testing",
    status: "stable",
    features: ["Complexity analysis", "Maintainability scoring", "Best practices", "Code smell detection"],
  },
  {
    id: "visual-regression",
    name: "Visual Regression Tester",
    description: "Compare visual snapshots to detect unintended UI changes.",
    icon: Eye,
    path: "/dev-tools/visual-regression",
    category: "testing",
    status: "stable",
    features: ["Visual snapshots", "Side-by-side comparison", "Difference highlighting", "Baseline management"],
  },
  {
    id: "integration-testing",
    name: "Integration Tester",
    description: "Run user flow simulations and test multi-component interactions.",
    icon: Play,
    path: "/dev-tools/integration",
    category: "testing",
    status: "new",
    features: ["User flow simulation", "Multi-step testing", "API mocking", "Performance metrics"],
  },
  {
    id: "deployment",
    name: "Deployment Readiness",
    description: "Pre-deployment validation covering code quality, performance, accessibility, security, and SEO.",
    icon: Rocket,
    path: "/dev-tools/deployment",
    category: "deployment",
    status: "new",
    features: ["6 category validation", "Blocker detection", "SEO analysis", "Security checks"],
  },
  {
    id: "documentation",
    name: "Documentation Generator",
    description: "Auto-generate comprehensive documentation from component code with examples.",
    icon: FileText,
    path: "/dev-tools/documentation",
    category: "documentation",
    status: "stable",
    features: ["JSDoc parsing", "Props documentation", "Usage examples", "Markdown export"],
  },
];

const CATEGORY_FILTERS = [
  { id: "all", name: "All Tools", icon: Wrench },
  { id: "design", name: "Design", icon: Palette },
  { id: "performance", name: "Performance", icon: Gauge },
  { id: "testing", name: "Testing", icon: CircleCheck },
  { id: "deployment", name: "Deployment", icon: Rocket },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "documentation", name: "Documentation", icon: BookOpen },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DevToolsHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTools =
    selectedCategory === "all"
      ? DEV_TOOLS
      : DEV_TOOLS.filter((tool) => tool.category === selectedCategory);

  const getStatusStyles = (status: DevTool["status"]) => {
    switch (status) {
      case "stable":
        return "bg-success/10 text-success border-success/20";
      case "beta":
        return "bg-muted text-muted-foreground border-border";
      case "new":
        return "wp-bg-accent-ultralight wp-border-accent-soft";
    }
  };

  return (
    <>
      <div className="breadcrumb-bar">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Developer Tools", href: "/dev-tools" },
              { label: "Legacy Hub", isCurrent: true },
            ]}
          />
        </Container>
      </div>

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative overflow-hidden bg-muted border-b border-border">
        <Container>
          <div className="py-section-md">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Wrench className="w-4 h-4 text-primary" />
                  <span className="text-primary font-sans text-sm font-medium">Legacy Hub</span>
                </div>
                <h1 className="mb-4">Developer Tools</h1>
                <p className="text-muted-foreground mb-0">
                  Comprehensive development utilities for building, testing, and deploying with confidence.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl px-6 py-4 shadow-sm">
                <p className="text-muted-foreground text-sm mb-1">Total Tools</p>
                <p className="font-serif text-fluid-3xl text-primary mb-0">{DEV_TOOLS.length}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          CONTENT
          ================================================================ */}
      <section className="py-section-sm bg-background">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORY_FILTERS.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-sans font-medium transition-all
                    ${isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-foreground border-border hover:border-primary/40 hover:text-primary"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  {category.id !== "all" && (
                    <span className="text-xs opacity-70">
                      ({DEV_TOOLS.filter((t) => t.category === category.id).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden no-underline text-foreground hover:border-primary/40 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {/* Top accent */}
                  <div className="h-0.5 bg-transparent group-hover:bg-primary transition-colors" aria-hidden="true" />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-sans font-medium border ${getStatusStyles(tool.status)}`}>
                        {tool.status === "stable" ? "Stable" : tool.status === "beta" ? "Beta" : "New"}
                      </span>
                    </div>

                    <h5 className="mb-2 group-hover:text-primary transition-colors">{tool.name}</h5>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1.5 mb-4">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CircleCheck className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-1.5 text-sm text-primary font-sans font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Open tool <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}