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
        <div className="flex flex-col md:flex-row justify-between items-end gap-[var(--spacing-gap-lg)] mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-[var(--spacing-gap-sm)] mb-[var(--spacing-element-md)]">
              <div className="p-2 rounded-[var(--radius-lg)] bg-primary/10 text-primary">
                <Cloud className="size-5" />
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
                      <td className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-foreground font-bold">{row.month}</td>
                      <td className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-center">
                        <div className="inline-flex items-center gap-[var(--spacing-gap-xs)] text-warning font-bold">
                          <Sun className="size-4" /> {row.tempHigh}°
                        </div>
                      </td>
                      <td className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-center">
                        <div className="inline-flex items-center gap-[var(--spacing-gap-xs)] text-primary font-bold">
                          <ThermometerSun className="size-4" /> {row.tempLow}°
                        </div>
                      </td>
                      <td className="px-[var(--spacing-element-2xl)] py-[var(--spacing-element-lg)] text-center">
                        <div className="inline-flex items-center gap-[var(--spacing-gap-xs)] text-info font-bold">
                          <Droplets className="size-4" /> {row.rainfall}
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
                  <div className="size-14 bg-primary/10 rounded-[var(--radius-2xl)] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-[var(--elevation-sm)]">
                    <Calendar className="size-7" />
                  </div>
                  <div>
                    <h3 className="text-[length:var(--text-2xl)] mb-1">{season.name}</h3>
                    <p className="text-[length:var(--text-xs)] uppercase tracking-widest text-primary m-0 font-bold">{season.months}</p>
                  </div>
                </div>

                <ParagraphBlock className="text-muted-foreground text-[length:var(--text-lg)] leading-relaxed mb-8 italic">
                  "{season.description}"
                </ParagraphBlock>

                {season.bestFor && (
                  <div className="pt-8 border-t border-border/50">
                    <p className="text-[10px] uppercase tracking-widest text-foreground mb-4 flex items-center gap-[var(--spacing-gap-xs)] font-bold">
                      <Info className="size-3 text-primary" /> Ideal For
                    </p>
                    <div className="flex flex-wrap gap-[var(--spacing-gap-xs)]">
                      {season.bestFor.map((item, i) => (
                        <span key={i} className="px-4 py-1.5 rounded-[var(--radius-xl)] bg-muted text-[length:var(--text-xs)] text-muted-foreground border border-border/50 font-bold">
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