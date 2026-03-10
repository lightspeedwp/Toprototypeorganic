/**
 * Toast Notification System
 * 
 * Elegant, accessible toast notifications with animations.
 * Supports multiple types, positions, and actions.
 * 
 * @module toastNotification
 * @category utils
 */

/**
 * Toast notification type.
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

/**
 * Toast position.
 */
export type ToastPosition = 
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Toast notification.
 */
export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  icon?: string;
  timestamp: number;
}

/**
 * Toast options.
 */
export interface ToastOptions {
  title?: string;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  icon?: string;
}

/**
 * Toast listeners.
 */
type ToastListener = (toasts: Toast[]) => void;

/**
 * Active toasts storage.
 */
let toasts: Toast[] = [];
let listeners: ToastListener[] = [];
let nextId = 0;

/**
 * Default toast configuration.
 */
const DEFAULT_DURATION = 5000; // 5 seconds
const DEFAULT_POSITION: ToastPosition = 'bottom-right';

/**
 * Notify listeners of toast changes.
 */
function notifyListeners() {
  listeners.forEach(listener => listener([...toasts]));
}

/**
 * Generate unique toast ID.
 */
function generateId(): string {
  return `toast-${nextId++}-${Date.now()}`;
}

/**
 * Add toast to active list.
 */
function addToast(toast: Toast): string {
  toasts.push(toast);
  notifyListeners();
  
  // Auto-dismiss after duration (if not loading)
  if (toast.type !== 'loading' && toast.duration !== 0) {
    setTimeout(() => {
      dismissToast(toast.id);
    }, toast.duration || DEFAULT_DURATION);
  }
  
  return toast.id;
}

/**
 * Remove toast from active list.
 */
function removeToast(id: string) {
  toasts = toasts.filter(t => t.id !== id);
  notifyListeners();
}

/**
 * Show success toast.
 * 
 * @param message - Toast message
 * @param options - Toast options
 * @returns Toast ID
 * 
 * @example
 * ```tsx
 * import { showSuccess } from "../utils/toastNotification";
 * 
 * showSuccess('Tour booking confirmed!', {
 *   title: 'Success',
 *   duration: 3000,
 * });
 * ```
 */
export function showSuccess(message: string, options?: ToastOptions): string {
  const toast: Toast = {
    id: generateId(),
    type: 'success',
    message,
    title: options?.title,
    duration: options?.duration,
    position: options?.position || DEFAULT_POSITION,
    action: options?.action,
    dismissible: options?.dismissible !== false,
    icon: options?.icon || '✓',
    timestamp: Date.now(),
  };
  
  return addToast(toast);
}

/**
 * Show error toast.
 * 
 * @param message - Toast message
 * @param options - Toast options
 * @returns Toast ID
 * 
 * @example
 * ```tsx
 * import { showError } from "../utils/toastNotification";
 * 
 * showError('Failed to load tours', {
 *   title: 'Error',
 *   action: {
 *     label: 'Retry',
 *     onClick: () => fetchTours(),
 *   },
 * });
 * ```
 */
export function showError(message: string, options?: ToastOptions): string {
  const toast: Toast = {
    id: generateId(),
    type: 'error',
    message,
    title: options?.title,
    duration: options?.duration || 7000, // Longer for errors
    position: options?.position || DEFAULT_POSITION,
    action: options?.action,
    dismissible: options?.dismissible !== false,
    icon: options?.icon || '✕',
    timestamp: Date.now(),
  };
  
  return addToast(toast);
}

/**
 * Show warning toast.
 * 
 * @param message - Toast message
 * @param options - Toast options
 * @returns Toast ID
 * 
 * @example
 * ```tsx
 * import { showWarning } from "../utils/toastNotification";
 * 
 * showWarning('Session expiring soon', {
 *   title: 'Warning',
 *   action: {
 *     label: 'Extend',
 *     onClick: () => extendSession(),
 *   },
 * });
 * ```
 */
