# Quick Upload Test

To test if the upload is working, check these:

## 1. Console Output
When you select a file, you should see:
- "Uploading image to GCP..." in browser console
- "Compressing image:" in server logs
- "Uploading to GCP Storage..." in server logs
- "Upload successful:" in browser console

## 2. Common Errors

### If you see: "Upload failed: GCP Storage credentials not configured"
→ Set `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` in `.env.local`

### If you see: "Upload failed: GCP Storage bucket does not exist"
→ Create bucket `scholarise-events` in GCP Console

### If you see: "Upload failed: Permission denied"
→ Grant service account "Storage Object Admin" role

### If you see nothing in console
→ Check if FileUploader is calling onUpload callback
→ Check if uploadEventImage is being triggered

## 3. Quick Manual Test
Open browser console and run:
```javascript
const formData = new FormData();
formData.append('image', new File(['test'], 'test.jpg', {type: 'image/jpeg'}));
formData.append('type', 'desktop');
fetch('/api/upload-event-image', {method: 'POST', body: formData})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

This will show the exact error from the API.

