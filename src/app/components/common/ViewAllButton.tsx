/**
 * ViewAllButton Component.
 *
 * A styled button that provides a "View All" link with an arrow icon.
 * Follows design system guidelines for buttons and typography.
 * 
 * All styling uses CSS custom properties from the design system.
 * Typography: Lora (serif) for headings, Noto Sans (sans-serif) for body/UI.
 *
 * UPDATED: March 2026 - Migrated to Phosphor Icons for better styling options
 *
 * @module ViewAllButton
 * @category common
 */

import { Button } from "../blocks/design/Button";
import { ArrowRight } from "@phosphor-icons/react";

/**
 * Props for the ViewAllButton component.
 */
interface ViewAllButtonProps {
  /** The text label for the button. */
  label?: string;
  /** Optional URL for the link. */
  href?: string;
  /** Callback for when the button is clicked. */
  onClick?: () => void;
  /**
   * Additional CSS classes for the wrapper.
   */
  className?: string;
  /**
   * Additional props to pass to the Button component.
   */
  [key: string]: any;
}

/**
 * ViewAllButton Component.
 *
 * @param {ViewAllButtonProps} props - Component properties.
 * @returns {JSX.Element} The rendered View All button.
 */
export function ViewAllButton({ href, label = "View All", onClick, className, ...props }: ViewAllButtonProps) {
  return (
    <Button
      variant="link"
      size="sm"
      className={className}
      onClick={onClick}
      {...props}
    >
      {label}
      <ArrowRight size={16} weight="bold" />
    </Button>
  );
}

ViewAllButton.displayName = "ViewAllButton";