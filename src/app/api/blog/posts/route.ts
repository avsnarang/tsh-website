import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-client';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');

    const offset = (page - 1) * limit;

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `, { count: 'exact' });

    // Filter by published status (default to published only for public)
    if (published === 'all') {
      // Admin view - show all
    } else {
      query = query.eq('is_published', true);
    }

    // Filter by category slug
    if (category) {
      const { data: categoryData } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', category)
        .single();

      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }

    // Filter by tag
    if (tag) {
      query = query.contains('tags', [tag]);
    }

    // Filter by featured
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    // Search in title and content
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    // Order by published date (newest first)
    query = query
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Blog Posts API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch blog posts',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      author,
      tags,
      meta_title,
      meta_description,
      is_published,
      is_featured,
    } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, message: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        { success: false, message: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    const postData = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featured_image: featured_image || null,
      category_id: category_id || null,
      author: author || "The Scholars' Home",
      tags: tags || [],
      meta_title: meta_title || title,
      meta_description: meta_description || excerpt || null,
      is_published: is_published || false,
      is_featured: is_featured || false,
      published_at: is_published ? new Date().toISOString() : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select(`
        *,
        category:blog_categories(*)
      `)
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Blog post created successfully',
    });
  } catch (error) {
    console.error('Create Blog Post Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create blog post',
      },
      { status: 500 }
    );
  }
}