export function showWarning(message: string, options?: ToastOptions): string {
  const toast: Toast = {
    id: generateId(),
    type: 'warning',
    message,
    title: options?.title,
    duration: options?.duration,
    position: options?.position || DEFAULT_POSITION,
    action: options?.action,
    dismissible: options?.dismissible !== false,
    icon: options?.icon || '⚠',
    timestamp: Date.now(),
  };
  
  return addToast(toast);
}

/**
 * Show info toast.
 * 
 * @param message - Toast message
 * @param options - Toast options
 * @returns Toast ID
 * 
 * @example
 * ```tsx
 * import { showInfo } from "../utils/toastNotification";
 * 
 * showInfo('New tours added', {
 *   action: {
 *     label: 'View',
 *     onClick: () => navigate('/tours'),
 *   },
 * });
 * ```
 */
export function showInfo(message: string, options?: ToastOptions): string {
  const toast: Toast = {
    id: generateId(),
    type: 'info',
    message,
    title: options?.title,
    duration: options?.duration,
    position: options?.position || DEFAULT_POSITION,
    action: options?.action,
    dismissible: options?.dismissible !== false,
    icon: options?.icon || 'ⓘ',
    timestamp: Date.now(),
  };
  
  return addToast(toast);
}

/**
 * Show loading toast.
 * 
 * @param message - Toast message
 * @param options - Toast options
 * @returns Toast ID
 * 
 * @example
 * ```tsx
 * import { showLoading, dismissToast } from "../utils/toastNotification";
 * 
 * const toastId = showLoading('Booking tour...', {
 *   title: 'Please wait',
 * });
 * 
 * // Later...
 * dismissToast(toastId);
 * ```
 */
export function showLoading(message: string, options?: ToastOptions): string {
  const toast: Toast = {
    id: generateId(),
    type: 'loading',
    message,
    title: options?.title,
    duration: 0, // Loading toasts don't auto-dismiss
    position: options?.position || DEFAULT_POSITION,
    action: options?.action,
    dismissible: options?.dismissible === true, // Not dismissible by default
    icon: options?.icon || '⟳',
    timestamp: Date.now(),
  };
  
  return addToast(toast);
}

/**
 * Dismiss toast by ID.
 * 
 * @param id - Toast ID
 * 
 * @example
 * ```tsx
 * import { showSuccess, dismissToast } from "../utils/toastNotification";
 * 
 * const toastId = showSuccess('Saved!');
 * 
 * // Dismiss immediately
 * dismissToast(toastId);
 * ```
 */
export function dismissToast(id: string): void {
  removeToast(id);
}

/**
 * Dismiss all toasts.
 * 
 * @example
 * ```tsx
 * import { dismissAll } from "../utils/toastNotification";
 * 
 * dismissAll();
 * ```
 */
export function dismissAll(): void {
  toasts = [];
  notifyListeners();
}

/**
 * Update loading toast to success.
 * 
 * @param id - Toast ID
 * @param message - Success message
 * @param options - Toast options
 * 
 * @example
 * ```tsx
 * import { showLoading, updateToastSuccess } from "../utils/toastNotification";
 * 
 * const toastId = showLoading('Booking tour...');
 * 
 * try {
 *   await bookTour();
 *   updateToastSuccess(toastId, 'Tour booked successfully!');
 * } catch (error) {
 *   updateToastError(toastId, 'Booking failed');
 * }
 * ```
 */
export function updateToastSuccess(
  id: string,
  message: string,
  options?: Omit<ToastOptions, 'duration'>
): void {
  const index = toasts.findIndex(t => t.id === id);
  if (index !== -1) {
    toasts[index] = {
      ...toasts[index],
      type: 'success',
      message,
      title: options?.title || toasts[index].title,
      icon: options?.icon || '✓',
      dismissible: true,
      duration: DEFAULT_DURATION,
    };
    notifyListeners();
    
    // Auto-dismiss
    setTimeout(() => {
      dismissToast(id);
    }, DEFAULT_DURATION);
  }
}

