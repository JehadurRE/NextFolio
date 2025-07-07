import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import BlogSkeleton from './BlogSkeleton';

// Dynamic import for better code splitting
const BlogServerWrapper = React.lazy(() => import('./BlogServerWrapper'));

// Main Blog component that handles error boundaries and loading states
const Blog: React.FC = () => {

  console.log('Blog component rendered - this should appear in VS Code terminal');
  return (
    <ErrorBoundary>

    
      <Suspense fallback={<BlogSkeleton />}>
        <BlogServerWrapper />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Blog;