import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('profile_picture') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const supabase = createAdminSupabaseClient();

    // Convert file to ArrayBuffer then to Blob
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

    console.log('Uploading file:', {
      name: fileName,
      size: blob.size,
      type: file.type,
      bucket: 'alumni'
    });

    // Attempt the upload
    const { data, error: uploadError } = await supabase.storage
      .from('alumni')
      .upload(`profile-pictures/${fileName}`, blob, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error details:', uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    if (!data?.path) {
      console.error('Upload succeeded but no path returned');
      return NextResponse.json(
        { error: 'Upload failed: No file path returned' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('alumni')
      .getPublicUrl(`profile-pictures/${fileName}`);

    if (!publicUrl) {
      return NextResponse.json(
        { error: 'Failed to generate public URL' },
        { status: 500 }
      );
    }

    console.log('Upload successful:', {
      path: data.path,
      publicUrl: publicUrl
    });

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('Unexpected error during upload:', error);
    return NextResponse.json(
      { 
        error: `Upload failed: ${error.message || 'Unexpected error occurred'}` 
      },
      { status: 500 }
    );
  }
}

