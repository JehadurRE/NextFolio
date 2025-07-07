'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Blog Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          retry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

const DefaultFallback: React.FC<{ error: Error; retry: () => void }> = ({ error, retry }) => (
  <section id="blog" className="section-padding bg-transparent">
    <div className="container-custom">
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
          Blog & Insights
        </h2>
        <p className="text-red-600 dark:text-red-400 mb-4">
          Failed to load blog posts. {error.message}
        </p>
        <button onClick={retry} className="btn-primary">
          Try Again
        </button>
      </div>
    </div>
  </section>
);

export default ErrorBoundary;
