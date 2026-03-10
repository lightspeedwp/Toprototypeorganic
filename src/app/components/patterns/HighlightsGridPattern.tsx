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
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </div>
              <HeadingBlock level={2} className="mb-0">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="text-muted-foreground text-lg m-0">
                {description}
              </ParagraphBlock>
            )}
          </div>
        </div>

        {/* Highlights Grid */}
        <div className={cn("grid gap-8 md:gap-12", gridClasses)}>
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
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ) : (
                  <div className="p-8 pb-0">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                      {Icon ? <Icon className="size-8" /> : <Sparkles className="size-8" />}
                    </div>
                  </div>
                )}

                {/* Text Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold font-serif mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <ParagraphBlock className="text-muted-foreground leading-relaxed m-0">
                    {item.description}
                  </ParagraphBlock>
                  
                  {isClickable && (
                    <div className="mt-6 pt-6 border-t border-border/50 text-sm font-bold text-primary flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      Explore Detail <span className="text-xl">→</span>
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
                  variant === 'cards' && "bg-card border-2 border-border rounded-3xl shadow-sm hover:shadow-2xl hover:border-primary",
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
