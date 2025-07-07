import { getBlogPosts, getAllBlogTags } from '../lib/blog-server';
import { type BlogPost } from '../lib/supabase';
import BlogClient from './BlogClient';
import BlogHeader from './BlogHeader';
import NewsletterSignup from './NewsletterSignup';

// This is a Server Component that pre-fetches data
export default async function BlogServerWrapper() {

    console.log('BlogServerWrapper rendered in client/server idk');
  // Pre-fetch data on the server with error handling
  let initialPosts: BlogPost[] = [];
  let initialTags: string[] = [];
  
  try {
    const [posts, tags] = await Promise.all([
      getBlogPosts(),
      getAllBlogTags()
    ]);
    initialPosts = posts;
    initialTags = tags;
  } catch (error) {
    console.error('Server-side blog data fetch failed:', error);
    // Data will be empty, client will handle fetching
  }

  return (
    <section id="blog" className="section-padding bg-transparent">
      <div className="container-custom">
        <BlogHeader />
        <BlogClient 
          initialPosts={initialPosts} 
          initialTags={initialTags}
          enableClientFetch={true}
        />
        <NewsletterSignup />
      </div>
    </section>
  );
}
