/**
 * Breadcrumbs Component — Single Source of Truth
 *
 * THE canonical breadcrumb component for ALL pages in the prototype.
 * Styled via /src/styles/breadcrumbs.css (dedicated stylesheet).
 *
 * RULE: Every page must use exactly ONE instance of this component.
 *       Never duplicate breadcrumbs. Never create alternative breadcrumb
 *       components. DevToolsBreadcrumbs delegates to this component.
 *
 * Typography: Noto Sans (font-sans) — breadcrumbs are UI, not headings.
 * Colors: All from CSS custom properties via semantic tokens.
 *
 * @module Breadcrumbs
 * @category common
 */

import { AppLink as Link } from './AppLink';
import { CaretRight as ChevronRight } from '@phosphor-icons/react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** URL path (omit for current page) */
  href?: string;
  /** Mark as current page — renders as text, not a link */
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  /** Ordered array of breadcrumb items (root → current page) */
  items: BreadcrumbItem[];
  /** Additional CSS classes on the outer wrapper */
  className?: string;
  /**
   * When true, the component renders its own full-width bar with
   * background and border (the standard page-level breadcrumb strip).
   * When false, it renders just the <nav> — useful when the caller
   * provides the bar wrapper.
   * @default false
   */
  withBar?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({ items, className = '', withBar = false }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  const nav = (
    <nav
      aria-label="Breadcrumb"
      className={`breadcrumb-nav ${className}`}
    >
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrent || isLast;

          return (
            <li key={index} className="breadcrumb-item">
              {/* Separator */}
              {index > 0 && (
                <ChevronRight
                  className="breadcrumb-separator"
                  aria-hidden="true"
                />
              )}

              {/* Link or current label */}
              {isCurrent ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href || '/'}
                  className="breadcrumb-link"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );

  if (withBar) {
    return <div className="breadcrumb-bar">{nav}</div>;
  }

  return nav;
}

Breadcrumbs.displayName = 'Breadcrumbs';