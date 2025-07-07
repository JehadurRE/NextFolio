'use client';

import React from 'react';
import BlogClient from './BlogClient';
import BlogHeader from './BlogHeader';
import NewsletterSignup from './NewsletterSignup';

// Client-side fallback component when server-side rendering fails
const BlogClientFallback: React.FC = () => {
  return (
    <section id="blog" className="section-padding bg-transparent">
      <div className="container-custom">
        <BlogHeader />
        <BlogClient 
          initialPosts={[]} 
          initialTags={[]}
          enableClientFetch={true}
        />
        <NewsletterSignup />
      </div>
    </section>
  );
};

export default BlogClientFallback;
