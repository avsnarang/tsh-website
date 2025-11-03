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
  bucketName: string = 'scholarise-events'
): Promise<string> {
  const storage = getGCPStorageClient();
  const bucket = storage.bucket(bucketName);

  // Upload file to GCP Storage
  const file = bucket.file(`cover-images/${fileName}`);
  
  await file.save(fileBuffer, {
    metadata: {
      contentType,
      cacheControl: 'public, max-age=3600',
    },
    public: true, // Make file publicly accessible
  });

  // Return public URL
  const publicUrl = `https://storage.googleapis.com/${bucketName}/cover-images/${fileName}`;
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

