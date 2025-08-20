// secure-config.js - Obfuscated configuration (better than plain text)
// This provides some basic obfuscation but is NOT truly secure
// For production, use the Node.js server approach

(function() {
    'use strict';
    
    // Simple obfuscation - not cryptographically secure but hides from casual viewing
    const obfuscatedConfig = {
        fb: {
            ak: "QUl6YVN5QnJ0VUFEdEF1NkhjbmlKbHJsbDQxaHN3dWo5Z25wS1dn",
            ad: "aG9tZS1mb29kcy05ZjAyNC5maXJlYmFzZWFwcC5jb20=",
            pi: "aG9tZS1mb29kcy05ZjAyNA==",
            sb: "aG9tZS1mb29kcy05ZjAyNC5hcHBzcG90LmNvbQ==",
            msi: "NDAzNDM3NDM5ODU2",
            ai: "MTo0MDM0Mzc0Mzk4NTY6d2ViOmE5NWE2NGZjNDI0MjU1MjQzOGRkYjU=",
            mi: "Ry1NR1BHMURSSEMz"
        },
        ej: {
            pk: "WU9VUl9FTUFJTEPTU19QVUJMSUNfS0VZ",
            si: "c2VydmljZV9jMGc4ZXJu",
            ti: "dGVtcGxhdGVfYnJpMzc2aw=="
        },
        ap: {
            ae: "YWJoaWFiaGlyYW1yZWRkeXVuZGh5YWxhQGdtYWlsLmNvbQ==",
            dr: "NQ==",
            mo: "NTAw",
            se: "aHR0cHM6Ly9hYmhpLXJlZC1vbmUudmVyY2VsLmFwcC9hcGkvc2VuZC1zbXM="
        }
    };

    // Simple decode function
    function decode(str) {
        try {
            return atob(str);
        } catch (e) {
            return str;
        }
    }

    // Decode and create config
    const CONFIG = {
        firebase: {
            apiKey: decode(obfuscatedConfig.fb.ak),
            authDomain: decode(obfuscatedConfig.fb.ad),
            projectId: decode(obfuscatedConfig.fb.pi),
            storageBucket: decode(obfuscatedConfig.fb.sb),
            messagingSenderId: decode(obfuscatedConfig.fb.msi),
            appId: decode(obfuscatedConfig.fb.ai),
            measurementId: decode(obfuscatedConfig.fb.mi)
        },
        emailjs: {
            publicKey: decode(obfuscatedConfig.ej.pk),
            serviceId: decode(obfuscatedConfig.ej.si),
            templateId: decode(obfuscatedConfig.ej.ti)
        },
        app: {
            adminEmail: decode(obfuscatedConfig.ap.ae),
            deliveryRadius: parseInt(decode(obfuscatedConfig.ap.dr)),
            minimumOrderAmount: parseInt(decode(obfuscatedConfig.ap.mo)),
        },
        api: {
            smsEndpoint: decode(obfuscatedConfig.ap.se)
        }
    };

    // Make config available globally
    window.CONFIG = CONFIG;

    // Clean up
    delete window.obfuscatedConfig;
})();

// Add loading indicator
console.log('🔐 Secure configuration loaded');
