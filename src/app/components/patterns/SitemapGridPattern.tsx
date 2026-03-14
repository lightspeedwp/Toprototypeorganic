/**
 * SitemapGridPattern — Complete site structure visualization
 *
 * WordPress Equivalent: Sitemap block / Page list block
 *
 * Design System Compliance:
 * - Typography: Lora (serif) for headings, Noto Sans (sans-serif) for body
 * - Colors: All semantic tokens from theme.css
 * - Spacing: fluid utilities + Tailwind scale
 * - NO hardcoded values
 */

import { Container } from "../common/Container";
import { CaretRight as ChevronRight, ArrowSquareOut as ExternalLink } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SitemapLink {
  title: string;
  href: string;
  description?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  external?: boolean;
  children?: SitemapLink[];
}

export interface SitemapSection {
  title: string;
  links: SitemapLink[];
  icon?: React.ReactNode;
  accentClass?: string;
}

export interface SitemapGridPatternProps {
  title?: string;
  description?: string;
  sections: SitemapSection[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "card" | "minimal";
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Link item                                                          */
/* ------------------------------------------------------------------ */

function SitemapLinkItem({ link, depth = 0 }: { link: SitemapLink; depth?: number }) {
  return (
    <li className={cn(depth > 0 && "pl-element-md relative before:absolute before:left-0 before:top-3 before:w-[var(--spacing-element-sm)] before:h-px before:bg-[color:var(--color-border)]")}>
      <a
        href={link.href}
        onClick={(e) => {
          if (link.onClick) {
            e.preventDefault();
            link.onClick();
          }
        }}
        className="wp-pattern-sitemap-grid__link group/link flex items-start gap-fluid-sm p-element-xs no-underline"
      >
        {link.icon ? (
          <span className="wp-pattern-sitemap-grid__link-icon">
            {link.icon}
          </span>
        ) : (
          <ChevronRight
            className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)] flex-shrink-0 text-[color:var(--color-border)] group-hover/link:text-[color:var(--color-primary)] group-hover/link:translate-x-0.5 transition-all self-start pt-fluid-xs"
            aria-hidden="true"
          />
        )}

        <div className="flex-1 min-w-0 flex flex-col gap-fluid-xs">
          <span className="font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] group-hover/link:text-[color:var(--color-primary)] transition-colors">
            {link.title}
          </span>
          {link.description && (
            <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-xs)] m-0">
              {link.description}
            </p>
          )}
        </div>

        {link.external && (
          <ExternalLink className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)] text-[color:var(--color-muted-foreground)]/40 flex-shrink-0 self-start pt-fluid-xs" aria-label="External link" />
        )}
      </a>

      {link.children && link.children.length > 0 && (
        <ul className="flex flex-col gap-fluid-xs pt-element-xs border-l border-[color:var(--color-border)]/50 relative left-[var(--spacing-element-sm)] pl-0 list-none">
          {link.children.map((child, idx) => (
            <SitemapLinkItem key={idx} link={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function SitemapGridPattern({
  title = "Sitemap",
  description,
  sections,
  columns = 3,
  variant = "default",
  className,
}: SitemapGridPatternProps) {
  const gridColumns = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const isCard = variant === "card";

  const totalPages = sections.reduce((sum, s) => sum + s.links.length, 0);

  return (
    <Container className={className}>
      {/* Header */}
      {(title || description) && (
        <div className="flex flex-col gap-element-sm pb-fluid-2xl">
          <h1 className="m-0 font-[family:var(--font-family-lora)]">{title}</h1>
          {description && (
            <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] max-w-2xl m-0">{description}</p>
          )}
          <div className="flex items-center gap-fluid-md text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)] text-[color:var(--color-muted-foreground)] pt-element-xs">
            <span>{sections.length} sections</span>
            <span className="w-1 h-1 rounded-[var(--radius-full)] bg-[color:var(--color-border)]" aria-hidden="true" />
            <span>{totalPages} pages</span>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={cn("grid gap-fluid-lg", gridColumns)}>
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={cn(
              "group/section",
              isCard
                ? "bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-[var(--radius-xl)] p-element-xl hover:border-[color:var(--color-primary)]/20 transition-colors"
                : "pb-element-xl"
            )}
          >
            {/* Section heading */}
            <div className={cn(
              "flex items-center gap-fluid-sm pb-element-sm",
              !isCard && "border-b border-[color:var(--color-border)]"
            )}>
              {section.icon && (
                <div className={cn(
                  "wp-pattern-sitemap-grid__section-icon",
                  section.accentClass || "wp-pattern-sitemap-grid__section-icon--default"
                )}>
                  {section.icon}
                </div>
              )}
              <div className="flex items-baseline gap-fluid-sm">
                <h3 className="m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">{section.title}</h3>
                <span className="text-[color:var(--color-muted-foreground)] text-[length:var(--text-xs)] font-[family:var(--font-family-noto-sans)]">
                  {section.links.length}
                </span>
              </div>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-fluid-xs list-none pl-0 pt-element-md m-0">
              {section.links.map((link, linkIndex) => (
                <SitemapLinkItem key={linkIndex} link={link} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-center pt-element-md pt-fluid-2xl border-t border-[color:var(--color-border)] text-[length:var(--text-xs)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)]">
        Generated from WordPress template hierarchy
      </div>
    </Container>
  );
}