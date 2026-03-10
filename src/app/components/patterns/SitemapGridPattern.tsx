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
    <li className={cn(depth > 0 && "ml-4")}>
      <a
        href={link.href}
        onClick={(e) => {
          if (link.onClick) {
            e.preventDefault();
            link.onClick();
          }
        }}
        className="wp-pattern-sitemap-grid__link group/link"
      >
        {link.icon ? (
          <span className="wp-pattern-sitemap-grid__link-icon">
            {link.icon}
          </span>
        ) : (
          <ChevronRight
            className="w-3.5 h-3.5 flex-shrink-0 mt-1 text-border group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all"
            aria-hidden="true"
          />
        )}

        <div className="flex-1 min-w-0">
          <span className="font-sans text-sm group-hover/link:text-primary transition-colors">
            {link.title}
          </span>
          {link.description && (
            <p className="text-muted-foreground text-xs mb-0 mt-0.5">
              {link.description}
            </p>
          )}
        </div>

        {link.external && (
          <ExternalLink className="w-3 h-3 text-muted-foreground/40 flex-shrink-0 mt-1" aria-label="External link" />
        )}
      </a>

      {link.children && link.children.length > 0 && (
        <ul className="space-y-0.5 mt-0.5 border-l border-border/50 ml-2 pl-0">
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
        <div className="mb-10">
          <h1>{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>{sections.length} sections</span>
            <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
            <span>{totalPages} pages</span>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={cn("grid gap-6", gridColumns)}>
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={cn(
              "group/section",
              isCard
                ? "bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-colors"
                : "pb-6"
            )}
          >
            {/* Section heading */}
            <div className={cn(
              "flex items-center gap-3 mb-4 pb-3",
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
              <div className="flex items-baseline gap-2">
                <h3 className="mb-0 text-foreground">{section.title}</h3>
                <span className="text-muted-foreground text-xs font-sans">
                  {section.links.length}
                </span>
              </div>
            </div>

            {/* Links */}
            <ul className="space-y-0.5">
              {section.links.map((link, linkIndex) => (
                <SitemapLinkItem key={linkIndex} link={link} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 pt-4 border-t border-border text-xs text-muted-foreground">
        Generated from WordPress template hierarchy
      </div>
    </Container>
  );
}
