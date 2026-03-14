/**
 * Statistics & Metrics Pattern - WordPress BEM CSS Version
 *
 * Displays key metrics and achievements in a high-impact responsive grid.
 *
 * **WordPress CSS:**
 * Uses BEM classes from `/src/styles/patterns/statistics.css`
 *
 * @module StatisticsMetricsPattern
 * @category patterns
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { cn } from "../../lib/utils";
import { isValidElement, type ReactNode, type ComponentType } from "react";

export interface StatisticItem {
  value: string | number;
  label: string;
  icon?: ReactNode | ComponentType<any>;
  prefix?: string;
  suffix?: string;
}

export interface StatisticsMetricsPatternProps {
  title?: string;
  description?: string;
  statistics?: StatisticItem[];
  metrics?: Array<{ value: string | number; label: string; icon?: string }>;
  variant?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatisticsMetricsPattern({
  title,
  description,
  statistics: statisticsProp,
  metrics,
  variant,
  columns = 4,
  className,
}: StatisticsMetricsPatternProps) {
  // Convert legacy metrics to statistics if needed
  const statistics = statisticsProp || (metrics || []).map(metric => ({
    value: metric.value,
    label: metric.label,
    icon: undefined,
  }));

  const gridModifier = `wp-pattern-statistics__grid--cols-${columns}`;

  return (
    <section className={cn("wp-pattern-statistics", className)}>
      <Container>
        {/* Section Header */}
        {(title || description) && (
          <div className="wp-pattern-statistics__header">
            {title && (
              <HeadingBlock level={2} textAlign="center">
                {title}
              </HeadingBlock>
            )}
            {description && (
              <ParagraphBlock className="wp-pattern-statistics__description">
                {description}
              </ParagraphBlock>
            )}
          </div>
        )}

        {/* Statistics Grid */}
        <div className={cn("wp-pattern-statistics__grid", gridModifier)}>
          {statistics.map((stat, index) => {
            // Handle both JSX elements and component references
            const renderIcon = () => {
              if (!stat.icon) return null;
              if (isValidElement(stat.icon)) return stat.icon;
              if (typeof stat.icon === 'function') {
                const IconComponent = stat.icon as ComponentType<any>;
                return <IconComponent size={24} />;
              }
              return null;
            };

            const iconElement = renderIcon();

            return (
              <div key={index} className="wp-pattern-statistics__item">
                {/* Icon (optional) */}
                {iconElement && (
                  <div className="wp-pattern-statistics__icon-wrapper">
                    <div className="wp-pattern-statistics__icon">
                      {iconElement}
                    </div>
                  </div>
                )}

                {/* Statistic Value */}
                <div className="wp-pattern-statistics__value-wrapper">
                  <span className="wp-pattern-statistics__value">
                    {stat.prefix && (
                      <span className="wp-pattern-statistics__value-affix wp-pattern-statistics__value-affix--prefix">
                        {stat.prefix}
                      </span>
                    )}
                    {stat.value}
                    {stat.suffix && (
                      <span className="wp-pattern-statistics__value-affix wp-pattern-statistics__value-affix--suffix">
                        {stat.suffix}
                      </span>
                    )}
                  </span>
                  {/* Underline decorative element */}
                  <div className="wp-pattern-statistics__underline" />
                </div>

                {/* Statistic Label */}
                <p className="wp-pattern-statistics__label">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}