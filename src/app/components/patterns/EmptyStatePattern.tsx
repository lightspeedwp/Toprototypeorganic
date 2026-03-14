/**
 * Empty State Pattern Component
 * 
 * Helpful feedback when no content or results are available.
 * Strictly adheres to design system tokens and BEM naming.
 */

import React from "react";
import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Button } from "../blocks/design/Button";
import { MagnifyingGlass as Search, Funnel as Filter, Package, WarningCircle as AlertCircle, ArrowsCounterClockwise as RefreshCcw } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

export interface EmptyStatePatternProps {
  icon?: 'search' | 'empty' | 'filter' | 'error' | React.ReactNode;
  title?: string;
  message?: string;
  description?: string;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  }>;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  className?: string;
}

const iconMap = {
  search: Search,
  empty: Package,
  filter: Filter,
  error: AlertCircle,
};

export function EmptyStatePattern({
  icon = 'search',
  title = "No Results Found",
  message,
  description,
  actions = [],
  primaryAction,
  secondaryAction,
  className,
}: EmptyStatePatternProps) {
  const displayMessage = message || description || "We couldn't find what you're looking for. Try adjusting your filters or search terms.";

  let IconComp = Search;
  let isCustomIcon = false;

  if (typeof icon === 'string' && iconMap[icon as keyof typeof iconMap]) {
    IconComp = iconMap[icon as keyof typeof iconMap];
  } else if (React.isValidElement(icon)) {
    isCustomIcon = true;
  }

  const resolvedActions = [...actions];
  if (primaryAction) resolvedActions.push({ ...primaryAction, variant: 'primary' });
  if (secondaryAction) resolvedActions.push({ ...secondaryAction, variant: 'outline' });

  return (
    <section className={cn("wp-pattern-lts-empty-state py-section-md", className)}>
      <Container maxWidth="narrow">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center flex flex-col items-center"
        >
          {/* Icon Wrapper */}
          <div className="flex justify-center pb-fluid-2xl">
            <div className="w-[var(--spacing-element-5xl)] h-[var(--spacing-element-5xl)] rounded-[var(--radius-3xl)] bg-[color:var(--color-muted)] flex items-center justify-center text-[color:var(--color-muted-foreground)]/40 relative">
              <div className="absolute inset-0 bg-[color:var(--color-primary)]/5 rounded-[var(--radius-3xl)] animate-pulse" />
              {isCustomIcon ? icon : <IconComp className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)] relative z-10" aria-hidden="true" />}
            </div>
          </div>

          {/* Text Content */}
          <HeadingBlock level={2} textAlign="center" className="pb-element-md !m-0 text-[length:var(--text-3xl)] md:text-[length:var(--text-4xl)] font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">
            {title}
          </HeadingBlock>
          
          <ParagraphBlock className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-lg)] pb-fluid-3xl max-w-lg self-center !m-0">
            {displayMessage}
          </ParagraphBlock>

          {/* Actions */}
          {resolvedActions.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-fluid-md">
              {resolvedActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant as any || 'outline'}
                  size="lg"
                  onClick={action.onClick}
                  className="rounded-[var(--radius-xl)] px-element-2xl min-w-[160px]"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
          
          {resolvedActions.length === 0 && (
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-fluid-sm text-primary font-[var(--font-weight-bold)] hover:underline underline-offset-8 transition-all"
            >
              <RefreshCcw className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" /> Refresh Discovery
            </button>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

export default EmptyStatePattern;