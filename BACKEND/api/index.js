// Vercel API route handler
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import connectCloudinary from '../config/cloudinary.js';

// Import all route handlers
import userRouter from '../routes/userRoute.js';
import sellerRouter from '../routes/sellerRoute.js';
import productRouter from '../routes/productRoute.js';
import cartRouter from '../routes/cartRoute.js';
import addressRouter from '../routes/addressRoute.js';
import orderRouter from '../routes/orderRoute.js';

dotenv.config();

const app = express();

// CORS configuration for Vercel
const allowedOrigins = [
    'http://localhost:5173',
    'https://cafe-culture.vercel.app',
    'https://*.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.some(allowedOrigin => {
            if (allowedOrigin.includes('*')) {
                return origin.includes(allowedOrigin.replace('*', ''));
            }
            return origin === allowedOrigin;
        })) {
            return callback(null, true);
        }
        
        if (process.env.NODE_ENV === 'production' && origin.includes('vercel.app')) {
            return callback(null, true);
        }
        
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Initialize database and cloudinary
await connectDB();
await connectCloudinary();

// Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Cafe Culture API is running on Vercel' });
});

// Export for Vercel
export default app;
