import sharp from 'sharp';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-100
  format?: 'jpeg' | 'webp' | 'png';
}

/**
 * Detects if a buffer contains a HEIC/HEIF image by checking file signature
 */
function isHEIC(buffer: Buffer): boolean {
  // HEIC files have 'ftyp' at bytes 4-7 and then 'heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1' as brand
  if (buffer.length < 12) return false;

  const ftyp = buffer.toString('ascii', 4, 8);
  if (ftyp !== 'ftyp') return false;

  const brand = buffer.toString('ascii', 8, 12);
  const heicBrands = ['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs'];

  return heicBrands.includes(brand);
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

  try {
    // Check for HEIC format first before Sharp tries to process it
    if (isHEIC(imageBuffer)) {
      throw new Error('HEIC/HEIF format detected. Please convert your image to JPEG, PNG, or WebP before uploading. On iPhone, you can change your camera settings to "Most Compatible" to save photos as JPEG instead of HEIC.');
    }

    // Create Sharp instance with minimal options first
    let pipeline = sharp(imageBuffer);

    // Get image metadata to determine best approach
    let metadata;
    try {
      metadata = await pipeline.metadata();
    } catch (metadataError) {
      // If metadata extraction fails, it's likely an unsupported or corrupted file
      console.error('Metadata extraction failed:', metadataError);
      throw new Error('Unable to read image file. The file may be corrupted, in an unsupported format (like HEIC), or not a valid image. Please try converting it to JPEG or PNG first.');
    }

    const originalFormat = metadata.format;

    // Validate that we can process this image
    if (!metadata.width || !metadata.height) {
      throw new Error('Unable to read image dimensions. The image may be corrupted or in an unsupported format.');
    }

    // Check for unsupported formats
    const supportedFormats = ['jpeg', 'png', 'webp', 'gif', 'tiff', 'avif', 'svg'];
    if (originalFormat && !supportedFormats.includes(originalFormat)) {
      throw new Error(`Unsupported image format: ${originalFormat}. Please use JPEG, PNG, WebP, GIF, or TIFF.`);
    }

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
  } catch (error) {
    // Provide more helpful error messages
    if (error instanceof Error) {
      // Check for the specific OpenSSL DECODER error
      if (error.message.includes('1E08010C') || error.message.includes('DECODER routines')) {
        throw new Error('Unsupported image format detected (OpenSSL decode error). This usually happens with HEIC/HEIF images from iPhones or corrupted files. Please convert your image to JPEG, PNG, or WebP before uploading. On iPhone: Settings > Camera > Formats > Most Compatible.');
      }
      if (error.message.includes('unsupported') || error.message.includes('DECODER')) {
        throw new Error('Unsupported image format. Please convert your image to JPEG, PNG, or WebP format before uploading. If using an iPhone, make sure to convert HEIC images to JPEG first.');
      }
      if (error.message.includes('Input buffer') || error.message.includes('Input file')) {
        throw new Error('The image file appears to be corrupted or invalid. Please try a different image or convert it to JPEG/PNG first.');
      }
      if (error.message.includes('VipsJpeg') || error.message.includes('VipsPng')) {
        throw new Error('Error processing image format. The file may be corrupted. Please try re-saving the image or converting it to a standard JPEG or PNG format.');
      }
      // Re-throw with original message if we don't have a specific handler
      throw error;
    }
    throw new Error('Failed to process image. Please try a different file.');
  }
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

