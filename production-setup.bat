@echo off
REM Production setup script for Windows

echo 🚀 Setting up production environment...

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo # Production Environment Variables
        echo NODE_ENV=production
        echo PORT=3000
        echo ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
        echo.
        echo # Firebase Configuration
        echo FIREBASE_API_KEY=AIzaSyBrtUADtAu6HcniJlrll41hswuj9gnpKWg
        echo FIREBASE_AUTH_DOMAIN=home-foods-9f024.firebaseapp.com
        echo FIREBASE_PROJECT_ID=home-foods-9f024
        echo FIREBASE_STORAGE_BUCKET=home-foods-9f024.appspot.com
        echo FIREBASE_MESSAGING_SENDER_ID=403437439856
        echo FIREBASE_APP_ID=1:403437439856:web:a95a64fc4242552438ddb5
        echo FIREBASE_MEASUREMENT_ID=G-MGPG1DRHC4
        echo.
        echo # EmailJS Configuration
        echo EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
        echo EMAILJS_SERVICE_ID=service_c0g8ern
        echo EMAILJS_TEMPLATE_ID=template_bri376k
        echo.
        echo # App Configuration
        echo ADMIN_EMAIL=abhiabhiramreddy32@gmail.com
        echo DELIVERY_RADIUS=5
        echo MINIMUM_ORDER_AMOUNT=500
        echo SMS_ENDPOINT=https://abhi-red-one.vercel.app/api/send-sms
    ) > .env
    echo ✅ .env file created
) else (
    echo ⚠️  .env file already exists
)

REM Install dependencies if package.json exists
if exist package.json (
    echo 📦 Installing dependencies...
    npm install
    echo ✅ Dependencies installed
) else (
    echo ⚠️  package.json not found
)

REM Remove config.js if it exists (for production)
if exist config.js (
    echo 🗑️  Removing config.js for production...
    del config.js
    echo ✅ config.js removed
)

echo.
echo 🎉 Production setup complete!
echo.
echo 📋 Next steps:
echo 1. Update .env with your actual credentials
echo 2. Run: npm start
echo 3. Access via: http://localhost:3000
echo.
echo 🔒 Security:
echo - config.js is removed in production
echo - Credentials are served via secure API endpoints
echo - Direct file access is blocked

pause
