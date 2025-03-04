import { useState, useCallback } from 'react';

interface CompressOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
}

export function useImageCompression() {
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = useCallback(async (
    file: File,
    options: CompressOptions = {}
  ): Promise<File> => {
    const {
      maxSizeMB = 1,
      maxWidthOrHeight = 1920,
      quality = 0.8
    } = options;

    setIsCompressing(true);

    try {
      // If file is already smaller than maxSizeMB, return original
      if (file.size <= maxSizeMB * 1024 * 1024) {
        return file;
      }

      // Create a canvas to resize the image
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Create a promise to handle image loading
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      // Calculate new dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
        if (width > height) {
          height = Math.round((height * maxWidthOrHeight) / width);
          width = maxWidthOrHeight;
        } else {
          width = Math.round((width * maxWidthOrHeight) / height);
          height = maxWidthOrHeight;
        }
      }

      // Set canvas dimensions and draw image
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob as Blob),
          file.type,
          quality
        );
      });

      // Check if compression actually helped
      if (blob.size > file.size) {
        return file; // Return original if compressed size is larger
      }

      // Convert blob to File
      const compressedFile = new File(
        [blob],
        file.name,
        { type: file.type, lastModified: Date.now() }
      );

      return compressedFile;
    } catch (error) {
      console.error('Image compression failed:', error);
      return file; // Return original file if compression fails
    } finally {
      setIsCompressing(false);
    }
  }, []);

  return {
    compressImage,
    isCompressing
  };
}
