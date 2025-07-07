import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { blogApi } from '../../../lib/supabase';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await blogApi.getPublished();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await blogApi.getBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Post Not Found - Md. Jehadur Rahman Emran',
      };
    }

    return {
      title: `${post.title} - Md. Jehadur Rahman Emran`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.published_at,
        authors: ['Md. Jehadur Rahman Emran'],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Post Not Found - Md. Jehadur Rahman Emran',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await blogApi.getBySlug(params.slug);
    
    if (!post) {
      notFound();
    }

    return <BlogPostClient post={post} />;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}