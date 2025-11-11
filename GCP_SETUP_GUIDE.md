# GCP Storage Setup Guide

This guide will help you find and configure your existing GCP Storage bucket and service account.

## Quick Setup Steps

### 1. Find Your Service Account Email

**Option A: If you already have Google Calendar configured**
- Check your `.env.local` for `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- If it's there, you already have it! ✅

**Option B: Find in GCP Console**
1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=scholarise
2. Look for service accounts (might be something like `calendar-service@scholarise.iam.gserviceaccount.com`)
3. Copy the email address

### 2. Get Service Account Private Key

**Option A: If you already have Google Calendar configured**
- Check your `.env.local` for `GOOGLE_PRIVATE_KEY`
- If it's there, you can reuse it! ✅

**Option B: Create/Download New Key**
1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=scholarise
2. Click on the service account
3. Go to "Keys" tab → "Add Key" → "Create new key" → "JSON"
4. Download the JSON file
5. Open it and extract:
   - `client_email` → Your service account email
   - `private_key` → Your private key (format as shown below)

### 3. Find Your Storage Bucket

1. Go to: https://console.cloud.google.com/storage/browser?project=scholarise
2. Look at the list of buckets
3. Common names might be:
   - `scholarise-storage`
   - `scholarise-media` 
   - `scholarise-uploads`
   - `scholarise-assets`
   - Or any other bucket name you created

4. **Note the exact bucket name** (case-sensitive!)

### 4. Update .env.local

Add or update these variables in `.env.local`:

```env
# GCP Project
GCP_PROJECT_ID=scholarise

# Storage Bucket (use the bucket name you found in step 3)
GCP_STORAGE_BUCKET=your-actual-bucket-name

# Service Account (reuse from Google Calendar or get from step 1 & 2)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@scholarise.iam.gserviceaccount.com

# Private Key (reuse from Google Calendar or extract from JSON key file)
# IMPORTANT: Keep the \n characters as literal \n, wrap in double quotes
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

**Formatting the Private Key:**
- The JSON file has newlines in the key
- Replace actual newlines with `\n` (backslash + n)
- Wrap the entire key in double quotes
- Example:
  ```
  GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
  ```

### 5. Verify Permissions

1. Go to your bucket: https://console.cloud.google.com/storage/browser/[BUCKET_NAME]?project=scholarise
2. Click "Permissions" tab
3. Check if your service account email is listed
4. If not, click "Grant Access":
   - Principal: `your-service-account@scholarise.iam.gserviceaccount.com`
   - Role: `Storage Object Admin`
   - Click "Save"

### 6. Test Configuration

Run the verification script:
```bash
npm run gcp:check
```

This will:
- ✅ Check if credentials are set
- ✅ List all available buckets
- ✅ Verify the configured bucket exists
- ✅ Test upload permissions

### 7. If Bucket Doesn't Exist

If you need to create a new bucket:

1. Go to: https://console.cloud.google.com/storage/browser?project=scholarise
2. Click "Create Bucket"
3. Name: `scholarise-events` (or your preferred name)
4. Location: Choose closest to your users
5. Storage class: Standard
6. Access control: Fine-grained (or Uniform, your choice)
7. **Important**: Enable public access if you want public URLs:
   - After creation, go to bucket → Permissions
   - Click "Grant Access"
   - Principal: `allUsers`
   - Role: `Storage Object Viewer`
8. Update `GCP_STORAGE_BUCKET` in `.env.local` with the new bucket name

## Troubleshooting

### "Permission denied" error
→ Grant "Storage Object Admin" role to service account

### "Bucket not found"
→ Check bucket name spelling (case-sensitive) or create the bucket

### "Credentials not configured"
→ Verify `.env.local` has all required variables and restart dev server

### Private key format errors
→ Ensure `\n` are literal backslash+n, not actual newlines

## Need Help?

Run `npm run gcp:check` for diagnostic information!

