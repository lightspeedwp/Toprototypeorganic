/**
 * Mobile Menu Panel Pattern
 * 
 * Full-screen mobile navigation overlay with modern, world-class design.
 * Features logo, CTA, theme toggle, search, and smooth animations.
 * 
 * **WordPress Pattern Category:** Navigation
 * **Pattern Slug:** lightspeed/mobile-menu-panel
 * 
 * **Features:**
 * - Full-screen overlay (100% width & height)
 * - Modern visual hierarchy
 * - Logo branding
 * - Attractive close button (top-right corner)
 * - Primary CTA button
 * - Theme toggle (light/dark mode)
 * - Search form (expandable)
 * - Contact quick links
 * - Smooth animations & transitions
 * - Body scroll lock
 * 
 * **Design System Compliance:**
 * - Typography: Lora (headings), Noto Sans (body)
 * - Colors: Semantic tokens only (`bg-background`, `text-foreground`, `text-primary`)
 * - Spacing: Tailwind scale + fluid spacing
 * - Transitions: Smooth CSS animations
 * - Z-Index: 100
 * 
 * @module MobileMenuPanel
 * @category patterns
 */

import { useState, useEffect } from "react";
import { CaretDown as ChevronDown, X, MagnifyingGlass as Search, Phone, EnvelopeSimple as Mail, MapPin, Sun, Moon } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { SiteLogo } from "../blocks/theme/SiteLogo";
import { Button } from "../blocks/design/Button";

/**
 * Menu item interface.
 */
export interface MenuItem {
  id: string;
  title: string;
  url: string;
  isActive?: boolean;
  children?: MenuItem[];
}

/**
 * Props for the MobileMenuPanel pattern.
 */
interface MobileMenuPanelProps {
  /** Whether the panel is visible */
  isOpen: boolean;
  /** Callback when panel should close */
  onClose: () => void;
  /** Menu items to display */
  menu: MenuItem[];
  /** Current theme (light or dark) */
  theme?: 'light' | 'dark';
  /** Callback when theme toggle is clicked */
  onThemeToggle?: () => void;
  /** Callback when CTA is clicked */
  onCTAClick?: () => void;
  /** Callback when navigation link is clicked */
  onNavigate?: (pageId: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Mobile Menu Panel Pattern.
 * 
 * World-class full-screen mobile navigation with modern design.
 * 
 * @component
 * @category patterns
 */
export function MobileMenuPanel({
  isOpen,
  onClose,
  menu,
  theme = 'light',
  onThemeToggle,
  onCTAClick,
  onNavigate,
  className,
}: MobileMenuPanelProps) {
  const [openSubMenus, setOpenSubMenus] = useState<Set<string>>(new Set());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSearchOpen(false);
      setSearchQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        } else {
          handleClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSearchOpen]);

  // Close and reset state
  const handleClose = () => {
    onClose();
    setOpenSubMenus(new Set());
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Toggle submenu
  const toggleSubMenu = (itemId: string) => {
    setOpenSubMenus(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
      // Implement search functionality
      handleClose();
    }
  };

  // Handle CTA click
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
    }
    handleClose();
  };

  // Render nav item
  const renderNavItem = (item: MenuItem, level: number = 0) => {
    const hasSubMenu = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubMenus.has(item.id);

    return (
      <li key={item.id}>
        <div className="flex items-center justify-between gap-2">
          {/* Menu link */}
          <a
            href={item.url}
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              onNavigate?.(item.url);
            }}
            className={cn(
              "flex-1 py-3 px-4 rounded-md",
              "cursor-pointer",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              // Active state
              item.isActive 
                ? "wp-bg-primary-light font-medium" 
                : "text-foreground hover:bg-muted",
              // Level-based size
              level === 0 ? "text-lg" : "text-base ml-6"
            )}
            aria-current={item.isActive ? 'page' : undefined}
          >
            {item.title}
          </a>
          
          {/* Submenu toggle */}
          {hasSubMenu && (
            <button
              onClick={() => toggleSubMenu(item.id)}
              aria-expanded={isSubmenuOpen}
              aria-haspopup="true"
              aria-label={`Toggle ${item.title} submenu`}
              className={cn(
                "p-3 rounded-md",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "transition-all duration-200"
              )}
            >
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isSubmenuOpen && "rotate-180"
                )}
              />
            </button>
          )}
        </div>

        {/* Submenu */}
        {hasSubMenu && isSubmenuOpen && (
          <ul className="mt-2 space-y-1">
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  // Don't render if closed
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "mobile-menu-panel",
        "fixed inset-0 z-[100]",
        "bg-background",
        "overflow-hidden",
        "animate-in fade-in duration-300",
        className
      )}
    >
      {/* Header: Logo + Close Button */}
      <header className="flex items-center justify-between p-6 border-b border-border">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <SiteLogo width="180px" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close menu"
          className={cn(
            "p-3 rounded-full",
            "bg-muted hover:bg-muted/80",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "transition-all duration-200",
            "hover:scale-110 active:scale-95"
          )}
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      {/* Scrollable Content */}
      <div className="overflow-y-auto h-[calc(100vh-80px)]">
        {/* Search Bar */}
        <div className="p-6 border-b border-border">
          {!isSearchOpen ? (
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-lg",
                "bg-muted hover:bg-muted/80",
                "text-muted-foreground",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <Search className="h-5 w-5" />
              <span>Search tours, destinations...</span>
            </button>
          ) : (
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tours, destinations..."
                autoFocus
                className={cn(
                  "w-full pl-12 pr-12 py-4 rounded-lg",
                  "bg-muted border-2 border-primary",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "transition-all duration-200"
                )}
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-md"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          )}
        </div>

        {/* Primary CTA */}
        <div className="p-6 border-b border-border">
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="w-full text-lg py-6"
          >
            <Phone className="h-5 w-5" />
            Request a Quote
          </Button>
        </div>

        {/* Theme Toggle */}
        <div className="p-6 border-b border-border">
          <button
            onClick={onThemeToggle}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-lg",
              "bg-muted hover:bg-muted/80",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Toggle theme"
          >
            <span className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-accent" />
              ) : (
                <Moon className="h-5 w-5 text-info" />
              )}
              <span className="font-medium">
                {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </span>
            <ChevronDown className="h-5 w-5 -rotate-90" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-6" role="navigation" aria-label="Main navigation">
          <h2 className="sr-only">Main Menu</h2>
          <ul className="space-y-2 list-none">
            {menu.map((item) => renderNavItem(item))}
          </ul>
        </nav>

        {/* Quick Contact Links */}
        <div className="p-6 border-t border-border wp-bg-muted-ultralight">
          <h3 className="font-medium mb-4">Get in Touch</h3>
          <div className="space-y-3">
            {/* Phone */}
            <a
              href="tel:+1234567890"
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg",
                "hover:bg-background",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <Phone className="h-5 w-5 text-primary" />
              <span>+1 (234) 567-890</span>
            </a>

            {/* Email */}
            <a
              href="mailto:info@example.com"
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg",
                "hover:bg-background",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <Mail className="h-5 w-5 text-primary" />
              <span>info@example.com</span>
            </a>

            {/* Address */}
            <div
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg",
                "text-foreground"
              )}
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span>123 Travel St, Adventure City</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-6 text-center text-sm text-muted-foreground">
          <p>© 2024 LightSpeed Tours. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}