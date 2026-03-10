/**
 * Theme Context
 * 
 * Global theme state management for light/dark mode.
 * Syncs with localStorage and system preferences.
 * 
 * **Features:**
 * - Light/dark mode toggle
 * - LocalStorage persistence
 * - System preference detection
 * - HTML class updates
 * - Global access via hook
 * 
 * **Usage:**
 * Wrap app with ThemeProvider, access theme via useTheme() hook.
 * 
 * @module ThemeContext
 * @category contexts
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Theme type (light or dark).
 */
export type Theme = 'light' | 'dark';

/**
 * Theme context interface.
 */
interface ThemeContextType {
  /** Current theme */
  theme: Theme;
  /** Set theme */
  setTheme: (theme: Theme) => void;
  /** Toggle theme (light ↔ dark) */
  toggleTheme: () => void;
}

/**
 * Theme context.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access theme context.
 * 
 * @returns {ThemeContextType} Theme context
 * @throws {Error} If used outside ThemeProvider
 * 
 * @example
 * const { theme, setTheme, toggleTheme } = useTheme();
 * 
 * // Get current theme
 * console.log(theme); // 'light' or 'dark'
 * 
 * // Set theme
 * setTheme('dark');
 * 
 * // Toggle theme
 * toggleTheme();
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

/**
 * Props for ThemeProvider.
 */
interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
}

/**
 * Theme Provider.
 * 
 * Wraps the application to provide global theme state.
 * 
 * **Features:**
 * - Initializes theme from localStorage or system preference
 * - Updates HTML class when theme changes
 * - Persists theme to localStorage
 * - Provides global access via useTheme() hook
 * 
 * **Usage:**
 * Wrap your app with this provider at the root level.
 * 
 * @component
 * @category contexts
 * 
 * @param {ThemeProviderProps} props - Component properties
 * @returns {JSX.Element} Provider with children
 * 
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // Access anywhere in app
 * const { theme, toggleTheme } = useTheme();
 * <button onClick={toggleTheme}>Toggle Theme</button>
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Synchronous initialisation — avoids blank first frame
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved === "light" || saved === "dark") return saved;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    }
    return "light";
  });

  // Apply the HTML class on mount and whenever theme changes
  useEffect(() => {
    // ALWAYS ACTIVATE ORGANIC REDESIGN
    document.documentElement.classList.add("theme-organic");
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Update theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}