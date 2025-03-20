export const ALUMNI_ROUTES = {
  HOME: '/alumni',
  LOGIN: '/login',
  REGISTER: '/alumni/register',
  PROFILE: '/alumni/profile',
  DIRECTORY: '/alumni/directory',
  SUCCESS: '/alumni/success',
} as const;

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  EVENTS: '/admin/events',
  MESSAGES: '/admin/messages',
  UPDATES: '/admin/updates',
  GALLERY: '/admin/gallery',
  STUDENTS: '/admin/students',
  ALUMNI: '/admin/alumni',
  CALENDAR: '/admin/calendar',
  YOUTUBE: '/admin/youtube',
} as const;

export const PUBLIC_ROUTES = {
  // ... existing routes ...
  YOUTUBE: '/video-gallery',
} as const;
