/**
 * Mobile Menu Toggle Button.
 *
 * Button that toggles mobile menu open/closed state.
 * Shows hamburger icon when closed, X icon when open.
 * 
 * All styling uses CSS custom properties from the design system.
 * Typography: Lora (serif) for headings, Noto Sans (sans-serif) for body/UI.
 *
 * UPDATED: March 2026 - Migrated to Phosphor Icons for better styling options
 *
 * @module MobileMenuToggle
 * @category common
 */

import { List, X } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

interface MobileMenuToggleProps {
  /** Whether the menu is currently open */
  isOpen: boolean;
  /** Callback when toggle is clicked */
  onToggle: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Mobile Menu Toggle Button.
 * 
 * Renders a hamburger (☰) icon when closed, X icon when open.
 * 
 * **Design System:**
 * - Colors: Semantic tokens (`bg-muted`, `text-foreground`)
 * - Typography: Noto Sans (inherited)
 * - Spacing: Tailwind scale (`p-2`)
 * - No hardcoded values
 * 
 * @component
 * @category common
 * 
 * @param {MobileMenuToggleProps} props - Component properties
 * @returns {JSX.Element} Toggle button element
 */
export function MobileMenuToggle({ isOpen, onToggle, className }: MobileMenuToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn("wp-mobile-menu-toggle", className)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <X size={24} weight="bold" aria-hidden="true" />
      ) : (
        <List size={24} weight="bold" aria-hidden="true" />
      )}
    </button>
  );
}

MobileMenuToggle.displayName = "MobileMenuToggle";