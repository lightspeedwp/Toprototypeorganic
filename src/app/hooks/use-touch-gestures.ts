/**
 * Touch Gesture Hooks
 * 
 * Provides React hooks for handling touch gestures on mobile devices.
 * 
 * **Gestures Supported:**
 * - Swipe (left, right, up, down)
 * - Pinch (zoom in, zoom out)
 * - Long press
 * - Double tap
 * - Pan (drag)
 * 
 * @module use-touch-gestures
 * @category hooks
 */

import { useRef, useEffect, useCallback } from "react";

/**
 * Touch point information.
 */
interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

/**
 * Swipe direction.
 */
type SwipeDirection = "left" | "right" | "up" | "down";

/**
 * Swipe gesture options.
 */
interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
  maxSwipeTime?: number;
}

/**
 * Pinch gesture options.
 */
interface PinchOptions {
  onPinchIn?: (scale: number) => void;
  onPinchOut?: (scale: number) => void;
  minPinchDistance?: number;
}

/**
 * Long press gesture options.
 */
interface LongPressOptions {
  onLongPress?: () => void;
  delay?: number;
}

/**
 * Double tap gesture options.
 */
interface DoubleTapOptions {
  onDoubleTap?: () => void;
  delay?: number;
}

/**
 * Pan gesture options.
 */
interface PanOptions {
  onPanStart?: (x: number, y: number) => void;
  onPanMove?: (deltaX: number, deltaY: number) => void;
  onPanEnd?: (deltaX: number, deltaY: number) => void;
}

/**
 * Hook for swipe gestures.
 * 
 * Detects swipe gestures in four directions.
 * 
 * **Usage:**
 * ```tsx
 * const swipeHandlers = useSwipe({
 *   onSwipeLeft: () => console.log("Swiped left"),
 *   onSwipeRight: () => console.log("Swiped right"),
 *   minSwipeDistance: 50,
 * });
 * 
 * return <div {...swipeHandlers}>Swipeable content</div>;
 * ```
 * 
 * @param options - Swipe gesture options
 * @returns Touch event handlers
 */
export function useSwipe(options: SwipeOptions) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    minSwipeDistance = 50,
    maxSwipeTime = 300,
  } = options;

  const touchStart = useRef<TouchPoint | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      const deltaTime = Date.now() - touchStart.current.timestamp;

      // Check if swipe was fast enough
      if (deltaTime > maxSwipeTime) {
        touchStart.current = null;
        return;
      }

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Horizontal swipe
      if (absX > absY && absX > minSwipeDistance) {
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
      // Vertical swipe
      else if (absY > absX && absY > minSwipeDistance) {
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }

      touchStart.current = null;
    },
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, minSwipeDistance, maxSwipeTime]
  );

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
}

/**
 * Hook for pinch gestures.
 * 
 * Detects pinch-to-zoom gestures.
 * 
 * **Usage:**
 * ```tsx
 * const pinchHandlers = usePinch({
 *   onPinchOut: (scale) => console.log("Pinched out", scale),
 *   onPinchIn: (scale) => console.log("Pinched in", scale),
 * });
 * 
 * return <div {...pinchHandlers}>Pinchable content</div>;
 * ```
 * 
 * @param options - Pinch gesture options
 * @returns Touch event handlers
 */
