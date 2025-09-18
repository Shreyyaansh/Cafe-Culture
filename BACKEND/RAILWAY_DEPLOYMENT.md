# Railway Backend Deployment Guide

## 🚀 **Railway Deployment Steps:**

### **1. Upload to Railway:**
- Upload only the `BACKEND/` folder to Railway
- Railway will automatically detect it as a Node.js project

### **2. Environment Variables in Railway:**
Set these in your Railway project dashboard:

```
MONGODB_URI = mongodb+srv://shrey08:shrey08@cluster0.5vkidji.mongodb.net/Cafe-Culture
JWT_SECRET = cafe-culture-jwt-secret-key-2024
NODE_ENV = production
PORT = 4000
SELLER_EMAIL = admin@gmail.com
SELLER_PASSWORD = admin123
CLOUDINARY_CLOUD_NAME = ddgdb4dbe
CLOUDINARY_API_KEY = 968113675782435
CLOUDINARY_API_SECRET = KuIBk5ooGY7TOzae6KWS4IBVPNc
RAZORPAY_KEY_ID = rzp_test_l1lX8ei49vhzv7
RAZORPAY_KEY_SECRET = qQO3ma0BOhmJboDKrA4t58lk
```

### **3. Railway Configuration:**
- **Build Command**: `npm install` (automatic)
- **Start Command**: `npm start` (defined in package.json)
- **Port**: Railway will automatically assign a port

### **4. Troubleshooting:**

#### **If you get build errors:**
- Make sure you're uploading only the `BACKEND/` folder
- Check that all environment variables are set
- Verify the `package.json` has the correct scripts

#### **If you get runtime errors:**
- Check Railway logs for specific error messages
- Verify MongoDB connection string is correct
- Ensure all required environment variables are set

### **5. Testing Your Deployment:**
Once deployed, test these endpoints:
- `https://cafe-culture-backend-production.up.railway.app/` (should return "Api is running")
- `https://cafe-culture-backend-production.up.railway.app/api/order`
- `https://cafe-culture-backend-production.up.railway.app/api/user/is-auth`

### **6. Railway Features:**
- ✅ **Auto-deployment** from GitHub
- ✅ **Environment variables** management
- ✅ **Logs** and monitoring
- ✅ **Custom domains** (optional)
- ✅ **Free tier** available

## 📋 **Deployment Checklist:**
- [ ] Upload BACKEND folder to Railway
- [ ] Set all environment variables
- [ ] Verify deployment is successful
- [ ] Test API endpoints
- [ ] Check Railway logs for any errors
- [ ] Update frontend to use Railway URL
