/**
 * Stats Display Component
 *
 * Displays statistics in a grid of cards with icons.
 * Used across multiple pages (DevTools, About, etc.)
 *
 * All styling uses CSS variables from the design system.
 * Icons can be either Lucide or Phosphor (using the new migration).
 *
 * @module StatsDisplay
 * @category common
 */

import * as PhosphorIcons from "@phosphor-icons/react";
import { Container } from "./Container";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface StatItem {
  /** Stat value (number or string) */
  value: string | number;
  /** Stat label */
  label: string;
  /** Optional description (tooltip or subtitle) */
  description?: string;
  /** Icon name from Phosphor Icons */
  icon?: keyof typeof PhosphorIcons;
  /** Icon color class (optional) */
  iconColor?: string;
}

export interface StatsDisplayProps {
  /** Array of stat items to display */
  stats: StatItem[];
  /** Grid columns (responsive) */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Additional CSS classes */
  className?: string;
  /** Whether to use Container wrapper */
  useContainer?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StatsDisplay({
  stats,
  columns = { mobile: 2, tablet: 2, desktop: 4 },
  className = "",
  useContainer = true,
}: StatsDisplayProps) {
  if (!stats || stats.length === 0) return null;

  const gridClasses = `stats-display__grid grid gap-3 
    grid-cols-${columns.mobile} 
    md:grid-cols-${columns.tablet} 
    lg:grid-cols-${columns.desktop}`;

  const content = (
    <div className={`stats-display ${className}`}>
      <div className={gridClasses}>
        {stats.map((stat, index) => {
          // Get Phosphor icon component dynamically
          const IconComponent = stat.icon ? PhosphorIcons[stat.icon] : null;

          return (
            <div
              key={`${stat.label}-${index}`}
              className="stats-display__card"
            >
              {IconComponent && (
                <div className={`stats-display__icon ${stat.iconColor || ""}`}>
                  <IconComponent size={20} weight="duotone" />
                </div>
              )}
              <p className="stats-display__value">{stat.value}</p>
              <p className="stats-display__label">{stat.label}</p>
              {stat.description && (
                <p className="stats-display__description">{stat.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  if (useContainer) {
    return <Container>{content}</Container>;
  }

  return content;
}

StatsDisplay.displayName = "StatsDisplay";