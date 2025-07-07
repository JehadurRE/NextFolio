'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BlogHeader: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
        Blog & Insights
      </h2>
      <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
        Sharing thoughts on technology, software development, and research discoveries
      </p>
    </motion.div>
  );
};

export default BlogHeader;
