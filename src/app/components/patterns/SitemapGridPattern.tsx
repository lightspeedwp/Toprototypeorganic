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
    <li className={cn(depth > 0 && "ml-[var(--spacing-element-md)]")}>
      <a
        href={link.href}
        onClick={(e) => {
          if (link.onClick) {
            e.preventDefault();
            link.onClick();
          }
        }}
        className="wp-pattern-sitemap-grid__link group/link flex gap-[var(--spacing-gap-sm)] p-[var(--spacing-element-xs)] no-underline"
      >
        {link.icon ? (
          <span className="wp-pattern-sitemap-grid__link-icon">
            {link.icon}
          </span>
        ) : (
          <ChevronRight
            className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)] flex-shrink-0 mt-[var(--spacing-element-xs)] text-border group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all"
            aria-hidden="true"
          />
        )}

        <div className="flex-1 min-w-0">
          <span className="font-[var(--font-family-noto-sans)] text-[length:var(--text-sm)] group-hover/link:text-primary transition-colors">
            {link.title}
          </span>
          {link.description && (
            <p className="text-muted-foreground text-[length:var(--text-xs)] mb-0 mt-0.5">
              {link.description}
            </p>
          )}
        </div>

        {link.external && (
          <ExternalLink className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)] text-muted-foreground/40 flex-shrink-0 mt-[var(--spacing-element-xs)]" aria-label="External link" />
        )}
      </a>

      {link.children && link.children.length > 0 && (
        <ul className="space-y-[var(--spacing-gap-xs)] mt-[var(--spacing-element-xs)] border-l border-border/50 ml-[var(--spacing-element-sm)] pl-0 list-none">
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
        <div className="mb-[var(--spacing-gap-2xl)]">
          <h1>{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-[var(--spacing-element-sm)] max-w-2xl">{description}</p>
          )}
          <div className="flex items-center gap-[var(--spacing-gap-md)] mt-[var(--spacing-element-md)] text-[length:var(--text-sm)] text-muted-foreground">
            <span>{sections.length} sections</span>
            <span className="w-1 h-1 rounded-[var(--radius-full)] bg-border" aria-hidden="true" />
            <span>{totalPages} pages</span>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={cn("grid gap-[var(--spacing-gap-lg)]", gridColumns)}>
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={cn(
              "group/section",
              isCard
                ? "bg-card border border-border rounded-[var(--radius-xl)] p-[var(--spacing-element-xl)] hover:border-primary/20 transition-colors"
                : "pb-[var(--spacing-element-xl)]"
            )}
          >
            {/* Section heading */}
            <div className={cn(
              "flex items-center gap-[var(--spacing-gap-sm)] mb-[var(--spacing-element-md)] pb-[var(--spacing-element-sm)]",
              !isCard && "border-b border-border"
            )}>
              {section.icon && (
                <div className={cn(
                  "wp-pattern-sitemap-grid__section-icon",
                  section.accentClass || "wp-pattern-sitemap-grid__section-icon--default"
                )}>
                  {section.icon}
                </div>
              )}
              <div className="flex items-baseline gap-[var(--spacing-gap-sm)]">
                <h3 className="mb-0 text-foreground">{section.title}</h3>
                <span className="text-muted-foreground text-[length:var(--text-xs)] font-[var(--font-family-noto-sans)]">
                  {section.links.length}
                </span>
              </div>
            </div>

            {/* Links */}
            <ul className="space-y-[var(--spacing-gap-xs)] list-none pl-0">
              {section.links.map((link, linkIndex) => (
                <SitemapLinkItem key={linkIndex} link={link} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-[var(--spacing-gap-2xl)] pt-[var(--spacing-element-md)] border-t border-border text-[length:var(--text-xs)] text-muted-foreground">
        Generated from WordPress template hierarchy
      </div>
    </Container>
  );
}