/**
 * Pricing Section Pattern Component
 * 
 * Displays seasonal pricing information in a table or grid layout.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Button } from "../blocks/design/Button";
import { Calendar, Tag, Info } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

export interface PricingRow {
  period: string;
  price: string | number;
  note?: string;
  availability?: 'available' | 'limited' | 'sold-out';
}

export interface PricingSectionPatternProps {
  title?: string;
  description?: string;
  prices: PricingRow[];
  currency?: string;
  priceUnit?: string;
  cta?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'table' | 'cards';
  className?: string;
}

const availabilityClasses = {
  available: "text-success bg-success/10 border-success/20",
  limited: "text-warning bg-warning/10 border-warning/20",
  "sold-out": "text-destructive bg-destructive/10 border-destructive/20",
};

const availabilityLabels = {
  available: "Wide Availability",
  limited: "Limited Spaces",
  "sold-out": "Fully Booked",
};

export function PricingSectionPattern({
  title = "Rates & Availability",
  description,
  prices = [],
  currency = "$",
  priceUnit = "per person",
  cta,
  variant = 'table',
  className,
}: PricingSectionPatternProps) {
  if (prices.length === 0) return null;

  return (
    <section className={cn("wp-pattern-lts-pricing has-section-padding-md", className)}>
      <Container>
        {/* Section Header */}
        <div className="wp-pattern-lts-pricing__header">
          <div className="wp-pattern-lts-pricing__header-content">
            <div className="wp-pattern-lts-pricing__title-wrapper">
              <div className="wp-pattern-lts-pricing__icon-wrapper">
                <Tag />
              </div>
              <HeadingBlock level={2} className="wp-pattern-lts-pricing__title">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="wp-pattern-lts-pricing__description">
                {description}
              </ParagraphBlock>
            )}
          </div>
        </div>

        {/* Pricing Display */}
        {variant === 'table' ? (
          <div className="wp-pattern-lts-pricing__table-container">
            <div className="wp-pattern-lts-pricing__table-scroll">
              <table className="wp-pattern-lts-pricing__table">
                <thead className="wp-pattern-lts-pricing__table-head">
                  <tr>
                    <th className="wp-pattern-lts-pricing__th">Travel Period</th>
                    <th className="wp-pattern-lts-pricing__th wp-pattern-lts-pricing__th--right">Investment</th>
                    <th className="wp-pattern-lts-pricing__th wp-pattern-lts-pricing__th--center">Status</th>
                  </tr>
                </thead>
                <tbody className="wp-pattern-lts-pricing__tbody">
                  {prices.map((row, index) => (
                    <tr key={index} className="wp-pattern-lts-pricing__tr">
                      <td className="wp-pattern-lts-pricing__td">
                        <div className="wp-pattern-lts-pricing__period-cell">
                          <div className="wp-pattern-lts-pricing__period-icon-wrapper">
                            <Calendar />
                          </div>
                          <div>
                            <p className="wp-pattern-lts-pricing__period-title">{row.period}</p>
                            {row.note && (
                              <p className="wp-pattern-lts-pricing__period-note">
                                <Info weight="bold" /> {row.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="wp-pattern-lts-pricing__td wp-pattern-lts-pricing__td--right">
                        <div className="wp-pattern-lts-pricing__price-amount">
                          {currency}{row.price}
                        </div>
                        <div className="wp-pattern-lts-pricing__price-unit">
                          {priceUnit}
                        </div>
                      </td>
                      <td className="wp-pattern-lts-pricing__td wp-pattern-lts-pricing__td--center">
                        {row.availability && (
                          <span className={cn(
                            "wp-pattern-lts-pricing__availability-badge",
                            `wp-pattern-lts-pricing--${row.availability}`
                          )}>
                            {availabilityLabels[row.availability]}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="wp-pattern-lts-pricing__grid">
            {prices.map((row, index) => (
              <div 
                key={index} 
                className="wp-pattern-lts-pricing__card"
              >
                <div className="wp-pattern-lts-pricing__card-header">
                  <div className="wp-pattern-lts-pricing__card-icon-wrapper">
                    <Calendar weight="bold" />
                  </div>
                  <h3 className="wp-pattern-lts-pricing__card-title">
                    {row.period}
                  </h3>
                </div>
                
                <div className="wp-pattern-lts-pricing__card-price-box">
                  <div className="wp-pattern-lts-pricing__card-price-amount">
                    {currency}{row.price}
                  </div>
                  <p className="wp-pattern-lts-pricing__card-price-unit">
                    {priceUnit}
                  </p>
                </div>

                <div className="wp-pattern-lts-pricing__card-actions">
                  {row.availability && (
                    <div className={cn(
                      "wp-pattern-lts-pricing__card-availability",
                      `wp-pattern-lts-pricing--${row.availability}`
                    )}>
                      {availabilityLabels[row.availability]}
                    </div>
                  )}
                  {row.note && (
                    <p className="wp-pattern-lts-pricing__card-note">
                      * {row.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {cta && (
          <div className="wp-pattern-lts-pricing__cta">
            <Button
              variant="primary"
              size="lg"
              onClick={cta.onClick}
            >
              {cta.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default PricingSectionPattern;
