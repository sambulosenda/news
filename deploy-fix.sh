#!/bin/bash

# Deployment Fix Script for Report Focus News
# This script ensures a clean deployment to fix 404 chunk errors

echo "🔧 Starting deployment fix for Report Focus News..."

# Step 1: Clean all build artifacts
echo "📦 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel

# Step 2: Clear package manager cache
echo "🧹 Clearing package manager cache..."
npm cache clean --force 2>/dev/null || true

# Step 3: Fresh install of dependencies
echo "📥 Installing fresh dependencies..."
npm ci || npm install

# Step 4: Build the project
echo "🏗️ Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix any errors above and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Step 5: Deploy instructions based on platform
echo ""
echo "🚀 Now deploy to your hosting platform:"
echo ""
echo "For VERCEL:"
echo "  1. Run: npm install -g vercel"
echo "  2. Run: vercel --prod"
echo ""
echo "For NETLIFY:"
echo "  1. Run: npm install -g netlify-cli"
echo "  2. Run: netlify deploy --prod"
echo ""
echo "For MANUAL deployment (VPS/Docker):"
echo "  1. Run: npm run start"
echo "  2. Or copy the .next folder to your server"
echo ""
echo "For GitHub Pages/Static hosting:"
echo "  This requires 'output: export' in next.config.ts"
echo ""
echo "⚠️  IMPORTANT: After deployment, clear your CDN cache if you use one (Cloudflare, etc.)"