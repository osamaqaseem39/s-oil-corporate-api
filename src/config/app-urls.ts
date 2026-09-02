/** Production app URLs — CORS and client config reference these. */
export const APP_URLS = {
  api: 'https://s-oil-corporate-api.vercel.app',
  dashboard: 'https://s-oil-corporate-dashboard.vercel.app',
  website: 'https://s-oil-corporate.vercel.app',
  media: 'https://soil-media.osamaqaseem.online',
} as const;

export const CORS_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4000',
  APP_URLS.dashboard,
  APP_URLS.website,
  APP_URLS.api,
  APP_URLS.media,
] as const;

export const MEDIA_UPLOAD_URL = `${APP_URLS.media}/upload.php`;
export const MEDIA_PUBLIC_URL = `${APP_URLS.media}/uploads`;
