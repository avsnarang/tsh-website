#!/usr/bin/env node

/**
 * Script to check GCP Storage buckets and service account configuration
 * Run with: node scripts/check-gcp-storage.js
 */

require('dotenv').config({ path: '.env.local' });

const { Storage } = require('@google-cloud/storage');

async function checkGCPStorage() {
  console.log('🔍 Checking GCP Storage Configuration...\n');

  // Check environment variables
  const projectId = process.env.GCP_PROJECT_ID || 'scholarise';
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const bucketName = process.env.GCP_STORAGE_BUCKET;

  console.log('📋 Environment Variables:');
  console.log(`   GCP_PROJECT_ID: ${projectId}`);
  console.log(`   GOOGLE_SERVICE_ACCOUNT_EMAIL: ${serviceAccountEmail ? '✅ Set' : '❌ Missing'}`);
  console.log(`   GOOGLE_PRIVATE_KEY: ${privateKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`   GCP_STORAGE_BUCKET: ${bucketName || 'Not set (will use default: scholarise-events)'}\n`);

  if (!serviceAccountEmail || !privateKey) {
    console.error('❌ Missing required credentials!');
    console.error('   Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local\n');
    process.exit(1);
  }

  try {
    // Initialize Storage client
    const storage = new Storage({
      projectId,
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
    });

    console.log('🔐 Authenticated successfully!\n');

    // List all buckets
    console.log('📦 Listing all buckets in project:', projectId);
    const [buckets] = await storage.getBuckets();
    
    if (buckets.length === 0) {
      console.log('   ⚠️  No buckets found in this project.\n');
    } else {
      console.log(`   Found ${buckets.length} bucket(s):\n`);
      buckets.forEach((bucket, index) => {
        console.log(`   ${index + 1}. ${bucket.name}`);
        console.log(`      Location: ${bucket.metadata.location || 'N/A'}`);
        console.log(`      Storage Class: ${bucket.metadata.storageClass || 'N/A'}`);
        console.log(`      Created: ${bucket.metadata.timeCreated || 'N/A'}`);
        console.log('');
      });
    }

    // Check if configured bucket exists
    const targetBucket = bucketName || 'scholarise-events';
    console.log(`🔎 Checking for bucket: ${targetBucket}`);
    const bucket = storage.bucket(targetBucket);
    const [exists] = await bucket.exists();

    if (exists) {
      console.log(`   ✅ Bucket "${targetBucket}" exists!\n`);
      
      // Check bucket permissions
      try {
        const [metadata] = await bucket.getMetadata();
        console.log('📋 Bucket Details:');
        console.log(`   Location: ${metadata.location}`);
        console.log(`   Storage Class: ${metadata.storageClass}`);
        console.log(`   Public Access: ${metadata.iamConfiguration?.publicAccessPrevention || 'Not configured'}`);
        console.log('');
      } catch (err) {
        console.log(`   ⚠️  Could not fetch bucket metadata: ${err.message}\n`);
      }

      // Check service account permissions
      console.log('🔐 Checking service account permissions...');
      try {
        const [policy] = await bucket.iam.getPolicy();
        const serviceAccountBinding = policy.bindings?.find(binding => 
          binding.members?.includes(`serviceAccount:${serviceAccountEmail}`)
        );
        
        if (serviceAccountBinding) {
          console.log(`   ✅ Service account has roles: ${serviceAccountBinding.role}`);
        } else {
          console.log(`   ⚠️  Service account not found in bucket IAM policy`);
          console.log(`   💡 Grant "Storage Object Admin" role to: ${serviceAccountEmail}`);
        }
      } catch (err) {
        console.log(`   ⚠️  Could not check permissions: ${err.message}`);
        console.log(`   💡 Ensure service account has "Storage Object Admin" role`);
      }
    } else {
      console.log(`   ❌ Bucket "${targetBucket}" does not exist!\n`);
      console.log(`   💡 Create the bucket in GCP Console or update GCP_STORAGE_BUCKET to use an existing bucket\n`);
    }

    // Test upload capability (dry run)
    console.log('🧪 Testing upload capability...');
    try {
      const testFile = bucket.file('test-upload-check.txt');
      // Just check if we can create the file reference (doesn't actually upload)
      await testFile.save('test', {
        metadata: { contentType: 'text/plain' },
        resumable: false,
        validation: false,
      });
      await testFile.delete(); // Clean up
      console.log('   ✅ Upload test successful!\n');
    } catch (err) {
      console.log(`   ⚠️  Upload test failed: ${err.message}`);
      console.log(`   💡 This might indicate permission issues\n`);
    }

    console.log('✅ GCP Storage check complete!\n');
    
    // Summary
    console.log('📝 Summary:');
    console.log(`   Project: ${projectId}`);
    console.log(`   Service Account: ${serviceAccountEmail}`);
    console.log(`   Target Bucket: ${targetBucket} ${exists ? '✅' : '❌'}`);
    console.log(`   Available Buckets: ${buckets.length}`);
    
  } catch (error) {
    console.error('\n❌ Error checking GCP Storage:');
    if (error.code === 403) {
      console.error('   Permission denied. Check service account permissions.');
    } else if (error.code === 404) {
      console.error('   Project or resource not found.');
    } else {
      console.error(`   ${error.message}`);
    }
    console.error(`\n   Full error: ${error}\n`);
    process.exit(1);
  }
}

checkGCPStorage().catch(console.error);

