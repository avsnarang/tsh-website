import { NextRequest, NextResponse } from 'next/server';
import { uploadToGCPStorage } from '@/lib/gcp-storage';
import { compressImage, getOptimalCompressionSettings } from '@/lib/image-compression';
import { createAdminSupabaseClient } from '@/lib/supabase-server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const folder = (formData.get('folder') as string) || 'uploads';
    const tagsRaw = formData.get('tags') as string;
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (!files.length) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const supabase = createAdminSupabaseClient();
    const results = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        results.push({ filename: file.name, error: 'Not an image file' });
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        results.push({ filename: file.name, error: 'File exceeds 10MB limit' });
        continue;
      }

      const arrayBuffer = await file.arrayBuffer();
      const originalBuffer = Buffer.from(arrayBuffer);

      // Compress
      const compressionOptions = getOptimalCompressionSettings(file.size);
      compressionOptions.maxWidth = 1920;
      compressionOptions.maxHeight = 1920;

      const compressedBuffer = await compressImage(originalBuffer, compressionOptions);

      // Get dimensions of compressed image
      const metadata = await sharp(compressedBuffer).metadata();

      // Generate filename
      const fileExt = compressionOptions.format || 'webp';
      const sanitizedName = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .substring(0, 50);
      const fileName = `${sanitizedName}_${Date.now()}.${fileExt}`;

      const contentType = fileExt === 'webp' ? 'image/webp'
        : fileExt === 'png' ? 'image/png'
        : 'image/jpeg';

      // Upload to GCS
      const url = await uploadToGCPStorage(compressedBuffer, fileName, contentType, { folder });
      const storagePath = `${folder}/${fileName}`;

      // Save metadata to Supabase
      const { data, error } = await supabase
        .from('photo_library')
        .insert({
          filename: file.name,
          storage_path: storagePath,
          url,
          folder,
          tags,
          size_bytes: compressedBuffer.length,
          content_type: contentType,
          width: metadata.width || 0,
          height: metadata.height || 0,
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        results.push({ filename: file.name, error: 'Failed to save metadata' });
        continue;
      }

      results.push({
        id: data.id,
        filename: file.name,
        url,
        storage_path: storagePath,
        size_bytes: compressedBuffer.length,
        width: metadata.width,
        height: metadata.height,
      });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Photo library upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
