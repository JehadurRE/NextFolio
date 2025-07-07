import { getBlogPosts, getAllBlogTags } from '../../lib/blog-server';
import { type BlogPost } from '../../lib/supabase';
import BlogClient from '../../components/BlogClient';
import BlogHeader from '../../components/BlogHeader';
import NewsletterSignup from '../../components/NewsletterSignup';

// This is a true Server Component that runs on the server
export default async function BlogServerSection() {
  console.log('BlogServerSection rendered on SERVER - this should appear in VS Code terminal');
  
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
    console.log('Server fetched:', posts.length, 'posts and', tags.length, 'tags');
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
