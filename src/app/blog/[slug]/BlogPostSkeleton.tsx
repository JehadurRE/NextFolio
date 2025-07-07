'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import MobileNav from '../../../components/MobileNav';

export default function BlogPostSkeleton() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <div className="min-h-screen pt-20 section-padding bg-transparent">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Back Button Skeleton */}
            <div className="mb-8">
              <div className="h-6 w-24 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
            </div>

            {/* Header Skeleton */}
            <div className="mb-12">
              {/* Title */}
              <div className="space-y-3 mb-6">
                <div className="h-12 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                <div className="h-12 w-3/4 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
              </div>
              
              {/* Excerpt */}
              <div className="space-y-2 mb-8">
                <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                <div className="h-6 w-5/6 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-6 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-20 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-secondary-200 dark:bg-secondary-700 rounded-full animate-pulse"></div>
                ))}
              </div>

              {/* Share Button */}
              <div className="h-10 w-32 bg-secondary-200 dark:bg-secondary-700 rounded-xl animate-pulse"></div>
            </div>

            {/* Content Skeleton */}
            <div className="glass-card p-8 lg:p-12 rounded-3xl">
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                    <div className="h-4 w-11/12 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                    <div className="h-4 w-4/5 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Skeleton */}
            <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="h-4 w-64 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-20 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                  <div className="h-10 w-28 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}