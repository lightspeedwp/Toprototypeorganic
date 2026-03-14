/**
 * Template Tester development tool page.
 *
 * Comprehensive testing interface for all page templates organized by category.
 * Provides quick navigation and testing of all WordPress templates, archetypes,
 * and page types in the prototype.
 *
 * @module TemplateTester
 * @category pages
 * @development-tool
 */

import { useState, useMemo } from "react";
import { AppLink as Link } from "../components/common/AppLink";
import { Container } from "../components/common/Container";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { resolveNavigationPath } from "../lib/navigation";
import {
  ArrowRight,
  MapTrifold as Map,
  Globe,
  Buildings as Hotel,
  Users,
  Gift,
  Star,
  FileText,
  Target,
  MagnifyingGlass as Search,
  Tag,
  Wrench,
  SquaresFour as LayoutGrid,
  List as LayoutList,
  Sparkle as Sparkles,
  Lightning as Zap,
  CaretRight as ChevronRight,
  Compass,
  CheckCircle as CircleCheck,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TemplateLink {
  id: string;
  label: string;
  description: string;
  route: string;
  status?: "active" | "coming-soon" | "legacy";
}

interface TemplateCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  accentClass: string;
  templates: TemplateLink[];
}

interface TemplateTesterProps {
  onNavigate?: (pageId: string) => void;
  currentPage?: string;
}

/* ------------------------------------------------------------------ */
/*  Category data with Lucide icons                                    */
/* ------------------------------------------------------------------ */

