import sharp from 'sharp';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-100
  format?: 'jpeg' | 'webp' | 'png';
}

/**
 * Compresses an image buffer while maintaining quality
 * Uses smart compression techniques to minimize file size
 */
export async function compressImage(
  imageBuffer: Buffer,
  options: CompressionOptions = {}
): Promise<Buffer> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 85, // Good balance between quality and size
    format = 'webp', // WebP provides better compression than JPEG
  } = options;

  let pipeline = sharp(imageBuffer);

  // Get image metadata to determine best approach
  const metadata = await pipeline.metadata();
  const originalFormat = metadata.format;

  // Resize if needed (maintains aspect ratio)
  if (metadata.width && metadata.height) {
    const shouldResize =
      metadata.width > maxWidth || metadata.height > maxHeight;

    if (shouldResize) {
      pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
  }

  // Apply compression based on format
  if (format === 'webp') {
    // WebP offers best compression with good quality
    pipeline = pipeline.webp({
      quality,
      effort: 6, // Higher effort = better compression (0-6)
      smartSubsample: true, // Better quality subsampling
    });
  } else if (format === 'jpeg' || originalFormat === 'jpeg') {
    // JPEG optimization
    pipeline = pipeline.jpeg({
      quality,
      mozjpeg: true, // Use mozjpeg for better compression
      progressive: true, // Progressive JPEG for better perceived loading
    });
  } else if (format === 'png' || originalFormat === 'png') {
    // PNG optimization (lossless)
    pipeline = pipeline.png({
      quality: quality * 10, // PNG quality is 0-100, but we map from our 0-100 scale
      compressionLevel: 9, // Maximum compression
      adaptiveFiltering: true,
    });
  }

  // Apply additional optimizations
  const compressedBuffer = await pipeline
    .toBuffer();

  return compressedBuffer;
}

/**
 * Gets optimal compression settings based on image type and size
 */
export function getOptimalCompressionSettings(
  originalSize: number,
  format?: string
): CompressionOptions {
  // For large images, be more aggressive with compression
  if (originalSize > 2 * 1024 * 1024) {
    // > 2MB
    return {
      maxWidth: 1920,
      maxHeight: 1920,
      quality: 80,
      format: 'webp',
    };
  } else if (originalSize > 1 * 1024 * 1024) {
    // > 1MB
    return {
      maxWidth: 1920,
      maxHeight: 1920,
      quality: 85,
      format: 'webp',
    };
  } else {
    // Smaller images, less aggressive compression
    return {
      maxWidth: 2560,
      maxHeight: 2560,
      quality: 90,
      format: 'webp',
    };
  }
}

