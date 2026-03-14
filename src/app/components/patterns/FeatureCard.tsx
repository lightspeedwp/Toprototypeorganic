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
import { isValidElement, type ReactNode, type ComponentType } from "react";
import { BotanicalCorner } from "../common/organic/OrganicAssets";

interface FeatureCardProps {
  /** Icon component or JSX element to display */
  icon: ReactNode | ComponentType<any>;
  
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
  icon,
  title,
  description,
  variant = "default",
  className,
}: FeatureCardProps) {
  // Handle both JSX elements and component references
  const renderIcon = () => {
    if (isValidElement(icon)) return icon;
    if (typeof icon === 'function') {
      const IconComponent = icon as ComponentType<any>;
      return <IconComponent className="wp-pattern-feature-card__icon" />;
    }
    return null;
  };

  return (
    <div
      className={cn(
        "wp-pattern-feature-card group has-organic-assets",
        `wp-pattern-feature-card--${variant}`,
        className
      )}
    >
      {/* Decorative Botanical Flourish */}
      <BotanicalCorner className="wp-part-botanical-ornament--bottom-right-small" />

      <div className="wp-pattern-feature-card__icon-wrapper relative z-10">
        {renderIcon()}
      </div>
      <h3 className="wp-pattern-feature-card__title relative z-10">{title}</h3>
      <p className="wp-pattern-feature-card__description relative z-10">{description}</p>
    </div>
  );
}