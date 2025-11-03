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
  bucketName?: string
): Promise<string> {
  const bucket = bucketName || GOOGLE_STORAGE_CONFIG.BUCKET_NAME;
  
  if (!bucket) {
    throw new Error('GCP Storage bucket name not configured. Please set GCP_STORAGE_BUCKET in environment variables.');
  }

  const storage = getGCPStorageClient();
  const bucketClient = storage.bucket(bucket);

  // Check if bucket exists
  const [exists] = await bucketClient.exists();
  if (!exists) {
    throw new Error(`GCP Storage bucket "${bucket}" does not exist. Please create it in GCP Console.`);
  }

  // Upload file to GCP Storage
  const file = bucketClient.file(`cover-images/${fileName}`);
  
  try {
    await file.save(fileBuffer, {
      metadata: {
        contentType,
        cacheControl: 'public, max-age=3600',
      },
      public: true, // Make file publicly accessible
    });
  } catch (error) {
    console.error('Error saving file to GCP:', error);
    throw new Error(`Failed to upload file to GCP Storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Return public URL
  const publicUrl = `https://storage.googleapis.com/${bucket}/cover-images/${fileName}`;
  return publicUrl;
}

export async function deleteFromGCPStorage(
  fileName: string,
  bucketName: string = 'scholarise-events'
): Promise<void> {
  const storage = getGCPStorageClient();
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(`cover-images/${fileName}`);
  
  await file.delete();
}

