# Vercel Full-Stack Deployment Setup

## 🚀 **Current Configuration:**

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Vercel as API functions

## 🔧 **Environment Variables:**

### **Vercel (Frontend) Environment Variables:**
```
VITE_BACKEND_URL = https://your-backend-app.vercel.app
VITE_CURRENCY = ₹
VITE_RAZORPAY_KEY_ID = rzp_test_l1lX8ei49vhzv7
```

### **Vercel (Backend) Environment Variables:**
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

### **Vercel (Frontend):**
- Upload the `FRONTEND/` folder to Vercel
- Use the `vercel.json` configuration
- Set frontend environment variables in Vercel dashboard

### **Vercel (Backend):**
- Upload the `BACKEND/` folder to Vercel as a separate project
- Vercel will automatically detect it as a Node.js API
- Set backend environment variables in Vercel dashboard
- API functions will be available at `/api/*` routes

## ✅ **API Configuration Status:**

Your code is already properly configured:
- ✅ All API calls use relative paths (`/api/order`, `/api/user`, etc.)
- ✅ `axios.defaults.baseURL` is set from environment variable
- ✅ No hardcoded localhost URLs found
- ✅ Fallback to localhost for development

## 🔄 **API Call Flow:**

1. **Frontend** makes API call: `axios.get('/api/order')`
2. **Axios** prepends base URL: `https://your-backend-app.vercel.app/api/order`
3. **Vercel API function** handles the request and returns response
4. **Frontend** receives the data

## 🧪 **Testing:**

### **Test API Endpoints:**
- `https://your-backend-app.vercel.app/` (health check)
- `https://your-backend-app.vercel.app/api/order`
- `https://your-backend-app.vercel.app/api/user/is-auth`
- `https://your-backend-app.vercel.app/api/product/list`

### **Test Frontend:**
- Your Vercel frontend URL should connect to Vercel backend
- Admin panel should work with `Ctrl + Shift + A`
- Cart and ordering should function properly

## 🎯 **Benefits of This Setup:**

- ✅ **Unified Platform**: Both frontend and backend on Vercel
- ✅ **Serverless**: Auto-scaling API functions
- ✅ **Fast**: Global CDN for both frontend and API
- ✅ **Cost-effective**: Vercel has generous free tier
- ✅ **Easy deployment**: Simple deployment process
- ✅ **Integrated**: Seamless communication between services
