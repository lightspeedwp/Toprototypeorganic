/**
 * Highlights Grid Pattern Component
 * 
 * Displays top attractions or features in a responsive grid.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Sparkle as Sparkles } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { isValidElement, type ReactNode, type ComponentType } from "react";

export interface Highlight {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: ReactNode | ComponentType<{ className?: string }>;
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
        <div className="flex flex-col md:flex-row justify-between items-end gap-fluid-lg pb-fluid-2xl md:pb-fluid-3xl">
          <div className="max-w-2xl flex flex-col gap-element-md">
            <div className="flex items-center gap-fluid-sm">
              <div className="p-element-sm rounded-[var(--radius-lg)] bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">
                <Sparkles className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
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

        {/* Highlights Grid */}
        <div className={cn("grid gap-fluid-lg md:gap-fluid-xl", gridClasses)}>
          {highlights.map((item, idx) => {
            const isClickable = !!(item.href || item.onClick);

            // Render icon: handle both JSX elements and component references
            const renderIcon = () => {
              if (!item.icon) return <Sparkles className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" />;
              if (isValidElement(item.icon)) return item.icon;
              if (typeof item.icon === 'function') {
                const IconComponent = item.icon as ComponentType<{ className?: string }>;
                return <IconComponent className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" />;
              }
              return <Sparkles className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" />;
            };

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
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-background)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ) : (
                  <div className="p-element-2xl pb-0">
                    <div className="w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)] rounded-[var(--radius-2xl)] bg-[color:var(--color-primary)]/10 flex items-center justify-center text-[color:var(--color-primary)] group-hover:bg-[color:var(--color-primary)] group-hover:text-[color:var(--color-primary-foreground)] transition-all duration-500 shadow-[var(--elevation-sm)]">
                      {renderIcon()}
                    </div>
                  </div>
                )}

                {/* Text Content */}
                <div className="p-element-xl flex flex-col flex-1">
                  <div className="flex-1 flex flex-col gap-element-md">
                    <h3 className="text-[length:var(--text-2xl)] !m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors">
                      {item.title}
                    </h3>
                    <ParagraphBlock className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] leading-relaxed !m-0">
                      {item.description}
                    </ParagraphBlock>
                  </div>
                  
                  {isClickable && (
                    <div className="pt-element-lg border-t border-[color:var(--color-border)]/50 text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)] text-[color:var(--color-primary)] flex items-center gap-fluid-xs opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <strong className="font-[weight:var(--font-weight-bold)]">Explore Detail</strong> <span className="text-[length:var(--text-xl)]">→</span>
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