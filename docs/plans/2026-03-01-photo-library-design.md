# Photo Library — Admin Module Design

## Overview

Add a Photo Library module to the admin portal that allows uploading images to the GCS bucket (`images.tsh.edu.in`), organizing them by folders and tags, and copying CDN URLs for use in code.

## Architecture

Two-layer storage: Supabase table for metadata + GCS bucket for files. Upload flow: admin selects folder, picks files → API route compresses with Sharp (WebP, quality 85, max 1920px) → uploads to GCS at `{folder}/{filename}` → saves metadata to Supabase → returns CDN URL.

## Data Model

**`photo_library` table (Supabase):**

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Auto-generated |
| filename | text | Original filename |
| storage_path | text | GCS path e.g. `homepage/hero.webp` |
| url | text | `https://images.tsh.edu.in/{storage_path}` |
| folder | text | e.g. `homepage`, `campus`, `logo` |
| tags | text[] | Optional tags for cross-folder search |
| size_bytes | integer | Compressed file size |
| content_type | text | e.g. `image/webp` |
| width | integer | Dimensions after compression |
| height | integer | Dimensions after compression |
| uploaded_by | uuid | Auth user ID |
| created_at | timestamptz | Auto |

## UI

- Admin page at `/admin/photo-library` (module #12 on dashboard)
- Left sidebar: folder list (auto-populated + create new)
- Main area: image grid with thumbnails
- Top bar: search by filename/tags, upload button
- Upload modal: FileUploader component, folder dropdown, optional tags
- Image actions: copy URL, delete, view details, edit tags

## API Routes

- `POST /api/photo-library/upload` — FormData (files + folder + tags), compress, upload to GCS, save metadata
- `DELETE /api/photo-library/[id]` — delete from GCS + Supabase

## Changes to Existing Code

- `src/lib/gcp-storage.ts` — generalize to accept custom folder path
- `src/components/admin/AdminDashboard.tsx` — add Photo Library card
