import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const type = formData.get('type') as string; // 'desktop' or 'mobile'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    const supabase = createAdminSupabaseClient();

    // Convert file to ArrayBuffer then to Blob
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    const fileExt = file.name.split('.').pop();
    const fileName = `${type}_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

    // Upload to events bucket (create if doesn't exist)
    const { data, error: uploadError } = await supabase.storage
      .from('events')
      .upload(`cover-images/${fileName}`, blob, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      // If bucket doesn't exist, try to create it (requires admin access)
      if (uploadError.message.includes('not found') || uploadError.message.includes('Bucket')) {
        console.error('Events bucket not found. Please create it in Supabase Dashboard:', uploadError);
        return NextResponse.json(
          { error: 'Storage bucket not configured. Please create "events" bucket in Supabase Dashboard.' },
          { status: 500 }
        );
      }
      
      console.error('Upload error details:', uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    if (!data?.path) {
      return NextResponse.json(
        { error: 'Upload failed: No file path returned' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('events')
      .getPublicUrl(`cover-images/${fileName}`);

    if (!publicUrl) {
      return NextResponse.json(
        { error: 'Failed to generate public URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

