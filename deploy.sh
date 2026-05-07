#!/bin/bash
# Raghim AI Documentation Deployment Script
# This script helps deploy the documentation to GitHub Pages

set -e

echo "🚀 Raghim AI Documentation Deployment Script"
echo "============================================="

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Get repository URL from user
echo ""
echo "📋 GitHub Repository Setup"
echo "=========================="
echo "Please provide your GitHub repository details:"
echo ""

read -p "GitHub username: " GITHUB_USERNAME
read -p "Repository name (e.g., docs-raghimai): " REPO_NAME

if [ -z "$GITHUB_USERNAME" ] || [ -z "$REPO_NAME" ]; then
    echo "❌ Username and repository name are required"
    exit 1
fi

REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
echo ""
echo "📦 Repository URL: $REPO_URL"
echo ""

# Check if repository exists
echo "🔍 Checking if repository exists..."
if git ls-remote "$REPO_URL" &> /dev/null; then
    echo "✅ Repository exists"
    echo ""
    echo "📥 Cloning repository..."
    git clone "$REPO_URL" temp-docs-repo
    cd temp-docs-repo
    
    echo "📋 Copying documentation files..."
    cp -r ../docs-github-pages/* .
    
    echo "📝 Adding files to git..."
    git add .
    
    echo "💾 Committing changes..."
    git commit -m "Deploy Raghim AI Enterprise Documentation

- Professional documentation for Raghim AI Enterprise Agent Platform
- IP-protected content with secure technology descriptions
- Responsive design with Raghim AI branding
- Complete deployment and integration guides
- Custom domain: doc.raghim.com"
    
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    echo ""
    echo "✅ Documentation deployed successfully!"
    echo "======================================"
    echo ""
    echo "🌐 Your documentation will be available at:"
    echo "   https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"
    echo ""
    echo "🔧 Next steps:"
    echo "1. Go to your repository settings on GitHub"
    echo "2. Navigate to 'Pages' section"
    echo "3. Enable GitHub Pages from 'main' branch"
    echo "4. Configure custom domain 'doc.raghim.com' in DNS:"
    echo "   - Add CNAME record: doc.raghim.com → ${GITHUB_USERNAME}.github.io"
    echo ""
    echo "📋 Files included:"
    echo "   ✅ CNAME file (doc.raghim.com)"
    echo "   ✅ .nojekyll file (disable Jekyll processing)"
    echo "   ✅ Complete documentation with IP protection"
    echo "   ✅ Professional styling and branding"
    echo ""
    
    # Cleanup
    cd ..
    rm -rf temp-docs-repo
    
else
    echo "❌ Repository does not exist or is not accessible"
    echo ""
    echo "🔧 Please create the repository first:"
    echo "1. Go to https://github.com/new"
    echo "2. Create repository: $REPO_NAME"
    echo "3. Make it public (required for GitHub Pages)"
    echo "4. Run this script again"
    echo ""
fi

echo "📞 Support: contact@raghim.com"
echo "🎯 Raghim AI Enterprise Agent Platform v2.0.5"






