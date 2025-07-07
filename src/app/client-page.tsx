'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type BlogPost } from '../lib/supabase';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Certifications from '../components/Certifications';
import BlogClient from '../components/BlogClient';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';
import BlogHeader from '../components/BlogHeader';
import NewsletterSignup from '../components/NewsletterSignup';

interface ClientPageProps {
  blogData?: {
    posts: BlogPost[];
    tags: string[];
  } | null;
}

export default function ClientPage({ blogData }: ClientPageProps) {
  const [isLoading, setIsLoading] = useState(true);

  console.log('ClientPage rendered on CLIENT - this should appear in Chrome console');
  console.log('Received blog data:', blogData?.posts?.length || 0, 'posts');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle hash navigation after page load
  useEffect(() => {
    if (!isLoading) {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [isLoading]);

  const BlogSection = () => (
    <section id="blog" className="section-padding bg-transparent">
      <div className="container-custom">
        <BlogHeader />
        <BlogClient 
          initialPosts={blogData?.posts || []} 
          initialTags={blogData?.tags || []}
          enableClientFetch={!blogData} // Only enable client fetch if no server data
        />
        <NewsletterSignup />
      </div>
    </section>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Header />
            <MobileNav />
            <main>
              <Hero />
              <About />
              <Projects />
              <Research />
              <Certifications />
              <BlogSection />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
