/**
 * Site Header component using WordPress theme blocks.
 * 
 * Modernized header using the new theme block components:
 * - SiteLogo (core/site-logo)
 * - Navigation (core/navigation)
 * - Search (core/search) - Modal overlay
 * 
 * **Features:**
 * - Clean, WordPress-aligned structure
 * - Theme switching (light/dark mode)
 * - Search modal (icon opens overlay)
 * - Responsive design
 * - Mobile menu support
 * - Design system compliance (CSS variables only)
 * 
 * @module HeaderNew
 * @category parts
 * @wordpressPart header
 */

import { Sun, Moon, MagnifyingGlass as SearchIcon, X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../common/Container";
import { Navigation, Search, SiteLogo, MenuItem } from "../blocks/theme";
import { MobileMenuToggle } from "../common/MobileMenuToggle";
import { useMobileMenu } from "./MobileMenu";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../lib/utils";

/**
 * Props for the HeaderNew component.
 * 
 * @interface HeaderNewProps
 */
interface HeaderNewProps {
  /** Current active page ID */
  currentPage?: string;
  /** Callback when navigation link is clicked */
  onNavigate?: (pageId: string) => void;
}

/**
 * Primary navigation menu configuration.
 */
const PRIMARY_MENU: MenuItem[] = [
  {
    id: "tours",
    title: "Tours",
    url: "tour-archive-wp",
    children: [
      { id: "tours-all", title: "All Tours", url: "tour-archive-wp" },
      { id: "tours-detail", title: "Tour Detail", url: "tour-single-wp" },
      { id: "tours-styles", title: "Travel Styles", url: "taxonomy-archive" },
    ],
  },
  {
    id: "destinations",
    title: "Destinations",
    url: "destination-archive-wp",
    children: [
      { id: "dest-all", title: "All Destinations", url: "destination-archive-wp" },
      { id: "dest-detail", title: "Destination Detail", url: "destination-single-wp" },
    ],
  },
  {
    id: "accommodation",
    title: "Accommodation",
    url: "accommodation-archive",
  },
  {
    id: "blog",
    title: "Blog",
    url: "blog-archive",
  },
  {
    id: "about",
    title: "About",
    url: "about-page",
    children: [
      { id: "about-story", title: "Our Story", url: "about-page" },
      { id: "about-team", title: "Meet the Team", url: "team-archive" },
      { id: "about-faq", title: "FAQ", url: "faq-page" },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    url: "contact-page",
  },
];

/**
 * Site Header component using WordPress theme blocks.
 * 
 * Clean, modern header implementation using block-based architecture:
 * - Logo and site title for branding
 * - Navigation with submenu support
 * - Search functionality
 * - Theme switcher
 * - Mobile responsive
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to `parts/header.html` template part.
 * Uses WordPress core blocks:
 * - core/site-logo
 * - core/navigation
 * - core/search
 * 
 * **Design System:**
 * - Typography: Lora (headings), Noto Sans (UI)
 * - Colors: Semantic tokens only
 * - Spacing: Tailwind scale
 * - All styling via CSS variables
 * 
 * @component
 * @category parts
 * @wordpressPart header
 * 
 * @param {HeaderNewProps} props - Component properties
 * @returns {JSX.Element} Rendered header element
 */
export function HeaderNew({ currentPage, onNavigate }: HeaderNewProps) {
  const { theme, toggleTheme } = useTheme();

  // Mark active menu item
  const menuWithActive = PRIMARY_MENU.map(item => ({
    ...item,
    isActive: item.url === currentPage,
    children: item.children?.map(child => ({
      ...child,
      isActive: child.url === currentPage,
    })),
  }));

  // Handle search submission
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    setIsSearchOpen(false); // Close modal after search
    // In a real app, navigate to search results page
    // onNavigate?.('search-results');
  };

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile menu context
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, setMenu } = useMobileMenu();

  // Update mobile menu items when component mounts or page changes
  useEffect(() => {
    setMenu(menuWithActive);
  }, [currentPage]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between gap-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <SiteLogo 
              width="220px"
              onClick={() => onNavigate?.('home-page')}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center flex-1">
            <Navigation
              menu={menuWithActive}
              orientation="horizontal"
              spacing="6"
              align="center"
              className="flex-1"
              onNavigate={onNavigate}
            />
          </div>

          {/* Actions: Search + Theme Switcher */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "p-2 rounded-md",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "transition-colors"
              )}
              aria-label="Open search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-md",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "transition-colors"
              )}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between gap-4 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <SiteLogo 
              width="150px"
              onClick={() => onNavigate?.('home-page')}
            />
          </div>

          {/* Actions: Search + Theme Switcher + Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Search Icon (Mobile) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "p-2 rounded-md",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "transition-colors"
              )}
              aria-label="Open search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Theme Switcher (Mobile) */}
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-md",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "transition-colors"
              )}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <MobileMenuToggle 
              isOpen={isMobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </div>
        </div>
      </Container>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-[120] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background p-6 rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
              <Search
                placeholder="Search tours, destinations..."
                buttonPosition="inside"
                onSubmit={handleSearch}
                className="w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}