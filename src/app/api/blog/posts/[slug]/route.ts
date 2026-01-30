import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = createServerClient();
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const incrementView = searchParams.get('view') === 'true';

    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment view count if requested
    if (incrementView && data.is_published) {
      await supabase
        .from('blog_posts')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Get Blog Post Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch blog post',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = createServerClient();
    const { slug } = await params;
    const body = await request.json();

    // Find the post by slug
    const { data: existingPost, error: findError } = await supabase
      .from('blog_posts')
      .select('id, is_published, published_at')
      .eq('slug', slug)
      .single();

    if (findError || !existingPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check if new slug conflicts with another post
    if (body.slug && body.slug !== slug) {
      const { data: conflictPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', body.slug)
        .neq('id', existingPost.id)
        .single();

      if (conflictPost) {
        return NextResponse.json(
          { success: false, message: 'A post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Set published_at if publishing for the first time
    let publishedAt = existingPost.published_at;
    if (body.is_published && !existingPost.is_published && !existingPost.published_at) {
      publishedAt = new Date().toISOString();
    }

    const updateData = {
      ...body,
      published_at: publishedAt,
      updated_at: new Date().toISOString(),
    };

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.view_count;
    delete updateData.category;

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', existingPost.id)
      .select(`
        *,
        category:blog_categories(*)
      `)
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Blog post updated successfully',
    });
  } catch (error) {
    console.error('Update Blog Post Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update blog post',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = createServerClient();
    const { slug } = await params;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', slug);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Delete Blog Post Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete blog post',
      },
      { status: 500 }
    );
  }
}
