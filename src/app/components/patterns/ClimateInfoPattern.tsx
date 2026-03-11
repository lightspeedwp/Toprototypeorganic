/**
 * Climate Info Pattern Component
 * 
 * Displays weather and seasonal information for destinations.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Cloud, Drop as Droplets, Sun, Thermometer as ThermometerSun, Calendar, Info } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

export interface MonthClimate {
  month: string;
  tempHigh: number;
  tempLow: number;
  rainfall: number;
  rainyDays?: number;
}

export interface SeasonInfo {
  name: string;
  description: string;
  months: string;
  bestFor?: string[];
}

export interface ClimateInfoPatternProps {
  title?: string;
  description?: string;
  monthlyData?: MonthClimate[];
  seasonalInfo?: SeasonInfo[];
  tempUnit?: 'C' | 'F';
  rainfallUnit?: 'mm' | 'in';
  variant?: 'table' | 'seasons';
  className?: string;
}

export function ClimateInfoPattern({
  title = "Climate & Seasons",
  description,
  monthlyData = [],
  seasonalInfo = [],
  tempUnit = 'C',
  rainfallUnit = 'mm',
  variant = 'table',
  className,
}: ClimateInfoPatternProps) {
  return (
    <section className={cn("wp-pattern-lts-climate has-section-padding-md", className)}>
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-[var(--spacing-gap-lg)] mb-[var(--spacing-gap-3xl)]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-[var(--spacing-gap-sm)] mb-[var(--spacing-element-md)]">
              <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] bg-primary/10 text-primary">
                <Cloud className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
              </div>
              <HeadingBlock level={2} className="mb-0">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="text-muted-foreground text-[length:var(--text-lg)] m-0">
                {description}
              </ParagraphBlock>
            )}
          </div>
        </div>

        {/* Display Variants */}
        {variant === 'table' && monthlyData.length > 0 ? (
          <div className="wp-pattern-lts-climate__table-container bg-card border-2 border-border rounded-[var(--radius-3xl)] overflow-hidden shadow-[var(--elevation-sm)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted border-b-2 border-border">
                    <th className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-foreground text-[length:var(--text-lg)]">Month</th>
                    <th className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-foreground text-[length:var(--text-lg)] text-center">High (°{tempUnit})</th>
                    <th className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-foreground text-[length:var(--text-lg)] text-center">Low (°{tempUnit})</th>
                    <th className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-foreground text-[length:var(--text-lg)] text-center">Rain ({rainfallUnit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {monthlyData.map((row, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-foreground font-[var(--font-weight-bold)]">{row.month}</td>
                      <td className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-center">
                        <div className="inline-flex items-center gap-[var(--spacing-gap-xs)] text-warning font-[var(--font-weight-bold)]">
                          <Sun className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> {row.tempHigh}°
                        </div>
                      </td>
                      <td className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-center">
                        <div className="inline-flex items-center gap-[var(--spacing-gap-xs)] text-primary font-[var(--font-weight-bold)]">
                          <ThermometerSun className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> {row.tempLow}°
                        </div>
                      </td>
                      <td className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-center">
                        <div className="inline-flex items-center gap-[var(--spacing-gap-xs)] text-info font-[var(--font-weight-bold)]">
                          <Droplets className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> {row.rainfall}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-gap-lg)] md:gap-[var(--spacing-gap-2xl)]">
            {seasonalInfo.map((season, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="wp-pattern-lts-climate__season-card bg-card border-2 border-border rounded-[var(--radius-3xl)] p-[var(--spacing-element-3xl)] hover:border-primary transition-all duration-500 shadow-[var(--elevation-sm)] hover:shadow-[var(--elevation-xl)] group"
              >
                <div className="flex items-center gap-[var(--spacing-gap-sm)] mb-[var(--spacing-element-2xl)]">
                  <div className="w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)] bg-primary/10 rounded-[var(--radius-2xl)] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-[var(--elevation-sm)]">
                    <Calendar className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" />
                  </div>
                  <div>
                    <h3 className="text-[length:var(--text-2xl)] mb-[var(--spacing-element-xs)]">{season.name}</h3>
                    <p className="text-[length:var(--text-xs)] uppercase tracking-widest text-primary m-0 font-[var(--font-weight-bold)]">{season.months}</p>
                  </div>
                </div>

                <ParagraphBlock className="text-muted-foreground text-[length:var(--text-lg)] leading-relaxed mb-[var(--spacing-gap-2xl)] italic m-0">
                  "{season.description}"
                </ParagraphBlock>

                {season.bestFor && (
                  <div className="pt-[var(--spacing-element-2xl)] border-t border-border/50">
                    <p className="text-[length:var(--text-xs)] uppercase tracking-widest text-foreground mb-[var(--spacing-element-md)] flex items-center gap-[var(--spacing-gap-xs)] font-[var(--font-weight-bold)] m-0">
                      <Info className="w-[var(--spacing-element-xs)] h-[var(--spacing-element-xs)] text-primary" /> Ideal For
                    </p>
                    <div className="flex flex-wrap gap-[var(--spacing-gap-xs)]">
                      {season.bestFor.map((item, i) => (
                        <span key={i} className="px-[var(--spacing-element-lg)] py-[var(--spacing-element-xs)] rounded-[var(--radius-xl)] bg-muted text-[length:var(--text-xs)] text-muted-foreground border border-border/50 font-[var(--font-weight-bold)]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default ClimateInfoPattern;