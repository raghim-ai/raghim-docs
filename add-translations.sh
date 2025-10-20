#!/bin/bash

# Script to add translation functionality to all HTML files
# This script adds the translation script and updates navigation

HTML_FILES=(
    "api-reference.html"
    "best-practices.html"
    "configuration.html"
    "deployment-guide.html"
    "deployment-guide.html"
    "examples.html"
    "integration-guide.html"
    "quick-start.html"
    "troubleshooting.html"
)

echo "Adding translation functionality to HTML files..."

for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Add translation script before closing body tag
        sed -i 's|</body>|    <script src="assets/js/translation.js"></script>\n</body>|g' "$file"
        
        # Update navigation links with data-translate attributes
        sed -i 's|<a href="index.html" class="nav-link">Home</a>|<a href="index.html" class="nav-link" data-translate="nav.home">Home</a>|g' "$file"
        sed -i 's|<a href="deployment-guide.html" class="nav-link">Deployment</a>|<a href="deployment-guide.html" class="nav-link" data-translate="nav.deployment">Deployment</a>|g' "$file"
        sed -i 's|<a href="integration-guide.html" class="nav-link">Integration</a>|<a href="integration-guide.html" class="nav-link" data-translate="nav.integration">Integration</a>|g' "$file"
        sed -i 's|<a href="troubleshooting.html" class="nav-link">Troubleshooting</a>|<a href="troubleshooting.html" class="nav-link" data-translate="nav.troubleshooting">Troubleshooting</a>|g' "$file"
        sed -i 's|<a href="security-guide.html" class="nav-link">Security</a>|<a href="security-guide.html" class="nav-link" data-translate="nav.security">Security</a>|g' "$file"
        sed -i 's|<a href="api-reference.html" class="nav-link">API Reference</a>|<a href="api-reference.html" class="nav-link" data-translate="nav.api">API Reference</a>|g' "$file"
        
        echo "✓ Updated $file"
    else
        echo "⚠ File $file not found"
    fi
done

echo "Translation functionality added to all HTML files!"
echo ""
echo "To test the translation:"
echo "1. Open any HTML file in a browser"
echo "2. Look for the language switcher in the navigation"
echo "3. Click to switch between English and French"
echo ""
echo "Note: You may need to add more data-translate attributes to specific content"
echo "as needed for complete translation coverage."