export function usePinch(options: PinchOptions) {
  const { onPinchIn, onPinchOut, minPinchDistance = 10 } = options;

  const initialDistance = useRef<number | null>(null);

  const getDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      initialDistance.current = getDistance(e.touches[0], e.touches[1]);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && initialDistance.current !== null) {
        const currentDistance = getDistance(e.touches[0], e.touches[1]);
        const delta = currentDistance - initialDistance.current;

        if (Math.abs(delta) > minPinchDistance) {
          const scale = currentDistance / initialDistance.current;

          if (delta > 0) {
            onPinchOut?.(scale);
          } else {
            onPinchIn?.(scale);
          }

          initialDistance.current = currentDistance;
        }
      }
    },
    [onPinchIn, onPinchOut, minPinchDistance]
  );

  const handleTouchEnd = useCallback(() => {
    initialDistance.current = null;
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}

/**
 * Hook for long press gestures.
 * 
 * Detects long press (press and hold).
 * 
 * **Usage:**
 * ```tsx
 * const longPressHandlers = useLongPress({
 *   onLongPress: () => console.log("Long pressed"),
 *   delay: 500,
 * });
 * 
 * return <button {...longPressHandlers}>Long press me</button>;
 * ```
 * 
 * @param options - Long press gesture options
 * @returns Touch event handlers
 */
export function useLongPress(options: LongPressOptions) {
  const { onLongPress, delay = 500 } = options;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      onLongPress?.();
    }, delay);
  }, [onLongPress, delay]);

  const handleTouchEnd = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleTouchMove = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
  };
}

/**
 * Hook for double tap gestures.
 * 
 * Detects double tap (two quick taps).
 * 
 * **Usage:**
 * ```tsx
 * const doubleTapHandlers = useDoubleTap({
 *   onDoubleTap: () => console.log("Double tapped"),
 *   delay: 300,
 * });
 * 
 * return <div {...doubleTapHandlers}>Double tap me</div>;
 * ```
 * 
 * @param options - Double tap gesture options
 * @returns Touch event handlers
 */
export function useDoubleTap(options: DoubleTapOptions) {
  const { onDoubleTap, delay = 300 } = options;

  const lastTap = useRef<number | null>(null);

  const handleTouchEnd = useCallback(() => {
    const now = Date.now();

    if (lastTap.current && now - lastTap.current < delay) {
      onDoubleTap?.();
      lastTap.current = null;
    } else {
      lastTap.current = now;
    }
  }, [onDoubleTap, delay]);

  return {
    onTouchEnd: handleTouchEnd,
  };
}

/**
 * Hook for pan gestures.
 * 
 * Detects pan (drag) gestures.
 * 
 * **Usage:**
 * ```tsx
 * const panHandlers = usePan({
 *   onPanStart: (x, y) => console.log("Pan started", x, y),
 *   onPanMove: (dx, dy) => console.log("Panning", dx, dy),
 *   onPanEnd: (dx, dy) => console.log("Pan ended", dx, dy),
 * });
 * 
 * return <div {...panHandlers}>Draggable content</div>;
 * ```
 * 
 * @param options - Pan gesture options
 * @returns Touch event handlers
 */
export function usePan(options: PanOptions) {
  const { onPanStart, onPanMove, onPanEnd } = options;

  const touchStart = useRef<TouchPoint | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      };
      onPanStart?.(touch.clientX, touch.clientY);
    },
    [onPanStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;

      onPanMove?.(deltaX, deltaY);
    },
    [onPanMove]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;

      onPanEnd?.(deltaX, deltaY);
      touchStart.current = null;
    },
    [onPanEnd]
  );

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}

/**
 * Get swipe direction from delta values.
 * 
 * @param deltaX - Horizontal delta
 * @param deltaY - Vertical delta
 * @returns Swipe direction
 */
export function getSwipeDirection(deltaX: number, deltaY: number): SwipeDirection | null {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  if (absX > absY) {
    return deltaX > 0 ? "right" : "left";
  } else if (absY > absX) {
    return deltaY > 0 ? "down" : "up";
  }

  return null;
}

/**
 * Check if device supports touch.
 * 
 * @returns True if touch is supported
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Prevent default touch behavior.
 * 
 * Useful for preventing scroll while handling touch gestures.
 * 
 * @param e - Touch event
 */
export function preventTouchDefault(e: TouchEvent): void {
  e.preventDefault();
}

/**
 * Get touch event coordinates.
 * 
 * @param e - Touch event
 * @returns Touch coordinates
 */
export function getTouchCoordinates(e: React.TouchEvent): { x: number; y: number } {
  const touch = e.touches[0] || e.changedTouches[0];
  return {
    x: touch.clientX,
    y: touch.clientY,
  };
}
