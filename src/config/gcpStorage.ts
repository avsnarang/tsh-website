export const GOOGLE_STORAGE_CONFIG = {
  PROJECT_ID: process.env.GCP_PROJECT_ID || 'scholarise',
  SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  BUCKET_NAME: process.env.GCP_STORAGE_BUCKET || 'scholarise-events',
} as const;

