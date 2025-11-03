# Image Upload Debugging Guide

If image uploads aren't working, follow these steps to diagnose:

## 1. Check Browser Console
Open your browser's Developer Tools (F12) and check the Console tab when uploading:
- Look for errors starting with "Uploading image to GCP..."
- Look for errors starting with "Upload failed:"
- Check for any network errors in the Network tab

## 2. Check Server Logs
Check your terminal/console where Next.js is running for:
- "Compressing image:" messages
- "Uploading to GCP Storage..." messages
- Any error messages about credentials or bucket

## 3. Verify Environment Variables
Make sure these are set in `.env.local`:
```env
GCP_PROJECT_ID=scholarise
GCP_STORAGE_BUCKET=scholarise-events
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 4. Verify GCP Setup
1. **Bucket exists**: Go to GCP Console → Cloud Storage → Buckets
   - Ensure bucket `scholarise-events` exists
   - If not, create it with public read access

2. **Service Account Permissions**: 
   - Go to IAM & Admin → Service Accounts
   - Find your service account email
   - Ensure it has "Storage Object Admin" role

3. **Bucket Permissions**:
   - Go to Cloud Storage → Buckets → scholarise-events
   - Ensure bucket allows public reads (or configure CORS if needed)

## 5. Common Issues

### Issue: "GCP Storage credentials not configured"
**Solution**: Set `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` in `.env.local`

### Issue: "GCP Storage bucket does not exist"
**Solution**: Create bucket `scholarise-events` in GCP Console

### Issue: "Permission denied" or "Access denied"
**Solution**: Grant service account "Storage Object Admin" role in IAM

### Issue: "Upload failed: 500" or "Internal server error"
**Solution**: 
- Check server logs for detailed error
- Verify sharp package is installed (`npm install sharp`)
- Check if GCP credentials are valid

### Issue: File appears to upload but nothing happens
**Solution**:
- Check browser console for JavaScript errors
- Verify the FileUploader component is receiving the files
- Check Network tab to see if API call is being made

## 6. Test the API Directly
You can test the upload endpoint directly using curl:
```bash
curl -X POST http://localhost:3000/api/upload-event-image \
  -F "image=@/path/to/test-image.jpg" \
  -F "type=desktop"
```

## 7. Verify Image Compression
Check if sharp is working:
```bash
node -e "const sharp = require('sharp'); console.log('Sharp version:', sharp.versions);"
```

## Still Not Working?
Check:
1. **Network tab**: Is the request reaching the server?
2. **Response**: What is the server returning?
3. **Credentials**: Are GCP credentials correctly formatted (private key with `\n`)?
4. **Bucket**: Does bucket exist and is it accessible?

