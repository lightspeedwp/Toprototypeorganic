/**
 * Developer Tools Landing Page — Central Hub
 *
 * Organises all dev tools into 6 categories matching the project taxonomy:
 * Design, Showcase, Documentation, Testing, Reference, Deployment.
 *
 * All styling uses CSS custom properties from theme.css.
 * Typography: Lora (serif) for headings, Noto Sans (sans-serif) for body/UI.
 *
 * UPDATED: March 2026 - Migrating to Phosphor Icons for better styling options
 *
 * @module DevToolsPage
 * @category pages
 */

import { AppLink as Link } from "../components/common/AppLink";
import { Container } from "../components/common/Container";
import { Hero } from "../components/patterns/Hero";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { StatsDisplay } from "../components/common/StatsDisplay";
import { getBreadcrumbTrail } from "../data/content/navigation";
import { useNavigation } from "../contexts/NavigationContext";
import { getStatsForContext } from "../data/stats";
import * as PhosphorIcons from "@phosphor-icons/react";
import {
  CaretRight as ChevronRight,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ToolLink {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface ToolCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentClass: string;
  tools: ToolLink[];
}

/* ------------------------------------------------------------------ */
/*  Tool catalogue — grouped by the 6 project categories              */
/* ------------------------------------------------------------------ */

const CATEGORIES: ToolCategory[] = [
  {
    id: "design",
    title: "Design",
    description: "Inspect, audit, and experiment with every design token.",
    icon: <PhosphorIcons.PaintBrush className="w-5 h-5" />,
    accentClass: "wp-template-devtools__icon--primary",
    tools: [
      { title: "Colour Contrast Audit", description: "Verify WCAG AA/AAA colour contrast ratios across all semantic tokens in light and dark mode.", href: "/dev-tools/style-guide", icon: <PhosphorIcons.Palette className="w-5 h-5" /> },
      { title: "Typography Specimens", description: "Inspect every heading level, body size, weight, and special element from the fluid type scale.", href: "/dev-tools/typography-specimens", icon: <PhosphorIcons.TextT className="w-5 h-5" /> },
      { title: "Spacing Scale", description: "Visualise fluid clamp() spacing tokens — sections, containers, elements, and gaps.", href: "/dev-tools/spacing-scale", icon: <PhosphorIcons.ArrowsOut className="w-5 h-5" /> },
      { title: "Shadow & Glow Scale", description: "Compare all four elevation levels side-by-side with hover interaction previews.", href: "/dev-tools/shadow-scale", icon: <PhosphorIcons.Stack className="w-5 h-5" /> },
      { title: "Border Radius Specimens", description: "See every radius token from 2 px to pill applied to buttons, cards, and inputs.", href: "/dev-tools/radius-specimens", icon: <PhosphorIcons.Circle className="w-5 h-5" /> },
      { title: "Button Variants", description: "All button sizes, variants, states, and icon combinations from the design system.", href: "/dev-tools/button-showcase", icon: <PhosphorIcons.Mouse className="w-5 h-5" /> },
      { title: "Design Tokens Reference", description: "Single-page reference of all CSS custom properties — colours, typography, spacing, shadows, radii.", href: "/dev-tools/design-tokens-reference", icon: <PhosphorIcons.Sliders className="w-5 h-5" /> },
      { title: "Design System Playground", description: "Interactive page to experiment with tokens — change colours, preview combinations live.", href: "/dev-tools/design-system-playground", icon: <PhosphorIcons.PaintBrush className="w-5 h-5" /> },
      { title: "Colour Palette Viewer", description: "Interactive swatches of all semantic colour tokens with live computed values and copy-to-clipboard.", href: "/dev-tools/color-palette", icon: <PhosphorIcons.SwatchBook className="w-5 h-5" /> },
      { title: "Grid & Layout Overlay", description: "Toggle column grids, baseline rhythm, and container bounds over sample layouts for visual debugging.", href: "/dev-tools/grid-overlay", icon: <PhosphorIcons.GridFour className="w-5 h-5" /> },
    ],
  },
  {
    id: "showcase",
    title: "Showcase",
    description: "Visual specimens of components, cards, animations, and section presets.",
    icon: <PhosphorIcons.GridFour className="w-5 h-5" />,
    accentClass: "wp-template-devtools__icon--accent",
    tools: [
      { title: "Component Showcase", description: "Showcase all existing React components — Logo, Header, Footer, ArchiveFilters, etc.", href: "/dev-tools/component-showcase", icon: <PhosphorIcons.Cube className="w-5 h-5" /> },
      { title: "Card Interactions", description: "Live specimens of Tour, Destination, Blog, Team, Special, and Accommodation cards.", href: "/dev-tools/card-interactions", icon: <PhosphorIcons.GridFour className="w-5 h-5" /> },
      { title: "Animations", description: "Entrance transitions, hover micro-interactions, stagger effects, and loading skeletons.", href: "/dev-tools/animations-showcase", icon: <PhosphorIcons.Play className="w-5 h-5" /> },
      { title: "Section Presets", description: "All 22 section background/styling presets for consistent page composition.", href: "/dev-tools/section-styles-showcase", icon: <PhosphorIcons.GridFour className="w-5 h-5" /> },
    ],
  },
  {
    id: "documentation",
    title: "Documentation",
    description: "Auto-generated docs, snippet builders, and code patterns.",
    icon: <PhosphorIcons.FileText className="w-5 h-5" />,
    accentClass: "wp-template-devtools__icon--info",
    tools: [
      { title: "Documentation Generator", description: "Mock auto-generated documentation from component JSDoc comments.", href: "/dev-tools/documentation-generator", icon: <PhosphorIcons.FileText className="w-5 h-5" /> },
      { title: "Snippet Generator", description: "Interactive code snippet builder for BEM patterns and WordPress block markup.", href: "/dev-tools/snippet-generator", icon: <PhosphorIcons.Scissors className="w-5 h-5" /> },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    description: "Code quality, visual regression, integration, and accessibility audits.",
    icon: <PhosphorIcons.Flask className="w-5 h-5" />,
    accentClass: "wp-template-devtools__icon--warning",
    tools: [
      { title: "Code Quality Dashboard", description: "Static analysis — DOM complexity, CSS rule counts, component dependency map.", href: "/dev-tools/code-quality-dashboard", icon: <PhosphorIcons.Flask className="w-5 h-5" /> },
      { title: "Visual Regression Tester", description: "Screenshot comparison tool (simulated with canvas) for detecting visual changes.", href: "/dev-tools/visual-regression-tester", icon: <PhosphorIcons.Eye className="w-5 h-5" /> },
      { title: "Integration Tester", description: "User flow simulation — test navigation paths, form interactions, and page transitions.", href: "/dev-tools/integration-tester", icon: <PhosphorIcons.PuzzlePiece className="w-5 h-5" /> },
      { title: "Accessibility Audit", description: "Interactive WCAG 2.1 compliance checker — headings, landmarks, ARIA, colour contrast.", href: "/dev-tools/accessibility-audit", icon: <PhosphorIcons.BookOpen className="w-5 h-5" /> },
    ],
  },
  {
    id: "reference",
    title: "Reference",
    description: "Component APIs, icon library, block documentation, and template parts.",
    icon: <PhosphorIcons.MagnifyingGlass className="w-5 h-5" />,
    accentClass: "wp-template-devtools__icon--secondary",
    tools: [
      { title: "Component API", description: "Props/interface reference for all exported components with type definitions.", href: "/dev-tools/component-api-reference", icon: <PhosphorIcons.BookOpen className="w-5 h-5" /> },
      { title: "Icon Library", description: "Searchable grid of all Lucide icons used across the site with copy-to-clipboard.", href: "/dev-tools/icon-library", icon: <PhosphorIcons.MagnifyingGlass className="w-5 h-5" /> },
      { title: "Block Documentation", description: "WordPress block equivalents — tour operator blocks, design blocks, and theme blocks.", href: "/dev-tools/block-documentation", icon: <PhosphorIcons.Cube className="w-5 h-5" /> },
      { title: "Header & Footer", description: "Side-by-side comparison of template parts — Header and Footer in all responsive states.", href: "/dev-tools/header-footer-comparison", icon: <PhosphorIcons.GridFour className="w-5 h-5" /> },
      { title: "Route Map", description: "Visual map of all application routes organized by section with navigation links and component names.", href: "/dev-tools/route-map", icon: <PhosphorIcons.TreeStructure className="w-5 h-5" /> },
      { title: "Mock Data Explorer", description: "Browse all mock data collections with record counts, field schemas, and sample data previews.", href: "/dev-tools/mock-data-explorer", icon: <PhosphorIcons.Database className="w-5 h-5" /> },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "Pre-deploy readiness, performance, and analytics monitoring.",
    icon: <PhosphorIcons.Rocket className="w-5 h-5" />,
    accentClass: "wp-template-devtools__icon--success",
    tools: [
      { title: "Deployment Readiness", description: "Pre-deploy checklist — Lighthouse scores, a11y, broken links, bundle size.", href: "/dev-tools/deployment-readiness", icon: <PhosphorIcons.Rocket className="w-5 h-5" /> },
      { title: "Performance Monitor", description: "Component render times, Core Web Vitals, memory usage, and threshold alerts.", href: "/dev-tools/performance-monitor", icon: <PhosphorIcons.Gauge className="w-5 h-5" /> },
      { title: "Analytics Dashboard", description: "Real-time insights into user behaviour, performance snapshots, and system health.", href: "/dev-tools/analytics-dashboard", icon: <PhosphorIcons.Monitor className="w-5 h-5" /> },
      { title: "Breakpoint Debugger", description: "Live viewport metrics, current breakpoint indicator, device pixel ratio, and common device size reference.", href: "/dev-tools/breakpoint-debugger", icon: <PhosphorIcons.DevicesMobile className="w-5 h-5" /> },
    ],
  },
];

const TOTAL_TOOLS = CATEGORIES.reduce((sum, cat) => sum + cat.tools.length, 0);

const ADDITIONAL_TOOLS = [
  { label: "Template Tester", href: "/dev-tools/template-tester", icon: <PhosphorIcons.Flask className="w-4 h-4" /> },
  { label: "Design Blocks", href: "/dev-tools/design-blocks-showcase", icon: <PhosphorIcons.Cube className="w-4 h-4" /> },
  { label: "Theme Blocks", href: "/dev-tools/theme-blocks-showcase", icon: <PhosphorIcons.Stack className="w-4 h-4" /> },
  { label: "Live Preview", href: "/dev-tools/live-preview", icon: <PhosphorIcons.Eye className="w-4 h-4" /> },
  { label: "Legacy Hub", href: "/dev-tools/dev-tools-index", icon: <PhosphorIcons.Terminal className="w-4 h-4" /> },
  { label: "Sitemap", href: "/sitemap", icon: <PhosphorIcons.Monitor className="w-4 h-4" /> },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function DevToolsPage() {
  const { navigateTo } = useNavigation();
  const breadcrumbTrail = getBreadcrumbTrail("dev-tools");

  const breadcrumbItems = breadcrumbTrail?.items.map((item, idx) => ({
    label: item.label,
    href: item.href,
    onClick: item.href ? () => navigateTo(item.href!) : undefined,
    isCurrent: idx === (breadcrumbTrail.items.length - 1),
  })) ?? [
    { label: "Home", href: "/", onClick: () => navigateTo("/") },
    { label: "Developer Tools", isCurrent: true },
  ];

  return (
    <>
      {/* ============================================================
          BREADCRUMBS — centralized data
          ============================================================ */}
      <BreadcrumbsPattern
        items={breadcrumbItems}
        fullWidth
      />

      {/* ============================================================
          HERO — centralized content via context key
          ============================================================ */}
      <Hero context="dev-tools" />

      {/* ============================================================
          STATS — overlapping cards using StatsDisplay
          ============================================================ */}
      <section className="relative translate-y-[-1.5rem] z-10 pb-8">
        <StatsDisplay
          stats={[
            { value: String(TOTAL_TOOLS), label: "Tools", description: "Developer utilities", icon: "Wrench" },
            { value: String(CATEGORIES.length), label: "Categories", description: "Tool groups", icon: "GridFour" },
            { value: "AAA", label: "WCAG Target", description: "Accessibility level", icon: "Eye" },
            { value: "1440px", label: "Align-wide", description: "Max content width", icon: "Monitor" },
          ]}
          columns={{ mobile: 2, tablet: 2, desktop: 4 }}
          useContainer={true}
        />
      </section>

      {/* ============================================================
          CATEGORY QUICK NAV — sticky
          ============================================================ */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <Container>
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            <span className="text-muted-foreground text-sm font-sans pr-1 flex-shrink-0">Jump to:</span>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="wp-template-devtools__nav-link"
              >
                {cat.icon}
                {cat.title}
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* ============================================================
          TOOL CATEGORIES — alternating backgrounds
          ============================================================ */}
      {CATEGORIES.map((category, catIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-section-sm ${catIndex % 2 === 0 ? "wp-template-devtools__section--even" : "wp-template-devtools__section--odd"}`}
        >
          <Container>
            {/* Category header */}
            <div className="flex items-start gap-4 pb-8">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${category.accentClass}`}>
                {category.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h2>{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>

            {/* Tool cards */}
            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-4">
              {category.tools.map((tool) => (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="wp-template-devtools__tool-card group"
                >
                  {/* Accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" aria-hidden="true" />

                  <div className="wp-template-devtools__tool-icon pb-3">
                    {tool.icon}
                  </div>
                  <h5 className="pb-1.5 group-hover:text-primary transition-colors">{tool.title}</h5>
                  <p className="text-sm text-muted-foreground flex-1 pb-3">{tool.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 translate-y-0.5 group-hover:translate-y-0 transition-all">
                    Open <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* ============================================================
          ADDITIONAL UTILITIES
          ============================================================ */}
      <section className="py-section-sm wp-template-devtools__utilities-section border-t border-border">
        <Container className="flex flex-col items-center">
          <div className="max-w-4xl w-full text-center flex flex-col gap-6 items-center">
            <h3>Additional Utilities</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {ADDITIONAL_TOOLS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground no-underline hover:border-primary/30 hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-ring font-sans"
                >
                  <span className="text-muted-foreground">{link.icon}</span>
                  {link.label}
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          HOW IT WORKS
          ============================================================ */}
      <section className="py-section-sm bg-background border-t border-border">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full">
            <div className="bg-card border border-border rounded-xl p-8 relative overflow-hidden">
              <div className="wp-template-devtools__shape" aria-hidden="true" />

              <div className="flex items-center gap-3 pb-5">
                <div className="wp-template-devtools__how-icon">
                  <PhosphorIcons.Lightning className="w-5 h-5" />
                </div>
                <h3>How It Works</h3>
              </div>

              <p className="text-muted-foreground pb-4">
                Every colour, spacing value, shadow, and radius is defined as a CSS
                custom property in <code className="text-sm bg-muted px-1.5 py-0.5 rounded">theme-light.css</code> and{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">theme-dark.css</code>. Tailwind's{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@theme</code> layer maps them so
                classes like <code className="text-sm bg-muted px-1.5 py-0.5 rounded">bg-primary</code> always
                resolve to the correct token.
              </p>

              <div className="wp-template-devtools__callout">
                <PhosphorIcons.Lightning className="w-4 h-4 text-primary flex-shrink-0 translate-y-0.5" />
                <p className="text-sm">
                  <strong className="text-foreground">To update the design system:</strong>{" "}
                  <span className="text-muted-foreground">edit the CSS variables in the theme files. Everything updates automatically.</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default DevToolsPage;
export { DevToolsPage };