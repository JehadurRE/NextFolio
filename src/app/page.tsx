import ClientPage from './client-page';
import { getBlogPosts, getAllBlogTags } from '../lib/blog-server';

// Server Component - Pre-fetch blog data
export default async function HomePage() {
  console.log('HomePage Server Component - this should appear in VS Code terminal');
  
  // Pre-fetch blog data on the server
  let blogData = null;
  
  try {
    const [posts, tags] = await Promise.all([
      getBlogPosts(),
      getAllBlogTags()
    ]);
    blogData = { posts, tags };
    console.log('Server pre-fetched blog data:', posts.length, 'posts');
  } catch (error) {
    console.error('Server-side blog pre-fetch failed:', error);
  }

  // Pass pre-fetched data to client component
  return <ClientPage blogData={blogData} />;
}