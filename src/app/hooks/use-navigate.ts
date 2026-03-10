/**
 * useNavigate Hook
 * 
 * A simple hook to handle page navigation in the prototype.
 * Wraps the onNavigate callback for easier use in components.
 * 
 * @module use-navigate
 * @category hooks
 */

/**
 * Use navigate hook.
 * 
 * @param onNavigate - Navigation callback function
 * @returns Navigation function
 */
export function useNavigate(onNavigate?: (pageId: string) => void) {
  return (pageId: string) => {
    onNavigate?.(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
