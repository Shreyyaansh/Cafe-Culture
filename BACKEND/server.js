import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config(); // Load environment variables from .env file


await connectDB();
await connectCloudinary(); 

const allowedOrigins = ['http://localhost:5173'];

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));


app.get('/', (req, res) => {
    res.send('Api is running');
    }
);  

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter); 
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter); 
app.use('/api/address', addressRouter); 
app.use('/api/order',orderRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});