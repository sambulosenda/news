#!/usr/bin/env node

import https from 'https';

const videoId = 'ca956a44-5d85-46e8-ae54-c455a7e6ad74';
const libraryId = '491503';
const apiKey = 'a1b2ec05-1c62-4481-9c18fc096f4b-ed60-4e5e';

const data = JSON.stringify({
  isPublic: true
});

const options = {
  hostname: 'video.bunnycdn.com',
  port: 443,
  path: `/library/${libraryId}/videos/${videoId}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'AccessKey': apiKey,
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    const response = JSON.parse(responseData);
    if (response.success) {
      console.log('✅ Video updated successfully!');
      console.log('Video is now public:', response.data.isPublic);
    } else {
      console.log('❌ Failed to update video');
      console.log(response);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();

console.log('Attempting to make video public...');