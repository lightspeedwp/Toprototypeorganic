/**
 * Button Block Component
 * 
 * Individual button component used within the Buttons block container.
 * Maps to WordPress core/button block with support for multiple variants,
 * sizes, icons, and accessibility features.
 * 
 * **WordPress Mapping:**
 * - Block: core/button (child of core/buttons)
 * - Category: Design
 * - Supports: Variants, sizes, icons, links, actions
 * 
 * **Design System:**
 * - Typography: var(--font-family-noto-sans), var(--font-weight-medium)
 * - Colors: Semantic tokens (bg-primary, text-primary-foreground, etc.)
 * - Spacing: Consistent padding (px-4 py-2, px-6 py-3, px-8 py-4)
 * - Border radius: rounded-lg (var(--radius-lg))
 * - Focus: ring-2 ring-ring ring-offset-2
 * 
 * **Variants:**
 * - default: Solid background, primary color (same as primary)
 * - primary: Solid background, primary color
 * - secondary: Solid background, secondary color
 * - outline: Transparent with 2px border, hover fills background
 * - ghost: Transparent with hover effect
 * - link: Text-only with underline on hover
 * - cta: Call-to-action style with shadow and semibold text (for high-impact CTAs)
 * 
 * **Sizes:**
 * - sm: 32px min height
 * - default: 44px min height (recommended)
 * - lg: 52px min height
 * 
 * @module Button
 * @category blocks/design
 * @see {@link /guidelines/blocks/design/buttons.md} for full documentation
 */

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * Button component props.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'cta';
  size?: 'sm' | 'default' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  
  // Link-specific props
  target?: string;
  rel?: string;
  
  // Accessibility props
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaHasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
  ariaPressed?: boolean;
  role?: string;
  tabIndex?: number;
}

/**
 * Button component.
 * 
 * Renders a button or link with consistent styling according to the
 * design system. Supports multiple variants, sizes, and icons.
 * 
 * @component
 * @category blocks/design
 * 
 * @example
 * // Default button (same as primary)
 * <Button variant="default">Submit</Button>
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Get Started</Button>
 * 
 * @example
 * // Outline button (secondary action)
 * <Button variant="outline">Learn More</Button>
 * 
 * @example
 * // CTA button (high-impact call-to-action)
 * <Button variant="cta" size="lg">Start Your Safari Today</Button>
 * 
 * @example
 * // Button with icon
 * <Button variant="primary" icon={<ArrowRight />} iconPosition="right">
 *   Continue
 * </Button>
 * 
 * @example
 * // Link button
 * <Button variant="outline" href="/learn-more">
 *   Learn More
 * </Button>
 * 
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} Rendered button or link
 */
export function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = 'button',
  target,
  rel,
  loading,
  ariaDescribedBy,
  ariaExpanded,
  ariaControls,
  ariaHasPopup,
  ariaCurrent,
  ariaPressed,
  role,
  tabIndex,
}: ButtonProps) {
  // Base styles (always applied)
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-lg',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'font-medium',
    'cursor-pointer',
    // Font family from design system
    'relative'
  );

  // Variant styles
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground',
    ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
    link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0',
    cta: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-semibold',
  };

  // Size styles (minimum touch targets for accessibility)
  // Using design system CSS variables for spacing
  const sizeStyles = {
    sm: 'min-h-[32px] text-sm',        // Small: 32px height, smaller text
    default: 'min-h-[44px]',           // Default: 44px (WCAG AA touch target)
    lg: 'min-h-[52px] text-lg',        // Large: 52px height, larger text
  };

  // Padding uses design system spacing variables via Tailwind
  // sm: px-4 py-2 (16px horizontal, 8px vertical)
  // default: px-6 py-3 (24px horizontal, 12px vertical)  
  // lg: px-8 py-4 (32px horizontal, 16px vertical)
  const paddingStyles = {
    sm: 'px-4 py-2',      // Maps to --spacing-element-xs to --spacing-element-sm range
    default: 'px-6 py-3', // Maps to --spacing-element-md range
    lg: 'px-8 py-4',      // Maps to --spacing-element-lg range
  };

  // Icon size based on button size
  const iconSizeClass = {
    sm: 'h-4 w-4',
    default: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  // Combine all styles
  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    variant !== 'link' && sizeStyles[size],
    variant !== 'link' && paddingStyles[size],
    className
  );

  // Common props for both button and link
  const commonProps = {
    className: buttonClasses,
    'aria-label': ariaLabel,
    'aria-disabled': disabled,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    'aria-haspopup': ariaHasPopup,
    'aria-current': ariaCurrent,
    'aria-pressed': ariaPressed,
    role: role,
    tabIndex: tabIndex,
  };

  // Button content with optional icon
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={cn(iconSizeClass[size], 'shrink-0')}>{icon}</span>
      )}
      {children && <span className="whitespace-nowrap">{children}</span>}
      {icon && iconPosition === 'right' && (
        <span className={cn(iconSizeClass[size], 'shrink-0')}>{icon}</span>
      )}
    </>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <a
        {...commonProps}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick?.(e);
        }}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
      >
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button
      {...commonProps}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

Button.displayName = 'Button';