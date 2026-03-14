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
        <div className="flex flex-col md:flex-row justify-between items-end gap-fluid-lg pb-fluid-3xl">
          <div className="max-w-2xl flex flex-col gap-element-md">
            <div className="flex items-center gap-fluid-sm">
              <div className="p-element-sm rounded-[var(--radius-lg)] bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">
                <Cloud className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
              </div>
              <HeadingBlock level={2} className="!m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-lg)] !m-0">
                {description}
              </ParagraphBlock>
            )}
          </div>
        </div>

        {/* Display Variants */}
        {variant === 'table' && monthlyData.length > 0 ? (
          <div className="wp-pattern-lts-climate__table-container bg-[color:var(--color-card)] border-2 border-[color:var(--color-border)] rounded-[var(--radius-3xl)] overflow-hidden shadow-[var(--elevation-sm)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[color:var(--color-muted)] border-b-2 border-[color:var(--color-border)]">
                    <th className="px-element-2xl py-element-lg text-[color:var(--color-foreground)] font-[family:var(--font-family-lora)] text-[length:var(--text-lg)]">Month</th>
                    <th className="px-element-2xl py-element-lg text-[color:var(--color-foreground)] font-[family:var(--font-family-lora)] text-[length:var(--text-lg)] text-center">High (°{tempUnit})</th>
                    <th className="px-element-2xl py-element-lg text-[color:var(--color-foreground)] font-[family:var(--font-family-lora)] text-[length:var(--text-lg)] text-center">Low (°{tempUnit})</th>
                    <th className="px-element-2xl py-element-lg text-[color:var(--color-foreground)] font-[family:var(--font-family-lora)] text-[length:var(--text-lg)] text-center">Rain ({rainfallUnit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--color-border)]/50 font-[family:var(--font-family-noto-sans)]">
                  {monthlyData.map((row, index) => (
                    <tr key={index} className="hover:bg-[color:var(--color-muted)]/30 transition-colors">
                      <td className="px-element-2xl py-element-lg text-[color:var(--color-foreground)] font-[weight:var(--font-weight-bold)]">{row.month}</td>
                      <td className="px-element-2xl py-element-lg text-center">
                        <div className="inline-flex items-center gap-fluid-xs text-[color:var(--color-warning)] font-[weight:var(--font-weight-bold)]">
                          <Sun className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> {row.tempHigh}°
                        </div>
                      </td>
                      <td className="px-element-2xl py-element-lg text-center">
                        <div className="inline-flex items-center gap-fluid-xs text-[color:var(--color-primary)] font-[weight:var(--font-weight-bold)]">
                          <ThermometerSun className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> {row.tempLow}°
                        </div>
                      </td>
                      <td className="px-element-2xl py-element-lg text-center">
                        <div className="inline-flex items-center gap-fluid-xs text-[color:var(--color-info)] font-[weight:var(--font-weight-bold)]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-lg md:gap-fluid-2xl">
            {seasonalInfo.map((season, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="wp-pattern-lts-climate__season-card bg-[color:var(--color-card)] border-2 border-[color:var(--color-border)] rounded-[var(--radius-3xl)] p-element-3xl hover:border-[color:var(--color-primary)] transition-all duration-500 shadow-[var(--elevation-sm)] hover:shadow-[var(--elevation-xl)] group"
              >
                <div className="flex items-center gap-fluid-sm pb-element-2xl">
                  <div className="w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)] bg-[color:var(--color-primary)]/10 rounded-[var(--radius-2xl)] flex items-center justify-center text-[color:var(--color-primary)] group-hover:bg-[color:var(--color-primary)] group-hover:text-[color:var(--color-primary-foreground)] transition-all duration-500 shadow-[var(--elevation-sm)]">
                    <Calendar className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" />
                  </div>
                  <div className="flex flex-col gap-element-xs">
                    <h3 className="text-[length:var(--text-2xl)] !m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">{season.name}</h3>
                    <p className="text-[length:var(--text-xs)] font-[family:var(--font-family-noto-sans)] uppercase tracking-widest text-[color:var(--color-primary)] m-0 font-[weight:var(--font-weight-bold)]">{season.months}</p>
                  </div>
                </div>

                <ParagraphBlock className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-lg)] leading-relaxed pb-fluid-2xl italic !m-0">
                  "{season.description}"
                </ParagraphBlock>

                {season.bestFor && (
                  <div className="pt-element-2xl border-t border-[color:var(--color-border)]/50 flex flex-col gap-element-md">
                    <p className="text-[length:var(--text-xs)] font-[family:var(--font-family-noto-sans)] uppercase tracking-widest text-[color:var(--color-foreground)] flex items-center gap-fluid-xs font-[weight:var(--font-weight-bold)] !m-0">
                      <Info className="w-[var(--spacing-element-xs)] h-[var(--spacing-element-xs)] text-[color:var(--color-primary)]" /> Ideal For
                    </p>
                    <div className="flex flex-wrap gap-fluid-xs">
                      {season.bestFor.map((item, i) => (
                        <span key={i} className="px-element-lg py-element-xs rounded-[var(--radius-xl)] bg-[color:var(--color-muted)] text-[length:var(--text-xs)] font-[family:var(--font-family-noto-sans)] text-[color:var(--color-muted-foreground)] border border-[color:var(--color-border)]/50 font-[weight:var(--font-weight-bold)]">
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