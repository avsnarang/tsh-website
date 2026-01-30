import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-client';

export async function GET() {
  try {
    const supabase = createServerClient();

    // Get categories with post counts
    const { data: categories, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      (categories || []).map(async (category) => {
        const { count } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)
          .eq('is_published', true);

        return {
          ...category,
          _count: { posts: count || 0 },
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: categoriesWithCounts,
    });
  } catch (error) {
    console.error('Blog Categories API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { name, slug, description, color, order } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existingCategory } = await supabase
      .from('blog_categories')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: 'A category with this slug already exists' },
        { status: 400 }
      );
    }

    const categoryData = {
      name,
      slug,
      description: description || null,
      color: color || '#00501B',
      order: order || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('blog_categories')
      .insert([categoryData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Category created successfully',
    });
  } catch (error) {
    console.error('Create Category Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create category',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();
    const { id, name, slug, description, color, order } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Check if new slug conflicts with another category
    if (slug) {
      const { data: conflictCategory } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .single();

      if (conflictCategory) {
        return NextResponse.json(
          { success: false, message: 'A category with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const updateData = {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(description !== undefined && { description }),
      ...(color && { color }),
      ...(order !== undefined && { order }),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('blog_categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Category updated successfully',
    });
  } catch (error) {
    console.error('Update Category Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update category',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Category ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Delete Category Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete category',
      },
      { status: 500 }
    );
  }
}
