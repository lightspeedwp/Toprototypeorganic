/**
 * Filter Persistence Hook
 * 
 * Custom React hook for persisting filter state to localStorage.
 * Enables filters to persist across page refreshes and sessions.
 * 
 * **Features:**
 * - Persist filters to localStorage
 * - Restore filters on mount
 * - Clear persisted filters
 * - Type-safe filter operations
 * - Debounced storage writes
 * 
 * @module useFilterPersistence
 * @category hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { FilterCriteria } from '../components/patterns/AdvancedFilterPanel';

/**
 * Hook options interface.
 */
interface UseFilterPersistenceOptions {
  /** Storage key for localStorage */
  storageKey?: string;
  /** Enable persistence */
  enabled?: boolean;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
}

/**
 * useFilterPersistence Hook
 * 
 * Manages filter state with localStorage persistence.
 * 
 * @param initialFilters - Initial filter criteria
 * @param options - Hook options
 * @returns Filter state and control methods
 * 
 * @example
 * ```tsx
 * const {
 *   filters,
 *   updateFilters,
 *   clearFilters,
 *   removeFilter,
 * } = useFilterPersistence({}, {
 *   storageKey: 'tour-filters',
 *   enabled: true,
 * });
 * ```
 */
export function useFilterPersistence(
  initialFilters: FilterCriteria = {},
  options: UseFilterPersistenceOptions = {}
) {
  const {
    storageKey = 'tour-filters',
    enabled = true,
    debounceMs = 300,
  } = options;

  /**
   * Load filters from localStorage on mount.
   */
  const loadFilters = useCallback((): FilterCriteria => {
    if (!enabled || typeof window === 'undefined') {
      return initialFilters;
    }

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...initialFilters, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load filters from localStorage:', error);
    }

    return initialFilters;
  }, [enabled, storageKey, initialFilters]);

  const [filters, setFilters] = useState<FilterCriteria>(loadFilters);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  /**
   * Save filters to localStorage (debounced).
   */
  const saveFilters = useCallback(
    (newFilters: FilterCriteria) => {
      if (!enabled || typeof window === 'undefined') {
        return;
      }

      // Clear existing timeout
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      // Set new timeout
      const timeout = setTimeout(() => {
        try {
          localStorage.setItem(storageKey, JSON.stringify(newFilters));
        } catch (error) {
          console.error('Failed to save filters to localStorage:', error);
        }
      }, debounceMs);

      setSaveTimeout(timeout);
    },
    [enabled, storageKey, debounceMs, saveTimeout]
  );

  /**
   * Update filters.
   */
  const updateFilters = useCallback(
    (newFilters: FilterCriteria) => {
      setFilters(newFilters);
      saveFilters(newFilters);
    },
    [saveFilters]
  );

  /**
   * Remove a specific filter.
   */
  const removeFilter = useCallback(
    (key: keyof FilterCriteria, value?: string) => {
      setFilters((prev) => {
        const next = { ...prev };

        if (value && Array.isArray(next[key])) {
          // Remove specific value from array
          const updated = (next[key] as string[]).filter((v) => v !== value);
          if (updated.length > 0) {
            next[key] = updated as any;
          } else {
            delete next[key];
          }
        } else {
          // Remove entire filter
          delete next[key];
        }

        saveFilters(next);
        return next;
      });
    },
    [saveFilters]
  );

  /**
   * Clear all filters.
   */
  const clearFilters = useCallback(() => {
    const empty = {};
    setFilters(empty);
    saveFilters(empty);
  }, [saveFilters]);

  /**
   * Clear persisted filters from localStorage.
   */
  const clearPersistedFilters = useCallback(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Failed to clear persisted filters:', error);
    }
  }, [enabled, storageKey]);

  /**
   * Cleanup timeout on unmount.
   */
  useEffect(() => {
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [saveTimeout]);

  return {
    filters,
    updateFilters,
    removeFilter,
    clearFilters,
    clearPersistedFilters,
  };
}

/**
 * useSearchPersistence Hook
 * 
 * Persist search query to localStorage.
 * 
 * @param initialQuery - Initial search query
 * @param storageKey - localStorage key
 * @returns Search state and setter
 * 
 * @example
 * ```tsx
 * const { searchQuery, setSearchQuery } = useSearchPersistence('', 'tour-search');
 * ```
 */
export function useSearchPersistence(
  initialQuery: string = '',
  storageKey: string = 'tour-search'
) {
  const [searchQuery, setSearchQueryState] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialQuery;
    }

    try {
      const stored = localStorage.getItem(storageKey);
      return stored || initialQuery;
    } catch (error) {
      console.error('Failed to load search query from localStorage:', error);
      return initialQuery;
    }
  });

  /**
   * Update search query and persist to localStorage.
   */
  const setSearchQuery = useCallback(
    (query: string) => {
      setSearchQueryState(query);

      if (typeof window !== 'undefined') {
        try {
          if (query) {
            localStorage.setItem(storageKey, query);
          } else {
            localStorage.removeItem(storageKey);
          }
        } catch (error) {
          console.error('Failed to save search query to localStorage:', error);
        }
      }
    },
    [storageKey]
  );

  return {
    searchQuery,
    setSearchQuery,
  };
}

/**
 * useSortPersistence Hook
 * 
 * Persist sort option to localStorage.
 * 
 * @param initialSort - Initial sort value
 * @param storageKey - localStorage key
 * @returns Sort state and setter
 * 
 * @example
 * ```tsx
 * const { sortBy, setSortBy } = useSortPersistence('popular', 'tour-sort');
 * ```
 */
export function useSortPersistence(
  initialSort: string = 'popular',
  storageKey: string = 'tour-sort'
) {
  const [sortBy, setSortByState] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialSort;
    }

    try {
      const stored = localStorage.getItem(storageKey);
      return stored || initialSort;
    } catch (error) {
      console.error('Failed to load sort from localStorage:', error);
      return initialSort;
    }
  });

  /**
   * Update sort and persist to localStorage.
   */
  const setSortBy = useCallback(
    (sort: string) => {
      setSortByState(sort);

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, sort);
        } catch (error) {
          console.error('Failed to save sort to localStorage:', error);
        }
      }
    },
    [storageKey]
  );

  return {
    sortBy,
    setSortBy,
  };
}

/**
 * Utility: Get all persisted filters from localStorage.
 */
export function getAllPersistedFilters(): Record<string, any> {
  if (typeof window === 'undefined') {
    return {};
  }

  const persisted: Record<string, any> = {};

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('filter') || key.includes('search') || key.includes('sort'))) {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            persisted[key] = JSON.parse(value);
          } catch {
            persisted[key] = value;
          }
        }
      }
    }
  } catch (error) {
    console.error('Failed to get persisted filters:', error);
  }

  return persisted;
}

/**
 * Utility: Clear all persisted filters from localStorage.
 */
export function clearAllPersistedFilters(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('filter') || key.includes('search') || key.includes('sort'))) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error('Failed to clear all persisted filters:', error);
  }
}

export default useFilterPersistence;
