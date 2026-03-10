/**
 * Error Boundary Component
 * 
 * Catches React errors and displays a fallback UI.
 * Prevents the entire app from crashing due to errors.
 * 
 * @module ErrorBoundary
 * @category common
 */

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="section container flex items-center justify-center min-h-screen has-background">
            <div className="wp-block-card text-center max-w-md">
              <h2 className="wp-block-heading is-style-h2 has-foreground-color">
                Something went wrong
              </h2>
              <p className="wp-block-paragraph has-muted-foreground-color">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="wp-block-button__link button--primary"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
