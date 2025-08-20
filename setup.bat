@echo off
REM Setup script for Himabindu Home Foods

echo 🏠 Himabindu Home Foods - Setup Script
echo ======================================

REM Check if config.js exists
if exist "config.js" (
    echo ✅ config.js already exists
    set /p recreate="Do you want to recreate it? (y/n): "
    if not "%recreate%"=="y" (
        echo Setup cancelled.
        exit /b 0
    )
)

REM Copy sample config
if exist "config.sample.js" (
    copy config.sample.js config.js
    echo ✅ Created config.js from sample
) else (
    echo ❌ config.sample.js not found
    exit /b 1
)

echo.
echo 📝 Next steps:
echo 1. Edit config.js with your Firebase credentials
echo 2. Update EmailJS settings (optional)
echo 3. Update admin email address
echo 4. Test with test-auth.html
echo.
echo 🔧 For detailed setup instructions, see README.md
echo.
echo ⚠️  Remember: Never commit config.js to version control!

pause
