/**
 * useResultsAnnouncement — Debounced screen-reader announcement for archive result counts.
 *
 * Announces "Showing X of Y [content type]" to assistive technology
 * via the global LiveRegion after filtering settles (500 ms debounce
 * prevents rapid-fire announcements during multi-filter changes).
 *
 * Skips the initial mount so the screen reader isn't spammed
 * on first page load.
 *
 * WCAG 2.1 mapping:
 *   4.1.3 Status Messages (Level AA) — uses aria-live="polite"
 *
 * @module useResultsAnnouncement
 * @category hooks
 */

import { useEffect, useRef } from "react";
import { useAnnounce } from "../components/common/LiveRegion";
import { useDebouncedValue } from "./useDebouncedValue";

/**
 * Announce filtered result counts to screen readers.
 *
 * @param filteredCount - Number of items after filtering.
 * @param totalCount    - Total (unfiltered) item count.
 * @param contentType   - Plural label (e.g. "tours", "blog posts").
 *
 * @example
 * ```ts
 * useResultsAnnouncement(filteredTours.length, allTours.length, "tours");
 * ```
 */
export function useResultsAnnouncement(
  filteredCount: number,
  totalCount: number,
  contentType: string
): void {
  const { announcePolite } = useAnnounce();
  const [debouncedCount] = useDebouncedValue(filteredCount, 500);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip announcement on initial render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const message =
      debouncedCount === totalCount
        ? `Showing all ${totalCount} ${contentType}`
        : `Showing ${debouncedCount} of ${totalCount} ${contentType}`;

    announcePolite(message);
  }, [debouncedCount, totalCount, contentType, announcePolite]);
}
