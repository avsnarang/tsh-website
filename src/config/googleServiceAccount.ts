export const GOOGLE_CALENDAR_CONFIG = {
  SERVICE_ACCOUNT_EMAIL: import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
  PRIVATE_KEY: import.meta.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  CALENDAR_ID: import.meta.env.VITE_GOOGLE_CALENDAR_ID
} as const;