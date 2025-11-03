import { NextRequest, NextResponse } from 'next/server';
import { uploadToGCPStorage } from '@/lib/gcp-storage';
import { compressImage, getOptimalCompressionSettings } from '@/lib/image-compression';

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

    // Validate file size (10MB max before compression)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const originalBuffer = Buffer.from(arrayBuffer);

    // Get optimal compression settings based on image size
    const compressionOptions = getOptimalCompressionSettings(file.size);
    
    // Adjust compression based on image type (desktop vs mobile)
    if (type === 'mobile') {
      // Mobile images can be smaller
      compressionOptions.maxWidth = 1200;
      compressionOptions.maxHeight = 1800;
    } else {
      // Desktop images
      compressionOptions.maxWidth = 1920;
      compressionOptions.maxHeight = 1080;
    }

    console.log('Compressing image:', {
      originalSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      options: compressionOptions,
    });

    // Compress the image
    const compressedBuffer = await compressImage(originalBuffer, compressionOptions);
    
    const compressedSize = compressedBuffer.length;
    const compressionRatio = ((1 - compressedSize / file.size) * 100).toFixed(1);
    
    console.log('Compression complete:', {
      originalSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      compressedSize: `${(compressedSize / 1024 / 1024).toFixed(2)} MB`,
      compressionRatio: `${compressionRatio}%`,
    });

    // Generate unique filename
    const fileExt = compressionOptions.format || 'webp';
    const fileName = `${type}_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

    // Determine content type based on format
    const contentType = compressionOptions.format === 'webp' 
      ? 'image/webp' 
      : compressionOptions.format === 'png'
      ? 'image/png'
      : 'image/jpeg';

    // Upload to GCP Storage
    const publicUrl = await uploadToGCPStorage(
      compressedBuffer,
      fileName,
      contentType
    );

    return NextResponse.json({
      url: publicUrl,
      originalSize: file.size,
      compressedSize: compressedSize,
      compressionRatio: parseFloat(compressionRatio),
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    
    if (error instanceof Error) {
      // Check for GCP-specific errors
      if (error.message.includes('credentials')) {
        return NextResponse.json(
          { error: 'GCP Storage credentials not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('bucket') || error.message.includes('Bucket')) {
        return NextResponse.json(
          { error: 'GCP Storage bucket not found. Please create "scholarise-events" bucket in GCP Console.' },
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

