/**
 * Page Shell — WordPress Template-Part Wrapper
 *
 * Composes the standard page chrome that sits between the header and
 * the page-specific content:
 *
 *   breadcrumbs → hero → {children}
 *
 * Both breadcrumbs and hero are driven from a single `context` key
 * that looks up data from the centralized content files:
 *   - Breadcrumbs  → `/src/app/data/content/navigation.ts`
 *   - Hero         → `/src/app/data/content/heroes.ts`
 *
 * This eliminates the boilerplate that previously existed in every
 * page file (hardcoded breadcrumb arrays, repeated Hero imports).
 *
 * WordPress Mapping:
 *   Conceptually equivalent to the content between
 *   `<!-- wp:template-part {"slug":"header"} -->` and
 *   the first content block in a block-theme template.
 *
 * CSS: /src/styles/parts/page-shell.css
 * BEM: .wp-part-page-shell__*
 *
 * @module PageShell
 * @category parts
 */

import { Hero, type HeroProps } from "../patterns/Hero";
import { BreadcrumbsPattern } from "../patterns/BreadcrumbsPattern";
import { getBreadcrumbTrail } from "../../data/content/navigation";
import { useNavigation } from "../../contexts/NavigationContext";
import { cn } from "../../lib/utils";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface PageShellProps {
  /**
   * Page context key — used to look up both breadcrumb trail and hero
   * content from the centralized data files.
   *
   * Examples: "about", "tours-archive", "faq", "sustainability"
   */
  context: string;

  /** Page content rendered below the hero. */
  children: React.ReactNode;

  /**
   * Whether to render the breadcrumb bar.
   * Defaults to `true`. Set `false` for the homepage or landing pages
   * that intentionally omit breadcrumbs.
   */
  showBreadcrumbs?: boolean;

  /**
   * Whether to render the hero section.
   * Defaults to `true`. Set `false` for pages that need a fully custom
   * hero (e.g. DevToolsPage with its grid-pattern hero).
   */
  showHero?: boolean;

  /**
   * Override or extend hero props. These are spread onto the `<Hero>`
   * component AFTER the `context` prop, so they win over data-file values.
   *
   * Common use-case: ContactPage passes a custom `primaryCTA` with an
   * `onClick` that scrolls to the contact form.
   */
  heroProps?: Omit<HeroProps, "context">;

  /**
   * Wrapper element for the page content.
   * Defaults to `"article"` (semantic for a self-contained composition).
   */
  as?: "article" | "div" | "section" | "main";

  /**
   * Additional CSS classes on the outermost wrapper.
   */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PageShell({
  context,
  children,
  showBreadcrumbs = true,
  showHero = true,
  heroProps,
  as: Wrapper = "article",
  className,
}: PageShellProps) {
  const { navigateTo } = useNavigation();

  /* ── Breadcrumb data ────────────────────────────────────────── */
  const trail = showBreadcrumbs ? getBreadcrumbTrail(context) : undefined;

  const breadcrumbItems = trail?.items.map((item, idx) => {
    const isLast = idx === trail.items.length - 1;
    return {
      label: item.label,
      href: item.href,
      onClick: item.href ? () => navigateTo(item.href!) : undefined,
      isCurrent: isLast,
    };
  });

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <Wrapper className={cn("wp-part-page-shell", className)}>
      {/* Breadcrumbs */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <BreadcrumbsPattern
          items={breadcrumbItems}
          fullWidth
        />
      )}

      {/* Hero */}
      {showHero && (
        <Hero context={context} {...heroProps} />
      )}

      {/* Page content */}
      <div className="wp-part-page-shell__content">
        {children}
      </div>
    </Wrapper>
  );
}

export default PageShell;
