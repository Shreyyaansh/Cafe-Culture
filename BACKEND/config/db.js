import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // ensure this is called to load .env variables

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });

        const mongoURI = process.env.MONGODB_URI || `mongodb+srv://shrey08:shrey08@cluster0.5vkidji.mongodb.net/Cafe-Culture`;
        await mongoose.connect(mongoURI);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

export default connectDB;
