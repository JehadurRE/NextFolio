import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts, getAllBlogTags } from '../../../lib/blog-server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeContent = searchParams.get('includeContent') === 'true';
    const tag = searchParams.get('tag');

    const [posts, tags] = await Promise.all([
      getBlogPosts(),
      getAllBlogTags()
    ]);

    // Filter by tag if provided
    const filteredPosts = tag && tag !== 'all' 
      ? posts.filter(post => post.tags.includes(tag))
      : posts;

    // Remove content if not requested (for performance)
    const responsePosts = includeContent 
      ? filteredPosts
      : filteredPosts.map(({ content, ...post }) => post);

    return NextResponse.json({
      posts: responsePosts,
      tags,
      total: filteredPosts.length
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
