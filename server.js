// server.js - Production server for secure credential management
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://www.gstatic.com", "https://cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://firestore.googleapis.com", "https://identitytoolkit.googleapis.com"]
        }
    }
}));

// CORS configuration
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : 
        ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5501', 'http://127.0.0.1:5501'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Block direct access to sensitive files
app.get('/config.js', (req, res) => {
    res.status(403).json({ error: 'Access denied. Configuration files are not publicly accessible.' });
});

app.get('/.env*', (req, res) => {
    res.status(403).json({ error: 'Access denied. Environment files are not publicly accessible.' });
});

app.get('/config.sample.js', (req, res) => {
    res.status(403).json({ error: 'Access denied. Configuration files are not publicly accessible.' });
});

// Serve static files with security restrictions
app.use(express.static(path.join(__dirname), {
    dotfiles: 'deny',
    index: ['index.html'],
    setHeaders: (res, filePath) => {
        // Block sensitive files
        if (filePath.endsWith('config.js') || 
            filePath.endsWith('.env') || 
            filePath.endsWith('.env.example') ||
            filePath.endsWith('config.sample.js')) {
            res.status(403).end();
            return;
        }
    }
}));

// API endpoint to serve Firebase config securely
app.get('/api/config/firebase', (req, res) => {
    try {
        // Only serve necessary client-side config
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        };

        // Validate that required fields are present
        const required = ['apiKey', 'authDomain', 'projectId'];
        for (const field of required) {
            if (!firebaseConfig[field]) {
                return res.status(500).json({ error: `Missing Firebase ${field}` });
            }
        }

        res.json(firebaseConfig);
    } catch (error) {
        console.error('Error serving Firebase config:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to serve EmailJS config securely
app.get('/api/config/emailjs', (req, res) => {
    try {
        const emailjsConfig = {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            serviceId: process.env.EMAILJS_SERVICE_ID,
            templateId: process.env.EMAILJS_TEMPLATE_ID
        };

        res.json(emailjsConfig);
    } catch (error) {
        console.error('Error serving EmailJS config:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to serve app config
app.get('/api/config/app', (req, res) => {
    try {
        const appConfig = {
            adminEmail: process.env.ADMIN_EMAIL,
            deliveryRadius: parseInt(process.env.DELIVERY_RADIUS) || 5,
            minimumOrderAmount: parseInt(process.env.MINIMUM_ORDER_AMOUNT) || 500,
            smsEndpoint: process.env.SMS_ENDPOINT
        };

        res.json(appConfig);
    } catch (error) {
        console.error('Error serving app config:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'ordernow.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔐 CORS origins: ${corsOptions.origin}`);
});

module.exports = app;
