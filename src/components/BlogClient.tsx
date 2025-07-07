'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { type BlogPost } from '../lib/supabase';
import { fetchBlogPostsClient } from '../lib/blog-server';

interface BlogClientProps {
  initialPosts?: BlogPost[];
  initialTags?: string[];
  enableClientFetch?: boolean;
}

const BlogClient: React.FC<BlogClientProps> = ({ 
  initialPosts = [], 
  initialTags = [], 
  enableClientFetch = false 
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no initial data and client fetch is enabled, fetch data
    if (enableClientFetch && (posts.length === 0 || tags.length === 0)) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const { posts: fetchedPosts, tags: fetchedTags } = await fetchBlogPostsClient();
          setPosts(fetchedPosts);
          setTags(fetchedTags);
        } catch (err) {
          console.error('Client fetch error:', err);
          setError('Failed to load blog posts. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [enableClientFetch, posts.length, tags.length]);

  const allTags = ['all', ...tags];
  const filteredPosts = selectedTag === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-secondary-600 dark:text-secondary-300">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <>
      {/* Tag Filter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {allTags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedTag === tag
                ? 'bg-primary-500 text-white shadow-lg'
                : 'glass-card text-secondary-600 dark:text-secondary-300 hover:shadow-md'
            }`}
          >
            {tag === 'all' ? 'All Posts' : tag}
          </motion.button>
        ))}
      </motion.div>

      {/* Blog Posts */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card p-8 hover:shadow-xl transition-all duration-300 group"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-secondary-800 dark:text-secondary-200 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time} min read</span>
                  </div>
                </div>
              </div>

              {/* Read More */}
              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* No posts message */}
      {filteredPosts.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center py-16"
        >
          <h3 className="text-xl font-semibold text-secondary-600 dark:text-secondary-400 mb-2">
            {selectedTag === 'all' ? 'No blog posts available' : 'No posts found for this tag'}
          </h3>
          <p className="text-secondary-500 dark:text-secondary-500">
            {selectedTag === 'all' 
              ? 'Check back later for new content' 
              : 'Try selecting a different tag or check back later for new content'
            }
          </p>
        </motion.div>
      )}
    </>
  );
};

export default BlogClient;
