/**
 * Breadcrumbs Pattern - WordPress BEM CSS Version
 * 
 * Hierarchical navigation trail showing current page location.
 * 
 * **Features:**
 * - Hierarchical navigation trail
 * - Home icon optional
 * - Multiple separator styles (chevron, slash, arrow)
 * - Current page indication
 * - Responsive wrapping
 * - Accessible ARIA labels
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to breadcrumb blocks / Yoast SEO breadcrumbs.
 * Maps to:
 * - Breadcrumb navigation block
 * - Schema.org breadcrumb markup
 * 
 * **Design System:**
 * - Typography: Noto Sans via CSS
 * - Colors: Muted foreground for links, primary on hover
 * - Spacing: Consistent gaps between items
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/breadcrumbs.css
 * Uses WordPress BEM methodology: .wp-pattern-breadcrumbs__*
 * 
 * **Accessibility:**
 * - Semantic nav element with aria-label
 * - Ordered list structure
 * - aria-current for current page
 * - Hidden separator icons
 * 
 * UPDATED: March 2026 - Migrated to Phosphor Icons for better styling options
 * 
 * @module BreadcrumbsPattern
 * @category patterns
 */

import { Container } from "../common/Container";
import { CaretRight, House } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Individual breadcrumb item.
 */
export interface BreadcrumbItem {
  /** Display label */
  label: string;
  
  /** Link URL or page ID */
  href?: string;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Is current page */
  isCurrent?: boolean;
}

/**
 * Breadcrumbs pattern props.
 */
export interface BreadcrumbsPatternProps {
  /** Breadcrumb trail items */
  items: BreadcrumbItem[];
  
  /** Show home icon */
  showHomeIcon?: boolean;
  
  /** Separator between items */
  separator?: 'chevron' | 'slash' | 'arrow';
  
  /** Whether the breadcrumbs should be full width (no container max-width) */
  fullWidth?: boolean;
  
  /** Optional custom classes */
  className?: string;
}

/**
 * Breadcrumbs Pattern Component
 * 
 * @example
 * <BreadcrumbsPattern
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Tours", href: "/tours" },
 *     { label: "Safari Adventures", isCurrent: true }
 *   ]}
 *   showHomeIcon
 * />
 */
export function BreadcrumbsPattern({
  items,
  showHomeIcon = true,
  separator = 'chevron',
  fullWidth = false,
  className,
}: BreadcrumbsPatternProps) {
  // Render separator icon
  const renderSeparator = () => {
    if (separator === 'slash') {
      return <span className="wp-pattern-breadcrumbs__separator" aria-hidden="true">/</span>;
    }
    if (separator === 'arrow') {
      return <span className="wp-pattern-breadcrumbs__separator" aria-hidden="true">→</span>;
    }
    // Default: chevron
    return <CaretRight size={14} weight="bold" className="wp-pattern-breadcrumbs__separator" aria-hidden="true" />;
  };

  const content = (
    <nav
      aria-label="Breadcrumb"
      className={cn("wp-pattern-breadcrumbs alignwide wp-container wp-container--xl", className)}
    >
      <ol className="wp-pattern-breadcrumbs__list">
        {items.map((item, index) => (
          <li key={index} className="wp-pattern-breadcrumbs__item">
            {item.isCurrent ? (
              <span
                className="wp-pattern-breadcrumbs__current"
                aria-current="page"
              >
                {index === 0 && showHomeIcon && (
                  <House size={14} weight="fill" className="wp-pattern-breadcrumbs__home-icon" aria-label="Home" />
                )}
                {item.label}
              </span>
            ) : (
              <>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="wp-pattern-breadcrumbs__link"
                  >
                    {index === 0 && showHomeIcon && (
                      <House size={14} weight="fill" className="wp-pattern-breadcrumbs__home-icon" aria-label="Home" />
                    )}
                    {item.label}
                  </button>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="wp-pattern-breadcrumbs__link"
                  >
                    {index === 0 && showHomeIcon && (
                      <House size={14} weight="fill" className="wp-pattern-breadcrumbs__home-icon" aria-label="Home" />
                    )}
                    {item.label}
                  </a>
                ) : (
                  <span className="wp-pattern-breadcrumbs__text">
                    {index === 0 && showHomeIcon && (
                      <House size={14} weight="fill" className="wp-pattern-breadcrumbs__home-icon" aria-label="Home" />
                    )}
                    {item.label}
                  </span>
                )}
                {index < items.length - 1 && renderSeparator()}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );

  return fullWidth ? content : <Container>{content}</Container>;
}

BreadcrumbsPattern.displayName = "BreadcrumbsPattern";