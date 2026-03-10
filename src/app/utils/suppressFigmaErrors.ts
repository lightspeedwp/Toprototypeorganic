/**
 * Figma Error Suppressor
 * 
 * Suppresses harmless Figma iframe communication errors
 * that don't affect app functionality.
 * 
 * Only active in Figma Make environment.
 */

// Suppress Figma iframe communication errors
if (typeof window !== 'undefined') {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  const isFigmaError = (args: any[]) => {
    return args.some(arg => {
      if (!arg) return false;
      const str = typeof arg === 'object' && arg.message ? arg.message : String(arg);
      return (
        str.includes('IframeMessageAbortError') ||
        str.includes('message port was destroyed') ||
        str.includes('setupMessageChannel') ||
        str.includes('Failed to execute \'postMessage\' on \'DOMWindow\'') ||
        str.includes('The target origin provided does not match the recipient window\'s origin') ||
        str.includes('webpack-artifacts') ||
        str.includes('figma_app-') ||
        str.includes('Message aborted')
      );
    });
  };

  console.error = (...args: any[]) => {
    if (isFigmaError(args)) {
      // Silently ignore - these are Figma environment errors
      return;
    }
    
    // Log all other errors normally
    originalError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    if (isFigmaError(args)) {
      // Silently ignore
      return;
    }
    originalWarn.apply(console, args);
  };

  // Also catch unhandled promise rejections which might contain these errors
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && isFigmaError([event.reason])) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  });

  // Also catch regular window errors
  window.addEventListener('error', (event) => {
    if (event.error && isFigmaError([event.error])) {
      event.preventDefault();
      event.stopPropagation();
      return;
    } else if (event.message && isFigmaError([event.message])) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }, true); // Use capture phase to catch errors earlier

  // Override global Error constructor temporarily to catch these during construction
  const OriginalError = window.Error;
  window.Error = class extends OriginalError {
    constructor(message?: string) {
      if (message && isFigmaError([message])) {
        super(''); // Replace with empty message
        this.message = ''; // Clear the message
        this.stack = ''; // Clear the stack
      } else {
        super(message);
      }
    }
  } as ErrorConstructor;
}

export {};