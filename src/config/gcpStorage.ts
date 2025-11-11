export const GOOGLE_STORAGE_CONFIG = {
  PROJECT_ID: process.env.GCP_PROJECT_ID || 'tsh-website-465407',
  SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  BUCKET_NAME: process.env.GCP_STORAGE_BUCKET || 'images.tsh.edu.in',
} as const;

