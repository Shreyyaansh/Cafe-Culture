import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: false,
        min: 1,
        max: 50
    },
    customerName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: ""
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    orderType: {
        type: String,
        enum: ['dine-in', 'takeaway'],
        default: 'dine-in'
    },
    specialInstructions: {
        type: String,
        default: ""
    },
    orderTime: {
        type: Date,
        default: Date.now
    },
    estimatedTime: {
        type: Number, // in minutes
        default: 15
    },
    completedTime: {
        type: Date,
        default: null
    },
    emailSent: {
        type: Boolean,
        default: false
    },
    emailError: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// Index for better query performance
orderSchema.index({ tableNumber: 1, status: 1 });
orderSchema.index({ orderTime: -1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;