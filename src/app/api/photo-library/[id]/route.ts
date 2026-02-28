import { NextRequest, NextResponse } from 'next/server';
import { deleteFromGCPStorage } from '@/lib/gcp-storage';
import { createAdminSupabaseClient } from '@/lib/supabase-server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminSupabaseClient();

    // Get the record first to find the storage path
    const { data: record, error: fetchError } = await supabase
      .from('photo_library')
      .select('storage_path')
      .eq('id', id)
      .single();

    if (fetchError || !record) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Delete from GCS
    try {
      await deleteFromGCPStorage(record.storage_path);
    } catch (gcsError) {
      console.error('GCS delete error (continuing with DB delete):', gcsError);
    }

    // Delete from Supabase
    const { error: deleteError } = await supabase
      .from('photo_library')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Photo library delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = createAdminSupabaseClient();

    const updates: Record<string, unknown> = {};
    if (body.tags !== undefined) updates.tags = body.tags;

    const { data, error } = await supabase
      .from('photo_library')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Photo library update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 }
    );
  }
}
