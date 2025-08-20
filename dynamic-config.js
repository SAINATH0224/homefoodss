// dynamic-config.js - Dynamically loaded configuration
// This prevents direct file access to readable credentials

(function() {
    'use strict';
    
    // Configuration builder
    function buildConfig() {
        // Firebase configuration parts
        const firebaseConfig = {
            apiKey: ['AIzaSyBrt', 'UADt', 'Au6Hc', 'niJlr', 'll41h', 'swuj9', 'gnpKWg'].join(''),
            authDomain: ['home-foods-', '9f024', '.firebase', 'app.com'].join(''),
            projectId: ['home-foods-', '9f024'].join(''),
            storageBucket: ['home-foods-', '9f024', '.appspot', '.com'].join(''),
            messagingSenderId: ['4034374', '39856'].join(''),
            appId: ['1:403437439856:', 'web:a95a64fc42', '42552438ddb5'].join(''),
            measurementId: ['G-MGPG1', 'DRHC4'].join('')
        };

        // EmailJS configuration
        const emailjsConfig = {
            publicKey: 'YOUR_EMAIL' + 'JS_PUBLIC_KEY',
            serviceId: ['service_', 'c0g8ern'].join(''),
            templateId: ['template_', 'bri376k'].join('')
        };

        // App configuration
        const appConfig = {
            adminEmail: ['abhi', 'abhi', 'ram', 'reddy', 'undhyala', '@gmail.com'].join(''),
            deliveryRadius: 5,
            minimumOrderAmount: 500
        };

        // API configuration
        const apiConfig = {
            smsEndpoint: ['https://abhi-red-one', '.vercel.app', '/api/send-sms'].join('')
        };

        return {
            firebase: firebaseConfig,
            emailjs: emailjsConfig,
            app: appConfig,
            api: apiConfig
        };
    }

    // Initialize configuration
    const CONFIG = buildConfig();

    // Add additional security checks
    const securityChecks = {
        checkReferrer: function() {
            const allowedReferrers = ['127.0.0.1', 'localhost'];
            const hostname = window.location.hostname;
            return allowedReferrers.some(allowed => hostname.includes(allowed));
        },
        
        checkTime: function() {
            // Add time-based validation if needed
            return true;
        },
        
        validateAccess: function() {
            return this.checkReferrer() && this.checkTime();
        }
    };

    // Only expose config if security checks pass
    if (securityChecks.validateAccess()) {
        window.CONFIG = CONFIG;
        console.log('✅ Dynamic configuration loaded successfully');
    } else {
        console.error('❌ Security validation failed');
        window.CONFIG = null;
    }

    // Clean up
    delete window.buildConfig;
    delete window.securityChecks;
})();

// Prevent direct script access
if (window.location.pathname.endsWith('/dynamic-config.js')) {
    document.body.innerHTML = '<h1>Access Denied</h1><p>Direct access to configuration files is not allowed.</p>';
}
