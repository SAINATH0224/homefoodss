# Himabindu Home Foods - Configuration Setup

## 🔧 Setup Instructions

### 1. Firebase Configuration

1. Copy `config.sample.js` to `config.js`
2. Replace the placeholder values with your actual Firebase credentials:
   - Get your Firebase config from the Firebase Console
   - Go to Project Settings > General > Your apps > Firebase SDK snippet
   - Copy the config object values

### 2. EmailJS Configuration (Optional)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and email template
3. Update the following in `config.js`:
   - `emailjs.publicKey`: Your EmailJS public key
   - `emailjs.serviceId`: Your EmailJS service ID  
   - `emailjs.templateId`: Your EmailJS template ID

### 3. SMS Configuration (Optional)

1. Update `api.smsEndpoint` in `config.js` with your SMS API endpoint
2. Update `app.adminEmail` with your email address

## 📁 File Structure

```
├── config.js (Git ignored - your actual config)
├── config.sample.js (Template file)
├── index.html
├── signin.html
├── signup.html
├── menu.html
├── ordernow.html
├── test-auth.html
└── README.md
```

## 🔒 Security Notes

- `config.js` is added to `.gitignore` to prevent committing sensitive credentials
- For production deployment, consider using environment variables or a secure backend
- Never commit your actual Firebase credentials to version control

## 🚀 Development vs Production

### Development (Current Setup)
- Uses `config.js` file for credentials
- Good for local development and testing
- Easier to manage during development

### Production (Recommended)
- Use environment variables on your server
- Fetch credentials from a secure backend API
- Implement proper credential rotation

## 📋 Configuration Options

### Firebase
- `apiKey`: Your Firebase API key
- `authDomain`: Your Firebase auth domain
- `projectId`: Your Firebase project ID
- `storageBucket`: Your Firebase storage bucket
- `messagingSenderId`: Your Firebase messaging sender ID
- `appId`: Your Firebase app ID
- `measurementId`: Your Firebase measurement ID

### EmailJS
- `publicKey`: Your EmailJS public key
- `serviceId`: Your EmailJS service ID
- `templateId`: Your EmailJS template ID

### API Endpoints
- `smsEndpoint`: Your SMS API endpoint URL

### App Settings
- `adminEmail`: Email address for notifications
- `deliveryRadius`: Delivery radius in kilometers
- `minimumOrderAmount`: Minimum order amount in rupees

## 🛠️ Testing

1. Ensure `config.js` exists with your credentials
2. Open `test-auth.html` in your browser
3. Check the console for any configuration errors
4. Test authentication by signing in through `signin.html`

## 🔧 Troubleshooting

### "Configuration file not found" Error
- Make sure `config.js` exists in the root directory
- Check that the file contains valid JavaScript syntax
- Verify all required fields are filled in

### Firebase Connection Issues
- Verify your Firebase project is active
- Check that the Firebase credentials are correct
- Ensure Firebase Authentication and Firestore are enabled

### EmailJS Not Working
- Verify your EmailJS credentials are correct
- Check that your EmailJS service and template are active
- EmailJS will work even if not configured (notifications will be skipped)

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your configuration matches the sample file
3. Test with `test-auth.html` to isolate issues
