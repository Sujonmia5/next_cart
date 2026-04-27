#!/bin/bash

# Nex_Cart Deployment Script

echo "🚀 Preparing for deployment..."

# 1. Run type check
echo "🔍 Running type check..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ Type check failed. Please fix errors before deploying."
    exit 1
fi

# 2. Git stage and commit
echo "📦 Staging changes..."
git add .

read -p "📝 Enter commit message (or press enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Deployment at $(date +'%Y-%m-%d %H:%M:%S')"
fi

echo "💾 Committing changes..."
git commit -m "$commit_msg"

# 3. Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin $(git rev-parse --abbrev-ref HEAD)

echo "✅ Push successful! Vercel will now start the build process."
echo "🔗 Monitor your deployment at: https://vercel.com/dashboard"
