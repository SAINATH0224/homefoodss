#!/bin/bash

# Setup script for Himabindu Home Foods

echo "🏠 Himabindu Home Foods - Setup Script"
echo "======================================"

# Check if config.js exists
if [ -f "config.js" ]; then
    echo "✅ config.js already exists"
    read -p "Do you want to recreate it? (y/n): " recreate
    if [ "$recreate" != "y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Copy sample config
if [ -f "config.sample.js" ]; then
    cp config.sample.js config.js
    echo "✅ Created config.js from sample"
else
    echo "❌ config.sample.js not found"
    exit 1
fi

echo ""
echo "📝 Next steps:"
echo "1. Edit config.js with your Firebase credentials"
echo "2. Update EmailJS settings (optional)"
echo "3. Update admin email address"
echo "4. Test with test-auth.html"
echo ""
echo "🔧 For detailed setup instructions, see README.md"
echo ""
echo "⚠️  Remember: Never commit config.js to version control!"
