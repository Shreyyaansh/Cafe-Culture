# Backend Vercel Deployment Guide

## 🚀 **Vercel Backend Deployment Steps:**

### **1. Upload to Vercel:**
- Upload the entire `BACKEND/` folder to Vercel
- Vercel will automatically detect it as a Node.js API project

### **2. Environment Variables in Vercel:**
Set these in your Vercel project dashboard:

```
MONGODB_URI = mongodb+srv://shrey08:shrey08@cluster0.5vkidji.mongodb.net/Cafe-Culture
JWT_SECRET = cafe-culture-jwt-secret-key-2024
NODE_ENV = production
SELLER_EMAIL = admin@gmail.com
SELLER_PASSWORD = admin123
CLOUDINARY_CLOUD_NAME = ddgdb4dbe
CLOUDINARY_API_KEY = 968113675782435
CLOUDINARY_API_SECRET = KuIBk5ooGY7TOzae6KWS4IBVPNc
RAZORPAY_KEY_ID = rzp_test_l1lX8ei49vhzv7
RAZORPAY_KEY_SECRET = qQO3ma0BOhmJboDKrA4t58lk
```

### **3. Vercel Configuration:**
- **Node.js Version**: 22.x (automatically detected from package.json)
- **Build Command**: `npm run vercel-build` (or auto-detected)
- **Output Directory**: Not needed for API
- **Install Command**: `npm install` (automatic)
- **Function Duration**: 30 seconds (configured in vercel.json)

### **4. API Structure:**
Your backend is now structured as:
```
BACKEND/
├── api/
│   └── index.js          # Main API handler
├── config/               # Database and service configs
├── controllers/          # API controllers
├── models/              # Database models
├── routes/              # Express routes
├── middlewares/         # Auth and other middlewares
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies and scripts
```

### **5. API Endpoints:**
Once deployed, your API will be available at:
- `https://your-backend-app.vercel.app/` (health check)
- `https://your-backend-app.vercel.app/api/user/`
- `https://your-backend-app.vercel.app/api/order/`
- `https://your-backend-app.vercel.app/api/product/`
- `https://your-backend-app.vercel.app/api/cart/`
- `https://your-backend-app.vercel.app/api/address/`

### **6. Frontend Configuration:**
Update your frontend environment variable:
```
VITE_BACKEND_URL = https://your-backend-app.vercel.app
```

### **7. Testing Your Deployment:**
Test these endpoints:
- `GET https://your-backend-app.vercel.app/` (should return API status)
- `GET https://your-backend-app.vercel.app/api/order` (should return orders)
- `GET https://your-backend-app.vercel.app/api/user/is-auth` (should return auth status)

## ✅ **Benefits of Vercel Backend:**
- ✅ **Serverless**: Auto-scaling functions
- ✅ **Fast**: Global CDN
- ✅ **Easy**: Simple deployment
- ✅ **Free**: Generous free tier
- ✅ **Integrated**: Works seamlessly with Vercel frontend

## 🔧 **Troubleshooting:**
- **Build errors**: Check environment variables are set
- **Runtime errors**: Check Vercel function logs
- **CORS issues**: Verify allowed origins in api/index.js
- **Database connection**: Ensure MongoDB URI is correct

## 📋 **Deployment Checklist:**
- [ ] Upload BACKEND folder to Vercel
- [ ] Set all environment variables
- [ ] Verify deployment is successful
- [ ] Test API endpoints
- [ ] Update frontend VITE_BACKEND_URL
- [ ] Test full application functionality
