/**
 * Highlights Grid Pattern Component
 * 
 * Displays top attractions or features in a responsive grid.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Icon as PhosphorIcon, Sparkle as Sparkles } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

export interface Highlight {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: PhosphorIcon;
  href?: string;
  onClick?: () => void;
}

export interface HighlightsGridPatternProps {
  title?: string;
  description?: string;
  highlights: Highlight[];
  columns?: 2 | 3 | 4;
  variant?: 'cards' | 'minimal' | 'featured';
  className?: string;
}

export function HighlightsGridPattern({
  title = "Trip Highlights",
  description,
  highlights = [],
  columns = 3,
  variant = 'cards',
  className,
}: HighlightsGridPatternProps) {
  if (highlights.length === 0) return null;

  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className={cn("wp-pattern-lts-highlights has-section-padding-md", className)}>
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-[var(--spacing-gap-lg)] mb-[var(--spacing-gap-2xl)] md:mb-[var(--spacing-gap-3xl)]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-[var(--spacing-gap-sm)] mb-[var(--spacing-element-md)]">
              <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] bg-primary/10 text-primary">
                <Sparkles className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
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

        {/* Highlights Grid */}
        <div className={cn("grid gap-[var(--spacing-gap-lg)] md:gap-[var(--spacing-gap-xl)]", gridClasses)}>
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            const isClickable = !!(item.href || item.onClick);

            const cardContent = (
              <div className="flex flex-col h-full">
                {/* Image or Icon Container */}
                {item.image ? (
                  <div className="wp-pattern-lts-highlights__media aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ) : (
                  <div className="p-[var(--spacing-element-2xl)] pb-0">
                    <div className="w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)] rounded-[var(--radius-2xl)] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-[var(--elevation-sm)]">
                      {Icon ? <Icon className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" /> : <Sparkles className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" />}
                    </div>
                  </div>
                )}

                {/* Text Content */}
                <div className="p-[var(--spacing-element-xl)] flex flex-col flex-1">
                  <h3 className="text-[length:var(--text-2xl)] mb-[var(--spacing-element-md)] group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <ParagraphBlock className="text-muted-foreground leading-relaxed m-0">
                    {item.description}
                  </ParagraphBlock>
                  
                  {isClickable && (
                    <div className="mt-[var(--spacing-element-lg)] pt-[var(--spacing-element-lg)] border-t border-border/50 text-[length:var(--text-sm)] text-primary flex items-center gap-[var(--spacing-gap-xs)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <strong className="font-[var(--font-weight-bold)]">Explore Detail</strong> <span className="text-[length:var(--text-xl)]">→</span>
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "wp-pattern-lts-highlights__item group relative flex flex-col overflow-hidden transition-all duration-500",
                  variant === 'cards' && "bg-card border-2 border-border rounded-[var(--radius-3xl)] shadow-[var(--elevation-sm)] hover:shadow-[var(--elevation-2xl)] hover:border-primary",
                  variant === 'minimal' && "bg-transparent",
                  isClickable && "cursor-pointer"
                )}
                onClick={item.onClick}
              >
                {item.href ? (
                  <a href={item.href} className="no-underline h-full" onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}>
                    {cardContent}
                  </a>
                ) : cardContent}
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default HighlightsGridPattern;