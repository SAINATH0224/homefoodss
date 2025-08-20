// config-loader.js - Intelligent configuration loader
// This file handles both development (config.js) and production (server API) setups

class ConfigLoader {
    constructor() {
        this.config = null;
        this.isProduction = this.detectProductionEnvironment();
    }

    detectProductionEnvironment() {
        // Check if we're running from a server (has domain) vs local file
        return window.location.protocol === 'https:' || 
               (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
    }

    async loadConfig() {
        if (this.config) {
            return this.config;
        }

        try {
            if (this.isProduction) {
                // Production: Load from server API
                this.config = await this.loadFromServer();
            } else {
                // Development: Load from local config.js
                this.config = await this.loadFromLocalFile();
            }

            this.validateConfig();
            return this.config;
        } catch (error) {
            console.error('Failed to load configuration:', error);
            throw new Error('Configuration loading failed: ' + error.message);
        }
    }

    async loadFromServer() {
        try {
            const [firebaseResponse, emailjsResponse, appResponse] = await Promise.all([
                fetch('/api/config/firebase'),
                fetch('/api/config/emailjs'),
                fetch('/api/config/app')
            ]);

            if (!firebaseResponse.ok) {
                throw new Error('Failed to load Firebase config from server');
            }

            const firebase = await firebaseResponse.json();
            const emailjs = emailjsResponse.ok ? await emailjsResponse.json() : {};
            const app = appResponse.ok ? await appResponse.json() : {};

            return {
                firebase,
                emailjs,
                app,
                api: {
                    smsEndpoint: app.smsEndpoint || '/api/send-sms'
                }
            };
        } catch (error) {
            console.error('Server config loading failed:', error);
            throw error;
        }
    }

    async loadFromLocalFile() {
        return new Promise((resolve, reject) => {
            if (typeof CONFIG !== 'undefined') {
                resolve(CONFIG);
            } else {
                // Try to load config.js dynamically
                const script = document.createElement('script');
                script.src = 'config.js';
                script.onload = () => {
                    if (typeof CONFIG !== 'undefined') {
                        resolve(CONFIG);
                    } else {
                        reject(new Error('CONFIG object not found in config.js'));
                    }
                };
                script.onerror = () => {
                    reject(new Error('Failed to load config.js file'));
                };
                document.head.appendChild(script);
            }
        });
    }

    validateConfig() {
        if (!this.config) {
            throw new Error('Configuration is null');
        }

        // Validate Firebase config
        if (!this.config.firebase) {
            throw new Error('Firebase configuration is missing');
        }

        const requiredFirebaseFields = ['apiKey', 'authDomain', 'projectId'];
        for (const field of requiredFirebaseFields) {
            if (!this.config.firebase[field]) {
                throw new Error(`Firebase ${field} is missing`);
            }
        }

        console.log('✅ Configuration validation passed');
    }

    getFirebaseConfig() {
        return this.config?.firebase;
    }

    getEmailJSConfig() {
        return this.config?.emailjs || {};
    }

    getAppConfig() {
        return this.config?.app || {};
    }

    getApiConfig() {
        return this.config?.api || {};
    }
}

// Create global instance
window.configLoader = new ConfigLoader();

// Helper function for backward compatibility
window.loadConfig = async function() {
    return await window.configLoader.loadConfig();
};
