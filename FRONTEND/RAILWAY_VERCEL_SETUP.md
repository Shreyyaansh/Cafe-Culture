# Railway + Vercel Deployment Setup

## 🚀 **Current Configuration:**

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Railway at `cafe-culture-backend-production.up.railway.app`

## 🔧 **Environment Variables:**

### **Vercel (Frontend) Environment Variables:**
```
VITE_BACKEND_URL = https://cafe-culture-backend-production.up.railway.app
VITE_CURRENCY = ₹
VITE_RAZORPAY_KEY_ID = rzp_test_l1lX8ei49vhzv7
```

### **Railway (Backend) Environment Variables:**
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

## 📁 **Deployment Structure:**

### **Vercel (Frontend Only):**
- Upload only the `FRONTEND/` folder to Vercel
- Use the updated `vercel.json` configuration
- Set frontend environment variables in Vercel dashboard

### **Railway (Backend Only):**
- Upload only the `BACKEND/` folder to Railway
- Set backend environment variables in Railway dashboard
- Railway will automatically detect and run your Node.js app

## ✅ **API Configuration Status:**

Your code is already properly configured:
- ✅ All API calls use relative paths (`/api/order`, `/api/user`, etc.)
- ✅ `axios.defaults.baseURL` is set from environment variable
- ✅ No hardcoded localhost URLs found
- ✅ Fallback to localhost for development

## 🔄 **API Call Flow:**

1. **Frontend** makes API call: `axios.get('/api/order')`
2. **Axios** prepends base URL: `https://cafe-culture-backend-production.up.railway.app/api/order`
3. **Railway** handles the request and returns response
4. **Frontend** receives the data

## 🧪 **Testing:**

### **Test API Endpoints:**
- `https://cafe-culture-backend-production.up.railway.app/api/order`
- `https://cafe-culture-backend-production.up.railway.app/api/user/is-auth`
- `https://cafe-culture-backend-production.up.railway.app/api/product/list`

### **Test Frontend:**
- Your Vercel frontend URL should connect to Railway backend
- Admin panel should work with `Ctrl + Shift + A`
- Cart and ordering should function properly

## 🎯 **Benefits of This Setup:**

- ✅ **Scalable**: Each service can scale independently
- ✅ **Reliable**: Railway handles backend, Vercel handles frontend
- ✅ **Fast**: CDN for frontend, optimized backend hosting
- ✅ **Cost-effective**: Both platforms have generous free tiers
- ✅ **Easy deployment**: Separate deployments for each service
