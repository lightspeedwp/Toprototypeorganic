/**
 * Search Block Component
 * 
 * WordPress Block: `core/search`
 * Category: Theme
 * 
 * Adds a search form enabling visitors to search site content.
 * Typically placed in headers, sidebars, or footers.
 * 
 * **Features:**
 * - Button inside or outside input
 * - Icon or text button
 * - Customizable placeholder
 * - Focus states and accessibility
 * - Minimum 44px touch targets
 * - Form submission handling
 * 
 * **Design System Compliance:**
 * - Typography: Noto Sans (`var(--font-family-noto-sans)`)
 * - Font sizes: CSS variables
 * - Colors: Semantic tokens only
 * - Borders: CSS variables
 * - Radius: CSS variables
 * - No hardcoded styles
 * 
 * @module Search
 * @category blocks/theme
 * @see /guidelines/blocks/theme/search.md
 */

import { MagnifyingGlass as SearchIcon } from "@phosphor-icons/react";
import { cn } from "../../../lib/utils";
import { useState, FormEvent } from "react";

/**
 * Props for the Search component.
 * 
 * @interface SearchProps
 */
interface SearchProps {
  /**
   * Placeholder text in the input field.
   * Keep concise and descriptive.
   * 
   * @default 'Search…'
   */
  placeholder?: string;
  
  /**
   * Text label for the button.
   * Set to empty string for icon-only button.
   * 
   * @default 'Search'
   */
  buttonLabel?: string;
  
  /**
   * Whether to display a search icon.
   * 
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Position of the button.
   * - 'inside': Icon button inside input (compact)
   * - 'outside': Separate button (clearer affordance)
   * 
   * @default 'outside'
   */
  buttonPosition?: 'inside' | 'outside';
  
  /**
   * Alignment within container.
   * 
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Submit handler function.
   * Receives the search query string.
   */
  onSubmit?: (query: string) => void;
  
  /**
   * Additional CSS classes to apply.
   */
  className?: string;
  
  /**
   * Inline style overrides.
   * Use sparingly; prefer className and CSS variables.
   */
  style?: React.CSSProperties;
}

/**
 * Search Block Component.
 * 
 * Renders a search form with accessible markup and proper styling.
 * 
 * **Usage Guidelines:**
 * 1. Place where users expect: header, sidebar, footer
 * 2. Use visible search on desktop (don't hide behind icons)
 * 3. Provide accessible labels (visible or sr-only)
 * 4. Keep placeholder text concise
 * 5. Use text button label for better accessibility
 * 6. Ensure 44px minimum touch target on mobile
 * 
 * **WordPress Context:**
 * Equivalent to `core/search` block. Form submits to WordPress
 * search endpoint (`?s=search-term`).
 * 
 * **Accessibility:**
 * - Semantic form element with role="search"
 * - Associated labels (visible or sr-only)
 * - Focus indicators on input and button
 * - Enter key submits form
 * - Minimum 44px touch targets
 * 
 * @component
 * @category blocks/theme
 * 
 * @param {SearchProps} props - Component properties
 * @returns {JSX.Element} Rendered search form
 * 
 * @example
 * // Button outside (default)
 * <Search placeholder="Search articles…" />
 * 
 * @example
 * // Button inside (compact for headers)
 * <Search 
 *   buttonPosition="inside"
 *   placeholder="Search..."
 * />
 * 
 * @example
 * // Icon only
 * <Search 
 *   buttonPosition="inside"
 *   buttonLabel=""
 *   showIcon={true}
 * />
 * 
 * @example
 * // With custom handler
 * <Search 
 *   placeholder="Search tours"
 *   onSubmit={(query) => console.log('Search:', query)}
 * />
 */
export function Search({
  placeholder = 'Search…',
  buttonLabel = 'Search',
  showIcon = true,
  buttonPosition = 'outside',
  align = 'left',
  onSubmit,
  className,
  style,
}: SearchProps) {
  const [query, setQuery] = useState('');

  /**
   * Handle form submission.
   * 
   * @param {FormEvent} e - Form event
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(query);
    } else {
      // Default behavior: Navigate to search results page
      window.location.href = `/?s=${encodeURIComponent(query)}`;
    }
  };

  // Container alignment classes
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  // Button inside: Icon button within input field
  if (buttonPosition === 'inside') {
    return (
      <form
        role="search"
        aria-label="Site search"
        onSubmit={handleSubmit}
        className={cn(
          "search-form",
          "flex",
          alignmentClasses[align],
          className
        )}
        style={style}
      >
        <div className="relative w-full max-w-md">
          {/* Hidden label for accessibility */}
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          
          {/* Search input */}
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "w-full",
              "h-11", // 44px minimum touch target
              "px-4 pr-12", // Extra padding-right for button
              "bg-input-background",
              "text-foreground",
              "placeholder:text-muted-foreground",
              "border border-border",
              "rounded-[var(--radius-lg)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "transition-colors"
            )}
          />
          
          {/* Submit button (inside) */}
          <button
            type="submit"
            aria-label={buttonLabel || 'Search'}
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2",
              "h-9 w-9", // Icon button size
              "flex items-center justify-center",
              "bg-primary text-primary-foreground",
              "rounded-[var(--radius-md)]",
              "hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "transition-opacity"
            )}
          >
            {showIcon && <SearchIcon className="h-4 w-4" />}
            {!showIcon && buttonLabel && (
              <span className="text-[length:var(--text-sm)] font-[var(--font-weight-medium)]">{buttonLabel}</span>
            )}
          </button>
        </div>
      </form>
    );
  }

  // Button outside: Separate button
  return (
    <form
      role="search"
      aria-label="Site search"
      onSubmit={handleSubmit}
      className={cn(
        "search-form",
        "flex items-center gap-2",
        alignmentClasses[align],
        className
      )}
      style={style}
    >
      {/* Hidden label for accessibility */}
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      
      {/* Search input */}
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full max-w-md",
          "h-11", // 44px minimum touch target
          "px-4",
          "bg-input-background",
          "text-foreground",
          "placeholder:text-muted-foreground",
          "border border-border",
          "rounded-[var(--radius-lg)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-colors"
        )}
      />
      
      {/* Submit button (outside) */}
      <button
        type="submit"
        aria-label={buttonLabel}
        className={cn(
          "h-11 px-4", // Match input height, 44px minimum
          "flex items-center justify-center gap-2",
          "bg-primary text-primary-foreground",
          "font-medium",
          "rounded-[var(--radius-lg)]",
          "hover:opacity-90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-opacity",
          "whitespace-nowrap"
        )}
      >
        {showIcon && <SearchIcon className="h-4 w-4" />}
        {buttonLabel && <span>{buttonLabel}</span>}
      </button>
    </form>
  );
}
