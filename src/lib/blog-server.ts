import { blogApi, type BlogPost } from './supabase';
import { cache } from 'react';

// Server-side data fetching with caching and revalidation
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const posts = await blogApi.getPublished();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const post = await blogApi.getBySlug(slug);
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
});

export const getAllBlogTags = cache(async (): Promise<string[]> => {
  try {
    const posts = await blogApi.getPublished();
    const allTags = new Set(posts.flatMap(post => post.tags));
    return Array.from(allTags).sort();
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
});

// Client-side fallback for when server-side fails
export const fetchBlogPostsClient = async (): Promise<{ posts: BlogPost[]; tags: string[] }> => {
  try {
    const response = await fetch('/api/blog', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      posts: data.posts || [],
      tags: data.tags || []
    };
  } catch (error) {
    console.error('Client-side fetch error:', error);
    // Final fallback to direct Supabase call
    try {
      const [posts, tags] = await Promise.all([
        getBlogPosts(),
        getAllBlogTags()
      ]);
      return { posts, tags };
    } catch (supabaseError) {
      console.error('Supabase fallback error:', supabaseError);
      return { posts: [], tags: [] };
    }
  }
};
