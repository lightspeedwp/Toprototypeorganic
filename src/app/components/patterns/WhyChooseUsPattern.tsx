/**
 * Why Choose Us Pattern - WordPress BEM CSS Version
 *
 * Displays value propositions and benefits in a responsive grid.
 *
 * **WordPress CSS:**
 * Uses BEM classes from `/src/styles/patterns/why-choose-us.css`
 *
 * @module WhyChooseUsPattern
 * @category patterns
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { cn } from "../../lib/utils";
import { isValidElement, type ReactNode, type ComponentType } from "react";

export interface FeatureItem {
  icon?: ReactNode | ComponentType<any>;
  title: string;
  description: string;
}

export interface WhyChooseUsPatternProps {
  title?: string;
  description?: string;
  features?: FeatureItem[];
  benefits?: FeatureItem[];
  reasons?: Array<{ id?: string; title: string; description: string; icon?: string }>;
  columns?: 2 | 3 | 4;
  className?: string;
  variant?: string;
}

export function WhyChooseUsPattern({
  title = "Why Choose Us",
  description,
  features: featuresProp,
  benefits,
  reasons,
  columns = 3,
  className,
}: WhyChooseUsPatternProps) {
  // Support features, benefits, or legacy reasons
  const features = featuresProp || benefits || (reasons || []).map(reason => ({
    icon: undefined as any,
    title: reason.title,
    description: reason.description,
  }));

  const gridModifier = `wp-pattern-why-choose-us__grid--cols-${columns}`;

  return (
    <section className={cn("wp-pattern-why-choose-us", className)}>
      <Container>
        {/* Section Header */}
        <div className="wp-pattern-why-choose-us__header">
          <HeadingBlock level={2} textAlign="center">
            {title}
          </HeadingBlock>
          {description && (
            <ParagraphBlock className="wp-pattern-why-choose-us__description" size="lg">
              {description}
            </ParagraphBlock>
          )}
        </div>

        {/* Features Grid */}
        <div className={cn("wp-pattern-why-choose-us__grid", gridModifier)}>
          {features.map((feature, index) => {
            // Handle both JSX elements and component references
            const renderIcon = () => {
              if (!feature.icon) return null;
              if (isValidElement(feature.icon)) return feature.icon;
              if (typeof feature.icon === 'function') {
                const IconComponent = feature.icon as ComponentType<any>;
                return <IconComponent size={40} weight="light" />;
              }
              return null;
            };

            const iconElement = renderIcon();

            return (
              <div key={index} className="wp-pattern-why-choose-us__feature">
                {/* Icon Circle */}
                {iconElement && (
                  <div className="wp-pattern-why-choose-us__icon-wrapper">
                    <div className="wp-pattern-why-choose-us__icon">
                      {iconElement}
                    </div>
                    {/* Decorative element */}
                    <div className="wp-pattern-why-choose-us__icon-decoration" />
                  </div>
                )}

                {/* Content */}
                <HeadingBlock level={4} textAlign="center" className="wp-pattern-why-choose-us__feature-title">
                  {feature.title}
                </HeadingBlock>

                <ParagraphBlock className="wp-pattern-why-choose-us__feature-description">
                  {feature.description}
                </ParagraphBlock>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}