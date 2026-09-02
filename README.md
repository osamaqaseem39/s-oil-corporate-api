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

Runs at `http://localhost:4000` by default.

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

Use a Node.js host with persistent storage for uploads (Railway, Render, Fly.io, VPS). This is **not** a static/Vercel Next.js app.

```bash
npm run build
npm run start:prod
```

## Related repos

- **Website** — `s-oil-corporate-website` (reads public catalog endpoints)
- **Dashboard** — `s-oil-corporate-dashboard` (admin CRUD + auth)
