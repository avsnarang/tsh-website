# Prisma Setup Guide

This guide will help you set up Prisma with your Supabase database.

## Prerequisites

1. **DATABASE_URL** environment variable set in `.env.local`
   - Get connection string from Supabase Dashboard → Settings → Database
   - Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public`

2. **PostgreSQL client tools** (for backups)
   - macOS: `brew install postgresql` or use Supabase CLI
   - Or use the alternative backup script that uses psql

## Step 1: Backup Your Database ⚠️ IMPORTANT

**Always backup your database before running Prisma schema sync operations!**

### Option A: Using pg_dump (Recommended)

```bash
# Make script executable
chmod +x scripts/backup-database.sh

# Load environment variables (if needed)
source .env.local  # or export DATABASE_URL=...

# Run backup
./scripts/backup-database.sh
```

### Option B: Using Supabase Dashboard

1. Go to Supabase Dashboard
2. Navigate to your project
3. Go to Database → Backups
4. Create a new backup
5. Download the backup file

### Option C: Using Supabase CLI

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Create backup
supabase db dump -f database-backups/supabase_backup_$(date +%Y%m%d_%H%M%S).sql
```

## Step 2: Generate Prisma Client

This is safe to run - it only generates TypeScript types:

```bash
npm run prisma:generate
```

## Step 3: Sync Schema to Database

**⚠️ WARNING: This will modify your database schema!**

After ensuring you have a backup:

```bash
# This will sync your Prisma schema to the database
npm run prisma:push
```

Or use migrations (recommended for production):

```bash
# Create a new migration
npm run prisma:migrate

# This will:
# 1. Create migration files in prisma/migrations/
# 2. Apply the migration to your database
```

## Step 4: Verify Schema

Use Prisma Studio to visually inspect your database:

```bash
npm run prisma:studio
```

This will open a browser at `http://localhost:5555` where you can view and edit your database.

## Available Prisma Commands

- `npm run prisma:generate` - Generate Prisma Client (safe, no DB changes)
- `npm run prisma:push` - Push schema changes to DB (⚠️ modifies database)
- `npm run prisma:migrate` - Create and apply migrations (⚠️ modifies database)
- `npm run prisma:studio` - Open Prisma Studio (safe, read-only by default)

## Schema Overview

The Prisma schema includes the following models:

- **User** - User accounts with roles
- **AlumniProfile** - Alumni profiles and information
- **SportsProgram** - Sports programs and schedules
- **LeadershipMessage** - Leadership messages
- **GalleryEvent** & **GalleryImage** - Event galleries
- **Event** & **EventRsvp** - Events and RSVPs
- **CalendarEvent** - Calendar events
- **Teacher** - Teacher information
- **Testimonial** - Testimonials
- **Student** - Student records
- And more...

## Important Notes

1. **Always backup before schema changes**: `prisma db push` and `prisma migrate` can modify your database structure
2. **DATABASE_URL required**: Prisma needs this to connect to your database
3. **Schema sync**: The Prisma schema in `prisma/schema.prisma` should match your Supabase database schema
4. **Auth users**: Some tables reference `auth.users` (Supabase Auth) which Prisma cannot directly model. These are handled via UUID references.

## Troubleshooting

### "DATABASE_URL not found"
- Ensure `.env.local` has `DATABASE_URL` set
- Restart your terminal/IDE after adding it

### "Schema drift detected"
- Your Prisma schema doesn't match your database
- Review the differences and update either the schema or database
- Use `prisma db pull` to introspect existing database into schema

### "Connection refused"
- Check your DATABASE_URL is correct
- Verify your IP is allowed in Supabase Dashboard → Settings → Database
- Try using connection pooling URL instead of direct connection

## Next Steps

After Prisma is set up:

1. Start using Prisma Client in your code:
   ```typescript
   import { prisma } from '@/lib/prisma';
   
   const users = await prisma.user.findMany();
   ```

2. Gradually migrate from Supabase client to Prisma where appropriate
3. Keep both Supabase client and Prisma client working together during migration

