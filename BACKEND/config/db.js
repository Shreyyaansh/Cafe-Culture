import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // ensure this is called to load .env variables

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });

        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not set. Please configure it in your environment variables.');
        }

        await mongoose.connect(mongoURI);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

export default connectDB;
