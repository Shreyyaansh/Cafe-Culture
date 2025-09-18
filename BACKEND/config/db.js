import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // ensure this is called to load .env variables

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/salasar`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

export default connectDB;
