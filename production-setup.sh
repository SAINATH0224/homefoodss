#!/bin/bash

# Production setup script
echo "🚀 Setting up production environment..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Production Environment Variables
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Firebase Configuration
FIREBASE_API_KEY=AIzaSyBrtUADtAu6HcniJlrll41hswuj9gnpKWg
FIREBASE_AUTH_DOMAIN=home-foods-9f024.firebaseapp.com
FIREBASE_PROJECT_ID=home-foods-9f024
FIREBASE_STORAGE_BUCKET=home-foods-9f024.appspot.com
FIREBASE_MESSAGING_SENDER_ID=403437439856
FIREBASE_APP_ID=1:403437439856:web:a95a64fc4242552438ddb5
FIREBASE_MEASUREMENT_ID=G-MGPG1DRHC4

# EmailJS Configuration
EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
EMAILJS_SERVICE_ID=service_c0g8ern
EMAILJS_TEMPLATE_ID=template_bri376k

# App Configuration
ADMIN_EMAIL=abhiabhiramreddy32@gmail.com
DELIVERY_RADIUS=5
MINIMUM_ORDER_AMOUNT=500
SMS_ENDPOINT=https://abhi-red-one.vercel.app/api/send-sms
EOF

    echo "✅ .env file created"
else
    echo "⚠️  .env file already exists"
fi

# Install dependencies if package.json exists
if [ -f package.json ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "⚠️  package.json not found"
fi

# Remove config.js if it exists (for production)
if [ -f config.js ]; then
    echo "🗑️  Removing config.js for production..."
    rm config.js
    echo "✅ config.js removed"
fi

echo ""
echo "🎉 Production setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env with your actual credentials"
echo "2. Run: npm start"
echo "3. Access via: http://localhost:3000"
echo ""
echo "🔒 Security:"
echo "- config.js is removed in production"
echo "- Credentials are served via secure API endpoints"
echo "- Direct file access is blocked"
