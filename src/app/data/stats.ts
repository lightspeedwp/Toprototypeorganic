/**
 * Codebase Statistics Utilities
 *
 * Functions to gather and compute statistics about the codebase.
 * These stats are displayed across various pages (DevTools, About, etc.)
 *
 * @module stats
 * @category data
 */

/* ------------------------------------------------------------------ */
/*  Manual Statistics (Updated periodically)                          */
/* ------------------------------------------------------------------ */

/**
 * Core codebase statistics.
 * These should be updated periodically by running analysis scripts.
 */
export const CODEBASE_STATS = {
  // Components & Files
  components: 89,
  pages: 47,
  patterns: 24,
  blocks: 12,
  templates: 8,
  
  // Lines of Code
  totalLinesOfCode: 45000,
  typescriptLines: 38000,
  cssLines: 7000,
  
  // Design System
  cssVariables: 120,
  colorTokens: 34,
  typographyTokens: 18,
  spacingTokens: 24,
  
  // Content
  tours: 12,
  destinations: 15,
  accommodation: 8,
  blogPosts: 10,
  teamMembers: 6,
  reviews: 20,
  
  // Dev Tools
  devTools: 27,
  devToolCategories: 6,
  
  // Performance
  lighthouseScore: 95,
  wcagCompliance: "AA",
  bundleSize: "850 KB",
  
  // Icons (Updated March 2026)
  lucideIcons: 145, // Decreasing as we migrate
  phosphorIcons: 5,  // Increasing: BackToTopButton, ScrollDownArrow, MobileMenuToggle, ViewAllButton, BreadcrumbsPattern
};

/* ------------------------------------------------------------------ */
/*  Statistics Calculation Functions                                  */
/* ------------------------------------------------------------------ */

/**
 * Get statistics for a specific context/page.
 */
export function getStatsForContext(context: string): Array<{
  value: string | number;
  label: string;
  description?: string;
}> {
  switch (context) {
    case "dev-tools":
      return [
        { value: CODEBASE_STATS.devTools, label: "Tools", description: "Developer utilities" },
        { value: CODEBASE_STATS.devToolCategories, label: "Categories", description: "Tool groups" },
        { value: CODEBASE_STATS.wcagCompliance, label: "WCAG Target", description: "Accessibility level" },
        { value: "1440px", label: "Align-wide", description: "Max content width" },
      ];
    
    case "design-system":
      return [
        { value: CODEBASE_STATS.cssVariables, label: "CSS Variables", description: "Design tokens" },
        { value: CODEBASE_STATS.colorTokens, label: "Colors", description: "Semantic tokens" },
        { value: CODEBASE_STATS.typographyTokens, label: "Typography", description: "Type scale" },
        { value: CODEBASE_STATS.spacingTokens, label: "Spacing", description: "Fluid scale" },
      ];
    
    case "components":
      return [
        { value: CODEBASE_STATS.components, label: "Components", description: "React components" },
        { value: CODEBASE_STATS.patterns, label: "Patterns", description: "Block patterns" },
        { value: CODEBASE_STATS.blocks, label: "Blocks", description: "WordPress blocks" },
        { value: CODEBASE_STATS.templates, label: "Templates", description: "Page templates" },
      ];
    
    case "content":
      return [
        { value: CODEBASE_STATS.tours, label: "Tours", description: "Tour offerings" },
        { value: CODEBASE_STATS.destinations, label: "Destinations", description: "Travel destinations" },
        { value: CODEBASE_STATS.accommodation, label: "Accommodation", description: "Properties" },
        { value: CODEBASE_STATS.blogPosts, label: "Posts", description: "Blog articles" },
      ];
    
    case "performance":
      return [
        { value: CODEBASE_STATS.lighthouseScore, label: "Lighthouse", description: "Performance score" },
        { value: CODEBASE_STATS.bundleSize, label: "Bundle Size", description: "Gzipped" },
        { value: CODEBASE_STATS.wcagCompliance, label: "WCAG", description: "Accessibility" },
        { value: "100%", label: "PWA Ready", description: "Progressive web app" },
      ];
    
    case "codebase":
      return [
        { value: CODEBASE_STATS.components, label: "Components", description: "React components" },
        { value: CODEBASE_STATS.pages, label: "Pages", description: "Route pages" },
        { value: `${Math.round(CODEBASE_STATS.totalLinesOfCode / 1000)}K`, label: "Lines", description: "Total code" },
        { value: CODEBASE_STATS.cssVariables, label: "Variables", description: "CSS tokens" },
      ];
    
    default:
      return [];
  }
}

/**
 * Get total icon count.
 */
export function getTotalIconCount(): number {
  return CODEBASE_STATS.lucideIcons + CODEBASE_STATS.phosphorIcons;
}

/**
 * Get icon migration progress (percentage).
 */
export function getIconMigrationProgress(): number {
  const total = getTotalIconCount();
  if (total === 0) return 0;
  return Math.round((CODEBASE_STATS.phosphorIcons / total) * 100);
}

/**
 * Get formatted bundle size.
 */
export function getFormattedBundleSize(): string {
  return CODEBASE_STATS.bundleSize;
}

/**
 * Calculate WordPress mapping completeness percentage.
 */
export function getWordPressMappingProgress(): number {
  const totalComponents = CODEBASE_STATS.components;
  const mappedComponents = CODEBASE_STATS.blocks + CODEBASE_STATS.patterns + CODEBASE_STATS.templates;
  return Math.round((mappedComponents / totalComponents) * 100);
}