/**
 * Bottom Sheet Component
 * 
 * Mobile-optimized modal that slides up from the bottom.
 * 
 * **Features:**
 * - Swipe down to dismiss
 * - Snap points (collapsed, half, full)
 * - Backdrop overlay
 * - Spring animation
 * - Keyboard handling
 * 
 * @module BottomSheet
 * @category components/mobile
 */

import { useState, useRef, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import { usePan } from "../../hooks/use-touch-gestures";
import { cn } from "../../lib/utils";

/**
 * Snap point for bottom sheet.
 */
type SnapPoint = "collapsed" | "half" | "full";

/**
 * Props for BottomSheet component.
 */
interface BottomSheetProps {
  /** Whether sheet is open */
  isOpen: boolean;
  
  /** Close callback */
  onClose: () => void;
  
  /** Sheet title */
  title?: string;
  
  /** Sheet content */
  children: React.ReactNode;
  
  /** Initial snap point */
  initialSnap?: SnapPoint;
  
  /** Enable snap points */
  enableSnap?: boolean;
  
  /** Show handle */
  showHandle?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Bottom Sheet Component.
 * 
 * Modal that slides up from the bottom of the screen.
 * 
 * **Usage:**
 * 
 * Basic usage:
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <BottomSheet
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Filter Options"
 * >
 *   <div className="p-4">
 *     <p>Sheet content</p>
 *   </div>
 * </BottomSheet>
 * ```
 * 
 * With snap points:
 * ```tsx
 * <BottomSheet
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   initialSnap="half"
 *   enableSnap
 * >
 *   <div>Content</div>
 * </BottomSheet>
 * ```
 * 
 * @component
 * @category mobile
 */
export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  initialSnap = "half",
  enableSnap = true,
  showHandle = true,
  className,
}: BottomSheetProps) {
  const [snapPoint, setSnapPoint] = useState<SnapPoint>(initialSnap);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Calculate sheet height based on snap point
  const getSheetHeight = (): number => {
    const windowHeight = window.innerHeight;
    
    switch (snapPoint) {
      case "collapsed":
        return windowHeight * 0.3;
      case "half":
        return windowHeight * 0.6;
      case "full":
        return windowHeight * 0.9;
      default:
        return windowHeight * 0.6;
    }
  };

  const [sheetHeight, setSheetHeight] = useState(getSheetHeight());

  // Update sheet height on snap point change
  useEffect(() => {
    setSheetHeight(getSheetHeight());
  }, [snapPoint]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Pan handlers for swipe to dismiss
  const panHandlers = usePan({
    onPanStart: () => {
      setIsDragging(true);
    },
    onPanMove: (_, deltaY) => {
      // Only allow dragging down
      if (deltaY > 0) {
        setDragOffset(deltaY);
      }
    },
    onPanEnd: (_, deltaY) => {
      setIsDragging(false);
      
      const dismissThreshold = 100;

      // Dismiss if dragged down enough
      if (deltaY > dismissThreshold) {
        onClose();
      }
      // Snap to points
      else if (enableSnap) {
        const snapThreshold = 50;
        
        if (deltaY > snapThreshold) {
          // Snap down
          if (snapPoint === "full") {
            setSnapPoint("half");
          } else if (snapPoint === "half") {
            setSnapPoint("collapsed");
          }
        } else if (deltaY < -snapThreshold) {
          // Snap up
          if (snapPoint === "collapsed") {
            setSnapPoint("half");
          } else if (snapPoint === "half") {
            setSnapPoint("full");
          }
        }
      }

      setDragOffset(0);
    },
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
        style={{
          opacity: isDragging ? 1 - (dragOffset / 300) : 1,
        }}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-background rounded-t-2xl shadow-sm",
          "flex flex-col",
          className
        )}
        style={{
          height: `${sheetHeight}px`,
          transform: `translateY(${dragOffset}px)`,
          transition: isDragging ? "none" : "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Handle */}
        {showHandle && (
          <div
            {...panHandlers}
            className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
          >
            <div className="w-12 h-1 rounded-full bg-muted" />
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

/**
 * Hook to control bottom sheet state.
 * 
 * **Usage:**
 * ```tsx
 * const sheet = useBottomSheet();
 * 
 * <button onClick={sheet.open}>Open Sheet</button>
 * <BottomSheet
 *   isOpen={sheet.isOpen}
 *   onClose={sheet.close}
 * >
 *   Content
 * </BottomSheet>
 * ```
 */
export function useBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };
}