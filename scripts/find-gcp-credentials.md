# Finding GCP Storage Configuration

## Step 1: Find Your Service Account

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Select Project**: Make sure `scholarise` project is selected
3. **Navigate to Service Accounts**:
   - Go to: IAM & Admin → Service Accounts
   - Or direct link: https://console.cloud.google.com/iam-admin/serviceaccounts?project=scholarise

4. **Find Your Service Account**:
   - Look for service accounts in the list
   - Check the email address (format: `xxxxx@scholarise.iam.gserviceaccount.com`)
   - This is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`

5. **Get the Private Key**:
   - Click on the service account email
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Select "JSON" format
   - Download the JSON file
   - Open the JSON file and extract:
     - `client_email` → This is `GOOGLE_SERVICE_ACCOUNT_EMAIL`
     - `private_key` → This is `GOOGLE_PRIVATE_KEY` (keep the \n characters as \n)

## Step 2: Find Your Storage Bucket

1. **Navigate to Cloud Storage**:
   - Go to: Cloud Storage → Buckets
   - Or direct link: https://console.cloud.google.com/storage/browser?project=scholarise

2. **List All Buckets**:
   - You'll see all buckets in the project
   - Common names might be: `scholarise-storage`, `scholarise-media`, `scholarise-events`, etc.
   - Note down the bucket name you want to use

3. **Check Bucket Permissions**:
   - Click on the bucket name
   - Go to "Permissions" tab
   - Verify your service account has access (or add it if needed)

## Step 3: Update .env.local

Add these to your `.env.local` file:

```env
# GCP Configuration
GCP_PROJECT_ID=scholarise
GCP_STORAGE_BUCKET=your-bucket-name-here

# Service Account (same as Google Calendar if already configured)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@scholarise.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...your key here...\n-----END PRIVATE KEY-----\n"
```

**Important**: 
- Keep the `\n` in the private key as literal `\n` characters (not actual newlines)
- Wrap the private key in double quotes
- The service account needs "Storage Object Admin" role for the bucket

## Step 4: Grant Permissions (if needed)

If your service account doesn't have access:

1. Go to the bucket → Permissions tab
2. Click "Grant Access"
3. Enter your service account email
4. Role: "Storage Object Admin"
5. Click "Save"

Then run: `npm run gcp:check` to verify everything works!

