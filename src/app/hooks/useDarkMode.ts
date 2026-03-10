/**
 * useDarkMode Hook
 * 
 * Manage dark mode state with localStorage persistence.
 * 
 * **Features:**
 * - Toggle dark/light mode
 * - Persist preference to localStorage
 * - Auto-apply .dark class to document root
 * - System preference detection (optional)
 * - SSR-safe
 * 
 * @module useDarkMode
 * @category hooks
 */

import { useState, useEffect } from "react";

/**
 * Dark mode hook return type.
 */
interface UseDarkModeReturn {
  /** Current dark mode state */
  isDarkMode: boolean;
  
  /** Toggle dark mode */
  toggle: () => void;
  
  /** Set dark mode explicitly */
  setDarkMode: (isDark: boolean) => void;
}

/**
 * useDarkMode Hook.
 * 
 * Manage dark mode with localStorage persistence.
 * 
 * **Usage:**
 * 
 * Basic usage:
 * ```tsx
 * function DarkModeToggle() {
 *   const { isDarkMode, toggle } = useDarkMode();
 *   
 *   return (
 *     <button onClick={toggle}>
 *       {isDarkMode ? "Light Mode" : "Dark Mode"}
 *     </button>
 *   );
 * }
 * ```
 * 
 * With explicit control:
 * ```tsx
 * const { isDarkMode, setDarkMode } = useDarkMode();
 * 
 * <button onClick={() => setDarkMode(true)}>Dark</button>
 * <button onClick={() => setDarkMode(false)}>Light</button>
 * ```
 * 
 * @param defaultValue - Default dark mode state (default: false)
 * @param useSystemPreference - Use system preference if no saved value (default: false)
 * @returns Dark mode state and controls
 */
export function useDarkMode(
  defaultValue: boolean = false,
  useSystemPreference: boolean = false
): UseDarkModeReturn {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // SSR-safe: return default during server render
    if (typeof window === "undefined") {
      return defaultValue;
    }

    // Check localStorage first
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return saved === "true";
    }

    // Check system preference if enabled
    if (useSystemPreference && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return defaultValue;
  });

  // Apply dark mode class to document
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  // Listen for system preference changes (optional)
  useEffect(() => {
    if (!useSystemPreference || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no saved preference
      const saved = localStorage.getItem("darkMode");
      if (saved === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [useSystemPreference]);

  const toggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  return {
    isDarkMode,
    toggle,
    setDarkMode,
  };
}

/**
 * Get current theme (light or dark).
 */
export function useTheme(): "light" | "dark" {
  const { isDarkMode } = useDarkMode();
  return isDarkMode ? "dark" : "light";
}

/**
 * DarkModeProvider Component (Optional).
 * 
 * Wrap app to initialize dark mode on mount.
 * 
 * **Usage:**
 * ```tsx
 * <DarkModeProvider useSystemPreference>
 *   <App />
 * </DarkModeProvider>
 * ```
 */
export function DarkModeProvider({
  children,
  defaultValue = false,
  useSystemPreference = false,
}: {
  children: React.ReactNode;
  defaultValue?: boolean;
  useSystemPreference?: boolean;
}) {
  useDarkMode(defaultValue, useSystemPreference);
  
  return <>{children}</>;
}
