/**
 * SearchBar Pattern - WordPress BEM CSS Version
 * 
 * Global search bar for finding tours, destinations, accommodations, and blog posts.
 * Includes autocomplete suggestions and keyboard navigation.
 * 
 * **Features:**
 * - Real-time search as you type
 * - Autocomplete suggestions
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Recent searches
 * - Search by category filter
 * - Clear button
 * - Mobile-responsive
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css for all styling via CSS
 * - Typography: Noto Sans (body text)
 * - Colors: Semantic tokens (background, foreground, border, muted)
 * - Spacing: Fluid spacing tokens
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/search-bar.css
 * Uses WordPress BEM methodology: .wp-pattern-search__*
 * 
 * @module SearchBar
 * @category patterns
 */

import { useState, useEffect, useRef, FormEvent } from "react";
import { MagnifyingGlass, X, Clock, TrendUp as TrendingUp } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Search suggestion item.
 */
interface SearchSuggestion {
  id: string;
  title: string;
  type: "tour" | "destination" | "accommodation" | "blog";
  excerpt?: string;
}

/**
 * SearchBar component props.
 */
interface SearchBarProps {
  /** Initial search query */
  initialQuery?: string;
  /** Callback when search is submitted */
  onSearch?: (query: string, category?: string) => void;
  /** Show autocomplete suggestions */
  showSuggestions?: boolean;
  /** Show category filter */
  showCategoryFilter?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Auto-focus on mount */
  autoFocus?: boolean;
}

/**
 * SearchBar Pattern Component
 * 
 * @example
 * <SearchBar
 *   placeholder="Search tours, destinations..."
 *   onSearch={(query) => handleSearch(query)}
 *   showSuggestions
 * />
 */
export function SearchBar({
  initialQuery = "",
  onSearch,
  showSuggestions = true,
  showCategoryFilter = false,
  placeholder = "Search tours, destinations, accommodations...",
  className,
  size = "md",
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load recent searches:", e);
      }
    }
  }, []);

  // Auto-focus input if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handle search query change and fetch suggestions.
   */
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.length >= 2 && showSuggestions) {
      // Mock suggestions (in real app, call API)
      const mockSuggestions: SearchSuggestion[] = [
        { id: "1", title: "Safari Adventures", type: "tour" },
        { id: "2", title: "African Safari Tours", type: "tour" },
        { id: "3", title: "Kenya Safari", type: "destination" },
        { id: "4", title: "Safari Lodge Accommodation", type: "accommodation" },
      ].filter((s) => s.title.toLowerCase().includes(value.toLowerCase()));
      
      setSuggestions(mockSuggestions);
      setIsOpen(mockSuggestions.length > 0 || recentSearches.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(recentSearches.length > 0 && value.length === 0);
    }
  };

  /**
   * Handle search submission.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      // Save to recent searches
      const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      
      // Execute search
      if (onSearch) {
        onSearch(query, category !== "all" ? category : undefined);
      }
      
      setIsOpen(false);
    }
  };

  /**
   * Handle suggestion selection.
   */
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setIsOpen(false);
    
    if (onSearch) {
      onSearch(suggestion.title, suggestion.type);
    }
  };

  /**
   * Handle recent search click.
   */
  const handleRecentClick = (search: string) => {
    setQuery(search);
    if (onSearch) {
      onSearch(search, category !== "all" ? category : undefined);
    }
    setIsOpen(false);
  };

  /**
   * Clear search query.
   */
  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  /**
   * Handle keyboard navigation.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = suggestions.length + (query.length === 0 ? recentSearches.length : 0);
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          if (query.length === 0 && selectedIndex < recentSearches.length) {
            handleRecentClick(recentSearches[selectedIndex]);
          } else if (suggestions[selectedIndex]) {
            handleSuggestionClick(suggestions[selectedIndex]);
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className={cn("wp-pattern-search", className)}>
      <form onSubmit={handleSubmit} className="wp-pattern-search__form">
        <div className="wp-pattern-search__input-group">
          {/* Search Input */}
          <div className="wp-pattern-search__input-wrapper">
            <MagnifyingGlass className="wp-pattern-search__search-icon" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "wp-pattern-search__input",
                `wp-pattern-search__input--${size}`
              )}
              aria-label="Search"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-expanded={isOpen}
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="wp-pattern-search__clear-button"
                aria-label="Clear search"
              >
                <X className="wp-pattern-search__clear-icon" />
              </button>
            )}
          </div>

          {/* Category Filter (Optional) */}
          {showCategoryFilter && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={cn(
                "wp-pattern-search__category-select",
                `wp-pattern-search__category-select--${size}`
              )}
              aria-label="Search category"
            >
              <option value="all">All</option>
              <option value="tours">Tours</option>
              <option value="destinations">Destinations</option>
              <option value="accommodation">Accommodation</option>
              <option value="blog">Blog</option>
            </select>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className={cn(
              "wp-pattern-search__submit-button",
              `wp-pattern-search__submit-button--${size}`
            )}
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && showSuggestions && (
        <div
          ref={dropdownRef}
          id="search-suggestions"
          className="wp-pattern-search__dropdown"
          role="listbox"
        >
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="wp-pattern-search__suggestions">
              <div className="wp-pattern-search__section-header">
                <TrendingUp className="wp-pattern-search__section-icon" />
                <span>Suggestions</span>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    "wp-pattern-search__suggestion",
                    selectedIndex === index && "wp-pattern-search__suggestion--selected"
                  )}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <span className="wp-pattern-search__suggestion-title">
                    {suggestion.title}
                  </span>
                  <span className="wp-pattern-search__suggestion-type">
                    {suggestion.type}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="wp-pattern-search__recents">
              <div className="wp-pattern-search__section-header">
                <Clock className="wp-pattern-search__section-icon" />
                <span>Recent Searches</span>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleRecentClick(search)}
                  className={cn(
                    "wp-pattern-search__recent",
                    selectedIndex === index + suggestions.length && 
                      "wp-pattern-search__recent--selected"
                  )}
                  role="option"
                  aria-selected={selectedIndex === index + suggestions.length}
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {suggestions.length === 0 && recentSearches.length === 0 && query.length >= 2 && (
            <div className="wp-pattern-search__no-results">
              No suggestions found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;