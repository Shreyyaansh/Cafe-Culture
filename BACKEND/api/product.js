// Vercel API route for products
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import productRouter from '../routes/productRoute.js';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',
            'https://cafe-culture.vercel.app',
            'https://*.vercel.app'
        ];
        
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

// Initialize database
await connectDB();

// Routes
app.use('/api/product', productRouter);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Product API is running' });
});

export default app;
