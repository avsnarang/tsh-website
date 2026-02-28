import { Storage } from '@google-cloud/storage';
import { GOOGLE_STORAGE_CONFIG } from '../config/gcpStorage';

// Initialize GCP Storage client
export function getGCPStorageClient() {
  if (!GOOGLE_STORAGE_CONFIG.SERVICE_ACCOUNT_EMAIL || !GOOGLE_STORAGE_CONFIG.PRIVATE_KEY) {
    throw new Error('GCP Storage credentials not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in environment variables.');
  }

  const storage = new Storage({
    projectId: GOOGLE_STORAGE_CONFIG.PROJECT_ID,
    credentials: {
      client_email: GOOGLE_STORAGE_CONFIG.SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_STORAGE_CONFIG.PRIVATE_KEY,
    },
  });

  return storage;
}

export async function uploadToGCPStorage(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  options?: { bucketName?: string; folder?: string }
): Promise<string> {
  const bucket = options?.bucketName || GOOGLE_STORAGE_CONFIG.BUCKET_NAME;
  const folderPath = options?.folder || 'events';

  if (!bucket) {
    throw new Error('GCP Storage bucket name not configured. Please set GCP_STORAGE_BUCKET in environment variables.');
  }

  const storage = getGCPStorageClient();
  const bucketClient = storage.bucket(bucket);

  const file = bucketClient.file(`${folderPath}/${fileName}`);

  try {
    await file.save(fileBuffer, {
      metadata: {
        contentType,
        cacheControl: 'public, max-age=31536000', // Cache for 1 year
      },
      // Note: Don't use 'public: true' as the bucket has uniform bucket-level access enabled
      // Files are publicly accessible via bucket-level IAM policy (allUsers have objectViewer role)
    });

    console.log('File saved to GCP successfully');
  } catch (error) {
    console.error('Error saving file to GCP:', error);
    throw new Error(`Failed to upload file to GCP Storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Return CDN URL
  const publicUrl = `https://images.tsh.edu.in/${folderPath}/${fileName}`;

  console.log('File uploaded successfully:', {
    bucket,
    filePath: `${folderPath}/${fileName}`,
    publicUrl,
  });

  return publicUrl;
}

export async function deleteFromGCPStorage(
  storagePath: string,
  bucketName?: string
): Promise<void> {
  const bucketToUse = bucketName || GOOGLE_STORAGE_CONFIG.BUCKET_NAME;
  const storage = getGCPStorageClient();
  const bucket = storage.bucket(bucketToUse);

  const file = bucket.file(storagePath);

  await file.delete();
}

