# Debug Network Errors - Cafe Culture Backend

## 🔍 **Current Setup:**
- **Backend**: `https://cafe-culture-backend-lilac.vercel.app`
- **Frontend**: `https://cafe-culture.vercel.app`

## 🧪 **Test Your Backend API:**

### **1. Test Health Check:**
Open these URLs in your browser:

```
https://cafe-culture-backend-lilac.vercel.app/
https://cafe-culture-backend-lilac.vercel.app/api/order/
https://cafe-culture-backend-lilac.vercel.app/api/user/
https://cafe-culture-backend-lilac.vercel.app/api/product/
```

**Expected Response:**
```json
{
  "message": "Order API is running"
}
```

### **2. Test Specific Endpoints:**
```
https://cafe-culture-backend-lilac.vercel.app/api/order
https://cafe-culture-backend-lilac.vercel.app/api/user/is-auth
https://cafe-culture-backend-lilac.vercel.app/api/product/list
```

### **3. Check Browser Console:**
1. Open your frontend: `https://cafe-culture.vercel.app`
2. Open Developer Tools (F12)
3. Go to Console tab
4. Look for network errors
5. Go to Network tab to see failed requests

## 🚨 **Common Network Error Causes:**

### **1. CORS Issues:**
- **Error**: "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
- **Solution**: Check if backend CORS allows your frontend domain

### **2. 404 Not Found:**
- **Error**: "Failed to fetch" or 404 status
- **Solution**: Check if API routes are correctly configured

### **3. 500 Internal Server Error:**
- **Error**: 500 status code
- **Solution**: Check backend logs in Vercel dashboard

### **4. Environment Variables:**
- **Error**: Database connection failed
- **Solution**: Verify all environment variables are set in Vercel

## 🔧 **Debugging Steps:**

### **Step 1: Check Backend Health**
```bash
curl https://cafe-culture-backend-lilac.vercel.app/
```

### **Step 2: Check Frontend Environment**
In your frontend, add this to see the API URL:
```javascript
console.log('API URL:', import.meta.env.VITE_BACKEND_URL);
```

### **Step 3: Check Vercel Logs**
1. Go to Vercel Dashboard
2. Select your backend project
3. Go to Functions tab
4. Check logs for errors

### **Step 4: Test API Endpoints**
Use Postman or curl to test:
```bash
# Test order endpoint
curl https://cafe-culture-backend-lilac.vercel.app/api/order

# Test user endpoint
curl https://cafe-culture-backend-lilac.vercel.app/api/user/is-auth
```

## 🎯 **Quick Fixes:**

### **Fix 1: Update CORS in Backend**
Make sure your backend allows your frontend domain:
```javascript
const allowedOrigins = [
    'https://cafe-culture.vercel.app',  // Your frontend URL
    'http://localhost:5173'
];
```

### **Fix 2: Check Environment Variables**
Verify these are set in Vercel backend:
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

### **Fix 3: Check API Route Structure**
Ensure your API files are in the correct structure:
```
BACKEND/
├── api/
│   ├── order.js
│   ├── user.js
│   └── product.js
└── vercel.json
```

## 📞 **Next Steps:**
1. Test the health check URLs above
2. Check browser console for specific error messages
3. Verify environment variables in Vercel
4. Check Vercel function logs
5. Share the specific error message you're seeing
