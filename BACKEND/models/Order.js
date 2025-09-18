import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'user',
        required: true
    },
    items :[
        {
            product: {
                type: String,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,

            },
        }
        
    ],
    amount: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        ref: 'address',
        required: true
    },

    status: {
        type: String,
        default: 'Order Placed'
    },
    paymentType: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    }

}, 
{
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
                

const Order = mongoose.models.order || mongoose.model('order', orderSchema);
export default Order;