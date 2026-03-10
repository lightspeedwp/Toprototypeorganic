/**
 * Inclusions Pattern Component
 * 
 * Displays what is included and excluded in a tour or package.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Check, X, ShieldCheck, WarningCircle as AlertCircle } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

export interface InclusionsPatternProps {
  title?: string;
  description?: string;
  included?: string[];
  excluded?: string[];
  variant?: 'default' | 'card';
  className?: string;
}

export function InclusionsPattern({
  title = "What's Included",
  description,
  included = [],
  excluded = [],
  variant = 'default',
  className,
}: InclusionsPatternProps) {
  const showBothColumns = included.length > 0 && excluded.length > 0;

  return (
    <section className={cn("wp-pattern-lts-inclusions has-section-padding-md", className)}>
      <Container>
        {/* Section Header */}
        <div className="wp-pattern-lts-inclusions__header">
          <div className="wp-pattern-lts-inclusions__header-content">
            <div className="wp-pattern-lts-inclusions__title-wrapper">
              <div className="wp-pattern-lts-inclusions__icon-wrapper">
                <ShieldCheck />
              </div>
              <HeadingBlock level={2} className="wp-pattern-lts-inclusions__title">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="wp-pattern-lts-inclusions__description">
                {description}
              </ParagraphBlock>
            )}
          </div>
        </div>

        {/* Inclusions/Exclusions Grid */}
        <div className={cn(
          "wp-pattern-lts-inclusions__grid",
          showBothColumns ? "wp-pattern-lts-inclusions__grid--two-cols" : ""
        )}>
          {/* Included Items */}
          {included.length > 0 && (
            <div className="wp-pattern-lts-inclusions__col wp-pattern-lts-inclusions__col--included">
              <div className="wp-pattern-lts-inclusions__col-bg-icon">
                <Check weight="bold" />
              </div>
              
              <div className="wp-pattern-lts-inclusions__col-header">
                <div className="wp-pattern-lts-inclusions__col-icon">
                  <Check weight="bold" />
                </div>
                <h3 className="wp-pattern-lts-inclusions__col-title">Included</h3>
              </div>

              <ul className="wp-pattern-lts-inclusions__list">
                {included.map((item, idx) => (
                  <li key={idx} className="wp-pattern-lts-inclusions__item">
                    <Check weight="bold" className="wp-pattern-lts-inclusions__item-icon" />
                    <span className="wp-pattern-lts-inclusions__item-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Excluded Items */}
          {excluded.length > 0 && (
            <div className="wp-pattern-lts-inclusions__col wp-pattern-lts-inclusions__col--excluded">
              <div className="wp-pattern-lts-inclusions__col-bg-icon">
                <AlertCircle weight="bold" />
              </div>

              <div className="wp-pattern-lts-inclusions__col-header">
                <div className="wp-pattern-lts-inclusions__col-icon">
                  <X weight="bold" />
                </div>
                <h3 className="wp-pattern-lts-inclusions__col-title">Not Included</h3>
              </div>

              <ul className="wp-pattern-lts-inclusions__list">
                {excluded.map((item, idx) => (
                  <li key={idx} className="wp-pattern-lts-inclusions__item">
                    <X weight="bold" className="wp-pattern-lts-inclusions__item-icon" />
                    <span className="wp-pattern-lts-inclusions__item-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default InclusionsPattern;
