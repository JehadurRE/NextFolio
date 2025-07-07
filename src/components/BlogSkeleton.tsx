import React from 'react';

const BlogSkeleton: React.FC = () => {
  return (
    <section id="blog" className="section-padding bg-transparent">
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-12 bg-secondary-200 dark:bg-secondary-700 rounded mx-auto mb-6 w-80 animate-pulse" />
          <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded mx-auto w-96 animate-pulse" />
        </div>

        {/* Tag Filter Skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-20 bg-secondary-200 dark:bg-secondary-700 rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Blog Posts Skeleton */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="glass-card p-8 animate-pulse"
            >
              <div className="mb-4">
                <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded mb-3 w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-full" />
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-5/6" />
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-4/6" />
                </div>
              </div>

              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-6 w-16 bg-accent-100 dark:bg-accent-900/30 rounded-full"
                  />
                ))}
              </div>

              {/* Meta Information Skeleton */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-4 w-24 bg-secondary-200 dark:bg-secondary-700 rounded" />
                <div className="h-4 w-20 bg-secondary-200 dark:bg-secondary-700 rounded" />
              </div>

              {/* Read More Skeleton */}
              <div className="h-4 w-20 bg-primary-200 dark:bg-primary-800 rounded" />
            </div>
          ))}
        </div>

        {/* Newsletter Skeleton */}
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded mb-4 w-48 mx-auto animate-pulse" />
          <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded mb-6 w-80 mx-auto animate-pulse" />
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 h-12 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse" />
            <div className="h-12 w-24 bg-primary-200 dark:bg-primary-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSkeleton;
