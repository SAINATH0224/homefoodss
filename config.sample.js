// Sample Configuration file - Copy this to config.js and fill in your actual credentials
// This file is safe to commit to version control

const CONFIG = {
    firebase: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID"
    },
    
    emailjs: {
        publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
        serviceId: "YOUR_EMAILJS_SERVICE_ID",
        templateId: "YOUR_EMAILJS_TEMPLATE_ID"
    },
    
    api: {
        smsEndpoint: "https://your-backend.vercel.app/api/send-sms"
    },
    
    // App-specific settings
    app: {
        adminEmail: "your-admin@example.com",
        deliveryRadius: 5, // km
        minimumOrderAmount: 500 // rupees
    }
};

// For CommonJS (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// For ES6 modules
if (typeof exports !== 'undefined') {
    exports.CONFIG = CONFIG;
}

// For browsers (global variable)
window.CONFIG = CONFIG;
