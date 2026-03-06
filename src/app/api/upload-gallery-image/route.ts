import { NextRequest, NextResponse } from 'next/server';
import { uploadToGCPStorage } from '@/lib/gcp-storage';
import { compressImage, getOptimalCompressionSettings } from '@/lib/image-compression';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB per file
    const results: { url: string; originalSize: number; compressedSize: number }[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: `File "${file.name}" is not an image` },
          { status: 400 }
        );
      }

      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 10MB limit` },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const originalBuffer = Buffer.from(arrayBuffer);

      const compressionOptions = getOptimalCompressionSettings(file.size);
      compressionOptions.maxWidth = 1920;
      compressionOptions.maxHeight = 1440;

      let compressedBuffer;
      try {
        compressedBuffer = await compressImage(originalBuffer, compressionOptions);
      } catch (compressionError) {
        console.error(`Compression error for ${file.name}:`, compressionError);
        throw compressionError;
      }

      const fileExt = compressionOptions.format || 'webp';
      const fileName = `gallery_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      const contentType = compressionOptions.format === 'webp'
        ? 'image/webp'
        : compressionOptions.format === 'png'
        ? 'image/png'
        : 'image/jpeg';

      const publicUrl = await uploadToGCPStorage(
        compressedBuffer,
        fileName,
        contentType,
        { folder: 'gallery' }
      );

      results.push({
        url: publicUrl,
        originalSize: file.size,
        compressedSize: compressedBuffer.length,
      });
    }

    return NextResponse.json({
      urls: results.map(r => r.url),
      details: results,
    });
  } catch (error) {
    console.error('Error uploading gallery image:', error);

    if (error instanceof Error) {
      if (error.message.includes('DECODER') ||
          error.message.includes('HEIC') ||
          error.message.includes('Unsupported image format')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      if (error.message.includes('credentials')) {
        return NextResponse.json(
          { error: 'GCP Storage credentials not configured.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
