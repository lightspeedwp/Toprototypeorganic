/**
 * Mobile Menu Template Part
 * 
 * Dedicated template part for mobile navigation.
 * Renders the mobile menu panel pattern when triggered.
 * 
 * **WordPress Template Part:** `parts/mobile-menu.html`
 * 
 * **Features:**
 * - Manages mobile menu state (open/close)
 * - Renders MobileMenuPanel pattern
 * - Provides global access via React Context
 * - Keyboard navigation support
 * - Body scroll lock
 * 
 * **Design System Compliance:**
 * - All styling via patterns
 * - No direct styling in template part
 * - Typography: Inherited from design system
 * - Colors: Inherited from design system
 * 
 * **WordPress Mapping:**
 * Equivalent to `parts/mobile-menu.html` template part.
 * Would be included in `header.html` or rendered globally.
 * 
 * @module MobileMenu
 * @category parts
 * @wordpressPart mobile-menu
 */

import { createContext, useContext, useState, ReactNode } from "react";
import { MobileMenuPanel, MenuItem } from "../patterns/MobileMenuPanel";
import { useTheme } from "../../contexts/ThemeContext";

/**
 * Mobile Menu Context interface.
 * 
 * @interface MobileMenuContextType
 */
interface MobileMenuContextType {
  /** Whether mobile menu is open */
  isOpen: boolean;
  /** Open the mobile menu */
  open: () => void;
  /** Close the mobile menu */
  close: () => void;
  /** Toggle mobile menu open/close */
  toggle: () => void;
  /** Set the menu items */
  setMenu: (menu: MenuItem[]) => void;
  /** Current menu items */
  menu: MenuItem[];
}

/**
 * Mobile Menu Context.
 * Provides global access to mobile menu state.
 */
const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

/**
 * Hook to access mobile menu context.
 * 
 * @returns {MobileMenuContextType} Mobile menu context
 * @throws {Error} If used outside MobileMenuProvider
 * 
 * @example
 * const { open, close, isOpen } = useMobileMenu();
 * 
 * // Open menu
 * open();
 * 
 * // Close menu
 * close();
 * 
 * // Check if open
 * if (isOpen) { ... }
 */
export function useMobileMenu(): MobileMenuContextType {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within MobileMenuProvider');
  }
  return context;
}

/**
 * Props for MobileMenuProvider.
 * 
 * @interface MobileMenuProviderProps
 */
interface MobileMenuProviderProps {
  /** Child components */
  children: ReactNode;
  /** Initial menu items */
  initialMenu?: MenuItem[];
  /** Callback when navigation link is clicked */
  onNavigate?: (pageId: string) => void;
}

/**
 * Mobile Menu Provider.
 * 
 * Wraps the application to provide global mobile menu state.
 * 
 * **Usage:**
 * Wrap your app or page layout with this provider to enable
 * mobile menu functionality anywhere in the component tree.
 * 
 * @component
 * @category parts
 * 
 * @param {MobileMenuProviderProps} props - Component properties
 * @returns {JSX.Element} Provider with children
 * 
 * @example
 * <MobileMenuProvider initialMenu={primaryMenu}>
 *   <App />
 * </MobileMenuProvider>
 */
export function MobileMenuProvider({ 
  children, 
  initialMenu = [],
  onNavigate
}: MobileMenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const { theme, toggleTheme } = useTheme();

  const value: MobileMenuContextType = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
    setMenu,
    menu,
  };

  return (
    <MobileMenuContext.Provider value={value}>
      {children}
      {/* Render mobile menu panel */}
      <MobileMenuPanel 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menu={menu}
        theme={theme}
        onThemeToggle={toggleTheme}
        onNavigate={onNavigate}
      />
    </MobileMenuContext.Provider>
  );
}

/**
 * Props for MobileMenu component.
 * 
 * @interface MobileMenuProps
 */
interface MobileMenuProps {
  /** Menu items to display */
  menu: MenuItem[];
}

/**
 * Mobile Menu Template Part.
 * 
 * Standalone component that can be used without context.
 * Manages its own state internally.
 * 
 * **Usage Guidelines:**
 * 1. Use MobileMenuProvider for global state management
 * 2. Or use this component directly for isolated mobile menu
 * 3. Provide full menu hierarchy with submenus
 * 4. Ensure proper z-index stacking with other overlays
 * 
 * **WordPress Context:**
 * Equivalent to `parts/mobile-menu.html` template part.
 * Would typically be:
 * - Included in header.html
 * - Or rendered at root level in template
 * 
 * **Accessibility:**
 * - Managed by MobileMenuPanel pattern
 * - Keyboard navigation support
 * - ARIA labels and roles
 * - Focus management
 * 
 * @component
 * @category parts
 * @wordpressPart mobile-menu
 * 
 * @param {MobileMenuProps} props - Component properties
 * @returns {JSX.Element} Rendered mobile menu (hidden when closed)
 * 
 * @example
 * // Standalone usage
 * <MobileMenu menu={primaryMenu} />
 * 
 * @example
 * // With provider (recommended)
 * <MobileMenuProvider initialMenu={primaryMenu}>
 *   <App />
 * </MobileMenuProvider>
 * 
 * // Access anywhere in app
 * const { open } = useMobileMenu();
 * <button onClick={open}>Menu</button>
 */
export function MobileMenu({ menu }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileMenuPanel
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      menu={menu}
    />
  );
}