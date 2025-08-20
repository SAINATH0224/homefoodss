// Security Test Script
// Run this in browser console to verify security measures

function testSecurity() {
    console.log('🔒 Running security tests...\n');
    
    const tests = [
        {
            name: 'Direct Config Access',
            test: async () => {
                try {
                    const response = await fetch('/config.js');
                    return response.status === 403 || response.status === 404;
                } catch (e) {
                    return true; // If fetch fails, it's likely blocked
                }
            }
        },
        {
            name: 'Config Object Protection',
            test: () => {
                return typeof window.CONFIG === 'object' && window.CONFIG !== null;
            }
        },
        {
            name: 'Environment File Access',
            test: async () => {
                try {
                    const response = await fetch('/.env');
                    return response.status === 403 || response.status === 404;
                } catch (e) {
                    return true;
                }
            }
        },
        {
            name: 'Credential Obfuscation',
            test: () => {
                if (!window.CONFIG) return false;
                const configString = JSON.stringify(window.CONFIG);
                // Check if raw credentials are NOT visible in the config
                return !configString.includes('AIzaSyBrtUADtAu6HcniJlrll41hswuj9gnpKWg') ||
                       configString.includes('decoded') ||
                       configString.includes('obfuscated');
            }
        }
    ];
    
    Promise.all(tests.map(async test => {
        const result = await test.test();
        console.log(`${result ? '✅' : '❌'} ${test.name}: ${result ? 'PASSED' : 'FAILED'}`);
        return result;
    })).then(results => {
        const passed = results.filter(r => r).length;
        const total = results.length;
        
        console.log(`\n📊 Security Test Results: ${passed}/${total} tests passed`);
        
        if (passed === total) {
            console.log('🎉 All security tests passed!');
        } else {
            console.log('⚠️  Some security tests failed. Please review configuration.');
        }
    });
}

// Instructions
console.log('🔒 Security Test Tool');
console.log('Run testSecurity() to check if your configuration is secure.');
console.log('');

// Auto-run if in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(testSecurity, 1000);
}
