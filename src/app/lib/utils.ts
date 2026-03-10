/**
 * Utility functions for the LightSpeed Tour Operator plugin.
 * 
 * This module provides common utility functions used throughout
 * the application, primarily for CSS class name manipulation.
 * 
 * @module utils
 * @category utility
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges CSS class names using clsx and tailwind-merge.
 * 
 * This utility function combines multiple class names and intelligently
 * resolves Tailwind CSS conflicts using tailwind-merge. When multiple
 * Tailwind classes target the same property (e.g., "p-4" and "p-6"),
 * the last class wins.
 * 
 * This is the **recommended way** to conditionally apply classes in all
 * components throughout the application.
 * 
 * **Why tailwind-merge?**
 * 
 * Without tailwind-merge:
 * - `className="p-4 p-6"` → Both classes applied → Conflict!
 * 
 * With tailwind-merge:
 * - `className="p-4 p-6"` → Only "p-6" applied → Correct!
 * 
 * **Common Use Cases:**
 * 1. Merging base classes with optional className prop
 * 2. Conditional classes based on state/props
 * 3. Responsive class variations
 * 4. Combining multiple class sources
 * 
 * @function cn
 * @category utility
 * 
 * @param {...ClassValue[]} inputs - Class names to merge. Can be:
 *   - Strings: `"text-sm font-bold"`
 *   - Objects: `{ "text-primary": isActive }`
 *   - Arrays: `["text-sm", isActive && "text-primary"]`
 *   - Falsy values (ignored): `false`, `null`, `undefined`
 * 
 * @returns {string} Merged and deduplicated class name string
 * 
 * @example
 * // Simple string merging
 * cn("text-sm", "font-bold")
 * // => "text-sm font-bold"
 * 
 * @example
 * // Conditional classes
 * const isActive = true;
 * cn("text-sm", isActive && "text-primary")
 * // => "text-sm text-primary"
 * 
 * @example
 * // Resolving Tailwind conflicts (last class wins)
 * cn("p-4", "p-6")
 * // => "p-6"
 * 
 * @example
 * // Common component pattern
 * interface ButtonProps {
 *   className?: string;
 *   variant?: "primary" | "secondary";
 * }
 * 
 * function Button({ className, variant = "primary" }: ButtonProps) {
 *   return (
 *     <button
 *       className={cn(
 *         "px-4 py-2 rounded-md",
 *         variant === "primary" && "bg-primary text-primary-foreground",
 *         variant === "secondary" && "bg-secondary text-secondary-foreground",
 *         className
 *       )}
 *     >
 *       Click me
 *     </button>
 *   );
 * }
 * 
 * @example
 * // Object syntax for conditional classes
 * cn({
 *   "text-primary": isActive,
 *   "text-muted": !isActive,
 *   "font-bold": isBold,
 * })
 * // => "text-primary font-bold" (if isActive && isBold)
 * 
 * @example
 * // Array syntax with mixed types
 * cn([
 *   "base-class",
 *   condition && "conditional-class",
 *   { "object-class": true }
 * ])
 * // => "base-class conditional-class object-class" (if condition is true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
