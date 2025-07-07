import { getBlogPosts, getAllBlogTags } from '../lib/blog-server';
import { type BlogPost } from '../lib/supabase';
import BlogClient from '../components/BlogClient';
import BlogHeader from '../components/BlogHeader';
import NewsletterSignup from '../components/NewsletterSignup';

// Server Component for Blog Section
const BlogServer: React.FC = async () => {
  // Pre-fetch data on the server with error handling
  let initialPosts: BlogPost[] = [];
  let initialTags: string[] = [];
  
  try {
    // Fetch data on the server
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
};

export default BlogServer;
