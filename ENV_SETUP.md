# Environment Variables Setup Guide

This project requires environment variables to be set up before running.

## Quick Setup

1. **Create `.env.local` file** in the root directory:
```bash
cp .env.example .env.local  # if .env.example exists
# OR create manually
touch .env.local
```

2. **Add your environment variables** to `.env.local`:

### Required Variables

```env
# Supabase (Client-side - accessible in browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Supabase (Server-side - admin operations)
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Prisma Database Connection
# Format: postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres?schema=public
# Find connection details in Supabase Dashboard → Settings → Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public

# Notion (for sports interest submissions)
NOTION_TOKEN=your_notion_token_here
NOTION_SPORTS_DATABASE_ID=your_database_id_here
```

### Optional Variables

```env
# Google Calendar
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Where to Find These Values

### Supabase
1. Go to your Supabase project dashboard
2. Settings → API
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_KEY` (keep this secret!)
4. Settings → Database
   - Copy the connection string (Connection pooling → Transaction mode)
   - Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`
   - Or use direct connection: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
   - Add `?schema=public` at the end → `DATABASE_URL`

### Notion
1. Create a Notion integration: https://www.notion.so/my-integrations
2. Copy the integration token → `NOTION_TOKEN`
3. Get your database ID from the database URL → `NOTION_SPORTS_DATABASE_ID`

### Google Calendar
1. Create a service account in Google Cloud Console
2. Download the JSON key file
3. Extract email → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
4. Extract private key (keep newlines as `\n`) → `GOOGLE_PRIVATE_KEY`
5. Share calendar with service account email and get calendar ID → `NEXT_PUBLIC_GOOGLE_CALENDAR_ID`

## Important Notes

⚠️ **Never commit `.env.local` to git** - it's already in `.gitignore`

⚠️ **Variable Naming:**
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Variables without prefix are server-only (API routes, server components)

⚠️ **For Production:**
- Set these variables in your hosting platform (Vercel, etc.)
- Vercel: Project Settings → Environment Variables

## Troubleshooting

### "Missing NEXT_PUBLIC_SUPABASE_URL" error
- Make sure you created `.env.local` (not `.env`)
- Restart your dev server after creating/modifying `.env.local`
- Check variable names are correct (with `NEXT_PUBLIC_` prefix)

### Variables not working
- Next.js only reads `.env.local` during build/runtime
- Restart dev server: `npm run dev`
- Check for typos in variable names