const CATEGORIES: TemplateCategory[] = [
  {
    id: "tours",
    title: "Tours",
    icon: <Map className="w-5 h-5" />,
    accentClass: "text-primary bg-primary/10",
    templates: [
      { id: "tour-archive-wp", label: "Tours Archive", description: "WordPress template: archive-tour.html", route: "/tours", status: "active" },
      { id: "tour-single-wp", label: "Tour Detail", description: "WordPress template: single-tour.html", route: "/tours/serengeti-migration-safari", status: "active" },
      { id: "tours-archive", label: "Tours Archive (Legacy)", description: "Content hub archetype with filtering", route: "tours-archive", status: "legacy" },
      { id: "tour-single", label: "Tour Detail (Legacy)", description: "Single detail archetype", route: "tour-single", status: "legacy" },
    ],
  },
  {
    id: "destinations",
    title: "Destinations",
    icon: <Globe className="w-5 h-5" />,
    accentClass: "wp-bg-accent-ultralight",
    templates: [
      { id: "destination-archive-wp", label: "Destinations Archive", description: "WordPress template: archive-destination.html", route: "/destinations", status: "active" },
      { id: "destination-single-wp", label: "Destination Detail", description: "WordPress template: single-destination.html", route: "/destinations/serengeti-national-park", status: "active" },
      { id: "destinations-archive", label: "Destinations Archive (Legacy)", description: "Content hub for hierarchical content", route: "destinations-archive", status: "legacy" },
      { id: "destination-single", label: "Destination Detail (Legacy)", description: "Single detail with hierarchical relationships", route: "destination-single", status: "legacy" },
    ],
  },
  {
    id: "accommodation",
    title: "Accommodation",
    icon: <Hotel className="w-5 h-5" />,
    accentClass: "text-info bg-info/10",
    templates: [
      { id: "accommodation-archive", label: "Accommodation Archive", description: "Accommodation listings with filtering", route: "/accommodation", status: "active" },
      { id: "accommodation-single", label: "Accommodation Detail", description: "Single accommodation with features and reviews", route: "/accommodation/serengeti-safari-lodge", status: "active" },
    ],
  },
  {
    id: "team",
    title: "Team",
    icon: <Users className="w-5 h-5" />,
    accentClass: "text-secondary bg-secondary/10",
    templates: [
      { id: "team-archive", label: "Team Archive", description: "Team members with FAQs", route: "/team", status: "active" },
    ],
  },
  {
    id: "specials",
    title: "Specials & Deals",
    icon: <Gift className="w-5 h-5" />,
    accentClass: "text-warning bg-warning/10",
    templates: [
      { id: "specials-archive", label: "Specials Archive", description: "Promotions and deals with filtering", route: "/specials", status: "active" },
      { id: "special-single", label: "Special Detail", description: "Single special offer or promotion", route: "/specials/early-bird-serengeti", status: "active" },
    ],
  },
  {
    id: "reviews",
    title: "Reviews",
    icon: <Star className="w-5 h-5" />,
    accentClass: "wp-bg-accent-ultralight",
    templates: [
      { id: "reviews-archive", label: "Reviews Archive", description: "Customer reviews and testimonials", route: "/reviews", status: "active" },
    ],
  },
  {
    id: "blog",
    title: "Blog",
    icon: <FileText className="w-5 h-5" />,
    accentClass: "text-primary bg-primary/10",
    templates: [
      { id: "blog-archive", label: "Blog Archive", description: "Editorial listing archetype", route: "/blog", status: "active" },
      { id: "blog-single", label: "Blog Post Detail", description: "Single blog post with content", route: "/blog/ultimate-guide-african-safari", status: "active" },
    ],
  },
  {
    id: "content",
    title: "Content Pages",
    icon: <FileText className="w-5 h-5" />,
    accentClass: "text-info bg-info/10",
    templates: [
      { id: "home-page", label: "Homepage", description: "Main landing page — front-page.html", route: "/", status: "active" },
      { id: "about-page", label: "About Us", description: "Company information", route: "/about", status: "active" },
      { id: "contact-page", label: "Contact", description: "Contact information and form", route: "/contact", status: "active" },
      { id: "faq-page", label: "FAQ", description: "Frequently asked questions", route: "/faq", status: "active" },
      { id: "privacy-policy-page", label: "Privacy Policy", description: "Privacy policy and data protection", route: "/privacy-policy", status: "active" },
      { id: "terms-conditions-page", label: "Terms & Conditions", description: "Terms of service and conditions", route: "/terms-conditions", status: "active" },
      { id: "why-book-with-us-page", label: "Why Book With Us", description: "Benefits and value propositions", route: "/why-book-with-us", status: "active" },
      { id: "trip-planner-page", label: "Trip Planner", description: "Interactive trip planning tool", route: "/trip-planner", status: "active" },
    ],
  },
  {
    id: "conversion",
    title: "Conversion Pages",
    icon: <Target className="w-5 h-5" />,
    accentClass: "text-success bg-success/10",
    templates: [
      { id: "reviews-hub-page", label: "Reviews Hub", description: "Social proof & testimonials hub", route: "/reviews-hub", status: "active" },
      { id: "quote-request-page", label: "Quote Request", description: "Custom quote request form", route: "/quote-request", status: "active" },
      { id: "destination-guides-hub-page", label: "Destination Guides Hub", description: "Downloadable guides library", route: "/destination-guides", status: "active" },
      { id: "travel-insurance-page", label: "Travel Insurance", description: "Insurance options & comparison", route: "/travel-insurance", status: "active" },
      { id: "newsletter-signup-page", label: "Newsletter Signup", description: "Email list building page", route: "/newsletter", status: "active" },
      { id: "packing-guides-page", label: "Packing Guides", description: "Safari packing checklists", route: "/packing-guides", status: "active" },
    ],
  },
  {
    id: "search",
    title: "Search & Discovery",
    icon: <Search className="w-5 h-5" />,
    accentClass: "text-secondary bg-secondary/10",
    templates: [
      { id: "search-results-page", label: "Search Results", description: "Global search with filtering", route: "/search", status: "active" },
    ],
  },
  {
    id: "taxonomy",
    title: "Taxonomy Archives",
    icon: <Tag className="w-5 h-5" />,
    accentClass: "text-warning bg-warning/10",
    templates: [
      { id: "taxonomy-archive", label: "Travel Style Archive", description: "Taxonomy archive with contextual navigation", route: "/travel-styles/adventure", status: "active" },
    ],
  },
  {
    id: "development",
    title: "Development Tools",
    icon: <Wrench className="w-5 h-5" />,
    accentClass: "text-muted-foreground bg-muted",
    templates: [
      { id: "dev-tools", label: "Developer Tools Hub", description: "Landing page — access all developer tools", route: "/dev-tools", status: "active" },
      { id: "dev-tools/template-tester", label: "Template Tester", description: "Test all templates and pages", route: "/dev-tools/template-tester", status: "active" },
      { id: "dev-tools/component-showcase", label: "Component Showcase", description: "Showcase all 27 components with live editors", route: "/dev-tools/component-showcase", status: "active" },
      { id: "dev-tools/component-api", label: "Component API Reference", description: "Reference all component APIs", route: "/dev-tools/component-api", status: "active" },
      { id: "dev-tools/block-documentation", label: "Block Documentation", description: "Document all WordPress blocks", route: "/dev-tools/block-documentation", status: "active" },
      { id: "dev-tools/design-blocks", label: "Design Blocks Showcase", description: "Showcase design blocks (Button, Group, Grid)", route: "/dev-tools/design-blocks", status: "active" },
      { id: "dev-tools/theme-blocks", label: "Theme Blocks Showcase", description: "Showcase theme blocks (Navigation, Site Logo)", route: "/dev-tools/theme-blocks", status: "active" },
      { id: "dev-tools/header-footer-comparison", label: "Header/Footer Comparison", description: "Compare header and footer template variations", route: "/dev-tools/header-footer", status: "active" },
      { id: "dev-tools/button-showcase", label: "Button Showcase", description: "Showcase all button styles and variants", route: "/dev-tools/buttons", status: "active" },
      { id: "dev-tools/section-presets", label: "Section Presets Showcase", description: "Showcase all 22 section style presets", route: "/dev-tools/section-presets", status: "active" },
      { id: "dev-tools/icon-library", label: "Icon Library", description: "Icon reference with search and categories", route: "/dev-tools/icons", status: "active" },
      { id: "dev-tools/live-preview", label: "Live Preview", description: "Live component preview and testing tool", route: "/dev-tools/live-preview", status: "active" },
      { id: "dev-tools/style-guide", label: "Style Guide", description: "Complete design system style guide", route: "/dev-tools/style-guide", status: "active" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TemplateTester({ onNavigate, currentPage }: TemplateTesterProps) {
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "legacy">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  /* Filtered data */
  const filteredCategories = useMemo(() => {
    return CATEGORIES
      .map((category) => {
        let templates = category.templates;
        if (selectedStatus !== "all") {
          templates = templates.filter((t) => t.status === selectedStatus);
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          templates = templates.filter(
            (t) =>
              t.label.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q) ||
              t.route.toLowerCase().includes(q)
          );
        }
        return { ...category, templates };
      })
      .filter((cat) => {
        if (selectedCategory !== "all" && cat.id !== selectedCategory) return false;
        return cat.templates.length > 0;
      });
  }, [selectedStatus, selectedCategory, searchQuery]);

  const totalTemplates = CATEGORIES.reduce((sum, c) => sum + c.templates.length, 0);
  const activeTemplates = CATEGORIES.reduce(
    (sum, c) => sum + c.templates.filter((t) => t.status === "active").length, 0
  );
  const filteredCount = filteredCategories.reduce((sum, c) => sum + c.templates.length, 0);

  const handleTemplateClick = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* Status button helper */
  const StatusButton = ({ value, label }: { value: typeof selectedStatus; label: string }) => (
    <button
      onClick={() => setSelectedStatus(value)}
      className={`
        px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all border
        ${selectedStatus === value
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card text-foreground border-border hover:border-primary/40 hover:text-primary"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="breadcrumb-bar">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Developer Tools", href: "/dev-tools" },
              { label: "Template Tester", isCurrent: true },
            ]}
          />
        </Container>
      </div>

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative overflow-hidden bg-card border-b border-border">
        {/* Decorative dots */}
        <div className="wp-template-tester__dots-pattern" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tt-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tt-dots)" />
          </svg>
        </div>

        <Container className="flex flex-col items-center">
          <div className="relative py-section-md text-center max-w-3xl flex flex-col items-center gap-4">
            <div className="wp-template-tester__badge">
              <Compass className="w-4 h-4 text-primary" />
              <span className="text-primary font-sans text-sm font-medium">Template Navigator</span>
            </div>

            <h1>Template Tester</h1>
            <p className="text-muted-foreground max-w-2xl">
              Navigate and test every WordPress template, archetype, and page type in the prototype — all in one place.
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================
          STATS — Floating cards
          ================================================================ */}
      <section className="relative translate-y-[-1.5rem] z-10 pb-section-sm">
        <Container className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap max-w-3xl">
            {[
              { value: totalTemplates, label: "Total", icon: <LayoutGrid className="w-4 h-4" /> },
              { value: activeTemplates, label: "Active", icon: <CircleCheck className="w-4 h-4" /> },
              { value: CATEGORIES.length, label: "Categories", icon: <Tag className="w-4 h-4" /> },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 bg-card border border-border rounded-xl px-6 py-4 shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <p className="font-serif text-fluid-2xl text-primary leading-none">{stat.value}</p>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          FILTERS — Sticky toolbar
          ================================================================ */}
      <section className="py-4 bg-background/95 backdrop-blur-sm border-y border-border sticky top-0 z-20">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Left: search + status */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search templates…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60 font-sans"
                />
              </div>

              {/* Status filters */}
              <div className="flex gap-2">
                <StatusButton value="all" label="All" />
                <StatusButton value="active" label="Active" />
                <StatusButton value="legacy" label="Legacy" />
              </div>
            </div>

            {/* Right: category + view mode */}
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring font-sans"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>

              {/* View mode toggle */}
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                  aria-label="List view"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

              {/* Count */}
              <span className="text-muted-foreground text-sm font-sans hidden md:block">
                {filteredCount}/{totalTemplates}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          TEMPLATE GRID — Main content
          ================================================================ */}
      <section className="py-section-sm bg-background">
        <Container>
          {filteredCount === 0 ? (
            /* Empty state */
            <div className="text-center py-section-md">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-3">
                <h3>No templates found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedStatus("all");
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {filteredCategories.map((category) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${category.accentClass}`}>
                      {category.icon}
                    </div>
                    <div className="flex items-baseline gap-3">
                      <h2>{category.title}</h2>
                      <span className="text-muted-foreground text-sm font-sans">
                        {category.templates.length} template{category.templates.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Template cards */}
                  {viewMode === "grid" ? (
                    <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-3">
                      {category.templates.map((template) => {
                        const isActive = currentPage === template.id;
                        const isLegacy = template.status === "legacy";
                        const isComingSoon = template.status === "coming-soon";

                        const sharedClassName = `
                          group relative text-left rounded-xl border overflow-hidden transition-all
                          ${isActive
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                            : "border-border bg-card hover:border-primary/40 hover:shadow-md"
                          }
                          ${isComingSoon ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                          no-underline text-foreground
                        `;

                        const cardContent = (
                          <>
                            {/* Top accent */}
                            <div className={`h-0.5 ${isActive ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"} transition-colors`} aria-hidden="true" />

                            <div className="p-5">
                              {/* Status badge row */}
                              <div className="flex items-start justify-between pb-3">
                                <h5 className={`pr-2 group-hover:text-primary transition-colors ${isActive ? "text-primary" : ""}`}>
                                  {template.label}
                                </h5>
                                {(isActive || isLegacy || isComingSoon) && (
                                  <span
                                    className={`
                                      inline-flex items-center px-2 py-0.5 rounded-md text-xs font-sans font-medium flex-shrink-0
                                      ${isActive ? "bg-primary text-primary-foreground" : ""}
                                      ${isLegacy && !isActive ? "bg-muted text-muted-foreground" : ""}
                                      ${isComingSoon ? "wp-bg-accent-ultralight" : ""}
                                    `}
                                  >
                                    {isActive ? "Current" : isLegacy ? "Legacy" : "Soon"}
                                  </span>
                                )}
                              </div>

                              <p className="text-muted-foreground text-sm pb-3">
                                {template.description}
                              </p>

                              {/* Route + arrow */}
                              <div className="flex items-center justify-between">
                                <code className="text-xs text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">
                                  {template.route}
                                </code>
                                {!isComingSoon && (
                                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        );

                        if (onNavigate) {
                          return (
                            <button
                              key={template.id}
                              onClick={() => handleTemplateClick(template.route)}
                              disabled={isComingSoon}
                              className={sharedClassName}
                            >
                              {cardContent}
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={template.id}
                            to={resolveNavigationPath(template.route)}
                            className={sharedClassName}
                          >
                            {cardContent}
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    /* List view */
                    <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                      {category.templates.map((template) => {
                        const isActive = currentPage === template.id;
                        const isLegacy = template.status === "legacy";
                        const isComingSoon = template.status === "coming-soon";

                        const sharedListClassName = `
                          group flex items-center gap-4 w-full px-5 py-4 text-left transition-colors
                          ${isActive ? "bg-primary/5" : "bg-card hover:bg-muted/50"}
                          ${isComingSoon ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                          no-underline text-foreground
                        `;

                        const listContent = (
                          <>
                            {/* Active indicator */}
                            <div className={`w-1 h-8 rounded-full flex-shrink-0 ${isActive ? "bg-primary" : "bg-transparent"}`} />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`font-sans font-medium ${isActive ? "text-primary" : "group-hover:text-primary transition-colors"}`}>
                                  {template.label}
                                </span>
                                {isLegacy && (
                                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Legacy</span>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm truncate">{template.description}</p>
                            </div>

                            <code className="text-xs text-muted-foreground/60 hidden md:block">{template.route}</code>

                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                          </>
                        );

                        if (onNavigate) {
                          return (
                            <button
                              key={template.id}
                              onClick={() => handleTemplateClick(template.route)}
                              disabled={isComingSoon}
                              className={sharedListClassName}
                            >
                              {listContent}
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={template.id}
                            to={resolveNavigationPath(template.route)}
                            className={sharedListClassName}
                          >
                            {listContent}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ================================================================
          PROJECT STATUS — Clean summary
          ================================================================ */}
      <section className="py-section-sm bg-muted/30 border-t border-border">
        <Container className="flex flex-col items-center">
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="text-center flex flex-col items-center gap-4 pb-8">
              <div className="inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3>Project Status</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Track template completion and remaining work.
              </p>
            </div>

            {/* Progress cards */}
            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-3 pb-8">
              {[
                { label: "Overall Progress", value: "95%", width: "w-[95%]" },
                { label: "Templates Complete", value: `${activeTemplates}/${totalTemplates}`, width: "w-[91%]" },
                { label: "Patterns Created", value: "25+", width: "w-[85%]" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm font-sans">{stat.label}</span>
                    <span className="text-primary font-serif text-fluid-xl font-semibold">{stat.value}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className={`bg-primary h-1.5 rounded-full ${stat.width} transition-all`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Completed milestones */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                  <CircleCheck className="w-5 h-5" />
                </div>
                <h4>Completed Milestones</h4>
              </div>

              <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-4">
                {[
                  {
                    title: "Core Templates",
                    items: ["8 archive templates", "6 single detail pages", "WordPress alignment verified"],
                  },
                  {
                    title: "Design System",
                    items: ["CSS variables implemented", "Light/dark mode support", "Typography system complete"],
                  },
                  {
                    title: "Navigation",
                    items: ["Template Browser (43 pages)", "Header with mega menus", "Footer navigation"],
                  },
                  {
                    title: "Development Tools",
                    items: ["Template Tester", "Performance monitoring", "Compliance auditing"],
                  },
                ].map((section) => (
                  <div key={section.title} className="flex flex-col gap-3">
                    <h6 className="text-foreground">{section.title}</h6>
                    <ul className="flex flex-col gap-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CircleCheck className="w-3.5 h-3.5 text-success flex-shrink-0 translate-y-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          FOOTER NOTE
          ================================================================ */}
      <section className="py-section-sm bg-background border-t border-border">
        <Container className="flex flex-col items-center">
          <div className="max-w-2xl w-full text-center">
            <div className="flex items-start gap-3 p-5 bg-muted/50 border border-border rounded-xl text-left">
              <Zap className="w-5 h-5 text-primary flex-shrink-0 translate-y-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Development tool.</strong>{" "}
                This Template Tester validates WordPress block theme patterns and page archetypes.
                All templates map directly to WordPress templates, template parts, and block patterns.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default TemplateTester;