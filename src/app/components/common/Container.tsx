/**
 * Container component for consistent width constraints and padding.
 * 
 * This component provides the foundational layout constraint used throughout
 * the WordPress block theme. It ensures consistent max-width and fluid
 * horizontal padding across all pages and patterns.
 * 
 * Uses WordPress-aligned BEM class `.wp-container` with modifier variants
 * for max-width. Fluid padding is defined in `/src/styles/common/container.css`
 * using `--spacing-container-sm` / `--spacing-container-md` CSS variables.
 * 
 * @module Container
 * @category common
 */

import { cn } from "../../lib/utils";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
  /** Optional max-width variant */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "narrow" | "wide";
}

/**
 * Max-width modifier map.
 * Each key maps to a WordPress-aligned BEM modifier class
 * defined in `/src/styles/common/container.css`.
 */
const MAX_WIDTH_CLASSES: Record<string, string> = {
  sm: "wp-container--sm",
  md: "wp-container--md",
  lg: "wp-container--lg",
  xl: "wp-container--xl",
  "2xl": "wp-container--2xl",
  full: "wp-container--full",
  narrow: "wp-container--narrow",
  wide: "wp-container--wide",
};

/**
 * Container component for width constraints and padding.
 */
export function Container({ 
  children, 
  className, 
  as: Component = "div",
  maxWidth = "xl" 
}: ContainerProps) {
  return (
    <Component 
      className={cn("wp-container", MAX_WIDTH_CLASSES[maxWidth] || MAX_WIDTH_CLASSES.xl, className)}
    >
      {children}
    </Component>
  );
}

export default Container;
