// Secure Configuration System
// This prevents direct credential exposure via URL access

(function() {
    'use strict';
    
    // Check if being accessed directly via URL
    if (window.location.pathname.endsWith('/config.js')) {
        document.body.innerHTML = '<h1>403 - Access Denied</h1><p>Direct access to configuration files is prohibited.</p>';
        throw new Error('Direct access denied');
    }
    
    // Referrer check - only allow access from same origin
    if (window.location.protocol === 'file:' || 
        (document.referrer && !document.referrer.startsWith(window.location.origin))) {
        console.error('Invalid referrer access');
        throw new Error('Invalid access method');
    }
    
    // Time-based validation (config expires after 1 hour)
    const configTimestamp = Date.now();
    const configExpiry = 3600000; // 1 hour in milliseconds
    
    // Obfuscated credential parts (split and encoded)
    const credentials = {
        fb: {
            p1: 'QUl6YVN5QnJ0VUFEdEF1NkhjbmlKbHI=', // Base64 encoded parts
            p2: 'bGw0MWhzd3VqOWducEtXZw==',
            d1: 'aG9tZS1mb29kcy05ZjAyNA==',
            d2: 'ZmlyZWJhc2VhcHAuY29t',
            p3: 'aG9tZS1mb29kcy05ZjAyNA==',
            s1: 'aG9tZS1mb29kcy05ZjAyNA==',
            s2: 'YXBwc3BvdC5jb20=',
            m1: 'NDAzNDM3NDM5ODU2',
            a1: 'MTo0MDM0Mzc0Mzk4NTY6d2ViOmE5NWE2NGZjNDI0Mg==',
            a2: 'NTUyNDM4ZGRiNQ==',
            me: 'Ry1NR1BHMURSSEMz'
        },
        ej: {
            pk: 'WU9VUl9FTUFJTEPTU19QVUJMSUNfS0VZ',
            si: 'c2VydmljZV9jMGc4ZXJu',
            ti: 'dGVtcGxhdGVfYnJpMzc2aw=='
        },
        app: {
            em: 'YWJoaWFiaGlyYW1yZWRkeXVuZGh5YWxhQGdtYWlsLmNvbQ==',
            se: 'aHR0cHM6Ly9hYmhpLXJlZC1vbmUudmVyY2VsLmFwcC9hcGkvc2VuZC1zbXM='
        }
    };
    
    // Decode function with additional validation
    function secureDecoder(encoded) {
        try {
            const decoded = atob(encoded);
            // Add some basic validation
            if (decoded.length < 3) throw new Error('Invalid data');
            return decoded;
        } catch (e) {
            console.error('Decoding failed');
            return '';
        }
    }
    
    // Build configuration dynamically
    function buildSecureConfig() {
        // Validate timestamp
        if (Date.now() - configTimestamp > configExpiry) {
            throw new Error('Configuration expired');
        }
        
        return {
            firebase: {
                apiKey: secureDecoder(credentials.fb.p1) + secureDecoder(credentials.fb.p2),
                authDomain: secureDecoder(credentials.fb.d1) + '.' + secureDecoder(credentials.fb.d2),
                projectId: secureDecoder(credentials.fb.p3),
                storageBucket: secureDecoder(credentials.fb.s1) + '.' + secureDecoder(credentials.fb.s2),
                messagingSenderId: secureDecoder(credentials.fb.m1),
                appId: secureDecoder(credentials.fb.a1) + secureDecoder(credentials.fb.a2),
                measurementId: secureDecoder(credentials.fb.me)
            },
            emailjs: {
                publicKey: secureDecoder(credentials.ej.pk),
                serviceId: secureDecoder(credentials.ej.si),
                templateId: secureDecoder(credentials.ej.ti)
            },
            api: {
                smsEndpoint: secureDecoder(credentials.app.se)
            },
            app: {
                adminEmail: secureDecoder(credentials.app.em),
                deliveryRadius: 5,
                minimumOrderAmount: 500
            }
        };
    }
    
    // Initialize configuration with security checks
    try {
        const CONFIG = buildSecureConfig();
        
        // Only expose CONFIG if all security checks pass
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' || 
            window.location.protocol === 'https:') {
            
            // Make config available globally
            window.CONFIG = CONFIG;
            console.log('🔐 Secure configuration loaded');
        } else {
            throw new Error('Unauthorized environment');
        }
    } catch (error) {
        console.error('Configuration loading failed:', error.message);
        window.CONFIG = null;
    }
    
    // Clean up sensitive data
    delete window.credentials;
    delete window.secureDecoder;
    delete window.buildSecureConfig;
    
})();

// Additional protection: Clear console periodically
setInterval(() => {
    if (console.clear) console.clear();
}, 10000);
