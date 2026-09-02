# S-OIL Corporate API

NestJS backend for the corporate website and admin dashboard. Handles products, blog posts, enquiries, auth, and file uploads.

## Stack

- NestJS 11 · MongoDB · JWT auth · Multer uploads

## Setup

```bash
npm install
cp .env.example .env
# Edit .env — set MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run start:dev
```

Runs at `http://localhost:4000` by default. Production: **https://s-oil-corporate-api.vercel.app/api**

## Environment

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `PORT` | API port (default `4000`) |
| `ADMIN_EMAIL` | Seed admin login email |
| `ADMIN_PASSWORD` | Seed admin login password |
| `CORS_ORIGIN` | Comma-separated allowed origins (website + dashboard URLs) |
| `UPLOAD_DIR` | Local folder for uploaded files |
| `PUBLIC_UPLOAD_URL` | Public base URL for uploaded files |

## Deploy

Use a Node.js host with persistent storage for uploads (Railway, Render, Fly.io, VPS). Vercel serverless also works if configured with environment variables.

```bash
npm run build
npm run start:prod
```

### Required environment variables (production)

Set these in your host dashboard before deploy:

| Variable | Required | Example |
|----------|----------|---------|
| `MONGODB_URI` | Yes | `mongodb+srv://user:pass@cluster/soil` |
| `JWT_SECRET` | Yes | Long random string (e.g. `openssl rand -hex 32`) |
| `ADMIN_EMAIL` | Yes | Admin login email (seeded on first boot) |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `CORS_ORIGIN` | Yes | `https://s-oil-corporate.vercel.app,https://s-oil-corporate-dashboard.vercel.app` |
| `PUBLIC_UPLOAD_URL` | Yes | `https://s-oil-corporate-api.vercel.app/uploads` |
| `UPLOAD_DIR` | No | `uploads` (default) |
| `PORT` | No | Set automatically on most hosts |

**Vercel:** Project → Settings → Environment Variables → add all required vars for Production, then redeploy.

## Production URLs

| App | URL |
|-----|-----|
| API | https://s-oil-corporate-api.vercel.app/api |
| Website | https://s-oil-corporate.vercel.app |

## Related repos

- **Website** — `s-oil-corporate-website` (reads public catalog endpoints)
- **Dashboard** — `s-oil-corporate-dashboard` (admin CRUD + auth)
