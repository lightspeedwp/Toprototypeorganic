/**
 * useDebouncedValue Hook
 * 
 * Returns a debounced version of a value that only updates
 * after the specified delay has elapsed since the last change.
 * Also provides a flush() function for immediate sync
 * (e.g., when the user presses Enter in the search input).
 * 
 * @module useDebouncedValue
 * @category hooks
 */

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * @param value - The value to debounce.
 * @param delayMs - Debounce delay in milliseconds (default: 300).
 * @returns A tuple of [debouncedValue, flush] where flush() immediately
 *          syncs the debounced value to the current value.
 * 
 * @example
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState("");
 * const [debouncedQuery, flushQuery] = useDebouncedValue(searchQuery, 300);
 * 
 * // Use debouncedQuery for URL sync, searchQuery for input binding
 * // Call flushQuery() on Enter key to sync immediately
 * ```
 */
export function useDebouncedValue<T>(value: T, delayMs: number = 300): [T, () => void] {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestValueRef = useRef(value);

  // Keep latest value in ref for flush
  latestValueRef.current = value;

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delayMs]);

  const flush = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setDebouncedValue(latestValueRef.current);
  }, []);

  return [debouncedValue, flush];
}
