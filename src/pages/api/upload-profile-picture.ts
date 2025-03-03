import { supabase } from '../../lib/supabase';
import { StorageApiError } from '@supabase/storage-js';

interface FileUploadRequest {
  files?: {
    profile_picture?: {
      name: string;
      data: ArrayBuffer;
      mimetype: string;
    };
  };
}

interface FileUploadResponse {
  url?: string;
  error?: string;
}

export async function handleProfilePictureUpload(req: FileUploadRequest): Promise<FileUploadResponse> {
  try {
    const file = req.files?.profile_picture;
    if (!file) {
      return { error: 'No file uploaded' };
    }

    // Convert ArrayBuffer to Blob
    const blob = new Blob([file.data], { type: file.mimetype });

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

    console.log('Uploading file:', {
      name: fileName,
      size: blob.size,
      type: file.mimetype,
      bucket: 'alumni'
    });

    // Attempt the upload
    const { data, error: uploadError } = await supabase.storage
      .from('alumni')
      .upload(`profile-pictures/${fileName}`, blob, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error details:', {
        message: uploadError.message,
        status: uploadError instanceof StorageApiError ? uploadError.status : undefined,
        name: uploadError.name,
      });
      return { error: `Upload failed: ${uploadError.message}` };
    }

    if (!data?.path) {
      console.error('Upload succeeded but no path returned');
      return { error: 'Upload failed: No file path returned' };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('alumni')
      .getPublicUrl(`profile-pictures/${fileName}`);

    if (!publicUrl) {
      return { error: 'Failed to generate public URL' };
    }

    console.log('Upload successful:', {
      path: data.path,
      publicUrl: publicUrl
    });

    return { url: publicUrl };
  } catch (error: any) {
    console.error('Unexpected error during upload:', {
      error,
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return { 
      error: `Upload failed: ${error.message || 'Unexpected error occurred'}` 
    };
  }
}
