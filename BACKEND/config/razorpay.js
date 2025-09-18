import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// Check if Razorpay credentials are available
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

let razorpay = null;

if (keyId && keySecret) {
    razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });
} else {
    console.warn('Razorpay credentials not found. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file');
}

export default razorpay; 