/**
 * Update loading toast to error.
 * 
 * @param id - Toast ID
 * @param message - Error message
 * @param options - Toast options
 * 
 * @example
 * ```tsx
 * const toastId = showLoading('Processing...');
 * 
 * try {
 *   await process();
 *   updateToastSuccess(toastId, 'Done!');
 * } catch (error) {
 *   updateToastError(toastId, error.message);
 * }
 * ```
 */
export function updateToastError(
  id: string,
  message: string,
  options?: Omit<ToastOptions, 'duration'>
): void {
  const index = toasts.findIndex(t => t.id === id);
  if (index !== -1) {
    toasts[index] = {
      ...toasts[index],
      type: 'error',
      message,
      title: options?.title || toasts[index].title,
      icon: options?.icon || '✕',
      dismissible: true,
      duration: 7000,
    };
    notifyListeners();
    
    // Auto-dismiss
    setTimeout(() => {
      dismissToast(id);
    }, 7000);
  }
}

/**
 * Subscribe to toast changes.
 * 
 * @param listener - Listener function
 * @returns Unsubscribe function
 * 
 * @example
 * ```tsx
 * import { subscribe } from "../utils/toastNotification";
 * 
 * const unsubscribe = subscribe((toasts) => {
 *   console.log('Active toasts:', toasts.length);
 * });
 * 
 * // Later...
 * unsubscribe();
 * ```
 */
export function subscribe(listener: ToastListener): () => void {
  listeners.push(listener);
  
  // Return unsubscribe function
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

/**
 * Get all active toasts.
 * 
 * @returns Active toasts
 * 
 * @example
 * ```tsx
 * import { getToasts } from "../utils/toastNotification";
 * 
 * const active = getToasts();
 * console.log(`${active.length} toasts active`);
 * ```
 */
export function getToasts(): Toast[] {
  return [...toasts];
}

/**
 * Promise-based toast helper.
 * 
 * @param promise - Promise to track
 * @param messages - Messages for each state
 * @returns Promise result
 * 
 * @example
 * ```tsx
 * import { promiseToast } from "../utils/toastNotification";
 * 
 * await promiseToast(
 *   bookTour(tourId),
 *   {
 *     loading: 'Booking tour...',
 *     success: 'Tour booked successfully!',
 *     error: 'Failed to book tour',
 *   }
 * );
 * ```
 */
export async function promiseToast<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: Error) => string);
  },
  options?: Omit<ToastOptions, 'duration'>
): Promise<T> {
  const toastId = showLoading(messages.loading, options);
  
  try {
    const result = await promise;
    const successMessage = typeof messages.success === 'function'
      ? messages.success(result)
      : messages.success;
    
    updateToastSuccess(toastId, successMessage, options);
    return result;
  } catch (error) {
    const errorMessage = typeof messages.error === 'function'
      ? messages.error(error as Error)
      : messages.error;
    
    updateToastError(toastId, errorMessage, options);
    throw error;
  }
}

/**
 * Batch toast helper.
 * 
 * @param toasts - Array of toast configurations
 * 
 * @example
 * ```tsx
 * import { showBatch } from "../utils/toastNotification";
 * 
 * showBatch([
 *   { type: 'success', message: 'Step 1 complete' },
 *   { type: 'success', message: 'Step 2 complete' },
 *   { type: 'info', message: 'All done!' },
 * ]);
 * ```
 */
export function showBatch(
  configs: Array<{ type: ToastType; message: string; options?: ToastOptions }>
): void {
  configs.forEach(({ type, message, options }, index) => {
    // Stagger toast display
    setTimeout(() => {
      switch (type) {
        case 'success':
          showSuccess(message, options);
          break;
        case 'error':
          showError(message, options);
          break;
        case 'warning':
          showWarning(message, options);
          break;
        case 'info':
          showInfo(message, options);
          break;
        case 'loading':
          showLoading(message, options);
          break;
      }
    }, index * 200); // 200ms delay between each
  });
}
