# Cafe Culture - Vercel Deployment Guide

## Prerequisites
- GitHub repository with the project
- Vercel account
- MongoDB Atlas database

## Deployment Steps

### 1. Environment Variables Setup

In your Vercel dashboard, add these environment variables:

#### Frontend Environment Variables:
- `VITE_BACKEND_URL`: `https://your-app-name.vercel.app/api`
- `VITE_CURRENCY`: `₹`

#### Backend Environment Variables:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `NODE_ENV`: `production`

### 2. MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to Vercel environment variables as `MONGODB_URI`

### 3. Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the `vercel.json` configuration
3. The deployment will build both frontend and backend
4. Your app will be available at `https://your-app-name.vercel.app`

### 4. Post-Deployment
1. Test the admin panel access with `Ctrl + Shift + A`
2. Verify database connection
3. Test order placement functionality

## Project Structure
```
cafe-culture/
├── FRONTEND/          # React frontend
├── BACKEND/           # Node.js backend
├── vercel.json        # Vercel configuration
└── DEPLOYMENT.md      # This file
```

## API Endpoints
- Frontend: `https://your-app-name.vercel.app/`
- API: `https://your-app-name.vercel.app/api/`

## Troubleshooting
- Check Vercel function logs for backend issues
- Verify environment variables are set correctly
- Ensure MongoDB Atlas allows connections from Vercel IPs
