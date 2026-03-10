/**
 * Feature Card Component
 * 
 * Displays a feature with icon, title, and description.
 * Demonstrates proper use of CSS variables and BEM naming.
 * 
 * Uses WordPress BEM CSS classes (NO dark: Tailwind classes)
 * All styling via /src/styles/patterns/feature-card.css
 * Uses CSS variables from WordPress theme.json
 * 
 * Typography: ONLY uses defined fonts:
 * - Lora (serif) via var(--font-family-lora) for title
 * - Noto Sans (sans-serif) via var(--font-family-noto-sans) for description
 * 
 * @module FeatureCard
 * @category patterns
 * @see /src/styles/patterns/feature-card.css
 * @see /docs/NEW-COMPONENT-GUIDE.md
 */

import { cn } from "../../lib/utils";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

interface FeatureCardProps {
  /** Phosphor icon component to display */
  icon: PhosphorIcon;
  
  /** Feature title */
  title: string;
  
  /** Feature description */
  description: string;
  
  /** Visual variant */
  variant?: "default" | "primary" | "accent";
  
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Feature Card component with icon, title, and description.
 * 
 * @example
 * ```tsx
 * import { Lightning } from "@phosphor-icons/react";
 * 
 * <FeatureCard
 *   icon={Lightning}
 *   title="Fast Performance"
 *   description="Lightning-fast load times"
 *   variant="primary"
 * />
 * ```
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "wp-pattern-feature-card",
        `wp-pattern-feature-card--${variant}`,
        className
      )}
    >
      <div className="wp-pattern-feature-card__icon-wrapper">
        <Icon className="wp-pattern-feature-card__icon" />
      </div>
      <h3 className="wp-pattern-feature-card__title">{title}</h3>
      <p className="wp-pattern-feature-card__description">{description}</p>
    </div>
  );
}
