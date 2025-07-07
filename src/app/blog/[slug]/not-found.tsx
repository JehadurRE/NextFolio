'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import MobileNav from '../../../components/MobileNav';

export default function NotFound() {
  const router = useRouter();

  const handleBackToBlog = () => {
    router.push('/#blog');
    setTimeout(() => {
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <div className="min-h-screen pt-20 section-padding bg-transparent">
        <div className="container-custom">
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
                Post Not Found
              </h1>
              <p className="text-secondary-600 dark:text-secondary-300 mb-8">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToBlog}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}